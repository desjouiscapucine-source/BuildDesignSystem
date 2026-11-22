# Accessibility check — Tabs — 2026-11-21

Context: Step B093-2, guidelines stage (stage 2) · Branch: component/Tabs · Checklist of the `accessibility-check` skill (WCAG 2.2 AA). Checked by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 7 |
| Fail | 0 |
| Not applicable | 0 |

Since `audits/2026-11-21-B093-1-accessibility.md`: 0 fixed, 0 new, 0 still open. Note 3 of that report (keys, leaving the row, focused tab scrolled into view, screen reader roles) is covered. **Blocking: no**

## Failures

None.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard behavior (2.1.1): Tab enters on the selected tab; Left / Right move and select (wrapping); Home / End; disabled tabs skipped. Matches Tab (automatic activation). | `guidelines.md` Accessibility, Behavior |
| No keyboard trap (2.1.2): Tab again goes to the panel, always focusable. | `guidelines.md` Accessibility, `spec.md` States |
| Focus order and visible focus (2.4.7): Tab ring inside the tab; panel ring `--border-width-2` `--color-border-focus`. | `guidelines.md` Accessibility |
| Focus not obscured (2.4.11): the focused tab is brought into view when the row scrolls, never hidden by a sticky element or a panel. | `guidelines.md` Accessibility, Behavior |
| Screen reader (4.1.2): tab list with a required name; each tab with its label and selected state; panel named by its tab. | `guidelines.md` Accessibility, Content |
| Label in name (2.5.3): each tab named by its visible label; the list name can be the visible title above. | `guidelines.md` |
| Contrast pairs (checked at the design stage) and target size (2.5.8, about 39px). | `guidelines.md` Accessibility |

## Notes (not failures)

1. Contrast line made exact: "6.10:1 on `background.page`" (the pair on `background.surface` is in `contrast-pairs.json` and passes).
2. Code stage: check that the panel focus ring is not hidden by a sticky element either.
3. Code stage checks: `tablist` / `tab` / `tabpanel` roles, `aria-selected`, list name (`aria-label` or `aria-labelledby`), panel named by its tab, roving tabindex, focused tab scrolled into view, panel `tabindex="0"`, keyboard pass, 320px and 200% zoom.
