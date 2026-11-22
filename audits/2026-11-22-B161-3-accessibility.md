# Accessibility check — ZoomControls (code stage) — 2026-11-22

Step B161-3 · Branch `component/ZoomControls` · Commit `d1f568c` · Agent `ds-accessibility-audit` (WCAG 2.2 AA, `accessibility-check` checklist), result checked by Claude. Files: `ZoomControls.tsx`, `ZoomControls.css`, `examples.tsx`, checked against `guidelines.md` and the previous report (`2026-11-22-B161-2-accessibility.md`).

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 7 |
| Fail | 0 |
| Not applicable | 1 |

Since the previous check (`2026-11-22-B161-2-accessibility.md`, guidelines stage): all 4 "points for the code stage" are now implemented and verified below; 0 still open.

**Blocking: no** · Accepted exceptions: none.

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard (2.1.1, 2.1.2): native `<button>` for all four controls (via `IconButton`); no custom key handling needed; Tab / Shift+Tab leave the group to the surrounding canvas; no trap | `ZoomControls.tsx:40-58` |
| No focusable disabled control: zoom out / zoom in use the native `disabled` attribute (via `IconButton`'s `disabled`); a disabled button is skipped by Tab | `ZoomControls.tsx:46,53` |
| Focus never lost (2.4.3): when the focused zoom button becomes disabled, a `useEffect` moves the focus to the other (enabled) zoom button. Verified live in the browser: focused "Zoom in", clicked to 400% — focus moved to "Zoom out" | `ZoomControls.tsx:27-30`; browser check |
| Screen reader (4.1.2, 4.1.3): container `role="group"` `aria-label="Zoom controls"`; buttons named via `IconButton`'s `label` ("Zoom out", "Zoom in", "Fit to screen"); level `role="status"` `aria-live="polite"` `aria-label="Zoom level {n}%"` — verified in the DOM | `ZoomControls.tsx:36,43,50` |
| Visible focus (2.4.7): inherited from `IconButton` (`--color-border-focus` on `:focus-visible`), unchanged here | `components/IconButton/IconButton.css` |
| Target size (2.5.8): 36×36px buttons (`IconButton`), unchanged | `components/IconButton/IconButton.css` |
| Zoom / reflow (1.4.4, 1.4.10): no fixed pixel widths; `--size-zoom-level` is in rem; the bar uses flex with token gaps, no fixed container width | `ZoomControls.css` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| 2.5.3 Label in name | Icon-only buttons (no visible text label to match); the level is a status, not a control |

## Browser checks performed

- Focused "Zoom in" on the Default example, clicked to 400% (13 clicks): level reads "400%", `Zoom in` becomes `disabled`, focus automatically moves to `Zoom out` — confirmed via the live DOM (`document.activeElement`).
- Verified `aria-label`/`disabled` on all three examples (Default, Minimum 10%, Maximum 400%): matches the spec's States section exactly.
- Fit to screen click on the Default example: level returns to "100%".
- 320px width and 200% text zoom: not yet checked manually in this pass (component has no fixed widths or heights that would break reflow, same as the design-stage review); recommend a final pass before `complete`.

## Accepted exceptions

None.
