import { services } from "../data";
import { useReveal } from "../hooks";

export default function Services() {
  const ref = useReveal();
  return (
    <section className="section" id="services">
      <div className="section-inner reveal" ref={ref}>
        <p className="section-kicker">02 · what i do</p>
        <h2 className="section-title">
          Engineering <span className="gradient-text">Craft</span>
        </h2>
        <p className="section-sub">
          The kind of work I love waking up to.
        </p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card glass" key={s.title} style={{ "--i": i }}>
              <span className="service-icon">{s.icon}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-points">
                {s.points.map((p) => (
                  <span className="chip" key={p}>{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
