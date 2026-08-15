import React, { useState } from "react";
import { Terminal, Copy, Check, Info, FileCode, Cpu } from "lucide-react";
import { buildSystemPrompt } from "../services/promptBuilder";

export function PromptInspector({ persona }) {
  const [copied, setCopied] = useState(false);
  const prompt = buildSystemPrompt(persona);

  const charCount = prompt.length;
  const tokenEstimate = Math.round(charCount / 4);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="panel-view-container">
      <div className="view-header">
        <div>
          <h2>CRT HUD // SYSTEM INSTRUCTION MONITOR</h2>
          <p>
            // RAW NEURAL TELEMETRY & SYSTEM PROMPT COMPILED FOR THE AV-98 INGRAM AI CORE
          </p>
        </div>

        <button className="liquid-btn liquid-btn-amber" onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied System HUD" : "Copy System Prompt"}
        </button>
      </div>

      {/* Telemetry Stats Bar */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div className="liquid-pill" style={{ padding: "6px 14px", fontSize: "0.78rem" }}>
          <FileCode size={14} color="var(--pat-hud-cyan)" />
          <span>Perspective: <strong style={{ color: "var(--pat-police-white)" }}>{persona.identity.perspective === "first_person" ? "1st Person (Pilot)" : "3rd Person (Bot)"}</strong></span>
        </div>

        <div className="liquid-pill" style={{ padding: "6px 14px", fontSize: "0.78rem" }}>
          <Cpu size={14} color="var(--pat-radar-green)" />
          <span>Active Memories: <strong style={{ color: "var(--pat-police-white)" }}>{persona.memories.filter(m => m.enabled !== false).length} / {persona.memories.length}</strong></span>
        </div>

        <div className="liquid-pill" style={{ padding: "6px 14px", fontSize: "0.78rem" }}>
          <span>Estimated Tokens: <strong style={{ color: "var(--pat-amber-vest)" }}>~{tokenEstimate.toLocaleString()}</strong> ({charCount.toLocaleString()} chars)</span>
        </div>
      </div>

      {/* CRT Console Display */}
      <div className="prompt-inspector-box">
        {prompt}
      </div>
    </div>
  );
}
