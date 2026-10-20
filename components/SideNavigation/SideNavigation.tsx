import { Children, type HTMLAttributes, type ReactElement } from "react";
import type { NavigationItemProps } from "../NavigationItem/NavigationItem";
import "./SideNavigation.css";

export interface SideNavigationProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Name of the navigation announced to screen readers. Default: "Main navigation". */
  label?: string;
  /** The items of the navigation: NavigationItem components only. */
  children: ReactElement<NavigationItemProps> | ReactElement<NavigationItemProps>[];
}

export function SideNavigation({ label = "Main navigation", children, className, ...rest }: SideNavigationProps) {
  const classes = ["ds-side-navigation", className].filter(Boolean).join(" ");
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
