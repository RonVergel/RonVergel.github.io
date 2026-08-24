import { useState, useEffect } from "react";
import { PORTFOLIO_CONFIG } from "../portfolioConfig";

const GITHUB_API = `https://api.github.com/users/${PORTFOLIO_CONFIG.githubUsername}/repos?sort=pushed&per_page=100`;

// Offline / fallback projects in case of rate limit
const FALLBACK_REPOS = [
  {
    id: "capstone_1",
    name: "capstone_1",
    displayName: "Pabukid — Thesis Capstone Mobile App",
    description: "College thesis capstone project — a mobile and web application built with React Native, Expo, Mapbox GL geolocation, Supabase backend, and NativeWind styling.",
    url: "https://github.com/RonVergel/capstone_1",
    homepage: null,
    language: "React Native / JavaScript",
    stars: 0,
    forks: 1,
    updatedAt: "2026-05-10T14:19:50Z",
    emoji: "🎓",
    badge: "Thesis Capstone",
    highlights: "React Native, Expo, Mapbox GL mapping & navigation, Supabase backend/auth, NativeWind.",
    topics: ["react-native", "expo", "supabase", "mapbox", "thesis", "capstone"]
  },
  {
    id: "MusicCompostionWebApp",
    name: "MusicCompostionWebApp",
    displayName: "Music Composition Web App",
    description: "An interactive browser-based music composition and sequencing platform allowing users to craft musical loops, arrange patterns, and experiment with synthesizer waveforms in real-time.",
    url: "https://github.com/RonVergel/MusicCompostionWebApp",
    homepage: "https://ronvergel.github.io/MusicCompostionWebApp/",
    language: "JavaScript / Web Audio",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    emoji: "🎵",
    demoUrl: "https://ronvergel.github.io/MusicCompostionWebApp/",
    highlights: "Custom Web Audio API synth engine, live sequencer grid, real-time audio playback.",
    topics: ["web-audio", "synthesizer", "javascript", "audio-sequencer"]
  },
  {
    id: "genshindraftpvp",
    name: "genshindraftpvp",
    displayName: "Genshin Draft PvP",
    description: "A competitive draft and tactical PvP simulation tool tailored for Genshin Impact enthusiasts. Players draft character teams, ban counters, and test strategic setups.",
    url: "https://github.com/RonVergel/genshindraftpvp",
    homepage: null,
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    emoji: "⚔️",
    highlights: "Ban/pick phase logic, character stat system, competitive tournament draft board.",
    topics: ["genshin-impact", "drafting", "pvp-simulation", "gaming"]
  },
  {
    id: "mini-workspace-electron",
    name: "mini-workspace-electron",
    displayName: "Mini Workspace & Multitasker",
    description: "A streamlined desktop productivity suite built with Electron that helps developers and creators organize workflows, manage tasks, and keep notes side-by-side without context switching.",
    url: "https://github.com/RonVergel/mini-workspace-electron",
    homepage: null,
    language: "Electron / JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    emoji: "🖥️",
    highlights: "Cross-platform Electron desktop app, multi-window layout, offline-first notes & timer.",
    topics: ["electron", "desktop-app", "productivity"]
  },
  {
    id: "interns-pokedex",
    name: "interns-pokedex",
    displayName: "Interns Pokédex",
    description: "A clean, responsive Pokédex web application featuring full Pokémon search, type filters, stat visualizations, and evolution chain exploration.",
    url: "https://github.com/RonVergel/interns-pokedex",
    homepage: null,
    language: "JavaScript / REST API",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    emoji: "🔴",
    highlights: "Dynamic PokeAPI consumption, type filters, stat visualizations, animated sprites.",
    topics: ["pokeapi", "javascript", "rest-api"]
  },
  {
    id: "IT15RealEstate",
    name: "IT15RealEstate",
    displayName: "IT15 Real Estate Platform",
    description: "A full-featured property management and real estate discovery web platform deployed on Render, allowing users to browse listings, filter by amenities, and schedule viewing appointments.",
    url: "https://github.com/RonVergel/IT15RealEstate",
    homepage: "https://it15realestate.onrender.com/",
    language: "HTML / JavaScript / CSS",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    emoji: "🏡",
    demoUrl: "https://it15realestate.onrender.com/",
    highlights: "Property listings, booking backend, deployed on Render.",
    topics: ["real-estate", "render", "full-stack"]
  },
  {
    id: "caesarmontano",
    name: "caesarmontano",
    displayName: "Caesar Montano Cipher",
    description: "A playful cryptography application implementing classical substitution ciphers with customizable shift keys and real-time decode analyzers.",
    url: "https://github.com/RonVergel/caesarmontano",
    homepage: null,
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    emoji: "🔐",
    highlights: "Custom Caesar substitution cipher engine, real-time encode/decode, interactive UI.",
    topics: ["cryptography", "cipher", "javascript"]
  },
  {
    id: "IT13Design2",
    name: "IT13Design2",
    displayName: "IT13 Desktop Design",
    description: "Object-oriented desktop application exploring modern GUI paradigms, event-driven programming, and clean data modeling in C#.",
    url: "https://github.com/RonVergel/IT13Design2",
    homepage: null,
    language: "C#",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    emoji: "🖱️",
    highlights: "C# desktop app, OOP architecture, event-driven Windows Forms.",
    topics: ["csharp", "dotnet", "desktop-gui"]
  },
  {
    id: "generalProjects",
    name: "generalProjects",
    displayName: "Python & Jupyter Data Explorations",
    description: "A collection of data analytics experiments, algorithm prototypes, and scripting utilities created in Jupyter Notebooks.",
    url: "https://github.com/RonVergel/generalProjects",
    homepage: null,
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    emoji: "🐍",
    highlights: "Jupyter notebooks, data analysis scripts, algorithmic problem-solving prototypes.",
    topics: ["python", "jupyter", "data-analysis"]
  }
];

export function useGithubRepos() {
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      try {
        const res = await fetch(GITHUB_API);
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        const data = await res.json();

        if (cancelled) return;

        // Allow public repos (both original and contributed/forked like capstone_1)
        const enriched = data
          .filter((r) => !r.private)
          .map((r) => {
            const meta = PORTFOLIO_CONFIG.projectMeta[r.name] || {};
            return {
              id: r.id,
              name: r.name,
              fullName: r.full_name,
              displayName: meta.displayName || r.name,
              description: meta.description || r.description || "No description provided.",
              url: r.html_url,
              homepage: r.homepage || meta.demoUrl || null,
              language: meta.language || r.language || "—",
              stars: r.stargazers_count,
              forks: r.forks_count,
              updatedAt: r.pushed_at,
              topics: r.topics && r.topics.length > 0 ? r.topics : (meta.topics || []),
              ...meta
            };
          })
          .sort((a, b) => {
            // Put thesis capstone or pinned at top priority
            if (a.name === "capstone_1") return -1;
            if (b.name === "capstone_1") return 1;
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });

        setRepos(enriched);
      } catch (err) {
        console.warn("GitHub API fetch notice (using fallback list):", err.message);
        if (!cancelled) {
          setError(err.message);
          // Keep FALLBACK_REPOS populated
          setRepos(FALLBACK_REPOS);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRepos();
    return () => { cancelled = true; };
  }, []);

  return { repos, loading, error };
}
