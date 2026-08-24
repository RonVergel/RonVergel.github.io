import { useState, useEffect } from "react";
import { PORTFOLIO_CONFIG } from "../portfolioConfig";

const GITHUB_API = `https://api.github.com/users/${PORTFOLIO_CONFIG.githubUsername}/repos?sort=pushed&per_page=100`;

// Complete fallback list in case of network offline or GitHub API rate limiting
const FALLBACK_REPOS = PORTFOLIO_CONFIG.pinnedRepos.map((repoKey) => {
  const meta = PORTFOLIO_CONFIG.projectMeta[repoKey] || {};
  return {
    id: repoKey,
    name: repoKey,
    displayName: meta.displayName || repoKey,
    description: meta.description || "Interactive software project.",
    howItWorks: meta.howItWorks || null,
    url: `https://github.com/RonVergel/${repoKey}`,
    homepage: meta.demoUrl || null,
    language: meta.language || "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    emoji: meta.emoji || "🚀",
    badge: meta.badge || null,
    highlights: meta.highlights || null,
    topics: meta.topics || []
  };
});

// Names of empty / test shell repos that should not be displayed
const IGNORED_REPOS = new Set(["multitasker", "ronvergelprojbooking", "caesarmontano-main", "realestatecrm1", "ronvergel1"]);

export function useGithubRepos() {
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      try {
        const res = await fetch(GITHUB_API);
        if (!res.ok) throw new Error(`GitHub API status ${res.status}`);
        const data = await res.json();

        if (cancelled) return;

        // Filter out private and empty placeholder repos
        const enriched = data
          .filter((r) => !r.private && !IGNORED_REPOS.has(r.name) && (r.size > 0 || PORTFOLIO_CONFIG.projectMeta[r.name]))
          .map((r) => {
            const meta = PORTFOLIO_CONFIG.projectMeta[r.name] || {};
            return {
              id: r.id,
              name: r.name,
              fullName: r.full_name,
              displayName: meta.displayName || r.name,
              description: meta.description || r.description || "Interactive software project created by Ron Vergel.",
              howItWorks: meta.howItWorks || null,
              url: r.html_url,
              homepage: r.homepage || meta.demoUrl || null,
              language: meta.language || r.language || "Code",
              stars: r.stargazers_count,
              forks: r.forks_count,
              updatedAt: r.pushed_at,
              topics: r.topics && r.topics.length > 0 ? r.topics : (meta.topics || []),
              ...meta
            };
          })
          .sort((a, b) => {
            // Priority ordering for showcase items
            const orderA = PORTFOLIO_CONFIG.pinnedRepos.indexOf(a.name);
            const orderB = PORTFOLIO_CONFIG.pinnedRepos.indexOf(b.name);
            if (orderA !== -1 && orderB !== -1) return orderA - orderB;
            if (orderA !== -1) return -1;
            if (orderB !== -1) return 1;
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });

        setRepos(enriched);
      } catch (err) {
        console.warn("GitHub API notice (falling back to cached repository data):", err.message);
        if (!cancelled) {
          setError(err.message);
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
