<div align="center">
  <img src="frontend/favicon.svg" alt="SocialSaver" width="90" height="90">
  <h1 align="center">&#9889; SocialSaver</h1>
  <p align="center">
    <strong>Free &amp; open-source downloader for 1000+ social media platforms</strong>
    <br>
    <code>YouTube</code> &#8226; <code>TikTok</code> &#8226; <code>Instagram</code> &#8226; <code>Twitter/X</code> &#8226; <code>Facebook</code> &#8226; <code>Reddit</code> &#8226; <code>Vimeo</code> &#8226; <code>SoundCloud</code> &#8226; <code>Twitch</code> &#8226; <code>1000+</code>
  </p>
  <p>
    <a href="#-features">Features</a> &#8226;
    <a href="#-quick-start">Quick Start</a> &#8226;
    <a href="#-screenshots">Screenshots</a> &#8226;
    <a href="#-api-reference">API</a> &#8226;
    <a href="#-architecture">Architecture</a> &#8226;
    <a href="#-configuration">Config</a> &#8226;
    <a href="#-deployment">Deploy</a> &#8226;
    <a href="#-faq">FAQ</a>
  </p>
  <p>
    <a href="https://socialsaver.fly.dev/">
      <img src="https://img.shields.io/badge/live-socialsaver.fly.dev-25b7d3.svg?style=flat-square" alt="Live Site">
    </a>
    <a href="https://github.com/Rishav7324/SocialSaver/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-25b7d3.svg?style=flat-square" alt="MIT License">
    </a>
    <a href="https://www.python.org/">
      <img src="https://img.shields.io/badge/python-3.10%2B-3776AB.svg?style=flat-square&logo=python" alt="Python 3.10+">
    </a>
    <a href="https://fastapi.tiangolo.com/">
      <img src="https://img.shields.io/badge/FastAPI-0.109%2B-059669.svg?style=flat-square&logo=fastapi" alt="FastAPI">
    </a>
    <a href="https://github.com/yt-dlp/yt-dlp">
      <img src="https://img.shields.io/badge/yt--dlp-latest-ff0000.svg?style=flat-square" alt="yt-dlp">
    </a>
    <a href="https://ffmpeg.org/">
      <img src="https://img.shields.io/badge/FFmpeg-required-007808.svg?style=flat-square&logo=ffmpeg" alt="FFmpeg">
    </a>
  </p>
  <p>
    <a href="https://github.com/Rishav7324/SocialSaver">
      <img src="https://img.shields.io/github/stars/Rishav7324/SocialSaver?style=social" alt="GitHub stars">
    </a>
    <a href="https://github.com/Rishav7324/SocialSaver/issues">
      <img src="https://img.shields.io/github/issues/Rishav7324/SocialSaver?style=social" alt="GitHub issues">
    </a>
  </p>
</div>

---

## &#128640; Overview

**SocialSaver** is a **privacy-first, zero-cost** web application that lets you download videos, audio tracks, and entire playlists from virtually any social media or streaming platform on the internet. It is built entirely with open-source components &mdash; meaning **no ads, no sign-ups, no hidden limits, and no tracking**.

