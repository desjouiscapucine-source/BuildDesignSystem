import { useState } from "react";
import { Button, Select, TicketCard } from "@ds/components";
import type { Stage } from "../types";
import {
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
import { Header } from "./SectionPages";

const columns: { status: Status; title: string; hint: string }[] = [
  { status: "todo", title: "To do", hint: "Approved, not started" },
  { status: "in-progress", title: "In progress", hint: "" },
  { status: "done", title: "Done", hint: "" },
];

const stages: Stage[] = ["design", "guidelines", "code"];
const stageLabels: Record<Stage, string> = { design: "Design", guidelines: "Guidelines", code: "Code" };

/** `open`: the ticket shown in the modal (#/backlog/<id>). */
export function BacklogPage({ open }: { open?: string }) {
  const { items, setItems, error, setError, readOnly } = useBacklog();
  // Online the menus are disabled, until the read-only TicketCard variant (B153).
  const lock = readOnly ? ({ disabled: true } as const) : {};
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
      // Reached locally only: the menus are disabled online (B152). The card keeps its old value (TicketCard guidelines, B154).
      setError("Could not save the change. Try again.");
    }
  }

  // The menus of a ticket (status, priority, release, stage): one Select each, on its card and in its modal.
  // Stage only for component tickets. A change is saved at once (TicketCard guidelines); disabled online (B152).
  const ticketActions = (item: Item) => (
    <>
      <Select
        {...lock}
        label="Status"
        options={(["todo", "in-progress", "done", "rejected"] as Status[]).map((status) => ({ value: status, label: statusLabels[status] }))}
        value={item.status}
        onChange={(value) => update(item.id, { status: value as Status })}
      />
      <Select
        {...lock}
        label="Priority"
        options={[
          { value: "", label: "None" },
          ...(Object.keys(priorityLabels) as Exclude<Priority, undefined>[]).map((priority) => ({ value: priority, label: priorityLabels[priority] })),
        ]}
        value={item.priority ?? ""}
        onChange={(value) => update(item.id, { priority: (value || null) as Priority })}
      />
      <Select
        {...lock}
        label="Release"
        options={[
          { value: "", label: "None" },
          ...releaseList.map((release) => ({ value: release.id, label: release.id })),
        ]}
        value={item.release ?? ""}
        onChange={(value) => update(item.id, { release: value || null } as Partial<Item>)}
      />
      {item.stage && (
        <Select
          {...lock}
          label="Stage"
          options={stages.map((stage) => ({ value: stage, label: stageLabels[stage] }))}
          value={item.stage}
          onChange={(value) => update(item.id, { stage: value as Stage })}
        />
      )}
    </>
  );

  // One TicketCard per ticket: a click (except on the menus) or Enter opens it in a modal.
  const card = (item: Item) => (
    <li key={item.id}>
      <TicketCard
        ticketId={item.id}
        title={item.title}
        description={item.description}
        category={item.category}
        decided={item.origin === "decided"}
        menus={ticketActions(item)}
        onOpen={() => (location.hash = `#/backlog/${item.id}`)}
      />
    </li>
  );

  return (
    <>
      <Header title="Backlog" lead="Tasks still to do." />
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
          <Button variant="tertiary" onClick={() => setShowRejected(!showRejected)} aria-expanded={showRejected}>
            {showRejected ? "Hide" : "Show"} rejected ({rejected.length})
          </Button>
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
