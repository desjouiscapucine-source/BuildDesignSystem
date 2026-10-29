import { useState, type MouseEvent } from "react";
import type { Stage } from "../types";
import {
  formatReleaseDate,
  priorityLabels,
  priorityRank,
  releases,
  statusLabels,
  useBacklog,
  type BacklogItem as Item,
  type BacklogPriority as Priority,
  type BacklogStatus as Status,
} from "../backlog";
import { TicketDialog } from "./TicketDialog";

const columns: { status: Status; title: string; hint: string }[] = [
  { status: "todo", title: "To do", hint: "Approved, not started" },
  { status: "in-progress", title: "In progress", hint: "" },
  { status: "done", title: "Done", hint: "" },
];

const stages: Stage[] = ["design", "guidelines", "code"];

/** `open`: the ticket shown in the modal (#/backlog/<id>). */
export function BacklogPage({ open }: { open?: string }) {
  const { items, setItems, error, setError } = useBacklog();
  const [category, setCategory] = useState("All");
  const [showRejected, setShowRejected] = useState(false);

  const categories = ["All", ...new Set(items.map((item) => item.category))];
  const visible = items.filter((item) => category === "All" || item.category === category);
  const rejected = visible.filter((item) => item.status === "rejected");
  const releaseList = releases(items);

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
      setError(data.mainError ? `Saved in this folder only, not in develop: ${data.mainError}.` : null);
    } catch {
      setError("Could not save. Changes are saved only when the site runs with `npm run dev`.");
    }
  }

  // The menus of a ticket (status, priority, release, stage): on its card and in its modal.
  const ticketActions = (item: Item) => (
    <div className="backlog-actions">
      <label>
        Status
        <select value={item.status} onChange={(event) => update(item.id, { status: event.target.value as Status })}>
          {(["todo", "in-progress", "done", "rejected"] as Status[]).map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
      </label>
      <label>
        Priority
        <select
          value={item.priority ?? ""}
          onChange={(event) => update(item.id, { priority: (event.target.value || null) as Priority })}
        >
          <option value="">None</option>
          {(Object.keys(priorityLabels) as Priority[]).map((priority) => (
            <option key={priority} value={priority}>
              {priorityLabels[priority]}
            </option>
          ))}
        </select>
      </label>
      <label>
        Release
        <select value={item.release ?? ""} onChange={(event) => update(item.id, { release: event.target.value || null } as Partial<Item>)}>
          <option value="">None</option>
          {releaseList.map((release) => (
            <option key={release.id} value={release.id}>
              {release.id} · {formatReleaseDate(release.date)}
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
  );

  // A click on a ticket opens it in a modal — except on its menus (status, priority, release, stage).
  const openTicket = (id: string) => (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest("select, label, a, button")) return;
    location.hash = `#/backlog/${id}`;
  };

  const card = (item: Item) => (
    <li key={item.id} className="backlog-card" onClick={openTicket(item.id)}>
      <div className="backlog-meta">
        <span className="backlog-tag">{item.category}</span>
        {item.origin === "decided" && <span className="backlog-tag decided">Decided</span>}
        <span className="backlog-id">{item.id}</span>
      </div>
      <strong>
        <a className="backlog-card-title" href={`#/backlog/${item.id}`}>
          {item.title}
        </a>
      </strong>
      {item.description && <p>{item.description}</p>}

      {ticketActions(item)}
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
          const list = visible
            .filter((item) => item.status === column.status)
            .sort((a, b) => priorityRank(a) - priorityRank(b));
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

      <TicketDialog
        id={open}
        items={items}
        actions={ticketActions}
        error={error}
        onClose={() => (location.hash = "#/backlog")}
      />
    </>
  );
}
