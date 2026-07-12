import { profile } from "../data";
import { GithubIcon, LinkedinIcon, CodeIcon, TrophyIcon } from "./Icons";

const NAV = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Certifications", "#certifications"],
  ["Contact", "#contact"],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <h3 className="footer-headline">
            Thanks for visiting. <span className="gradient-text">Let's stay in touch</span>.
          </h3>
          <p className="footer-made">
            Made with ☕ and 💻 in {profile.location.split(",")[0]}.
          </p>
          <p className="footer-hello">
            Say hello at{" "}
            <a href={`mailto:${profile.email}`} className="footer-mail">
              {profile.email}
            </a>
          </p>
        </div>

        <div className="footer-side">
          <nav className="footer-nav">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <div className="footer-socials">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href={profile.socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><CodeIcon /></a>
            <a href={profile.socials.hackerrank} target="_blank" rel="noreferrer" aria-label="HackerRank"><TrophyIcon /></a>
          </div>
        </div>
      </div>

      <div className="footer-base">
        <p>
          Designed & built with <span className="gradient-text">React</span> ⚛️
          &nbsp;·&nbsp; © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="mono footer-sig">// no templates were harmed in the making of this site</p>
      </div>
    </footer>
  );
}
