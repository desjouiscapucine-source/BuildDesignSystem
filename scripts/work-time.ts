// Time spent building the site (B089, B152), shared by the dev server (vite.config.ts, /api/work-time) and
// `npm run work-time`, which saves the total for the public site (docs/src/work-time.json, frozen online).
import { readdirSync, existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { homedir } from "node:os";
import { execSync } from "node:child_process";

// Active time = sum of the gaps between logged events, ignoring pauses longer than WORK_PAUSE_MS.
const WORK_PAUSE_MS = 15 * 60 * 1000;

// Time spent before the ledger existed, approved by the Design System Lead (B089): the clock showed
// 08:50:14 on 2026-10-27 at 09:30:59 UTC, before conversations (and their logs) were deleted.
const WORK_TIME_BASELINE = { until: Date.parse("2026-10-27T09:30:59Z"), seconds: 8 * 3600 + 50 * 60 + 14 };

// Every checkout of the repository (git worktrees); the first one is the main checkout.
export function checkouts(root: string): string[] {
  try {
    return execSync("git worktree list --porcelain", { cwd: root, encoding: "utf8" })
      .split("\n")
      .filter((line) => line.startsWith("worktree "))
      .map((line) => line.slice("worktree ".length));
  } catch {
    return [root];
  }
}

// Claude Code keeps one log folder per checkout, named after its path.
const logFolderName = (path: string) => path.replace(/[^A-Za-z0-9]/g, "-");

type Interval = [number, number];

// Joins intervals that overlap or are at most WORK_PAUSE_MS apart (same rule as the gaps between events).
function mergeIntervals(intervals: Interval[]): Interval[] {
  const merged: Interval[] = [];
  for (const [start, end] of [...intervals].sort((a, b) => a[0] - b[0])) {
    const last = merged.at(-1);
    if (last && start - last[1] <= WORK_PAUSE_MS) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged;
}

export interface WorkTime {
  seconds: number;
  lastActivity: number | null;
  pauseMs: number;
}

/** Total time spent building, read from the Claude Code session logs of every checkout of `root`. */
export function workTime(root: string): WorkTime {
  const projects = resolve(homedir(), ".claude/projects");
  const main = logFolderName(checkouts(root)[0] ?? root);
  // Log folders of every checkout, including the worktrees already removed.
  const folders = existsSync(projects)
    ? readdirSync(projects).filter((name) => name.startsWith(main)).map((name) => resolve(projects, name))
    : [];
  const times: number[] = [];
  for (const folder of folders) {
    for (const name of readdirSync(folder).filter((file) => file.endsWith(".jsonl"))) {
      for (const line of readFileSync(resolve(folder, name), "utf8").split("\n")) {
        if (!line) continue;
        try {
          const time = Date.parse(JSON.parse(line).timestamp);
          if (!Number.isNaN(time) && time > WORK_TIME_BASELINE.until) times.push(time);
        } catch {
          // Skip lines that are not valid JSON (e.g. a line still being written).
        }
      }
    }
  }
  times.sort((a, b) => a - b);
  const found: Interval[] = [];
  for (const time of times) {
    const last = found.at(-1);
    if (last && time - last[1] <= WORK_PAUSE_MS) last[1] = time;
    else found.push([time, time]);
  }
  // The ledger keeps the active periods already counted, so deleting a conversation (and its log)
  // no longer removes time. Shared by all the checkouts: it lives in the log folder of the main checkout.
  const ledger = resolve(projects, main, "work-time.json");
  let saved: Interval[] = [];
  try {
    saved = JSON.parse(readFileSync(ledger, "utf8")).intervals ?? [];
  } catch {
    // No ledger yet.
  }
  const intervals = mergeIntervals([...saved, ...found]);
  try {
    mkdirSync(resolve(projects, main), { recursive: true });
    writeFileSync(ledger, JSON.stringify({ intervals }) + "\n");
  } catch {
    // Read-only: the total is still right for this request.
  }
  const activeMs = intervals.reduce((sum, [start, end]) => sum + end - start, 0);
  const lastActivity = intervals.at(-1)?.[1] ?? null;
  return {
    seconds: WORK_TIME_BASELINE.seconds + Math.floor(activeMs / 1000),
    lastActivity,
    pauseMs: WORK_PAUSE_MS,
  };
}
