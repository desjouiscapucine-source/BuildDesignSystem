import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

/** Level of importance of the action (spec: `variant`). */
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger";

interface ButtonBaseProps {
  /** Level of importance of the action. Default: "primary". */
  variant?: ButtonVariant;
  /** Leading icon: a Material Symbols name (e.g. "add"). Decorative. */
  icon?: string;
  /** The label: starts with a verb, sentence case, 25 characters maximum. */
  children: ReactNode;
}

/** Action: rendered as <button>. */
export type ButtonAsButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & { href?: undefined };

/** Navigation to another page: rendered as <a href>. A link cannot be disabled. */
export type ButtonAsLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { href: string; disabled?: never };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", icon, children, className, ...rest } = props;
  const classes = ["ds-button", `ds-button--${variant}`, className].filter(Boolean).join(" ");

  const content = (
    <>
      {icon && (
        <span className="ds-icon ds-button-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="ds-button-label">{children}</span>
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  // type="button" by default: in a form, only a button with type="submit" sends the form.
  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
