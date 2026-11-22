import { useEffect, useId, useLayoutEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent } from "react";
import { Avatar } from "../Avatar/Avatar";
import { CommentMessage, type CommentMessageAuthor } from "../CommentMessage/CommentMessage";
import { IconButton } from "../IconButton/IconButton";
import { TextInput } from "../TextInput/TextInput";
import "./Comment.css";

/** One message of the thread (spec: Content). The first message of the list is the comment, the others are replies. */
export interface CommentThreadMessage {
  /** Full name of the author (first name and last name), never an identifier or an e-mail address. */
  name: string;
  /** When the message was written (shown as an absolute date and time). */
  date: Date;
  /** The text of the message: plain text, never empty. */
  text: string;
  /** The message was changed: "· Edited" is shown after the date. Default: false. */
  edited?: boolean;
  /** "me" for the signed-in user (background, "…" button), "other" otherwise. Default: "other". */
  author?: CommentMessageAuthor;
}

export interface CommentProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  /** The thread, oldest first: the first message is the comment, the others are its replies. At least one. */
  messages: CommentThreadMessage[];
  /** The bubble is shown (open) or only the marker (closed). Controlled with `onOpenChange`. Open one comment at a time: opening a comment closes the one that was open. */
  open?: boolean;
  /** First state of the bubble when `open` is not given. Default: false (closed). */
  defaultOpen?: boolean;
  /** Called with the new state when the marker, Close, Escape or a click outside asks to open or close the bubble. */
  onOpenChange?: (open: boolean) => void;
  /** The comment is the active one: a ring surrounds the marker. Default: false. */
  selected?: boolean;
  /** The comment is resolved: the marker shows a check, and Resolve becomes Reopen. Default: false. */
  resolved?: boolean;
  /** Called with `true` by Resolve and `false` by Reopen. */
  onResolvedChange?: (resolved: boolean) => void;
  /** Called with the text of the reply when it is sent (Send button or Enter). Add the reply to `messages` once it is saved: the field is then emptied and "Reply sent" is announced. */
  onReply?: (text: string) => void;
  /** Error shown under the reply field when the reply could not be sent ("Your reply wasn't sent. Try again."). The text is kept. */
  replyError?: string;
  /** First text of the reply field (a reply being written). */
  defaultReply?: string;
  /** Called with the index of the message whose "…" button was clicked (messages of the author only). */
  onMessageActionsClick?: (index: number) => void;
}

/** The visible canvas around an element: the nearest ancestor that clips or scrolls, else the window (the page scrolls, so no limit at the bottom). */
function visibleArea(element: HTMLElement) {
  for (let parent = element.parentElement; parent; parent = parent.parentElement) {
    const { overflowX, overflowY } = getComputedStyle(parent);
    if (overflowX !== "visible" || overflowY !== "visible") return parent.getBoundingClientRect();
  }
  return { left: 0, top: 0, right: window.innerWidth, bottom: Infinity };
}

