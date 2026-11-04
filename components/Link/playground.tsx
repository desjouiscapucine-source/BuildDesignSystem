// Playground tab of the documentation site: the component live, with a control per prop.
import { definePlayground, jsx } from "../../docs/src/playground";
import { Link } from "./Link";

export const playground = definePlayground({
  controls: {
    children: { type: "text", default: "Example", description: "The content of the component." },
  },
  render: ({ children }) => <Link>{children}</Link>,
  code: ({ children }) => jsx("Link", {}, children),
});
