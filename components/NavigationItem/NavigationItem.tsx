import type { AnchorHTMLAttributes, ReactNode } from "react";
import "./NavigationItem.css";

interface NavigationItemBaseProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> {
  /** Icon before the label: a Material Symbols name (e.g. "dashboard"). Required, decorative. */
  icon: string;
  /** The page the item leads to. */
  href: string;
  /** The label: a noun, same as the page title, 20 characters maximum. */
  children: ReactNode;
}

/** `selected` and `disabled` cannot be combined: the page displayed is always available. */
export type NavigationItemProps = NavigationItemBaseProps &
  (
    | { /** The item of the page currently displayed. */ selected?: boolean; disabled?: false }
    | { selected?: false; /** The page is not available (to avoid: prefer hiding the item). */ disabled: true }
  );

export function NavigationItem({ icon, href, selected = false, disabled = false, children, className, ...rest }: NavigationItemProps) {
  const classes = ["ds-navigation-item", className].filter(Boolean).join(" ");
  return (
    <a
      className={classes}
      // A disabled item has no href: it cannot be reached with Tab nor activated.
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      // Selected item = page displayed: announced as the current page to screen readers.
      aria-current={selected ? "page" : undefined}
      {...rest}
    >
      <span className="ds-icon ds-navigation-item-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="ds-navigation-item-label">{children}</span>
    </a>
  );
}
