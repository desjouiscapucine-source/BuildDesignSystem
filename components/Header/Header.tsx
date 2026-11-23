import type { HTMLAttributes, ReactNode } from "react";
import { Divider } from "../Divider/Divider";
import { IconButton } from "../IconButton/IconButton";
import "./Header.css";

/** The brand of the Header: the logo and the name, one link. */
export interface HeaderBrand {
  /** The logo: the URL of an image. Decorative. */
  logo: string;
  /** The name, on one line. Hidden below tablet; the link keeps the accessible name "<name>, home". */
  name: string;
  /** Destination of the link: the landing page. */
  href: string;
}

export interface HeaderProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** The brand: logo, name and link. */
  brand: HeaderBrand;
  /** State of the burger, shown below desktop: the side navigation is open (true) or closed (false). */
  menuOpen: boolean;
  /** What the burger does when it is pressed. */
  onMenuClick: () => void;
  /** The id of the side navigation the burger opens (`aria-controls`). */
  menuControls?: string;
  /** The search field (a TextInput of type search). Placed after the brand, behind a Divider. */
  search?: ReactNode;
  /** A content of the site shown next to the search (e.g. a clock), with its own look. Hidden below desktop. */
  info?: ReactNode;
  /** The actions: IconButtons, the log in / log out button last. Placed at the right, behind a Divider. */
  actions?: ReactNode;
}

/** The top bar of a page: brand, search and actions available on every page. Fixed at the top (spec). */
export function Header({ brand, menuOpen, onMenuClick, menuControls, search, info, actions, className, ...rest }: HeaderProps) {
  const classes = ["ds-header", className].filter(Boolean).join(" ");
  return (
    <header className={classes} {...rest}>
      <IconButton
        className="ds-header-menu"
        variant="primary"
        icon={menuOpen ? "close" : "menu"}
        label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls={menuControls}
        onClick={onMenuClick}
      />
      <a className="ds-header-brand" href={brand.href} aria-label={`${brand.name}, home`}>
        <img className="ds-header-logo" src={brand.logo} alt="" />
        <span className="ds-header-brand-name">{brand.name}</span>
      </a>
      {search && (
        <>
          <Divider className="ds-header-divider" orientation="vertical" />
          <div className="ds-header-search">{search}</div>
        </>
      )}
      {info && <div className="ds-header-info">{info}</div>}
      {actions && (
        <div className="ds-header-actions">
          <Divider className="ds-header-divider" orientation="vertical" />
          {actions}
        </div>
      )}
    </header>
  );
}
