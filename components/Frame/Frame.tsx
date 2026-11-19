import type { HTMLAttributes, ReactNode } from "react";
import "./Frame.css";

// Variant properties: names and values exactly as approved in spec.md.
export type FrameVariant = "default";

export interface FrameProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: FrameVariant;
  children?: ReactNode;
}

export function Frame({ variant = "default", className, children, ...rest }: FrameProps) {
  const classes = ["ds-frame", `ds-frame--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-frame-label">{children}</span>
    </div>
  );
}
