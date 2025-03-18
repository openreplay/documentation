import { useState, useEffect } from 'preact/hooks';
import './ThemeToggleButton.css';

interface Props {
  labels: {
    useLight: string;
    useDark: string;
  };
  isInsideHeader: boolean;
}

// Define valid theme keys
type ThemeType = "light" | "dark";

const themes: ThemeType[] = ["light", "dark"];

const ThemeToggle = ({ labels, isInsideHeader }: Props) => {
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

  return (
    <div className={`theme-toggle h-8 ${isInsideHeader ? "hide-toggle-on-smaller-screens" : ""}`}>
      {themes.map((t) => {
        const checked = theme === t;
        const themeLabel = t === "light" ? labels.useLight : labels.useDark;

        return (
          <label className={`cursor-pointer ${checked ? "checked" : ""}`} key={t}>
            {/* Sun icon for light theme */}
            {t === "light" && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            )}
            
            {/* Moon icon for dark theme */}
            {t === "dark" && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                <path d="M19 3v4"></path>
                <path d="M21 5h-4"></path>
              </svg>
            )}
            
            <input
              type="radio"
              name="theme-toggle"
              checked={checked}
              value={t}
              onChange={() => setTheme(t)}
            />
            <span className="sr-only">{themeLabel}</span>
          </label>
        );
      })}
    </div>
  );
};

export default ThemeToggle;