import { useState, useEffect } from "react";
import { PORTFOLIO_CONFIG } from "../portfolioConfig";

const GITHUB_API = `https://api.github.com/users/${PORTFOLIO_CONFIG.githubUsername}/repos?sort=pushed&per_page=100`;

/**
 * Fetches all public repos from GitHub API.
 * Merges extra metadata from PORTFOLIO_CONFIG.projectMeta.
 * Returns { repos, loading, error }
 */
export function useGithubRepos() {
  const [repos, setRepos] = useState([]);
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

        // Attach extra metadata from config
        const enriched = data
          .filter((r) => !r.fork && !r.private) // only original public repos
          .map((r) => ({
            id: r.id,
            name: r.name,
            fullName: r.full_name,
            description: r.description || "No description provided.",
            url: r.html_url,
            homepage: r.homepage || null,
            language: r.language || "—",
            stars: r.stargazers_count,
            forks: r.forks_count,
            updatedAt: r.pushed_at,
            topics: r.topics || [],
            // merge extra metadata if available
            ...(PORTFOLIO_CONFIG.projectMeta[r.name] || {}),
          }))
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        setRepos(enriched);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRepos();
    return () => { cancelled = true; };
  }, []);

  return { repos, loading, error };
}
