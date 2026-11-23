// Live examples shown on the component's documentation page.
import type { CSSProperties } from "react";
import type { Example } from "../../docs/src/types";
import { Divider } from "./Divider";

const stack: CSSProperties = { display: "flex", flexDirection: "column", gap: "var(--space-16)", width: "var(--size-dialog-small)", maxWidth: "100%" };
// A vertical Divider takes the height of its parent (guidelines).
const row: CSSProperties = { display: "flex", alignItems: "center", gap: "var(--space-16)", height: "var(--space-32)" };

export const examples: Example[] = [
  {
    title: "Horizontal",
    description: "Separates two stacked parts. It takes the full width of its container.",
    render: () => (
      <div style={stack}>
        <span>Account</span>
        <Divider />
        <span>Notifications</span>
      </div>
    ),
  },
  {
    title: "Vertical",
    description: "Separates parts side by side. It takes the full height of its parent.",
    render: () => (
      <div style={row}>
        <span>Brand</span>
        <Divider orientation="vertical" />
        <span>Search</span>
        <Divider orientation="vertical" />
        <span>Actions</span>
      </div>
    ),
  },
];
