import sys
import logging
import threading
import uuid
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

sys.path.insert(0, str(Path(__file__).resolve().parent))

from config import config, DOWNLOADS_DIR
from downloader import (
    get_media_info,
    start_async_download,
    get_progress,
    download_thumbnail,
    cleanup_old_files,
    sanitize_filename,
)
from ratelimit import rate_limiter

logging.basicConfig(
    level=getattr(logging, config.get("log_level", "info").upper(), logging.INFO),
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("smed")

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"
DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("SocialSaver starting on %s:%s", config["host"], config["port"])
    cleanup_old_files()
    yield
    cleanup_old_files()
    logger.info("SocialSaver stopped")


app = FastAPI(title="SocialSaver", version=config.get("version", "1.0.0"), lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class InfoRequest(BaseModel):
    url: str


class DownloadRequest(BaseModel):
    url: str
    format_id: str | None = None
    extract_audio: bool = False


class ThumbnailRequest(BaseModel):
    url: str


def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    if request.url.path.startswith("/api/"):
        ip = get_client_ip(request)
        ok, wait = rate_limiter.check(ip)
        if not ok:
            return JSONResponse(
                status_code=429,
                content={
                    "error": "rate_limited",
                    "message": f"Too many requests. Try again in {wait}s.",
                },
                headers={"Retry-After": str(wait)},
            )
    return await call_next(request)


@app.get("/robots.txt")
async def robots():
    return FileResponse(
        str(BASE_DIR / "frontend" / "robots.txt"), media_type="text/plain"
    )


@app.get("/sitemap.xml")
async def sitemap():
    return FileResponse(
        str(BASE_DIR / "frontend" / "sitemap.xml"), media_type="application/xml"
    )


@app.get("/api/health")
async def health():
    return {
        "status": "ok",
        "version": "2.1.0",
        "downloaded_count": len(list(DOWNLOADS_DIR.iterdir())),
    }


@app.post("/api/info")
async def info(req: InfoRequest, request: Request):
    url = req.url.strip()
    if not url:
        raise HTTPException(400, detail="URL is required")
    if not url.startswith(("http://", "https://")):
        raise HTTPException(400, detail="Invalid URL format")

    try:
        result = get_media_info(url)
        logger.info("Info fetched: %s (%s)", url, result.get("type", "unknown"))
        return result
    except ValueError as e:
        raise HTTPException(400, detail=str(e))
    except Exception as e:
        logger.exception("Info failed for %s", url)
        raise HTTPException(422, detail=f"Failed to fetch media info: {e}")


@app.post("/api/download")
async def download(req: DownloadRequest, request: Request):
    url = req.url.strip()
    if not url:
        raise HTTPException(400, detail="URL is required")

    file_id = uuid.uuid4().hex
    thread = threading.Thread(
        target=start_async_download,
        args=(url, file_id),
        kwargs={
            "format_id": req.format_id,
            "extract_audio": req.extract_audio,
        },
        daemon=True,
    )
    thread.start()

    logger.info("Download queued: %s -> %s", url, file_id)
    return {"file_id": file_id, "status": "processing"}


@app.get("/api/progress/{file_id}")
async def progress(file_id: str):
    data = get_progress(file_id)
    if data is None:
        raise HTTPException(404, "Unknown download ID")
    return data


@app.post("/api/thumbnail")
async def thumbnail(req: "ThumbnailRequest"):  # noqa: F821
    url = req.url.strip()
    if not url:
        raise HTTPException(400, detail="URL is required")
    try:
        file_id = Path(url).stem + "_thumb"
        file_id = sanitize_filename(file_id)
        name = download_thumbnail(url, file_id)
        if name:
            return {
                "url": f"/api/file/{file_id.replace('_thumb', '')}/{name}",
                "filename": name,
            }
        return {"url": None, "filename": None}
    except Exception:
        return {"url": None, "filename": None}


@app.get("/api/file/{file_id}")
@app.get("/api/file/{file_id}/{filename:path}")
async def get_file(file_id: str, filename: str = "download"):
    for f in DOWNLOADS_DIR.iterdir():
        if f.stem == file_id and f.is_file():
            media_type = _guess_mime(f.suffix)
            return FileResponse(
                str(f),
                media_type=media_type,
                filename=filename or f.name,
                headers={
                    "Content-Disposition": f'attachment; filename="{f.name}"',
                    "X-Content-Type-Options": "nosniff",
                },
            )
    raise HTTPException(404, "File not found or expired")


def _guess_mime(suffix: str) -> str:
    return {
        ".mp4": "video/mp4",
        ".webm": "video/webm",
        ".mkv": "video/x-matroska",
        ".avi": "video/x-msvideo",
        ".mov": "video/quicktime",
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".aac": "audio/aac",
        ".ogg": "audio/ogg",
        ".m4a": "audio/mp4",
        ".opus": "audio/opus",
        ".flac": "audio/flac",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
    }.get(suffix.lower(), "application/octet-stream")


app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")
