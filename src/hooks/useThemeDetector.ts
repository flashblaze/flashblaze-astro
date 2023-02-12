import { useEffect, useState } from 'react';

// https://medium.com/hypersphere-codes/detecting-system-theme-in-javascript-css-react-f6b961916d48
const useThemeDetector = () => {
  const getCurrentTheme = () => localStorage.getItem('theme');
  const [theme, setTheme] = useState(getCurrentTheme() || 'dark');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'dark');
  }, [localStorage.getItem('theme')]);

  return theme;
};

export default useThemeDetector;
