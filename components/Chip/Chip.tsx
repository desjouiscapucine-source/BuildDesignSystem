import type { HTMLAttributes, ReactNode } from "react";
import "./Chip.css";

// Variant properties: names and values exactly as approved in spec.md.
export type ChipVariant = "default";

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: ChipVariant;
  children?: ReactNode;
}

export function Chip({ variant = "default", className, children, ...rest }: ChipProps) {
  const classes = ["ds-component-name", `ds-component-name--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-component-name-label">{children}</span>
    </div>
  );
}
