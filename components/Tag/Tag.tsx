import type { HTMLAttributes, ReactNode } from "react";
import "./Tag.css";

export type TagTone = "neutral" | "brand" | "success" | "warning" | "error" | "info";

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Color of the tag: neutral for a category, brand to highlight content (never a status), a feedback tone only when it matches the meaning. Default: neutral. */
  tone?: TagTone;
  /** Icon before the label: a Material Symbols name (e.g. check_circle). Decorative, only to reinforce the label. */
  icon?: string;
  /** The label: 1 or 2 words, sentence case. Cut with an ellipsis on one line. */
  children: ReactNode;
}

/** A small label that names a category or a status, or highlights content. Not interactive (spec). */
export function Tag({ tone = "neutral", icon, children, className, ...rest }: TagProps) {
  const classes = ["ds-tag", `ds-tag--${tone}`, className].filter(Boolean).join(" ");
  return (
    <span className={classes} {...rest}>
      {icon && (
        <span className="ds-icon ds-tag-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="ds-tag-label">{children}</span>
    </span>
  );
}
