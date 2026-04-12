from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from downloader import fetch_info, stream_download

router = APIRouter()

class InfoRequest(BaseModel):
    url: str

class DownloadRequest(BaseModel):
    url: str
    format: str
    quality: str

@router.get("/health")
async def health():
    return {"status": "ok", "service": "DarkNova Downloader"}

@router.post("/info")
async def get_info(body: InfoRequest):
    try:
        info = await fetch_info(body.url)
        return info
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/download")
async def download(body: DownloadRequest):
    try:
        gen, filename, mime = await stream_download(body.url, body.format, body.quality)
        headers = {
            "Content-Disposition": f'attachment; filename="{filename}"',
            "X-Filename": filename,
            "Access-Control-Expose-Headers": "X-Filename, Content-Disposition",
        }
        return StreamingResponse(gen, media_type=mime, headers=headers)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
