// Playground tab of the documentation site: the component live, with a control per prop.
import { definePlayground, jsx } from "../../docs/src/playground";
import { Canvas } from "./Canvas";

export const playground = definePlayground({
  controls: {
    children: { type: "text", default: "Example", description: "The content of the component." },
  },
  render: ({ children }) => <Canvas>{children}</Canvas>,
  code: ({ children }) => jsx("Canvas", {}, children),
});
