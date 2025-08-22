import { useEffect, useState } from "react";

export type Theme = "light" | "dark";
export const THEME_KEY = "theme";

function getPreferredTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY) as Theme | null;
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const themeName = theme === "dark" ? "dark" : "light";

  // daisyUI theme
  root.setAttribute("data-theme", themeName);

  // Tailwind dark variant
  root.classList.toggle("dark", theme === "dark");

  localStorage.setItem(THEME_KEY, theme);
  // notify same‑tab listeners (NavBar)
  window.dispatchEvent(new CustomEvent<Theme>("themechange", { detail: theme }));
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());

  // Ensure DOM is synced on mount and whenever theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button
      className="btn btn-ghost"
      aria-label="Toggle theme"
      onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
    >
      {theme === "dark" ? (
        // Sun
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zm10.48 14.32l1.79 1.8 1.79-1.8-1.79-1.79-1.79 1.79zM12 4V1h0v3zm0 19v-3h0v3zM4 12H1v0h3zm19 0h-3v0h3zM6.76 19.16l-1.8 1.79-1.79-1.79 1.79-1.79 1.8 1.79zM19.16 6.76l1.79-1.8-1.79-1.79-1.79 1.79 1.79 1.8zM12 7a5 5 0 100 10 5 5 0 000-10z"/>
        </svg>
      ) : (
        // Moon
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      )}
    </button>
  );
}