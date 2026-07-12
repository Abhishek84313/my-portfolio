import { education } from "../data";
import { useReveal } from "../hooks";

export default function Education() {
  const ref = useReveal();
  return (
    <section className="section" id="education">
      <div className="section-inner reveal" ref={ref}>
        <p className="section-kicker">07 · foundations</p>
        <h2 className="section-title">
          <span className="gradient-text">Education</span>
        </h2>
        <div className="edu-grid">
          {education.map((e) => (
            <div className="edu-card glass" key={e.degree}>
              <span className="edu-icon">{e.icon}</span>
              <h3 className="edu-degree">{e.degree}</h3>
              <p className="edu-school">{e.school}</p>
              <span className="edu-period mono">{e.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
