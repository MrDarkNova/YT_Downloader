import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>MR. DARKNOVA</div>
      <div className={styles.copy}>© {new Date().getFullYear()} Victor Kumba. Built with precision.</div>
      <div className={styles.links}>
        <a href="https://github.com/MrDarkNova" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://mrdarknova.indevs.in" target="_blank" rel="noopener noreferrer">Portfolio</a>
        <a href="mailto:contact@mrdarknova.indevs.in">Email</a>
      </div>
    </footer>
  );
}

export default Footer;
