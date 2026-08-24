import React from "react";
import { PORTFOLIO_CONFIG } from "../portfolioConfig";
import { GithubIcon } from "./GithubIcon";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="patlabor-hazard-strip" style={{ marginBottom: "18px" }} />
      <div className="footer-inner">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--pat-police-dim)" }}>
          © {year} <strong style={{ color: "var(--pat-police-white)" }}>{PORTFOLIO_CONFIG.name}</strong> — Built with React + Vite + Liquid Glass
        </span>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <a href={PORTFOLIO_CONFIG.githubUrl} target="_blank" rel="noreferrer" className="liquid-btn" style={{ padding: "5px 12px", fontSize: "0.78rem" }}>
            <GithubIcon size={14} /> @{PORTFOLIO_CONFIG.handle}
          </a>
        </div>
      </div>
    </footer>
  );
}