/** A comment attached to a component or a frame of the canvas: a marker that opens a bubble with the thread, a reply field and the actions (spec). */
export function Comment({
  messages,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  selected = false,
  resolved = false,
  onResolvedChange,
  onReply,
  replyError,
  defaultReply = "",
  onMessageActionsClick,
  className,
  ...rest
}: CommentProps) {
  const [ownOpen, setOwnOpen] = useState(defaultOpen);
  const open = openProp ?? ownOpen;
  const [draft, setDraft] = useState(defaultReply);
  const [announcement, setAnnouncement] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLButtonElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const awaitingSend = useRef(false);
  const lastActionsIndex = useRef(0);
  const previousOpen = useRef(open);
  const previousCount = useRef(messages.length);
  const bubbleId = useId();

  const author = messages[0]?.name ?? "";
  const accessibleName = `Comment by ${author}${resolved ? ", resolved" : ""}`;

  // The same text announced twice in a row does not change the status region: empty it first, then set it, so each one is announced.
  function announce(text: string) {
    setAnnouncement("");
    window.setTimeout(() => setAnnouncement(text), 50);
  }

  function setOpen(next: boolean) {
    if (openProp === undefined) setOwnOpen(next);
    onOpenChange?.(next);
  }

  function focusField() {
    bubbleRef.current?.querySelector("input")?.focus();
  }

  // On opening, the focus goes to the reply field (guidelines). Not on first render: a comment shown open does not take the focus.
  useEffect(() => {
    if (open && !previousOpen.current) focusField();
    previousOpen.current = open;
  }, [open]);

  // A click outside closes the bubble, without moving the focus (guidelines).
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  });

  // Near the edge of the visible canvas, the bubble flips to the left of the marker, or upward (spec).
  // The visible canvas is the nearest ancestor that clips or scrolls its content; without one, the page scrolls: only the width of the window limits the bubble.
  useLayoutEffect(() => {
    const bubble = bubbleRef.current;
    const marker = markerRef.current;
    if (!open || !bubble || !marker) return;
    bubble.removeAttribute("data-side");
    bubble.removeAttribute("data-align");
    bubble.style.removeProperty("left");
    bubble.style.removeProperty("max-width");
    const area = visibleArea(bubble);
    const rect = bubble.getBoundingClientRect();
    const markerRect = marker.getBoundingClientRect();
    const gap = rect.left - markerRect.right;
    const fitsLeft = markerRect.left - gap - rect.width >= area.left;
    if (rect.right > area.right && fitsLeft) {
      bubble.setAttribute("data-side", "left");
    } else if (rect.right > area.right) {
      // Neither side fits (narrow canvas or screen): under the marker, shifted and narrowed to stay in the visible canvas.
      bubble.setAttribute("data-side", "below");
      const width = Math.min(rect.width, area.right - area.left);
      bubble.style.maxWidth = `${width}px`;
      const left = Math.min(Math.max(markerRect.left, area.left), area.right - width);
      bubble.style.left = `${left - markerRect.left}px`;
    }
    const below = bubble.getBoundingClientRect();
    if (below.bottom > area.bottom) {
      const fitsAbove = bubble.dataset.side === "below" ? markerRect.top - gap - below.height >= area.top : markerRect.bottom - below.height >= area.top;
      if (fitsAbove) bubble.setAttribute("data-align", "end");
    }
  }, [open, messages.length]);

  // A reply was added (sent) or a message removed (deleted): focus and announcements (guidelines).
  useEffect(() => {
    const count = messages.length;
    if (count > previousCount.current && awaitingSend.current) {
      awaitingSend.current = false;
      setDraft("");
      announce("Reply sent");
      focusField();
    }
    if (count < previousCount.current && open) {
      // Focus: the "…" button of the next message of the author, or the reply field when there is none.
      const index = messages.findIndex((message, i) => i >= lastActionsIndex.current && message.author === "me");
      const items = bubbleRef.current?.querySelectorAll("[role=listitem]");
      const target = index >= 0 ? items?.[index]?.querySelector<HTMLElement>(".ds-comment-message-actions") : null;
      if (target) target.focus();
      else focusField();
    }
    previousCount.current = count;
  }, [messages, open]);

  // The reply was refused: no reply is waiting any more, so a later message is not announced as "Reply sent".
  useEffect(() => {
    if (replyError) awaitingSend.current = false;
  }, [replyError]);

  function send() {
    const text = draft.trim();
    if (text === "") return;
    awaitingSend.current = true;
    onReply?.(text);
    focusField();
  }

  function toggleResolved() {
    const next = !resolved;
    announce(next ? "Comment resolved" : "Comment reopened");
    onResolvedChange?.(next);
  }

  function handleBubbleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Escape closes the bubble from any element of it; a menu inside closes only itself (it stops the event).
    if (event.key === "Escape" && !event.defaultPrevented) {
      event.stopPropagation();
      setOpen(false);
      markerRef.current?.focus();
    }
  }

  const classes = [
    "ds-comment",
    open && "ds-comment--open",
    selected && "ds-comment--selected",
    resolved && "ds-comment--resolved",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={classes} {...rest}>
      <button
        ref={markerRef}
        type="button"
        className="ds-comment-marker"
        aria-label={accessibleName}
        aria-expanded={open}
        aria-controls={open ? bubbleId : undefined}
        onClick={() => setOpen(!open)}
      >
        {resolved ? (
          <span className="ds-comment-marker-check" aria-hidden="true">
            <span className="ds-icon">check</span>
          </span>
        ) : (
          // The button is named: the avatar inside is decorative.
          <Avatar name={author} size="medium" />
        )}
      </button>
      {open && (
        <div
          ref={bubbleRef}
          id={bubbleId}
          role="group"
          aria-label={accessibleName}
          className="ds-comment-bubble"
          onKeyDown={handleBubbleKeyDown}
        >
          <div className="ds-comment-header">
            <IconButton
              variant="tertiary"
              icon={resolved ? "undo" : "check"}
              label={resolved ? "Reopen the comment" : "Resolve the comment"}
              onClick={toggleResolved}
            />
            <IconButton variant="tertiary" icon="close" label="Close the comment" onClick={() => { setOpen(false); markerRef.current?.focus(); }} />
          </div>
          <div role="list" className="ds-comment-thread">
            {messages.map((message, index) => (
              <div role="listitem" key={index}>
                <CommentMessage
                  role="article"
                  position={index === 0 ? "first" : "reply"}
                  author={message.author}
                  name={message.name}
                  date={message.date}
                  edited={message.edited}
                  onActionsClick={() => {
                    lastActionsIndex.current = index;
                    onMessageActionsClick?.(index);
                  }}
                >
                  {message.text}
                </CommentMessage>
              </div>
            ))}
          </div>
          <div className="ds-comment-reply">
            <div className="ds-comment-field">
              <TextInput
                placeholder="Write a reply"
                value={draft}
                onChange={setDraft}
                error={replyError}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    send();
                  }
                }}
              />
            </div>
            <IconButton icon="send" label="Send the reply" disabled={draft.trim() === ""} onClick={send} />
          </div>
        </div>
      )}
      {/* Status messages: polite, without moving the focus (guidelines). Always in the page, so they are announced. */}
      <span className="ds-comment-status" role="status">
        {announcement}
      </span>
    </div>
  );
}
