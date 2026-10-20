import type { HTMLAttributes, ReactNode } from "react";
import "./ComponentName.css";

// Variant properties: names and values exactly as approved in spec.md.
export type ComponentNameVariant = "default";

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: ComponentNameVariant;
  children?: ReactNode;
}

export function ComponentName({ variant = "default", className, children, ...rest }: ComponentNameProps) {
  const classes = ["ds-component-name", `ds-component-name--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-component-name-label">{children}</span>
    </div>
  );
}
