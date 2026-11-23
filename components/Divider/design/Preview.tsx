// Divider design preview (stage 1) — NOT the final component code.
// Decorative line (aria-hidden). It takes the length of its container: full width (horizontal) or full height (vertical).
import type { PreviewProps } from "../../../docs/src/types";

export function Preview({ variant }: PreviewProps) {
  const vertical = variant === "vertical";
  const line = (
    <span
      aria-hidden="true"
      style={{
        alignSelf: "stretch",
        background: "var(--preview-color)",
        ...(vertical
          ? { width: "var(--preview-thickness)" }
          : { height: "var(--preview-thickness)" }),
      }}
    />
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: vertical ? "row" : "column",
        gap: "var(--space-16)",
        alignItems: vertical ? "center" : "stretch",
        width: "var(--size-dialog-small)",
        height: vertical ? "var(--space-64)" : "auto",
        color: "var(--color-text-primary)",
      }}
    >
      <span>Section one</span>
      {line}
      <span>Section two</span>
    </div>
  );
}
