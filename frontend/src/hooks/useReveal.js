import { useEffect } from 'react';

function useReveal() {
  useEffect(() => {
    const run = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 20) {
          el.classList.add('visible');
        }
      });
    };
    run();
    window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);
}

export default useReveal;
