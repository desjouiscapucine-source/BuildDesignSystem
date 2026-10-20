// Button design preview (stage 1) — NOT the final component code.
// Every visual value is a --preview-<slot> variable set by the Design preview tab.
import type { PreviewProps } from "../../../docs/src/types";

function Mock({ state, text, icon }: PreviewProps & { icon?: boolean }) {
  return (
    <div
      data-state={state}
      className="preview-state-layer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--preview-gap)",
        background: "var(--preview-background, transparent)",
        color: "var(--preview-text)",
        border: "var(--preview-border-width) solid var(--preview-border, transparent)",
        padding: "var(--preview-padding-y) var(--preview-padding-x)",
        borderRadius: "var(--preview-radius)",
        fontFamily: "var(--preview-label-family)",
        fontSize: "var(--preview-label-size)",
        fontWeight: "var(--preview-label-weight)",
        lineHeight: "var(--preview-label-line-height)",
        maxWidth: "100%",
        minWidth: 0,
      }}
    >
      {icon && (
        <span className="ds-icon" aria-hidden="true" style={{ color: "var(--preview-icon)", fontSize: "var(--preview-icon-size)" }}>
          add
        </span>
      )}
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{text}</span>
    </div>
  );
}

export function Preview(props: PreviewProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <Mock {...props} />
      <Mock {...props} icon />
    </div>
  );
}
