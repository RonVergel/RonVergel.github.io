import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { ChatPlayground } from "./components/ChatPlayground";
import { KnowledgeBase } from "./components/KnowledgeBase";
import { InterviewWizard } from "./components/InterviewWizard";
import { PersonaTuner } from "./components/PersonaTuner";
import { PromptInspector } from "./components/PromptInspector";
import { SettingsModal } from "./components/SettingsModal";
import { ExportModal } from "./components/ExportModal";
import { AddMemoryModal } from "./components/AddMemoryModal";
import { SpotifyPlayer } from "./components/SpotifyPlayer";
import { usePersona } from "./hooks/usePersona";

export function App() {
  const [activeTab, setActiveTab] = useState("chat"); // "chat" | "knowledge" | "interview" | "tuner" | "inspector"
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false);

  const {
    persona,
    settings,
    updateSettings,
    updateIdentity,
    togglePerspective,
    updateTone,
    addMemory,
    updateMemory,
    toggleMemory,
    deleteMemory,
    addProject,
    deleteProject,
    resetToGitHubDefaults
  } = usePersona();

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        persona={persona}
        togglePerspective={togglePerspective}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onResetDefaults={resetToGitHubDefaults}
        onToggleSpotify={() => setIsSpotifyOpen(prev => !prev)}
        isSpotifyOpen={isSpotifyOpen}
      />

      {/* Main View Area */}
      <main className="main-stage">
        {activeTab === "chat" && (
          <ChatPlayground persona={persona} settings={settings} />
        )}

        {activeTab === "knowledge" && (
          <KnowledgeBase
            persona={persona}
            onToggleMemory={toggleMemory}
            onDeleteMemory={deleteMemory}
            onDeleteProject={deleteProject}
            onOpenAddMemory={() => setIsAddMemoryOpen(true)}
          />
        )}

        {activeTab === "interview" && (
          <InterviewWizard
            persona={persona}
            onUpdateIdentity={updateIdentity}
            onAddMemory={addMemory}
            onFinish={() => setActiveTab("chat")}
          />
        )}

        {activeTab === "tuner" && (
          <PersonaTuner persona={persona} onUpdateTone={updateTone} />
        )}

        {activeTab === "inspector" && (
          <PromptInspector persona={persona} />
        )}
      </main>

      {/* Floating Spotify Player */}
      <SpotifyPlayer
        isOpen={isSpotifyOpen}
        onToggle={() => setIsSpotifyOpen(prev => !prev)}
      />

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetDefaults={resetToGitHubDefaults}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        persona={persona}
      />

      <AddMemoryModal
        isOpen={isAddMemoryOpen}
        onClose={() => setIsAddMemoryOpen(false)}
        onAddMemory={addMemory}
        onAddProject={addProject}
      />
    </div>
  );
}

export default App;
