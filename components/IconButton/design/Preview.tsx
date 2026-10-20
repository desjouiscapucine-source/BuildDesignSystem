// IconButton design preview (stage 1) — NOT the final component code.
// The Content field sets the Material Symbols icon name.
import type { PreviewProps } from "../../../docs/src/types";

export function Preview({ state, text }: PreviewProps) {
  return (
    <div style={{ display: "flex", gap: "var(--space-16)", alignItems: "center" }}>
      {[text || "timeline", "close"].map((icon) => (
        <span
          key={icon}
          data-state={state}
          className="preview-state-layer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--preview-padding)",
            borderRadius: "var(--preview-radius)",
            background: "var(--preview-background, transparent)",
            color: "var(--preview-icon)",
            outlineColor: state === "focus" ? "var(--preview-focus)" : undefined,
          }}
        >
          <span className="ds-icon" aria-hidden="true" style={{ fontSize: "var(--preview-icon-size)" }}>
            {icon}
          </span>
        </span>
      ))}
    </div>
  );
}
