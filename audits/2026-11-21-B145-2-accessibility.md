# Accessibility check — StickyNote — 2026-11-21

Context: Step B145-2, guidelines stage · Branch: component/StickyNote · Checked by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 6 |
| Fail | 0 |
| Not applicable | 0 |

**Blocking: no**

First run: 3 failures, fixed by decisions of the Design System Lead:

| # | Criterion | Finding | Fix |
| - | --------- | ------- | --- |
| 1 | Focus not obscured (WCAG 2.4.11) | Nothing kept a focused note visible: a note moved with the arrow keys could cover another | Notes cannot overlap (a moved note cannot cover another); the Canvas (B142) scrolls to the focused element |
| 2 | Name, role, value (WCAG 4.1.2) | The editing field had no role, name or announced state | Multi-line text box named "Note text"; entering editing announces "Editing note, Escape to save" |
| 3 | Name, role, value (WCAG 4.1.2) | A `group` role cannot carry `aria-selected` | "selected" is added to the note's accessible name |

Outside the checklist: the arrow keys are now referenced as WCAG 2.1.1 (keyboard); the single-pointer alternative to dragging (WCAG 2.5.7) is provided by the Canvas (B142), open question.

## Failures

None.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard behavior with keys and results (WCAG 2.1.1) | `guidelines.md` Accessibility, Behavior; `spec.md` States |
| No keyboard trap: Escape always leaves the editing state (WCAG 2.1.2) | `guidelines.md` Accessibility, Behavior |
| Focus order (note → Edit → Delete → next note), visible focus (WCAG 2.4.7), focus after a delete | `guidelines.md` Accessibility |
| Focused element never hidden (WCAG 2.4.11) | `guidelines.md` Usage best practices, Behavior, Accessibility |
| Screen reader role, name and state (WCAG 4.1.2); the name contains the visible content (WCAG 2.5.3) | `guidelines.md` Accessibility |
| Contrast (checked at the design stage) and target size ≥ 24×24px (WCAG 2.5.8) | `guidelines.md` Accessibility; `audits/2026-11-19-B145-1-accessibility.md` |

## To check at the code stage

- Keyboard pass: Tab order, Enter (edit / new line), Space, arrow keys (selected note only, never covering another), Delete / Backspace (not in editing), Escape (saves, focus back on the note), focus after a delete, no trap in the text box.
- The focus moves into the "Note text" box when editing starts.
- Screen reader: group name with author, date and full text; "selected" in the name; "Note text" text box; "Editing note, Escape to save"; button names.
- Visible focus on selected and editing notes, with no state layer.
- 200% zoom and text spacing (WCAG 1.4.4, 1.4.12) on the fixed 160×160 note.
- Focus not obscured, once Canvas (B142) exists.
