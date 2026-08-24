import React, { useState } from "react";
import { PORTFOLIO_CONFIG } from "../portfolioConfig";
import { GithubIcon } from "./GithubIcon";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#about",    label: "About" },
  { href: "#skills",   label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact",  label: "Contact" },
];

export function SiteNav({ onToggleSpotify, isSpotifyOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar-container-wrapper">
      <header className="navbar-dock">
        {/* Brand */}
        <div className="navbar-brand">
          <div className="avatar-liquid-frame" style={{ width: 40, height: 40, flexShrink: 0 }}>
            <img src={PORTFOLIO_CONFIG.avatarUrl} alt={PORTFOLIO_CONFIG.preferredName} className="avatar-img" />
            <span className="status-mecha-blinker" />
          </div>
          <div className="brand-info">
            <h1 style={{ fontSize: "1rem" }}>
              {PORTFOLIO_CONFIG.preferredName}
              <span style={{ color: "var(--pat-amber-vest)", fontSize: "0.82em", marginLeft: 6 }}>// PORTFOLIO</span>
            </h1>
            <p className="brand-subtitle">
              <span style={{ color: "var(--pat-radar-green)" }}>● OPEN TO WORK</span>
            </p>
          </div>
        </div>

        {/* Desktop Nav Pills */}
        <nav className="nav-dock-tabs" style={{ display: "flex" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-tab-pill" style={{ textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Spotify Toggle */}
        <div className="navbar-actions">
          <button
            className={`liquid-btn ${isSpotifyOpen ? "liquid-btn-amber" : ""}`}
            onClick={onToggleSpotify}
            style={{ padding: "6px 14px", fontSize: "0.8rem" }}
            title="Toggle Coding Soundtrack"
          >
            🎵 <span>Soundtrack</span>
          </button>
        </div>
      </header>
    </div>
  );
}
