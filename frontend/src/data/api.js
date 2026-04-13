const BASE = import.meta.env.VITE_API_URL || '/api';

export async function fetchInfo(url) {
  const res = await fetch(`${BASE}/info`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ url }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Failed to fetch video info');
  }
  return res.json();
}

export async function downloadMedia(url, format, quality, onProgress) {
  const res = await fetch(`${BASE}/download`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ url, format, quality }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Download failed');
  }

  const filename = res.headers.get('X-Filename')
    || (format === 'audio' ? 'download.mp3' : 'download.mp4');

  const total  = parseInt(res.headers.get('Content-Length') || '0');
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

  const mimeType = format === 'audio' ? 'audio/mpeg' : 'video/mp4';
  const blob     = new Blob(chunks, { type: mimeType });
  const blobUrl  = URL.createObjectURL(blob);

  const link        = document.createElement('a');
  link.href         = blobUrl;
  link.download     = filename;
  link.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
  document.body.appendChild(link);
  link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }, 2000);

  return filename;
}
