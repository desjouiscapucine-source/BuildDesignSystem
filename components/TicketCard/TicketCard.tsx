import type { HTMLAttributes, ReactNode } from "react";
import "./TicketCard.css";

// Variant properties: names and values exactly as approved in spec.md.
export type TicketCardVariant = "default";

export interface TicketCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: TicketCardVariant;
  children?: ReactNode;
}

export function TicketCard({ variant = "default", className, children, ...rest }: TicketCardProps) {
  const classes = ["ds-ticket-card", `ds-ticket-card--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-ticket-card-label">{children}</span>
    </div>
  );
}
