// Playground tab of the documentation site: the breadcrumb item live, with a control per prop.
// BreadcrumbItem is a list item: it sits in a plain <ol>, as the Breadcrumb lays it out.
import { definePlayground, jsx } from "../../docs/src/playground";
import { BreadcrumbItem } from "./BreadcrumbItem";

export const playground = definePlayground({
  controls: {
    children: { type: "text", default: "Components", description: "The label: the title of the level's page, word for word, sentence case." },
    href: { type: "text", default: "#/components", description: "The page of the level the item leads to." },
    last: { type: "boolean", default: false, description: "Last item of the breadcrumb: no slash after the link. Set by the Breadcrumb." },
    disabled: {
      type: "boolean",
      default: false,
      description: "The level has no page of its own: plain text, not a link. Set by the Breadcrumb.",
    },
  },
  render: ({ children, href, last, disabled }) => (
    <ol style={{ display: "flex", gap: "var(--space-8)", margin: 0, padding: 0, listStyle: "none" }}>
      <BreadcrumbItem href={href} last={last} disabled={disabled}>
        {children}
      </BreadcrumbItem>
    </ol>
  ),
  code: ({ children, href, last, disabled }) => jsx("BreadcrumbItem", { href, last, disabled }, children),
});
