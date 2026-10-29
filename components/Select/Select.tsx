import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { SelectOption } from "../SelectOption/SelectOption";
import "./Select.css";

/** One option of the list (rendered as a SelectOption). */
export interface SelectOptionItem {
  /** Value returned by `onChange`. */
  value: string;
  /** The label: sentence case, no punctuation, 25 characters maximum. */
  label: string;
  /** Icon before the label: a Material Symbols name. Every option of a list has one, or none. */
  icon?: string;
  /** The option is shown but cannot be chosen (to avoid: prefer removing it). */
  disabled?: boolean;
}

interface SelectBaseProps {
  /** Names the field: a noun, no punctuation, 25 characters maximum. */
  label: string;
  /** The options of the list. */
  options: SelectOptionItem[];
  /** Shown while no option is chosen: "Choose a …" + the noun of the label. */
  placeholder?: string;
  /** The chosen option (its `value`). Without it, the Select keeps its own value. */
  value?: string;
  /** Called with the `value` of the option chosen by the user. */
  onChange?: (value: string) => void;
  /** Called when the list opens (`true`) or closes (`false`) — e.g. to show the error when it closes without a choice. */
  onOpenChange?: (open: boolean) => void;
  /** Extra class on the root element. */
  className?: string;
  /** Id of the field. */
  id?: string;
}

/** `error` and `disabled` cannot be combined: a disabled Select cannot be corrected. */
export type SelectProps = SelectBaseProps &
  (
    | {
        /** Error message: one sentence that says how to fix it. */ error?: string;
        disabled?: false;
      }
    | { error?: undefined; /** The Select cannot be opened. */ disabled: true }
  );

/** Choice of one option in a list that opens under a field (WAI-ARIA select-only combobox + listbox). */
export function Select({
  label,
  options,
  placeholder,
  value,
  onChange,
  onOpenChange,
  error,
  disabled = false,
  className,
  id,
}: SelectProps) {
  const uid = useId();
  const fieldId = id ?? `${uid}-field`;
  const labelId = `${uid}-label`;
  const valueId = `${uid}-value`;
  const listId = `${uid}-list`;
  const errorId = `${uid}-error`;
  const optionId = (index: number) => `${uid}-option-${index}`;

  const [ownValue, setOwnValue] = useState<string | undefined>(value);
  const current = value !== undefined ? value : ownValue;
  const chosen = options.find((option) => option.value === current);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  function setOpenState(next: boolean) {
    setOpen(next);
    onOpenChange?.(next);
  }

  function openList() {
    if (disabled) return;
    // Focus on the chosen option; on the first option when none is chosen.
    const index = options.findIndex((option) => option.value === current);
    setActive(index >= 0 ? index : 0);
    setOpenState(true);
  }

  function closeList(focusField: boolean) {
    setOpenState(false);
    if (focusField) fieldRef.current?.focus();
  }

  function choose(index: number) {
    const option = options[index];
    if (!option || option.disabled) return;
    if (value === undefined) setOwnValue(option.value);
    onChange?.(option.value);
    closeList(true);
  }

  // Move the focus to the active option while the list is open.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`#${CSS.escape(optionId(active))}`)?.focus();
  }, [open, active]);

  // A click outside the list closes it without changing the value.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) closeList(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function onFieldKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    // Enter and Space open the list through the native click.
    if (event.key === "ArrowDown" && !open) {
      event.preventDefault();
      openList();
    }
  }

  function onListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((index) => Math.min(index + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActive((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(last);
        break;
      case "Enter":
        event.preventDefault();
        choose(active);
        break;
      case "Escape":
        event.preventDefault();
        closeList(true);
        break;
      case "Tab":
        // Closes without changing; the focus goes on to the next element.
        closeList(false);
        break;
      default:
        // Typing a letter goes to the next option starting with it.
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          const letter = event.key.toLowerCase();
          for (let step = 1; step <= options.length; step++) {
            const index = (active + step) % options.length;
            if (options[index].label.toLowerCase().startsWith(letter)) {
              setActive(index);
              break;
            }
          }
        }
    }
  }

  const classes = ["ds-select", className].filter(Boolean).join(" ");
  return (
    <div ref={rootRef} className={classes}>
      <span id={labelId} className="ds-select-label">
        {label}
      </span>
      {/* The list opens under the field (not under the error message) */}
      <div className="ds-select-control">
        <button
          ref={fieldRef}
          id={fieldId}
          type="button"
          className="ds-select-field"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={`${labelId} ${valueId}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onClick={() => (open ? closeList(true) : openList())}
          onKeyDown={onFieldKeyDown}
        >
          <span id={valueId} className={chosen ? "ds-select-value" : "ds-select-value ds-select-placeholder"}>
            {chosen ? chosen.label : placeholder}
          </span>
          <span className="ds-icon ds-select-arrow" aria-hidden="true">
            expand_more
          </span>
        </button>
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className="ds-select-list"
          hidden={!open}
          onKeyDown={onListKeyDown}
        >
          {options.map((option, index) =>
            option.disabled ? (
              <SelectOption key={option.value} id={optionId(index)} icon={option.icon} disabled onFocus={() => setActive(index)}>
                {option.label}
              </SelectOption>
            ) : (
              <SelectOption
                key={option.value}
                id={optionId(index)}
                icon={option.icon}
                selected={option.value === current}
                onFocus={() => setActive(index)}
                onClick={() => choose(index)}
              >
                {option.label}
              </SelectOption>
            ),
          )}
        </div>
      </div>
      {error && (
        <span id={errorId} className="ds-select-error">
          <span className="ds-icon ds-select-error-icon" aria-hidden="true">
            error
          </span>
          {error}
        </span>
      )}
    </div>
  );
}
