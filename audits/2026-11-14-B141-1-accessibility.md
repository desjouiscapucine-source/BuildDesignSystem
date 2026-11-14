# Accessibility check — Tag — 2026-11-14

Context: Step B141-1, design stage (new tone `brand`) · Branch: component/Tag

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 2 |
| Fail | 0 |
| Not applicable | 3 |

**Blocking: no**

## Passes

| Criterion | Where |
| --------- | ----- |
| Every text and icon color has its pair with the background in `contrast-pairs.json` (WCAG 1.4.3, 1.4.11). Brand tone: `text.brand` / `background.brand-subtle` (4.5:1, existing pair) and `icon.brand` / `background.brand-subtle` (3:1, added in B141); both 5.35:1. `npm run tokens`: 62/62 pairs pass. | `components/Tag/design/tokens.json`, `components/Tag/spec.md`, `tokens/contrast-pairs.json` |
| Text sizes in rem (WCAG 1.4.4): `label-sm`, same text style as the other tones. | `components/Tag/spec.md` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Target size (WCAG 2.5.8) | Tag is not interactive. |
| Visible focus (WCAG 2.4.7) | Tag cannot take focus. |
| State layers / disabled roles | Default state only. |