The backend uses [yt-dlp](https://github.com/yt-dlp/yt-dlp) (the most powerful media extraction tool in existence) behind a **FastAPI** async server. Downloads run in background threads with real-time progress polling, per-IP rate limiting, automatic file cleanup, and CORS support for cross-origin deployments. The frontend is a zero-dependency single-page application with dark/light theme persistence, local download history, smooth scroll animations, and mobile-friendly auto-download triggers.

---

## &#10003; Why SocialSaver?

| Reason | Detail |
|---|---|
| &#128274; **No Sign-up** | Zero accounts, zero passwords, zero onboarding |
| &#128176; **100% Free** | No credit cards, no premium tiers, no ads |
| &#127760; **1000+ Sites** | YouTube, TikTok, Instagram, Twitter/X, Facebook, Reddit, Vimeo, SoundCloud, Twitch, VK, Pinterest, Dailymotion, and 1000+ more |
| &#128190; **Any Format** | MP4, WebM, MKV (video) &mdash; MP3, M4A, Opus, FLAC, WAV (audio) |
| &#128179; **Playlists** | Paste a channel or playlist URL &mdash; browse and pick individual videos |
| &#128200; **Real-time Progress** | Live progress bar with percentage, speed, and ETA |
| &#128737; **Privacy First** | No logging of URLs, no cookies, no tracking, auto-delete after 30 min |
| &#127754; **Open Source** | MIT licensed &mdash; transparent, auditable, forkable |
| &#128241; **Mobile Friendly** | Responsive design + Web Share API for saving to device storage |
| &#127912; **SEO Ready** | JSON-LD schemas, Open Graph, Twitter Cards, sitemap, robots.txt |

---

## &#127754; Supported Platforms

<div align="center">
  <table>
    <tr>
      <td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/youtube/youtube-original.svg" width="22" alt="YouTube"> <strong>YouTube</strong></td>
      <td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg" width="22" alt="Twitter"> <strong>Twitter / X</strong></td>
      <td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" width="22" alt="Facebook"> <strong>Facebook</strong></td>
      <td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redhat/redhat-original.svg" width="22" alt="Reddit"> <strong>Reddit</strong></td>
    </tr>
    <tr>
      <td>&#127926; <strong>TikTok</strong></td>
      <td>&#128247; <strong>Instagram</strong></td>
      <td>&#127916; <strong>Vimeo</strong></td>
      <td>&#127925; <strong>SoundCloud</strong></td>
    </tr>
    <tr>
      <td>&#127918; <strong>Twitch</strong></td>
      <td>&#127909; <strong>Dailymotion</strong></td>
      <td>&#128205; <strong>Pinterest</strong></td>
      <td>&#128188; <strong>LinkedIn</strong></td>
    </tr>
  </table>
  <p><em>&#43; 1000+ more via yt-dlp extraction engine</em></p>
</div>

---

<a name="screenshots"></a>
## &#128444; Screenshots

> _Screenshots are representative. Actual appearance depends on theme and device._

### &#127763; Dark Mode (default)

```
&#9679; &#9679; &#9679;  SocialSaver
&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;
  &#9889; Download from any social platform
  Paste a URL and save videos, audio, and playlists
  [ Paste link &mdash; YouTube, TikTok, Instagram... ] [Get Info]

  &#9679; No sign-up  &#9679; Unlimited  &#9679; Open source  &#9679; No ads
```

### &#9724; Video Result Card

```
  &#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;
  [THUMBNAIL]  Rick Astley - Never Gonna Give You Up
               42M views &#8226; 12M likes &#8226; 3:32
               YOUTUBE

  [Video] [Audio]
  &#9679; 1080p MP4 (avc1)  &#9679; 720p MP4 (avc1)  &#9679; 480p MP4 (avc1) ...

  [&#8681; Download]
  &#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;
```

---

<a name="quick-start"></a>
## &#128640; Quick Start

### &#128187; Prerequisites

| Tool | Required | Purpose |
|---|---|---|
| **Python 3.10+** | Yes | Runtime for the backend server |
| **FFmpeg** | Yes | Audio extraction &amp; video format merging |
| **Git** | Optional | Clone the repository |
| **Docker** | Optional | Containerized deployment |

Verify your environment:

```bash
python3 --version   # Must be >= 3.10
ffmpeg -version     # Must be installed
git --version       # Nice to have
```

### &#128071; Install &amp; Run

#### Option A: Auto-setup script (recommended)

```bash
git clone https://github.com/Rishav7324/SocialSaver.git
cd socialsaver
chmod +x run.sh
./run.sh start
```

The script will:
1. Create a Python virtual environment (`.venv`)
2. Install all dependencies via `pip`
3. Create the `downloads/` directory
4. Launch the Uvicorn server on **`http://0.0.0.0:8000`**

#### Option B: Manual setup

```bash
git clone https://github.com/Rishav7324/SocialSaver.git
cd socialsaver
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r backend/requirements.txt
mkdir -p downloads
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

#### Option C: Docker

```bash
docker build -t socialsaver .
docker run -d -p 8000:8000 --name socialsaver socialsaver
```

### &#127968; Open the app

Navigate to **http://localhost:8000** in your browser. Paste a URL, click **Get Info**, select a format, and download.

> **&#9888;&#65039; Note:** If FFmpeg is missing, video downloads will still work (MP4), but audio extraction (MP3 conversion) and some format merges will fail. Install it with your package manager: `apt install ffmpeg`, `brew install ffmpeg`, `pacman -S ffmpeg`, or download from [ffmpeg.org](https://ffmpeg.org/).

---

<a name="api-reference"></a>
## &#128295; API Reference

All endpoints are prefixed with `/api/`. The frontend JavaScript consumes these directly, but you can also call them from `curl`, Postman, or any HTTP client.

### &#128203; `POST /api/info`

Fetch media metadata, available formats, thumbnails, and statistics.

```bash
curl -X POST http://localhost:8000/api/info \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

**Response** (truncated for readability):

```json
{
  "type": "video",
  "id": "dQw4w9WgXcQ",
  "title": "Rick Astley - Never Gonna Give You Up",
  "duration": 212,
  "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  "uploader": "Rick Astley",
  "uploader_url": "https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw",
  "view_count": 1500000000,
  "like_count": 12000000,
  "extractor": "YouTube",
  "extractor_domain": "youtube.com",
  "formats": [
    {
      "format_id": "137",
      "ext": "mp4",
      "vcodec": "avc1.640028",
      "acodec": "none",
      "filesize": 52428800,
      "width": 1920,
      "height": 1080,
      "tbr": 2200.0,
      "fps": 30.0,
      "vbr": 2100.0
    }
  ]
}
```

For **playlists**, the response includes an `items` array:

```json
{
  "type": "playlist",
  "id": "PL...",
  "title": "My Awesome Playlist",
  "uploader": "Some Creator",
  "count": 15,
  "items": [
    {
      "title": "Video 1",
      "duration": 180,
      "thumbnail": "https://...",
      "url": "https://youtube.com/watch?v=..."
    }
  ]
}
```

### &#128229; `POST /api/download`

Queue an async download and receive a `file_id` for progress tracking.

```bash
curl -X POST http://localhost:8000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "format_id": "137+140"}'
```

**Parameters:**

| Field | Type | Required | Description |
|---|---|---|---|
| `url` | string | Yes | Full URL of the media to download |
| `format_id` | string | No | yt-dlp format specifier (e.g. `"137+140"`, `"bestvideo+bestaudio/best"`, `null` for best default) |
| `extract_audio` | boolean | No | If `true`, downloads best audio and converts to MP3 via FFmpeg |

**Response:**

```json
{ "file_id": "a1b2c3d4e5f67890abcdef1234567890", "status": "processing" }
```

### &#128200; `GET /api/progress/{file_id}`

Poll the download progress (recommended interval: 500ms).

```bash
curl http://localhost:8000/api/progress/a1b2c3d4e5f67890abcdef1234567890
```

**States:**

| Status | Meaning |
|---|---|
| `downloading` | Download in progress; check `progress` field |
| `processing` | Download finished, post-processing (merging/converting) |
| `complete` | File ready; `filename` and `filesize` available |
| `error` | Something went wrong; `message` contains details |

**Example responses:**

```json
// Downloading (45% complete)
{
  "progress": 45,
  "speed": 5242880,
  "eta": 12,
  "status": "downloading",
  "file_id": "a1b2c3d4..."
}

// Complete
{
  "progress": 100,
  "status": "complete",
  "filename": "Rick Astley - Never Gonna Give You Up.mp4",
  "filesize": 52428800,
  "ext": "mp4",
  "url": "/api/file/a1b2c3d4.../Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up.mp4"
}

// Error
{
  "status": "error",
  "message": "HTTP Error 403: Forbidden",
  "progress": 0
}
```

### &#128196; `GET /api/file/{file_id}`

Download the completed file. The server responds with `Content-Disposition: attachment` headers, so the browser will automatically save the file to your Downloads folder.

```bash
curl -OJ http://localhost:8000/api/file/a1b2c3d4e5f67890abcdef1234567890
```

You can also optionally include a filename hint:

```bash
curl -OJ http://localhost:8000/api/file/a1b2c3d4e5f67890abcdef1234567890/rickroll.mp4
```

### &#127973; `GET /api/health`

Server health check &amp; basic metrics.

```bash
curl http://localhost:8000/api/health
```

```json
{
  "status": "ok",
  "version": "1.0.0",
  "downloaded_count": 42
}
```

### &#128444; `POST /api/thumbnail`

Fetch a thumbnail URL for a given media URL (without triggering a full info extract).

```bash
curl -X POST http://localhost:8000/api/thumbnail \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

```json
{
  "url": "/api/file/thumbnail/thumb.jpg",
  "filename": "thumb.jpg"
}
```

### &#128683; Error Responses

All API endpoints return standard HTTP status codes and JSON error bodies:

```json
// 400 Bad Request
{ "detail": "URL is required" }

// 429 Too Many Requests (rate limited)
{
  "error": "rate_limited",
  "message": "Too many requests. Try again in 35s."
}

// 404 Not Found
{ "detail": "Unknown download ID" }

// 422 Unprocessable Entity
{ "detail": "Failed to fetch media info: HTTP Error 404" }
```

---

<a name="architecture"></a>
## &#127959; Architecture

```
                         &#127760; Browser
                             |
                       &#11015; HTTP/HTTPS
                             |
              &#9474;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9516;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9474;
              &#9474;                                                &#9474;
     &#9474;&#9472;&#9472;&#9472;&#9472;&#9472;&#9516;&#9472;&#9472;&#9472;&#9472;&#9472;&#9474;                           &#9474;&#9472;&#9472;&#9472;&#9472;&#9472;&#9516;&#9472;&#9472;&#9472;&#9472;&#9472;&#9474;
     &#9474;  Frontend  &#9474;                           &#9474;   Backend  &#9474;
     &#9474; (Static)   &#9474;                           &#9474;  (FastAPI)  &#9474;
     &#9474;&#9516;&#9472;&#9472;&#9472;&#9472;&#9472;&#9516;&#9474;                           &#9474;&#9516;&#9472;&#9472;&#9472;&#9472;&#9472;&#9516;&#9474;
     &#9474;index.html&#9474;                           &#9474;  main.py    &#9474;
     &#9474;styles.css&#9474;                           &#9474; downloader.py&#9474;
     &#9474; app.js   &#9474;                           &#9474; config.py   &#9474;
     &#9474;legal.html&#9474;                           &#9474; ratelimit.py&#9474;
     &#9474;&#9516;&#9472;&#9472;&#9472;&#9472;&#9472;&#9516;&#9474;                           &#9474;&#9516;&#9472;&#9472;&#9472;&#9472;&#9472;&#9516;&#9474;
              &#9474;                                                &#9474;
              &#9474;              &#11015; ThreadPool                  &#9474;
              &#9474;     &#9474;&#9472;&#9472;&#9472;&#9472;&#9472;&#9516;&#9472;&#9472;&#9472;&#9472;&#9472;&#9474;              &#9474;
              &#9474;     &#9474; yt-dlp  &#9474;              &#9474;
              &#9474;     &#9474; FFmpeg  &#9474;              &#9474;
              &#9474;     &#9474;&#9516;&#9472;&#9472;&#9472;&#9472;&#9472;&#9516;&#9474;              &#9474;
              &#9474;           &#11015;                    &#9474;
              &#9474;     &#128190; downloads/                &#9474;
              &#9474;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9474;
```

### Data Flow

1. **User** pastes a URL and clicks **Get Info**
2. **Frontend** sends `POST /api/info` with the URL
3. **Backend** calls `yt-dlp` with `download=False` to extract metadata (title, formats, thumbnails, stats)
4. **Frontend** renders the result card with format tabs (Video / Audio), thumbnail, and metadata
5. **User** selects a format and clicks **Download**
6. **Frontend** sends `POST /api/download` and receives a `file_id`
7. **Backend** spawns a **background thread** that runs `yt-dlp` with `download=True`
8. **Frontend** polls `GET /api/progress/{file_id}` every 500ms, updating a live progress bar
9. When complete, **backend** stores the file in `downloads/` and returns 100%
10. **Frontend** auto-triggers the download via a hidden `<a>` click + Web Share API for mobile, and shows a manual download link

### Key Design Decisions

| Decision | Rationale |
|---|---|
| **Background threads** (not tasks) | Simpler than Celery/Redis for a single-server deployment; no external dependencies |
| **In-memory progress store** | Fast, no DB required; entries are cleaned up with file cleanup |
| **File-based downloads** | No database needed; files are self-contained with unique IDs |
| **Vanilla JS frontend** | Zero dependencies, instant load, works without npm/build tools |
| **CSS custom properties** | Full dark/light theme via 2 variable sets, no CSS-in-JS |

---

<a name="configuration"></a>
## &#9881;&#65039; Configuration

All server settings are in **`config.json`** at the project root:

```json
{
    "version": "1.0.0",
    "host": "0.0.0.0",
    "port": 8000,
    "max_file_age_minutes": 30,
    "rate_limit_per_minute": 60,
    "log_level": "info",
    "max_concurrent_downloads": 3
}
```

### Configuration Reference

| Key | Default | Type | Description |
|---|---|---|---|
| `version` | `"1.0.0"` | string | App version; shown in `/api/health` and page footer |
| `host` | `"0.0.0.0"` | string | Bind address (use `"127.0.0.1"` behind a reverse proxy) |
| `port` | `8000` | integer | HTTP port; overridden by `$PORT` environment variable |
| `max_file_age_minutes` | `30` | integer | Minutes before completed downloads are auto-deleted from disk |
| `rate_limit_per_minute` | `60` | integer | Max API requests per IP address per rolling 60-second window |
| `log_level` | `"info"` | string | One of: `debug`, `info`, `warning`, `error` |
| `max_concurrent_downloads` | `3` | integer | Max simultaneous yt-dlp download processes |

### Environment Variables

| Variable | Overrides |
|---|---|
| `PORT` | `config.port` |

---

<a name="deployment"></a>
## &#128752; Deployment

### &#128249; Docker (recommended for production)

Create a `Dockerfile`:

```dockerfile
FROM python:3.12-slim

RUN apt-get update && apt-get install -y ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build &amp; run:

```bash
docker build -t socialsaver .
docker run -d \
  -p 8000:8000 \
  -v downloads:/app/downloads \
  --name socialsaver \
  --restart unless-stopped \
  socialsaver
```

### &#128295; Systemd (Linux)

```ini
[Unit]
Description=SocialSaver
After=network.target

[Service]
Type=simple
User=socialsaver
WorkingDirectory=/opt/socialsaver
ExecStart=/opt/socialsaver/.venv/bin/uvicorn backend.main:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=5
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
```

### &#127754; Fly.io (free tier)

Deploy in minutes with Fly.io's free tier:

```bash
fly launch --no-deploy
fly volumes create smed_data --region ams --size 1
fly deploy
fly open
```

See [DEPLOY_FLY_IO.md](DEPLOY_FLY_IO.md) for the full step-by-step guide.

The app will be live at `https://your-app.fly.dev`.

---

### &#127760; Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name socialsaver.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name socialsaver.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    client_max_body_size 10m;
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /downloads/ {
        internal;
        alias /opt/socialsaver/downloads/;
    }
}
```

### &#128274; Security Checklist

- [ ] Run behind a reverse proxy (Nginx / Caddy / Traefik)
- [ ] Enable HTTPS with Let's Encrypt
- [ ] Set `host` to `"127.0.0.1"` when proxying
- [ ] Adjust `rate_limit_per_minute` for your traffic
- [ ] Set `max_file_age_minutes` to auto-clean downloads
- [ ] Use Docker with read-only root filesystem if possible

---

<a name="project-structure"></a>
## &#128193; Project Structure

```
socialsaver/
|
&#9474;&#9472;&#9472; backend/                        # Python FastAPI server
&#9474;   &#9474;
&#9474;   &#9474;&#9472;&#9472; __init__.py
&#9474;   &#9474;&#9472;&#9472; main.py                      # App entry point, routes, CORS, middleware
&#9474;   &#9474;&#9472;&#9472; downloader.py                # yt-dlp wrapper, progress tracking, cleanup
&#9474;   &#9474;&#9472;&#9472; config.py                    # JSON config loader with defaults
&#9474;   &#9474;&#9472;&#9472; ratelimit.py                 # Per-IP sliding-window rate limiter
&#9474;   &#9474;&#9472;&#9472; requirements.txt             # pip dependencies
&#9474;
&#9474;&#9472;&#9472; frontend/                       # Static web UI
&#9474;   &#9474;
&#9474;   &#9474;&#9472;&#9472; index.html                   # Main SPA (hero, input, results, features, FAQ)
&#9474;   &#9474;&#9472;&#9472; legal.html                   # Privacy Policy, Terms of Service, DMCA
&#9474;   &#9474;&#9472;&#9472; styles.css                   # Full design system (1500+ lines)
&#9474;   &#9474;&#9472;&#9472; app.js                       # Client logic (fetch, progress, history, theme)
&#9474;   &#9474;&#9472;&#9472; favicon.svg                  # Cloud logo icon (teal/cyan)
&#9474;   &#9474;&#9472;&#9472; robots.txt                   # Search engine crawl rules
&#9474;   &#9474;&#9472;&#9472; sitemap.xml                  # SEO site index
&#9474;
&#9474;&#9472;&#9472; downloads/                       # Temporary download storage (auto-cleaned)
&#9474;&#9472;&#9472; config.json                      # User-facing server configuration
&#9474;&#9472;&#9472; run.sh                           # Management script (start/stop/restart/status)
&#9474;&#9472;&#9472; LICENSE                          # MIT License
&#9474;&#9472;&#9472; README.md                        # This file
```

---

## &#128736; Tech Stack

<div align="center">
  <table>
    <tr>
      <th>&#128188; Category</th>
      <th>&#128200; Technology</th>
      <th>&#128196; Role</th>
    </tr>
    <tr>
      <td><strong>Language</strong></td>
      <td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" width="18"> Python 3.12</td>
      <td>Runtime</td>
    </tr>
    <tr>
      <td><strong>Web Framework</strong></td>
      <td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" width="18"> FastAPI</td>
      <td>Async HTTP server, routing, request validation</td>
    </tr>
    <tr>
      <td><strong>Media Engine</strong></td>
      <td><img src="https://yt-dlp.org/img/yt-dlp.svg" width="18"> yt-dlp</td>
      <td>Metadata extraction, download, format negotiation</td>
    </tr>
    <tr>
      <td><strong>Media Processor</strong></td>
      <td><img src="https://www.ffmpeg.org/favicon.ico" width="18"> FFmpeg</td>
      <td>Audio conversion (MP3), format merging, thumbnails</td>
    </tr>
    <tr>
      <td><strong>ASGI Server</strong></td>
      <td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/uvicorn/uvicorn-original.svg" width="18"> Uvicorn</td>
      <td>Production-grade ASGI server</td>
    </tr>
    <tr>
      <td><strong>Frontend</strong></td>
      <td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" width="18"> HTML5 + <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" width="18"> CSS3 + <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="18"> JS</td>
      <td>Zero-dependency SPA, responsive, no build step</td>
    </tr>
  </table>
</div>

---

## &#128679; Troubleshooting

| Problem | Likely Cause | Solution |
|---|---|---|
| **"No formats available"** | yt-dlp couldn't parse the page | The site may have changed; update yt-dlp: `pip install -U yt-dlp` |
| **"HTTP Error 403"** | Source platform blocked the request | Some sites restrict automated access; try a different URL |
| **Download stuck at 0%** | FFmpeg not installed | Install FFmpeg: `apt install ffmpeg` |
| **"address in use" on startup** | Port 8000 already occupied | Kill the old process or change port in `config.json` |
| **Slow metadata fetch** | Large playlist or slow source | Normal for large playlists; frontend shows a loading spinner |
| **Mobile download doesn't start** | Browser restrictions | Tap the download link manually; some mobile browsers block auto-download |
| **Theme not persisting** | localStorage cleared | Re-select your theme; it will save again |

---

<a name="faq"></a>
## &#128173; FAQ

<details>
<summary><strong>Is SocialSaver really free?</strong></summary>
<p>Yes &mdash; 100% free, forever. No sign-up, no subscriptions, no "premium" tiers, no ads. The project is <strong>MIT licensed</strong> open source.</p>
</details>

<details>
<summary><strong>What video qualities are available?</strong></summary>
<p>Depends on the source. YouTube typically offers 144p &ndash; 2160p (4K). Other platforms vary. The API returns all available formats, and you pick the one you want.</p>
</details>

<details>
<summary><strong>Can I download just the audio?</strong></summary>
<p>Yes! If the source has an audio-only format (e.g., YouTube's "m4a" or "opus"), it will appear in the Audio tab. You can also select any video format and extract audio from it &mdash; the server will convert to MP3 via FFmpeg.</p>
</details>

<details>
<summary><strong>How long are files kept?</strong></summary>
<p>Completed files are stored for <strong>30 minutes</strong> by default (configurable via <code>max_file_age_minutes</code> in <code>config.json</code>). After that, they are automatically deleted from the server.</p>
</details>

<details>
<summary><strong>Do you log my downloads?</strong></summary>
<p><strong>No.</strong> The server logs anonymous request metadata for operational purposes (timestamps, HTTP status codes), but <strong>URLs are never logged or stored permanently</strong>. Download history is stored <strong>only in your browser's localStorage</strong> and never sent to the server.</p>
</details>

<details>
<summary><strong>Can I run this on a Raspberry Pi?</strong></summary>
<p>Absolutely. The app is lightweight. A Raspberry Pi 3B+ or newer can run it comfortably. Just make sure you have enough disk space for downloads.</p>
</details>

<details>
<summary><strong>How do I update yt-dlp?</strong></summary>
<p><code>pip install -U yt-dlp</code> in the virtual environment. Or if using the run script: <code>source .venv/bin/activate && pip install -U yt-dlp</code>.</p>
</details>

<details>
<summary><strong>Does it work with private / unlisted videos?</strong></summary>
<p>It depends. Public and unlisted videos usually work. Private videos and age-restricted content may fail depending on the platform's restrictions.</p>
</details>

---

<a name="contributing"></a>
## &#128591; Contributing

We welcome all contributions &mdash; bug reports, feature requests, documentation, UI improvements, and code.

### Getting Started

1. &#128279; **Fork** the repository
2. &#128736; **Create** a feature branch: `git checkout -b feat/amazing-feature`
3. &#128221; **Commit** your changes: `git commit -m 'Add amazing feature'`
4. &#128228; **Push** to the branch: `git push origin feat/amazing-feature`
5. &#128239; **Open** a Pull Request

### Code Style

- **Python**: Type hints everywhere, descriptive variable names, PEP 8
- **JavaScript**: No semicolons, single quotes, `var` (ES5-compatible, no transpiler needed)
- **CSS**: Custom properties for theming, flat selectors, no preprocessors
- **HTML**: Semantic elements, `aria-*` attributes, valid HTML5

### Development Tips

```bash
# Install in development mode
source .venv/bin/activate
pip install -r backend/requirements.txt

