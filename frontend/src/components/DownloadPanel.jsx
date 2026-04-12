import { useState } from 'react';
import styles from './DownloadPanel.module.css';

function DownloadPanel({ info, onDownload, downloading, progress }) {
  const [format,  setFormat]  = useState('video');
  const [quality, setQuality] = useState('best');

  const handleDownload = () => {
    onDownload(format, quality);
  };

  return (
    <div className={`${styles.panel} reveal reveal-delay-1`}>
      <div className={styles.header}>
        <div className="section-eyebrow">DOWNLOAD OPTIONS</div>
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <div className={styles.groupLabel}>FORMAT</div>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${format === 'video' ? styles.active : ''}`}
              onClick={() => setFormat('video')}
              disabled={downloading}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              VIDEO
            </button>
            <button
              className={`${styles.tab} ${format === 'audio' ? styles.active : ''}`}
              onClick={() => { setFormat('audio'); setQuality('audio'); }}
              disabled={downloading}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
              </svg>
              AUDIO MP3
            </button>
          </div>
        </div>

        {format === 'video' && (
          <div className={styles.group}>
            <div className={styles.groupLabel}>QUALITY</div>
            <div className={styles.qualityList}>
              {info.qualities.map(q => (
                <button
                  key={q.value}
                  className={`${styles.qualityBtn} ${quality === q.value ? styles.activeQ : ''}`}
                  onClick={() => setQuality(q.value)}
                  disabled={downloading}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {downloading && (
        <div className={styles.progressWrap}>
          <div className={styles.progressLabel}>
            <span>DOWNLOADING...</span>
            <span>{progress > 0 ? `${progress}%` : 'PROCESSING'}</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: progress > 0 ? `${progress}%` : '100%' }}
              data-indeterminate={progress === 0}
            />
          </div>
        </div>
      )}

      <button
        className={styles.downloadBtn}
        onClick={handleDownload}
        disabled={downloading}
      >
        {downloading ? (
          <>
            <span className={styles.spinner} />
            DOWNLOADING...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            DOWNLOAD {format === 'audio' ? 'MP3' : `${quality.toUpperCase()} MP4`}
          </>
        )}
      </button>

      <div className={styles.note}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
        </svg>
        Processing happens on the server. Large files may take a moment.
      </div>
    </div>
  );
}

export default DownloadPanel;
