import { useId, useRef, useState, type InputHTMLAttributes, type KeyboardEvent } from "react";
import "./TextInput.css";

/** Type of the field (spec: `type`). */
export type TextInputType = "text" | "search" | "number";

/** Native attributes passed to the `<input>` (name, autoComplete, onBlur…); the others are props. */
type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange" | "placeholder" | "disabled" | "required" | "size" | "aria-label"
>;

interface TextInputBaseProps extends NativeInputProps {
  /** The value. Without it, the TextInput keeps its own value (starting from `defaultValue`). */
  value?: string;
  /** First value when the TextInput keeps its own value. */
  defaultValue?: string;
  /** Called with the new value at each change, and with "" when the field is cleared. */
  onChange?: (value: string) => void;
}

/** Either a label or a placeholder, never both: the text shown in the empty field, and its accessible name. */
type TextInputNameProps =
  | {
      /** Names the field: a noun, no punctuation, 25 characters maximum. Shown in the empty field. */
      label: string;
      placeholder?: undefined;
    }
  | {
      label?: undefined;
      /** A verb and a noun ("Enter a name"), no punctuation; never an example value. Shown in the empty field. */
      placeholder: string;
    };

/** `icon` is for the `text` type only; `search` has no help text. */
type TextInputTypeProps =
  | {
      /** Type of the field. Default: "text". */
      type?: "text";
      /** Icon before the text: a Material Symbols name that recalls the field (e.g. "mail"). Decorative. */
      icon?: string;
      /** Help text under the field: the format or the unit in a few words. */
      helpText?: string;
    }
  | { type: "number"; icon?: undefined; helpText?: string }
  | { type: "search"; icon?: undefined; helpText?: undefined };

/** `error` and `required` cannot be combined with `disabled`: a disabled field cannot be corrected or filled. */
type TextInputStateProps =
  | {
      /** Error message: one sentence that names the field and says how to fix it. Replaces the help text. */
      error?: string;
      /** The field must be filled. No visual mark; announced to screen readers. */
      required?: boolean;
      disabled?: false;
    }
  | { error?: undefined; required?: false; /** The field cannot be used. */ disabled: true };

export type TextInputProps = TextInputBaseProps & TextInputNameProps & TextInputTypeProps & TextInputStateProps;

/** Single-line field to type text, a search or a number. No label above: the empty field shows its label or placeholder. */
export function TextInput({
  type = "text",
  label,
  placeholder,
  icon,
  helpText,
  error,
  required = false,
  disabled = false,
  value,
  defaultValue = "",
  onChange,
  className,
  id,
  onKeyDown,
  ...rest
}: TextInputProps) {
  const uid = useId();
  const inputId = id ?? `${uid}-input`;
  const helpId = `${uid}-help`;
  const errorId = `${uid}-error`;
  const inputRef = useRef<HTMLInputElement>(null);

  const [ownValue, setOwnValue] = useState(defaultValue);
  const current = value !== undefined ? value : ownValue;
  const name = label ?? placeholder;
  const search = type === "search";
  const leadingIcon = search ? "search" : type === "text" ? icon : undefined;
  const help = search ? undefined : helpText;
  const shownError = disabled ? undefined : error;

  function change(next: string) {
    if (value === undefined) setOwnValue(next);
    onChange?.(next);
  }

  function clear() {
    change("");
    // Back to the field: the clear button disappears once the field is empty.
    inputRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    // Escape empties a search field first; on an empty field, it is left to the Dialog or panel (closes it).
    if (search && event.key === "Escape" && current !== "") {
      event.preventDefault();
      event.stopPropagation();
      change("");
    }
  }

  const classes = ["ds-text-input", `ds-text-input--${type}`, className].filter(Boolean).join(" ");
  const describedBy = shownError ? errorId : help ? helpId : undefined;

  return (
    <div className={classes}>
      <div
        className="ds-text-input-field"
        // A click in the padding of the field places the cursor in it, like a native field.
        onMouseDown={(event) => {
          if (event.target === event.currentTarget && !disabled) {
            event.preventDefault();
            inputRef.current?.focus();
          }
        }}
      >
        {leadingIcon && (
          <span className="ds-icon ds-text-input-icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <input
          {...rest}
          ref={inputRef}
          id={inputId}
          className="ds-text-input-control"
          // `number` is a text field with a numeric keyboard: no spin button, Arrow up / down do not change the value.
          type={search ? "search" : "text"}
          inputMode={type === "number" ? "numeric" : rest.inputMode}
          value={current}
          onChange={(event) => change(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={name}
          aria-label={name}
          aria-describedby={describedBy}
          aria-invalid={shownError ? true : undefined}
          aria-required={!disabled && required ? true : undefined}
          disabled={disabled}
        />
        {search && current !== "" && !disabled && (
          <button type="button" className="ds-text-input-clear" aria-label="Clear the search" onClick={clear}>
            <span className="ds-icon ds-text-input-clear-icon" aria-hidden="true">
              close
            </span>
          </button>
        )}
      </div>
      {help && !shownError && (
        <p id={helpId} className="ds-text-input-help">
          {help}
        </p>
      )}
      {/* Always in the page, so the error is announced when it appears or changes. */}
      <div className="ds-text-input-message" aria-live="polite">
        {shownError && (
          <p id={errorId} className="ds-text-input-error">
            <span className="ds-icon ds-text-input-error-icon" aria-hidden="true">
              error
            </span>
            {shownError}
          </p>
        )}
      </div>
    </div>
  );
}
