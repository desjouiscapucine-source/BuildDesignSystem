# Frame — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To lay out a composition at the **size of a real screen** (mobile, tablet or desktop) on the **canvas of the UX playground** (B130), held by the Canvas (B142).

## When not to use
- **Outside the canvas**: for the screen of a prototype, use **Screen** (`prototypes/_shared/Screen.tsx`); for a page, use the layout of the page.

## Usage best practices
- **One composition per frame**: each frame holds one screen of a composition.
- **Explicit names**: the name says which screen it is; the size is already shown next to it.
- **Sizes aligned**: the frames of the same composition sit side by side, in the order mobile → tablet → desktop.
- **Content on the grid**: the content follows the layout grid of its size (4 columns on mobile, 8 on tablet, 12 on desktop — `layout` skill).
- **No nested frames**: frames sit next to each other on the canvas, never inside another frame.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Name the screen: "Checkout — Payment". | Use a generic name ("Frame 3") or repeat the size ("Mobile"). |
| Put one screen in each frame. | Stack two screens in the same frame. |
| Place the mobile, tablet and desktop frames of a composition side by side. | Scatter the frames of a composition on the canvas. |
| Place frames next to each other on the canvas. | Put a frame inside another frame. |

## Content guidelines
- **Name**: the name of the screen, in a few words. Sentence case, no final period. Never the size: it is shown by the size label.
- **Size label**: set by `size` ("Mobile · 375 × 812", "Tablet · 768 × 1024", "Desktop · 1280 × 800"); never written by hand.
- **Empty message**: "Drop components here" (set by `empty`).

## Behavior
- **Selection**: a click anywhere on the frame (the container) selects it. Above the frame, only the name is clickable: it toggles the selection.
- **Content**: scrolls vertically inside the frame, under the device bar; the frame keeps its size.
- **Long name**: one line, as wide as the frame; cut with an ellipsis. The size label is never cut.
- **Empty** (`empty`): the empty message replaces the content.
- **Size**: fixed by `size`; the frame is not resized by hand.
- No loading or error state.

## Accessibility
- **Keyboard:** Tab moves the focus to the frame (its name, a toggle button); Enter or Space selects it or removes the selection; Escape removes the selection. The content of the frame is reached next with Tab. After the last element of the content, Tab goes to the next frame of the canvas; after the last frame, the focus leaves the canvas. Shift+Tab goes the same way backwards. No keyboard trap.
- **Focus:** visible 2px `border.focus` outline around the frame, offset by `space.4`, with the focus state layer; when the frame is also selected, both outlines show.
- **Focus never hidden:** an element of the content that receives the focus is scrolled into view below the device bar; a frame that receives the focus is scrolled into view on the canvas, never under the Panel.
- **Screen reader:** the frame is a group named by its name and size ("Home, Mobile 375 × 812"). Its name is a toggle button that announces whether the frame is selected (pressed / not pressed). When empty, "Drop components here" is read in the group. The device bar is decorative.
- **Contrast:** name 13.99:1 and size label 4.95:1 on the canvas; device bar text 15.52:1; address text (desktop) 13.99:1; empty message 5.49:1; focus and selected outline 5.50:1 on the canvas, 6.10:1 on the frame; hover border 3.28:1 on the canvas, 3.64:1 on the frame (see `spec.md`).
- **Touch target:** the whole frame (375 × 812 at minimum), far above 24×24px. The name button is less than 24px high (`label` text style); it meets WCAG 2.5.8 with the **spacing exception**: a 24px-diameter circle centered on it (12px around its center) touches no other target — the frame is `space.8` below, the size label is not interactive. Keep that space free: never place another control next to the name.

## Related components
- **Canvas** (B142) — holds the frames.
- **Panel** (B144) — shows the properties of the selected frame.
- **StickyNote** (B145) and **Comment** (B146) — annotate a frame; not in the design system yet.
