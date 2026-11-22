// Playground tab of the documentation site: the component live, with a control per prop.
import { code, definePlayground, jsx } from "../../docs/src/playground";
import { Comment, type CommentThreadMessage } from "./Comment";

const reply = (i: number): CommentThreadMessage => ({
  name: i % 2 === 0 ? "Anne Marie Dupont" : "Capucine Desjouis",
  author: i % 2 === 0 ? "other" : "me",
  date: new Date(2026, 10, 19, 15, 2 + i),
  text: "Yes, with a 16px margin on each side.",
});

export const playground = definePlayground({
  controls: {
    open: { type: "boolean", default: true, description: "The bubble is shown (open) or only the marker (closed). Default: false." },
    selected: { type: "boolean", default: false, description: "The comment is the active one: a ring surrounds the marker. Default: false." },
    resolved: { type: "boolean", default: false, description: "The comment is resolved: the marker shows a check and Resolve becomes Reopen. Default: false." },
    name: { type: "text", default: "Capucine Desjouis", description: "Full name of the author of the first message (the marker shows their Avatar)." },
    text: { type: "text", default: "Could the primary button be full width on mobile?", description: "Text of the first message: plain text, never empty." },
    replies: { type: "number", min: 0, max: 8, default: 2, description: "Number of replies after the first message." },
    replyError: { type: "text", default: "", description: "Error under the reply field when the reply could not be sent. Empty: no error." },
    defaultReply: { type: "text", default: "", description: "First text of the reply field (a reply being written)." },
  },
  minHeight: 480,
  render: ({ open, selected, resolved, name, text, replies, replyError, defaultReply }) => (
    <div style={{ position: "relative", padding: "var(--space-8)" }}>
      <Comment
        key={`${open}-${defaultReply}`}
        messages={[
          { name, author: "me", date: new Date(2026, 10, 19, 14, 43), text },
          ...Array.from({ length: Number(replies) }, (_, i) => reply(i)),
        ]}
        defaultOpen={open}
        selected={selected}
        resolved={resolved}
        replyError={replyError || undefined}
        defaultReply={defaultReply}
      />
    </div>
  ),
  code: ({ open, selected, resolved, replyError, defaultReply }) =>
    jsx("Comment", {
      messages: code("messages"),
      defaultOpen: open,
      selected,
      resolved,
      replyError,
      defaultReply,
    }),
});
