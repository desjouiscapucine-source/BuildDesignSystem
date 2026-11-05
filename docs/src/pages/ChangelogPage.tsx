import { components } from "../registry";
import { Header } from "./SectionPages";
import { Link } from "@ds/components";

// Every version of every component, newest first (read from the meta.json changelogs; `changelog` skill).
const entries = components
  .flatMap((component) => component.changelog.map((entry) => ({ ...entry, component })))
  .sort((a, b) => b.date.localeCompare(a.date) || a.component.name.localeCompare(b.component.name));

export function ChangelogPage() {
  return (
    <>
      <Header title="Changelog" lead="Every version of every component, newest first" />
      <p>
        Read from the <code>changelog</code> of each component (<code>meta.json</code>). A complete component starts at
        1.0; <code>Y</code> goes up for an addition or a fix, <code>X</code> for a breaking change.
      </p>
      {entries.length === 0 ? (
        <p className="empty">No version yet.</p>
      ) : (
        <table className="tokens">
          <thead>
            <tr>
              <th>Date</th>
              <th>Component</th>
              <th>Version</th>
              <th>Changes</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={`${entry.component.slug}-${entry.version}`}>
                <td>{entry.date}</td>
                <td>
                  <Link href={`#/components/${entry.component.slug}`}>{entry.component.name}</Link>
                </td>
                <td>{entry.version}</td>
                <td>{entry.changes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
