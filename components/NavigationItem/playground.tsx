// Playground tab of the documentation site: the navigation item live, with a control per prop.
// The item sits on the brand background, as in the side navigation.
import { definePlayground, jsx } from "../../docs/src/playground";
import { NavigationItem } from "./NavigationItem";

export const playground = definePlayground({
  controls: {
    children: { type: "text", default: "Reports", description: "The label: a noun, same as the page title, 20 characters maximum." },
    icon: { type: "text", default: "bar_chart", description: "Icon before the label: a Material Symbols name. Required at the top level." },
    href: { type: "text", default: "#", description: "The page the item leads to." },
    selected: { type: "boolean", default: false, description: "The item of the page currently displayed. Ignored when disabled." },
    disabled: { type: "boolean", default: false, description: "The page is not available (to avoid: prefer hiding the item)." },
  },
  render: ({ children, icon, href, selected, disabled }) => (
    <div style={{ background: "var(--color-background-brand)", padding: "var(--space-8)", borderRadius: "var(--radius-8)", width: "240px" }}>
      {disabled ? (
        <NavigationItem icon={icon} href={href} disabled>
          {children}
        </NavigationItem>
      ) : (
        <NavigationItem icon={icon} href={href} selected={selected}>
          {children}
        </NavigationItem>
      )}
    </div>
  ),
  code: ({ children, icon, href, selected, disabled }) =>
    jsx("NavigationItem", { icon, href, selected: !disabled && selected, disabled }, children),
});
