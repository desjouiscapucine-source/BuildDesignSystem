import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import "./SelectOption.css";

interface SelectOptionBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "role"> {
  /** Icon before the label: a Material Symbols name (e.g. "schedule"), decorative. Every option of a list has one, or none. */
  icon?: string;
  /** The label: sentence case, no punctuation, 25 characters maximum. */
  children: ReactNode;
}

/** `selected` and `disabled` cannot be combined: the chosen option always stays available. */
export type SelectOptionProps = SelectOptionBaseProps &
  (
    | { /** The option currently chosen in the Select. */ selected?: boolean; disabled?: false }
    | { selected?: false; /** The option is shown but cannot be chosen (to avoid: prefer hiding it). */ disabled: true }
  );

/**
 * One option of the Select list (WAI-ARIA listbox pattern: role="option").
 * The keyboard is handled by the Select, which moves the focus between the options (tabIndex -1).
 */
export function SelectOption({ icon, selected = false, disabled = false, className, onClick, children, ...rest }: SelectOptionProps) {
  const classes = ["ds-select-option", className].filter(Boolean).join(" ");
  return (
    <div
      role="option"
      tabIndex={-1}
      className={classes}
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        // A disabled option cannot be chosen: a click does nothing.
        if (disabled) return;
        onClick?.(event);
      }}
      {...rest}
    >
      {icon && (
        <span className="ds-icon ds-select-option-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="ds-select-option-label">{children}</span>
      {selected && (
        <span className="ds-icon ds-select-option-check" aria-hidden="true">
          check
        </span>
      )}
    </div>
  );
}
