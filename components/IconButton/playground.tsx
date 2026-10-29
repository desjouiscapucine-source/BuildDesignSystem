// Playground tab of the documentation site: the icon button live, with a control per prop.
import { definePlayground, jsx } from "../../docs/src/playground";
import { IconButton } from "./IconButton";

export const playground = definePlayground({
  controls: {
    variant: {
      type: "select",
      options: ["primary", "secondary", "tertiary"],
      default: "primary",
      description: "Level of importance of the action. Default: primary.",
    },
    icon: { type: "icon", default: "close", description: "The icon: a Material Symbols name (e.g. close, timeline)." },
    label: {
      type: "text",
      default: "Close the timeline",
      description: "Name of the action announced to screen readers; starts with a verb.",
    },
    disabled: { type: "boolean", default: false, description: "The action is not available." },
  },
  render: ({ variant, icon, label, disabled }) => <IconButton variant={variant} icon={icon} label={label} disabled={disabled} />,
  code: ({ variant, icon, label, disabled }) => jsx("IconButton", { variant, icon, label, disabled }),
});
