// Live examples shown in the Examples tab of the documentation site.
import { useId, useState, type ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { Timeline } from "../Timeline/Timeline";
import { TimelineStep } from "../TimelineStep/TimelineStep";
import { Frame, type FrameSize } from "./Frame";

// The canvas around the frames (context only, not part of the Frame): background.subtle, as in the design preview.
// Frames keep their real size: the canvas scrolls horizontally when they are wider than the page.
function Canvas({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: "100%", overflowX: "auto", background: "var(--color-background-subtle)", borderRadius: "var(--radius-8)" }}>
      <div style={{ display: "flex", gap: "var(--space-32)", alignItems: "flex-start", width: "max-content", padding: "var(--space-24)" }}>
        {children}
      </div>
    </div>
  );
}

// Sample content: a small "Order tracking" screen made of coded components (Breadcrumb, heading, Timeline, Card, Button).
export function OrderTrackingScreen({ cards = 1 }: { cards?: number }) {
  const id = useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)", padding: "var(--space-24)" }}>
      <Breadcrumb
        items={[
          { label: "Account", href: "#/account" },
          { label: "Orders", href: "#/account/orders" },
        ]}
      />
      <h2 className="ds-text-heading-4" style={{ margin: 0 }}>
        Order tracking
      </h2>
      <Timeline label="Order history">
        <TimelineStep title="Order placed" startDate={new Date(2026, 9, 12)} endDate={new Date(2026, 9, 13)} href={`#${id}-placed`}>
          Payment received.
        </TimelineStep>
        <TimelineStep title="Order shipped" startDate={new Date(2026, 9, 14)} endDate={new Date(2026, 9, 16)} href={`#${id}-shipped`} selected>
          The parcel left the warehouse.
        </TimelineStep>
      </Timeline>
      <Card id={`${id}-placed`} title="Order placed">
        Payment received. The order was confirmed by email.
      </Card>
      {Array.from({ length: cards }, (_, index) => (
        <Card key={index} id={index === 0 ? `${id}-shipped` : undefined} title="Order shipped">
          The parcel left the warehouse in Lyon and was handed over to the carrier.
        </Card>
      ))}
      <div>
        <Button>Track the parcel</Button>
      </div>
    </div>
  );
}

function SelectableFrames() {
  const [selected, setSelected] = useState<string | null>("Home");
  const frames: { name: string; size: FrameSize }[] = [
    { name: "Home", size: "mobile" },
    { name: "Order tracking", size: "mobile" },
  ];
  return (
    <Canvas>
      {frames.map((frame) => (
        <Frame
          key={frame.name}
          name={frame.name}
          size={frame.size}
          selected={selected === frame.name}
          onSelectedChange={(isSelected) => setSelected(isSelected ? frame.name : null)}
        >
          <OrderTrackingScreen />
        </Frame>
      ))}
    </Canvas>
  );
}

export const examples: Example[] = [
  {
    title: "Mobile",
    description: "Default size: 375 × 812.",
    render: () => (
      <Canvas>
        <Frame name="Order tracking">
          <OrderTrackingScreen />
        </Frame>
      </Canvas>
    ),
  },
  {
    title: "Tablet",
    description: "768 × 1024.",
    render: () => (
      <Canvas>
        <Frame name="Order tracking" size="tablet">
          <OrderTrackingScreen />
        </Frame>
      </Canvas>
    ),
  },
  {
    title: "Desktop",
    description: "1280 × 800, with the browser bar. Wider than the page: the canvas scrolls horizontally.",
    render: () => (
      <Canvas>
        <Frame name="Order tracking" size="desktop">
          <OrderTrackingScreen />
        </Frame>
      </Canvas>
    ),
  },
  {
    title: "Selected",
    description: "2px border.focus outline on the frame. Tab to its name to see the focus outline around it as well.",
    render: () => (
      <Canvas>
        <Frame name="Order tracking" selected>
          <OrderTrackingScreen />
        </Frame>
      </Canvas>
    ),
  },
  {
    title: "Empty",
    description: "No component yet: the empty message replaces the content.",
    render: () => (
      <Canvas>
        <Frame name="Checkout — Payment" empty />
      </Canvas>
    ),
  },
  {
    title: "Long name and scrolling content",
    description: "The name is cut with an ellipsis at the frame width; the size label is never cut. The content scrolls under the device bar.",
    render: () => (
      <Canvas>
        <Frame name="Checkout — Payment with a saved card and a promotion code">
          <OrderTrackingScreen cards={8} />
        </Frame>
      </Canvas>
    ),
  },
  {
    title: "Selection",
    description: "A click on a frame selects it. Tab to a name, then Enter or Space to toggle; Escape removes the selection.",
    render: () => <SelectableFrames />,
  },
];
