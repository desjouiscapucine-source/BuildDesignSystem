// Live examples shown in the Examples tab of the documentation site.
// In a product, the side navigation takes the full height of the screen;
// here its height is reduced to fit in the page.
import type { Example } from "../../docs/src/types";
import { NavigationItem } from "../NavigationItem/NavigationItem";
import { SideNavigation } from "./SideNavigation";

const href = "#/components/sidenavigation";

export const examples: Example[] = [
  {
    title: "Default",
    description: "A list of NavigationItems, one selected. Height reduced for the documentation.",
    render: () => (
      <SideNavigation style={{ height: "360px" }}>
        <NavigationItem icon="dashboard" href={href} selected>
          Dashboard
        </NavigationItem>
        <NavigationItem icon="bar_chart" href={href}>
          Reports
        </NavigationItem>
        <NavigationItem icon="group" href={href}>
          Customers
        </NavigationItem>
        <NavigationItem icon="inventory_2" href={href}>
          Products
        </NavigationItem>
        <NavigationItem icon="settings" href={href}>
          Settings
        </NavigationItem>
      </SideNavigation>
    ),
  },
  {
    title: "Many items",
    description: "When the items do not fit in the height, the navigation scrolls.",
    render: () => (
      <SideNavigation style={{ height: "240px" }} label="Admin navigation">
        {[
          ["dashboard", "Dashboard"],
          ["bar_chart", "Reports"],
          ["group", "Customers"],
          ["inventory_2", "Products"],
          ["local_shipping", "Deliveries"],
          ["payments", "Payments"],
          ["campaign", "Campaigns"],
          ["settings", "Settings"],
        ].map(([icon, name], index) => (
          <NavigationItem key={icon} icon={icon} href={href} selected={index === 0}>
            {name}
          </NavigationItem>
        ))}
      </SideNavigation>
    ),
  },
];
