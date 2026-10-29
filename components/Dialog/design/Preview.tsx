// Dialog design preview (stage 1) — NOT the final component code.
// The dialog is shown over its overlay, 16px from the edges on small screens.
// Header and footer stay in place; only the body scrolls when the content is long (shown in "large").
import type { PreviewProps } from "../../../docs/src/types";
import { Button } from "../../Button/Button";
import { IconButton } from "../../IconButton/IconButton";

const widths: Record<string, string> = {
  small: "var(--size-dialog-small)",
  medium: "var(--size-dialog-medium)",
  large: "var(--size-dialog-large)",
};

function textStyle(slot: string) {
  return {
    margin: 0,
    fontFamily: `var(--preview-${slot}-family)`,
    fontSize: `var(--preview-${slot}-size)`,
    fontWeight: `var(--preview-${slot}-weight)`,
    lineHeight: `var(--preview-${slot}-line-height)`,
    color: `var(--preview-${slot}-color)`,
  } as const;
}

const longBody = [
  "Dialog that opens over the page to show a detail or ask for an action. It uses the highest shadow and dims the page behind it.",
  "It opens the detail of a Level 3 page (e.g. a ticket from the Backlog) instead of a new page, as defined on the Navigation structure page.",
  "The header and the footer stay in place: only this body scrolls when the content is longer than the screen.",
  "It closes with the close button, the Escape key, a click on the overlay or a button of the footer.",
];

export function Preview({ text, variant = "medium" }: PreviewProps) {
  const isLarge = variant === "large";
  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "100%",
        height: "440px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-16)",
        background: "var(--preview-overlay)",
      }}
    >
      <div
        role="dialog"
        aria-label={text}
        style={{
          boxSizing: "border-box",
          width: "100%",
          maxWidth: widths[variant] ?? widths.medium,
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "var(--preview-gap)",
          textAlign: "left",
          background: "var(--preview-background)",
          borderRadius: "var(--preview-radius)",
          padding: "var(--preview-padding)",
          boxShadow: "var(--preview-shadow, none)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-16)" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--preview-header-gap)" }}>
            <h2 style={textStyle("title")}>{text || "Delete this ticket?"}</h2>
            <p style={textStyle("description")}>{isLarge ? "B029 · Components · In progress" : "B029 · Dialog"}</p>
          </div>
          <IconButton variant="tertiary" icon="close" label="Close" />
        </div>
        <div style={{ minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
          {(isLarge ? [...longBody, ...longBody.map((p) => `${p} `)] : ["The ticket and its history will be removed from the backlog. This cannot be undone."]).map((paragraph) => (
            <p key={paragraph} style={textStyle("body")}>{paragraph}</p>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "var(--preview-actions-gap)" }}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </div>
    </div>
  );
}
