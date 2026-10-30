import { useRef, type ReactNode } from "react";
import { Card, Dialog } from "@ds/components";
import { Markdown } from "../Markdown";
import { decisionLabels, prototypeSpecs, statusLabels, type BacklogItem } from "../backlog";

// One backlog ticket, opened in a modal over the Backlog page (#/backlog/<id>, navigation skill: the detail of a
// Level 3 page opens in a modal). Its content follows the ticket skill: Goal, Why, Scope, Done when (B114);
// for a prototype, also Users, User journey and Components used (B116), its specification and its iterations.
export function TicketDialog({
  id,
  items,
  actions,
  error,
  onClose,
}: {
  id?: string;
  items: BacklogItem[];
  /** The menus of the ticket (status, priority, release, stage), the same as on its card. */
  actions: (item: BacklogItem) => ReactNode;
  /** Error of the last save, shown under the menus. */
  error: string | null;
  onClose: () => void;
}) {
  // The last ticket shown stays in the dialog while it fades out.
  const last = useRef<{ id: string; item?: BacklogItem } | null>(null);
  if (id) last.current = { id, item: items.find((entry) => entry.id === id) };
  const shown = last.current;
  if (!shown) return null;
  const item = shown.item;

  if (!item) {
    return (
      <Dialog size="large" open={Boolean(id)} onClose={onClose} title="Ticket not found" description={`No ticket ${shown.id} in the backlog.`} />
    );
  }

  const spec = item.prototype ? prototypeSpecs[item.prototype] : undefined;
  const iterations = item.iterations ?? [];
  const meta = [item.id, item.category, statusLabels[item.status], item.priority && `Priority ${item.priority}`, item.release]
    .filter(Boolean)
    .join(" · ");
  const notWritten = <p className="empty">Not written yet.</p>;
  const list = (entries: string[] | undefined, ordered = false) => {
    if (!entries?.length) return notWritten;
    const items = entries.map((entry) => <li key={entry}>{entry}</li>);
    return ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
  };
  const isPrototype = item.category === "Prototypes" || Boolean(item.prototype);

  return (
    <Dialog size="large" open={Boolean(id)} onClose={onClose} title={item.title} description={meta}>
      <div className="ticket">
        <div className="ticket-menus">{actions(item)}</div>
        {error && (
          <p className="backlog-error" role="alert">
            {error}
          </p>
        )}
        <section>
          <h3>Goal</h3>
          {item.description ? <p>{item.description}</p> : notWritten}
        </section>
        <section>
          <h3>Why</h3>
          {item.why ? <p>{item.why}</p> : notWritten}
        </section>
        {isPrototype && (
          <>
            <section>
              <h3>Users</h3>
              {item.users ? <p>{item.users}</p> : notWritten}
            </section>
            <section>
              <h3>User journey</h3>
              {list(item.journey, true)}
            </section>
            <section>
              <h3>Components used</h3>
              {list(item.components)}
              {item.missingComponents?.length ? (
                <>
                  <h4>Missing components</h4>
                  {list(item.missingComponents)}
                </>
              ) : null}
            </section>
          </>
        )}
        <section>
          <h3>Scope</h3>
          {item.scope ? <p>{item.scope}</p> : notWritten}
        </section>
        <section>
          <h3>Done when</h3>
          {list(item.doneWhen)}
        </section>

        {item.prototype && (
          <>
            <section>
              <h3>Specification</h3>
              <p>
                Prototype: <a href={`/prototypes/${item.prototype}/`}>{item.prototype}</a> — spec in{" "}
                <code>prototypes/{item.prototype}/spec.md</code>.
              </p>
              {spec ? <Markdown source={spec} /> : <p className="empty">No specification yet on this branch.</p>}
            </section>
            <section>
              <h3>Iterations</h3>
              {iterations.length === 0 ? (
                <p className="empty">No iteration yet.</p>
              ) : (
                <ol className="ticket-iterations">
                  {iterations.map((iteration, index) => (
                    <li key={index}>
                      <Card title={`Iteration ${index + 1}`} headingLevel={4}>
                        <p>
                          <span className={`backlog-tag ${iteration.decision}`}>{decisionLabels[iteration.decision]}</span>
                        </p>
                        <p>{iteration.feedback}</p>
                      </Card>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </>
        )}
      </div>
    </Dialog>
  );
}
