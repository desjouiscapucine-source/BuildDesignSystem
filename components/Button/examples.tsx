// Live examples shown in the Examples tab of the documentation site.
import type { Example } from "../../docs/src/types";
import { Button, type ButtonVariant } from "./Button";

const variants: ButtonVariant[] = ["primary", "secondary", "tertiary", "danger"];
const labels: Record<ButtonVariant, string> = {
  primary: "Save changes",
  secondary: "Export",
  tertiary: "Learn more",
  danger: "Delete",
};

export const examples: Example[] = [
  ...variants.map((variant) => ({
    title: `${variant[0].toUpperCase()}${variant.slice(1)}`,
    description: "Text only, with a leading icon, and disabled.",
    render: () => (
      <>
        <Button variant={variant}>{labels[variant]}</Button>
        <Button variant={variant} icon={variant === "danger" ? "delete" : "add"}>
          {labels[variant]}
        </Button>
        <Button variant={variant} disabled>
          {labels[variant]}
        </Button>
        <Button variant={variant} icon={variant === "danger" ? "delete" : "add"} disabled>
          {labels[variant]}
        </Button>
      </>
    ),
  })),
  {
    title: "Default variant",
    description: "Without the variant prop, the button is primary.",
    render: () => <Button>Confirm</Button>,
  },
  {
    title: "Navigation",
    description: "With href, the button is rendered as a link (<a href>). Same look.",
    render: () => (
      <Button href="#/components/button" icon="arrow_forward" variant="secondary">
        Go to the button page
      </Button>
    ),
  },
  {
    title: "Button group",
    description: "Main action on the right, --space-8 between buttons, wraps on small screens.",
    render: () => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-8)" }}>
        <Button variant="tertiary">Learn more</Button>
        <Button variant="secondary">Cancel</Button>
        <Button>Save</Button>
      </div>
    ),
  },
  {
    title: "Content",
    description: "Short label, 25-character label, and a longer label cut with an ellipsis (in a 200px space).",
    render: () => (
      <>
        <Button>Save</Button>
        <Button icon="download">Download the report now</Button>
        <div style={{ width: "200px" }}>
          <Button icon="download">Download the complete annual report</Button>
        </div>
      </>
    ),
  },
];
