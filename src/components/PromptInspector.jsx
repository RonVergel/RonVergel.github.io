import React, { useState } from "react";
import { Terminal, Copy, Check, Info, FileCode } from "lucide-react";
import { buildSystemPrompt } from "../services/promptBuilder";

export function PromptInspector({ persona }) {
  const [copied, setCopied] = useState(false);
  const prompt = buildSystemPrompt(persona);

  // Approximate tokens ~ 4 chars per token
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
          <h2>System Prompt & Thought Inspector</h2>
          <p>
            This is the live compiled system instruction injected into the AI model before every conversation.
          </p>
        </div>

        <button className="btn-primary" onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied to Clipboard" : "Copy System Prompt"}
        </button>
      </div>

      {/* Stats Bar */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", padding: "8px 14px", borderRadius: "var(--radius-md)", fontSize: "0.82rem" }}>
          <FileCode size={16} color="#38bdf8" />
          <span>Perspective: <strong>{persona.identity.perspective === "first_person" ? "1st Person (I am Ron)" : "3rd Person (Representative)"}</strong></span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", padding: "8px 14px", borderRadius: "var(--radius-md)", fontSize: "0.82rem" }}>
          <Info size={16} color="#34d399" />
          <span>Active Memories: <strong>{persona.memories.filter(m => m.enabled !== false).length} / {persona.memories.length}</strong></span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", padding: "8px 14px", borderRadius: "var(--radius-md)", fontSize: "0.82rem" }}>
          <span>Estimated Tokens: <strong>~{tokenEstimate.toLocaleString()}</strong> ({charCount.toLocaleString()} chars)</span>
        </div>
      </div>

      {/* Prompt Code Block */}
      <div className="prompt-inspector-box">
        {prompt}
      </div>
    </div>
  );
}
