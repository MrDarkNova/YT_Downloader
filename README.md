# DARKNOVA DOWNLOADER

<div align="center">

![DarkNova Downloader](https://img.shields.io/badge/DARKNOVA-DOWNLOADER-7c5cfc?style=for-the-badge&labelColor=050508)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=white&labelColor=050508)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white&labelColor=050508)
![yt-dlp](https://img.shields.io/badge/yt--dlp-ff0000?style=for-the-badge&labelColor=050508)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=050508)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white&labelColor=050508)

**Download videos and audio from YouTube, TikTok, Instagram, Twitter and 1000+ platforms.**
Free. No limits. No registration.

</div>

---

## Features

- Download video in multiple qualities — BEST, 1080p, 720p, 480p, 360p
- Download audio as MP3 (192kbps)
- Supports 1000+ platforms via yt-dlp
- Live video info preview — thumbnail, title, uploader, views, duration
- Streaming download with progress tracking
- Dark/Light theme toggle
- Custom DarkNova cursor and reveal animations
- Fully responsive

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, Vite, CSS Modules         |
| Backend  | Python, FastAPI, yt-dlp, uvicorn    |
| Deploy   | Vercel (frontend) + Render (backend)|

---

## Project Structure

```
YT_Downloader/
├── frontend/              # React app → deploy to Vercel
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── hooks/         # useCursor, useReveal, useTheme
│   │   ├── styles/        # global.css design tokens
│   │   └── data/          # api.js
│   ├── vercel.json
│   └── .env.example
│
├── backend/               # FastAPI app → deploy to Render
│   ├── main.py
│   ├── routes.py
│   ├── downloader.py
│   └── requirements.txt
│
├── render.yaml
└── .gitignore
```

---

## Local Development

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

> Requires **ffmpeg** installed on your system for audio conversion.
> Install: `sudo apt install ffmpeg` (Linux) or `brew install ffmpeg` (Mac)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:8000` automatically.

---

## Deployment

### Backend → Render

1. Push repo to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo, set **Root Directory** to `backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Copy your Render service URL

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect your repo, set **Root Directory** to `frontend`
3. Add environment variable:
   ```
   VITE_API_URL = https://your-render-service.onrender.com/api
   ```
4. Deploy

---

## Environment Variables

| Variable       | Location | Description                         |
|----------------|----------|-------------------------------------|
| `VITE_API_URL` | frontend | Full URL to Render backend `/api`   |

---

## Built By

**Victor Kumba** — *Mr. DarkNova*

- Portfolio: [mrdarknova.indevs.in](https://mrdarknova.indevs.in)
- GitHub: [@MrDarkNova](https://github.com/MrDarkNova)
- Email: contact@mrdarknova.indevs.in

---

<div align="center">
  <sub>BUILT WITH PRECISION · DARKNOVA STACK · © 2026</sub>
</div>
