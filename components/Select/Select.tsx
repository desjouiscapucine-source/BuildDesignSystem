import type { HTMLAttributes, ReactNode } from "react";
import "./Select.css";

// Variant properties: names and values exactly as approved in spec.md.
export type SelectVariant = "default";

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: SelectVariant;
  children?: ReactNode;
}

export function Select({ variant = "default", className, children, ...rest }: SelectProps) {
  const classes = ["ds-select", `ds-select--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-select-label">{children}</span>
    </div>
  );
}
