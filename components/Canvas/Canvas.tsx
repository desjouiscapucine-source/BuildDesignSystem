import type { HTMLAttributes, ReactNode } from "react";
import "./Canvas.css";

// Variant properties: names and values exactly as approved in spec.md.
export type CanvasVariant = "default";

export interface CanvasProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: CanvasVariant;
  children?: ReactNode;
}

export function Canvas({ variant = "default", className, children, ...rest }: CanvasProps) {
  const classes = ["ds-canvas", `ds-canvas--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-canvas-label">{children}</span>
    </div>
  );
}
