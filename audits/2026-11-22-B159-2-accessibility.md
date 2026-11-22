# Accessibility check — Avatar — 2026-11-22

Context: Step B159-2, guidelines stage · Branch: `component/Avatar` · Commit: d3b8425 (`guidelines.md` audited on disk, not committed yet) · Agent: `ds-accessibility-audit`, checked by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 5 |
| Fail | 0 |
| Not applicable | 2 |

Since the previous check (`audits/2026-11-22-B159-1-accessibility.md`): 0 fixed, 0 new, 0 open. The screen reader behavior to check again at this stage is written in the guidelines.

**Blocking: no**

## Failures

None.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard and no trap (WCAG 2.1.2): not focusable; a clickable parent (Button, Link, Comment marker) carries the keyboard behavior. | `guidelines.md`, Accessibility |
| Focus order and visible focus: no focus on the avatar itself (no interaction states in the spec). | `guidelines.md`, Accessibility |
| Screen reader role, name and state (WCAG 4.1.2): image named with the full name when shown alone; decorative when the name is written next to it or when there is no name. | `guidelines.md`, Accessibility; `spec.md`, Content |
| Contrast: `text.inverse` / `icon.inverse` on `background.brand`, 6.10:1, as in the spec. | `guidelines.md`, Accessibility |
| Minimum target size (24×24px): not interactive; smallest size 24px anyway. | `guidelines.md`, Accessibility |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Focus not obscured (WCAG 2.4.11) | The avatar never receives focus. |
| Label in name (WCAG 2.5.3) | Interactive components only; the initials are not a label. |

## Consistency with `spec.md`

No contradiction (initials rule, sizes, contrast, not interactive).

## Note raised by the check — decided

With the name always written next to the avatar, a named avatar would make screen readers read the name twice. **Decision of the Design System Lead (2026-11-22):** the avatar is **decorative when the name is written next to it**; it announces the full name only when shown alone (the marker exception). `spec.md` (Content) and `guidelines.md` (Accessibility) updated; how the code knows it is decided at the code stage.

**Verdict: PASS.**
