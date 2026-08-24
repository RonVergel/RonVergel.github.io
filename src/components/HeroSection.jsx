import React from "react";
import { PORTFOLIO_CONFIG } from "../portfolioConfig";
import { GithubIcon } from "./GithubIcon";
import { Mail, MapPin, ExternalLink } from "lucide-react";

export function HeroSection() {
  const { name, tagline, bio, email, location, githubUrl, avatarUrl } = PORTFOLIO_CONFIG;

  return (
    <section className="hero-section" id="about">
      <div className="hero-inner">
        {/* Avatar */}
        <div className="hero-avatar-wrap">
          <div className="avatar-liquid-frame" style={{ width: 110, height: 110 }}>
            <img src={avatarUrl} alt={name} className="avatar-img" />
            <span className="status-mecha-blinker" title="Available for Work" />
          </div>
        </div>

        {/* Text Block */}
        <div className="hero-text">
          {/* Top callsign badge */}
          <div className="hero-badges">
            <span className="patlabor-callsign-badge">
              <GithubIcon size={12} />
              @{PORTFOLIO_CONFIG.handle}
            </span>
            <span className="patlabor-callsign-badge" style={{ background: "rgba(52,211,153,0.15)", color: "var(--pat-radar-green)", borderColor: "rgba(52,211,153,0.4)" }}>
              ● Open to Work
            </span>
          </div>

          <h1 className="hero-name">{name}</h1>
          <p className="hero-tagline">{tagline}</p>
          <p className="hero-bio">{bio}</p>

          {/* Info pills */}
          <div className="hero-meta">
            <span className="liquid-pill" style={{ padding: "5px 14px", fontSize: "0.8rem" }}>
              <MapPin size={13} color="var(--pat-amber-vest)" /> {location}
            </span>
            <a href={`mailto:${email}`} className="liquid-pill" style={{ padding: "5px 14px", fontSize: "0.8rem", textDecoration: "none" }}>
              <Mail size={13} color="var(--pat-hud-cyan)" /> {email}
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hero-ctas">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="liquid-btn liquid-btn-amber">
              <GithubIcon size={16} />
              View GitHub
            </a>
            <a href={`mailto:${email}`} className="liquid-btn liquid-btn-cyan">
              <Mail size={16} />
              Hire Me
            </a>
            <a href="#projects" className="liquid-btn">
              <ExternalLink size={16} />
              See Projects
            </a>
          </div>
        </div>
      </div>

      {/* Hazard accent line */}
      <div className="patlabor-hazard-strip" style={{ marginTop: "40px" }} />
    </section>
  );
}
