// Central config — edit this file to update your portfolio info
export const PORTFOLIO_CONFIG = {
  name: "Ron Vergel Luzon",
  handle: "RonVergel",
  preferredName: "Ron",
  tagline: "Full-Stack Developer & Creative Web Creator",
  bio: "Hey! I'm Ron — a passionate developer who loves building creative web apps, interactive audio-visual tools, game systems, and desktop productivity software. I specialize in full-stack JavaScript, React, and Web Audio, with a knack for making things feel alive and snappy.",
  email: "ronvergel999@gmail.com",
  location: "Philippines 🇵🇭",
  githubUrl: "https://github.com/RonVergel",
  githubUsername: "RonVergel",          // ← GitHub API uses this
  avatarUrl: "https://avatars.githubusercontent.com/u/183253571?v=4",
  spotifyPlaylistUrl: "https://open.spotify.com/embed/playlist/1dqCUBrb8BQpdtdxpTwlVc?utm_source=generator&theme=0",

  // Skills displayed in the Skills section
  skills: [
    { category: "Languages",        items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "C#", "Python", "SQL"] },
    { category: "Frameworks & Libs",items: ["React", "Vite", "Node.js", "Express", "Electron"] },
    { category: "APIs & Tools",     items: ["Web Audio API", "Canvas API", "REST APIs", "Git", "GitHub", "VS Code"] },
    { category: "Deployment",       items: ["GitHub Pages", "Render", "Vite", "Jupyter Notebooks"] },
  ],

  // Pinned projects shown even when GitHub API is loading/offline
  // These are merged/overridden by the live GitHub repos
  pinnedRepos: [
    "MusicCompostionWebApp",
    "genshindraftpvp",
    "mini-workspace-electron",
    "interns-pokedex",
    "IT15RealEstate",
    "caesarmontano",
    "IT13Design2",
    "generalProjects",
  ],

  // Extra metadata not available via GitHub API
  projectMeta: {
    MusicCompostionWebApp: {
      emoji: "🎵",
      demoUrl: "https://ronvergel.github.io/MusicCompostionWebApp/",
      highlights: "Custom Web Audio API synth engine, live sequencer grid, real-time playback.",
    },
    genshindraftpvp: {
      emoji: "⚔️",
      highlights: "Ban/pick phase logic, character stat system, competitive draft board.",
    },
    "mini-workspace-electron": {
      emoji: "🖥️",
      highlights: "Cross-platform Electron app, multi-window layout, offline-first notes & timer.",
    },
    "interns-pokedex": {
      emoji: "🔴",
      highlights: "PokeAPI integration, type filters, stat visualizations, animated sprites.",
    },
    IT15RealEstate: {
      emoji: "🏡",
      demoUrl: "https://it15realestate.onrender.com/",
      highlights: "Property listings, booking backend, deployed on Render.",
    },
    caesarmontano: {
      emoji: "🔐",
      highlights: "Custom Caesar cipher engine, real-time encode/decode, witty UI.",
    },
    IT13Design2: {
      emoji: "🖱️",
      highlights: "C# desktop app, OOP architecture, event-driven Windows Forms.",
    },
    generalProjects: {
      emoji: "🐍",
      highlights: "Jupyter notebooks, data analysis scripts, algorithm prototypes.",
    },
  },
};
