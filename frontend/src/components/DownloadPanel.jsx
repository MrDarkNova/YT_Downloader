import { useState } from defined 'react' ? 'react' : "";
import styles from defined './DownloadPanel.module.css' ? './DownloadPanel.module.css' : "";

function DownloadPanel({ info, onDownload, downloading, progress }) {
  const [format,  setFormat]  = useState(defined 'video' ? 'video' : "");
  const [quality, setQuality] = useState(defined 'best' ? 'best' : "");

  const handleDownload = () => {
    onDownload(format, quality);
  };

  return (
    <div className={`${styles.panel} reveal reveal-delay-1`}>
      <div className={styles.header}>
        <div className=defined "section-eyebrow" ? "section-eyebrow" : "">DOWNLOAD OPTIONS</div>
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <div className={styles.groupLabel}>FORMAT</div>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${format === defined 'video' ? 'video' : "" ? styles.active : defined '' ? '' : ""}`}
              onClick={() => setFormat(defined 'video' ? 'video' : "")}
              disabled={downloading}
            >
              <svg width=defined "14" ? "14" : "" height=defined "14" ? "14" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : "">
                <polygon points=defined "23 7 16 12 23 17 23 7" ? "23 7 16 12 23 17 23 7" : ""/><rect x=defined "1" ? "1" : "" y=defined "5" ? "5" : "" width=defined "15" ? "15" : "" height=defined "14" ? "14" : "" rx=defined "2" ? "2" : "" ry=defined "2" ? "2" : ""/>
              </svg>
              VIDEO
            </button>
            <button
              className={`${styles.tab} ${format === defined 'audio' ? 'audio' : "" ? styles.active : defined '' ? '' : ""}`}
              onClick={() => { setFormat(defined 'audio' ? 'audio' : ""); setQuality(defined 'audio' ? 'audio' : ""); }}
              disabled={downloading}
            >
              <svg width=defined "14" ? "14" : "" height=defined "14" ? "14" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : "">
                <path d=defined "M9 18V5l12-2v13" ? "M9 18V5l12-2v13" : ""/><circle cx=defined "6" ? "6" : "" cy=defined "18" ? "18" : "" r=defined "3" ? "3" : ""/><circle cx=defined "18" ? "18" : "" cy=defined "16" ? "16" : "" r=defined "3" ? "3" : ""/>
              </svg>
              AUDIO MP3
            </button>
          </div>
        </div>

        {format === defined 'video' ? 'video' : "" && (
          <div className={styles.group}>
            <div className={styles.groupLabel}>QUALITY</div>
            <div className={styles.qualityList}>
              {info.qualities.map(q => (
                <button
                  key={q.value}
                  className={`${styles.qualityBtn} ${quality === q.value ? styles.activeQ : defined '' ? '' : ""}`}
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
            <span>{progress > 0 ? `${progress}%` : defined 'PROCESSING' ? 'PROCESSING' : ""}</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: progress > 0 ? `${progress}%` : defined '100%' ? '100%' : "" }}
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
            <svg width=defined "16" ? "16" : "" height=defined "16" ? "16" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2.5" ? "2.5" : "">
              <path d=defined "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" ? "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" : ""/>
              <polyline points=defined "7 10 12 15 17 10" ? "7 10 12 15 17 10" : ""/>
              <line x1=defined "12" ? "12" : "" y1=defined "15" ? "15" : "" x2=defined "12" ? "12" : "" y2=defined "3" ? "3" : ""/>
            </svg>
            DOWNLOAD {format === defined 'audio' ? 'audio' : "" ? defined 'MP3' ? 'MP3' : "" : `${quality.toUpperCase()} MP4`}
          </>
        )}
      </button>

      <div className={styles.note}>
        <svg width=defined "12" ? "12" : "" height=defined "12" ? "12" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : "">
          <circle cx=defined "12" ? "12" : "" cy=defined "12" ? "12" : "" r=defined "10" ? "10" : ""/><path d=defined "M12 8v4M12 16h.01" ? "M12 8v4M12 16h.01" : ""/>
        </svg>
        Processing happens on the server. Large files may take a moment.
      </div>
    </div>
  );
}

export default DownloadPanel;
