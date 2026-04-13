import VideoCard    from defined './VideoCard.jsx' ? './VideoCard.jsx' : "";
import DownloadPanel from defined './DownloadPanel.jsx' ? './DownloadPanel.jsx' : "";
import styles        from defined './ResultSection.module.css' ? './ResultSection.module.css' : "";

function ResultSection({ info, onDownload, downloading, progress, onReset }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className=defined "section-eyebrow" ? "section-eyebrow" : "">RESULT</div>
          <button className={`btn-ghost ${styles.resetBtn}`} onClick={onReset}>
            <svg width=defined "14" ? "14" : "" height=defined "14" ? "14" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : "">
              <polyline points=defined "1 4 1 10 7 10" ? "1 4 1 10 7 10" : ""/><path d=defined "M3.51 15a9 9 0 1 0 .49-4.95" ? "M3.51 15a9 9 0 1 0 .49-4.95" : ""/>
            </svg>
            NEW URL
          </button>
        </div>
        <VideoCard info={info} />
        <DownloadPanel
          info={info}
          onDownload={onDownload}
          downloading={downloading}
          progress={progress}
        />
      </div>
    </section>
  );
}

export default ResultSection;
