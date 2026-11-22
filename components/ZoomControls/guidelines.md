# ZoomControls — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- On a **Canvas**, to zoom out, zoom in and fit all the content to the screen, and to read the current zoom level.
- It is the building block of the Canvas: the Canvas always shows it, at the bottom right.

## When not to use
- **Showing an image**: use **ImageViewer**, which has its own zoom.
- **Enlarging the text of a page**: never. The browser zoom does it (WCAG 1.4.4).
- **A surface that does not zoom** (a page, a list, a Dialog): no zoom controls.

## Usage best practices
- **Placement**: at the bottom right of the canvas, `space.16` from the right and bottom edges.
- **Keep the corner free**: nothing fixed over or next to the zoom controls (panel, toolbar, message); the canvas content passes under them only while it moves.
- **One per canvas**: never a second set of zoom buttons elsewhere on the screen.
- **Always the full set**: zoom out, zoom level, zoom in and fit to screen; never remove a part.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Place the zoom controls at the bottom right of the canvas, `space.16` from the edges, with the corner free. | Place a panel, a toolbar or a message over or next to the zoom controls. |
| Show one ZoomControls per canvas. | Add a second set of zoom buttons elsewhere on the screen. |
| Keep the four parts: zoom out, zoom level, zoom in, fit to screen. | Remove the zoom level or the fit to screen button. |
| Show the level as a whole number in steps of 10, e.g. "120%". | Show "123.5%" or "1.2×". |

## Content guidelines
- **Zoom level**: a whole number followed by "%", with no space: "10%" → "400%", always a multiple of 10.
- **Accessible names** (not displayed): "Zoom controls" (group), "Zoom out", "Zoom in", "Fit to screen"; the level is announced as "Zoom level 120%". Sentence case, no punctuation.
- **No tooltip** for now: it will come with the Tooltip component (not in the design system yet). The icons `remove`, `add` and `fit_screen` are standard.

## Behavior
- **Zoom out / Zoom in**: one step of 10%, from 10% to 400%.
- **Limits**: at 10% the zoom out button is disabled; at 400% the zoom in button is disabled. The visible level ("10%" / "400%") next to the button is the explanation required by IconButton for a disabled button.
- **Fit to screen**: fits all the content of the canvas in the view, then rounds the level **down** to a multiple of 10 (e.g. 73% → 70%), so all the content stays visible. Always enabled.
- **Empty canvas**: fit to screen goes back to 100%, centered.
- **Other ways to zoom** (keyboard, trackpad, pinch on the Canvas): the zoom level of the controls always shows the current zoom, in steps of 10.
- **Responsive**: the same bar, the same size, on every screen (mobile, tablet, desktop). On touch screens, the buttons are the single-pointer alternative to the pinch (WCAG 2.5.7).
- **Long text**: none; the level fits its minimum width ("400%"), which grows with the text size.

## Accessibility
- **Keyboard**: Tab goes to zoom out, zoom in, then fit to screen (the zoom level is not focusable); Enter or Space activates the focused button. Order in the page: the canvas, then the zoom controls, then the content of the canvas (Canvas guidelines).
- **Focus**: the IconButton focus outline (`border-width.2` `border.focus`). A disabled button is skipped by the Tab key (native disabled, like IconButton). When the button that has the focus becomes disabled, the focus moves to the other zoom button: zoom in at 400% → zoom out; zoom out at 10% → zoom in. The focus is never lost (WCAG 2.4.3).
- **Screen reader**: a group named "Zoom controls"; each button announced as a button with its name; a disabled button is skipped. The zoom level is a **status** (polite live region): "Zoom level 120%" is read after each change, without moving the focus (WCAG 4.1.3).
- **Contrast**: zoom level `text.primary` on `background.surface` 14.87:1; icons `icon.brand` on `background.surface` 5.85:1; focus outline 5.85:1 (spec). A disabled button and the divider are exempt.
- **Touch target**: 36 × 36px per button, above the 24 × 24px minimum (WCAG 2.5.8).

## Related components
- **Canvas** — the parent: shows ZoomControls at its bottom right.
- **ImageViewer** — has its own zoom, for images.
