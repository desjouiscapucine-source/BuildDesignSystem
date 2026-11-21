// Design preview (stage 1) — NOT the final component code.
// Every visual value comes from a --preview-<slot> variable set by the Design preview tab
// from design/tokens.json, so tokens can be tested live before the spec is approved.
// Variants of the preview: "empty" (empty message) and "selection" (selection rectangle drawn with the mouse).
import type { PreviewProps } from "../../../docs/src/types";

export function Preview({ state, text, variant }: PreviewProps) {
  return (
    <div
      data-state={state}
      aria-label="Canvas"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--preview-background)",
        backgroundImage:
          "radial-gradient(circle, var(--preview-dot) calc(var(--preview-dot-size) / 2), transparent calc(var(--preview-dot-size) / 2))",
        backgroundSize: "var(--preview-dot-spacing) var(--preview-dot-spacing)",
        outline: state === "focus" ? "var(--preview-focus-ring-width) solid var(--preview-focus-ring)" : "none",
        outlineOffset: "calc(var(--preview-focus-ring-width) * -1)",
      }}
    >
      {variant === "selection" ? (
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "15%",
            width: "45%",
            height: "40%",
            border: "var(--preview-selection-width) solid var(--preview-selection)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "var(--preview-selection)", opacity: "var(--state-layer-hover)" }} />
        </div>
      ) : (
        <p
          style={{
            margin: 0,
            color: "var(--preview-message-color)",
            fontFamily: "var(--preview-message-family)",
            fontSize: "var(--preview-message-size)",
            fontWeight: "var(--preview-message-weight)",
            lineHeight: "var(--preview-message-line-height)",
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
}
