// TimelineStep design preview (stage 1) — NOT the final component code.
// Shows three steps (to see the line); the middle one shows the state of the column.
// The whole content of a step is clickable (anchor link to a section of the page).
import type { CSSProperties } from "react";
import type { PreviewProps, PreviewState } from "../../../docs/src/types";

const textStyle = (slot: string, color: string) => ({
  fontFamily: `var(--preview-${slot}-family)`,
  fontSize: `var(--preview-${slot}-size)`,
  fontWeight: `var(--preview-${slot}-weight)`,
  lineHeight: `var(--preview-${slot}-line-height)`,
  color: `var(--preview-${color})`,
});

function Step({ text, date, description, last, state }: { text: string; date: string; description: string; last?: boolean; state: PreviewState }) {
  return (
    <div style={{ display: "flex", gap: "var(--preview-gap)", textAlign: "left" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          // Dot centered on the first line of the title (inside the clickable area padding)
          paddingTop: "calc(var(--preview-padding) + (var(--preview-title-size) * var(--preview-title-line-height) - var(--preview-marker-size)) / 2)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "var(--preview-marker-size)",
            height: "var(--preview-marker-size)",
            borderRadius: "var(--radius-full)",
            background: "var(--preview-marker)",
            border: "var(--preview-marker-border-width) solid var(--preview-marker-border)",
            boxSizing: "border-box",
            flexShrink: 0,
          }}
        />
        {!last && <span aria-hidden="true" style={{ flex: 1, width: "var(--preview-line-width)", background: "var(--preview-line)" }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 0 : "var(--preview-spacing)" }}>
        <div
          data-state={state}
          className="preview-state-layer"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--preview-content-gap)",
            padding: "var(--preview-padding)",
            borderRadius: "var(--preview-radius)",
            color: "var(--preview-title-color)",
            outlineColor: state === "focus" ? "var(--preview-focus)" : undefined,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--preview-title-date-gap)" }}>
            <span style={{ flex: 1, minWidth: 0, ...textStyle("title", "title-color") }}>{text}</span>
            <span style={{ whiteSpace: "nowrap", ...textStyle("date", "date-color") }}>{date}</span>
          </div>
          <span style={textStyle("description", "description-color")}>{description}</span>
        </div>
      </div>
    </div>
  );
}

export function Preview({ text, state }: PreviewProps) {
  return (
    // The step takes the full width of its timeline; shown here at the panel width (--size-timeline).
    <div style={{ width: "100%", maxWidth: "var(--size-timeline)" }}>
      {/* The other steps keep the default marker, so the selected one stands out */}
      <div style={{ "--preview-marker": "var(--color-background-brand-subtle)" } as CSSProperties}>
        <Step state="default" date="12 Oct 2026 – 13 Oct 2026" text="Order placed" description="Payment received." />
      </div>
      <Step state={state} date="14 Oct 2026 – 16 Oct 2026" text={text || "Order shipped"} description="The parcel left the warehouse." />
      <div style={{ "--preview-marker": "var(--color-background-brand-subtle)" } as CSSProperties}>
        <Step state="default" date="16 Oct 2026 – 2 Nov 2026" text="Delivered" description="Signed by the customer." last />
      </div>
    </div>
  );
}
