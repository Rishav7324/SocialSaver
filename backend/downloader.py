import yt_dlp
import uuid
import shutil
import time
import logging
import re
import threading
from pathlib import Path
from config import DOWNLOADS_DIR

logger = logging.getLogger("smed.downloader")

SANITIZE_PATTERN = re.compile(r'[<>:"/\\|?*]')

# In-memory progress tracker
_progress_store: dict[str, dict] = {}
_progress_lock = threading.Lock()


def sanitize_filename(name: str) -> str:
    return SANITIZE_PATTERN.sub("_", name).strip(" .") or "download"


def get_progress(file_id: str) -> dict | None:
    with _progress_lock:
        return _progress_store.get(file_id)


def _make_progress_hook(file_id: str):
    def hook(d):
        with _progress_lock:
            entry = _progress_store.get(file_id)
            if entry is None:
                return
            status = d.get("status")
            if status == "downloading":
                total = d.get("total_bytes") or d.get("total_bytes_estimate", 0)
                downloaded = d.get("downloaded_bytes", 0)
                if total:
                    entry["progress"] = min(int(downloaded / total * 100), 99)
                entry["speed"] = d.get("speed")
                entry["eta"] = d.get("eta")
            elif status == "finished":
                entry["progress"] = 100
                entry["status"] = "processing"
            elif status == "error":
                entry["status"] = "error"
    return hook


COOKIES_FILE = "/app/cookies/youtube.txt"

def _cookies_opts():
    try:
        if Path(COOKIES_FILE).exists():
            return {"cookiefile": COOKIES_FILE}
    except Exception:
        pass
    return {}


def get_media_info(url: str):
    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "extract_flat": False,
        "ignoreerrors": True,
        "extractor_args": {"youtube": {"player_client": ["android", "web"]}},
        **_cookies_opts(),
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        if not info:
            raise ValueError("Could not extract media info")

        entries = info.get("entries")
        if entries:
            items = []
            for entry in entries:
                if entry:
                    items.append(_extract_item(entry))
            return {
                "type": "playlist",
                "id": info.get("id"),
                "title": info.get("title"),
                "webpage_url": info.get("webpage_url"),
                "uploader": info.get("uploader"),
                "count": len(items),
                "items": items,
            }

        return _extract_item(info)


def _extract_item(info: dict) -> dict:
    formats = []
    for f in info.get("formats", []):
        fmt = {
            "format_id": f.get("format_id"),
            "ext": f.get("ext"),
            "vcodec": f.get("vcodec", "none"),
            "acodec": f.get("acodec", "none"),
            "filesize": f.get("filesize") or f.get("filesize_approx"),
            "width": f.get("width"),
            "height": f.get("height"),
            "tbr": f.get("tbr"),
            "fps": f.get("fps"),
            "vbr": f.get("vbr"),
            "abr": f.get("abr"),
        }
        is_video = fmt["vcodec"] and fmt["vcodec"] != "none"
        is_audio = fmt["acodec"] and fmt["acodec"] != "none"
        if is_video:
            fmt["type"] = "video"
        elif is_audio:
            fmt["type"] = "audio"
        else:
            continue
        formats.append(fmt)

    thumbnails = info.get("thumbnails", [])
    best_thumb = (
        max(thumbnails, key=lambda t: t.get("width", 0) or 0) if thumbnails else None
    )

    return {
        "type": "video",
        "id": info.get("id"),
        "title": info.get("title", "Untitled"),
        "description": (info.get("description") or "")[:500],
        "duration": info.get("duration"),
        "webpage_url": info.get("webpage_url"),
        "thumbnail": best_thumb.get("url") if best_thumb else info.get("thumbnail"),
        "uploader": info.get("uploader"),
        "uploader_url": info.get("uploader_url"),
        "view_count": info.get("view_count"),
        "like_count": info.get("like_count"),
        "formats": formats,
        "extractor": info.get("extractor_key"),
        "extractor_domain": info.get("extractor_domain", ""),
    }


