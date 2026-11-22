import type { HTMLAttributes, ReactNode } from "react";
import "./Avatar.css";

// Variant properties: names and values exactly as approved in spec.md.
export type AvatarVariant = "default";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: AvatarVariant;
  children?: ReactNode;
}

export function Avatar({ variant = "default", className, children, ...rest }: AvatarProps) {
  const classes = ["ds-avatar", `ds-avatar--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-avatar-label">{children}</span>
    </div>
  );
}
