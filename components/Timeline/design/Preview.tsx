// Timeline design preview (stage 1) — NOT the final component code.
// Left: desktop (the timeline next to the content). Right: below desktop, the panel open over the page.
import type { PreviewProps } from "../../../docs/src/types";
import { IconButton } from "../../IconButton/IconButton";
import { TimelineStep } from "../../TimelineStep/TimelineStep";

function Steps({ text }: { text: string }) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "var(--size-timeline)",
        background: "var(--preview-background, transparent)",
        border: "var(--preview-border-width) solid var(--preview-border)",
        borderRadius: "var(--preview-radius)",
        padding: "var(--preview-padding)",
        textAlign: "left",
      }}
    >
      <TimelineStep title="Order placed" startDate={new Date(2026, 9, 12)} endDate={new Date(2026, 9, 13)} href="#placed">
        Payment received.
      </TimelineStep>
      <TimelineStep title={text || "Order shipped"} startDate={new Date(2026, 9, 14)} endDate={new Date(2026, 9, 16)} href="#shipped" selected>
        The parcel left the warehouse.
      </TimelineStep>
      <TimelineStep title="Delivered" startDate={new Date(2026, 9, 16)} endDate={new Date(2026, 10, 2)} href="#delivered">
        Signed by the customer.
      </TimelineStep>
    </div>
  );
}

const card = { background: "var(--color-background-page)", border: "var(--border-width-1) solid var(--color-border-subtle)", borderRadius: "var(--radius-8)", height: "64px" };

export function Preview({ text }: PreviewProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-24)", alignItems: "flex-start", justifyContent: "center" }}>
      <figure style={{ margin: 0, flex: "1 1 400px", maxWidth: "400px" }}>
        <Steps text={text} />
        <figcaption style={{ marginTop: "var(--space-8)", fontSize: "var(--font-size-12)", color: "var(--color-text-secondary)" }}>Desktop</figcaption>
      </figure>
      <figure style={{ margin: 0 }}>
        {/* Small screen: page with the open button above the cards, panel open over it */}
        <div style={{ position: "relative", width: "360px", height: "520px", overflow: "hidden", border: "var(--border-width-1) solid var(--color-border-default)", borderRadius: "var(--radius-16)", background: "var(--color-background-surface)" }}>
          <div style={{ padding: "var(--space-16)", display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
            <div style={{ alignSelf: "flex-end" }}>
              <IconButton icon="timeline" label="Open the timeline" variant="primary" />
            </div>
            <div style={card} />
            <div style={card} />
            <div style={card} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "var(--color-background-overlay)" }} />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              boxSizing: "border-box",
              width: "min(100%, var(--size-timeline))",
              background: "var(--color-background-page)",
              boxShadow: "var(--shadow-panel)",
              padding: "var(--space-16)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-16)",
              overflowY: "auto",
            }}
          >
            <div style={{ alignSelf: "flex-end" }}>
              <IconButton icon="close" label="Close the timeline" variant="tertiary" />
            </div>
            <Steps text={text} />
          </div>
        </div>
        <figcaption style={{ marginTop: "var(--space-8)", fontSize: "var(--font-size-12)", color: "var(--color-text-secondary)" }}>Below desktop — panel open</figcaption>
      </figure>
    </div>
  );
}
