import { useEffect, useState } from "react";

const LINKS = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Certs", "#certifications"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <nav className="nav-inner">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">{"<A/>"}</span>
          <span className="logo-text">bhishek</span>
        </a>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="nav-palette mono"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new CustomEvent("open-palette"));
              }}
              aria-label="Open command palette"
            >
              <kbd>ctrl</kbd>+<kbd>k</kbd>
            </button>
          </li>
          <li>
            <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
              Hire Me
            </a>
          </li>
        </ul>

        <button
          className={`burger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
}
