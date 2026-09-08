// Central config — edit this file to update your portfolio info
export const PORTFOLIO_CONFIG = {
  name: "Ron Vergel Luzon",
  handle: "RonVergel",
  preferredName: "Ron",
  tagline: "Full-Stack Developer & Creative Web Creator",
  bio: "Hey! I'm Ron — a passionate developer who loves building creative web apps, mobile solutions, interactive audio-visual tools, game systems, and desktop productivity software. I specialize in full-stack JavaScript, React, React Native, and Web Audio, with a knack for making things feel snappy, intuitive, and alive.",
  email: "ronvergel999@gmail.com",
  location: "Philippines 🇵🇭",
  githubUrl: "https://github.com/RonVergel",
  githubUsername: "RonVergel",          // ← GitHub API uses this
  avatarUrl: "https://avatars.githubusercontent.com/u/183253571?v=4",
  spotifyPlaylistUrl: "https://open.spotify.com/embed/playlist/1dqCUBrb8BQpdtdxpTwlVc?utm_source=generator&theme=0",

  // Skills displayed in the Skills section
  skills: [
    { category: "Languages",          items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "C#", "Python", "SQL"] },
    { category: "Frameworks & Mobile", items: ["React", "React Native", "Expo", "Vite", "Node.js", "Express", "Electron", "Streamlit"] },
    { category: "Cloud, DB & APIs",   items: ["Supabase", "SQLite", "PostgreSQL", "REST APIs", "Mapbox GL", "Web Audio API", "Git", "GitHub"] },
    { category: "Deployment & Tools", items: ["GitHub Pages", "Render", "Tailwind / NativeWind", "VS Code", "Jupyter Notebooks"] },
  ],

  // Pinned projects shown in order
  pinnedRepos: [
    "capstone_1",
    "spotify-trending-tracker",
    "MusicCompostionWebApp",
    "genshindraftpvp",
    "mini-workspace-electron",
    "interns-pokedex",
    "IT15RealEstate",
    "caesarmontano",
    "IT13Design2",
    "generalProjects",
  ],

  // Comprehensive metadata & clear explanations of what each project is and how it works
  projectMeta: {
    capstone_1: {
      displayName: "Pabukid — Eco-Tourism Mobile & Web Platform",
      emoji: "🎓",
      badge: "Thesis Capstone (Co-Author)",
      description: "An undergraduate thesis capstone project creating a digital eco-tourism and agricultural booking platform for local outdoor destinations. It connects travelers with eco-farm trails and rural homestay bookings.",
      howItWorks: "Built with React Native and Expo for cross-platform mobile delivery with NativeWind styling. Integrates Mapbox GL for interactive geolocation, trail route plotting, and map discovery. Powered by a Supabase PostgreSQL backend for secure user authentication, database queries, and photo asset storage.",
      highlights: "React Native, Expo, Mapbox GL geolocation, Supabase backend/auth, NativeWind.",
      language: "React Native / JavaScript",
    },

    "spotify-trending-tracker": {
      displayName: "Spotify Trending & Music Analytics Pipeline",
      emoji: "📊",
      badge: "Automated Data Pipeline",
      description: "An automated data engineering and analytics pipeline that tracks daily top Spotify chart rankings, discovers viral tracks, and visualizes streaming momentum over time.",
      howItWorks: "Uses Python with a scheduled background collector to fetch daily playlist rankings and track metadata. Persists historical stream records in a structured SQLite database, runs velocity & rank progression analytics, and presents metrics on an interactive Streamlit analytics dashboard with time-series charts.",
      highlights: "Python data pipeline, SQLite schema, Streamlit dashboard, automated chart collector.",
      language: "Python",
    },

    MusicCompostionWebApp: {
      displayName: "Music Composition Web App & Sequencer",
      emoji: "🎵",
      badge: "Web Audio Synthesizer",
      description: "An in-browser digital synthesizer and step-sequencer platform for creating musical loops, drum patterns, and audio experiments in real-time without requiring third-party plugins.",
      howItWorks: "Directly accesses the browser's Web Audio API (AudioContext, OscillatorNodes, and GainNodes) to generate dynamic synthesizer waveforms (sine, square, sawtooth, triangle). Features an interactive grid matrix where users click time steps to schedule note triggers, modify tempo (BPM), transpose octaves, and preview loops with low latency.",
      demoUrl: "https://ronvergel.github.io/MusicCompostionWebApp/",
      highlights: "Custom Web Audio API synth engine, live grid sequencer, tempo controls, real-time waveform generator.",
      language: "JavaScript / Web Audio",
    },

    genshindraftpvp: {
      displayName: "Genshin Draft PvP & Tournament Tool",
      emoji: "⚔️",
      badge: "Competitive Simulator",
      description: "A tactical draft tournament and competitive simulation platform designed for Genshin Impact players, creators, and community tournaments.",
      howItWorks: "Implements a turn-based Ban/Pick phase state machine modeled after professional MOBA esports formats. Tracks character roster pools, enforces team composition rules, validates elemental synergies and counter-picks, and calculates draft advantages to create fair competitive matchups.",
      highlights: "Ban/Pick phase engine, character stats system, elemental counter logic, tournament draft board.",
      language: "JavaScript / HTML5",
    },

    "mini-workspace-electron": {
      displayName: "Mini Workspace & Multitasker",
      emoji: "🖥️",
      badge: "Desktop Productivity",
      description: "A lightweight desktop productivity suite built with Electron that helps programmers and power users organize tasks, scratchpad notes, and timers side-by-side without alt-tabbing.",
      howItWorks: "Engineered on the Electron desktop framework with Node.js and HTML5/CSS. Leverages Electron IPC (Inter-Process Communication) and native window management to provide a multi-pane layout with offline-first local persistence for developer notes, task tracking, and Pomodoro focus intervals.",
      highlights: "Cross-platform Electron desktop app, multi-window layout, offline-first notes & timer.",
      language: "Electron / JavaScript",
    },

    "interns-pokedex": {
      displayName: "Interns Pokédex Explorer",
      emoji: "🔴",
      badge: "API Showcase",
      description: "A clean, responsive Pokédex web application featuring interactive creature discovery, dynamic search indexing, and animated stat visualizations.",
      howItWorks: "Asynchronously queries the public RESTful PokeAPI to pull real-time data on Pokémon species, typings, evolution chains, base stats, and move sets. Employs client-side caching, fluid CSS transitions, and responsive sprite cards for instantaneous search filtering.",
      highlights: "Dynamic PokeAPI consumption, type filters, stat visualizations, animated sprites.",
      language: "JavaScript / REST API",
    },

    IT15RealEstate: {
      displayName: "IT15 Real Estate Platform",
      emoji: "🏡",
      badge: "Full-Stack Web App",
      description: "A full-stack real estate property discovery and viewing appointment booking platform deployed live on Render.",
      howItWorks: "Provides a responsive frontend catalog where users browse property listings, filter by amenities and price ranges, and view detailed floor plans. Connects to a backend booking handler that manages customer viewing requests and scheduling.",
      demoUrl: "https://it15realestate.onrender.com/",
      highlights: "Property listings catalog, search filters, viewing reservation backend, deployed on Render.",
      language: "HTML / JavaScript / CSS",
    },

    caesarmontano: {
      displayName: "Caesar Montano Cryptography Cipher",
      emoji: "🔐",
      badge: "Algorithm & Crypto",
      description: "A web-based cryptography application implementing classical substitution ciphers (Caesar shift) with real-time encoding and decode analysis.",
      howItWorks: "Transforms input strings by shifting character byte values along the Latin alphabet according to a configurable numerical key with modular arithmetic. Features instant bi-directional encryption/decryption, frequency analysis, and brute-force key decoders with live visual feedback.",
      highlights: "Custom Caesar substitution cipher algorithm, real-time encode/decode, interactive UI.",
      language: "JavaScript",
    },

    IT13Design2: {
      displayName: "IT13 Desktop GUI Architecture",
      emoji: "🖱️",
      badge: "Desktop OOP System",
      description: "An object-oriented Windows desktop application created to demonstrate clean GUI paradigms, structured event-driven programming, and data validation in C#.",
      howItWorks: "Developed with Microsoft .NET and Windows Forms/WPF using clean OOP modular architecture. Demonstrates custom data models, form event lifecycle handlers, data grid bindings, input validation routines, and structured data handling.",
      highlights: "C# Windows Form/WPF architecture, data validation, structured object-oriented design.",
      language: "C# / .NET",
    },

    generalProjects: {
      displayName: "Python & Jupyter Data Explorations",
      emoji: "🐍",
      badge: "Data & Algorithms",
      description: "A repository of exploratory data analysis (EDA) notebooks, computational math scripts, and algorithmic problem-solving prototypes in Python.",
      howItWorks: "Utilizes Python libraries including Pandas, NumPy, and Matplotlib within Jupyter Notebooks to clean raw datasets, compute descriptive statistics, and plot visual distributions for computational experiments.",
      highlights: "Jupyter notebooks, data analysis scripts, algorithmic problem-solving prototypes.",
      language: "Python / Jupyter",
    },

    "RonVergel.github.io": {
      displayName: "Ron Vergel Developer Portfolio",
      emoji: "🌐",
      badge: "Live Portfolio",
      description: "This modern personal portfolio featuring live GitHub API auto-sync, embedded Spotify soundtrack player, and a high-tech liquid glass user interface.",
      howItWorks: "Built with React 19 and Vite. Automatically calls the GitHub REST API on page load to fetch all public repositories, merges custom architecture metadata, provides instant search & language filtering, and deploys to GitHub Pages via automated CI/CD.",
      demoUrl: "https://ronvergel.github.io/",
      highlights: "React 19, Vite, GitHub REST API live sync, Spotify embed, Liquid Glass CSS design system.",
      language: "React / JavaScript",
    },

    portfolio: {
      displayName: "Ron Vergel Developer Portfolio",
      emoji: "🌐",
      badge: "Live Portfolio",
      description: "This modern personal portfolio featuring live GitHub API auto-sync, embedded Spotify soundtrack player, and a high-tech liquid glass user interface.",
      howItWorks: "Built with React 19 and Vite. Automatically calls the GitHub REST API on page load to fetch all public repositories, merges custom architecture metadata, provides instant search & language filtering, and deploys to GitHub Pages via automated CI/CD.",
      demoUrl: "https://ronvergel.github.io/",
      highlights: "React 19, Vite, GitHub REST API live sync, Spotify embed, Liquid Glass CSS design system.",
      language: "React / JavaScript",
    },

    myAi: {
      displayName: "Ron Vergel Developer Portfolio",
      emoji: "🌐",
      badge: "Live Portfolio",
      description: "This modern personal portfolio featuring live GitHub API auto-sync, embedded Spotify soundtrack player, and a high-tech liquid glass user interface.",
      howItWorks: "Built with React 19 and Vite. Automatically calls the GitHub REST API on page load to fetch all public repositories, merges custom architecture metadata, provides instant search & language filtering, and deploys to GitHub Pages via automated CI/CD.",
      demoUrl: "https://ronvergel.github.io/",
      highlights: "React 19, Vite, GitHub REST API live sync, Spotify embed, Liquid Glass CSS design system.",
      language: "React / JavaScript",
    },

    documents: {
      displayName: "Pabukid Thesis Academic Paper & Documents",
      emoji: "📄",
      badge: "Research & Documentation",
      description: "Academic manuscript, ACM format research paper, and system documentation for the Pabukid thesis capstone project.",
      howItWorks: "Contains the formal capstone project thesis paper, system requirement specifications, database schemas, and architectural diagrams following ACM publication standards.",
      highlights: "Academic thesis paper, ACM format documentation, software architecture specifications.",
      language: "Documentation / Research",
    }
  },
};
