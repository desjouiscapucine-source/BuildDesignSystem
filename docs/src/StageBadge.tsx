import type { Level, Status } from "./types";

const stages = ["design", "guidelines", "code"] as const;

// Templates and pages skip the guidelines stage. "complete" = every stage approved.
export function StageBadge({ status, level }: { status: Status; level?: Level }) {
  const list = level === "template" || level === "page" ? stages.filter((s) => s !== "guidelines") : [...stages];
  const complete = status === "complete";
  const current = complete ? list.length : list.indexOf(status);
  return (
    <ol className="stages" aria-label={complete ? "Component stages: complete" : "Component stage"}>
      {list.map((stage, index) => (
        <li
          key={stage}
          className={index < current ? "done" : index === current ? "current" : ""}
          aria-current={index === current ? "step" : undefined}
        >
          {index < current && (
            <span className="ds-icon" aria-hidden="true">
              check
            </span>
          )}
          {stage}
        </li>
      ))}
      {complete && (
        <li className="complete">
          <span className="ds-icon" aria-hidden="true">
            verified
          </span>
          Complete
        </li>
      )}
    </ol>
  );
}