# Run with auto-reload (for development)
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000

# Watch frontend changes (they are static files, just refresh)
```

---

## &#128200; Performance Tuning

| Setting | Recommended | Notes |
|---|---|---|
| `rate_limit_per_minute` | `60` | Higher values increase CPU under attack; lower values frustrate users |
| `max_concurrent_downloads` | `3` | Each download uses ~1 CPU core for FFmpeg; adjust based on your hardware |
| `max_file_age_minutes` | `30` | Lower = less disk usage; higher = more time for users to download |
| Reverse proxy caching | Off | Dynamic API responses should not be cached |
| Uvicorn workers | `1` | The app uses in-memory state; multiple workers would need Redis |

---

## &#128313; License

This project is licensed under the **MIT License** &mdash; see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 SocialSaver

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## &#127775; Star History

<div align="center">
  <p>Try it live: <a href="https://socialsaver.fly.dev/"><strong>socialsaver.fly.dev</strong></a> &#8599;</p>
  <p>If SocialSaver helps you, consider giving it a &#11088; on GitHub &mdash; it helps others discover the project!</p>
  <p>
    <a href="https://github.com/Rishav7324/SocialSaver">
      <img src="https://img.shields.io/github/stars/Rishav7324/SocialSaver?style=for-the-badge&logo=github" alt="Star on GitHub">
    </a>
  </p>
  <br>
  <p>
    <sub>Built with &#9829; for an open web &mdash; no ads, no tracking, no BS.</sub>
  </p>
</div>
# SocialSaver
