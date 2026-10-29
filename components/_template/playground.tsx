// Playground tab of the documentation site: the component live, with a control per prop.
import { definePlayground, jsx } from "../../docs/src/playground";
import { ComponentName } from "./ComponentName";

export const playground = definePlayground({
  controls: {
    children: { type: "text", default: "Example", description: "The content of the component." },
  },
  render: ({ children }) => <ComponentName>{children}</ComponentName>,
  code: ({ children }) => jsx("ComponentName", {}, children),
});
