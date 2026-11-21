# Frame — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** molecule

## Purpose
A layout frame placed on the canvas (Canvas, B142) of the UX playground (B130). It holds one composition of components at the size of a real screen — mobile, tablet or desktop — so the composition can be seen as it would be on that device.

## Types
| Type | Purpose |
| ---- | ------- |
| Frame | The only type. |

## Anatomy
1. **Name** (required) — above the frame, on the left: the name of the composition (e.g. "Home"). It is a toggle button that selects the frame (accessibility decision, guidelines stage); it looks like text.
2. **Size label** (required) — next to the name, on the same line: the size name and its dimensions (e.g. "Mobile · 375 × 812").
3. **Container** (required) — the frame itself, at the real size of the screen: background, thin border, rounded corners, shadow.
4. **Device bar** (required) — at the top of the container:
   - `mobile` and `tablet`: a status bar — the time ("9:41") on the left; the icons `signal_cellular_alt`, `wifi` and `battery_full` on the right.
   - `desktop`: a browser bar — three `circle` icons (window buttons) on the left, then an address field filling the rest of the bar.
   - A line under the bar separates it from the content.
5. **Content** (required, except when empty) — the components placed in the frame, under the device bar; it scrolls inside the frame.
6. **Empty message** (`empty` only) — centered in the container: the icon `add_box` above the text "Drop components here".

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `size` | `mobile`, `tablet`, `desktop` | `mobile` | Screen size of the frame (width × height of the container). |
| `selected` | `true`, `false` | `false` | The frame is selected on the canvas. |
| `empty` | `true`, `false` | `false` | The frame holds no component yet: the empty message replaces the content. |
| `name` | Text | — (required) | Name of the composition, shown above the frame. |
| `onSelectedChange` | Function `(selected) => void` | — (optional) | The selection is controlled by the canvas: the frame calls it when it asks to be selected (click on the container, Enter / Space on the name) or unselected (Enter / Space on the name, Escape); the canvas then sets `selected`. |

### Combinations
- Allowed: all combinations (`selected` and `empty` work with every size, and together).
- Forbidden: none.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Name | Yes | "Home" | The width of the frame (no limit in characters) | One line with the size label, as wide as the frame; a longer name is cut with an ellipsis. The size label is never cut. |
| Size label | Yes (set by `size`) | "Mobile · 375 × 812", "Tablet · 768 × 1024", "Desktop · 1280 × 800" | — | Never cut |
| Device bar text | Yes (set by `size`) | "9:41" (mobile, tablet); the address in the browser bar (desktop) | — | Address: one line |
| Empty message | Yes (`empty` only) | "Drop components here" | — | Wraps, centered |
| Content | No | The components placed in the frame | — | Scrolls vertically inside the frame, under the device bar |

## Sizes
| Size | Container width | Container height |
| ---- | --------------- | ---------------- |
| `mobile` (default) | `--size-viewport-mobile` (375px) | `--size-viewport-mobile-height` (812px) |
| `tablet` | `--size-viewport-tablet` (768px) | `--size-viewport-tablet-height` (1024px) |
| `desktop` | `--size-viewport-desktop` (1280px) | `--size-viewport-desktop-height` (800px) |

Every size uses the same spacing:

| Part | Size |
| ---- | ---- |
| Name / size label | Gap `--space-8` |
| Labels / container | Gap `--space-8` |
| Device bar | Padding `--space-8` (top, bottom) · `--space-16` (left, right); icons `--icon-size-16`; gap between items `--space-8`; gap between the status bar icons `--space-4` |
| Address field (desktop) | Fills the bar; padding `--space-16` (left, right); corners `--radius-16` |
| Empty message | Padding `--space-16`; icon `--icon-size-32`; icon / text gap `--space-8` |

`size.viewport-tablet` and `size.viewport-tablet-height` were created for this component (B143), on the model of the mobile and desktop tokens.

## States
- **Default**
- **Hover** (on the container only, not on the label row) — the border becomes `--color-border-strong`, and the hover state layer (`--state-layer-hover`, in `--color-text-primary`) covers the container.
- **Focus** (keyboard) — a 2px outline (`--border-width-2`) in `--color-border-focus`, offset by `--space-4` from the container, and the focus state layer (`--state-layer-focus`, in `--color-text-primary`) covers the container.
- **Selected** — a 2px outline (`--border-width-2`) in `--color-border-focus`, on the container (no offset).
- **Focus + selected** — both outlines show together: the selected outline on the container, the focus outline `--space-4` around it.
- **Empty** — the empty message replaces the content (`empty`).
- No pressed or disabled state.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Name | Text style | All | `--typography-label-*` |
| Name | Color | All | `--color-text-primary` |
| Size label | Text style | All | `--typography-body-sm-*` |
| Size label | Color | All | `--color-text-secondary` |
| Labels | Gap name / size label · labels / container | All | `--space-8` |
| Container | Width · height | `mobile` | `--size-viewport-mobile` · `--size-viewport-mobile-height` |
| Container | Width · height | `tablet` | `--size-viewport-tablet` · `--size-viewport-tablet-height` |
| Container | Width · height | `desktop` | `--size-viewport-desktop` · `--size-viewport-desktop-height` |
| Container | Background | All | `--color-background-page` |
| Container | Border | Default | `--border-width-1` `--color-border-subtle` |
| Container | Border | Hover | `--border-width-1` `--color-border-strong` |
| Container | Corner radius | All | `--radius-8` |
| Container | Shadow | All | `--shadow-frame` |
| Container | State layer | Hover · focus | `--color-text-primary` at `--state-layer-hover` · `--state-layer-focus` |
| Container | Outline | Selected | `--border-width-2` `--color-border-focus` |
| Container | Outline · offset | Focus | `--border-width-2` `--color-border-focus` · `--space-4` |
| Device bar | Background | All | `--color-background-page` |
| Device bar | Line under the bar | All | `--border-width-1` `--color-border-subtle` |
| Device bar | Text style | All | `--typography-label-sm-*` |
| Device bar | Text and icon color | All | `--color-text-primary` |
| Device bar | Icon size | All | `--icon-size-16` |
| Device bar | Padding | All | `--space-8` (top, bottom) · `--space-16` (left, right) |
| Device bar | Gap between items · between the status bar icons | All | `--space-8` · `--space-4` |
| Address field | Background · corners | `desktop` | `--color-background-subtle` · `--radius-16` |
| Empty message | Text style | `empty` | `--typography-body-*` |
| Empty message | Text and icon color | `empty` | `--color-text-secondary` |
| Empty message | Padding · icon size · gap | `empty` | `--space-16` · `--icon-size-32` · `--space-8` |

Contrast (checked in the Design preview, on the page background of the frame and on the canvas background `--color-background-subtle`): name, size label, device bar text, empty message (4.5:1); selected and focus outline, hover border (3:1). The pairs `color.border.focus` / `color.background.subtle` and `color.border.strong` / `color.background.subtle` were added to `tokens/contrast-pairs.json` for this component (B143).

## Open questions
- **Media queries inside a frame** (found at the code stage, 2026-11-21): the components placed in a frame respond to the width of the browser window, not to the width of the frame (e.g. the Timeline of a mobile frame shows its desktop layout on a desktop page). For the content to behave as on a real screen, the frame would need an iframe (like the Playground tab) or the components container queries. To decide with the UX playground (B130) and the Canvas (B142).
- **Canvas background**: the preview shows the frame on `--color-background-subtle`; the real background is decided by the Canvas component (B142). The label contrast is checked again once it is approved.
