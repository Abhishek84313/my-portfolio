import { useCallback, useEffect, useMemo, useState } from "react";
import { THEME_KEY, THEME_META_COLOR, ThemeContext, readTheme } from "./theme";

function persist(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* private mode — the theme still works, it just won't survive a reload */
  }
}

function storedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

/**
 * Owns the light/dark choice: paints it on <html>, persists it once the visitor
 * picks a side, follows the OS until then, and exposes a toggle to the tree.
 */
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme);

  // paint the choice onto <html> and keep the browser chrome in sync
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_META_COLOR[theme]);
  }, [theme]);

  const applyTheme = useCallback((next) => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 520);
    setTheme((current) => {
      const value = typeof next === "function" ? next(current) : next;
      persist(value);
      return value;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme((t) => (t === "dark" ? "light" : "dark"));
  }, [applyTheme]);

  // mirror the OS only while the visitor hasn't chosen for themselves
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e) => {
      if (!storedTheme()) setTheme(e.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // lets non-React callers (the command palette) flip the theme
  useEffect(() => {
    window.addEventListener("toggle-theme", toggleTheme);
    return () => window.removeEventListener("toggle-theme", toggleTheme);
  }, [toggleTheme]);

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme: applyTheme }),
    [theme, toggleTheme, applyTheme]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
