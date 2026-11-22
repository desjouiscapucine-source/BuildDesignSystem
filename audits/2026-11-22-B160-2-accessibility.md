# Accessibility check — CommentMessage — 2026-11-22 (guidelines stage)

Context: Step B160-2, guidelines stage · Branch: component/CommentMessage · Previous report: `audits/2026-11-22-B160-1-accessibility.md`

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 6 |
| Fail | 0 (4 found, 3 fixed, 1 accepted as an exception) |
| Not applicable | 2 |

**Blocking: no**

## Failures found — and how they were resolved

| # | Criterion | Finding | Resolution |
| - | --------- | ------- | ---------- |
| 1 | Focus order (2.4.3 / 2.1.1) | After a delete, focus "to the button of the next message", but `other` messages have no button. | Decided by the Design System Lead: to the "…" button of the next `me` message of the thread, else to the reply field of the Comment. |
| 2 | Focus order (2.4.3) | When the `first` message is deleted, the whole Comment disappears: no focus destination. | Decided by the Design System Lead: the Comment decides (B146). |
| 3 | No keyboard trap (2.1.2), focus not obscured (2.4.11) | Not stated in the Accessibility section. | Lines added: Tab / Shift+Tab move through and out of the thread; the focused button is never hidden by the scrolling bubble. |
| 4 | Name, role, state (4.1.2), minor | The "…" button name ("Open message actions", verb first as decided) is the same on every message: a screen reader user cannot tell which message it acts on. | **Accepted as an exception by the Design System Lead (2026-11-22).** Written in `guidelines.md` and `STEPS.md`. |

## Open points

- Focus, Escape and return of the focus around the Menu: with B167.
- How "(you)" and "Edited" are exposed to screen readers (visually hidden text or `aria-label`): code stage.
- Code stage, to check in the browser: Tab reaches the hidden "…" button (use opacity, not `visibility: hidden` / `display: none`); the focused button is not cut off by the scrolling bubble; 320px width and 200% text; increased text spacing (1.4.12) with the 36px header; screen reader reading of the list of articles, "(you)", "Edited", Avatar hidden.

## Accepted exceptions

- Failure 4: the "…" button has the same accessible name on every message (Design System Lead, 2026-11-22).

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard: keys and results, how to leave, no trap | `guidelines.md` Accessibility |
| Focus order, visible focus, focused element not hidden | `guidelines.md` Accessibility |
| Screen reader: list / article, name, "(you)", "Edited", Avatar hidden | `guidelines.md` Accessibility |
| Contrast pairs (4.62:1 in hover, AA) | `guidelines.md`, `spec.md` |
| Touch target 36×36px (24×24px required) | `guidelines.md`, `spec.md` |
| Text content rules (plain text, never empty), consistent with the spec | `guidelines.md` Content |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Accessible name contains the visible label (2.5.3) | The "…" button is icon-only. |
| Disabled roles / `opacity.disabled` | No disabled state. |
