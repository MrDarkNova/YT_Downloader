import { useState, useEffect } from 'react';
import useCursor       from './hooks/useCursor.js';
import useReveal       from './hooks/useReveal.js';
import useTheme        from './hooks/useTheme.js';
import { fetchInfo, downloadMedia } from './data/api.js';

import Loader        from './components/Loader.jsx';
import Navbar        from './components/Navbar.jsx';
import Hero          from './components/Hero.jsx';
import ResultSection from './components/ResultSection.jsx';
import ErrorBanner   from './components/ErrorBanner.jsx';
import Footer        from './components/Footer.jsx';

function App() {
  const { isDark, toggle } = useTheme();
  useCursor();
  useReveal();

  const [stage,       setStage]       = useState('idle');
  const [info,        setInfo]        = useState(null);
  const [error,       setError]       = useState('');
  const [downloading, setDownloading] = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [currentUrl,  setCurrentUrl]  = useState('');

  useEffect(() => {
    if (info) {
      setTimeout(() => {
        document.querySelector('[class*="ResultSection"]')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [info]);

  const handleFetch = async (url) => {
    setError('');
    setInfo(null);
    setStage('fetching');
    setCurrentUrl(url);
    try {
      const data = await fetchInfo(url);
      setInfo(data);
      setStage('ready');
    } catch (e) {
      setError(e.message || 'Could not fetch video info. Check the URL and try again.');
      setStage('idle');
    }
  };

  const handleDownload = async (format, quality) => {
    setDownloading(true);
    setProgress(0);
    setError('');
    try {
      await downloadMedia(currentUrl, format, quality, (p) => setProgress(p));
    } catch (e) {
      setError(e.message || 'Download failed. Try again.');
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  const handleReset = () => {
    setInfo(null);
    setStage('idle');
    setError('');
    setCurrentUrl('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="cursor-dot"  id="cursorDot"  />
      <div className="cursor-ring" id="cursorRing" />

      <Loader />
      <Navbar isDark={isDark} onThemeToggle={toggle} />

      <main>
        <Hero
          onFetch={handleFetch}
          loading={stage === 'fetching'}
        />

        {error && (
          <ErrorBanner
            message={error}
            onDismiss={() => setError('')}
          />
        )}

        {info && (
          <ResultSection
            info={info}
            onDownload={handleDownload}
            downloading={downloading}
            progress={progress}
            onReset={handleReset}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
