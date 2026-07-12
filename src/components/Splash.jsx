import { useEffect, useState } from "react";

const BOOT_LINES = [
  "▸ loading modules…",
  "▸ compiling experience…",
  "▸ portfolio ready ✓",
];

/** Quick terminal-style boot screen shown once per visit. */
export default function Splash() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setLines(i + 1), 280 * (i + 1))
    );
    timers.push(setTimeout(() => setFading(true), 1250));
    timers.push(setTimeout(() => setGone(true), 1750));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (gone) return null;

  return (
    <div className={`splash ${fading ? "splash-out" : ""}`}>
      <div className="splash-logo mono">
        <span className="gradient-text">{"<A/>"}</span>
      </div>
      <div className="splash-lines mono">
        {BOOT_LINES.slice(0, lines).map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
      <div className="splash-bar">
        <div className="splash-bar-fill" />
      </div>
    </div>
  );
}
