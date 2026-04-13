import yt_dlp
import asyncio
import os
import re
import tempfile
import shutil
from pathlib import Path

QUALITY_MAP = {
    "best":  "bestvideo+bestaudio/best",
    "1080p": "bestvideo[height<=1080]+bestaudio/best[height<=1080]",
    "720p":  "bestvideo[height<=720]+bestaudio/best[height<=720]",
    "480p":  "bestvideo[height<=480]+bestaudio/best[height<=480]",
    "360p":  "bestvideo[height<=360]+bestaudio/best[height<=360]",
}

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

async def fetch_info(url: str) -> dict:
    opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "extract_flat": False,
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "extractor_args": {
            "youtube": {
                "player_client": ["ios", "web"],
            }
        },
        **_cookie_opts(),
    }

    def _extract():
        with yt_dlp.YoutubeDL(opts) as ydl:
            return ydl.extract_info(url, download=False)

    info = await asyncio.to_thread(_extract)

    seen_heights = set()
    qualities = []
    for f in info.get("formats", []):
        h = f.get("height")
        if h and h not in seen_heights and f.get("vcodec", "none") != "none":
            seen_heights.add(h)
            qualities.append({"label": f"{h}p", "value": f"{h}p"})

    qualities = sorted(qualities, key=lambda x: int(x["value"][:-1]), reverse=True)
    qualities.insert(0, {"label": "BEST", "value": "best"})

    return {
        "title":     info.get("title", "Unknown"),
        "thumbnail": info.get("thumbnail", ""),
        "duration":  fmt_duration(info.get("duration", 0)),
        "uploader":  info.get("uploader", "Unknown"),
        "views":     fmt_views(info.get("view_count")),
        "platform":  info.get("extractor_key", "Unknown"),
        "qualities": qualities,
    }

async def stream_download(url: str, fmt: str, quality: str):
    is_audio = fmt == "audio"
    fmt_selector = "bestaudio/best" if is_audio else QUALITY_MAP.get(quality, QUALITY_MAP["best"])
    ext = "mp3" if is_audio else "mp4"

    tmp_dir = tempfile.mkdtemp()

    post_processors = []
    if is_audio:
        post_processors = [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "192",
        }]

    opts = {
        "format": fmt_selector,
        "outtmpl": os.path.join(tmp_dir, "%(title)s.%(ext)s"),
        "quiet": True,
        "no_warnings": True,
        "merge_output_format": ext,
        "postprocessors": post_processors,
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "extractor_args": {
            "youtube": {
                "player_client": ["ios", "web"],
            }
        },
        **_cookie_opts(),
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
