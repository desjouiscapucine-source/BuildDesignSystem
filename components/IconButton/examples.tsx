// Live examples shown in the Examples tab of the documentation site.
import type { Example } from "../../docs/src/types";
import { IconButton, type IconButtonVariant } from "./IconButton";

const variants: IconButtonVariant[] = ["primary", "secondary", "tertiary"];

export const examples: Example[] = [
  ...variants.map((variant) => ({
    title: `${variant[0].toUpperCase()}${variant.slice(1)}`,
    description: "Open, close, and disabled.",
    render: () => (
      <div style={{ display: "flex", gap: "var(--space-8)" }}>
        <IconButton variant={variant} icon="timeline" label="Open the timeline" />
        <IconButton variant={variant} icon="close" label="Close the timeline" />
        <IconButton variant={variant} icon="close" label="Close the timeline" disabled />
      </div>
    ),
  })),
  {
    title: "Default variant",
    description: "Without the variant prop, the icon button is primary.",
    render: () => <IconButton icon="timeline" label="Open the timeline" />,
  },
];
