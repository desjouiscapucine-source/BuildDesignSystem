# Accessibility check — Canvas — 2026-11-19

Context: Step B142-1, design stage · Branch: component/Canvas · Run by the `ds-accessibility-audit` agent, checked by Claude (contrast ratios recomputed).

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 7 |
| Fail | 0 |
| Not applicable | 3 |

**Blocking: no**

## Failures

None.

## To clarify (not failures)

1. **Focus outline covered?** The outline is drawn inside the edges of the canvas; the spec must say whether it is in front of the content (`--z-index-content`) and of ZoomControls (`--z-index-sticky`), so a Frame or the zoom controls at the edge cannot hide it (WCAG 2.4.7 / 2.4.11). **Resolved** by the Design System Lead on 2026-11-19: the outline is in front of the content and of the zoom controls (`spec.md`, States and Design tokens).
2. **ZoomControls (B161)**: contrast, target size and focus are checked in its own audit.

## To check in the browser (code stage)

- Keyboard: arrow keys, `+` / `−`, `0`, `Shift` + `1` with the canvas focused; Tab / Shift+Tab leave the canvas (no keyboard trap).
- The focus outline stays visible with a Frame or ZoomControls at the edge.
- Text zoom 200% and 320px width: the empty message and ZoomControls stay usable (two-dimensional content, reflow exception).

## Passes

| Criterion | Where |
| --------- | ----- |
| Text contrast 4.5:1: empty message `color.text.secondary` on `color.background.subtle` = 4.95:1 | `tokens/contrast-pairs.json` |
| Non-text contrast 3:1: focus outline `color.border.focus` on `color.background.subtle` = 5.50:1 | `tokens/contrast-pairs.json` (pair added for Frame, B143) |
| Non-text contrast 3:1: selection border `color.border.focus` on `color.background.subtle` = 5.50:1 | Same pair |
| Target size ≥ 24×24px: the canvas fills its container; zoom buttons belong to ZoomControls (B161) | `spec.md` Anatomy |
| Visible focus: `--border-width-2` `--color-border-focus` on a light background | `spec.md` States |
| State layers: selection fill at `--state-layer-hover`; no hover / pressed on the surface | `spec.md` Design tokens |
| Text sizes in rem: empty message `body` (0.875rem) | `tokens/semantic.json` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| 3:1 for the grid dots (`color.border.subtle` on `background.subtle` = 1.12:1) | Decorative dots, not needed to understand or use the canvas (same as Frame, `audits/2026-11-19-B143-1-accessibility.md`). |
| Disabled roles / `opacity.disabled` | No disabled state. |
| `border.focus-inverse` | No brand or dark background. |
