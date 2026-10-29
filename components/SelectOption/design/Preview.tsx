// SelectOption design preview (stage 1) — NOT the final component code.
// Shown on the list surface it lives in; every value is a --preview-<slot> variable.
// Each variant is shown twice: text only, then with a leading icon.
// The check mark (on the right) appears on the selected option only.
import type { PreviewProps } from "../../../docs/src/types";

function Mock({ state, text, variant, icon }: PreviewProps & { icon?: string }) {
  const selected = variant === "selected";
  return (
    <div
      data-state={state}
      data-variant={variant}
      className="preview-state-layer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--preview-gap)",
        width: "100%",
        boxSizing: "border-box",
        padding: "var(--preview-padding-y) var(--preview-padding-x)",
        borderRadius: "var(--preview-radius)",
        background: "var(--preview-background, transparent)",
        color: "var(--preview-text)",
        fontFamily: "var(--preview-label-family)",
        fontSize: "var(--preview-label-size)",
        fontWeight: "var(--preview-label-weight)",
        lineHeight: "var(--preview-label-line-height)",
      }}
    >
      {icon && (
        <span className="ds-icon" aria-hidden="true" style={{ color: "var(--preview-icon)", fontSize: "var(--preview-icon-size)" }}>
          {icon}
        </span>
      )}
      <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{text}</span>
      {selected && (
        <span className="ds-icon" aria-hidden="true" style={{ color: "var(--preview-check)", fontSize: "var(--preview-icon-size)" }}>
          check
        </span>
      )}
    </div>
  );
}

export function Preview(props: PreviewProps) {
  return (
    <div
      style={{
        background: "var(--preview-surface)",
        padding: "var(--space-8)",
        borderRadius: "var(--radius-8)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
      }}
    >
      <Mock {...props} />
      <Mock {...props} icon="schedule" />
    </div>
  );
}
