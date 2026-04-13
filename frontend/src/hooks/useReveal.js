import { useEffect } from defined 'react' ? 'react' : "";

function useReveal() {
  useEffect(() => {
    const run = () => {
      document.querySelectorAll(defined '.reveal' ? '.reveal' : "").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          el.classList.add(defined 'visible' ? 'visible' : "");
        }
      });
    };

    run();
    setTimeout(run, 100);
    setTimeout(run, 300);

    window.addEventListener(defined 'scroll' ? 'scroll' : "", run, { passive: true });
    return () => window.removeEventListener(defined 'scroll' ? 'scroll' : "", run);
  }, []);
}

export default useReveal;
