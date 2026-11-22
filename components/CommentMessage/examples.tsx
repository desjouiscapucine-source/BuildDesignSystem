// Live examples shown in the Examples tab of the documentation site.
import type { Example } from "../../docs/src/types";
import { CommentMessage } from "./CommentMessage";

const date = new Date(2026, 10, 19, 14, 43);
const thread = { display: "flex", flexDirection: "column", width: "var(--size-dialog-small)", maxWidth: "100%" } as const;
const text = "Could the primary button be full width on mobile?";

export const examples: Example[] = [
  {
    title: "Other author",
    description: "author = other (default): no background, no button, no hover.",
    render: () => (
      <div style={thread}>
        <CommentMessage name="Anne Marie Dupont" date={date}>
          {text}
        </CommentMessage>
      </div>
    ),
  },
  {
    title: "Signed-in user",
    description: "author = me: background, the \"…\" button on hover and focus (always shown on touch screens), hover state layer.",
    render: () => (
      <div style={thread}>
        <CommentMessage author="me" name="Capucine Desjouis" date={date}>
          {text}
        </CommentMessage>
      </div>
    ),
  },
  {
    title: "Thread",
    description: "One first message, then replies (separator above each reply), chronological order, no space between messages.",
    render: () => (
      <div style={thread}>
        <CommentMessage author="me" name="Capucine Desjouis" date={date}>
          {text}
        </CommentMessage>
        <CommentMessage position="reply" name="Anne Marie Dupont" date={new Date(2026, 10, 19, 15, 2)}>
          Yes, on mobile the button spans the width of the screen.
        </CommentMessage>
        <CommentMessage position="reply" author="me" name="Capucine Desjouis" date={new Date(2026, 10, 20, 9, 15)} edited>
          Thanks, I will update the spec.
        </CommentMessage>
      </div>
    ),
  },
  {
    title: "Edited",
    description: "edited: \"· Edited\" after the date, with no second date.",
    render: () => (
      <div style={thread}>
        <CommentMessage name="Anne Marie Dupont" date={date} edited>
          {text}
        </CommentMessage>
      </div>
    ),
  },
  {
    title: "Long author name",
    description: "One line, cut with an ellipsis; the date and the button stay visible.",
    render: () => (
      <div style={thread}>
        <CommentMessage author="me" name="Anne-Marie Fontaine-Delacroix de Montmorency" date={date} edited>
          {text}
        </CommentMessage>
      </div>
    ),
  },
  {
    title: "Long text",
    description: "The text wraps and is shown in full, with no limit.",
    render: () => (
      <div style={thread}>
        <CommentMessage name="Anne Marie Dupont" date={date}>
          {`${text} The label of the secondary button also wraps onto two lines on the smallest screens, and the icon moves above it, so we should decide the behavior of both buttons together before the next review of the checkout screens.`}
        </CommentMessage>
      </div>
    ),
  },
];
