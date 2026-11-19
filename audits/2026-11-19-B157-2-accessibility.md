# Accessibility check — Tab — 2026-11-19

Context: Step B157-2, guidelines stage (stage 2) · Branch: component/Tabs · Checklist of the `accessibility-check` skill (WCAG 2.2 AA). Checked by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 7 |
| Fail | 0 |
| Not applicable | 0 |

First run: 1 failure (WCAG 2.4.11, the Focus line did not say that the focused tab is never hidden by a sticky element or a panel). Fixed with the sentence approved by the Design System Lead, then checked again. Since `audits/2026-11-19-B157-1-accessibility.md`: 1 fixed, 0 new, 0 still open.

**Blocking: no**

## Failures

None.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard behavior, keys and result (WCAG 2.1.1): Tab enters on the selected tab; Left / Right move and select (wrapping); Home / End; disabled tabs skipped. Agrees with Behavior and the spec. | `guidelines.md` Accessibility |
| No keyboard trap (WCAG 2.1.2): Tab again leaves the list for the panel. | `guidelines.md` Accessibility |
| Focus order and visible focus (WCAG 2.4.7): one tab in the tab order (the selected one); ring `--color-border-focus` + focus state layer. | `guidelines.md` Accessibility |
| Focus not obscured (WCAG 2.4.11): "The focused tab is never hidden by a sticky element or a panel." Fixed. | `guidelines.md` Accessibility |
| Screen reader role, name, state (WCAG 4.1.2): tab role, named by its label, selected state, linked to its panel; disabled announced as unavailable. | `guidelines.md` Accessibility |
| Accessible name contains the visible label (WCAG 2.5.3). | `guidelines.md` Accessibility |
| Contrast pairs and minimum target size: `text.secondary` 5.49:1, `text.brand` 6.10:1, `border.focus` 6.10:1; about 39px tall, above 24×24px (WCAG 2.5.8). | `guidelines.md` Accessibility |

## Notes (not failures)

1. The guidelines agree with `spec.md` (disabled not focusable or clickable, selected + disabled forbidden, one-line label, text only).
2. For the Tabs code stage: "Tab again leaves the list for the panel" assumes the panel can be reached by keyboard even without focusable content.
3. Design-stage notes for the code stage: pressed state layer contrast; keep the focus ring apart from the selection indicator.
