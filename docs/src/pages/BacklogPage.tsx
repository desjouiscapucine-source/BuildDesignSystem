import { useState } from "react";
import type { Stage } from "../types";
import { statusLabels, useBacklog, type BacklogItem as Item, type BacklogStatus as Status } from "../backlog";

const columns: { status: Status; title: string; hint: string }[] = [
  { status: "proposal", title: "Proposals", hint: "Suggested by Claude — awaiting your approval" },
  { status: "todo", title: "To do", hint: "Approved, not started" },
  { status: "in-progress", title: "In progress", hint: "" },
  { status: "done", title: "Done", hint: "" },
];

const stages: Stage[] = ["design", "guidelines", "code"];

export function BacklogPage() {
  const { items, setItems, error, setError } = useBacklog();
  const [category, setCategory] = useState("All");
  const [showRejected, setShowRejected] = useState(false);

  const categories = ["All", ...new Set(items.map((item) => item.category))];
  const visible = items.filter((item) => category === "All" || item.category === category);
  const rejected = visible.filter((item) => item.status === "rejected");

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
      setError(data.mainError ? `Saved in this folder only, not in main: ${data.mainError}.` : null);
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
      {item.prototype && (
        <a className="backlog-ticket-link" href={`#/backlog/${item.id}`}>
          Spec and iterations ({item.iterations?.length ?? 0})
        </a>
      )}

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
