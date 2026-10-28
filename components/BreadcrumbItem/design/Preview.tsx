// BreadcrumbItem design preview (stage 1) — NOT the final component code.
// A text link followed by a slash (none on the last item); underline on hover; focus = ring + focus state layer; ellipsis on one line. Every value is a --preview-<slot> variable.
import type { PreviewProps } from "../../../docs/src/types";

export function Preview({ state, text, variant }: PreviewProps) {
  return (
    <div
      style={{
        background: "var(--preview-surface)",
        padding: "var(--space-8)",
        borderRadius: "var(--radius-8)",
        display: "inline-flex",
        alignItems: "baseline",
        maxWidth: "100%",
        boxSizing: "border-box",
        gap: "var(--preview-gap)",
        fontFamily: "var(--preview-label-family)",
        fontSize: "var(--preview-label-size)",
        fontWeight: "var(--preview-label-weight)",
        lineHeight: "var(--preview-label-line-height)",
      }}
    >
      <span
        data-state={state}
        style={{
          color: "var(--preview-text)",
          textDecoration: state === "hover" || state === "pressed" ? "underline" : "none",
          outline: state === "focus" ? "var(--border-width-2) solid var(--preview-focus)" : undefined,
          outlineOffset: "var(--border-width-2)",
          borderRadius: "var(--radius-4)",
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        {text}
        {state === "focus" && (
          <span
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: "currentColor", opacity: "var(--state-layer-focus)" }}
          />
        )}
      </span>
      {variant !== "last" && (
        <span aria-hidden="true" style={{ color: "var(--preview-separator)" }}>
          /
        </span>
      )}
    </div>
  );
}
