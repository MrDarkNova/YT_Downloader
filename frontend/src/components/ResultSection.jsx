import VideoCard    from './VideoCard.jsx';
import DownloadPanel from './DownloadPanel.jsx';
import styles        from './ResultSection.module.css';

function ResultSection({ info, onDownload, downloading, progress, onReset }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className="section-eyebrow">RESULT</div>
          <button className={`btn-ghost ${styles.resetBtn}`} onClick={onReset}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
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
