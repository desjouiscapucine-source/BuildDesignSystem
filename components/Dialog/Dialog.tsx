import type { HTMLAttributes, ReactNode } from "react";
import "./Dialog.css";

// Variant properties: names and values exactly as approved in spec.md.
export type DialogVariant = "default";

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: DialogVariant;
  children?: ReactNode;
}

export function Dialog({ variant = "default", className, children, ...rest }: DialogProps) {
  const classes = ["ds-dialog", `ds-dialog--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-dialog-label">{children}</span>
    </div>
  );
}
