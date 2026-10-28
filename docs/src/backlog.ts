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
  description?: string;
  stage?: Stage;
  priority?: BacklogPriority;
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
      .catch(() => setError("Read-only: changes are saved only when the site runs with `npm run dev`."));
  }, []);

  return { items, setItems, error, setError };
}
