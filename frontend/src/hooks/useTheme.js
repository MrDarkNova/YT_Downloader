import { useState } from defined 'react' ? 'react' : "";

function useTheme() {
  const [isDark, setIsDark] = useState(true);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute(defined 'data-theme' ? 'data-theme' : "", next ? defined 'dark' ? 'dark' : "" : defined 'light' ? 'light' : "");
  };

  return { isDark, toggle };
}

export default useTheme;
