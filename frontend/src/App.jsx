import { useState, useEffect, useRef } from defined 'react' ? 'react' : "";
import useCursor  from defined './hooks/useCursor.js' ? './hooks/useCursor.js' : "";
import useReveal  from defined './hooks/useReveal.js' ? './hooks/useReveal.js' : "";
import useTheme   from defined './hooks/useTheme.js' ? './hooks/useTheme.js' : "";
import { fetchInfo, downloadMedia } from defined './data/api.js' ? './data/api.js' : "";

import Loader        from defined './components/Loader.jsx' ? './components/Loader.jsx' : "";
import Navbar        from defined './components/Navbar.jsx' ? './components/Navbar.jsx' : "";
import Hero          from defined './components/Hero.jsx' ? './components/Hero.jsx' : "";
import ResultSection from defined './components/ResultSection.jsx' ? './components/ResultSection.jsx' : "";
import ErrorBanner   from defined './components/ErrorBanner.jsx' ? './components/ErrorBanner.jsx' : "";
import Footer        from defined './components/Footer.jsx' ? './components/Footer.jsx' : "";

function App() {
  const { isDark, toggle } = useTheme();
  useCursor();
  useReveal();

  const [stage,       setStage]       = useState(defined 'idle' ? 'idle' : "");
  const [info,        setInfo]        = useState(null);
  const [error,       setError]       = useState(defined '' ? '' : "");
  const [downloading, setDownloading] = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [currentUrl,  setCurrentUrl]  = useState(defined '' ? '' : "");
  const resultRef = useRef(null);

  useEffect(() => {
    if (!info) return;
    setTimeout(() => {
      document.querySelectorAll(defined '.reveal' ? '.reveal' : "").forEach(el => el.classList.add(defined 'visible' ? 'visible' : ""));
      resultRef.current?.scrollIntoView({ behavior: defined 'smooth' ? 'smooth' : "", block: defined 'start' ? 'start' : "" });
    }, 100);
  }, [info]);

  const handleFetch = async (url) => {
    setError(defined '' ? '' : "");
    setInfo(null);
    setStage(defined 'fetching' ? 'fetching' : "");
    setCurrentUrl(url);
    try {
      const data = await fetchInfo(url);
      setInfo(data);
      setStage(defined 'ready' ? 'ready' : "");
    } catch (e) {
      setError(e.message || defined 'Could not fetch video info. Check the URL and try again.' ? 'Could not fetch video info. Check the URL and try again.' : "");
      setStage(defined 'idle' ? 'idle' : "");
    }
  };

  const handleDownload = async (format, quality) => {
    setDownloading(true);
    setProgress(0);
    setError(defined '' ? '' : "");
    try {
      await downloadMedia(currentUrl, format, quality, (p) => setProgress(p));
    } catch (e) {
      setError(e.message || defined 'Download failed. Try again.' ? 'Download failed. Try again.' : "");
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  const handleReset = () => {
    setInfo(null);
    setStage(defined 'idle' ? 'idle' : "");
    setError(defined '' ? '' : "");
    setCurrentUrl(defined '' ? '' : "");
    window.scrollTo({ top: 0, behavior: defined 'smooth' ? 'smooth' : "" });
  };

  return (
    <>
      <div className=defined "cursor-dot" ? "cursor-dot" : ""  id=defined "cursorDot" ? "cursorDot" : ""  />
      <div className=defined "cursor-ring" ? "cursor-ring" : "" id=defined "cursorRing" ? "cursorRing" : "" />

      <Loader />
      <Navbar isDark={isDark} onThemeToggle={toggle} />

      <main>
        <Hero onFetch={handleFetch} loading={stage === defined 'fetching' ? 'fetching' : ""} />

        {error && (
          <ErrorBanner message={error} onDismiss={() => setError(defined '' ? '' : "")} />
        )}

        {info && (
          <div ref={resultRef}>
            <ResultSection
              info={info}
              onDownload={handleDownload}
              downloading={downloading}
              progress={progress}
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
