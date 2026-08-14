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
  Code
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
      {/* Top Header */}
      <div className="view-header">
        <div>
          <h2>Knowledge & Memory Base</h2>
          <p>
            Manage the active context, GitHub repositories, and backstory memories injected into {persona.identity.preferredName}'s AI twin.
          </p>
        </div>
        <button className="btn-primary" onClick={onOpenAddMemory}>
          <Plus size={16} />
          Add Memory / Project
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--bg-panel)", border: "1px solid var(--border-card)", borderRadius: "var(--radius-md)", padding: "8px 14px", flex: 1, minWidth: "240px" }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search projects, skills, or memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", width: "100%", fontSize: "0.88rem" }}
          />
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          {["all", "projects", "memories"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`nav-tab-btn ${filterCategory === cat ? "active" : ""}`}
              style={{ textTransform: "capitalize" }}
            >
              {cat === "all" ? "All Knowledge" : cat === "projects" ? `GitHub Repos (${persona.projects.length})` : `Memories (${persona.memories.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      {(filterCategory === "all" || filterCategory === "projects") && filteredProjects.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <FolderGit2 size={18} color="#38bdf8" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              GitHub Repositories ({filteredProjects.length})
            </h3>
          </div>

          <div className="cards-grid">
            {filteredProjects.map((p) => (
              <div key={p.id} className="memory-card">
                <div className="card-top">
                  <span className="category-badge" style={{ background: "rgba(56, 189, 248, 0.12)", color: "#38bdf8" }}>
                    {p.language || "Code"}
                  </span>
                  {p.repo && (
                    <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      @{persona.identity.handle}/{p.repo}
                    </span>
                  )}
                </div>

                <h4 className="card-title">{p.title}</h4>
                <p className="card-content">{p.description}</p>
                
                {p.highlights && (
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", background: "rgba(0,0,0,0.25)", padding: "6px 10px", borderRadius: "6px" }}>
                    💡 <strong>Highlights:</strong> {p.highlights}
                  </div>
                )}

                <div className="card-footer">
                  <div className="card-links">
                    {p.demoUrl && (
                      <a href={p.demoUrl} target="_blank" rel="noreferrer" className="card-link-btn">
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    )}
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer" className="card-link-btn" style={{ color: "var(--text-secondary)" }}>
                        <GithubIcon size={13} />
                        GitHub
                      </a>
                    )}
                  </div>

                  <button
                    className="msg-action-btn"
                    onClick={() => onDeleteProject(p.id)}
                    title="Remove from knowledge base"
                  >
                    <Trash2 size={13} />
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Brain size={18} color="#34d399" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              Personal Memories & Stories ({filteredMemories.length})
            </h3>
          </div>

          <div className="cards-grid">
            {filteredMemories.map((m) => (
              <div key={m.id} className={`memory-card ${!m.enabled ? "disabled" : ""}`}>
                <div className="card-top">
                  <span className="category-badge" style={{ background: "rgba(52, 211, 153, 0.12)", color: "#34d399" }}>
                    {m.category}
                  </span>
                  <button
                    onClick={() => onToggleMemory(m.id)}
                    style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: m.enabled ? "var(--accent-emerald)" : "var(--text-muted)" }}
                    title={m.enabled ? "Active in AI Prompt" : "Disabled in AI Prompt"}
                  >
                    {m.enabled ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                    {m.enabled ? "Active" : "Muted"}
                  </button>
                </div>

                <h4 className="card-title">{m.title}</h4>
                <p className="card-content">{m.content}</p>

                <div className="card-footer" style={{ justifyContent: "flex-end" }}>
                  <button
                    className="msg-action-btn"
                    onClick={() => onDeleteMemory(m.id)}
                    title="Delete Memory"
                  >
                    <Trash2 size={13} />
                    Delete
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
