import { useEffect, useState } from "react";
import initial from "../../../backlog/backlog.json";
import type { Stage } from "../types";

type Status = "proposal" | "todo" | "in-progress" | "done" | "rejected";

interface Item {
  id: string;
  title: string;
  category: string;
  status: Status;
  origin: "decided" | "proposal";
  description?: string;
  stage?: Stage;
}

const columns: { status: Status; title: string; hint: string }[] = [
  { status: "proposal", title: "Proposals", hint: "Suggested by Claude — awaiting your approval" },
  { status: "todo", title: "To do", hint: "Approved, not started" },
  { status: "in-progress", title: "In progress", hint: "" },
  { status: "done", title: "Done", hint: "" },
];

const statusLabels: Record<Status, string> = {
  proposal: "Proposal",
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
  rejected: "Rejected",
};

const stages: Stage[] = ["design", "guidelines", "code"];

export function BacklogPage() {
  const [items, setItems] = useState<Item[]>(initial.items as Item[]);
  const [category, setCategory] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const [showRejected, setShowRejected] = useState(false);

  const categories = ["All", ...new Set(items.map((item) => item.category))];
  const visible = items.filter((item) => category === "All" || item.category === category);
  const rejected = visible.filter((item) => item.status === "rejected");

  // Always start from the file on disk, not from the version bundled with the page.
  useEffect(() => {
    fetch("/api/backlog")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setItems(data.items))
      .catch(() => setError("Read-only: changes are saved only when the site runs with `npm run dev`."));
  }, []);

  async function update(id: string, change: Partial<Item>) {
    try {
      const response = await fetch("/api/backlog", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, change }),
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setItems(data.items);
      setError(null);
    } catch {
      setError("Could not save. Changes are saved only when the site runs with `npm run dev`.");
    }
  }

  const card = (item: Item) => (
    <li key={item.id} className="backlog-card">
      <div className="backlog-meta">
        <span className="backlog-tag">{item.category}</span>
        {item.origin === "decided" && <span className="backlog-tag decided">Decided</span>}
        <span className="backlog-id">{item.id}</span>
      </div>
      <strong>{item.title}</strong>
      {item.description && <p>{item.description}</p>}

      {item.status === "proposal" ? (
        <div className="backlog-actions">
          <button className="approve" onClick={() => update(item.id, { status: "todo" })}>
            Approve
          </button>
          <button onClick={() => update(item.id, { status: "rejected" })}>Reject</button>
        </div>
      ) : (
        <div className="backlog-actions">
          <label>
            Status
            <select
              value={item.status}
              onChange={(event) => update(item.id, { status: event.target.value as Status })}
            >
              {(["todo", "in-progress", "done", "rejected"] as Status[]).map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          </label>
          {item.stage && (
            <label>
              Stage
              <select value={item.stage} onChange={(event) => update(item.id, { stage: event.target.value as Stage })}>
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      )}
    </li>
  );

  return (
    <>
      <h1>Backlog</h1>
      <p className="lead">Tasks still to do.</p>
      <p>
        Source: <code>backlog/backlog.json</code> — completed work is logged in <code>STEPS.md</code>.
      </p>

      <div className="backlog-filters" role="group" aria-label="Filter by category">
        {categories.map((name) => (
          <button key={name} aria-pressed={category === name} onClick={() => setCategory(name)}>
            {name}
          </button>
        ))}
      </div>

      {error && (
        <p className="backlog-error" role="alert">
          {error}
        </p>
      )}

      <div className="backlog-board">
        {columns.map((column) => {
          const list = visible.filter((item) => item.status === column.status);
          return (
            <section key={column.status} className="backlog-column" aria-label={column.title}>
              <h2>
                {column.title} <span className="backlog-count">{list.length}</span>
              </h2>
              {column.hint && <p className="backlog-hint">{column.hint}</p>}
              <ul>{list.map(card)}</ul>
            </section>
          );
        })}
      </div>

      {rejected.length > 0 && (
        <section className="backlog-rejected">
          <button onClick={() => setShowRejected(!showRejected)} aria-expanded={showRejected}>
            {showRejected ? "Hide" : "Show"} rejected ({rejected.length})
          </button>
          {showRejected && <ul className="backlog-rejected-list">{rejected.map(card)}</ul>}
        </section>
      )}
    </>
  );
}
