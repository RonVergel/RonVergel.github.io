import React, { useState } from "react";
import {
  Sliders,
  Sparkles,
  Smile,
  Zap,
  Plus,
  X,
  Radio,
  Cpu,
  Gauge
} from "lucide-react";

export function PersonaTuner({ persona, onUpdateTone }) {
  const { toneSettings } = persona;
  const [newPhrase, setNewPhrase] = useState("");
  const [newBanned, setNewBanned] = useState("");

  const handleSliderChange = (key, value) => {
    onUpdateTone({ [key]: Number(value) });
  };

  const handleAddPhrase = () => {
    if (!newPhrase.trim()) return;
    const current = toneSettings.favoritePhrases || [];
    if (!current.includes(newPhrase.trim())) {
      onUpdateTone({ favoritePhrases: [...current, newPhrase.trim()] });
    }
    setNewPhrase("");
  };

  const handleRemovePhrase = (phrase) => {
    const current = toneSettings.favoritePhrases || [];
    onUpdateTone({ favoritePhrases: current.filter(p => p !== phrase) });
  };

  const handleAddBanned = () => {
    if (!newBanned.trim()) return;
    const current = toneSettings.bannedTopics || [];
    if (!current.includes(newBanned.trim())) {
      onUpdateTone({ bannedTopics: [...current, newBanned.trim()] });
    }
    setNewBanned("");
  };

  const handleRemoveBanned = (topic) => {
    const current = toneSettings.bannedTopics || [];
    onUpdateTone({ bannedTopics: current.filter(t => t !== topic) });
  };

  return (
    <div className="panel-view-container">
      <div className="view-header">
        <div>
          <h2>TELEMETRY MATRIX // TONE & QUIRKS</h2>
          <p>
            // REAL-TIME BEHAVIORAL CALIBRATION & PILOT MANNERISM CONTROLS FOR {persona.identity.fullName.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="tuner-grid">
        {/* Sliders Card */}
        <div className="tuner-card">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "14px" }}>
            <Gauge size={20} color="var(--pat-amber-vest)" />
            <h3 style={{ fontFamily: "var(--font-mecha)", fontSize: "1.1rem", fontWeight: 700 }}>
              NEURAL TELEMETRY GAUGES
            </h3>
          </div>

          {/* Formality Slider */}
          <div className="slider-row">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="slider-title">Formality Index</span>
              <span className="slider-value-badge">{toneSettings.formality}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={toneSettings.formality}
              onChange={(e) => handleSliderChange("formality", e.target.value)}
              className="custom-range-slider"
            />
            <div className="slider-labels">
              <span>Tactical Chill</span>
              <span>Balanced</span>
              <span>Formal Protocol</span>
            </div>
          </div>

          {/* Playfulness Slider */}
          <div className="slider-row">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="slider-title">Wit & Playfulness</span>
              <span className="slider-value-badge">{toneSettings.playfulness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={toneSettings.playfulness}
              onChange={(e) => handleSliderChange("playfulness", e.target.value)}
              className="custom-range-slider"
            />
            <div className="slider-labels">
              <span>Direct / Dry</span>
              <span>Friendly</span>
              <span>Witty Banter</span>
            </div>
          </div>

          {/* Technical Depth */}
          <div className="slider-row">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="slider-title">Engineering Depth</span>
              <span className="slider-value-badge">{toneSettings.technicalDepth}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={toneSettings.technicalDepth}
              onChange={(e) => handleSliderChange("technicalDepth", e.target.value)}
              className="custom-range-slider"
            />
            <div className="slider-labels">
              <span>High-Level</span>
              <span>Practical</span>
              <span>Deep Architecture</span>
            </div>
          </div>

          {/* Conciseness */}
          <div className="slider-row">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="slider-title">Transmission Length</span>
              <span className="slider-value-badge">{toneSettings.conciseness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={toneSettings.conciseness}
              onChange={(e) => handleSliderChange("conciseness", e.target.value)}
              className="custom-range-slider"
            />
            <div className="slider-labels">
              <span>Elaborate Lore</span>
              <span>Balanced</span>
              <span>Punchy Telemetry</span>
            </div>
          </div>

          {/* Energy / Enthusiasm */}
          <div className="slider-row">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="slider-title">Enthusiasm & Voltage</span>
              <span className="slider-value-badge">{toneSettings.enthusiasm}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={toneSettings.enthusiasm}
              onChange={(e) => handleSliderChange("enthusiasm", e.target.value)}
              className="custom-range-slider"
            />
            <div className="slider-labels">
              <span>Stoic Mecha</span>
              <span>Engaged</span>
              <span>High Energy Hype</span>
            </div>
          </div>

          {/* Emoji Toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <span style={{ fontFamily: "var(--font-mecha)", fontSize: "0.9rem", fontWeight: 600 }}>Transmit Emoji Glyphs</span>
            <input
              type="checkbox"
              checked={toneSettings.emojisAllowed}
              onChange={(e) => onUpdateTone({ emojisAllowed: e.target.checked })}
              style={{ width: "20px", height: "20px", accentColor: "var(--pat-amber-vest)", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Phrases and Classified Topics */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Signature Phrases */}
          <div className="tuner-card">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "14px" }}>
              <Smile size={18} color="var(--pat-radar-green)" />
              <h3 style={{ fontFamily: "var(--font-mecha)", fontSize: "1.05rem", fontWeight: 700 }}>
                SIGNATURE CALLSIGNS & MANNERISMS
              </h3>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Add a phrase you frequently say in comms..."
                className="form-input"
                style={{ flex: 1 }}
                value={newPhrase}
                onChange={(e) => setNewPhrase(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddPhrase()}
              />
              <button className="liquid-btn liquid-btn-amber" onClick={handleAddPhrase} style={{ width: "38px", height: "38px", padding: 0 }}>
                <Plus size={16} />
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
              {toneSettings.favoritePhrases?.map((phrase, idx) => (
                <span
                  key={idx}
                  className="liquid-pill"
                  style={{ background: "rgba(52, 211, 153, 0.14)", borderColor: "rgba(52, 211, 153, 0.3)", color: "var(--pat-radar-green)", fontSize: "0.78rem", padding: "4px 12px" }}
                >
                  "{phrase}"
                  <X
                    size={12}
                    style={{ cursor: "pointer", marginLeft: "4px" }}
                    onClick={() => handleRemovePhrase(phrase)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Banned Topics & Classified Security */}
          <div className="tuner-card">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "14px" }}>
              <Zap size={18} color="var(--pat-warning-rose)" />
              <h3 style={{ fontFamily: "var(--font-mecha)", fontSize: "1.05rem", fontWeight: 700 }}>
                CLASSIFIED TOPICS & GUARDRAILS
              </h3>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Topic or detail the AI must decline to answer..."
                className="form-input"
                style={{ flex: 1 }}
                value={newBanned}
                onChange={(e) => setNewBanned(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddBanned()}
              />
              <button className="liquid-btn" onClick={handleAddBanned} style={{ width: "38px", height: "38px", padding: 0, color: "var(--pat-warning-rose)", borderColor: "rgba(244, 63, 94, 0.4)" }}>
                <Plus size={16} />
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
              {toneSettings.bannedTopics?.map((topic, idx) => (
                <span
                  key={idx}
                  className="liquid-pill"
                  style={{ background: "rgba(244, 63, 94, 0.14)", borderColor: "rgba(244, 63, 94, 0.35)", color: "var(--pat-warning-rose)", fontSize: "0.78rem", padding: "4px 12px" }}
                >
                  {topic}
                  <X
                    size={12}
                    style={{ cursor: "pointer", marginLeft: "4px" }}
                    onClick={() => handleRemoveBanned(topic)}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
