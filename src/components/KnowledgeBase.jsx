import React, { useState } from "react";
import {
  FolderGit2,
  Brain,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Search,
  SlidersHorizontal,
  Layers,
  Terminal
} from "lucide-react";
import { GithubIcon } from "./GithubIcon";

export function KnowledgeBase({
  persona,
  onToggleMemory,
  onDeleteMemory,
  onOpenAddMemory,
  onDeleteProject
}) {
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = persona.projects.filter(p => {
    if (filterCategory !== "all" && filterCategory !== "projects") return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.language && p.language.toLowerCase().includes(q))
    );
  });

  const filteredMemories = persona.memories.filter(m => {
    if (filterCategory !== "all" && filterCategory !== "memories" && filterCategory !== m.category.toLowerCase()) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.content.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="panel-view-container">
      {/* Header */}
      <div className="view-header">
        <div>
          <h2>SV-2 HANGAR ARCHIVE // KNOWLEDGE BAY</h2>
          <p>
            // TELEMETRY REPOSITORY ARCHIVES & ACTIVE PILOT MEMORIES FOR {persona.identity.fullName.toUpperCase()}
          </p>
        </div>
        <button className="liquid-btn liquid-btn-amber" onClick={onOpenAddMemory}>
          <Plus size={16} />
          Register Project / Memory
        </button>
      </div>

      {/* Filter and Search Capsule Bar */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "24px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(10, 16, 26, 0.7)", border: "1px solid rgba(255, 255, 255, 0.16)", borderRadius: "var(--radius-pill)", padding: "8px 18px", flex: 1, minWidth: "260px", boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.4)" }}>
          <Search size={16} color="var(--pat-amber-vest)" />
          <input
            type="text"
            placeholder="Search hangar archives, skills, or memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", color: "var(--pat-police-white)", width: "100%", fontSize: "0.88rem", fontFamily: "var(--font-mecha)" }}
          />
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          {["all", "projects", "memories"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`liquid-btn ${filterCategory === cat ? "liquid-btn-cyan" : ""}`}
              style={{ fontSize: "0.8rem", padding: "6px 14px" }}
            >
              {cat === "all" ? "All Archives" : cat === "projects" ? `Labor Units (${persona.projects.length})` : `Memories (${persona.memories.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* GitHub Labor Projects Section */}
      {(filterCategory === "all" || filterCategory === "projects") && filteredProjects.length > 0 && (
        <div style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <FolderGit2 size={18} color="var(--pat-amber-vest)" />
            <h3 style={{ fontFamily: "var(--font-mecha)", fontSize: "1.15rem", fontWeight: 700, letterSpacing: "0.02em" }}>
              ACTIVE LABOR UNITS & REPOSITORIES ({filteredProjects.length})
            </h3>
          </div>

          <div className="cards-grid">
            {filteredProjects.map((p, idx) => (
              <div key={p.id} className="memory-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="category-badge" style={{ background: "rgba(255, 140, 33, 0.16)", color: "var(--pat-amber-vest)", border: "1px solid rgba(255, 140, 33, 0.35)" }}>
                    {p.language || "CODE"}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--pat-police-dim)" }}>
                    UNIT // 0{idx + 1}
                  </span>
                </div>

                <h4 className="card-title">{p.title}</h4>
                <p className="card-content">{p.description}</p>
                
                {p.highlights && (
                  <div style={{ fontSize: "0.78rem", color: "var(--pat-hud-cyan)", background: "rgba(4, 8, 14, 0.4)", border: "1px solid rgba(56, 189, 248, 0.2)", padding: "8px 12px", borderRadius: "10px", fontFamily: "var(--font-mono)" }}>
                    ⚙️ <strong>SPECS:</strong> {p.highlights}
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "14px", marginTop: "4px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {p.demoUrl && (
                      <a href={p.demoUrl} target="_blank" rel="noreferrer" className="liquid-btn" style={{ padding: "4px 10px", fontSize: "0.74rem", color: "var(--pat-amber-vest)" }}>
                        <ExternalLink size={12} />
                        Launch Demo
                      </a>
                    )}
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer" className="liquid-btn" style={{ padding: "4px 10px", fontSize: "0.74rem", color: "var(--pat-police-muted)" }}>
                        <GithubIcon size={12} />
                        Archive
                      </a>
                    )}
                  </div>

                  <button
                    className="liquid-btn"
                    style={{ padding: "4px 8px", fontSize: "0.72rem" }}
                    onClick={() => onDeleteProject(p.id)}
                    title="Dismantle Project from Bay"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Memories Section */}
      {(filterCategory === "all" || filterCategory === "memories") && filteredMemories.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <Brain size={18} color="var(--pat-radar-green)" />
            <h3 style={{ fontFamily: "var(--font-mecha)", fontSize: "1.15rem", fontWeight: 700, letterSpacing: "0.02em" }}>
              PILOT MEMORIES & TELEMETRY ({filteredMemories.length})
            </h3>
          </div>

          <div className="cards-grid">
            {filteredMemories.map((m) => (
              <div key={m.id} className="memory-card" style={{ opacity: m.enabled ? 1 : 0.5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="category-badge" style={{ background: "rgba(52, 211, 153, 0.16)", color: "var(--pat-radar-green)", border: "1px solid rgba(52, 211, 153, 0.35)" }}>
                    {m.category}
                  </span>
                  <button
                    onClick={() => onToggleMemory(m.id)}
                    className="liquid-btn"
                    style={{ padding: "3px 8px", fontSize: "0.72rem" }}
                    title={m.enabled ? "Online in AI Prompt" : "Muted in AI Prompt"}
                  >
                    {m.enabled ? <CheckCircle2 size={13} color="var(--pat-radar-green)" /> : <XCircle size={13} />}
                    <span>{m.enabled ? "Online" : "Muted"}</span>
                  </button>
                </div>

                <h4 className="card-title">{m.title}</h4>
                <p className="card-content">{m.content}</p>

                <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "12px" }}>
                  <button
                    className="liquid-btn"
                    style={{ padding: "4px 10px", fontSize: "0.72rem" }}
                    onClick={() => onDeleteMemory(m.id)}
                    title="Erase Memory"
                  >
                    <Trash2 size={12} />
                    Erase
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
