# Accessibility check — StickyNote — 2026-11-21

Context: Step B145-3, code stage, plus the token changed (`size.sticky-note` → 10rem) · Branch: component/StickyNote · Checked by Claude (browser checks included).

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 10 |
| Fail | 0 |
| Not applicable | 4 |

**Blocking: no**

First run and browser check: 2 failures, fixed:

| # | Criterion | Finding | Fix |
| - | --------- | ------- | --- |
| 1 | Keyboard behavior as in the guidelines, no trap (WCAG 2.1.1, 2.1.2) | Escape and a click outside only left the editing state while the text box had the focus: with the focus on Edit / Delete or on the note, Escape did nothing and a click outside left the note in editing without saving | The note handles Escape in editing wherever the focus is in it (save, leave, focus back on the note); the focus leaving the note (click outside, Tab past the actions — decided by the Design System Lead, added to the guidelines) saves and leaves |
| 2 | Resize text 200% (WCAG 1.4.4) — found by Claude in the browser | The note was a fixed 160px: at 200% text size only 1.5 lines showed and the date was cut ("19 …") with no visual way to read it | `size.sticky-note` = 10rem (160px at the default text size), decided by the Design System Lead: at 200% the note is 320px, 4 lines, author and date whole |

Browser checks (docs site): Space selects ("selected" added to the name); Enter → focus in the "Note text" box with the description "Editing note, Escape to save"; Escape saves and the focus returns to the note; Escape from the Edit button and from the note (Shift+Tab) in editing; Tab ×3 out of an editing note saves; Edit focused + click outside saves; Tab order note → "Edit the note" → "Delete the note" → next note; Delete key removes the note; empty text removes the note; 200% text size; text spacing (line height 1.5, letter 0.12em, word 0.16em, paragraph 2em): author and date whole (date exactly at the limit), footer inside the note; mobile width (375px): note fits.

## Failures

None.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard, focus order, role, name and states as in the guidelines (WCAG 2.1.1, 4.1.2) | `StickyNote.tsx`; `guidelines.md` Accessibility |
| Accessible name contains the visible content (WCAG 2.5.3): author, date, full text; visible copies `aria-hidden` | `StickyNote.tsx` |
| No keyboard trap (WCAG 2.1.2) | `StickyNote.tsx` (note-level Escape and focus-out) |
| Icon-only controls named ("Edit the note", "Delete the note") | `StickyNote.tsx` |
| Native states: selected in the group name (a `group` cannot carry `aria-selected`); editing announced by the text box and its description | `StickyNote.tsx` |
| Visible focus 2px `border.focus` outside the note, also selected / editing (`:focus-within`); pair `border.focus` / `background.subtle` in `contrast-pairs.json` | `StickyNote.css` |
| Focus not obscured inside the component (no sticky / fixed; state layer `pointer-events: none`); placement left to Canvas (B142) | `StickyNote.css`; `guidelines.md` |
| Targets ≥ 24×24px (WCAG 2.5.8): IconButtons 36×36px, note 10rem | `IconButton.css`; `spec.md` |
| Motion with `--duration-100` / `--easing-ease-out` only | `StickyNote.css` |
| Zoom and reflow (WCAG 1.4.4, 1.4.10, 1.4.12): note in rem, text in rem; full text reachable (name, editing with scroll) | `StickyNote.css`; `tokens/semantic.json` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| New semantic color pair | Only `size.sticky-note` changed (not a color); `npm run tokens` 68/68 |
| Duration tokens and reduced motion | No duration token changed |
| `opacity.disabled` | No opacity token changed |
| Font sizes in rem | No font-size token changed |

## To check later

- Focus not obscured (WCAG 2.4.11) and focus after a delete: once the notes sit in Canvas (B142).
- Screen reader pass with a real screen reader (VoiceOver), if wanted.
