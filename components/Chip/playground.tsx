// Playground tab of the documentation site: the chip live, with a control per prop.
import { definePlayground, jsx } from "../../docs/src/playground";
import { Chip } from "./Chip";

export const playground = definePlayground({
  controls: {
    children: { type: "text", default: "Components", description: "The label: 1 to 3 words, sentence case, text only." },
    selected: {
      type: "boolean",
      default: false,
      description: "The chip whose choice is active. Set by the ChipGroup, never by hand. Default: false.",
    },
  },
  render: ({ children, selected }) => <Chip selected={selected}>{children}</Chip>,
  code: ({ children, selected }) => jsx("Chip", { selected }, children),
});
