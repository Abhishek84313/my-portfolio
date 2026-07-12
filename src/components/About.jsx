import { useEffect, useState } from "react";
import { profile, stats, techStack, codingHabits, githubUser } from "../data";
import { useReveal } from "../hooks";

/** Live public GitHub stats — fails silently if offline/rate-limited. */
function useGithubStats() {
  const [gh, setGh] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setGh({ repos: d.public_repos, followers: d.followers }))
      .catch(() => {});
  }, []);
  return gh;
}

export default function About() {
  const ref = useReveal();
  const gh = useGithubStats();

  return (
    <section className="section" id="about">
      <div className="section-inner reveal" ref={ref}>
        <p className="section-kicker">01 · whoami</p>
        <h2 className="section-title">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="about-grid">
          <div className="terminal glass">
            <div className="terminal-bar">
              <span className="tdot red" /><span className="tdot yellow" /><span className="tdot green" />
              <span className="terminal-title">abhishek@dev: ~/about</span>
            </div>
            <div className="terminal-body">
              <p><span className="t-prompt">$</span> cat about.md</p>
              {profile.about.map((para, i) => (
                <p className="t-out" key={i}>{para}</p>
              ))}
              <p>
                <span className="t-prompt">$</span> echo $STACK
              </p>
              <p className="t-out t-stack">
                {techStack.map((t) => (
                  <span className="chip" key={t}>{t}</span>
                ))}
              </p>
              <p><span className="t-prompt">$</span> habits --daily</p>
              {codingHabits.map((h) => (
                <p className="t-quiet" key={h.label}>
                  <span className="t-dim">{h.label}:</span>{" "}
                  <a href={h.url} target="_blank" rel="noreferrer" className="t-link">
                    {h.text}
                  </a>
                </p>
              ))}
              {gh && (
                <p className="t-quiet">
                  <span className="t-dim">github:</span>{" "}
                  <a
                    href={`https://github.com/${githubUser}`}
                    target="_blank"
                    rel="noreferrer"
                    className="t-link"
                  >
                    {gh.repos} public repos · {gh.followers} followers
                  </a>{" "}
                  <span className="t-live">● live</span>
                </p>
              )}
              <p><span className="t-prompt">$</span> <span className="caret" /></p>
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-card glass" key={s.label}>
                <span className="stat-value gradient-text">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
