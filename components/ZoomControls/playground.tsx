// Playground tab of the documentation site: the component live, with a control per prop.
import { definePlayground, jsx } from "../../docs/src/playground";
import { ZoomControls } from "./ZoomControls";

export const playground = definePlayground({
  controls: {
    children: { type: "text", default: "Example", description: "The content of the component." },
  },
  render: ({ children }) => <ZoomControls>{children}</ZoomControls>,
  code: ({ children }) => jsx("ZoomControls", {}, children),
});
