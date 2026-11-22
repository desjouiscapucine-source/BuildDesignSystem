// Playground tab of the documentation site: the component live, with a control per prop.
import { code, definePlayground, jsx } from "../../docs/src/playground";
import { CommentMessage, type CommentMessageAuthor, type CommentMessagePosition } from "./CommentMessage";

export const playground = definePlayground({
  controls: {
    position: {
      type: "select",
      options: ["first", "reply"],
      default: "first",
      description: "Place of the message in the thread: the first message, or a reply (separator above). Only one \"first\" per thread. Default: first.",
    },
    author: {
      type: "select",
      options: ["other", "me"],
      default: "other",
      description: "Who wrote the message: me for the signed-in user (background, \"…\" button, hover), other otherwise. Default: other.",
    },
    name: { type: "text", default: "Capucine Desjouis", description: "Full name of the author (first name and last name)." },
    date: { type: "text", default: "2026-11-19T14:43", description: "Date and time of the message (ISO, e.g. 2026-11-19T14:43), always shown as an absolute date." },
    edited: { type: "boolean", default: false, description: "The message was changed: \"· Edited\" after the date. Default: false." },
    children: { type: "text", default: "Could the primary button be full width on mobile?", description: "The text of the message: plain text, never empty." },
  },
  render: ({ position, author, name, date, edited, children }) => (
    <div style={{ width: "var(--size-dialog-small)", maxWidth: "100%" }}>
      <CommentMessage
        position={position as CommentMessagePosition}
        author={author as CommentMessageAuthor}
        name={name}
        date={new Date(date)}
        edited={edited}
      >
        {children}
      </CommentMessage>
    </div>
  ),
  code: ({ position, author, name, date, edited, children }) =>
    jsx(
      "CommentMessage",
      {
        position: position === "first" ? "" : position,
        author: author === "other" ? "" : author,
        name,
        date: code(`new Date("${date}")`),
        edited,
      },
      children,
    ),
});
