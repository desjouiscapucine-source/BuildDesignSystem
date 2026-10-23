import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import type { Plugin } from "vite";
import { resolve } from "node:path";
import { homedir } from "node:os";
import { execSync } from "node:child_process";

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
            const data = read();
            const item = data.items.find((entry: { id: string }) => entry.id === id);
            if (!item) return send(404, { error: `Unknown item ${id}` });
            const allowed = ["status", "stage"];
            for (const key of Object.keys(change)) if (allowed.includes(key)) item[key] = change[key];
            writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
            send(200, data);
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
// Active time = sum of the gaps between logged events, ignoring pauses longer than WORK_PAUSE_MS.
const WORK_PAUSE_MS = 15 * 60 * 1000;

// Every checkout of the repository (git worktrees): Claude Code keeps one log folder per checkout.
function checkouts(): string[] {
  try {
    return execSync("git worktree list --porcelain", { cwd: root, encoding: "utf8" })
      .split("\n")
      .filter((line) => line.startsWith("worktree "))
      .map((line) => line.slice("worktree ".length));
  } catch {
    return [root];
  }
}

function workTimeApi(): Plugin {
  return {
    name: "work-time-api",
    configureServer(server) {
      server.middlewares.use("/api/work-time", (_req, res) => {
        const times: number[] = [];
        const folders = [...new Set([root, ...checkouts()])].map((path) =>
          resolve(homedir(), ".claude/projects", path.replace(/[^A-Za-z0-9]/g, "-")),
        );
        for (const folder of folders.filter((path) => existsSync(path))) {
          for (const name of readdirSync(folder).filter((file) => file.endsWith(".jsonl"))) {
            for (const line of readFileSync(resolve(folder, name), "utf8").split("\n")) {
              if (!line) continue;
              try {
                const time = Date.parse(JSON.parse(line).timestamp);
                if (!Number.isNaN(time)) times.push(time);
              } catch {
                // Skip lines that are not valid JSON (e.g. a line still being written).
              }
            }
          }
        }
        times.sort((a, b) => a - b);
        let activeMs = 0;
        for (let i = 1; i < times.length; i++) {
          const gap = times[i] - times[i - 1];
          if (gap <= WORK_PAUSE_MS) activeMs += gap;
        }
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ seconds: Math.floor(activeMs / 1000), lastActivity: times.at(-1) ?? null, pauseMs: WORK_PAUSE_MS }));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), backlogApi(), designTokensApi(), workTimeApi()],
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
        prototypes: resolve(root, "prototypes/index.html"),
        ...prototypePages,
      },
    },
  },
});
