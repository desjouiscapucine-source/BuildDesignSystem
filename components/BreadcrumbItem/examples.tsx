// Live examples shown in the Examples tab of the documentation site.
// BreadcrumbItem is a list item: each example sits in a plain <ol>, as the Breadcrumb will lay it out.
import type { ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { BreadcrumbItem } from "./BreadcrumbItem";

function Row({ children, width }: { children: ReactNode; width?: string }) {
  return (
    <ol style={{ display: "flex", gap: "var(--space-8)", margin: 0, padding: 0, listStyle: "none", width, maxWidth: "100%" }}>
      {children}
    </ol>
  );
}

export const examples: Example[] = [
  {
    title: "Default",
    description: "A link followed by a slash.",
    render: () => (
      <Row>
        <BreadcrumbItem href="#/components">Components</BreadcrumbItem>
      </Row>
    ),
  },
  {
    title: "Last",
    description: "The last item of a breadcrumb: no slash.",
    render: () => (
      <Row>
        <BreadcrumbItem href="#/components" last>
          Components
        </BreadcrumbItem>
      </Row>
    ),
  },
  {
    title: "Disabled",
    description: "A level with no page of its own: plain text, not focusable.",
    render: () => (
      <Row>
        <BreadcrumbItem href="#/components/templates" disabled>
          Templates
        </BreadcrumbItem>
      </Row>
    ),
  },
  {
    title: "Several items",
    description: "As the Breadcrumb will arrange them; Tab goes from link to link.",
    render: () => (
      <Row>
        <BreadcrumbItem href="#/">Documentation</BreadcrumbItem>
        <BreadcrumbItem href="#/foundations">Foundations</BreadcrumbItem>
        <BreadcrumbItem href="#/foundations/layout-grid" last>
          Layout grid
        </BreadcrumbItem>
      </Row>
    ),
  },
  {
    title: "Long label",
    description: "One line; cut with an ellipsis only when there is not enough space (container narrowed here).",
    render: () => (
      <Row width="200px">
        <BreadcrumbItem href="#/prototypes">Work description: from the brief to the validated mockup</BreadcrumbItem>
      </Row>
    ),
  },
];
