import React, { useState } from "react";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { GithubIcon } from "./GithubIcon";
import {
  FolderGit2, ExternalLink, Star, GitFork, RefreshCw,
  AlertCircle, Search, Filter
} from "lucide-react";

const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  "React Native / JavaScript": "#38bdf8",
  "React Native / TypeScript": "#38bdf8",
  "Electron / JavaScript": "#00d8ff",
  "JavaScript / Web Audio": "#34d399",
  "HTML / JavaScript / CSS": "#f97316",
  Python:     "#3776ab",
  "C#":       "#9b4f96",
  HTML:       "#e34f26",
  CSS:        "#1572b6",
  default:    "#94a3b8",
};

function langColor(lang) {
  return LANG_COLORS[lang] || LANG_COLORS.default;
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  if (diff < 86400 * 30) return `${Math.round(diff / 86400)}d ago`;
  if (diff < 86400 * 365) return `${Math.round(diff / (86400 * 30))}mo ago`;
  return `${Math.round(diff / (86400 * 365))}y ago`;
}

export function ProjectsSection() {
  const { repos, loading, error } = useGithubRepos();
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("All");

  const languages = ["All", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean)))];

  const filtered = repos.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      (r.displayName && r.displayName.toLowerCase().includes(q)) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.language || "").toLowerCase().includes(q) ||
      (r.topics && r.topics.some(t => t.toLowerCase().includes(q)));
    const matchLang = langFilter === "All" || r.language === langFilter;
    return matchSearch && matchLang;
  });

  return (
    <section className="section-block" id="projects">
      <div className="section-header">
        <FolderGit2 size={20} color="var(--pat-amber-vest)" />
        <h2>
          PROJECTS{" "}
          <span style={{ color: "var(--pat-police-dim)", fontWeight: 400 }}>
            // GITHUB LIVE FEED & THESIS
          </span>
        </h2>
        {!loading && !error && (
          <span className="patlabor-callsign-badge" style={{ marginLeft: "auto" }}>
            {repos.length} repos
          </span>
        )}
      </div>

      {/* Live indicator */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--pat-police-dim)" }}>
        <span className="status-mecha-blinker" style={{ position: "static", display: "inline-block" }} />
        Live feed from{" "}
        <a href="https://github.com/RonVergel" target="_blank" rel="noreferrer" style={{ color: "var(--pat-hud-cyan)", textDecoration: "none" }}>
          github.com/RonVergel
        </a>
        {" "}— automatically detects new repositories & thesis contributions
      </div>

      {/* Search + Filter Bar */}
      <div className="project-controls">
        <div className="search-pill">
          <Search size={15} color="var(--pat-amber-vest)" />
          <input
            type="text"
            placeholder="Search projects, stack, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="lang-filter-bar">
          <Filter size={14} color="var(--pat-police-dim)" />
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLangFilter(lang)}
              className={`liquid-btn ${langFilter === lang ? "liquid-btn-cyan" : ""}`}
              style={{ fontSize: "0.77rem", padding: "5px 12px" }}
            >
              {lang !== "All" && (
                <span
                  style={{
                    width: 8, height: 8, borderRadius: "2px",
                    background: langColor(lang), display: "inline-block", flexShrink: 0
                  }}
                />
              )}
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="projects-state">
          <RefreshCw size={28} className="spin-slow" color="var(--pat-amber-vest)" />
          <p>Syncing with GitHub API…</p>
        </div>
      )}

      {error && (
        <div className="projects-state">
          <AlertCircle size={24} color="var(--pat-warning-rose)" />
          <p style={{ color: "var(--pat-warning-rose)" }}>
            GitHub API notice: {error}
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--pat-police-dim)" }}>
            Displaying repository archives.
          </p>
        </div>
      )}

      {/* Project Cards Grid */}
      {!loading && filtered.length === 0 && (
        <div className="projects-state">
          <p style={{ color: "var(--pat-police-dim)" }}>No repos match your search.</p>
        </div>
      )}

      <div className="cards-grid">
        {filtered.map((repo) => (
          <div key={repo.id} className="memory-card project-card">
            {/* Language & Badge Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
                <span className="category-badge" style={{ background: `${langColor(repo.language)}22`, color: langColor(repo.language), border: `1px solid ${langColor(repo.language)}55` }}>
                  {repo.emoji ? `${repo.emoji} ` : ""}{repo.language}
                </span>
                {repo.badge && (
                  <span className="category-badge" style={{ background: "rgba(255, 140, 33, 0.18)", color: "var(--pat-amber-vest)", border: "1px solid rgba(255, 140, 33, 0.45)" }}>
                    ★ {repo.badge}
                  </span>
                )}
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--pat-police-dim)" }}>
                {timeAgo(repo.updatedAt)}
              </span>
            </div>

            <h3 className="card-title">{repo.displayName || repo.name}</h3>
            <p className="card-content">{repo.description}</p>

            {/* How It Works Architecture breakdown */}
            {repo.howItWorks && (
              <div className="project-how-it-works">
                <span style={{ color: "var(--pat-amber-vest)", display: "block", marginBottom: "3px", fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.04em", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                  ⚡ How it works:
                </span>
                <span>{repo.howItWorks}</span>
              </div>
            )}

            {/* Highlights if available */}
            {repo.highlights && (
              <div className="project-highlights">
                ⚙ <strong>Tech:</strong> {repo.highlights}
              </div>
            )}

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {repo.topics.map((t) => (
                  <span key={t} className="skill-tag" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>#{t}</span>
                ))}
              </div>
            )}

            {/* Stats & Links */}
            <div className="card-footer">
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {repo.stars > 0 && (
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "var(--pat-police-dim)" }}>
                    <Star size={13} color="var(--pat-amber-vest)" /> {repo.stars}
                  </span>
                )}
                {repo.forks > 0 && (
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "var(--pat-police-dim)" }}>
                    <GitFork size={13} /> {repo.forks}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                {(repo.homepage || repo.demoUrl) && (
                  <a
                    href={repo.homepage || repo.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-btn liquid-btn-amber"
                    style={{ padding: "4px 12px", fontSize: "0.77rem" }}
                  >
                    <ExternalLink size={13} /> Demo
                  </a>
                )}
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-btn"
                  style={{ padding: "4px 12px", fontSize: "0.77rem" }}
                >
                  <GithubIcon size={13} /> Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
