// Playground tab of the documentation site: the side navigation live, with a control per prop.
// In a product, it takes the full height of the screen; here its height is reduced.
import { definePlayground, jsx } from "../../docs/src/playground";
import { NavigationItem } from "../NavigationItem/NavigationItem";
import { SideNavigation } from "./SideNavigation";

const items = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "bar_chart", label: "Reports" },
  { icon: "group", label: "Customers" },
  { icon: "inventory_2", label: "Products" },
  { icon: "settings", label: "Settings" },
];

export const playground = definePlayground({
  controls: {
    label: { type: "text", default: "Main navigation", description: "Name of the navigation announced to screen readers." },
    selected: {
      type: "select",
      options: items.map((item) => item.label),
      default: "Dashboard",
      description: "The NavigationItem of the page displayed (selected prop of the item).",
    },
  },
  render: ({ label, selected }) => (
    <SideNavigation label={label} style={{ height: "360px" }}>
      {items.map((item) => (
        <NavigationItem key={item.label} icon={item.icon} href="#" selected={item.label === selected}>
          {item.label}
        </NavigationItem>
      ))}
    </SideNavigation>
  ),
  code: ({ label, selected }) =>
    jsx(
      "SideNavigation",
      { label: label === "Main navigation" ? undefined : label },
      items.map((item) =>
        jsx("NavigationItem", { icon: item.icon, href: "/" + item.label.toLowerCase(), selected: item.label === selected }, item.label),
      ),
    ),
});
