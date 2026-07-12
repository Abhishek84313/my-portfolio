import { useState } from "react";
import { profile } from "../data";
import { useReveal } from "../hooks";
import {
  MailIcon, PinIcon,
  GithubIcon, LinkedinIcon, CodeIcon, TrophyIcon,
} from "./Icons";

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // { type: "ok" | "error", text }

  const set = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    if (status) setStatus(null);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setStatus({ type: "error", text: "Please fill in your name and a message before sending." });
      return;
    }
    try {
      const subject = encodeURIComponent(`Portfolio contact — ${form.name.trim()}`);
      const body = encodeURIComponent(
        `Hi Abhishek,\n\n${form.message.trim()}\n\n— ${form.name.trim()}${form.email ? ` (${form.email})` : ""}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus({
        type: "ok",
        text: "Your email app should open with the message pre-filled — just hit send. If nothing opened, use the fallback below.",
      });
    } catch {
      setStatus({
        type: "error",
        text: "Couldn't open your email app. Please use the fallback below.",
      });
    }
  };

  const copyFallback = async () => {
    try {
      await navigator.clipboard.writeText(
        `To: ${profile.email}\nSubject: Portfolio contact — ${form.name}\n\n${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
      );
      setStatus({ type: "ok", text: `Message copied! Paste it into an email to ${profile.email}.` });
    } catch {
      setStatus({ type: "error", text: `Copy failed — please email me directly at ${profile.email}.` });
    }
  };

  return (
    <section className="section" id="contact">
      <div className="section-inner reveal" ref={ref}>
        <p className="section-kicker">09 · ping me</p>
        <h2 className="section-title">
          Let's Build Something <span className="gradient-text">Together</span>
        </h2>
        <p className="section-sub">
          Have an opportunity or an idea? My inbox is always open.
        </p>

        <div className="contact-panel glass">
          <div className="contact-left">
            <div className="contact-rows">
              <a className="contact-row" href={`mailto:${profile.email}`}>
                <span className="cr-icon"><MailIcon /></span>
                <span>
                  <span className="cr-label">Email</span>
                  <span className="cr-value">{profile.email}</span>
                </span>
              </a>
              <div className="contact-row">
                <span className="cr-icon"><PinIcon /></span>
                <span>
                  <span className="cr-label">Location</span>
                  <span className="cr-value">{profile.location}</span>
                </span>
              </div>
            </div>

            <div className="hero-socials contact-socials">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
              <a href={profile.socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><CodeIcon /></a>
              <a href={profile.socials.hackerrank} target="_blank" rel="noreferrer" aria-label="HackerRank"><TrophyIcon /></a>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              <label className="form-field">
                <span className="form-label mono">name</span>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={set("name")}
                />
              </label>
              <label className="form-field">
                <span className="form-label mono">email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                />
              </label>
            </div>
            <label className="form-field">
              <span className="form-label mono">message</span>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project or opportunity…"
                value={form.message}
                onChange={set("message")}
              />
            </label>
            <button type="submit" className="btn btn-primary">
              Send Message <span className="btn-arrow">→</span>
            </button>

            {status && (
              <div className={`form-status ${status.type}`} role="status">
                <span className="form-status-icon">{status.type === "ok" ? "✓" : "⚠"}</span>
                <span>
                  {status.text}
                  {status.type === "ok" && (
                    <>
                      {" "}
                      <button type="button" className="form-fallback" onClick={copyFallback}>
                        copy message instead
                      </button>
                    </>
                  )}
                  {status.type === "error" && status.text.includes("fallback") && (
                    <>
                      {" "}
                      <button type="button" className="form-fallback" onClick={copyFallback}>
                        copy message to clipboard
                      </button>
                    </>
                  )}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
