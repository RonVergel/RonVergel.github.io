import React, { useState } from "react";
import {
  Sliders,
  Sparkles,
  Smile,
  Code,
  Zap,
  Plus,
  X,
  RotateCcw,
  Check
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
          <h2>Personality & Tone Matrix</h2>
          <p>
            Fine-tune {persona.identity.preferredName}'s mannerisms, humor, technical depth, and speaking quirks in real-time.
          </p>
        </div>
      </div>

      <div className="tuner-grid">
        {/* Sliders Card */}
        <div className="tuner-card">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px" }}>
            <Sliders size={18} color="#38bdf8" />
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>Vibe & Behavioral Sliders</h3>
          </div>

          {/* Formality Slider */}
          <div className="slider-row">
            <div className="slider-header">
              <span className="slider-title">Formality</span>
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
              <span>Chill & Casual</span>
              <span>Balanced</span>
              <span>Strict / Formal</span>
            </div>
          </div>

          {/* Playfulness Slider */}
          <div className="slider-row">
            <div className="slider-header">
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
              <span>Witty & Sarcastic</span>
            </div>
          </div>

          {/* Technical Depth */}
          <div className="slider-row">
            <div className="slider-header">
              <span className="slider-title">Technical Depth</span>
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
              <span>Layman Friendly</span>
              <span>Practical</span>
              <span>Deep Architecture & Code</span>
            </div>
          </div>

          {/* Conciseness */}
          <div className="slider-row">
            <div className="slider-header">
              <span className="slider-title">Conciseness</span>
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
              <span>Story-driven / Detailed</span>
              <span>Balanced</span>
              <span>Punchy & Bulleted</span>
            </div>
          </div>

          {/* Energy / Enthusiasm */}
          <div className="slider-row">
            <div className="slider-header">
              <span className="slider-title">Energy & Enthusiasm</span>
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
              <span>Calm & Stoic</span>
              <span>Engaged</span>
              <span>High Energy & Hype</span>
            </div>
          </div>

          {/* Emoji Toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
            <span style={{ fontSize: "0.88rem", fontWeight: 600 }}>Allow Emojis in Responses</span>
            <input
              type="checkbox"
              checked={toneSettings.emojisAllowed}
              onChange={(e) => onUpdateTone({ emojisAllowed: e.target.checked })}
              style={{ width: "18px", height: "18px", accentColor: "var(--accent-cyan)", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Phrases & Guardrails Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Signature Phrases */}
          <div className="tuner-card">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px" }}>
              <Smile size={18} color="#34d399" />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>Signature Phrases & Mannerisms</h3>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Add a phrase you frequently say..."
                className="form-input"
                style={{ flex: 1 }}
                value={newPhrase}
                onChange={(e) => setNewPhrase(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddPhrase()}
              />
              <button className="btn-primary" onClick={handleAddPhrase}>
                <Plus size={16} />
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
              {toneSettings.favoritePhrases?.map((phrase, idx) => (
                <span
                  key={idx}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(52, 211, 153, 0.12)", color: "#34d399", border: "1px solid rgba(52, 211, 153, 0.25)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: "0.8rem" }}
                >
                  "{phrase}"
                  <X
                    size={13}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemovePhrase(phrase)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Banned Topics & Privacy */}
          <div className="tuner-card">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px" }}>
              <Zap size={18} color="#fb7185" />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>Banned Topics & Guardrails</h3>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Topic or detail the AI should decline..."
                className="form-input"
                style={{ flex: 1 }}
                value={newBanned}
                onChange={(e) => setNewBanned(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddBanned()}
              />
              <button className="btn-primary" onClick={handleAddBanned} style={{ background: "var(--accent-rose)", color: "#fff" }}>
                <Plus size={16} />
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
              {toneSettings.bannedTopics?.map((topic, idx) => (
                <span
                  key={idx}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(251, 113, 133, 0.12)", color: "#fb7185", border: "1px solid rgba(251, 113, 133, 0.25)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: "0.8rem" }}
                >
                  {topic}
                  <X
                    size={13}
                    style={{ cursor: "pointer" }}
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
