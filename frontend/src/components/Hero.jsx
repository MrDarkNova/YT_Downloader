import { useState } from 'react';
import styles from './Hero.module.css';

const TECH_FLOATS = ['YOUTUBE', 'TIKTOK', 'INSTAGRAM', 'TWITTER'];

const PLATFORMS = [
  { name: 'YouTube',   icon: 'YT' },
  { name: 'TikTok',    icon: 'TK' },
  { name: 'Instagram', icon: 'IG' },
  { name: 'Twitter',   icon: 'TW' },
  { name: 'Facebook',  icon: 'FB' },
  { name: '1000+ more',icon: '++'  },
];

function Hero({ onFetch, loading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    onFetch(trimmed);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <div className={styles.grid} />
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        {TECH_FLOATS.map(t => (
          <div key={t} className={styles.techFloat}>{t}</div>
        ))}
      </div>

      <div className={styles.content}>
        <div className={`${styles.badge} reveal`}>
          <span className={styles.badgeDot} />
          FREE · NO LIMITS · NO ADS
        </div>

        <h1 className={`${styles.title} reveal reveal-delay-1`}>
          <span className={styles.line1}>DARKNOVA</span>
          <span
            className={styles.line2}
            data-text="DOWNLOADER"
          >
            DOWNLOADER
          </span>
        </h1>

        <p className={`${styles.subtitle} reveal reveal-delay-2`}>
          Download videos and audio from YouTube, TikTok, Instagram, Twitter and 1000+ platforms.
          Fast, free, and no registration needed.
        </p>

        <div className={`${styles.inputWrap} reveal reveal-delay-2`}>
          <div className={styles.inputBox}>
            <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            <input
              className={styles.input}
              type="url"
              placeholder="Paste video URL here..."
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            {url && (
              <button
                className={styles.clearBtn}
                onClick={() => setUrl('')}
                title="Clear"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
          <button
            className={styles.fetchBtn}
            onClick={handleSubmit}
            disabled={loading || !url.trim()}
          >
            {loading ? (
              <>
                <span className={styles.spinner} />
                FETCHING...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                ANALYZE
              </>
            )}
          </button>
        </div>

        <div className={`${styles.platforms} reveal reveal-delay-3`}>
          <span className={styles.platformsLabel}>SUPPORTS</span>
          <div className={styles.platformList}>
            {PLATFORMS.map(p => (
              <div key={p.name} className={styles.platform} title={p.name}>
                <span className={styles.platformIcon}>{p.icon}</span>
                <span className={styles.platformName}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.scroll}>
        SCROLL
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}

export default Hero;
