import type { HTMLAttributes, ReactNode } from "react";
import "./CommentMessage.css";

// Variant properties: names and values exactly as approved in spec.md.
export type CommentMessageVariant = "default";

export interface CommentMessageProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: CommentMessageVariant;
  children?: ReactNode;
}

export function CommentMessage({ variant = "default", className, children, ...rest }: CommentMessageProps) {
  const classes = ["ds-comment-message", `ds-comment-message--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-comment-message-label">{children}</span>
    </div>
  );
}
