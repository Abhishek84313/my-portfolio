import { skills } from "../data";
import { useReveal, useCountUpBar } from "../hooks";

function SkillCard({ skill }) {
  const barRef = useCountUpBar();
  return (
    <div className="skill-card glass">
      <div className="skill-head">
        <span className="skill-icon">{skill.icon}</span>
        <div>
          <h3 className="skill-name">{skill.name}</h3>
          <span className="skill-tag">{skill.tag}</span>
        </div>
        <span className="skill-pct mono">{skill.level}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-bar" ref={barRef} data-level={skill.level} />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useReveal();
  return (
    <section className="section" id="skills">
      <div className="section-inner reveal" ref={ref}>
        <p className="section-kicker">03 · arsenal</p>
        <h2 className="section-title">
          Tech <span className="gradient-text">Stack</span>
        </h2>
        <p className="section-sub">
          The tools I reach for when turning ideas into production systems.
        </p>
        <div className="skills-grid">
          {skills.map((s) => (
            <SkillCard key={s.name} skill={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
