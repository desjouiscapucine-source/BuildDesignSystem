import type { HTMLAttributes, ReactNode } from "react";
import "./ZoomControls.css";

// Variant properties: names and values exactly as approved in spec.md.
export type ZoomControlsVariant = "default";

export interface ZoomControlsProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: ZoomControlsVariant;
  children?: ReactNode;
}

export function ZoomControls({ variant = "default", className, children, ...rest }: ZoomControlsProps) {
  const classes = ["ds-zoom-controls", `ds-zoom-controls--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-zoom-controls-label">{children}</span>
    </div>
  );
}