def start_async_download(
    url: str,
    file_id: str,
    format_id: str = None,
    extract_audio: bool = False,
):
    # Initialize progress entry immediately so pollers can find it
    with _progress_lock:
        _progress_store[file_id] = {
            "progress": 0,
            "speed": None,
            "eta": None,
            "status": "downloading",
            "file_id": file_id,
        }

    output_template = str(DOWNLOADS_DIR / f"{file_id}.%(ext)s")
    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "outtmpl": output_template,
        "restrictfilenames": True,
        "progress_hooks": [_make_progress_hook(file_id)],
        "extractor_args": {"youtube": {"player_client": ["android"]}},
    }

    if extract_audio:
        ydl_opts["format"] = "bestaudio/best"
        ydl_opts["postprocessors"] = [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ]
    elif format_id:
        ydl_opts["format"] = format_id
    else:
        ydl_opts["format"] = "bestvideo+bestaudio/best"

    logger.info("Downloading %s (id=%s, fmt=%s)", url, file_id, format_id)

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            if info is None:
                raise ValueError("No data returned")
            ext = "mp3" if extract_audio else info.get("ext", "mp4")
            title = info.get("title", "download")

        found = None
        for f in DOWNLOADS_DIR.iterdir():
            if f.stem.startswith(file_id) or f.stem == file_id:
                found = f
                break

        if not found:
            raise ValueError("No file saved")

        final_path = DOWNLOADS_DIR / f"{file_id}.{ext}"
        if found != final_path:
            shutil.move(str(found), str(final_path))

        with _progress_lock:
            entry = _progress_store.get(file_id, {})
            entry.update({
                "progress": 100,
                "status": "complete",
                "ext": ext,
                "title": title,
                "url": f"/api/file/{file_id}/{sanitize_filename(title)}.{ext}",
            })
    except Exception as e:
        logger.exception("Download failed for %s", url)
        with _progress_lock:
            entry = _progress_store.get(file_id, {})
            entry.update({
                "status": "error",
                "error": str(e),
            })


def download_media(url: str, format_id: str = None, extract_audio: bool = False):
    """Legacy synchronous download — kept for compatibility."""
    file_id = uuid.uuid4().hex
    output_template = str(DOWNLOADS_DIR / f"{file_id}.%(ext)s")
    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "outtmpl": output_template,
        "restrictfilenames": True,
        "progress_hooks": [_make_progress_hook(file_id)],
        "extractor_args": {"youtube": {"player_client": ["android", "web"]}},
        **_cookies_opts(),
    }

    if extract_audio:
        ydl_opts["format"] = "bestaudio/best"
        ydl_opts["postprocessors"] = [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ]
    elif format_id:
        ydl_opts["format"] = format_id
    else:
        ydl_opts["format"] = "bestvideo+bestaudio/best"

    logger.info("Downloading %s (format=%s, audio=%s)", url, format_id, extract_audio)

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        if info is None:
            raise ValueError("Download failed - could not fetch media")
        ext = "mp3" if extract_audio else info.get("ext", "mp4")

    found = None
    for f in DOWNLOADS_DIR.iterdir():
        if f.stem.startswith(file_id) or f.stem == file_id:
            found = f
            break

    if not found:
        raise ValueError("Download failed - no file was saved")

    final_path = DOWNLOADS_DIR / f"{file_id}.{ext}"
    if found != final_path:
        shutil.move(str(found), str(final_path))

    return file_id, ext, info.get("title", "download")


def download_thumbnail(url: str, file_id: str) -> str | None:
    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "writethumbnail": True,
        "outtmpl": str(DOWNLOADS_DIR / file_id),
        "skip_download": True,
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.extract_info(url, download=True)
        for f in DOWNLOADS_DIR.iterdir():
            if f.stem == file_id and f.suffix.lower() in (".jpg", ".png", ".webp"):
                return f.name
    except Exception:
        pass
    return None


def cleanup_old_files(max_age_minutes: int = None):
    from config import config as cfg
    age = max_age_minutes or cfg.get("max_file_age_minutes", 30)
    now = time.time()
    cleaned = 0
    for f in DOWNLOADS_DIR.iterdir():
        if f.is_file():
            age_sec = now - f.stat().st_mtime
            if age_sec > age * 60:
                try:
                    f.unlink()
                    cleaned += 1
                except OSError:
                    pass
    if cleaned:
        logger.info("Cleaned %d old files", cleaned)

    # Clean stale progress entries
    with _progress_lock:
        stale = [k for k in _progress_store if k not in {p.stem for p in DOWNLOADS_DIR.iterdir() if p.is_file()}]
        for k in stale:
            del _progress_store[k]
