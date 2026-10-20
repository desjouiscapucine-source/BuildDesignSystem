// SideNavigation design preview (stage 1) — NOT the final component code.
// Uses the coded NavigationItem (complete). Width: --size-side-navigation.
import type { PreviewProps } from "../../../docs/src/types";
import { NavigationItem } from "../../NavigationItem/NavigationItem";

export function Preview({ text }: PreviewProps) {
  return (
    <nav
      aria-label="Main navigation"
      style={{
        width: "var(--size-side-navigation)",
        height: "360px",
        overflowY: "auto",
        boxSizing: "border-box",
        background: "var(--preview-background)",
        padding: "var(--preview-padding)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--preview-gap)",
      }}
    >
      <NavigationItem icon="dashboard" href="#/components/sidenavigation" selected>
        {text}
      </NavigationItem>
      <NavigationItem icon="bar_chart" href="#/components/sidenavigation">
        Reports
      </NavigationItem>
      <NavigationItem icon="group" href="#/components/sidenavigation">
        Customers
      </NavigationItem>
      <NavigationItem icon="inventory_2" href="#/components/sidenavigation">
        Products
      </NavigationItem>
      <NavigationItem icon="settings" href="#/components/sidenavigation">
        Settings
      </NavigationItem>
    </nav>
  );
}
