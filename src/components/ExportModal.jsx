import React, { useState } from "react";
import { X, Download, FileJson, FileText, Code2, Copy, Check } from "lucide-react";
import { buildSystemPrompt } from "../services/promptBuilder";

export function ExportModal({ isOpen, onClose, persona }) {
  const [copiedType, setCopiedType] = useState(null);
  if (!isOpen) return null;

  const systemPrompt = buildSystemPrompt(persona);

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(persona, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${persona.identity.handle || "ron"}-persona.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadMarkdown = () => {
    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(systemPrompt);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${persona.identity.handle || "ron"}-system-prompt.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const widgetSnippet = `<!-- Embed Ron's AI Twin Widget on your site -->
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
            <Download size={18} color="#38bdf8" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Export & Share Persona</h3>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "20px" }}>
            Export your AI Twin's configuration, prompt blueprint, or integration snippets to use in Cursor, ChatGPT, Claude, or your personal website.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Export JSON */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-card)", padding: "14px 18px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <FileJson size={22} color="#fbbf24" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>Persona Config (JSON)</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>Full memory bank, projects, and tone sliders</div>
                </div>
              </div>
              <button className="btn-primary" onClick={handleDownloadJSON} style={{ padding: "6px 12px", fontSize: "0.78rem" }}>
                <Download size={14} />
                Download JSON
              </button>
            </div>

            {/* Export Markdown System Prompt */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-card)", padding: "14px 18px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <FileText size={22} color="#38bdf8" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>System Prompt (Markdown)</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>Ready to paste into ChatGPT, Claude, or custom API</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="perspective-toggle" onClick={handleCopyPrompt} style={{ padding: "6px 10px", fontSize: "0.78rem" }}>
                  {copiedType === "prompt" ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                  <span>{copiedType === "prompt" ? "Copied" : "Copy"}</span>
                </button>
                <button className="btn-primary" onClick={handleDownloadMarkdown} style={{ padding: "6px 12px", fontSize: "0.78rem" }}>
                  <Download size={14} />
                  Download .md
                </button>
              </div>
            </div>

            {/* Embed Widget Snippet */}
            <div style={{ background: "var(--bg-card)", padding: "14px 18px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-card)", marginTop: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, fontSize: "0.92rem" }}>
                  <Code2 size={18} color="#34d399" />
                  Website Embed Snippet
                </div>
                <button className="perspective-toggle" onClick={handleCopyWidget} style={{ padding: "4px 8px", fontSize: "0.75rem" }}>
                  {copiedType === "widget" ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
                  <span>{copiedType === "widget" ? "Copied Code" : "Copy Code"}</span>
                </button>
              </div>
              <pre style={{ background: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "6px", fontSize: "0.78rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", overflowX: "auto" }}>
                {widgetSnippet}
              </pre>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="perspective-toggle" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
