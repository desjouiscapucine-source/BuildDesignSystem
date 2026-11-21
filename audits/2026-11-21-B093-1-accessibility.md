# Accessibility check — Tabs (with Tab 1.1) — 2026-11-21

Context: Step B093-1, design stage of Tabs, plus the Tab 1.1 change (focus ring drawn inside the tab) · Branch: component/Tabs · Checklist of the `accessibility-check` skill (WCAG 2.2 AA). Checked by Claude, browser checks done by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 13 |
| Fail | 0 |
| Not applicable | 1 |

First run: 1 failure — **Focus visible (WCAG 2.4.7)**: Tab drew its focus ring outside the tab (`outline-offset: var(--border-width-2)`) and the scrolling tab list (`overflow-x: auto`, no padding) cut it; the list also cut 1px of the selection line (tabs overlapping the line with a negative margin, measured in the browser). Fixed with the Design System Lead's decision: the Tab focus ring is drawn inside the tab (Tab 1.1); the line under the row is drawn inside the row (inset shadow), so the tabs sit on it without a negative margin. Checked again: 1 fixed, 0 new, 0 still open.

**Blocking: no**

## Failures

None.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Contrast, Tab content on `background.page` (1.4.3, 1.4.11): `text.secondary`, `text.brand`, `border.focus` (in `contrast-pairs.json`, 68/68 pass). Disabled text exempt. | `contrast-pairs.json` |
| Contrast, Tab content on `background.surface`: same three pairs. | `contrast-pairs.json` |
| Contrast, panel focus ring: `border.focus` on page and on surface. | `contrast-pairs.json`, `design/tokens.json` |
| Contrast, preview panel text: `text.primary` on page and surface. | `contrast-pairs.json` |
| Line under the row (1.4.11): `border.subtle` is decorative; the selected state is shown by Tab's indicator in `border.focus`. | `semantic.json` |
| Target size (2.5.8): tabs about 39px tall; the inside ring does not change the size. | `components/Tab/spec.md` |
| Focus visible, tabs in the scrolling row (2.4.7): ring inside the tab; browser check: the focused tab box stays inside the tab list box. | `Tab.css`, Tabs `spec.md`, `design/Preview.tsx` |
| Focus visible, panel (2.4.7): ring `--border-width-2` `--color-border-focus` outside the panel (not in a scrolling area). | Tabs `spec.md`, `design/Preview.tsx` |
| State layers and disabled roles: from Tab; Tabs adds none. | — |
| Text in rem (1.4.4): Tabs adds no text style. | — |
| Tab 1.1, design: ring still `--border-width-2` `--color-border-focus`, drawn inside. | `components/Tab/spec.md`, `design/Preview.tsx` |
| Tab 1.1, guidelines: Focus line says the ring is inside the tab; the rest unchanged. | `components/Tab/guidelines.md` |
| Tab 1.1, code: visible focus on `:focus-visible`, focus not obscured (2.4.7, 2.4.11); the rest unchanged since `audits/2026-11-19-B157-3-accessibility.md`. | `components/Tab/Tab.css` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| `opacity.disabled` on a colored background | Tabs has no disabled state of its own and no colored background. |

## Notes (not failures)

1. The ring is now drawn over the tab's focus state layer: `border.focus` on the 12% `text.brand` tint over white ≈ 5.2:1 (computed by Claude), above 3:1.
2. On the selected tab, the inside ring and the selection indicator are both `border.focus` and meet at the bottom; the ring stays visible on the other three sides.
3. For the Guidelines stage of Tabs: keys and how to leave the row (arrows along the tabs, then Tab to the panel, always focusable); the focused or selected tab scrolled into view (hidden scrollbar, 2.4.11); screen reader roles (tablist, tab, tabpanel), names and selected state.
