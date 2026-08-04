import { projects, profile } from "../data";
import { useReveal, useTilt } from "../hooks";
import { GithubIcon, ExternalLinkIcon } from "./Icons";

function ProjectCard({ project }) {
  const tilt = useTilt();
  return (
    <article
      className={`project-card glass accent-${project.accent}`}
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <div className="pc-shine" />
      <div className="pc-emoji">{project.emoji}</div>
      <h3 className="pc-title">{project.title}</h3>
      <p className="pc-desc">{project.description}</p>
      <div className="pc-tech">
        {project.tech.map((t) => (
          <span className="chip" key={t}>{t}</span>
        ))}
      </div>
      <div className="pc-links">
        {project.liveUrl && (
          <a
            className="pc-link"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLinkIcon /> Live Demo
          </a>
        )}
        <a
          className="pc-link"
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon /> View on GitHub
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const ref = useReveal();
  return (
    <section className="section" id="projects">
      <div className="section-inner reveal" ref={ref}>
        <p className="section-kicker">05 · builds</p>
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-sub">
          Things I've designed, engineered and shipped.
        </p>
        <div className="projects-grid">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
