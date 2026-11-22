// Tab design preview (stage 1) — NOT the final component code.
// A text label; the selected tab has a line under it; hover / focus / pressed = state layer (top corners rounded), focus adds a ring inside the tab. Every value is a --preview-<slot> variable.
import type { PreviewProps } from "../../../docs/src/types";

const layer = { hover: "var(--state-layer-hover)", focus: "var(--state-layer-focus)", pressed: "var(--state-layer-pressed)" } as const;

export function Preview({ state, text, variant }: PreviewProps) {
  const selected = variant === "selected";
  const opacity = state in layer ? layer[state as keyof typeof layer] : undefined;
  return (
    <div style={{ background: "var(--preview-surface)", padding: "var(--space-8)", borderRadius: "var(--radius-8)", display: "inline-flex", maxWidth: "100%", boxSizing: "border-box" }}>
      <span
        data-state={state}
        style={{
          position: "relative",
          display: "inline-block",
          padding: "var(--preview-padding-y) var(--preview-padding-x)",
          color: "var(--preview-text)",
          fontFamily: "var(--preview-label-family)",
          fontSize: "var(--preview-label-size)",
          fontWeight: "var(--preview-label-weight)",
          lineHeight: "var(--preview-label-line-height)",
          whiteSpace: "nowrap",
          borderBottom: `var(--preview-indicator-width) solid ${selected ? "var(--preview-indicator)" : "transparent"}`,
          borderRadius: "var(--preview-radius) var(--preview-radius) 0 0",
          outline: state === "focus" ? "var(--border-width-2) solid var(--preview-focus)" : undefined,
          outlineOffset: "calc(var(--border-width-2) * -1)",
        }}
      >
        {text}
        {opacity && (
          <span aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: "currentColor", opacity }} />
        )}
      </span>
    </div>
  );
}
