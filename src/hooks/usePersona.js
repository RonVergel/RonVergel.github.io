import { useState, useEffect } from "react";
import { initialPersona } from "../services/defaultPersona";

const STORAGE_KEY = "ron_ai_persona_v2";
const SETTINGS_KEY = "ron_ai_settings_v2";

const defaultSettings = {
  provider: "offline", // "offline" | "gemini" | "openai"
  geminiApiKey: "",
  geminiModel: "gemini-1.5-flash",
  openaiApiKey: "",
  openaiModel: "gpt-4o-mini",
  openaiBaseUrl: "",
  voiceEnabled: true,
  autoScroll: true
};

export function usePersona() {
  const [persona, setPersona] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load persona from storage", e);
    }
    return initialPersona;
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load settings from storage", e);
    }
    return defaultSettings;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persona));
    } catch (e) {
      console.error("Failed to save persona to storage", e);
    }
  }, [persona]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save settings to storage", e);
    }
  }, [settings]);

  // Actions
  const updateIdentity = (fields) => {
    setPersona(prev => ({
      ...prev,
      identity: { ...prev.identity, ...fields }
    }));
  };

  const togglePerspective = () => {
    setPersona(prev => ({
      ...prev,
      identity: {
        ...prev.identity,
        perspective: prev.identity.perspective === "first_person" ? "representative" : "first_person"
      }
    }));
  };

  const updateTone = (fields) => {
    setPersona(prev => ({
      ...prev,
      toneSettings: { ...prev.toneSettings, ...fields }
    }));
  };

  const addMemory = (newMemory) => {
    const memoryItem = {
      id: "mem-" + Date.now(),
      enabled: true,
      ...newMemory
    };
    setPersona(prev => ({
      ...prev,
      memories: [memoryItem, ...prev.memories]
    }));
  };

  const updateMemory = (id, fields) => {
    setPersona(prev => ({
      ...prev,
      memories: prev.memories.map(m => m.id === id ? { ...m, ...fields } : m)
    }));
  };

  const toggleMemory = (id) => {
    setPersona(prev => ({
      ...prev,
      memories: prev.memories.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m)
    }));
  };

  const deleteMemory = (id) => {
    setPersona(prev => ({
      ...prev,
      memories: prev.memories.filter(m => m.id !== id)
    }));
  };

  const addProject = (project) => {
    const newProj = {
      id: "proj-" + Date.now(),
      ...project
    };
    setPersona(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
  };

  const deleteProject = (id) => {
    setPersona(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const resetToGitHubDefaults = () => {
    setPersona(initialPersona);
  };

  const updateSettings = (fields) => {
    setSettings(prev => ({ ...prev, ...fields }));
  };

  return {
    persona,
    setPersona,
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
  };
}
