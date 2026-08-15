import React, { useState } from "react";
import { X, Download, FileJson, FileText, Code2, Copy, Check } from "lucide-react";
import { buildSystemPrompt } from "../services/promptBuilder";

export function ExportModal({ isOpen, onClose, persona }) {
  const [copiedType, setCopiedType] = useState(null);
  if (!isOpen) return null;

  const systemPrompt = buildSystemPrompt(persona);

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(persona, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `${persona.identity.handle || "ron"}-persona.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownloadMarkdown = () => {
    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(systemPrompt);
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `${persona.identity.handle || "ron"}-system-prompt.md`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const widgetSnippet = `<!-- Embed Ron's AI Twin Widget -->
<script
  src="https://cdn.jsdelivr.net/npm/@ronai/widget@latest/dist/widget.umd.js"
  data-persona="${persona.identity.handle}"
  data-name="${persona.identity.preferredName}"
  data-theme="dark"
></script>`;

  const handleCopyWidget = () => {
    navigator.clipboard.writeText(widgetSnippet);
    setCopiedType("widget");
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(systemPrompt);
    setCopiedType("prompt");
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Download size={18} color="var(--pat-hud-cyan)" />
            <h3 style={{ fontFamily: "var(--font-mecha)", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.02em" }}>
              EXTRACT & TRANSMIT PILOT PROFILE
            </h3>
          </div>
          <button className="liquid-btn btn-icon-liquid" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: "var(--pat-police-muted)", fontSize: "0.88rem", marginBottom: "20px", fontFamily: "var(--font-mono)" }}>
            // Export AI Twin configuration, system prompt, or embed snippets for Cursor, ChatGPT, Claude, or your own portfolio.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Export JSON */}
            <div className="memory-card" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <FileJson size={22} color="var(--pat-amber-vest)" />
                <div>
                  <div style={{ fontFamily: "var(--font-mecha)", fontWeight: 700, fontSize: "0.92rem" }}>Persona Config (JSON)</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--pat-police-muted)" }}>Full memory bank, projects, tone matrix</div>
                </div>
              </div>
              <button className="liquid-btn liquid-btn-amber" onClick={handleDownloadJSON} style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
                <Download size={14} />
                Download JSON
              </button>
            </div>

            {/* Export Markdown */}
            <div className="memory-card" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <FileText size={22} color="var(--pat-hud-cyan)" />
                <div>
                  <div style={{ fontFamily: "var(--font-mecha)", fontWeight: 700, fontSize: "0.92rem" }}>System Prompt (Markdown)</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--pat-police-muted)" }}>Ready for ChatGPT, Claude, or custom API</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="liquid-btn" onClick={handleCopyPrompt} style={{ padding: "6px 12px", fontSize: "0.8rem" }}>
                  {copiedType === "prompt" ? <Check size={14} color="var(--pat-radar-green)" /> : <Copy size={14} />}
                  <span>{copiedType === "prompt" ? "Copied" : "Copy"}</span>
                </button>
                <button className="liquid-btn liquid-btn-cyan" onClick={handleDownloadMarkdown} style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
                  <Download size={14} />
                  Download .md
                </button>
              </div>
            </div>

            {/* Embed Widget */}
            <div className="memory-card" style={{ padding: "16px 20px", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mecha)", fontWeight: 700, fontSize: "0.92rem" }}>
                  <Code2 size={18} color="var(--pat-radar-green)" />
                  Website Embed Snippet
                </div>
                <button className="liquid-btn" onClick={handleCopyWidget} style={{ padding: "4px 10px", fontSize: "0.78rem" }}>
                  {copiedType === "widget" ? <Check size={13} color="var(--pat-radar-green)" /> : <Copy size={13} />}
                  <span>{copiedType === "widget" ? "Copied" : "Copy Code"}</span>
                </button>
              </div>
              <pre className="prompt-inspector-box" style={{ maxHeight: "120px", fontSize: "0.78rem" }}>
                {widgetSnippet}
              </pre>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="liquid-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
