import React from "react";
import {
  MessageSquare,
  BookOpen,
  Mic,
  Sliders,
  Terminal,
  Settings,
  Download,
  Music,
  UserCheck,
  Bot
} from "lucide-react";
import { GithubIcon } from "./GithubIcon";

export function Navbar({
  activeTab,
  setActiveTab,
  persona,
  togglePerspective,
  onOpenSettings,
  onOpenExport,
  onResetDefaults,
  onToggleSpotify,
  isSpotifyOpen
}) {
  const isFirstPerson = persona.identity.perspective === "first_person";

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="avatar-wrapper">
          <img
            src={persona.identity.avatarUrl || "https://avatars.githubusercontent.com/u/183253571?v=4"}
            alt={persona.identity.fullName}
            className="avatar-img"
          />
          <span className="status-indicator" title="Agent Online"></span>
        </div>
        <div className="brand-info">
          <h1>
            {persona.identity.preferredName} AI Twin
            <a
              href={persona.identity.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="badge-tag"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              <GithubIcon size={12} />
              @{persona.identity.handle}
            </a>
          </h1>
          <p className="brand-subtitle">{persona.identity.tagline}</p>
        </div>
      </div>

      {/* Nav Tabs */}
      <nav className="nav-tabs">
        <button
          className={`nav-tab-btn ${activeTab === "chat" ? "active" : ""}`}
          onClick={() => setActiveTab("chat")}
        >
          <MessageSquare size={16} />
          Twin Chat
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "knowledge" ? "active" : ""}`}
          onClick={() => setActiveTab("knowledge")}
        >
          <BookOpen size={16} />
          Memory & Projects ({persona.projects.length + persona.memories.length})
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "interview" ? "active" : ""}`}
          onClick={() => setActiveTab("interview")}
        >
          <Mic size={16} />
          Interview Studio
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "tuner" ? "active" : ""}`}
          onClick={() => setActiveTab("tuner")}
        >
          <Sliders size={16} />
          Tone & Quirks
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "inspector" ? "active" : ""}`}
          onClick={() => setActiveTab("inspector")}
        >
          <Terminal size={16} />
          Prompt Inspector
        </button>
      </nav>

      {/* Action Controls */}
      <div className="navbar-actions">
        <button
          className="perspective-toggle"
          onClick={onToggleSpotify}
          style={{ borderColor: isSpotifyOpen ? "#1ed760" : "rgba(30, 215, 96, 0.3)", color: isSpotifyOpen ? "#1ed760" : "var(--text-secondary)" }}
          title="Toggle Spotify Coding Playlist"
        >
          <Music size={14} color="#1ed760" />
          <span>Spotify Vibes</span>
        </button>

        <button
          className="perspective-toggle"
          onClick={togglePerspective}
          title="Switch perspective between 1st Person ('I am Ron') and Representative Mode ('I represent Ron')"
        >
          {isFirstPerson ? <UserCheck size={14} color="#38bdf8" /> : <Bot size={14} color="#34d399" />}
          <span>{isFirstPerson ? "1st Person" : "Representative"}</span>
        </button>

        <button
          className="btn-icon"
          onClick={onOpenExport}
          title="Export Persona & Prompts"
        >
          <Download size={17} />
        </button>

        <button
          className="btn-icon"
          onClick={onOpenSettings}
          title="Model & API Settings"
        >
          <Settings size={17} />
        </button>
      </div>
    </header>
  );
}
