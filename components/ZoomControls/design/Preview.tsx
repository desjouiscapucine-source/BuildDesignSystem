// ZoomControls design preview (stage 1) — NOT the final component code.
// The Content field sets the zoom level in percent (10 → 400). Zoom out is disabled at 10%, zoom in at 400%.
// The controls sit at the bottom right of a simulated canvas (background subtle).
import type { PreviewProps } from "../../../docs/src/types";
import { IconButton } from "../../IconButton/IconButton";

const MIN = 10;
const MAX = 400;

export function Preview({ text }: PreviewProps) {
  const parsed = Number.parseInt(text, 10);
  const zoom = Number.isNaN(parsed) ? 100 : Math.min(MAX, Math.max(MIN, parsed));
  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: "var(--space-16)",
        background: "var(--color-background-subtle)",
      }}
    >
      <div
        role="group"
        aria-label="Zoom controls"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--preview-gap)",
          padding: "var(--preview-padding)",
          borderRadius: "var(--preview-radius)",
          background: "var(--preview-background)",
          boxShadow: "var(--preview-shadow, none)",
        }}
      >
        <IconButton variant="tertiary" icon="remove" label="Zoom out" disabled={zoom <= MIN} />
        <span
          aria-label={`Zoom level ${zoom}%`}
          style={{
            minWidth: "var(--size-zoom-level)",
            textAlign: "center",
            color: "var(--preview-level-color)",
            fontFamily: "var(--preview-level-family)",
            fontSize: "var(--preview-level-size)",
            fontWeight: "var(--preview-level-weight)",
            lineHeight: "var(--preview-level-line-height)",
          }}
        >
          {zoom}%
        </span>
        <IconButton variant="tertiary" icon="add" label="Zoom in" disabled={zoom >= MAX} />
        <span
          aria-hidden="true"
          style={{
            alignSelf: "center",
            width: "var(--preview-divider-width)",
            height: "var(--preview-divider-height)",
            background: "var(--preview-divider-color)",
          }}
        />
        <IconButton variant="tertiary" icon="fit_screen" label="Fit to screen" />
      </div>
    </div>
  );
}
