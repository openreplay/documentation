import { useState, useEffect } from 'preact/hooks';
import './ThemeToggleButton.css';

interface Props {
  labels: {
    useLight: string;
    useDark: string;
  };
  isInsideHeader: boolean;
}

type ThemeType = 'light' | 'dark';

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>
  </svg>
);

const ThemeToggle = ({ labels, isInsideHeader }: Props) => {
  const getSystemTheme = (): ThemeType =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as ThemeType | null;
      return storedTheme || getSystemTheme();
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('theme-dark', theme === 'dark');
    root.classList.toggle('theme-light', theme === 'light');

    if (theme === getSystemTheme()) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const isDark = theme === 'dark';
  // Render BOTH icons with a stable DOM structure (avoids SSR/client hydration
  // mismatch); CSS shows the moon in light mode and the sun in dark mode, keyed
  // off the `html.theme-dark` class (set before hydration in HeadCommon).
  return (
    <button
      type="button"
      className={`theme-toggle-pill ${isInsideHeader ? 'in-header' : ''}`}
      aria-label={isDark ? labels.useLight : labels.useDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span className="tt-moon"><MoonIcon /></span>
      <span className="tt-sun"><SunIcon /></span>
    </button>
  );
};

export default ThemeToggle;
