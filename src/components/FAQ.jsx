import { useState } from "react";
import { faqs, quickFacts, profile } from "../data";
import { useReveal } from "../hooks";
import { DownloadIcon, MailIcon } from "./Icons";

export default function FAQ() {
  const ref = useReveal();
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="section-inner reveal" ref={ref}>
        <p className="section-kicker">09 · good to know</p>
        <h2 className="section-title">
          Answers, <span className="gradient-text">Up Front</span>
        </h2>
        <p className="section-sub">
          The things people usually ask before they hit send — answered here so you don't have to.
        </p>

        <div className="quick-facts">
          {quickFacts.map((f) => (
            <div
              className="qf-card glass"
              key={f.label}
              style={{ "--accent": `var(--${f.accent})` }}
            >
              <span className="qf-icon">
                {f.live ? <span className="pulse-dot" /> : f.icon}
              </span>
              <span className="qf-meta">
                <span className="qf-label mono">{f.label}</span>
                <span className="qf-value">{f.value}</span>
              </span>
            </div>
          ))}
        </div>

        <ul className="faq-list">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li className={`faq-item glass ${isOpen ? "open" : ""}`} key={item.q}>
                <h3>
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="faq-mark mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq-text">{item.q}</span>
                    <span className="faq-sign" aria-hidden="true">
                      <span /><span />
                    </span>
                  </button>
                </h3>
                <div
                  className="faq-a-wrap"
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                >
                  <div className="faq-a">
                    <p>{item.a}</p>
                    {item.tags && (
                      <div className="faq-tags">
                        {item.tags.map((t) => (
                          <span className="chip" key={t}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="faq-cta glass">
          <p className="faq-cta-text">
            Still have a question? The short answer is <strong>just ask</strong> — I read everything.
          </p>
          <div className="faq-cta-actions">
            <a className="btn btn-primary" href="#contact">
              <MailIcon /> Ask me directly
            </a>
            <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer">
              <DownloadIcon /> Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
