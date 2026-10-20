import type { ButtonHTMLAttributes } from "react";
import "./IconButton.css";

/** Level of importance of the action (spec: `variant`). */
export type IconButtonVariant = "primary" | "secondary" | "tertiary";

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
  /** Level of importance of the action. Default: "primary". */
  variant?: IconButtonVariant;
  /** The icon: a Material Symbols name (e.g. "close", "timeline"). */
  icon: string;
  /** Name of the action announced to screen readers; starts with a verb (e.g. "Close the timeline"). */
  label: string;
}

export function IconButton({ variant = "primary", icon, label, className, ...rest }: IconButtonProps) {
  const classes = ["ds-icon-button", `ds-icon-button--${variant}`, className].filter(Boolean).join(" ");
  return (
    // type="button" by default: in a form, it does not send the form (like the Button).
    <button type="button" className={classes} aria-label={label} {...rest}>
      <span className="ds-icon ds-icon-button-icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
