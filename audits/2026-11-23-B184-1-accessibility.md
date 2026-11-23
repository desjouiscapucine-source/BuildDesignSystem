# Accessibility check — MenuItem — 2026-11-23

Context: Step B184-1 (MenuItem tile), design stage · Branch: component/Menu

| Result | Count |
| ------ | ----- |
| Pass | 5 |
| Fail | 0 |

**Blocking: no.**

Passes:
- Contrast of the default state: label `text-inverse` and icon `icon-inverse` on `background-brand` (6.10:1; pairs at 4.5 and 3 in `contrast-pairs.json`).
- Focus visible: outline `--border-width-2` solid `--color-border-focus`, drawn outside the tile on the Menu surface (pair at 3).
- Interaction states use state layers; `opacity.disabled` is not used.
- Target size: the whole tile, well above 24×24px.
- Text size in rem (`body-sm`); icon `aria-hidden`.

Accepted exception (Design System Lead, 2026-11-23): the disabled label and icon (`text-disabled`, `icon-disabled`) on `background-brand` are not checked; inactive controls are exempt from contrast (WCAG 1.4.3, 1.4.11). The tile keeps its brand background when disabled.
