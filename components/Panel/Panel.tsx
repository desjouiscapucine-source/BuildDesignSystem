import type { HTMLAttributes, ReactNode } from "react";
import "./Panel.css";

// Variant properties: names and values exactly as approved in spec.md.
export type PanelVariant = "default";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: PanelVariant;
  children?: ReactNode;
}

export function Panel({ variant = "default", className, children, ...rest }: PanelProps) {
  const classes = ["ds-panel", `ds-panel--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-panel-label">{children}</span>
    </div>
  );
}
