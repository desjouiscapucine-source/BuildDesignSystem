# Accessibility check — ZoomControls (guidelines stage) — 2026-11-22

Step B161-2 · Branch `component/ZoomControls` · Agent `ds-accessibility-audit` (WCAG 2.2 AA, `accessibility-check` checklist), result checked by Claude. Files: `guidelines.md`, `spec.md` (live region, disabled button stays focusable). Checked against the Canvas guidelines (`origin/component/Canvas`).

## Summary
| Result | Count |
| ------ | ----- |
| Pass | 6 |
| Fail | 0 |
| Not applicable | 1 |

**Blocking: no** · Accepted exceptions: none.

## Passes
| Criterion | Where |
| --------- | ----- |
| Keyboard (2.1.1, 2.1.2): Tab order, Enter / Space, the focus leaves to the canvas content; no trap (Canvas guidelines) | `guidelines.md` Accessibility |
| Focus order and visible focus (2.4.3, 2.4.7): IconButton outline; a button disabled while focused keeps the focus | `guidelines.md`, `spec.md` States |
| Focus not hidden (2.4.11): corner kept free; Canvas never brings a focused element under the controls | `guidelines.md` best practices; Canvas guidelines |
| Screen reader (4.1.2, 4.1.3): group "Zoom controls", named buttons, unavailable at the limit, level as polite status | `guidelines.md`, `spec.md` Anatomy |
| Contrast: 14.87:1 (level), 5.85:1 (icons, focus); disabled button and divider exempt | `guidelines.md`, `tokens/contrast-pairs.json` |
| Target size (2.5.8) 36 × 36px; single-pointer alternative to the pinch (2.5.7) | `guidelines.md` |

## Not applicable
- 2.5.3 Label in name: icon-only buttons; the level is not a control (its announcement contains the visible text anyway).

## Points for the code stage (not failures)
1. **A focusable disabled button conflicted with IconButton (complete, native `disabled`)**. Decision of the Design System Lead: no focusable disabled button; native disabled kept, and when the focused button becomes disabled the focus moves to the other zoom button (zoom out at 400%, zoom in at 10%). Spec and guidelines updated; IconButton unchanged.
2. IconButton allows disabled **only with an explanation next to it**: the visible level ("10%" / "400%") is the explanation — confirmed by the Design System Lead, written in the guidelines.
3. One live region only: the zoom level is announced by ZoomControls, not a second time by the Canvas (zoom changes from the keyboard, trackpad and pinch included).
4. Browser checks: Tab / Shift+Tab order; at 400% / 10% the focus moves to the other zoom button; "Zoom level N%" read after each change; minimum width at 200% text size; at 320px wide, no focused element under the controls.
