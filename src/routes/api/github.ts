import { createFileRoute } from "@tanstack/react-router";

const GITHUB_USER = "AbdullWasay";

type GhUser = {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  login: string;
};

type GhRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string | null;
  updated_at: string;
};

export type GithubSnapshot = {
  login: string;
  name: string;
  profileUrl: string;
  avatarUrl: string;
  repos: number;
  followers: number;
  following: number;
  stars: number;
  languages: { name: string; pct: number }[];
  recent: { name: string; desc: string; stars: number; lang: string; url: string }[];
};

async function fetchGithub(): Promise<GithubSnapshot> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "abdulwasay-portfolio",
  };
  const token = process.env["GITHUB_TOKEN"]?.trim();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, { headers }),
  ]);

  if (!userRes.ok) {
    throw new Error(`GitHub user ${userRes.status}`);
  }
  if (!reposRes.ok) {
    throw new Error(`GitHub repos ${reposRes.status}`);
  }

  const user = (await userRes.json()) as GhUser;
  const repos = (await reposRes.json()) as GhRepo[];

  const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

  const langCounts: Record<string, number> = {};
  for (const repo of repos) {
    if (!repo.language) continue;
    langCounts[repo.language] = (langCounts[repo.language] ?? 0) + 1;
  }
  const langTotal = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      pct: Math.round((count / langTotal) * 100),
    }));

  const recent = [...repos]
    .filter((repo) => !repo.fork)
    .sort((a, b) => (b.pushed_at || b.updated_at).localeCompare(a.pushed_at || a.updated_at))
    .slice(0, 6)
    .map((repo) => ({
      name: repo.name,
      desc: repo.description?.trim() || "Public repository on GitHub",
      stars: repo.stargazers_count,
      lang: repo.language || "Other",
      url: repo.html_url,
    }));

  return {
    login: user.login,
    name: user.name || user.login,
    profileUrl: user.html_url,
    avatarUrl: user.avatar_url,
    repos: user.public_repos,
    followers: user.followers,
    following: user.following,
    stars,
    languages,
    recent,
  };
}

export const Route = createFileRoute("/api/github")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const data = await fetchGithub();
          return Response.json(data, {
            headers: {
              "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
            },
          });
        } catch (error) {
          console.error("[github]", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Failed to load GitHub" },
            { status: 502 },
          );
        }
      },
    },
  },
});
