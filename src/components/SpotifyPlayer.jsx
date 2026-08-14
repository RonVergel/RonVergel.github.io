import React, { useState } from "react";
import { Music, X, ChevronDown, ChevronUp, ExternalLink, Disc3 } from "lucide-react";

export function SpotifyPlayer({ isOpen, onToggle }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        className="spotify-floating-btn"
        onClick={onToggle}
        title={isOpen ? "Close Spotify Player" : "Open Ron's Spotify Coding Playlist"}
      >
        <div className="spotify-icon-badge">
          <Disc3 size={18} className={isOpen ? "spin-music" : ""} color="#1ed760" />
        </div>
        <span className="spotify-btn-label">Coding Playlist</span>
        <div className="equalizer-bars">
          <span className="bar bar-1"></span>
          <span className="bar bar-2"></span>
          <span className="bar bar-3"></span>
        </div>
      </button>

      {/* Floating Player Popover */}
      {isOpen && (
        <div className={`spotify-popover-card ${isMinimized ? "minimized" : ""}`}>
          <div className="spotify-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1ed760" }}></div>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f8fafc" }}>
                Ron's Coding Soundtrack
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <a
                href="https://open.spotify.com/playlist/1dqCUBrb8BQpdtdxpTwlVc"
                target="_blank"
                rel="noreferrer"
                className="spotify-header-btn"
                title="Open in Spotify App"
              >
                <ExternalLink size={13} />
              </a>
              <button
                className="spotify-header-btn"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              <button
                className="spotify-header-btn"
                onClick={onToggle}
                title="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="spotify-iframe-container">
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: "12px", border: "none" }}
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
