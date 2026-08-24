import React from "react";
import { PORTFOLIO_CONFIG } from "../portfolioConfig";
import { Mail, MapPin, Send } from "lucide-react";
import { GithubIcon } from "./GithubIcon";


export function ContactSection() {
  const { email, githubUrl, handle, location } = PORTFOLIO_CONFIG;

  return (
    <section className="section-block" id="contact">
      <div className="section-header">
        <Send size={20} color="var(--pat-radar-green)" />
        <h2>CONTACT <span style={{ color: "var(--pat-police-dim)", fontWeight: 400 }}>// GET IN TOUCH</span></h2>
      </div>

      <div className="contact-card">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--pat-police-muted)", marginBottom: "24px", lineHeight: 1.7 }}>
          I'm open to new opportunities, freelance projects, or just a cool conversation about code. Feel free to reach out!
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
          <a href={`mailto:${email}`} className="liquid-btn liquid-btn-amber" style={{ fontSize: "0.88rem" }}>
            <Mail size={16} /> {email}
          </a>
          <a href={githubUrl} target="_blank" rel="noreferrer" className="liquid-btn liquid-btn-cyan" style={{ fontSize: "0.88rem" }}>
            <GithubIcon size={16} /> github.com/{handle}
          </a>
          <span className="liquid-pill" style={{ padding: "8px 18px", fontSize: "0.85rem" }}>
            <MapPin size={14} color="var(--pat-amber-vest)" /> {location}
          </span>
        </div>
      </div>
    </section>
  );
}
