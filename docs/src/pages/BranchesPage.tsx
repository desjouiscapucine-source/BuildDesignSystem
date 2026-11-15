import { useEffect, useState } from "react";
import { Header } from "./SectionPages";
import { Link } from "@ds/components";

// Branches page (B109): every branch, its conversation, folder, ticket and position against develop, read live from
// git by the dev server (/api/branches); plus what develop adds to main, the content of the next release.

interface Branch {
  name: string;
  onGitHub: boolean;
  folder: string | null;
  /** The root folder of the project (always on develop). */
  root: boolean;
  conversation: { title: string; archived: boolean } | null;
  ticket: string | null;
  ahead: number;
  behind: number;
  lastCommit: string;
}

interface Commit {
  hash: string;
  date: string;
  subject: string;
}

const order = (name: string) => (name === "develop" ? 0 : name === "main" ? 1 : 2);
const folderName = (path: string) => path.split("/").at(-1);

export function BranchesPage() {
  const [data, setData] = useState<{ branches: Branch[]; nextRelease: Commit[] } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/branches")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const branches = [...(data?.branches ?? [])].sort((a, b) => order(a.name) - order(b.name) || a.name.localeCompare(b.name));

  return (
    <>
      <Header title="Branches" lead="Every branch, its conversation and what the next release contains" />
      <p>
        Read live from git. Work branches start from{" "}
        <code>develop</code> and are merged into it; <code>main</code> changes on release day only (
        <Link href="#/git-workflow">Git workflow</Link>).
      </p>
      {error && <p className="empty">Not available online.</p>}
      {!data && !error && <p className="empty">Reading the branches…</p>}

      {data && (
        <>
          <h2>Branches ({branches.length})</h2>
          <table className="tokens">
            <thead>
              <tr>
                <th>Branch</th>
                <th>Conversation and folder</th>
                <th>Ticket</th>
                <th>Against develop</th>
                <th>Last commit</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.name}>
                  <td>
                    <code>{branch.name}</code>
                    {!branch.onGitHub && <div className="branch-note">local only</div>}
                  </td>
                  <td>
                    {branch.conversation ? (
                      <>
                        {branch.conversation.title}
                        {branch.conversation.archived && <span className="branch-note"> (archived)</span>}
                      </>
                    ) : (
                      <span className="branch-note">
                        {branch.root ? "root folder of the project" : branch.folder ? "no conversation" : "no folder"}
                      </span>
                    )}
                    {branch.folder && <div className="branch-note">{folderName(branch.folder)}</div>}
                  </td>
                  <td>{branch.ticket ? <Link href={`#/backlog/${branch.ticket}`}>{branch.ticket}</Link> : "—"}</td>
                  <td>
                    {branch.name === "develop"
                      ? "—"
                      : `${branch.ahead} ahead · ${branch.behind} behind`}
                  </td>
                  <td className="branch-note">{branch.lastCommit.replace("·", " · ")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Next release: what develop adds to main ({data.nextRelease.length})</h2>
          {data.nextRelease.length === 0 ? (
            <p className="empty">Nothing yet: develop and main are the same.</p>
          ) : (
            <table className="tokens">
              <thead>
                <tr>
                  <th>Commit</th>
                  <th>Date</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {data.nextRelease.map((commit) => (
                  <tr key={commit.hash}>
                    <td>
                      <code>{commit.hash}</code>
                    </td>
                    <td>{commit.date}</td>
                    <td>{commit.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  );
}
