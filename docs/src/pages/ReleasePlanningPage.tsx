import {
  formatReleaseDate,
  priorityLabels,
  priorityRank,
  releasePlans,
  releases,
  statusLabels,
  useBacklog,
  type BacklogItem,
  type Release,
} from "../backlog";
import { Markdown } from "../Markdown";

// Release notes: releases/R<n>.md (git-workflow section 8), shown under their release.
const notes: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>("../../../releases/R*.md", { eager: true, query: "?raw", import: "default" }),
  ).map(([path, source]) => [path.split("/").at(-1)!.replace(/\.md$/, ""), source]),
);

// Release planning (B103): one release every two weeks on Friday, R1 on 2026-11-06. A release is the batch of
// backlog tickets whose `release` field names it (Release list of the Backlog page). Before it has tickets, a release can
// list what is planned (backlog.json `releases.planned`), as plain text.

type Planned = BacklogItem & { carriedFrom?: string };

function ReleaseCard({ release, tickets }: { release: Release; tickets: Planned[] }) {
  const planned = tickets.filter((item) => item.status !== "rejected").sort((a, b) => priorityRank(a) - priorityRank(b));
  const done = planned.filter((item) => item.status === "done").length;
  const plan = releasePlans[release.id] ?? [];
  return (
    <li className="release-card">
      <div className="release-card-header">
        <h2>
          {release.id} <span className="release-date">{formatReleaseDate(release.date)}</span>
        </h2>
        {planned.length > 0 && (
          <span className="release-progress">
            {done}/{planned.length} done
          </span>
        )}
      </div>
      {plan.length > 0 && (
        <ul className="release-plan">
          {plan.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      )}
      {planned.length === 0 ? (
        plan.length === 0 && <p className="empty">Nothing planned yet.</p>
      ) : (
        <table className="tokens">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {planned.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className="backlog-id">{item.id}</span> {item.title}
                  {item.carriedFrom && <span className="release-carried"> (carried over from {item.carriedFrom})</span>}
                </td>
                <td>{statusLabels[item.status]}</td>
                <td>{item.priority ? priorityLabels[item.priority] : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {notes[release.id] && (
        <details className="release-note" open>
          <summary>Release note</summary>
          <Markdown source={notes[release.id]} />
        </details>
      )}
    </li>
  );
}

export function ReleasePlanningPage() {
  const { items } = useBacklog();
  const today = new Date().toISOString().slice(0, 10);
  const all = releases(items);
  const upcoming = all.filter((release) => release.date >= today);
  const past = all.filter((release) => release.date < today).reverse();
  // A ticket not done on the date of its release moves automatically to the next upcoming release.
  const dateOf = new Map(all.map((release) => [release.id, release.date]));
  const nextId = upcoming[0]?.id;
  const placed: Planned[] = items.map((item) => {
    const date = item.release && dateOf.get(item.release);
    const late = date && date < today && item.status !== "done" && item.status !== "rejected";
    return late && nextId ? { ...item, release: nextId, carriedFrom: item.release } : item;
  });
  const card = (release: Release) => (
    <ReleaseCard key={release.id} release={release} tickets={placed.filter((item) => item.release === release.id)} />
  );

  return (
    <>
      <h1>Release planning</h1>
      <p className="lead">The tickets delivered by each release, every two weeks</p>
      <p>
        A release is a batch of backlog tickets delivered on a given date: one every two weeks, on Friday. Plan a ticket
        with the Release list of the <a href="#/backlog">Backlog</a>.
      </p>
      <ul className="release-list">{upcoming.map(card)}</ul>
      {past.length > 0 && (
        <details className="release-past">
          <summary>Past releases ({past.length})</summary>
          <ul className="release-list">{past.map(card)}</ul>
        </details>
      )}
    </>
  );
}
