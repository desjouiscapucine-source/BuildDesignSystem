// NavigationItem design preview (stage 1) — NOT the final component code.
// Shown on the brand surface it lives on; every value is a --preview-<slot> variable.
import type { PreviewProps } from "../../../docs/src/types";

function Mock({ state, text }: PreviewProps) {
  return (
    <div
      data-state={state}
      className="preview-state-layer"
      style={{
        display: "flex",
        alignItems: "flex-start",
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
        opacity: state === "disabled" ? "var(--opacity-disabled)" : undefined,
        outlineColor: state === "focus" ? "var(--preview-focus)" : undefined,
      }}
    >
      <span className="ds-icon" aria-hidden="true" style={{ color: "var(--preview-icon)", fontSize: "var(--preview-icon-size)" }}>
        dashboard
      </span>
      <span style={{ flex: 1, minWidth: 0, overflowWrap: "anywhere" }}>{text}</span>
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
    </div>
  );
}
