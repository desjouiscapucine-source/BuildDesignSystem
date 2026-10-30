// Organization diagram of the git workflow (B107): work branches → develop → main on release day.
// The full rules are the git-workflow skill, linked at the bottom.
import { Header } from "./SectionPages";

const workBranches = [
  { name: "component/<Name>", detail: "a component: merged after each approved stage" },
  { name: "component/<prototype-folder>", detail: "a prototype: merged when it is validated" },
  { name: "governance/<topic>", detail: "merged as soon as approved" },
];

const Arrow = ({ label }: { label?: string }) => (
  <div className="git-flow-arrow">
    <span className="ds-icon" aria-hidden="true">
      arrow_forward
    </span>
    {label && <span className="git-flow-arrow-label">{label}</span>}
  </div>
);

export function GitWorkflowPage() {
  return (
    <>
      <Header title="Git workflow" lead="How the work goes from a branch to a release" />
      <p>
        One piece of work = one branch = one folder = one Claude session. Everything is automatic: Claude creates the
        branches, commits, merges and prepares the releases; you describe the task, review and approve.
      </p>

      <h2>Organization</h2>
      <div className="git-flow" role="img" aria-label="Work branches are merged into develop; on release day, develop is merged into main, with a tag and a release note.">
        <ul className="git-flow-branches">
          {workBranches.map((branch) => (
            <li key={branch.name} className="git-flow-box">
              <code>{branch.name}</code>
              <span>{branch.detail}</span>
            </li>
          ))}
        </ul>
        <Arrow label="approved" />
        <div className="git-flow-box git-flow-box--develop">
          <code>develop</code>
          <span>approved work, waiting for its release</span>
        </div>
        <Arrow label="release R<n>, after review" />
        <div className="git-flow-box git-flow-box--main">
          <code>main</code>
          <span>released work only</span>
          <span>+ tag R&lt;n&gt; + release note</span>
        </div>
      </div>

      <h2>In short</h2>
      <ul>
        <li>
          <strong>Work branches</strong> start from <code>develop</code>, are updated from it before every commit and
          merged into it once approved.
        </li>
        <li>
          <strong>
            <code>develop</code>
          </strong>{" "}
          is permanent: it is what the local site shows every day, and the root folder of the project stays on it.
        </li>
        <li>
          <strong>
            <code>main</code>
          </strong>{" "}
          changes only on release day, every two weeks: review of what was pushed and committed, release note, then{" "}
          <code>develop</code> is merged into <code>main</code> and tagged <code>R&lt;n&gt;</code> (see{" "}
          <a href="#/releases">Release planning</a>).
        </li>
        <li>
          <strong>Conversations</strong>: Gouvernance (one, permanent), Composant &lt;Name&gt; (one per
          component or prototype, archived when finished).
        </li>
      </ul>

      <p>
        <a className="git-flow-link" href="#/skills/git-workflow">
          Read the git-workflow skill
          <span className="ds-icon" aria-hidden="true">
            arrow_forward
          </span>
        </a>
      </p>
    </>
  );
}
