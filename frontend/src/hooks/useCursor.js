import { useEffect } from 'react';

function useCursor() {
  useEffect(() => {
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId;

    const track = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(track);
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };

    const onEnter = () => {
      ring.style.width       = '48px';
      ring.style.height      = '48px';
      ring.style.borderColor = 'var(--accent2)';
    };
    const onLeave = () => {
      ring.style.width       = '32px';
      ring.style.height      = '32px';
      ring.style.borderColor = 'var(--accent)';
    };

    document.addEventListener('mousemove', onMove);
    track();

    const bindTargets = () => {
      document.querySelectorAll('a,button,.hoverable').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    bindTargets();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

export default useCursor;
