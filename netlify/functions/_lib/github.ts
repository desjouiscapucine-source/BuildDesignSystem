// Reads and writes backlog/backlog.json on `develop`, through the GitHub Contents API — the same branch and the
// same change rules as the local dev server (vite.config.ts, backlogApi / B092): only status, stage, priority and
// release can change, one item at a time, so a request never overwrites an item changed by someone else meanwhile.
const OWNER = "desjouiscapucine-source";
const REPO = "BuildDesignSystem";
const BRANCH = "develop";
const PATH = "backlog/backlog.json";
const BACKLOG_FIELDS = ["status", "stage", "priority", "release"];

interface BacklogItem {
  id: string;
  [key: string]: unknown;
}

interface BacklogData {
  items: BacklogItem[];
  [key: string]: unknown;
}

function githubToken(): string {
  const value = process.env.GITHUB_TOKEN;
  if (!value) throw new Error("GITHUB_TOKEN is not set");
  return value;
}

async function githubRequest(path: string, init?: { method?: string; body?: string }): Promise<any> {
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`, {
    method: init?.method,
    body: init?.body,
    headers: {
      Authorization: `Bearer ${githubToken()}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
  return response.json();
}

/** Current backlog.json on `develop`, with the sha needed to write back to it. */
export async function readBacklog(): Promise<{ sha: string; data: BacklogData }> {
  const file = await githubRequest(`/contents/${PATH}?ref=${BRANCH}`);
  const text = Buffer.from(file.content, "base64").toString("utf8");
  return { sha: file.sha, data: JSON.parse(text) };
}

/**
 * Applies one change to one backlog item and commits it to `develop`.
 * Retries once (fresh read) if `develop` moved meanwhile; returns an error message instead of throwing.
 */
export async function writeBacklogChange(
  id: string,
  change: Record<string, unknown>,
): Promise<{ items: BacklogItem[]; error: string | null }> {
  let lastItems: BacklogItem[] = [];
  for (let attempt = 0; attempt < 2; attempt++) {
    const { sha, data } = await readBacklog();
    lastItems = data.items;
    const item = data.items.find((entry) => entry.id === id);
    if (!item) return { items: data.items, error: `${id} is not in develop` };

    for (const [key, value] of Object.entries(change)) {
      if (!BACKLOG_FIELDS.includes(key)) continue;
      if (value === null || value === "") delete item[key];
      else item[key] = value;
    }

    const summary = Object.entries(change)
      .filter(([key]) => BACKLOG_FIELDS.includes(key))
      .map(([key, value]) => `${key} ${value ?? "none"}`)
      .join(", ");
    const content = Buffer.from(JSON.stringify(data, null, 2) + "\n", "utf8").toString("base64");

    try {
      await githubRequest(`/contents/${PATH}`, {
        method: "PUT",
        body: JSON.stringify({
          message: `Backlog: ${id} ${summary} (Design System Lead, live site)`,
          content,
          sha,
          branch: BRANCH,
        }),
      });
      return { items: data.items, error: null };
    } catch (error) {
      if (attempt === 0) continue; // develop moved meanwhile: read it again and retry once.
      return { items: data.items, error: String(error) };
    }
  }
  return { items: lastItems, error: "develop kept moving; try again" };
}
