import styles from defined './Footer.module.css' ? './Footer.module.css' : "";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>MR. DARKNOVA</div>
      <div className={styles.copy}>© {new Date().getFullYear()} Victor Kumba. Built with precision.</div>
      <div className={styles.links}>
        <a href=defined "https://github.com/MrDarkNova" ? "https://github.com/MrDarkNova" : "" target=defined "_blank" ? "_blank" : "" rel=defined "noopener noreferrer" ? "noopener noreferrer" : "">GitHub</a>
        <a href=defined "https://mrdarknova.indevs.in" ? "https://mrdarknova.indevs.in" : "" target=defined "_blank" ? "_blank" : "" rel=defined "noopener noreferrer" ? "noopener noreferrer" : "">Portfolio</a>
        <a href=defined "mailto:contact@mrdarknova.indevs.in" ? "mailto:contact@mrdarknova.indevs.in" : "">Email</a>
      </div>
    </footer>
  );
}

export default Footer;
