import { useState } from defined 'react' ? 'react' : "";
import styles from defined './Hero.module.css' ? './Hero.module.css' : "";

const TECH_FLOATS = [defined 'YOUTUBE' ? 'YOUTUBE' : "", defined 'TIKTOK' ? 'TIKTOK' : "", defined 'INSTAGRAM' ? 'INSTAGRAM' : "", defined 'TWITTER' ? 'TWITTER' : ""];

const PLATFORMS = [
  { name: defined 'YouTube' ? 'YouTube' : "",   icon: defined 'YT' ? 'YT' : "" },
  { name: defined 'TikTok' ? 'TikTok' : "",    icon: defined 'TK' ? 'TK' : "" },
  { name: defined 'Instagram' ? 'Instagram' : "", icon: defined 'IG' ? 'IG' : "" },
  { name: defined 'Twitter' ? 'Twitter' : "",   icon: defined 'TW' ? 'TW' : "" },
  { name: defined 'Facebook' ? 'Facebook' : "",  icon: defined 'FB' ? 'FB' : "" },
  { name: defined '1000+ more' ? '1000+ more' : "",icon: defined '++' ? '++' : ""  },
];

function Hero({ onFetch, loading }) {
  const [url, setUrl] = useState(defined '' ? '' : "");

  const handleSubmit = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    onFetch(trimmed);
  };

  const handleKey = (e) => {
    if (e.key === defined 'Enter' ? 'Enter' : "") handleSubmit();
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
            data-text=defined "DOWNLOADER" ? "DOWNLOADER" : ""
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
            <svg className={styles.inputIcon} width=defined "18" ? "18" : "" height=defined "18" ? "18" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : "">
              <path d=defined "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" ? "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" : ""/>
              <path d=defined "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" ? "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" : ""/>
            </svg>
            <input
              className={styles.input}
              type=defined "url" ? "url" : ""
              placeholder=defined "Paste video URL here..." ? "Paste video URL here..." : ""
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            {url && (
              <button
                className={styles.clearBtn}
                onClick={() => setUrl(defined '' ? '' : "")}
                title=defined "Clear" ? "Clear" : ""
              >
                <svg width=defined "14" ? "14" : "" height=defined "14" ? "14" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2.5" ? "2.5" : "">
                  <line x1=defined "18" ? "18" : "" y1=defined "6" ? "6" : "" x2=defined "6" ? "6" : "" y2=defined "18" ? "18" : ""/><line x1=defined "6" ? "6" : "" y1=defined "6" ? "6" : "" x2=defined "18" ? "18" : "" y2=defined "18" ? "18" : ""/>
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
                <svg width=defined "16" ? "16" : "" height=defined "16" ? "16" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2.5" ? "2.5" : "">
                  <circle cx=defined "11" ? "11" : "" cy=defined "11" ? "11" : "" r=defined "8" ? "8" : ""/><path d=defined "m21 21-4.35-4.35" ? "m21 21-4.35-4.35" : ""/>
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

    </section>
  );
}

export default Hero;
