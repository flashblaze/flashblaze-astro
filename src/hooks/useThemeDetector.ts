import { useEffect, useState } from 'react';

// https://medium.com/hypersphere-codes/detecting-system-theme-in-javascript-css-react-f6b961916d48
const useThemeDetector = () => {
  const getCurrentTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
  const mqListener = (e: MediaQueryListEvent) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    darkThemeMq.addEventListener('change', mqListener);
    return () => darkThemeMq.removeEventListener('change', mqListener);
  }, []);

  return isDarkTheme;
};

export default useThemeDetector;
