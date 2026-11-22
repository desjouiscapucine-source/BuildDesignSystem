import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import type { Plugin } from "vite";
import { resolve } from "node:path";
import { homedir } from "node:os";
import { execSync } from "node:child_process";
import { checkouts, workTime } from "./scripts/work-time.ts";

const root = import.meta.dirname;

// Every folder in prototypes/ that has an index.html becomes its own page.
const prototypePages = Object.fromEntries(
  readdirSync(resolve(root, "prototypes"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => [`prototype-${entry.name}`, resolve(root, "prototypes", entry.name, "index.html")])
    .filter(([, file]) => existsSync(file)),
);

// Lets the documentation site read and update the backlog (local dev server only).
// Updates are applied to the file on disk one item at a time, so the page never
// overwrites items added to the file by someone else in the meantime.
type BacklogChange = Record<string, unknown>;
const BACKLOG_FIELDS = ["status", "stage", "priority", "release"];

// Applies a change to one item of a backlog file. Returns the new data, or null if the item is not in it.
function applyBacklogChange(file: string, id: string, change: BacklogChange) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  const item = data.items.find((entry: { id: string }) => entry.id === id);
  if (!item) return null;
  for (const [key, value] of Object.entries(change)) {
    if (!BACKLOG_FIELDS.includes(key)) continue;
    if (value === null || value === "") delete item[key]; // e.g. priority back to none
    else item[key] = value;
  }
  writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  return data;
}

// A change made by the Design System Lead on the Backlog page is also saved to develop (B092, B107): committed in
// the root folder of the project, which always holds develop, and pushed. Returns an error message, or null.
function saveBacklogChangeToDevelop(id: string, change: BacklogChange): string | null {
  const main = checkouts(root)[0] ?? root;
  const git = (args: string) => execSync(`git ${args}`, { cwd: main, encoding: "utf8", stdio: "pipe" });
  try {
    if (git("rev-parse --abbrev-ref HEAD").trim() !== "develop") return "the root folder is not on develop";
    if (git("status --porcelain").trim()) return "the root folder has uncommitted changes";
    const summary = Object.entries(change)
      .filter(([key]) => BACKLOG_FIELDS.includes(key))
      .map(([key, value]) => `${key} ${value ?? "none"}`)
      .join(", ");
    for (let attempt = 0; attempt < 2; attempt++) {
      git("fetch -q origin");
      git("merge -q --ff-only origin/develop");
      if (!applyBacklogChange(resolve(main, "backlog/backlog.json"), id, change)) return `${id} is not in develop yet`;
      if (!git("status --porcelain").trim()) return null; // Already saved in develop.
      git("add backlog/backlog.json");
      git(`commit -q -m "Backlog: ${id} ${summary} (Design System Lead, Backlog page)"`);
      try {
        git("push -q origin develop");
        return null;
      } catch {
        git("reset -q --hard origin/develop"); // develop moved meanwhile: start again from it.
      }
    }
    return "develop kept moving; try again";
  } catch (error) {
    return String(error).split("\n")[0];
  }
}

function backlogApi(): Plugin {
  const file = resolve(root, "backlog/backlog.json");
  const read = () => JSON.parse(readFileSync(file, "utf8"));
  return {
    name: "backlog-api",
    configureServer(server) {
      server.middlewares.use("/api/backlog", (req, res) => {
        const send = (status: number, data?: unknown) => {
          res.statusCode = status;
          res.setHeader("Content-Type", "application/json");
          res.end(data === undefined ? "" : JSON.stringify(data));
        };
        if (req.method === "GET") return send(200, read());
        if (req.method !== "PATCH") return send(405);
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          try {
            const { id, change } = JSON.parse(body);
            if (!read().items.some((entry: { id: string }) => entry.id === id))
              return send(404, { error: `Unknown item ${id}` });
            const servedFromRoot = resolve(checkouts(root)[0] ?? root) === resolve(root);
            const mainError = saveBacklogChangeToDevelop(id, change);
            // Served from a work branch (or develop could not be saved): the change is saved here too, so the page
            // shows it; the same change in develop merges without conflict.
            if (!servedFromRoot || mainError) applyBacklogChange(file, id, change);
            send(200, { ...read(), mainError });
          } catch (error) {
            send(400, { error: String(error) });
          }
        });
      });
    },
  };
}

