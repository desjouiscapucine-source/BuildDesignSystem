import type { HTMLAttributes, ReactNode } from "react";
import "./SelectOption.css";

// Variant properties: names and values exactly as approved in spec.md.
export type SelectOptionVariant = "default";

export interface SelectOptionProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: SelectOptionVariant;
  children?: ReactNode;
}

export function SelectOption({ variant = "default", className, children, ...rest }: SelectOptionProps) {
  const classes = ["ds-select-option", `ds-select-option--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-select-option-label">{children}</span>
    </div>
  );
}
