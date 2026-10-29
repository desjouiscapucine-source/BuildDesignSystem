// Playground tab of the documentation site: the component live, with a control per prop.
import { definePlayground, jsx } from "../../docs/src/playground";
import { SelectOption } from "./SelectOption";

export const playground = definePlayground({
  controls: {
    children: { type: "text", default: "Example", description: "The content of the component." },
  },
  render: ({ children }) => <SelectOption>{children}</SelectOption>,
  code: ({ children }) => jsx("SelectOption", {}, children),
});
