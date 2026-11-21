// Live examples shown in the Examples tab of the documentation site.
// Tab is a building block: each example sits in a plain tab list, as Tabs will lay it out.
// Tabs will move the focus with the arrow keys; here a tab not selected gets tabIndex 0 to stay reachable with Tab.
import type { ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { Tab } from "./Tab";

function List({ children }: { children: ReactNode }) {
  return (
    <div role="tablist" aria-label="Example" style={{ display: "flex" }}>
      {children}
    </div>
  );
}

export const examples: Example[] = [
  {
    title: "Default",
    description: "A tab whose panel is not shown.",
    render: () => (
      <List>
        <Tab tabIndex={0}>Guidelines</Tab>
      </List>
    ),
  },
  {
    title: "Selected",
    description: "The tab whose panel is shown: brand label, semibold, with the selection line.",
    render: () => (
      <List>
        <Tab selected>Guidelines</Tab>
      </List>
    ),
  },
  {
    title: "Disabled",
    description: "The content of the panel is not available yet: not focusable, not clickable.",
    render: () => (
      <List>
        <Tab disabled>Code</Tab>
      </List>
    ),
  },
  {
    title: "Several tabs",
    description: "As Tabs will arrange them; only the selected tab is in the tab order.",
    render: () => (
      <List>
        <Tab selected>Design spec</Tab>
        <Tab tabIndex={0}>Guidelines</Tab>
        <Tab disabled>Code</Tab>
      </List>
    ),
  },
  {
    title: "Long label",
    description: "One line; the tab grows with its label.",
    render: () => (
      <List>
        <Tab selected>Design preview and usage guidelines of the component</Tab>
      </List>
    ),
  },
];
