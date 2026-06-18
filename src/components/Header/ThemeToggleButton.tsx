import { useState, useEffect } from 'preact/hooks';
import './ThemeToggleButton.css';

interface Props {
  labels: {
    useLight: string;
    useDark: string;
  };
  isInsideHeader?: boolean;
}

// Define valid theme keys
type ThemeType = "light" | "dark";

const ThemeToggle = ({ labels }: Props) => {
  const getSystemTheme = (): ThemeType =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  // Initialize theme state
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as ThemeType | null;
      return storedTheme || getSystemTheme();
    }
    return "light"; // Default fallback for SSR
  });

  // Apply theme class to the document immediately on mount
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-dark", theme === "dark");
    root.classList.toggle("theme-light", theme === "light");

    // Store theme only if it differs from system default
    if (theme === getSystemTheme()) {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Sync with system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const isDark = theme === "dark";

  // Render BOTH icons and let CSS pick the right one based on the `.theme-dark`
  // class (set before hydration). This keeps SSR and client markup identical and
  // avoids a hydration mismatch.
  return (
    <button
      type="button"
      className="or-theme-toggle"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* Sun — shown in dark mode (click to switch to light) */}
      <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
      </svg>
      {/* Moon — shown in light mode (click to switch to dark) */}
      <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>
      </svg>
    </button>
  );
};

export default ThemeToggle;
