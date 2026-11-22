// Live examples shown on the component's documentation page.
// The Panel sits on the right of a positioned workspace: each example stages a canvas
// (background subtle, height of the largest panel width token, for staging only).
import { useState } from "react";
import type { ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { Panel, type PanelTab } from "./Panel";

function Workspace({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "var(--size-panel-max)",
        overflow: "hidden",
        background: "var(--color-background-subtle)",
        borderRadius: "var(--radius-8)",
      }}
    >
      {children}
    </div>
  );
}

const text = (content: string) => (
  <p className="ds-text-body" style={{ margin: 0, color: "var(--color-text-primary)" }}>
    {content}
  </p>
);

// Empty tab (guidelines, Content): one short sentence, body, text secondary — written by the playground.
const empty = (content: string) => (
  <p className="ds-text-body" style={{ margin: 0, color: "var(--color-text-secondary)" }}>
    {content}
  </p>
);

const longContent = (
  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
    {Array.from({ length: 16 }, (_, index) =>
      text(`Component ${index + 1} of the design system, to place in a frame of the canvas.`),
    )}
  </div>
);

function Demo({
  initialCollapsed = false,
  initialTab = "library",
  library = text("The coded components of the design system."),
  properties = text("The variants, states and texts of the selected component."),
  compositions = text("The saved compositions."),
}: {
  initialCollapsed?: boolean;
  initialTab?: PanelTab;
  library?: ReactNode;
  properties?: ReactNode;
  compositions?: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [selected, setSelected] = useState<PanelTab>(initialTab);
  return (
    <Workspace>
      <Panel
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        selected={selected}
        onSelect={setSelected}
        library={library}
        properties={properties}
        compositions={compositions}
      />
    </Workspace>
  );
}

export const examples: Example[] = [
  {
    title: "Expanded",
    description: "Default: the three tabs, the collapse button and the resize handle (desktop). Drag the handle, or focus it and use ← / →; double-click resets the width.",
    render: () => <Demo />,
  },
  {
    title: "Collapsed",
    description: "The strip of tab icons. A click on an icon reopens the panel on that tab.",
    render: () => <Demo initialCollapsed />,
  },
  {
    title: "Empty tab",
    description: "No composition saved yet: one short sentence, given by the playground.",
    render: () => <Demo initialTab="compositions" compositions={empty("No composition yet.")} />,
  },
  {
    title: "Long content",
    description: "The content of the tab scrolls; the tabs and the collapse button stay in place.",
    render: () => <Demo library={longContent} />,
  },
];
