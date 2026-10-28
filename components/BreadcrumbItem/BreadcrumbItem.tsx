import type { LiHTMLAttributes, ReactNode } from "react";
import "./BreadcrumbItem.css";

export interface BreadcrumbItemProps extends Omit<LiHTMLAttributes<HTMLLIElement>, "children"> {
  /** The page of the level the item leads to. */
  href: string;
  /** The label: the title of the level's page, word for word, sentence case, text only. */
  children: ReactNode;
  /** Last item of the breadcrumb: no slash after the link. Set by the Breadcrumb. */
  last?: boolean;
  /** The level has no page of its own: plain text, not a link, not focusable. Set by the Breadcrumb. */
  disabled?: boolean;
}

/** One link of a breadcrumb, to a level above the page. Used only inside a Breadcrumb (an <ol>). */
export function BreadcrumbItem({ href, children, last = false, disabled = false, className, ...rest }: BreadcrumbItemProps) {
  const classes = [
    "ds-breadcrumb-item",
    last && "ds-breadcrumb-item--last",
    disabled && "ds-breadcrumb-item--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <li className={classes} {...rest}>
      {disabled ? (
        // A level with no page: plain text, skipped by Tab, label still read.
        <span className="ds-breadcrumb-item-link">{children}</span>
      ) : (
        <a className="ds-breadcrumb-item-link" href={href}>
          {children}
        </a>
      )}
      {!last && (
        <span className="ds-breadcrumb-item-separator" aria-hidden="true">
          /
        </span>
      )}
    </li>
  );
}
