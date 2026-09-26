import React from "react";
import { Sparkles, Sliders, RotateCcw, X, Eye, Zap, Layers } from "lucide-react";

export function LiquidGlassControl({
  isOpen,
  onClose,
  intensity,
  onIntensityChange,
  onReset
}) {
  if (!isOpen) return null;

  const presets = [
    { label: "Matte", value: 0, desc: "0% — Flat, solid dark interface" },
    { label: "Subtle", value: 35, desc: "35% — Light frosted sheen" },
    { label: "Liquid", value: 70, desc: "70% — Default VisionOS glass" },
    { label: "Ultra", value: 100, desc: "100% — Maximum refractive shine" },
  ];

  const currentBlur = Math.round(intensity * 0.36);
  const currentSaturate = Math.round(100 + intensity * 1.2);

  return (
    <div className="glass-tuner-popover">
      <div className="glass-tuner-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={15} color="var(--pat-hud-cyan)" />
          <span style={{ fontFamily: "var(--font-mecha)", fontSize: "0.88rem", fontWeight: 700, color: "var(--pat-police-white)", letterSpacing: "0.02em" }}>
            LIQUID GLASS TUNER
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            className="liquid-btn"
            style={{ padding: "3px 8px", fontSize: "0.72rem" }}
            onClick={onReset}
            title="Reset to default 70%"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
          <button
            className="liquid-btn"
            style={{ padding: "3px 8px", fontSize: "0.72rem" }}
            onClick={onClose}
            title="Close Tuner"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      <div className="glass-tuner-body">
        {/* Main Slider Row */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontFamily: "var(--font-mecha)", fontSize: "0.82rem", fontWeight: 600, color: "var(--pat-police-white)" }}>
              Glass Intensity
            </span>
            <span className="glass-value-badge">
              {intensity}%
            </span>
          </div>

          <div className="glass-slider-wrapper">
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => onIntensityChange(Number(e.target.value))}
              className="glass-custom-range"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--pat-police-dim)", fontFamily: "var(--font-mono)", marginTop: "4px" }}>
            <span>0% (Solid Matte)</span>
            <span>50%</span>
            <span>100% (Ultra Vision)</span>
          </div>
        </div>

        {/* Quick Presets */}
        <div style={{ marginBottom: "16px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--pat-police-dim)", display: "block", marginBottom: "6px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Quick Presets
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
            {presets.map((p) => {
              const isSelected = Math.abs(intensity - p.value) <= 5;
              return (
                <button
                  key={p.label}
                  onClick={() => onIntensityChange(p.value)}
                  className={`liquid-btn ${isSelected ? "liquid-btn-cyan" : ""}`}
                  style={{ padding: "5px 4px", fontSize: "0.74rem", textAlign: "center", justifyContent: "center" }}
                  title={p.desc}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Telemetry Metrics */}
        <div className="glass-metrics-grid">
          <div className="glass-metric-chip">
            <span className="metric-label">Blur Radius</span>
            <strong className="metric-value">{currentBlur}px</strong>
          </div>
          <div className="glass-metric-chip">
            <span className="metric-label">Saturation</span>
            <strong className="metric-value">{currentSaturate}%</strong>
          </div>
          <div className="glass-metric-chip">
            <span className="metric-label">Specular Glare</span>
            <strong className="metric-value">{Math.round(intensity * 0.85)}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
