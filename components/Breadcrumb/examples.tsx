// Live examples shown in the Examples tab of the documentation site.
import type { ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { Breadcrumb } from "./Breadcrumb";

function Narrow({ children }: { children: ReactNode }) {
  return <div style={{ width: "240px", maxWidth: "100%" }}>{children}</div>;
}

export const examples: Example[] = [
  {
    title: "Level 4 page",
    description: "A component page: three levels above it.",
    render: () => (
      <Breadcrumb
        items={[
          { label: "Documentation", href: "#/" },
          { label: "Components", href: "#/components" },
          { label: "Atoms", href: "#/components/atoms" },
        ]}
      />
    ),
  },
  {
    title: "Level 2 page",
    description: "A section of a space: one level above it.",
    render: () => <Breadcrumb items={[{ label: "Documentation", href: "#/" }]} />,
  },
  {
    title: "Level with no page",
    description: "A disabled item: plain text, skipped by Tab.",
    render: () => (
      <Breadcrumb
        items={[
          { label: "Documentation", href: "#/" },
          { label: "Templates", href: "#/components/templates", disabled: true },
          { label: "Page layout", href: "#/components/page-layout" },
        ]}
      />
    ),
  },
  {
    title: "Not enough space",
    description: "One line: the labels are cut with an ellipsis, the last item is kept whole (container narrowed here).",
    render: () => (
      <Narrow>
        <Breadcrumb
          items={[
            { label: "Documentation", href: "#/" },
            { label: "Prototypes", href: "#/prototypes" },
            { label: "Work description", href: "#/prototypes/work-description" },
          ]}
        />
      </Narrow>
    ),
  },
];
