import { certifications } from "../data";
import { useReveal } from "../hooks";

export default function Certifications() {
  const ref = useReveal();
  return (
    <section className="section" id="certifications">
      <div className="section-inner reveal" ref={ref}>
        <p className="section-kicker">06 · credentials</p>
        <h2 className="section-title">
          Certifications & <span className="gradient-text">Achievements</span>
        </h2>
        <p className="section-sub">
          Milestones that pushed me outside my comfort zone — click any card to view the certificate.
        </p>
        <div className="certs-grid">
          {certifications.map((c) => (
            <a
              className={`cert-card glass ${c.highlight ? "cert-highlight" : ""} ${c.points ? "cert-wide" : ""}`}
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="cert-top">
                <span className="cert-icon">{c.icon}</span>
                <span className="cert-year mono">{c.year}</span>
              </div>
              <h3 className="cert-name">{c.name}</h3>
              <p className="cert-issuer">{c.issuer}</p>
              <p className="cert-desc">{c.desc}</p>
              {c.points && (
                <ul className="cert-points">
                  {c.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              )}
              <span className="cert-view mono">view certificate ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
