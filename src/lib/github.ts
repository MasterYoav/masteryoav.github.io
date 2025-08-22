// src/lib/github.ts

export type StarredRepo = {
    id: number;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics?: string[];
    owner: { login: string; avatar_url: string; html_url: string };
  };
  
  // Build a simple *relative* path that works on GitHub Pages too.
  // Vite will prefix it with BASE_URL during build, and in dev it resolves to "/starred.json".
  function staticStarredPath(): string {
    return `${import.meta.env.BASE_URL ?? "/"}starred.json`;
  }
  
  // --- STATIC (prod) loader ---
  export async function fetchStarredReposStatic(): Promise<StarredRepo[]> {
    const path = staticStarredPath(); // e.g. "/starred.json" (user site) or "/REPO/starred.json" (project)
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`STATIC_NOT_AVAILABLE:${res.status}:${path}`);
    return (await res.json()) as StarredRepo[];
  }
  
  // --- LIVE (dev fallback) loader ---
  export async function fetchStarredReposLive(username: string): Promise<StarredRepo[]> {
    const api = `https://api.github.com/users/${encodeURIComponent(
      username
    )}/starred?per_page=100&sort=created&direction=desc`;
  
    const res = await fetch(api, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`GitHub API ${res.status}${text ? `: ${text}` : ""}`);
    }
    return (await res.json()) as StarredRepo[];
  }
  
  // Hybrid: in production prefer static file; in dev prefer live API.
  export async function fetchStarredReposHybrid(username: string): Promise<StarredRepo[]> {
    if (import.meta.env.DEV) {
      // dev first: hit live API (no starred.json in dev)
      try {
        return await fetchStarredReposLive(username);
      } catch {
        // optional: last resort, try static if someone created it locally
        return await fetchStarredReposStatic();
      }
    } else {
      // prod first: static file produced by CI
      try {
        return await fetchStarredReposStatic();
      } catch {
        // fallback to live if static missing (shouldn't happen on Pages)
        return await fetchStarredReposLive(username);
      }
    }
  }
  
  export function mapRepoForCard(r: StarredRepo) {
    return {
      id: r.id,
      full_name: r.full_name,
      html_url: r.html_url,
      description: r.description,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
      topics: r.topics ?? [],
      owner: {
        login: r.owner.login,
        avatar_url: r.owner.avatar_url,
        html_url: r.owner.html_url,
      },
    };
  }