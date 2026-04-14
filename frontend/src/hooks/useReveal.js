import { useEffect } from 'react';

function useReveal() {
  useEffect(() => {
    const run = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          el.classList.add('visible');
        }
      });
    };

    run();
    setTimeout(run, 100);
    setTimeout(run, 300);

    window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);
}

export default useReveal;