// Lets the Design preview tab save token choices to components/<Name>/design/tokens.json (local dev only).
function designTokensApi(): Plugin {
  return {
    name: "design-tokens-api",
    configureServer(server) {
      server.middlewares.use("/api/design-tokens", (req, res) => {
        if (req.method !== "PATCH") {
          res.statusCode = 405;
          res.end();
          return;
        }
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          try {
            const { folder, variant, slot, token, text } = JSON.parse(body);
            if (!/^[A-Za-z0-9]+$/.test(folder)) throw new Error("Invalid component folder");
            const file = resolve(root, "components", folder, "design/tokens.json");
            const data = JSON.parse(readFileSync(file, "utf8"));
            if (typeof text === "string") data.text = text;
            if (variant !== undefined) {
              if (!data.variants[variant] || !data.slots[slot]) throw new Error("Unknown variant or slot");
              if (token) data.variants[variant][slot] = token;
              else delete data.variants[variant][slot];
            }
            writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
            res.statusCode = 204;
            res.end();
          } catch (error) {
            res.statusCode = 400;
            res.end(String(error));
          }
        });
      });
    },
  };
}

// Time spent building the site, from the Claude Code session logs of this project (local dev only).
function workTimeApi(): Plugin {
  return {
    name: "work-time-api",
    configureServer(server) {
      server.middlewares.use("/api/work-time", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(workTime(root)));
      });
    },
  };
}

// Branches of the repository for the Branches page (B109, local dev server only): every branch on GitHub and in a
// local folder, its Claude conversation (read from the Claude app's session files), its ticket and its position
// against develop; plus what develop adds to main (the next release).
function branchesApi(): Plugin {
  return {
    name: "branches-api",
    configureServer(server) {
      server.middlewares.use("/api/branches", (_req, res) => {
        const git = (args: string) => {
          try {
            return execSync(`git ${args}`, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
          } catch {
            return "";
          }
        };
        git("fetch -q --prune origin");
        // Conversations of the Claude app, by folder (title, archived).
        const conversations = new Map<string, { title: string; archived: boolean }>();
        const sessions = resolve(homedir(), "Library/Application Support/Claude/claude-code-sessions");
        const walk = (dir: string, depth: number) => {
          if (depth > 3 || !existsSync(dir)) return;
          for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const path = resolve(dir, entry.name);
            if (entry.isDirectory()) walk(path, depth + 1);
            else if (entry.name.endsWith(".json")) {
              try {
                const session = JSON.parse(readFileSync(path, "utf8"));
                const folder = session.worktreePath ?? session.cwd;
                const known = conversations.get(folder);
                if (folder && session.title && (!known || known.archived))
                  conversations.set(folder, { title: session.title, archived: Boolean(session.isArchived) });
              } catch {
                // Not a session file.
              }
            }
          }
        };
        walk(sessions, 0);
        // Folders (git worktrees) and the branch checked out in each one.
        const folders = new Map<string, string>();
        let path = "";
        for (const line of git("worktree list --porcelain").split("\n")) {
          if (line.startsWith("worktree ")) path = line.slice("worktree ".length);
          if (line.startsWith("branch refs/heads/")) folders.set(line.slice("branch refs/heads/".length), path);
        }
        const remote = git("for-each-ref --format='%(refname:short)' refs/remotes/origin")
          .split("\n")
          .filter((name) => name && name !== "origin" && name !== "origin/HEAD")
          .map((name) => name.replace(/^origin\//, ""));
        const names = [...new Set([...remote, ...folders.keys()])].filter((name) => !name.startsWith("claude/"));
        const branches = names.map((name) => {
          const ref = remote.includes(name) ? `origin/${name}` : name;
          const [behind, ahead] = git(`rev-list --left-right --count origin/develop...${ref}`).split(/\s+/).map(Number);
          const log = git(`log --format=%s origin/develop..${ref}`);
          const ticket = log.match(/\b(B\d{3})\b/g)?.at(-1) ?? null;
          const folder = folders.get(name) ?? null;
          const isRoot = folder !== null && folder === checkouts(root)[0];
          return {
            name,
            onGitHub: remote.includes(name),
            folder,
            // The root folder holds develop and is never used to work: no conversation.
            conversation: folder && !isRoot ? (conversations.get(folder) ?? null) : null,
            root: isRoot,
            ticket,
            ahead: ahead || 0,
            behind: behind || 0,
            lastCommit: git(`log -1 --format=%cs·%s ${ref}`),
          };
        });
        const nextRelease = git("log --format=%h·%cs·%s origin/main..origin/develop")
          .split("\n")
          .filter(Boolean)
          .map((line) => {
            const [hash, date, ...subject] = line.split("·");
            return { hash, date, subject: subject.join("·") };
          });
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ branches, nextRelease }));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), backlogApi(), designTokensApi(), workTimeApi(), branchesApi()],
  // Each Claude conversation gets its own port (PORT, set by the preview); 5173 otherwise.
  server: { port: Number(process.env.PORT) || 5173 },
  resolve: {
    alias: {
      "@ds/components": resolve(root, "components/index.ts"),
      "@ds/tokens": resolve(root, "tokens"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, "index.html"),
        docs: resolve(root, "docs/index.html"),
        "docs-playground": resolve(root, "docs/playground.html"),
        prototypes: resolve(root, "prototypes/index.html"),
        ...prototypePages,
      },
    },
  },
});
