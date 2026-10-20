// Design preview (stage 1) — NOT the final component code.
// Every visual value comes from a --preview-<slot> variable set by the Design preview tab
// from design/tokens.json, so tokens can be tested live before the spec is approved.
import type { PreviewProps } from "../../../docs/src/types";

export function Preview({ state, text }: PreviewProps) {
  return (
    <div
      data-state={state}
      className="preview-state-layer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "var(--preview-background)",
        color: "var(--preview-text)",
        border: "var(--preview-border-width) solid var(--preview-border)",
        padding: "var(--preview-padding-y) var(--preview-padding-x)",
        borderRadius: "var(--preview-radius)",
        fontFamily: "var(--preview-label-family)",
        fontSize: "var(--preview-label-size)",
        fontWeight: "var(--preview-label-weight)",
        lineHeight: "var(--preview-label-line-height)",
      }}
    >
      {text}
    </div>
  );
}
