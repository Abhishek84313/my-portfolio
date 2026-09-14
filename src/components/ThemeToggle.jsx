import { useTheme } from "../theme";

const svg = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/** Sun ⇄ moon switch. The two glyphs rotate past each other on toggle. */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <span className="tt-face">
        <svg {...svg} className="tt-icon tt-sun" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <g className="tt-rays">
            <path d="M12 2v2.4M12 19.6V22M4.2 12H2M22 12h-2.2" />
            <path d="M5.6 5.6 7.3 7.3M16.7 16.7l1.7 1.7M18.4 5.6 16.7 7.3M7.3 16.7l-1.7 1.7" />
          </g>
        </svg>
        <svg {...svg} className="tt-icon tt-moon" aria-hidden="true">
          <path d="M21 13.2A8.6 8.6 0 0 1 10.8 3a8.6 8.6 0 1 0 10.2 10.2z" />
        </svg>
      </span>
    </button>
  );
}
