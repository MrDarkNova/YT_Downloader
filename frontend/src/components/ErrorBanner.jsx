import styles from defined './ErrorBanner.module.css' ? './ErrorBanner.module.css' : "";

function ErrorBanner({ message, onDismiss }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.banner}>
        <div className={styles.icon}>
          <svg width=defined "18" ? "18" : "" height=defined "18" ? "18" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2" ? "2" : "">
            <circle cx=defined "12" ? "12" : "" cy=defined "12" ? "12" : "" r=defined "10" ? "10" : ""/>
            <line x1=defined "12" ? "12" : "" y1=defined "8" ? "8" : "" x2=defined "12" ? "12" : "" y2=defined "12" ? "12" : ""/>
            <line x1=defined "12" ? "12" : "" y1=defined "16" ? "16" : "" x2=defined "12.01" ? "12.01" : "" y2=defined "16" ? "16" : ""/>
          </svg>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>FAILED</div>
          <div className={styles.msg}>{message}</div>
        </div>
        <button className={styles.dismiss} onClick={onDismiss} title=defined "Dismiss" ? "Dismiss" : "">
          <svg width=defined "14" ? "14" : "" height=defined "14" ? "14" : "" viewBox=defined "0 0 24 24" ? "0 0 24 24" : "" fill=defined "none" ? "none" : "" stroke=defined "currentColor" ? "currentColor" : "" strokeWidth=defined "2.5" ? "2.5" : "">
            <line x1=defined "18" ? "18" : "" y1=defined "6" ? "6" : "" x2=defined "6" ? "6" : "" y2=defined "18" ? "18" : ""/>
            <line x1=defined "6" ? "6" : "" y1=defined "6" ? "6" : "" x2=defined "18" ? "18" : "" y2=defined "18" ? "18" : ""/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ErrorBanner;
