// MenuItem design preview (stage 1) — NOT the final component code.
// Shown on the surface of the Menu it lives in; every value is a --preview-<slot> variable.
// The item is a tile: an icon above a centered one-line label. Two tiles are shown side by side.
import type { PreviewProps } from "../../../docs/src/types";

function Mock({ state, text, variant, icon }: PreviewProps & { icon: string }) {
  return (
    <div
      data-state={state}
      data-variant={variant}
      className="preview-state-layer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--preview-gap)",
        flex: 1,
        minWidth: 0,
        boxSizing: "border-box",
        padding: "var(--preview-padding-y) var(--preview-padding-x)",
        borderRadius: "var(--preview-radius)",
        background: "var(--preview-background, transparent)",
        color: "var(--preview-text)",
        fontFamily: "var(--preview-label-family)",
        fontSize: "var(--preview-label-size)",
        fontWeight: "var(--preview-label-weight)",
        lineHeight: "var(--preview-label-line-height)",
        textAlign: "center",
      }}
    >
      <span className="ds-icon" aria-hidden="true" style={{ color: "var(--preview-icon)", fontSize: "var(--preview-icon-size)" }}>
        {icon}
      </span>
      <span style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{text}</span>
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
        gap: "var(--space-4)",
      }}
    >
      <Mock {...props} icon="mail" />
      <Mock {...props} icon="calendar_month" text="Calendar" />
    </div>
  );
}
