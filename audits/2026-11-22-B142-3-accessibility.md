# Accessibility check — Canvas — 2026-11-22

Context: Step B142-3, code stage · Branch `component/Canvas` · Agent `ds-accessibility-audit` (WCAG 2.2 AA, `accessibility-check` checklist), result checked by Claude. First code-stage check for Canvas.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 13 |
| Fail | 0 |
| Not applicable | 6 |

First run: 2 failures, both fixed immediately in this step (see below).

**Blocking: no** · Accepted exceptions: none needed.

## Fixed in this step

1. **`Shift+1` (fit to screen) never fired from the keyboard** — checked as `event.key === "1" && event.shiftKey`, but on a standard layout `KeyboardEvent.key` reports the shifted character for digit keys (e.g. `"!"`), not `"1"`. Fixed: `event.code === "Digit1" && event.shiftKey` (layout-independent), matching the approach already used for `+`/`=`. Verified live: dispatching a keydown with `key: "!"`, `code: "Digit1"`, `shiftKey: true` now triggers fit-to-screen.
2. **Space did not call `preventDefault()`** — arming pan-drag mode but leaving the browser's default Space action (scroll) active, which could scroll the host page since the canvas itself is `overflow: hidden`. Fixed: added `event.preventDefault()` in the Space branch, consistent with every other shortcut in the same handler. Verified live: the dispatched keydown event now reports `defaultPrevented: true`.

## Passes

| Criterion | Where |
| --------- | ----- |
| Role, accessible name (WCAG 4.1.2) | `role="region"` `aria-label="Canvas"` `aria-describedby` → hidden description of shortcuts and gestures |
| Keyboard restricted to the canvas region itself, not descendants (WCAG 2.1.1) | `event.target !== event.currentTarget` guard |
| Arrow keys pan by one `--space-16` step, scaled by zoom | Verified live: exact −16px deltas per step |
| `+`/`=`/`-` zoom one step anchored on viewport center; `0` resets to 100% | Verified live |
| `Shift+1` fits content to view, zoom floored to a multiple of 10 | Verified live (fixed this step) |
| Space arms pan-drag mode, default prevented | Verified live (fixed this step) |
| No keyboard trap (WCAG 2.1.2) | Tab/Shift+Tab never intercepted |
| Visible focus on `:focus-visible`, `--color-border-focus` (WCAG 2.4.7) | Same technique as the approved Design preview mockup |
| Focus never hidden (WCAG 2.4.11) | `handleFocus` computes margin/zoom-controls overlap and pans via `onPanChange`; code reviewed, logic sound |
| Tab order: region → zoom controls → content (DOM order) | Zoom-controls wrapper rendered before the content layer |
| Mouse drag on background draws selection rectangle, reports content-space bounds on release | Verified live: rectangle appears during drag, disappears after, no interference with Space-pan |
| Decorative selection rectangle hidden from assistive tech | `aria-hidden="true"` |
| `touch-action: none` so the browser does not intercept custom gestures | Present on root |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Accessible name contains the visible label (2.5.3) | "Canvas" is a landmark label, not a control with a visible text match |
| Icon-only controls have `aria-label` | Canvas's own markup has none; `ZoomControls` audited separately |
| Native disabled/selected/current/invalid states | Spec: "no hover, pressed or disabled state on the surface itself" |
| Interactive targets ≥ 24×24px (2.5.8) | Surface fills its container; zoom buttons are `ZoomControls` (already 36×36px) |
| Motion tokens (`--duration-*`/`--easing-*`) | No transition/animation in `Canvas.css`; pan/zoom apply instantly |
| Escape leaves the component | Canvas is not an overlay |

## To check in the browser (manual, device-dependent)

- Touch gestures (pinch-zoom, single-finger pan, long-press-then-drag selection): not exercisable in an automated session; code reviewed, no defect found, recommend a manual touch-device pass.
- 320px width / 200% text zoom / increased text spacing reflow of the empty-state message.
- Visual confirmation that the focus outline is never covered by the zoom controls at any pan/zoom state.

## Accepted exceptions

None. (Two notes, not exceptions: the single live region is `ZoomControls`' own, per the decision already accepted at B161-2; Shift+Enter "add to selection" is each content component's own responsibility, tracked for Frame under the still-open B164 — Canvas does not implement it.)
