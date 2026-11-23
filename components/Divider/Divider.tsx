import type { HTMLAttributes } from "react";
import "./Divider.css";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Direction of the line: horizontal separates stacked parts, vertical separates parts side by side. Default: horizontal. A vertical Divider takes the height of its parent: give the parent a height to control it. */
  orientation?: DividerOrientation;
}

/** A thin line that separates two parts of an interface. Decorative: hidden from screen readers, no state (spec). */
export function Divider({ orientation = "horizontal", className, ...rest }: DividerProps) {
  const classes = ["ds-divider", `ds-divider--${orientation}`, className].filter(Boolean).join(" ");
  return <span className={classes} aria-hidden="true" {...rest} />;
}
