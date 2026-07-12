import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "../data";

const ACTIONS = [
  { icon: "🏠", label: "Go to Top", hint: "section", run: () => scrollTo("#top") },
  { icon: "👤", label: "About Me", hint: "section", run: () => scrollTo("#about") },
  { icon: "🛠️", label: "What I Do", hint: "section", run: () => scrollTo("#services") },
  { icon: "⚡", label: "Tech Stack", hint: "section", run: () => scrollTo("#skills") },
  { icon: "💼", label: "Experience", hint: "section", run: () => scrollTo("#experience") },
  { icon: "🚀", label: "Projects", hint: "section", run: () => scrollTo("#projects") },
  { icon: "🏆", label: "Certifications", hint: "section", run: () => scrollTo("#certifications") },
  { icon: "🎓", label: "Education", hint: "section", run: () => scrollTo("#education") },
  { icon: "🌐", label: "Around the Web", hint: "section", run: () => scrollTo("#profiles") },
  { icon: "✉️", label: "Contact", hint: "section", run: () => scrollTo("#contact") },
  { icon: "📄", label: "Open Resume", hint: "link", run: () => window.open(profile.resume, "_blank") },
  { icon: "📋", label: "Copy Email Address", hint: "action", run: () => navigator.clipboard?.writeText(profile.email) },
  { icon: "🐙", label: "Open GitHub", hint: "link", run: () => window.open(profile.socials.github, "_blank") },
  { icon: "💼", label: "Open LinkedIn", hint: "link", run: () => window.open(profile.socials.linkedin, "_blank") },
  { icon: "🧩", label: "Open LeetCode", hint: "link", run: () => window.open(profile.socials.leetcode, "_blank") },
  { icon: "🎖️", label: "Open HackerRank", hint: "link", run: () => window.open(profile.socials.hackerrank, "_blank") },
  { icon: "📓", label: "Open Notion — DSA Notes", hint: "link", run: () => window.open(profile.socials.notion, "_blank") },
];

function scrollTo(hash) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ACTIONS.filter((a) => a.label.toLowerCase().includes(q)) : ACTIONS;
  }, [query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const execute = (action) => {
    setOpen(false);
    action.run();
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      execute(results[active]);
    }
  };

  if (!open) return null;

  return (
    <div className="palette-overlay" onMouseDown={() => setOpen(false)}>
      <div className="palette glass" onMouseDown={(e) => e.stopPropagation()}>
        <div className="palette-input-row">
          <span className="palette-prompt mono">&gt;</span>
          <input
            ref={inputRef}
            className="palette-input"
            placeholder="Type a command or search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
          />
          <kbd className="palette-kbd">esc</kbd>
        </div>
        <ul className="palette-list">
          {results.length === 0 && (
            <li className="palette-empty mono">no results for "{query}"</li>
          )}
          {results.map((a, i) => (
            <li key={a.label}>
              <button
                className={`palette-item ${i === active ? "active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => execute(a)}
              >
                <span className="palette-icon">{a.icon}</span>
                <span>{a.label}</span>
                <span className="palette-hint mono">{a.hint}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="palette-footer mono">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>ctrl</kbd>+<kbd>k</kbd> toggle</span>
        </div>
      </div>
    </div>
  );
}
