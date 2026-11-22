// Playground tab of the documentation site: the component live, with a control per prop.
import { definePlayground, jsx } from "../../docs/src/playground";
import { CommentMessage } from "./CommentMessage";

export const playground = definePlayground({
  controls: {
    children: { type: "text", default: "Example", description: "The content of the component." },
  },
  render: ({ children }) => <CommentMessage>{children}</CommentMessage>,
  code: ({ children }) => jsx("CommentMessage", {}, children),
});
