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
  Shield,
  Bot,
  Radio,
  Sparkles
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
    <div className="navbar-container-wrapper">
      <header className="navbar-dock">
        {/* Brand & Pilot Status */}
        <div className="navbar-brand">
          <div className="avatar-liquid-frame">
            <img
              src={persona.identity.avatarUrl || "https://avatars.githubusercontent.com/u/183253571?v=4"}
              alt={persona.identity.fullName}
              className="avatar-img"
            />
            <span className="status-mecha-blinker" title="SV-2 Pilot Sync: 99.8%"></span>
          </div>

          <div className="brand-info">
            <h1>
              <span>{persona.identity.preferredName}</span>
              <span style={{ color: "var(--pat-amber-vest)", fontSize: "0.85em" }}>// AI-TWIN</span>
              <a
                href={persona.identity.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="patlabor-callsign-badge"
                title="View GitHub Archive"
              >
                <GithubIcon size={12} />
                @{persona.identity.handle}
              </a>
            </h1>
            <p className="brand-subtitle">
              <span style={{ color: "var(--pat-radar-green)" }}>● LIVE</span> SV-2 SPECIAL VEHICLE COCKPIT • AV-98 INGRAM
            </p>
          </div>
        </div>

        {/* Liquid Glass Nav Pill Dock */}
        <nav className="nav-dock-tabs">
          <button
            className={`nav-tab-pill ${activeTab === "chat" ? "active" : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            <MessageSquare size={15} />
            Twin Comm
          </button>
          <button
            className={`nav-tab-pill ${activeTab === "knowledge" ? "active" : ""}`}
            onClick={() => setActiveTab("knowledge")}
          >
            <BookOpen size={15} />
            Hangar Bay ({persona.projects.length + persona.memories.length})
          </button>
          <button
            className={`nav-tab-pill ${activeTab === "interview" ? "active" : ""}`}
            onClick={() => setActiveTab("interview")}
          >
            <Mic size={15} />
            Pilot Sync
          </button>
          <button
            className={`nav-tab-pill ${activeTab === "tuner" ? "active" : ""}`}
            onClick={() => setActiveTab("tuner")}
          >
            <Sliders size={15} />
            Telemetry
          </button>
          <button
            className={`nav-tab-pill ${activeTab === "inspector" ? "active" : ""}`}
            onClick={() => setActiveTab("inspector")}
          >
            <Terminal size={15} />
            CRT HUD
          </button>
        </nav>

        {/* Liquid Glass Action Buttons */}
        <div className="navbar-actions">
          {/* Spotify Liquid Pill */}
          <button
            className={`liquid-btn ${isSpotifyOpen ? "liquid-btn-amber" : ""}`}
            onClick={onToggleSpotify}
            style={{ padding: "7px 14px", fontSize: "0.8rem" }}
            title="Toggle Spotify Cockpit Soundtrack"
          >
            <Music size={14} color={isSpotifyOpen ? "#fff" : "#1ed760"} />
            <span>Soundtrack</span>
          </button>

          {/* Perspective Toggle Liquid Pill */}
          <button
            className={`liquid-btn ${isFirstPerson ? "liquid-btn-cyan" : ""}`}
            onClick={togglePerspective}
            style={{ padding: "7px 14px", fontSize: "0.8rem" }}
            title="Switch Perspective (1st Person vs Representative)"
          >
            {isFirstPerson ? <Shield size={14} color="#fff" /> : <Bot size={14} color="var(--pat-amber-vest)" />}
            <span>{isFirstPerson ? "1st Person (Ron)" : "3rd Person (Bot)"}</span>
          </button>

          {/* Export Liquid Button */}
          <button
            className="liquid-btn btn-icon-liquid"
            onClick={onOpenExport}
            title="Export Pilot Profile & Prompts"
          >
            <Download size={16} />
          </button>

          {/* Settings Liquid Button */}
          <button
            className="liquid-btn btn-icon-liquid"
            onClick={onOpenSettings}
            title="System & AI Model Settings"
          >
            <Settings size={16} />
          </button>
        </div>
      </header>
    </div>
  );
}
