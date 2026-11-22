// Live examples shown in the Examples tab of the documentation site.
import { useState } from "react";
import type { Example } from "../../docs/src/types";
import { Comment, type CommentThreadMessage } from "./Comment";

const first: CommentThreadMessage = {
  name: "Capucine Desjouis",
  author: "me",
  date: new Date(2026, 10, 19, 14, 43),
  text: "Could the primary button be full width on mobile?",
};
const replies: CommentThreadMessage[] = [
  { name: "Anne Marie Dupont", date: new Date(2026, 10, 19, 15, 2), text: "Yes, with a 16px margin on each side." },
  { name: "Capucine Desjouis", author: "me", date: new Date(2026, 10, 20, 9, 15), edited: true, text: "Thanks, I will add it to the Button guidelines." },
];
const thread = [first, ...replies];
const longThread = [
  first,
  ...Array.from({ length: 8 }, (_, i) => ({
    name: i % 2 === 0 ? "Anne Marie Dupont" : "Capucine Desjouis",
    author: i % 2 === 0 ? ("other" as const) : ("me" as const),
    date: new Date(2026, 10, 20, 9, 15 + i),
    text: "A longer reply, to show that the thread scrolls inside the bubble once it reaches the height of the visible canvas.",
  })),
];

// A canvas stand-in: the Comment is placed on it and its bubble opens to the right.
const stage = { position: "relative", minHeight: "var(--size-dialog-small)", padding: "var(--space-8)" } as const;

function Interactive() {
  const [open, setOpen] = useState(true);
  const [resolved, setResolved] = useState(false);
  const [messages, setMessages] = useState(thread);
  return (
    <div style={stage}>
      <Comment
        messages={messages}
        open={open}
        onOpenChange={setOpen}
        selected={open}
        resolved={resolved}
        onResolvedChange={setResolved}
        onReply={(text) => setMessages((all) => [...all, { name: "Capucine Desjouis", author: "me", date: new Date(), text }])}
      />
    </div>
  );
}

function Failing() {
  const [error, setError] = useState<string | undefined>();
  return (
    <div style={stage}>
      <Comment
        messages={thread}
        open
        defaultReply="Could we also test it on tablet?"
        replyError={error}
        onReply={() => setError("Your reply wasn't sent. Try again.")}
      />
    </div>
  );
}

export const examples: Example[] = [
  {
    title: "Closed",
    description: "Only the marker: the Avatar of the author of the first message. It is a button that opens the bubble.",
    render: () => (
      <div style={stage}>
        <Comment messages={thread} />
      </div>
    ),
  },
  {
    title: "Open",
    description: "The marker and the bubble: Resolve and Close, the thread, the reply field and Send (disabled while the field is empty).",
    render: () => (
      <div style={stage}>
        <Comment messages={thread} open />
      </div>
    ),
  },
  {
    title: "Selected",
    description: "The active comment: the bubble is open and a ring surrounds the marker.",
    render: () => (
      <div style={stage}>
        <Comment messages={thread} open selected />
      </div>
    ),
  },
  {
    title: "Resolved",
    description: "The marker shows a check (not dimmed) and Resolve becomes Reopen; the reply field stays shown.",
    render: () => (
      <div style={stage}>
        <Comment messages={thread} open resolved />
      </div>
    ),
  },
  {
    title: "Editing",
    description: "A reply is being written: Send is available.",
    render: () => (
      <div style={stage}>
        <Comment messages={thread} open defaultReply="Could we also test it on tablet?" />
      </div>
    ),
  },
  {
    title: "Reply not sent",
    description: "Send the reply: the text is kept and the error shows under the field.",
    render: () => <Failing />,
  },
  {
    title: "First message only",
    description: "A new comment: one message, no reply yet.",
    render: () => (
      <div style={stage}>
        <Comment messages={[first]} open />
      </div>
    ),
  },
  {
    title: "Long thread",
    description: "The bubble grows with the thread up to the height of the visible canvas, then the thread scrolls.",
    render: () => (
      <div style={{ ...stage, minHeight: "var(--size-dialog-large)" }}>
        <Comment messages={longThread} open />
      </div>
    ),
  },
  {
    title: "Narrow canvas",
    description: "The bubble fits neither on the right nor on the left of the marker: it opens under the marker, inside the visible canvas.",
    render: () => (
      <div style={{ ...stage, overflow: "hidden", width: "var(--size-dialog-small)", maxWidth: "100%", height: "var(--size-dialog-medium)", minHeight: 0 }}>
        <Comment messages={thread} open />
      </div>
    ),
  },
  {
    title: "Interactive",
    description: "Open and close with the marker, Escape or Close; resolve and reopen; send a reply (Enter or Send).",
    render: () => <Interactive />,
  },
];
