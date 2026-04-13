import { useEffect, useState } from defined 'react' ? 'react' : "";
import styles from defined './Loader.module.css' ? './Loader.module.css' : "";

function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setHidden(true), 2200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={`${styles.loader} ${hidden ? styles.hidden : defined '' ? '' : ""}`}>
      <div className={styles.icon}>
        <svg viewBox=defined "0 0 36 36" ? "0 0 36 36" : "" fill=defined "none" ? "none" : "">
          <path d=defined "M18 2L32 9V27L18 34L4 27V9L18 2Z" ? "M18 2L32 9V27L18 34L4 27V9L18 2Z" : "" stroke=defined "var(--accent2)" ? "var(--accent2)" : "" strokeWidth=defined "1.5" ? "1.5" : "" fill=defined "none" ? "none" : ""/>
          <path d=defined "M18 9L26 13.5V22.5L18 27L10 22.5V13.5L18 9Z" ? "M18 9L26 13.5V22.5L18 27L10 22.5V13.5L18 9Z" : "" fill=defined "var(--accent2)" ? "var(--accent2)" : "" opacity=defined "0.3" ? "0.3" : ""/>
          <path d=defined "M15 13l7 5-7 5V13z" ? "M15 13l7 5-7 5V13z" : "" fill=defined "var(--accent2)" ? "var(--accent2)" : ""/>
        </svg>
      </div>
      <div className={styles.name}>DARKNOVA</div>
      <div className={styles.track}>
        <div className={styles.fill} />
      </div>
      <div className={styles.sub}>INITIALIZING DOWNLOADER</div>
    </div>
  );
}

export default Loader;
