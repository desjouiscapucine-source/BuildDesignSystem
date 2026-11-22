# Accessibility check — Tabs — 2026-11-21

Context: Step B093-3, code stage (stage 3) · Branch: component/Tabs · Checklist of the `accessibility-check` skill (WCAG 2.2 AA). Checked by Claude, browser checks done by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 9 |
| Fail | 0 |
| Not applicable | 1 |

Since `audits/2026-11-21-B093-2-accessibility.md`: 0 fixed, 0 new, 0 still open; its code-stage notes are covered. **Blocking: no**

## Failures

None.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard (2.1.1): Left / Right move to the next enabled tab and select it, wrapping; Home / End; focus follows the selection. | `Tabs.tsx` |
| Focus order, roving tabindex: only the selected tab has tabindex 0; disabled = native `disabled`; panel always tabindex 0. | `Tab.tsx`, `Tabs.tsx` |
| Role, name, states (4.1.2): `tablist` + `aria-label` (required prop); `tab` + `aria-selected`; `tabpanel` + `aria-labelledby` the selected tab. | `Tabs.tsx`, `Tab.tsx` |
| Label in name (2.5.3): each tab named by its visible label. | `Tabs.tsx` |
| No keyboard trap (2.1.2): only arrows, Home and End are handled, never Tab. | `Tabs.tsx` |
| Native states, not classes: `[aria-selected]`, `:disabled`. | `Tab.tsx`, `Tab.css` |
| Visible focus (2.4.7): tab ring inside the tab; panel `:focus-visible` `--border-width-2` `--color-border-focus`. | `Tab.css`, `Tabs.css` |
| Focus not obscured (2.4.11), component side: the selected tab is scrolled into view inside the row without scrolling the page; no sticky or overlay part. | `Tabs.tsx`, `Tabs.css` |
| Target size (2.5.8), motion, zoom and reflow (1.4.4, 1.4.10, 1.4.12): about 39px tall; only duration tokens; no fixed size; the row scrolls (`overflow-x: auto`, tabs `flex-shrink: 0`). | `Tab.css`, `Tabs.css` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Icon-only controls | Tabs are text only. |

## Browser checks (done by Claude, Examples and Playground tabs)

- Arrows wrap, Home / End, focus and selection move together, the disabled tab is skipped (Design spec → Guidelines → Design spec).
- Panel: role `tabpanel`, tabindex 0, named by the selected tab; tab list named "Component documentation".
- Tab from the selected tab goes to the panel (ring visible), Tab again leaves the component; Shift+Tab comes back the same way.
- 7 tabs in a narrow container: the row scrolls, the selected tab "Code" is fully visible; the first and last tab stay fully inside the row when focused (ring drawn inside, not cut).
- 375px wide: no horizontal page scroll. No console error.
- Not tested: screen reader (VoiceOver), 200% text zoom and text spacing bookmarklet — to check in a manual test.

## Fixes made after the first run (code details, no failure)

- `aria-controls` only on the selected tab, since only the selected panel is in the page.
- Playground: Tabs uncontrolled and restarted when the control changes, so clicks and arrow keys select tabs in the canvas too.

## Notes (not failures)

1. Hidden scrollbar (approved): a mouse-only user without a trackpad reaches hidden tabs with Shift+wheel, the arrow keys, or a click on a tab at the edge.
2. Focus not obscured on a page with the sticky site header depends on the page (checked when Tabs replaces the component page tabs).
