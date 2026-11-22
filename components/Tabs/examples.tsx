// Live examples shown in the Examples tab of the documentation site.
import type { ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { Tabs } from "./Tabs";
import type { TabsItem } from "./Tabs";

function Text({ children }: { children: ReactNode }) {
  return <p className="ds-text-body" style={{ margin: 0 }}>{children}</p>;
}

const documentation: TabsItem[] = [
  { id: "spec", label: "Design spec", content: <Text>What the component is: anatomy, variants, states, tokens.</Text> },
  { id: "guidelines", label: "Guidelines", content: <Text>How and when to use the component.</Text> },
  { id: "code", label: "Code", content: <Text>The React component and its props.</Text> },
];

export const examples: Example[] = [
  {
    title: "Default",
    description: "Three tabs; the first is selected. Arrow keys move and select; Tab goes to the panel.",
    render: () => <Tabs label="Component documentation" tabs={documentation} />,
  },
  {
    title: "With a disabled tab",
    description: "The content of Code is not available yet; at least two tabs stay enabled.",
    render: () => (
      <Tabs
        label="Component documentation"
        tabs={documentation.map((tab) => (tab.id === "code" ? { ...tab, disabled: true } : tab))}
      />
    ),
  },
  {
    title: "On the surface background",
    description: "As in Panel (B144).",
    render: () => (
      <div style={{ background: "var(--color-background-surface)", padding: "var(--space-16)" }}>
        <Tabs
          label="Playground tools"
          tabs={[
            { id: "library", label: "Library", content: <Text>Components to add to the canvas.</Text> },
            { id: "properties", label: "Properties", content: <Text>Properties of the selected component.</Text> },
            { id: "compositions", label: "Compositions", content: <Text>Saved compositions.</Text> },
          ]}
        />
      </div>
    ),
  },
  {
    title: "Not enough space",
    description: "Seven tabs in a narrow container: the row scrolls horizontally; the selected tab is brought into view.",
    render: () => (
      <div style={{ maxWidth: "var(--size-dialog-small)" }}>
        <Tabs
          label="Component documentation"
          defaultSelected="code"
          tabs={["Playground", "Design preview", "Design spec", "Guidelines", "Examples", "Code", "Changelog"].map((name) => ({
            id: name.toLowerCase().replace(" ", "-"),
            label: name,
            content: <Text>Content of {name}.</Text>,
          }))}
        />
      </div>
    ),
  },
];
