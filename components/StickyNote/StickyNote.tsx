import { useEffect, useId, useRef } from "react";
import type { FocusEvent, HTMLAttributes, KeyboardEvent, MouseEvent } from "react";
import { IconButton } from "../IconButton/IconButton";
import "./StickyNote.css";

/** Direction of a keyboard move (arrow keys); the distance is decided by the Canvas. */
export type StickyNoteMoveDirection = "up" | "down" | "left" | "right";

export interface StickyNoteProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onSelect"> {
  /** The body of the note: one idea, short sentences. Cut with an ellipsis after 4 lines; the full text scrolls in the editing state. */
  text: string;
  /** Initials of the author: two capital letters, first name then last name (e.g. "CD"). */
  author: string;
  /** Short date: day and short month in English, no year (e.g. "19 Nov"). */
  date: string;
  /** The note is selected on the canvas. Default: false. */
  selected?: boolean;
  /** The text is being edited. Default: false. */
  editing?: boolean;
  /** The note is being dragged on the canvas (set by the Canvas). Default: false. */
  dragging?: boolean;
  /** Called when the note asks to be selected (click, Space) or unselected (Space). */
  onSelectedChange?: (selected: boolean) => void;
  /** Called when the note asks to enter (Edit button, double-click, Enter) or leave (Escape, the focus leaving the note: click outside or Tab) the editing state. */
  onEditingChange?: (editing: boolean) => void;
  /** Called with the new text when the editing state is left with a text that is not empty. */
  onTextChange?: (text: string) => void;
  /** Called to remove the note: Delete button, Delete / Backspace, or an empty text when the editing state is left. The Canvas then moves the focus to the next note, or to itself. */
  onDelete?: () => void;
  /** Called with a direction when an arrow key is pressed on a selected note. */
  onMove?: (direction: StickyNoteMoveDirection) => void;
}

const arrowDirections: Record<string, StickyNoteMoveDirection> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

/**
 * A sticky note placed on the canvas, to annotate a composition.
 * A named group (author, date, full text, selected state) with Edit and Delete actions.
 */
export function StickyNote({
  text,
  author,
  date,
  selected = false,
  editing = false,
  dragging = false,
  onSelectedChange,
  onEditingChange,
  onTextChange,
  onDelete,
  onMove,
  className,
  onClick,
  onDoubleClick,
  onKeyDown,
  onBlur,
  ...rest
}: StickyNoteProps) {
  const noteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // Set once the editing state is left, so Escape followed by the blur saves only once.
  const leftRef = useRef(false);
  const hintId = useId();

  const classes = [
    "ds-sticky-note",
    selected && "ds-sticky-note--selected",
    editing && "ds-sticky-note--editing",
    dragging && "ds-sticky-note--dragging",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Entering the editing state: the focus moves into the text box, caret at the end.
  // Not when the note is first shown in the editing state: it would take the focus of the page.
  const wasEditingRef = useRef(editing);
  useEffect(() => {
    const entered = editing && !wasEditingRef.current;
    wasEditingRef.current = editing;
    leftRef.current = false;
    if (!entered) return;
    const input = inputRef.current;
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }, [editing]);

  // Leaving the editing state saves the text; an empty text removes the note (guidelines, Behavior).
  const leaveEditing = (refocus: boolean) => {
    if (leftRef.current) return;
    leftRef.current = true;
    const value = inputRef.current?.value ?? text;
    if (value.trim() === "") {
      onDelete?.();
      return;
    }
    if (value !== text) onTextChange?.(value);
    onEditingChange?.(false);
    if (refocus) noteRef.current?.focus();
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented && !editing && !selected) onSelectedChange?.(true);
  };

  const handleDoubleClick = (event: MouseEvent<HTMLDivElement>) => {
    onDoubleClick?.(event);
    if (event.defaultPrevented || editing) return;
    // Not on the actions: a fast double-click on Delete must not open the editing state.
    if ((event.target as HTMLElement).closest("button")) return;
    onEditingChange?.(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    // In editing, Escape always saves and leaves, wherever the focus is in the note (no keyboard trap).
    if (editing) {
      if (event.key === "Escape") {
        event.preventDefault();
        leaveEditing(true);
      }
      return;
    }
    // Keys of the note itself (guidelines, Accessibility), not of its buttons.
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter") {
      event.preventDefault();
      onEditingChange?.(true);
    } else if (event.key === " ") {
      event.preventDefault();
      onSelectedChange?.(!selected);
    } else if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      onDelete?.();
    } else if (selected && event.key in arrowDirections) {
      event.preventDefault();
      onMove?.(arrowDirections[event.key]);
    }
  };

  // In editing, the focus leaving the note (a click outside, Tab past the actions) saves and leaves.
  // Enter in the text box adds a new line (native).
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    onBlur?.(event);
    if (!editing || noteRef.current?.contains(event.relatedTarget as Node | null)) return;
    leaveEditing(false);
  };

  const name = `Sticky note by ${author}, ${date}${selected ? ", selected" : ""}: ${text}`;

  return (
    <div
      ref={noteRef}
      role="group"
      aria-label={name}
      tabIndex={0}
      className={classes}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      {...rest}
    >
      {editing ? (
        <>
          <textarea
            ref={inputRef}
            className="ds-sticky-note-input"
            aria-label="Note text"
            aria-describedby={hintId}
            defaultValue={text}
          />
          <span id={hintId} hidden>
            Editing note, Escape to save
          </span>
        </>
      ) : (
        <p className="ds-sticky-note-text" aria-hidden="true">
          {text}
        </p>
      )}
      <div className="ds-sticky-note-footer">
        <div className="ds-sticky-note-meta" aria-hidden="true">
          <span className="ds-sticky-note-author">{author}</span>
          <span className="ds-sticky-note-date">{date}</span>
        </div>
        <IconButton
          variant="tertiary"
          icon="edit"
          label="Edit the note"
          onClick={(event) => {
            event.stopPropagation();
            if (!editing) onEditingChange?.(true);
          }}
        />
        <IconButton
          variant="tertiary"
          icon="delete"
          label="Delete the note"
          onClick={(event) => {
            event.stopPropagation();
            onDelete?.();
          }}
        />
      </div>
    </div>
  );
}
