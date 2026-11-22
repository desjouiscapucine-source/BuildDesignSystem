# Accessibility check — Panel — 2026-11-19

Context: Step B144-1, design stage · Branch: component/Panel · Checked by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 6 |
| Fail | 3 → fixed |
| Not applicable | 4 |

**Blocking: no** (the 3 failures were fixed in this step: missing contrast pairs, colors unchanged).

## Failures (fixed)

| # | Criterion | Finding | Fix |
| - | --------- | ------- | --- |
| 1 | Pair listed, 3:1 for icons (WCAG 1.4.11) | Resize handle icon `color.icon.secondary` on `color.background.surface` not in `tokens/contrast-pairs.json` (computed 5.26:1). | Pair added, min 3. |
| 2 | Pair listed, 3:1 for the focus indicator (WCAG 1.4.11, 2.4.7) | Handle and IconButton focus outline `color.border.focus` on `color.background.surface` not listed (computed 5.85:1). | Pair added, min 3. |
| 3 | Pair listed, 3:1 for icons (WCAG 1.4.11) | IconButton `tertiary` icon `color.icon.brand` on `color.background.surface` not listed (computed 5.85:1). | Pair added, min 3. |

`npm run tokens`: 65/65 pairs pass WCAG 2.2 AA.

## Warnings (questions for the Design System Lead)

1. Focus outline over the canvas: half of the handle sits over the canvas, whose background role is not decided yet (Canvas, B142).
2. Thickness of the handle focus outline: only its color is in the spec (IconButton uses `--border-width-2`).
3. Code stage: at small viewports (320px) the panel and the canvas cannot fit side by side; reflow (WCAG 1.4.10) to check at the code stage, behavior below desktop to decide at the guidelines stage.
4. Tabs placeholder: look, focus and states of the tabs come from Tabs (B093) and are checked again once it is built.

## Passes

| Criterion | Where |
| --------- | ----- |
| Text pairs `color.text.secondary` and `color.text.primary` on `color.background.surface` listed (4.5) | `design/tokens.json`, `Preview.tsx` |
| Targets at least 24×24px (WCAG 2.5.8): handle `--size-resize-handle`, IconButtons 36×36 | `spec.md` |
| Visible focus specified (WCAG 2.4.7): `--color-border-focus` + `--state-layer-focus` | `spec.md` |
| Interaction states use state layers; no disabled state | `spec.md` |
| Text sizes in rem (`body` = 0.875rem, WCAG 1.4.4) | `design/tokens.json` |
| Keyboard alternative to dragging the handle (left / right arrows, bounded by min / max) | `spec.md` |

## Not applicable

- New color tokens: the 4 new tokens are sizes (`size.panel`, `size.panel-min`, `size.panel-max`, `size.resize-handle`).
- Durations, `opacity.disabled`, font-size tokens: not created or changed.

## Accepted exceptions

None.
