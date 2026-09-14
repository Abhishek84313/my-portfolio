import { createContext, useContext } from "react";

export const THEME_KEY = "portfolio-theme";
export const THEME_META_COLOR = { dark: "#050510", light: "#eef1f9" };

export const ThemeContext = createContext(null);

/** Reads whatever the pre-paint script in index.html already resolved. */
export function readTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
