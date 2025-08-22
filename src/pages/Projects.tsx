import { useEffect, useState } from "react";
import {
  fetchStarredReposHybrid,
  mapRepoForCard,
  type StarredRepo,
} from "../lib/github";

const GITHUB_USERNAME = "MasterYoav";

export default function Projects() {
  const [repos, setRepos] = useState<StarredRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchStarredReposHybrid(GITHUB_USERNAME);
        if (mounted) {
          setRepos(data);
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Projects: load failed", err);
        if (mounted) {
          setError(String(err?.message ?? err));
          setLoading(false);
        }
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="py-10 text-center text-gray-500">Loading projects…</div>;
  if (error)   return <pre className="py-10 text-center text-red-600 whitespace-pre-wrap">{error}</pre>;
  if (!repos.length) return <div className="py-10 text-center text-gray-500">No starred projects found.</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {repos.map(mapRepoForCard).map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-xl border p-4 hover:shadow-md transition bg-white dark:bg-gray-900"
        >
          <div className="flex items-center gap-3">
            <img
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              className="h-8 w-8 rounded-full"
              loading="lazy"
            />
            <div className="font-semibold">{repo.full_name}</div>
          </div>

          {repo.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {repo.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-700 dark:text-gray-300">
            {repo.language && (
              <span className="rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5">
                {repo.language}
              </span>
            )}
            <span className="rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5">★ {repo.stars}</span>
            <span className="rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5">⑂ {repo.forks}</span>
          </div>

          {!!repo.topics?.length && (
            <div className="mt-3 flex flex-wrap gap-2">
              {repo.topics.slice(0, 6).map((t) => (
                <span key={t} className="rounded-full bg-gray-50 dark:bg-gray-800 px-2 py-0.5 text-xs">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </a>
      ))}
    </div>
  );
}