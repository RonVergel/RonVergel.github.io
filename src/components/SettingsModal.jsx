import React from "react";
import { X, Sparkles, Key, Volume2, RotateCcw, ShieldCheck, Settings } from "lucide-react";

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
            <Settings size={18} color="var(--pat-hud-cyan)" />
            <h3 style={{ fontFamily: "var(--font-mecha)", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.02em" }}>
              SV-2 SYSTEM CONFIGURATION
            </h3>
          </div>
          <button className="liquid-btn btn-icon-liquid" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          {/* Provider Selection */}
          <div className="form-group">
            <label className="form-label">AI Neural Engine / Provider</label>
            <select
              className="form-input"
              value={settings.provider}
              onChange={(e) => onUpdateSettings({ provider: e.target.value })}
            >
              <option value="offline">⚡ Intelligent Offline (No API Key Required)</option>
              <option value="gemini">✨ Google Gemini API (Live LLM)</option>
              <option value="openai">🤖 OpenAI API (Live LLM)</option>
            </select>
            <span className="form-hint">
              Offline mode works 100% locally with Ron's GitHub context. Optionally plug in Gemini or OpenAI for live inference.
            </span>
          </div>

          {/* Gemini API Key */}
          {settings.provider === "gemini" && (
            <div className="form-group" style={{ marginTop: "16px" }}>
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Key size={14} color="var(--pat-hud-cyan)" />
                Google Gemini API Key
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="AIzaSy..."
                value={settings.geminiApiKey || ""}
                onChange={(e) => onUpdateSettings({ geminiApiKey: e.target.value })}
              />
              <span className="form-hint">Keys are stored only in your local browser storage.</span>
            </div>
          )}

          {/* OpenAI API Key */}
          {settings.provider === "openai" && (
            <div className="form-group" style={{ marginTop: "16px" }}>
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Key size={14} color="var(--pat-hud-cyan)" />
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderTop: "1px solid rgba(255, 255, 255, 0.1)", marginTop: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mecha)", fontWeight: 600, fontSize: "0.9rem" }}>
                <Volume2 size={16} color="var(--pat-radar-green)" />
                Voice Audio (Text-to-Speech)
              </div>
              <span className="form-hint">Automatically speak responses using the browser voice engine.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.voiceEnabled}
              onChange={(e) => onUpdateSettings({ voiceEnabled: e.target.checked })}
              style={{ width: "20px", height: "20px", accentColor: "var(--pat-amber-vest)", cursor: "pointer" }}
            />
          </div>

          {/* Reset to Defaults */}
          <div style={{ padding: "16px 0", borderTop: "1px solid rgba(255, 255, 255, 0.1)", marginTop: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mecha)", fontWeight: 700, fontSize: "0.9rem", color: "var(--pat-warning-rose)" }}>
                  RESET TO GITHUB DEFAULTS
                </div>
                <span className="form-hint">Reload original GitHub repositories and default settings.</span>
              </div>
              <button
                className="liquid-btn"
                style={{ color: "var(--pat-warning-rose)", borderColor: "rgba(244, 63, 94, 0.4)", padding: "6px 14px", fontSize: "0.8rem" }}
                onClick={() => {
                  if (confirm("Reset all memories, projects, and tone settings back to GitHub defaults?")) {
                    onResetDefaults();
                    onClose();
                  }
                }}
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="liquid-btn liquid-btn-amber" onClick={onClose}>
            Done & Save
          </button>
        </div>
      </div>
    </div>
  );
}
