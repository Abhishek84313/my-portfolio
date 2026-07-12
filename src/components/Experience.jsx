import { experience } from "../data";
import { useReveal } from "../hooks";

export default function Experience() {
  const ref = useReveal();
  return (
    <section className="section" id="experience">
      <div className="section-inner reveal" ref={ref}>
        <p className="section-kicker">04 · journey</p>
        <h2 className="section-title">
          Work <span className="gradient-text">Experience</span>
        </h2>

        <div className="timeline">
          {experience.map((job) => (
            <article className="timeline-item" key={job.company}>
              <div className={`timeline-node ${job.current ? "live" : ""}`} />
              <div className="timeline-card glass">
                <div className="tc-head">
                  <div>
                    <h3 className="tc-role">{job.role}</h3>
                    <p className="tc-company">{job.company}</p>
                  </div>
                  <span className={`tc-period mono ${job.current ? "tc-live" : ""}`}>
                    {job.current && <span className="pulse-dot" />}
                    {job.period}
                  </span>
                </div>
                <ul className="tc-points">
                  {job.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <div className="tc-tech">
                  {job.tech.map((t) => (
                    <span className="chip" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
