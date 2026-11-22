// Tabs design preview (stage 1) — NOT the final component code.
// A row of the coded Tab (B157) with a line under it, then the panel of the selected tab. The "focus" state shows the panel focused.
// Every value of Tabs itself is a --preview-<slot> variable; the look of each tab belongs to Tab.
import type { PreviewProps } from "../../../docs/src/types";
import { Tab } from "../../Tab/Tab";

export function Preview({ state, text }: PreviewProps) {
  return (
    <div style={{ background: "var(--preview-surface)", padding: "var(--space-8)", borderRadius: "var(--radius-8)", width: "100%", boxSizing: "border-box" }}>
      <div
        role="tablist"
        aria-label="Preview"
        style={{
          display: "flex",
          gap: "var(--preview-gap)",
          // The line is drawn inside the row (inset shadow), so the scrolling row never cuts the selection line of a tab sitting on it.
          boxShadow: "inset 0 calc(var(--preview-line-width) * -1) 0 var(--preview-line)",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Tab selected>{text}</Tab>
        <Tab>Guidelines</Tab>
        <Tab disabled>Code</Tab>
      </div>
      <div
        role="tabpanel"
        style={{
          marginTop: "var(--preview-panel-gap)",
          outline: state === "focus" ? "var(--border-width-2) solid var(--preview-focus)" : undefined,
          outlineOffset: "var(--border-width-2)",
          fontFamily: "var(--typography-body-family)",
          fontSize: "var(--typography-body-size)",
          lineHeight: "var(--typography-body-line-height)",
          color: "var(--color-text-primary)",
        }}
      >
        Content of the panel, given by the page.
      </div>
    </div>
  );
}
