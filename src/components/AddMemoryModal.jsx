import React, { useState } from "react";
import { X, Plus, Brain, FolderGit2 } from "lucide-react";

export function AddMemoryModal({ isOpen, onClose, onAddMemory, onAddProject }) {
  const [tabType, setTabType] = useState("memory"); // "memory" | "project"

  // Memory form
  const [category, setCategory] = useState("Personal");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Project form
  const [projTitle, setProjTitle] = useState("");
  const [repoName, setRepoName] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [description, setDescription] = useState("");
  const [highlights, setHighlights] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tabType === "memory") {
      if (!title.trim() || !content.trim()) return;
      onAddMemory({
        category,
        title: title.trim(),
        content: content.trim()
      });
      setTitle("");
      setContent("");
    } else {
      if (!projTitle.trim() || !description.trim()) return;
      onAddProject({
        title: projTitle.trim(),
        repo: repoName.trim(),
        language: language.trim(),
        description: description.trim(),
        highlights: highlights.trim(),
        demoUrl: demoUrl.trim() || null,
        url: githubUrl.trim() || null
      });
      setProjTitle("");
      setRepoName("");
      setDescription("");
      setHighlights("");
      setDemoUrl("");
      setGithubUrl("");
    }
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Plus size={18} color="#38bdf8" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add to Knowledge Base</h3>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Tab switch between Memory and Project */}
        <div style={{ display: "flex", padding: "12px 24px 0 24px", gap: "8px" }}>
          <button
            className={`nav-tab-btn ${tabType === "memory" ? "active" : ""}`}
            onClick={() => setTabType("memory")}
          >
            <Brain size={15} />
            Add Story / Memory
          </button>
          <button
            className={`nav-tab-btn ${tabType === "project" ? "active" : ""}`}
            onClick={() => setTabType("project")}
          >
            <FolderGit2 size={15} />
            Add Project / Repo
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {tabType === "memory" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Personal">Personal Story & Background</option>
                    <option value="Career & Work">Career & Work Experience</option>
                    <option value="Passions">Passions & Hobbies</option>
                    <option value="Gaming">Gaming & Interests</option>
                    <option value="Philosophy">Coding Philosophy</option>
                    <option value="FAQ">FAQ / Common Question</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Memory Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Favorite Coding Setup or College Capstone"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Story / Details</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    placeholder="Describe what happened, what you learned, or how you think about this topic..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="form-group">
                  <label className="form-label">Project Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. AI Audio Visualizer"
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label className="form-label">Repository Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. audio-visualizer"
                      value={repoName}
                      onChange={(e) => setRepoName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Language / Framework</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. React / Web Audio"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Project Description</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="What does this project do and why did you build it?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Key Highlights / Features</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Real-time FFT analysis, 60fps canvas shaders"
                    value={highlights}
                    onChange={(e) => setHighlights(e.target.value)}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label className="form-label">Live Demo URL (Optional)</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://..."
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">GitHub URL (Optional)</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://github.com/..."
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="perspective-toggle" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} />
              Save to Agent Memory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
