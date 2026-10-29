// Playground tab of the documentation site: the breadcrumb live, with a control per prop.
import { code, definePlayground, jsx } from "../../docs/src/playground";
import { Breadcrumb, type BreadcrumbLevel } from "./Breadcrumb";

const levels: BreadcrumbLevel[] = [
  { label: "Documentation", href: "#/" },
  { label: "Components", href: "#/components" },
  { label: "Atoms", href: "#/components/atoms" },
];

export const playground = definePlayground({
  controls: {
    items: {
      type: "number",
      min: 1,
      max: levels.length,
      default: levels.length,
      description: "The levels above the page, from Level 0 down to the parent (at least one). Here: how many.",
    },
  },
  render: ({ items }) => <Breadcrumb items={levels.slice(0, items)} />,
  code: ({ items }) =>
    jsx("Breadcrumb", {
      items: code(
        `[\n${levels
          .slice(0, items)
          .map((level) => `  { label: ${JSON.stringify(level.label)}, href: ${JSON.stringify(level.href)} },`)
          .join("\n")}\n]`,
      ),
    }),
});
