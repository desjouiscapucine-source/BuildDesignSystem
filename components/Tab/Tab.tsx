import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import "./Tab.css";

interface TabBaseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type" | "disabled"> {
  /** The label: names the content of the panel, one to three words, sentence case, text only. */
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

/** Selected and disabled cannot be combined (spec: forbidden combination). */
export type TabProps = TabBaseProps &
  (
    | {
        /** The tab whose panel is shown. Set by Tabs. */
        selected: true;
        disabled?: false;
      }
    | {
        /** The tab whose panel is shown. Set by Tabs. */
        selected?: false;
        /** The content of the panel is not available yet: not focusable, not clickable. */
        disabled?: boolean;
      }
  );

/**
 * One tab of a tab list, that shows one panel of the page. Used only inside Tabs, which sets
 * `selected`, the roving `tabIndex`, `id` / `aria-controls` and the arrow keys.
 */
export function Tab({ selected = false, disabled = false, tabIndex, className, children, ref, ...rest }: TabProps) {
  const classes = ["ds-tab", selected && "ds-tab--selected", className].filter(Boolean).join(" ");
  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      role="tab"
      className={classes}
      aria-selected={selected}
      disabled={disabled}
      // Roving tab index (WAI-ARIA tabs): only the selected tab is in the tab order.
      tabIndex={tabIndex ?? (selected ? 0 : -1)}
    >
      {children}
    </button>
  );
}
