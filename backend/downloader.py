import yt_dlp
import asyncio
import os
import re
import tempfile
import shutil
from pathlib import Path

COOKIES_FILE = os.environ.get("COOKIES_PATH", os.path.join(os.path.dirname(__file__), "cookies.txt"))

def _cookie_opts() -> dict:
    if not os.path.exists(COOKIES_FILE):
        return {}
    tmp_cookies = os.path.join(tempfile.gettempdir(), "yt_cookies.txt")
    shutil.copy2(COOKIES_FILE, tmp_cookies)
    return {"cookiefile": tmp_cookies}

def sanitize(name: str) -> str:
    return re.sub(r'[\\/*?:"<>|]', "_", name)[:80]

def fmt_duration(seconds: int) -> str:
    if not seconds:
        return "0:00"
    m, s = divmod(int(seconds), 60)
    h, m = divmod(m, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"

def fmt_views(n) -> str:
    if not n:
        return "0"
    n = int(n)
    if n >= 1_000_000:
        return f"{n/1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n/1_000:.1f}K"
    return str(n)

def base_opts() -> dict:
    return {
        "quiet": True,
        "no_warnings": True,
        "nocheckcertificate": True,
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "http_headers": {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-us,en;q=0.5",
            "Sec-Fetch-Mode": "navigate",
        },
        "extractor_args": {
            "youtube": {
                "player_client": ["tv_embedded", "ios", "web"],
                "player_skip": ["webpage", "configs"],
            }
        },
        **_cookie_opts(),
    }

async def fetch_info(url: str) -> dict:
    opts = {**base_opts(), "skip_download": True, "extract_flat": False}

    def _extract():
        with yt_dlp.YoutubeDL(opts) as ydl:
            return ydl.extract_info(url, download=False)

    info = await asyncio.to_thread(_extract)

    seen_heights = set()
    qualities = []
    for f in info.get("formats", []):
        h = f.get("height")
        if h and h not in seen_heights:
            seen_heights.add(h)
            qualities.append({"label": f"{h}p", "value": f"{h}p"})

    qualities = sorted(qualities, key=lambda x: int(x["value"][:-1]), reverse=True)
    qualities.insert(0, {"label": "BEST", "value": "best"})

    thumbnail = info.get("thumbnail", "")
    if not thumbnail:
        thumbs = info.get("thumbnails", [])
        if thumbs:
            thumbnail = thumbs[-1].get("url", "")

    return {
        "title":     info.get("title", "Unknown"),
        "thumbnail": thumbnail,
        "duration":  fmt_duration(info.get("duration", 0)),
        "uploader":  info.get("uploader") or info.get("channel") or "Unknown",
        "views":     fmt_views(info.get("view_count")),
        "platform":  info.get("extractor_key", "Unknown"),
        "qualities": qualities,
    }

async def stream_download(url: str, fmt: str, quality: str):
    is_audio = fmt == "audio"
    ext = "mp3" if is_audio else "mp4"
    tmp_dir = tempfile.mkdtemp()

    if is_audio:
        fmt_selector = "bestaudio/best"
    elif quality == "best":
        fmt_selector = "bestvideo+bestaudio/bestvideo/best"
    else:
        h = quality.replace("p", "")
        fmt_selector = (
            f"bestvideo[height<={h}][ext=mp4]+bestaudio[ext=m4a]"
            f"/bestvideo[height<={h}]+bestaudio"
            f"/bestvideo[height<={h}]"
            f"/best[height<={h}]"
            f"/bestvideo+bestaudio"
            f"/bestvideo"
            f"/best"
        )

    post_processors = []
    if is_audio:
        post_processors = [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "192",
        }]

    opts = {
        **base_opts(),
        "format": fmt_selector,
        "outtmpl": os.path.join(tmp_dir, "%(title)s.%(ext)s"),
        "merge_output_format": ext,
        "postprocessors": post_processors,
        "retries": 10,
        "fragment_retries": 10,
        "file_access_retries": 5,
        "buffersize": 1024,
        "http_chunk_size": 10485760,
    }

    def _download():
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(url, download=True)
            return sanitize(info.get("title", "download"))

    title = await asyncio.to_thread(_download)

    files = list(Path(tmp_dir).glob(f"*.{ext}"))
    if not files:
        files = list(Path(tmp_dir).iterdir())
    if not files:
        raise RuntimeError("Download produced no output file")

    filepath = files[0]
    filename  = f"{title}.{ext}"
    mime = "audio/mpeg" if ext == "mp3" else "video/mp4"

    def file_iter():
        with open(filepath, "rb") as f:
            while chunk := f.read(512 * 1024):
                yield chunk
        try:
            filepath.unlink()
            Path(tmp_dir).rmdir()
        except Exception:
            pass

    return file_iter(), filename, mime
