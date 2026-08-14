import React from "react";
import { X, Sparkles, Key, Volume2, RotateCcw, ShieldCheck } from "lucide-react";

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetDefaults
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={18} color="#38bdf8" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>AI Studio Settings</h3>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          {/* Provider Selection */}
          <div className="form-group">
            <label className="form-label">AI Engine / Provider</label>
            <select
              className="form-input"
              value={settings.provider}
              onChange={(e) => onUpdateSettings({ provider: e.target.value })}
            >
              <option value="offline">⚡ Intelligent Offline Simulation (No API Key Required)</option>
              <option value="gemini">✨ Google Gemini API (Live LLM)</option>
              <option value="openai">🤖 OpenAI API (Live LLM)</option>
            </select>
            <span className="form-hint">
              Offline simulation works 100% locally and simulates Ron's persona with GitHub context. You can optionally plug in your Gemini or OpenAI API key for live inference.
            </span>
          </div>

          {/* Gemini API Key */}
          {settings.provider === "gemini" && (
            <div className="form-group" style={{ marginTop: "16px" }}>
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Key size={14} color="#38bdf8" />
                Google Gemini API Key
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="AIzaSy..."
                value={settings.geminiApiKey || ""}
                onChange={(e) => onUpdateSettings({ geminiApiKey: e.target.value })}
              />
              <span className="form-hint">
                Keys are stored only in your local browser storage.
              </span>
            </div>
          )}

          {/* OpenAI API Key */}
          {settings.provider === "openai" && (
            <div className="form-group" style={{ marginTop: "16px" }}>
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Key size={14} color="#38bdf8" />
                OpenAI API Key
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="sk-proj-..."
                value={settings.openaiApiKey || ""}
                onChange={(e) => onUpdateSettings({ openaiApiKey: e.target.value })}
              />
            </div>
          )}

          {/* Voice Output */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderTop: "1px solid var(--border-subtle)", marginTop: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "0.9rem" }}>
                <Volume2 size={16} color="#34d399" />
                Voice Audio (Text-to-Speech)
              </div>
              <span className="form-hint">Automatically speak responses out loud using the browser voice engine.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.voiceEnabled}
              onChange={(e) => onUpdateSettings({ voiceEnabled: e.target.checked })}
              style={{ width: "18px", height: "18px", accentColor: "var(--accent-cyan)", cursor: "pointer" }}
            />
          </div>

          {/* Reset to Defaults */}
          <div style={{ padding: "16px 0", borderTop: "1px solid var(--border-subtle)", marginTop: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--accent-rose)" }}>
                  Reset to GitHub Defaults
                </div>
                <span className="form-hint">Reload original GitHub repositories and settings.</span>
              </div>
              <button
                className="perspective-toggle"
                onClick={() => {
                  if (confirm("Reset all memories, projects, and tone settings back to GitHub defaults?")) {
                    onResetDefaults();
                    onClose();
                  }
                }}
                style={{ color: "var(--accent-rose)", borderColor: "rgba(251, 113, 133, 0.3)" }}
              >
                <RotateCcw size={14} />
                Reset Data
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Done & Save
          </button>
        </div>
      </div>
    </div>
  );
}
