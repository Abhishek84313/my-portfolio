import { profile } from "../data";
import { useTypewriter } from "../hooks";
import { GithubIcon, LinkedinIcon, CodeIcon, TrophyIcon, DownloadIcon } from "./Icons";

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="pulse-dot" />
            {profile.resumeNote} · {profile.location}
          </div>

          <h1 className="hero-title">
            Hi, I'm{" "}
            <span className="gradient-text glitch" data-text={profile.firstName}>
              {profile.firstName}
            </span>
          </h1>

          <div className="hero-type">
            <span className="type-prompt">&gt;_</span>
            <span className="type-text">{typed}</span>
            <span className="caret" />
          </div>

          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View My Work <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get In Touch
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <DownloadIcon /> Resume
            </a>
          </div>

          <div className="hero-socials">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href={profile.socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><CodeIcon /></a>
            <a href={profile.socials.hackerrank} target="_blank" rel="noreferrer" aria-label="HackerRank"><TrophyIcon /></a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orbit-system">
            <div className="core">
              <span className="core-glyph">{"{ }"}</span>
            </div>
            <div className="ring ring-1"><span className="sat sat-java">☕</span></div>
            <div className="ring ring-2"><span className="sat sat-react">⚛️</span></div>
            <div className="ring ring-3"><span className="sat sat-db">🗄️</span></div>
          </div>
          <div className="hero-card float-1">
            <span className="hc-dot" style={{ background: "var(--cyan)" }} />
            <code>spring.app.status = LIVE</code>
          </div>
          <div className="hero-card float-2">
            <span className="hc-dot" style={{ background: "var(--violet)" }} />
            <code>git push origin future</code>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-hint" aria-label="Scroll down">
        <span className="mouse"><span className="wheel" /></span>
        <span className="scroll-label">scroll</span>
      </a>
    </section>
  );
}
