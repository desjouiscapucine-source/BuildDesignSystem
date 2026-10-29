// Icon control of the Playground tab (B113): a dropdown list of every Material Symbols icon, each option showing
// its icon (a native <select> cannot show the icon font in its options).
// Keyboard like a select: ↑ / ↓, Home / End, Enter or Space to choose, Escape to close, typing jumps to a name.
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
// Every Material Symbols icon name, from Google's codepoints file
// (github.com/google/material-design-icons, variablefont/MaterialSymbolsOutlined[…].codepoints).
import iconNames from "./material-symbols.json";

const TYPEAHEAD_RESET = 700; // ms between two keys of the same typed name
const LIST_HEIGHT = 320; // px, max-height of .icon-select-list

// The list is placed over the page (position: fixed), under the button — above it when there is no room below —
// so that the table of the controls (which scrolls horizontally) does not cut it.
function placeUnder(button: HTMLElement): CSSProperties {
  const rect = button.getBoundingClientRect();
  const below = window.innerHeight - rect.bottom;
  const vertical = below < LIST_HEIGHT && rect.top > below ? { bottom: window.innerHeight - rect.top } : { top: rect.bottom };
  const width = Math.max(rect.width, 200);
  // Kept inside the window: aligned on the right edge of the button when it would overflow.
  const left = rect.left + width > window.innerWidth ? rect.right - width : rect.left;
  return { ...vertical, left, width };
}

export function IconSelect({
  label,
  value,
  optional,
  onChange,
}: {
  label: string;
  value: string;
  /** Offers "None" (""). */
  optional?: boolean;
  onChange: (value: string) => void;
}) {
  const options = optional ? ["", ...iconNames] : iconNames;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(value)));
  const [place, setPlace] = useState<CSSProperties>({});
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", time: 0 });
  const id = useId();
  const optionId = (index: number) => `${id}-option-${index}`;

  // Opening: the chosen icon is active and scrolled into view.
  useEffect(() => {
    if (!open) return;
    setActive(Math.max(0, options.indexOf(value)));
    list.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  useLayoutEffect(() => {
    if (!open) return;
    const update = () => button.current && setPlace(placeUnder(button.current));
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  // A click outside closes the list.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const choose = (index: number) => {
    onChange(options[index]);
    setOpen(false);
    button.current?.focus();
  };

  const onListKeyDown = (event: KeyboardEvent) => {
    const last = options.length - 1;
    const keys: Record<string, () => void> = {
      ArrowDown: () => setActive(Math.min(last, active + 1)),
      ArrowUp: () => setActive(Math.max(0, active - 1)),
      Home: () => setActive(0),
      End: () => setActive(last),
      PageDown: () => setActive(Math.min(last, active + 10)),
      PageUp: () => setActive(Math.max(0, active - 10)),
      Enter: () => choose(active),
      " ": () => choose(active),
      Escape: () => {
        setOpen(false);
        button.current?.focus();
      },
      Tab: () => setOpen(false),
    };
    if (keys[event.key]) {
      if (event.key !== "Tab") event.preventDefault();
      keys[event.key]();
      return;
    }
    // Typeahead: jump to the first name starting with the typed letters.
    if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const now = Date.now();
      typed.current.text = (now - typed.current.time > TYPEAHEAD_RESET ? "" : typed.current.text) + event.key.toLowerCase();
      typed.current.time = now;
      const match = options.findIndex((name) => name.startsWith(typed.current.text));
      if (match >= 0) setActive(match);
    }
  };

  return (
    <div className="icon-select" ref={root}>
      <button
        ref={button}
        type="button"
        className="playground-input icon-select-button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <IconOption name={value} />
        <span className="ds-icon icon-select-chevron" aria-hidden="true">
          expand_more
        </span>
      </button>
      {open && (
        <ul
          ref={list}
          className="icon-select-list"
          style={place}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          aria-activedescendant={optionId(active)}
          onKeyDown={onListKeyDown}
        >
          {options.map((name, index) => (
            <li
              key={name || "none"}
              id={optionId(index)}
              role="option"
              aria-selected={name === value}
              className={index === active ? "icon-select-option active" : "icon-select-option"}
              onPointerMove={() => index !== active && setActive(index)}
              onClick={() => choose(index)}
            >
              <IconOption name={name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function IconOption({ name }: { name: string }) {
  return (
    <span className="icon-select-value">
      <span className="ds-icon" aria-hidden="true">
        {name}
      </span>
      <span>{name || "None"}</span>
    </span>
  );
}
