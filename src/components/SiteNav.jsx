import React, { useState } from "react";
import { PORTFOLIO_CONFIG } from "../portfolioConfig";
import { Sparkles, Music } from "lucide-react";
import { LiquidGlassControl } from "./LiquidGlassControl";

const NAV_LINKS = [
  { href: "#about",           label: "About" },
  { href: "#skills",          label: "Skills" },
  { href: "#certifications",  label: "Certs" },
  { href: "#projects",        label: "Projects" },
  { href: "#contact",         label: "Contact" },
];

export function SiteNav({
  onToggleSpotify,
  isSpotifyOpen,
  isGlassOpen,
  onToggleGlass,
  glassIntensity,
  onGlassIntensityChange,
  onResetGlass
}) {
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

        {/* Action Controls */}
        <div className="navbar-actions" style={{ position: "relative" }}>
          {/* Liquid Glass Intensity Slider Toggle */}
          <button
            className={`liquid-btn ${isGlassOpen ? "liquid-btn-cyan" : ""}`}
            onClick={onToggleGlass}
            style={{ padding: "6px 14px", fontSize: "0.8rem" }}
            title="Adjust Liquid Glass Blur, Shimmer & Specular Intensity"
          >
            <Sparkles size={14} color={isGlassOpen ? "#fff" : "var(--pat-hud-cyan)"} />
            <span>Glass: {glassIntensity}%</span>
          </button>

          {/* Spotify Toggle */}
          <button
            className={`liquid-btn ${isSpotifyOpen ? "liquid-btn-amber" : ""}`}
            onClick={onToggleSpotify}
            style={{ padding: "6px 14px", fontSize: "0.8rem" }}
            title="Toggle Coding Soundtrack"
          >
            <Music size={14} color={isSpotifyOpen ? "#fff" : "#1ed760"} />
            <span>Soundtrack</span>
          </button>

          {/* Liquid Glass Tuner Popover */}
          <LiquidGlassControl
            isOpen={isGlassOpen}
            onClose={onToggleGlass}
            intensity={glassIntensity}
            onIntensityChange={onGlassIntensityChange}
            onReset={onResetGlass}
          />
        </div>
      </header>
    </div>
  );
}
