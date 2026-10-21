import { Markdown } from "../Markdown";
import { decisionLabels, prototypeSpecs, statusLabels, useBacklog } from "../backlog";

// One backlog ticket (#/backlog/<id>): for a prototype, its specification and the history of its iterations.
export function TicketPage({ id }: { id: string }) {
  const { items } = useBacklog();
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    return (
      <>
        <h1>Ticket not found</h1>
        <p className="lead">No ticket {id} in the backlog</p>
        <p>
          <a href="#/backlog">← Backlog</a>
        </p>
      </>
    );
  }

  const spec = item.prototype ? prototypeSpecs[item.prototype] : undefined;
  const iterations = item.iterations ?? [];

  return (
    <>
      <p>
        <a href="#/backlog">← Backlog</a>
      </p>
      <h1 title={item.title}>{item.title}</h1>
      <p className="lead">
        {item.id} · {item.category} · {statusLabels[item.status]}
      </p>
      {item.description && <p>{item.description}</p>}
      {item.prototype && (
        <p>
          Prototype: <a href={`/prototypes/${item.prototype}/`}>{item.prototype}</a> — spec in{" "}
          <code>prototypes/{item.prototype}/spec.md</code>.
        </p>
      )}

      <h2>Specification</h2>
      {spec ? (
        <Markdown source={spec} />
      ) : (
        <p className="empty">No specification yet on this branch.</p>
      )}

      <h2>Iterations</h2>
      {iterations.length === 0 ? (
        <p className="empty">No iteration yet.</p>
      ) : (
        <ol className="ticket-iterations">
          {iterations.map((iteration, index) => (
            <li key={index}>
              <div className="ticket-iteration-head">
                <strong>Iteration {index + 1}</strong>
                <span className={`backlog-tag ${iteration.decision}`}>{decisionLabels[iteration.decision]}</span>
              </div>
              <p>{iteration.feedback}</p>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
