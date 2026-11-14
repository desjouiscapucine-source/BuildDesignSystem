# Accessibility check — Tag — 2026-11-14

Context: Step B141-3, code stage (tone `brand`) · Branch: component/Tag

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 5 |
| Fail | 0 |
| Not applicable | 5 |

**Blocking: no**

## Checked in the browser (by Claude)

- `.ds-tag--brand` computed: background rgb(245, 243, 187), label and icon rgb(121, 91, 85) — 5.35:1. No console error.
- Mobile (375px): the "Side by side" tags wrap to a second line, no horizontal scroll; the long label is cut with an ellipsis.

## Passes

| Criterion | Where |
| --------- | ----- |
| Role and name: plain `span`, no role, not focusable, label read as text (WCAG 4.1.2, 2.1.1). | `components/Tag/Tag.tsx` |
| Accessible name = visible label (WCAG 2.5.3). | `components/Tag/Tag.tsx` |
| Decorative icon `aria-hidden="true"`. | `components/Tag/Tag.tsx` |
| Contrast of the brand pairs in `contrast-pairs.json` (WCAG 1.4.3, 1.4.11). | `components/Tag/Tag.css`, `tokens/contrast-pairs.json` |
| Zoom and reflow: no fixed size, `max-width: 100%`, tokens in rem (WCAG 1.4.4, 1.4.10, 1.4.12). | `components/Tag/Tag.css` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| No keyboard trap (WCAG 2.1.2) | Not focusable. |
| Native states | No states. |
| Visible focus (WCAG 2.4.7) | Never focused. |
| Focus not obscured (WCAG 2.4.11) | Never focused. |
| Target size (WCAG 2.5.8) | Not interactive. |
