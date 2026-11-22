import type { HTMLAttributes, ReactNode } from "react";
import { Avatar } from "../Avatar/Avatar";
import { IconButton } from "../IconButton/IconButton";
import "./CommentMessage.css";

/** Place of the message in the thread (spec: `position`). */
export type CommentMessagePosition = "first" | "reply";
/** Who wrote the message (spec: `author`). */
export type CommentMessageAuthor = "other" | "me";

export interface CommentMessageProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Place of the message in the thread: the first message, or a reply (separator above). Only one "first" per thread. Default: "first". */
  position?: CommentMessagePosition;
  /** Who wrote the message: "me" for the signed-in user (background, "…" button, hover), "other" otherwise. Default: "other". */
  author?: CommentMessageAuthor;
  /** Full name of the author (first name and last name), never an identifier or an e-mail address. */
  name: string;
  /** When the message was written. Always shown as an absolute date and time ("19 Nov 2026, 14:43"). */
  date: Date;
  /** The message was changed: "· Edited" is shown after the date. Default: false. */
  edited?: boolean;
  /** Called when the "…" button is clicked (author "me" only): the application opens the options of the message (Edit, Delete). */
  onActionsClick?: () => void;
  /** The text of the message: plain text, never empty. */
  children: ReactNode;
}

const dayMonthYear = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
const hourMinute = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

/** "19 Nov 2026, 14:43" — always absolute, 24-hour time (spec, Content). */
function formatDate(date: Date): string {
  return `${dayMonthYear.format(date)}, ${hourMinute.format(date)}`;
}

/** One message of a comment thread: author avatar and name, date and text. Only the author ("me") can open the message actions (spec). */
export function CommentMessage({
  position = "first",
  author = "other",
  name,
  date,
  edited = false,
  onActionsClick,
  className,
  children,
  ...rest
}: CommentMessageProps) {
  const classes = ["ds-comment-message", `ds-comment-message--${position}`, `ds-comment-message--${author}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes} {...rest}>
      <div className="ds-comment-message-header">
        {/* The name is written next to the avatar: the avatar is decorative. */}
        <Avatar name={name} size="small" />
        {/* Name and date: side by side; when they do not fit, the date goes under the name (spec). */}
        <div className="ds-comment-message-meta">
          <span className="ds-comment-message-name">{name}</span>
          {author === "me" && <span className="ds-comment-message-hidden"> (you)</span>}
          <span className="ds-comment-message-date">
            <time dateTime={Number.isNaN(date.getTime()) ? undefined : date.toISOString()}>{formatDate(date)}</time>
            {edited && " · Edited"}
          </span>
        </div>
        {author === "me" && (
          // Hidden with opacity, never display / visibility: the button stays in the Tab order (guidelines).
          <IconButton
            variant="tertiary"
            icon="more_horiz"
            label="Open message actions"
            className="ds-comment-message-actions"
            onClick={onActionsClick}
          />
        )}
      </div>
      <p className="ds-comment-message-text">{children}</p>
    </div>
  );
}
