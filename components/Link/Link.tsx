import type { HTMLAttributes, ReactNode } from "react";
import "./Link.css";

// Variant properties: names and values exactly as approved in spec.md.
export type LinkVariant = "default";

export interface LinkProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: LinkVariant;
  children?: ReactNode;
}

export function Link({ variant = "default", className, children, ...rest }: LinkProps) {
  const classes = ["ds-component-name", `ds-component-name--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-component-name-label">{children}</span>
    </div>
  );
}
