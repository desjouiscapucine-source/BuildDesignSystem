# Canvas — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** organism

## Purpose
The free canvas of the UX playground (B130): an infinite surface, moved and zoomed like FigJam, on which frames, sticky notes, comments and components are placed.

## Types
| Type | Purpose |
| ---- | ------- |
| Canvas | The only type: an infinite canvas, with pan and zoom. |

## Anatomy
1. **Surface** (required) — fills its container (width and height 100%), no border, no rounded corners. A plain background with a grid of dots, which moves and scales with the view.
2. **Content** (optional) — what is placed on the surface: Frames (B143), sticky notes (StickyNote, B145), comments (Comment, B146) and components placed on their own, outside any frame.
3. **Zoom controls** (required) — the **ZoomControls** component (B161, building block), at the bottom right of the canvas: zoom out, zoom level in percent, zoom in, fit to screen.
4. **Empty message** (empty only) — centered on the surface: "Add a frame to start".
5. **Selection rectangle** (while selecting only) — drawn with the mouse on the background to select several elements.

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `zoom` | Number, from 10 to 400, in steps of 10 | `100` | Zoom level of the view, in percent. |

- **Empty** is not a prop: the canvas is empty when nothing is placed on it, and then shows the empty message.

### Combinations
- Allowed: all combinations.
- Forbidden: none.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Empty message | Yes, when empty | "Add a frame to start" | One line | — |

## Sizes
One size: the canvas fills its container. The grid of dots is drawn at 100% zoom with a dot of `--border-width-2` every `--space-16`, and scales with the zoom.

## Behavior
- **Pan**: Space + drag, or the mouse wheel / trackpad. A plain drag on the background draws the selection rectangle.
- **Zoom**: from 10% to 400%, in steps of 10% (ZoomControls, keyboard, trackpad).
- **Keyboard**, when the canvas has the focus:
  - Arrow keys: move the view by `--space-16` (one dot spacing), at the current zoom.
  - `+` / `−`: zoom in / zoom out, one step.
  - `0`: back to 100%.
  - `Shift` + `1`: fit all the content in the view.

## States
- **Default**.
- **Empty** — nothing placed: the empty message.
- **Panning** — while the view is moved: grab cursor.
- **Focus** — keyboard focus on the canvas: outline inside the edges of the canvas, in front of the content and of the zoom controls, so it is never hidden (WCAG 2.4.11).
- **Selecting** — the selection rectangle drawn with the mouse.
- No hover, pressed or disabled state on the surface itself.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Surface | Background | All | `--color-background-subtle` |
| Grid | Dot color | All | `--color-border-subtle` |
| Grid | Dot diameter | All (at 100% zoom) | `--border-width-2` |
| Grid | Space between dots | All (at 100% zoom) | `--space-16` |
| Surface | Outline | Focus | `--border-width-2` `--color-border-focus`, inside the edges |
| Empty message | Text style | Empty | `--typography-body-*` |
| Empty message | Color | Empty | `--color-text-secondary` |
| Selection rectangle | Border | Selecting | `--border-width-1` `--color-border-focus` |
| Selection rectangle | Fill | Selecting | `--color-border-focus` at `--state-layer-hover` |
| Content | Stacking order | All | `--z-index-content` |
| Zoom controls | Stacking order | All | `--z-index-sticky` (stays in front while the view moves) |
| Focus outline | Stacking order | Focus | `--z-index-sticky`, drawn after the zoom controls: in front of everything on the canvas |

Zoom controls: tokens of the ZoomControls component (B161) — tertiary IconButtons, container `--color-background-surface`, `--radius-8`, `--shadow-dropdown`.

Contrast (on `--color-background-subtle`): empty message `color.text.secondary` (4.5:1, pair already in `tokens/contrast-pairs.json`); focus outline and selection border `color.border.focus` (3:1, pair added for Frame, B143).

## Open questions
- None.
