# Accessibility check — Canvas — 2026-11-21

Context: Step B142-2, guidelines stage · Branch: component/Canvas · Run by the `ds-accessibility-audit` agent (twice), checked by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 8 |
| Fail | 0 |
| Not applicable | 1 |

**Blocking: no**

## History of this step

The first run found **2 failures** (blocking), fixed with the decisions of the Design System Lead (2026-11-21):
1. **Focus order** incomplete (where the zoom controls and the content come in the Tab order) → canvas → zoom controls → content by position (top to bottom, then left to right) → the focus leaves the canvas; Shift+Tab backwards.
2. **Focused element hidden** under the zoom controls or off view (WCAG 2.4.11) → the view moves to show the focused element, with a `space.16` margin, never under the zoom controls.

Notes of the first run, also handled: single-pointer alternatives to dragging and pinching (zoom controls: fit to screen, then zoom; Shift + click, long press then tap, Shift + Enter to add to the selection), gestures described to screen readers, selection rectangle wording in the spec anatomy, minus key written `-`. No exception accepted.

## Failures

None.

## Consistency with Frame (questions, not failures)

Frame (B143) is complete; any change to its guidelines goes through its own conversation.
1. Frame says Tab goes to the **next frame** and leaves after the **last frame**; Canvas orders **all** content by position (frames, sticky notes, comments, components).
2. Frame says focus is never hidden under the Panel; Canvas says never under the zoom controls.
3. Canvas adds Shift + Enter to add to the selection; Frame does not mention it.

## Other note (code stage)

- The wording of the screen reader description of the shortcuts and gestures is to be asked before the code stage.

## To check in the browser (code stage)

- Tab order canvas → zoom controls → content by position → leave, and backwards.
- Arrow keys, `+`, `-`, `0`, `Shift` + `1`, Shift + Enter.
- A focused element near the bottom right is moved into view with the `space.16` margin, never under the zoom controls.
- The canvas outline stays in front of the content and the zoom controls.
- The zoom level is announced when it changes.
- 320px width and 200% zoom.

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard behavior: keys and results | `guidelines.md` Accessibility; `spec.md` Behavior |
| Leaving the component, no keyboard trap (WCAG 2.1.2) | `guidelines.md`; `spec.md` |
| Focus order | `guidelines.md`; `spec.md` |
| Visible focus (WCAG 2.4.7) | `guidelines.md`; `spec.md` |
| Focus not hidden (WCAG 2.4.11) | `guidelines.md`; `spec.md` |
| Screen reader: region "Canvas", shortcuts and gestures described, zoom level announced (WCAG 4.1.2) | `guidelines.md` |
| Contrast: `text.secondary` / `background.subtle` 4.95:1; `border.focus` / `background.subtle` 5.50:1; dots decorative | `guidelines.md`; `tokens/contrast-pairs.json` |
| Target size 24×24px: canvas fills its container; zoom buttons in ZoomControls (B161) | `guidelines.md` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Accessible name contains the visible label (WCAG 2.5.3) | The canvas has no visible label. |
