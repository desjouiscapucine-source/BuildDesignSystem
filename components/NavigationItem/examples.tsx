// Live examples shown in the Examples tab of the documentation site.
// The item sits on the brand background: each example is shown on it.
import type { ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { NavigationItem } from "./NavigationItem";

function OnBrand({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: "var(--color-background-brand)",
        padding: "var(--space-8)",
        borderRadius: "var(--radius-8)",
        width: "240px",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-8)",
      }}
    >
      {children}
    </div>
  );
}

export const examples: Example[] = [
  {
    title: "Default",
    render: () => (
      <OnBrand>
        <NavigationItem icon="bar_chart" href="#/components/navigationitem">
          Reports
        </NavigationItem>
      </OnBrand>
    ),
  },
  {
    title: "Selected",
    description: "The item of the page displayed (announced with aria-current=\"page\").",
    render: () => (
      <OnBrand>
        <NavigationItem icon="dashboard" href="#/components/navigationitem" selected>
          Dashboard
        </NavigationItem>
      </OnBrand>
    ),
  },
  {
    title: "Disabled",
    description: "To avoid: prefer hiding the item. Not reachable with Tab.",
    render: () => (
      <OnBrand>
        <NavigationItem icon="payments" href="#/components/navigationitem" disabled>
          Billing
        </NavigationItem>
      </OnBrand>
    ),
  },
  {
    title: "In a navigation",
    description: "One selected item, --space-8 between items.",
    render: () => (
      <OnBrand>
        <NavigationItem icon="dashboard" href="#/components/navigationitem" selected>
          Dashboard
        </NavigationItem>
        <NavigationItem icon="bar_chart" href="#/components/navigationitem">
          Reports
        </NavigationItem>
        <NavigationItem icon="group" href="#/components/navigationitem">
          Customers
        </NavigationItem>
        <NavigationItem icon="settings" href="#/components/navigationitem">
          Settings
        </NavigationItem>
      </OnBrand>
    ),
  },
  {
    title: "Content",
    description: "A 20-character label, and a longer label that wraps (icon aligned with the first line).",
    render: () => (
      <OnBrand>
        <NavigationItem icon="inventory_2" href="#/components/navigationitem">
          Product catalog list
        </NavigationItem>
        <NavigationItem icon="inventory_2" href="#/components/navigationitem">
          Product catalog and inventory management
        </NavigationItem>
      </OnBrand>
    ),
  },
];
