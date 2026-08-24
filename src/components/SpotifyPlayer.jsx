import React, { useState } from "react";
import { Music, X, ChevronDown, ChevronUp, ExternalLink, Disc3, Radio } from "lucide-react";

export function SpotifyPlayer({ isOpen, onToggle }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {/* Floating Liquid Glass Spotify Pill Button */}
      <button
        className="spotify-floating-btn"
        onClick={onToggle}
        title={isOpen ? "Close Audio" : "Open Ron's Spotify Coding Soundtrack"}
      >
        <div className="spotify-icon-badge">
          <Disc3 size={16} className={isOpen ? "spin-music" : ""} color="#1ed760" />
        </div>
        <span className="spotify-btn-label">CODING SOUNDTRACK</span>
        <div className="equalizer-bars">
          <span className="bar bar-1"></span>
          <span className="bar bar-2"></span>
          <span className="bar bar-3"></span>
        </div>
      </button>

      {/* Floating Liquid Glass Popover */}
      {isOpen && (
        <div className={`spotify-popover-card ${isMinimized ? "minimized" : ""}`}>
          <div className="spotify-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Radio size={14} color="#1ed760" />
              <span style={{ fontFamily: "var(--font-mecha)", fontSize: "0.85rem", fontWeight: 700, color: "var(--pat-police-white)" }}>
                RON'S CODING PLAYLIST
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <a
                href="https://open.spotify.com/playlist/1dqCUBrb8BQpdtdxpTwlVc"
                target="_blank"
                rel="noreferrer"
                className="liquid-btn"
                style={{ padding: "4px 8px", fontSize: "0.72rem" }}
                title="Launch in Spotify App"
              >
                <ExternalLink size={12} />
              </a>
              <button
                className="liquid-btn"
                style={{ padding: "4px 8px", fontSize: "0.72rem" }}
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              <button
                className="liquid-btn"
                style={{ padding: "4px 8px", fontSize: "0.72rem" }}
                onClick={onToggle}
                title="Close"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="spotify-iframe-container">
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: "8px", border: "none" }}
                src="https://open.spotify.com/embed/playlist/1dqCUBrb8BQpdtdxpTwlVc?utm_source=generator&theme=0&si=8d411131797642b2"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Ron's Spotify Playlist"
              ></iframe>
            </div>
          )}
        </div>
      )}
    </>
  );
}
