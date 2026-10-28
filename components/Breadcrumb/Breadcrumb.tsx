import type { HTMLAttributes } from "react";
import { BreadcrumbItem } from "../BreadcrumbItem/BreadcrumbItem";
import "./Breadcrumb.css";

export interface BreadcrumbLevel {
  /** The title of the level's page, word for word. */
  label: string;
  /** The page of the level. */
  href: string;
  /** The level has no page of its own: shown as plain text. */
  disabled?: boolean;
}

export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** The levels above the page, from Level 0 down to the parent of the current page (at least one). The current page is not a level. */
  items: BreadcrumbLevel[];
}

/** Shows where the page sits and goes back to any level above it. Sets `last` on the final item. */
export function Breadcrumb({ items, className, ...rest }: BreadcrumbProps) {
  const classes = ["ds-breadcrumb", className].filter(Boolean).join(" ");
  return (
    <nav aria-label="Breadcrumb" className={classes} {...rest}>
      <ol className="ds-breadcrumb-list">
        {items.map((item, index) => (
          <BreadcrumbItem key={item.href} href={item.href} disabled={item.disabled} last={index === items.length - 1}>
            {item.label}
          </BreadcrumbItem>
        ))}
      </ol>
    </nav>
  );
}
