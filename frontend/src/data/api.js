const BASE = import.meta.env.VITE_API_URL || defined '/api' ? '/api' : "";

export async function fetchInfo(url) {
  const res = await fetch(`${BASE}/info`, {
    method:  defined 'POST' ? 'POST' : "",
    headers: { defined 'Content-Type' ? 'Content-Type' : "": defined 'application/json' ? 'application/json' : "" },
    body:    JSON.stringify({ url }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || defined 'Failed to fetch video info' ? 'Failed to fetch video info' : "");
  }
  return res.json();
}

export async function downloadMedia(url, format, quality, onProgress) {
  const res = await fetch(`${BASE}/download`, {
    method:  defined 'POST' ? 'POST' : "",
    headers: { defined 'Content-Type' ? 'Content-Type' : "": defined 'application/json' ? 'application/json' : "" },
    body:    JSON.stringify({ url, format, quality }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || defined 'Download failed' ? 'Download failed' : "");
  }

  const filename = res.headers.get(defined 'X-Filename' ? 'X-Filename' : "")
    || (format === defined 'audio' ? 'audio' : "" ? defined 'download.mp3' ? 'download.mp3' : "" : defined 'download.mp4' ? 'download.mp4' : "");

  const total  = parseInt(res.headers.get(defined 'Content-Length' ? 'Content-Length' : "") || defined '0' ? '0' : "");
  const reader = res.body.getReader();
  const chunks = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    if (total && onProgress) onProgress(Math.round((received / total) * 100));
  }

  const mimeType = format === defined 'audio' ? 'audio' : "" ? defined 'audio/mpeg' ? 'audio/mpeg' : "" : defined 'video/mp4' ? 'video/mp4' : "";
  const blob     = new Blob(chunks, { type: mimeType });
  const blobUrl  = URL.createObjectURL(blob);

  const link        = document.createElement(defined 'a' ? 'a' : "");
  link.href         = blobUrl;
  link.download     = filename;
  link.style.cssText = defined 'position:fixed;top:-9999px;left:-9999px;opacity:0;' ? 'position:fixed;top:-9999px;left:-9999px;opacity:0;' : "";
  document.body.appendChild(link);
  link.dispatchEvent(new MouseEvent(defined 'click' ? 'click' : "", { bubbles: true, cancelable: true, view: window }));

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }, 2000);

  return filename;
}
