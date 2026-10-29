// Playground tab of the documentation site: the button live, with a control per prop.
import { definePlayground, jsx } from "../../docs/src/playground";
import { Button } from "./Button";

export const playground = definePlayground({
  controls: {
    variant: {
      type: "select",
      options: ["primary", "secondary", "tertiary", "danger"],
      default: "primary",
      description: "Level of importance of the action. Default: primary.",
    },
    children: { type: "text", default: "Save changes", description: "The label: starts with a verb, sentence case, 25 characters maximum." },
    icon: { type: "text", default: "", description: "Leading icon: a Material Symbols name (e.g. add). Decorative." },
    disabled: { type: "boolean", default: false, description: "The action is not available. Ignored with href." },
    href: { type: "text", default: "", description: "With a link: rendered as <a href>, same look. A link is never disabled." },
  },
  render: ({ variant, children, icon, disabled, href }) =>
    href ? (
      <Button variant={variant} icon={icon || undefined} href={href}>
        {children}
      </Button>
    ) : (
      <Button variant={variant} icon={icon || undefined} disabled={disabled}>
        {children}
      </Button>
    ),
  code: ({ variant, children, icon, disabled, href }) =>
    jsx("Button", { variant, icon, href, disabled: !href && disabled }, children),
});
