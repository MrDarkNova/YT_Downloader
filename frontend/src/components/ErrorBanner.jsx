import styles from './ErrorBanner.module.css';

function ErrorBanner({ message, onDismiss }) {
  return (
    <div className={`${styles.banner} reveal`}>
      <div className={styles.icon}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>ERROR</div>
        <div className={styles.msg}>{message}</div>
      </div>
      <button className={styles.dismiss} onClick={onDismiss} title="Dismiss">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}

export default ErrorBanner;
