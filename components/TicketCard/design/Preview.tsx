// TicketCard design preview (stage 1) — NOT the final component code.
// The tags (Tag, B059) and the menus (Select, B021) are dashed placeholders until those components are coded.
import type { CSSProperties } from "react";
import type { PreviewProps } from "../../../docs/src/types";

const textStyle = (slot: string, color: string): CSSProperties => ({
  fontFamily: `var(--preview-${slot}-family)`,
  fontSize: `var(--preview-${slot}-size)`,
  fontWeight: `var(--preview-${slot}-weight)` as CSSProperties["fontWeight"],
  lineHeight: `var(--preview-${slot}-line-height)`,
  color: `var(--preview-${color})`,
  margin: 0,
});

// Placeholder of a building block not coded yet: dashed outline, no design decision.
const placeholder: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "0 var(--space-8)",
  border: "var(--border-width-1) dashed var(--color-border-default)",
  borderRadius: "var(--radius-4)",
  color: "var(--color-text-secondary)",
  fontFamily: "var(--typography-label-sm-family)",
  fontSize: "var(--typography-label-sm-size)",
  lineHeight: "var(--typography-label-sm-line-height)",
};

export function Preview({ text, state }: PreviewProps) {
  return (
    <div
      data-state={state}
      className="preview-state-layer"
      style={{
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--preview-gap)",
        textAlign: "left",
        background: "var(--preview-background)",
        border: "var(--preview-border-width) solid var(--preview-border)",
        borderRadius: "var(--preview-radius)",
        padding: "var(--preview-padding)",
        color: "var(--color-text-primary)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--preview-tags-gap)" }}>
        <span style={placeholder}>Tag: Components</span>
        <span style={placeholder}>Tag: Decided</span>
        <span style={{ ...textStyle("id", "id-color"), marginLeft: "auto" }}>B115</span>
      </div>
      <p style={textStyle("title", "title-color")}>{text || "TicketCard"}</p>
      <p style={textStyle("description", "description-color")}>A design system component for the card of a backlog ticket.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--preview-menus-gap)" }}>
        {["Status", "Priority", "Release", "Stage"].map((name) => (
          <span key={name} style={placeholder}>
            Select: {name}
          </span>
        ))}
      </div>
    </div>
  );
}
