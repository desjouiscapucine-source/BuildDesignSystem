// Backlog data shared by the Backlog page and the ticket page (source: backlog/backlog.json).
import { useEffect, useState } from "react";
import initial from "../../backlog/backlog.json";
import type { Stage } from "./types";

export type BacklogStatus = "todo" | "in-progress" | "done" | "rejected";

/** Priority chosen by the Design System Lead; none by default. */
export type BacklogPriority = "high" | "medium" | "low";

/** Decision taken by the Design System Lead at the end of a prototype iteration. */
export type IterationDecision = "changes-requested" | "validated";

/** One review of a prototype by the Design System Lead. The last "validated" one is the final validation. */
export interface Iteration {
  feedback: string;
  decision: IterationDecision;
}

export interface BacklogItem {
  id: string;
  title: string;
  category: string;
  status: BacklogStatus;
  origin: "decided" | "proposal";
  /** Template of a ticket description (B114) — Goal: what the ticket delivers, in one sentence (shown on the card). */
  description?: string;
  /** Why: the need or the problem behind the ticket. */
  why?: string;
  /** Scope: what is included — and what is not. */
  scope?: string;
  /** Done when: the acceptance criteria, one per entry. */
  doneWhen?: string[];
  /** Prototype tickets (ticket skill) — Users: who the journey is for, and their goal. */
  users?: string;
  /** Prototype tickets — User journey: the steps, in order. */
  journey?: string[];
  /** Prototype tickets — Components used: design system components the screens use. */
  components?: string[];
  /** Prototype tickets — the components missing, to create before or during the prototype. */
  missingComponents?: string[];
  stage?: Stage;
  priority?: BacklogPriority;
  /** Release that delivers the ticket (R1, R2…); absent = not planned. */
  release?: string;
  /** Prototype tickets: folder name in prototypes/ (its spec is prototypes/<folder>/spec.md). */
  prototype?: string;
  /** Prototype tickets: history of the iterations, oldest first. */
  iterations?: Iteration[];
}

export const statusLabels: Record<BacklogStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
  rejected: "Rejected",
};

export const priorityLabels: Record<BacklogPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

/** Sort order in the columns: High, Medium, Low, then the tickets with no priority. */
export const priorityRank = (item: BacklogItem) =>
  item.priority ? (["high", "medium", "low"] as BacklogPriority[]).indexOf(item.priority) : 3;

export const decisionLabels: Record<IterationDecision, string> = {
  "changes-requested": "Changes requested",
  validated: "Validated",
};

/** Prototype specs, by folder name (folders starting with "_" are ignored). */
export const prototypeSpecs: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>(["../../prototypes/*/spec.md", "!../../prototypes/_*/**"], {
      eager: true,
      query: "?raw",
      import: "default",
    }),
  ).map(([path, source]) => [path.split("/").at(-2)!, source]),
);

/** The backlog items, read from the file on disk when the site runs with `npm run dev`. */
export function useBacklog() {
  const [items, setItems] = useState<BacklogItem[]>(initial.items as BacklogItem[]);
  const [error, setError] = useState<string | null>(null);

  // Always start from the file on disk, not from the version bundled with the page.
  useEffect(() => {
    fetch("/api/backlog")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setItems(data.items))
      .catch(() => {
        // Online (public site): read-only, no message.
      });
  }, []);

  return { items, setItems, error, setError };
}

/** Release calendar (backlog.json `releases`): R1 on `first`, then one every `everyDays` days. */
const calendar = (initial as { releases?: { first: string; everyDays: number; planned?: Record<string, string[]> } })
  .releases ?? { first: "2026-11-06", everyDays: 14 };

/** What is planned for a release before it has tickets (backlog.json `releases.planned`), by release id. */
export const releasePlans: Record<string, string[]> = calendar.planned ?? {};

export interface Release {
  id: string;
  /** YYYY-MM-DD */
  date: string;
}

/** Date of release R<n>. */
export function releaseDate(n: number): string {
  const date = new Date(`${calendar.first}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + (n - 1) * calendar.everyDays);
  return date.toISOString().slice(0, 10);
}

const releaseNumber = (id: string) => Number(id.replace(/^R/, "")) || 0;

/** Releases from R1 to the last one used by a ticket, plus the next upcoming ones (at least `ahead`). */
export function releases(items: BacklogItem[], ahead = 3): Release[] {
  const today = new Date().toISOString().slice(0, 10);
  let next = 1;
  while (releaseDate(next) < today) next++;
  const used = Math.max(
    0,
    ...items.map((item) => (item.release ? releaseNumber(item.release) : 0)),
    ...Object.keys(releasePlans).map(releaseNumber),
  );
  const last = Math.max(used, next + ahead - 1);
  return Array.from({ length: last }, (_, index) => ({ id: `R${index + 1}`, date: releaseDate(index + 1) }));
}

/** "Fri 6 Nov 2026" */
export const formatReleaseDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
