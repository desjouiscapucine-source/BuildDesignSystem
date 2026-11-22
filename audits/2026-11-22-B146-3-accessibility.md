# Accessibility check — Comment — 2026-11-22 (Step B146-3, guidelines stage)

WCAG 2.2 AA, guidelines part of the checklist of the `accessibility-check` skill. Run twice: the first run found 2 failures, fixed with the Design System Lead the same day; the second run passes.

## Summary (second run)
| Result | Count |
| ------ | ----- |
| Pass | 6 |
| Fail | 0 |
| Not applicable | 0 |

**Blocking: no.** First run: 8 pass, 2 fail (blocking).

## Failures of the first run, fixed
1. **Name of the reply field** (WCAG 4.1.2): not stated. Fixed: the field is named "Write a reply" (its placeholder, which TextInput uses as its accessible name); added to the spec (Content) and the guidelines.
2. **State of Send when the field is empty** (WCAG 4.1.2): not stated, and the spec said Comment has no disabled state. Fixed (decision of the Design System Lead): Send is disabled while the field is empty, Enter then does nothing; the spec now says Comment has no disabled state of its own except this button.

## Open questions of the first run, decided
- Status messages (4.1.3): "Reply sent", "Comment resolved", "Comment reopened", polite, without moving the focus.
- Reply not sent (3.3.1, 4.1.3): the text is kept and the TextInput error "Your reply wasn't sent. Try again." shows under the field, read with the field.
- Escape (2.1.2, 2.4.3): closes the bubble from any element inside it and returns the focus to the marker; the options menu of a message closes only itself. A click on the canvas closes the bubble without moving the focus (the first draft said the focus returned to the marker: corrected).
- Focus order (2.4.3): the bubble follows its marker in the Tab order; the focus stays on the Resolve / Reopen button after the toggle; after a reply is sent with Send, the focus goes to the reply field.

## Passes (second run)
Keyboard keys and results, how to leave (no trap); focus order and visible focus; role, name and state (marker, bubble, thread, field, buttons, error); status messages; contrast pairs (checked at the design stage); target sizes (marker 32px, others at least 24px). `guidelines.md` and `spec.md` do not contradict each other.

## To check in the browser (code stage)
Tab order marker → bubble; focus on opening; Escape from every element and from the menu; focus after Resolve / Reopen and after Send; click on the canvas; polite announcements; 320px width and 200% zoom.

## Accepted exceptions
None.
