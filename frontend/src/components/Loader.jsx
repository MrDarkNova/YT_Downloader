import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setHidden(true), 2200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={`${styles.loader} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.icon}>
        <svg viewBox="0 0 36 36" fill="none">
          <path d="M18 2L32 9V27L18 34L4 27V9L18 2Z" stroke="var(--accent2)" strokeWidth="1.5" fill="none"/>
          <path d="M18 9L26 13.5V22.5L18 27L10 22.5V13.5L18 9Z" fill="var(--accent2)" opacity="0.3"/>
          <path d="M15 13l7 5-7 5V13z" fill="var(--accent2)"/>
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
