import { Children, type HTMLAttributes, type ReactElement } from "react";
import type { NavigationItemProps } from "../NavigationItem/NavigationItem";
import "./SideNavigation.css";

export interface SideNavigationProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Name of the navigation announced to screen readers. Default: "Main navigation". */
  label?: string;
  /** The items of the navigation: NavigationItem components only. */
  children: ReactElement<NavigationItemProps> | ReactElement<NavigationItemProps>[];
  /** Below desktop only: shown over the page (opened by a burger IconButton outside). Ignored on desktop. */
  open?: boolean;
}

export function SideNavigation({ label = "Main navigation", children, open = false, className, ...rest }: SideNavigationProps) {
  const classes = ["ds-side-navigation", open && "ds-side-navigation--open", className].filter(Boolean).join(" ");
  return (
    <nav className={classes} aria-label={label} {...rest}>
      <ul className="ds-side-navigation-list">
        {Children.map(children, (item) => (
          <li className="ds-side-navigation-entry">{item}</li>
        ))}
      </ul>
    </nav>
  );
}
