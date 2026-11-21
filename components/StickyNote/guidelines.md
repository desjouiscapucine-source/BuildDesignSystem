# StickyNote — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To annotate a composition on the canvas: an idea, a question, a task.
- To explain a user journey: the intention of a step, between several Frames.
- As a working note of the designer while composing.
- To leave review feedback on the canvas.

## When not to use
- For a discussion with replies between several people: use **Comment** (B146, not in the design system yet).
- For text that is part of the screen being designed: use the real components inside the **Frame**, not a note.
- Outside the canvas (a page of the site, a prototype): StickyNote only exists on the canvas of the UX playground (**Canvas**, B142, not in the design system yet).

## Usage best practices
- Place a note anywhere on the canvas background, **never inside a Frame**: the Frame is the screen being designed.
- Place the note next to the Frame or the part of the journey it is about.
- Use as many notes as needed, but **never stack them**: overlapping notes hide their text. A note that is moved (pointer or arrow keys) cannot cover another note.
- One idea per note; for several ideas, use several notes.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Write one short idea per note ("Check the spacing on mobile."). | Put several ideas in one note, so the text is cut with an ellipsis. |
| Place the note next to the Frame it annotates. | Place the note on top of a Frame. |
| Place notes side by side. | Overlap notes, so one hides the other. |
| Show the author in initials and a short date ("CD", "19 Nov"). | Show the full name and a long date: they are cut in the footer. |

## Content guidelines
- **One idea per note.**
- **Short, simple sentences**: aim to fit in 4 lines, so the text is not cut.
- **Sentence case**: a capital letter at the start, never all capitals.
- **A task starts with a verb** (e.g. "Check the spacing between the cards and the timeline on mobile.").
- **Author**: two capital initials, first name then last name (e.g. "CD").
- **Date**: day and short month in English, no year (e.g. "19 Nov").
- **Action names** (screen readers): "Edit the note", "Delete the note".

## Behavior
- **Select**: a click on the note, or Space when it has the focus, selects it (border `border.strong`); Space again unselects it.
- **Move**: drag the note on the canvas (dragging state, `shadow.hover`), or use the arrow keys when it is selected. A moved note cannot cover another note. The single-pointer alternative to dragging is provided by the Canvas (B142).
- **Edit**: the Edit button, a double-click on the note, or Enter when it has the focus, turns the text into an editable field.
  - In editing, Enter adds a new line; the full text scrolls inside the note.
  - Escape or a click outside the note saves the text and leaves the editing state; the focus goes back to the note.
- **Empty note**: if the text is empty when leaving the editing state, the note is removed from the canvas.
- **Delete**: the Delete button, or Delete / Backspace when the note has the focus (not in editing), removes the note at once, with no confirmation (undo is handled by the Canvas).
- **Long text**: cut with an ellipsis after 4 lines; the full text shows in the editing state.
- **Long author or date**: cut with an ellipsis (use initials and a short date to avoid it).
- **Responsive**: the note keeps its fixed size; the behavior of the canvas below desktop is decided by Canvas (B142).

## Accessibility
- **Keyboard:**
  - Tab: the note, then its Edit button, then its Delete button, then the next note.
  - Enter: edit (in editing: new line). Escape: leave the editing state.
  - Space: select / unselect.
  - Arrow keys: move the selected note (keyboard alternative to dragging, WCAG 2.1.1). The single-pointer alternative (WCAG 2.5.7) is provided by the Canvas (B142).
  - Delete / Backspace: delete the note (not in editing).
  - No keyboard trap: Escape always leaves the editing state.
- **Focus:** visible outline `border-width-2` `border.focus` outside the note, also on a selected or editing note. The focused note is never hidden (WCAG 2.4.11): notes cannot overlap, and the Canvas (B142) scrolls to the element that has the focus. After a delete, the focus goes to the next note, or to the canvas if there is none.
- **Screen reader:**
  - The note is a named group: "Sticky note by CD, 19 Nov: <full text>" (the full text, even when cut on screen).
  - Selected: "selected" is added to its name: "Sticky note by CD, 19 Nov, selected: <full text>".
  - Editing: the text is a multi-line text box named "Note text"; entering the editing state announces "Editing note, Escape to save".
  - The buttons announce "Edit the note" and "Delete the note".
- **Contrast:** text, author and date `text.primary` on `background.brand-subtle` (13.62:1); selected border `border.strong` 3.19:1, with no state layer on a selected or editing note to keep 3:1; IconButton icons ≥ 3:1 (see the spec accessibility report).
- **Touch target:** the Edit and Delete buttons are 36 × 36px; the note is 160 × 160px (WCAG 2.5.8: 24 × 24px minimum).

## Related components
- **Canvas** (B142, not in the design system yet): the surface on which the notes are placed.
- **Frame** (B143): the screen a note annotates, placed next to it.
- **Comment** (B146, not in the design system yet): use it instead for a discussion with replies.
- **IconButton**: the Edit and Delete actions of the note.

## Open questions
- Behavior of the canvas below desktop: decided by Canvas (B142).
- Single-pointer alternative to dragging (WCAG 2.5.7) and scrolling to the focused element (WCAG 2.4.11): provided by Canvas (B142).
