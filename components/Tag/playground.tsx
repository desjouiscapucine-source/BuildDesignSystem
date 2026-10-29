// Playground tab of the documentation site: the tag live, with a control per prop.
import { definePlayground, jsx } from "../../docs/src/playground";
import { Tag, type TagTone } from "./Tag";

export const playground = definePlayground({
  controls: {
    tone: {
      type: "select",
      options: ["neutral", "success", "warning", "error", "info"],
      default: "neutral",
      description: "Color of the tag: neutral for a category, a feedback tone only when it matches the meaning. Default: neutral.",
    },
    icon: { type: "icon", default: "", optional: true, description: "Icon before the label: a Material Symbols name. Decorative." },
    children: { type: "text", default: "Decided", description: "The label: 1 or 2 words, sentence case." },
  },
  render: ({ tone, icon, children }) => (
    <Tag tone={tone as TagTone} icon={icon || undefined}>
      {children}
    </Tag>
  ),
  code: ({ tone, icon, children }) => jsx("Tag", { tone: tone === "neutral" ? "" : tone, icon }, children),
});
