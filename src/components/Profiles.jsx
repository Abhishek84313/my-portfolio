import { onlineProfiles } from "../data";
import { useReveal } from "../hooks";
import { GithubIcon, LinkedinIcon, CodeIcon, TrophyIcon, NotesIcon } from "./Icons";

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  code: CodeIcon,
  trophy: TrophyIcon,
  notes: NotesIcon,
};

export default function Profiles() {
  const ref = useReveal();
  return (
    <section className="section" id="profiles">
      <div className="section-inner reveal" ref={ref}>
        <p className="section-kicker">08 · find me on</p>
        <h2 className="section-title">
          Around the <span className="gradient-text">Web</span>
        </h2>
        <p className="section-sub">
          Everywhere I write code, solve problems and take notes.
        </p>
        <div className="profiles-grid">
          {onlineProfiles.map((p) => {
            const Icon = ICONS[p.icon] || CodeIcon;
            return (
              <a
                className="profile-card glass"
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                style={{ "--accent": p.accent }}
              >
                <span className="profile-icon"><Icon /></span>
                <div className="profile-meta">
                  <h3 className="profile-name">{p.name}</h3>
                  <span className="profile-handle mono">{p.handle}</span>
                  <p className="profile-desc">{p.desc}</p>
                </div>
                <span className="profile-arrow">↗</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
