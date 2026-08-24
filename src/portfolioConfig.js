// Central config — edit this file to update your portfolio info
export const PORTFOLIO_CONFIG = {
  name: "Ron Vergel Luzon",
  handle: "RonVergel",
  preferredName: "Ron",
  tagline: "Full-Stack Developer & Creative Web Creator",
  bio: "Hey! I'm Ron — a passionate developer who loves building creative web apps, mobile solutions, interactive audio-visual tools, game systems, and desktop productivity software. I specialize in full-stack JavaScript, React, React Native, and Web Audio, with a knack for making things feel snappy and intuitive.",
  email: "ronvergel999@gmail.com",
  location: "Philippines 🇵🇭",
  githubUrl: "https://github.com/RonVergel",
  githubUsername: "RonVergel",          // ← GitHub API uses this
  avatarUrl: "https://avatars.githubusercontent.com/u/183253571?v=4",
  spotifyPlaylistUrl: "https://open.spotify.com/embed/playlist/1dqCUBrb8BQpdtdxpTwlVc?utm_source=generator&theme=0",

  // Skills displayed in the Skills section
  skills: [
    { category: "Languages",          items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "C#", "Python", "SQL"] },
    { category: "Frameworks & Mobile", items: ["React", "React Native", "Expo", "Vite", "Node.js", "Express", "Electron"] },
    { category: "Cloud, DB & Maps",   items: ["Supabase", "REST APIs", "Mapbox GL", "Web Audio API", "Canvas API", "Git", "GitHub"] },
    { category: "Deployment & Tools", items: ["GitHub Pages", "Render", "Tailwind / NativeWind", "VS Code", "Jupyter Notebooks"] },
  ],

  // Pinned projects shown even when GitHub API is loading/offline
  pinnedRepos: [
    "capstone_1",
    "MusicCompostionWebApp",
    "genshindraftpvp",
    "mini-workspace-electron",
    "interns-pokedex",
    "IT15RealEstate",
    "caesarmontano",
    "IT13Design2",
    "generalProjects",
  ],

  // Extra metadata merged with GitHub API
  projectMeta: {
    capstone_1: {
      displayName: "Pabukid — Thesis Capstone Mobile App",
      emoji: "🎓",
      badge: "Thesis Capstone",
      description: "College thesis capstone project — a mobile and web application built with React Native, Expo, Mapbox GL geolocation, Supabase backend, and NativeWind styling.",
      highlights: "React Native, Expo, Mapbox GL mapping & navigation, Supabase backend/auth, NativeWind.",
      language: "React Native / JavaScript",
    },
    MusicCompostionWebApp: {
      displayName: "Music Composition Web App",
      emoji: "🎵",
      demoUrl: "https://ronvergel.github.io/MusicCompostionWebApp/",
      highlights: "Custom Web Audio API synth engine, live sequencer grid, real-time audio playback.",
    },
    genshindraftpvp: {
      displayName: "Genshin Draft PvP",
      emoji: "⚔️",
      highlights: "Ban/pick phase logic, character stat system, competitive tournament draft board.",
    },
    "mini-workspace-electron": {
      displayName: "Mini Workspace & Multitasker",
      emoji: "🖥️",
      highlights: "Cross-platform Electron desktop app, multi-window layout, offline-first notes & timer.",
    },
    "interns-pokedex": {
      displayName: "Interns Pokédex",
      emoji: "🔴",
      highlights: "Dynamic PokeAPI consumption, type filters, stat visualizations, animated sprites.",
    },
    IT15RealEstate: {
      displayName: "IT15 Real Estate Platform",
      emoji: "🏡",
      demoUrl: "https://it15realestate.onrender.com/",
      highlights: "Property listings, booking backend, deployed on Render.",
    },
    caesarmontano: {
      displayName: "Caesar Montano Cipher",
      emoji: "🔐",
      highlights: "Custom Caesar substitution cipher engine, real-time encode/decode, interactive UI.",
    },
    IT13Design2: {
      displayName: "IT13 Desktop Design",
      emoji: "🖱️",
      highlights: "C# desktop app, OOP architecture, event-driven Windows Forms.",
    },
    generalProjects: {
      displayName: "Python & Jupyter Data Explorations",
      emoji: "🐍",
      highlights: "Jupyter notebooks, data analysis scripts, algorithmic problem-solving prototypes.",
    },
  },
};
