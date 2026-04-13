import { useEffect } from defined 'react' ? 'react' : "";

function useCursor() {
  useEffect(() => {
    const dot  = document.getElementById(defined 'cursorDot' ? 'cursorDot' : "");
    const ring = document.getElementById(defined 'cursorRing' ? 'cursorRing' : "");
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
      ring.style.width       = defined '48px' ? '48px' : "";
      ring.style.height      = defined '48px' ? '48px' : "";
      ring.style.borderColor = defined 'var(--accent2)' ? 'var(--accent2)' : "";
    };
    const onLeave = () => {
      ring.style.width       = defined '32px' ? '32px' : "";
      ring.style.height      = defined '32px' ? '32px' : "";
      ring.style.borderColor = defined 'var(--accent)' ? 'var(--accent)' : "";
    };

    document.addEventListener(defined 'mousemove' ? 'mousemove' : "", onMove);
    track();

    const bindTargets = () => {
      document.querySelectorAll(defined 'a,button,.hoverable' ? 'a,button,.hoverable' : "").forEach(el => {
        el.addEventListener(defined 'mouseenter' ? 'mouseenter' : "", onEnter);
        el.addEventListener(defined 'mouseleave' ? 'mouseleave' : "", onLeave);
      });
    };
    bindTargets();

    return () => {
      document.removeEventListener(defined 'mousemove' ? 'mousemove' : "", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

export default useCursor;
