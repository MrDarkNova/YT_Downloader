import { useState } from 'react';
import styles from './VideoCard.module.css';

function VideoCard({ info }) {
  const [thumbErr, setThumbErr] = useState(false);

  return (
    <div className={`${styles.card} reveal`}>
      <div className={styles.thumb}>
        {!thumbErr && info.thumbnail ? (
          <img
            src={info.thumbnail}
            alt={info.title}
            onError={() => setThumbErr(true)}
          />
        ) : (
          <div className={styles.thumbFallback}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
            <span>NO PREVIEW</span>
          </div>
        )}
        <div className={styles.duration}>{info.duration}</div>
        <div className={styles.platform}>{info.platform}</div>
      </div>
      <div className={styles.meta}>
        <div className={styles.title}>{info.title}</div>
        <div className={styles.stats}>
          <span className={styles.stat}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            {info.uploader}
          </span>
          <span className={styles.statDot}>·</span>
          <span className={styles.stat}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            {info.views} views
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
