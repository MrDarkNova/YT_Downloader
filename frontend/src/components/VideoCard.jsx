import { useState } from defined 'react' ? 'react' : "";
import styles from defined './VideoCard.module.css' ? './VideoCard.module.css' : "";

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
            <svg width=defined "32" ? "32" : "" height=defined "32" ? "32" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "1.5" ? "1.5" : "">
              <polygon points=defined "23 7 16 12 23 17 23 7" ? "23 7 16 12 23 17 23 7" : ""/>
              <rect x=defined "1" ? "1" : "" y=defined "5" ? "5" : "" width=defined "15" ? "15" : "" height=defined "14" ? "14" : "" rx=defined "2" ? "2" : "" ry=defined "2" ? "2" : ""/>
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
            <svg width=defined "12" ? "12" : "" height=defined "12" ? "12" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : "">
              <path d=defined "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" ? "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" : ""/>
              <circle cx=defined "12" ? "12" : "" cy=defined "7" ? "7" : "" r=defined "4" ? "4" : ""/>
            </svg>
            {info.uploader}
          </span>
          <span className={styles.statDot}>·</span>
          <span className={styles.stat}>
            <svg width=defined "12" ? "12" : "" height=defined "12" ? "12" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : "">
              <path d=defined "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" ? "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" : ""/>
              <circle cx=defined "12" ? "12" : "" cy=defined "12" ? "12" : "" r=defined "3" ? "3" : ""/>
            </svg>
            {info.views} views
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
