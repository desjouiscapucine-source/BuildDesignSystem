# Canvas — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- As the working surface of the **UX playground** (B130), to compose screens with Frames, sticky notes, comments and components.

## When not to use
- **A prototype screen**: a prototype is a user journey, not a free canvas. Use **Screen** (`prototypes/_shared/Screen.tsx`) instead.
- **The layout of a page**: a page follows the 4 / 8 / 12 column grid, not free placement. Use the **layout grid** (`.ds-grid`, `layout` skill) instead.
- **The preview of one component**: use the **Playground** tab of the component (`playground.tsx`) instead.
- **Showing an image**: use **ImageViewer**, which has its own zoom.

## Usage best practices
- **One Canvas per page**: never two canvases side by side, never one inside another.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Put each screen in a Frame. | Build a screen with components scattered on the canvas. |
| Place a sticky note next to the frame it is about. | Leave notes far from what they annotate, with no visible link. |
| Keep the bottom right corner free for the zoom controls. | Place anything fixed over the zoom controls. |
| Keep the `background.subtle` background and the grid of dots. | Change the background or hide the grid. |

## Content guidelines
- **Empty message**: always "Add a frame to start". It cannot be changed by the page using the Canvas.

## Behavior
- **Pan**: Space + drag, or the mouse wheel / trackpad; on touch screens, one finger.
- **Zoom**: from 10% to 400%, in steps of 10%, with the zoom controls, the keyboard, the trackpad or a pinch.
- **Selection**: a drag on the background draws the selection rectangle; on touch screens, a long press then a drag.
- **Without dragging**: the zoom controls replace the pan (fit to screen, then zoom in) and the pinch; Shift + click (on touch screens, a long press on an element, then a tap on another) adds an element to the selection.
- **Every screen size**: the Canvas works on mobile, tablet and desktop, and fills its container.
- **Empty**: when nothing is placed, the empty message is shown in the center.

## Accessibility
- **Keyboard:** Tab moves the focus to the canvas, then to the zoom controls, then to the content placed on the canvas, by position (top to bottom, then left to right; inside a Frame, see the Frame guidelines). After the last element, the focus leaves the canvas; Shift+Tab goes the same way backwards. No keyboard trap. With the focus on the canvas: arrow keys move the view by `space.16`; `+` / `-` zoom in / out; `0` goes back to 100%; `Shift` + `1` fits all the content in the view. Shift + Enter on a focused element adds it to the selection.
- **Focus:** a 2px `border.focus` outline inside the edges of the canvas, in front of the content and of the zoom controls, so it is never hidden.
- **Focus never hidden:** an element that receives the focus is brought into view, with a `space.16` margin, never under the zoom controls.
- **Pointer gestures:** every drag or pinch has a single-pointer alternative: the zoom controls (zoom in / out, fit to screen) for pan and pinch; Shift + click, or a long press then a tap, to add to the selection.
- **Screen reader:** the canvas is a region (`role="region"`) named "Canvas", with a description of its keyboard shortcuts and touch gestures; the zoom level is announced when it changes.
- **Contrast:** empty message `text.secondary` on `background.subtle` 4.95:1; focus outline and selection border `border.focus` 5.50:1. The grid of dots is decorative.
- **Touch target:** the canvas fills its container; the zoom buttons follow ZoomControls (B161), at least 24×24px.

## Related components
- **Frame** (B143) — the screens placed on the canvas.
- **StickyNote** (B145) — notes placed on the canvas.
- **Comment** (B146) — comments on a frame or a component.
- **ZoomControls** (B161) — the zoom controls at the bottom right; building block of the Canvas, not coded yet.
- **Panel** (B144) — the panel next to the canvas in the UX playground.
