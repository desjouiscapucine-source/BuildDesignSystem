import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Chip.css";

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled"> {
  /** `true` on the chip whose choice is active. Set by the ChipGroup, never by hand. Default: false. */
  selected?: boolean;
  /** The label: 1 to 3 words, sentence case, text only. Cut with an ellipsis on one line. */
  children: ReactNode;
}

/** One choice of a chip group: a toggle button (`aria-pressed`). No disabled state (spec). */
export function Chip({ selected = false, children, className, ...rest }: ChipProps) {
  const classes = ["ds-chip", className].filter(Boolean).join(" ");
  return (
    <button type="button" className={classes} aria-pressed={selected} {...rest}>
      <span className="ds-chip-label">{children}</span>
    </button>
  );
}
