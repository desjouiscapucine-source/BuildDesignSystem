import type { AnchorHTMLAttributes, ReactNode } from "react";
import "./Link.css";

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  /** Destination: another page, an anchor of the same page, or another site. Opens in the same tab. */
  href: string;
  /** The label: says where the link goes, a few words, no final punctuation. */
  children: ReactNode;
}

/** Text link to another page or place. Takes the text style of the surrounding text; always underlined. */
export function Link({ className, children, ...rest }: LinkProps) {
  const classes = ["ds-link", className].filter(Boolean).join(" ");
  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
}
