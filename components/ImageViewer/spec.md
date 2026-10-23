# ImageViewer — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** organism

## Purpose
Opens an image larger, over the page, one at a time. When several images belong together (e.g. the images of a Card `clickable-image`), the reader moves from one to the next without closing the viewer.

## Types
| Type | Purpose |
| ---- | ------- |
| ImageViewer | The only type. |

## Anatomy
1. Dimmed background (required) — over the whole screen, the page shows through
2. Close button (required) — IconButton `primary`, icon `close`, at the top right
3. Image (required) — in the middle, the whole image visible
4. Caption (optional, per image) — under the image, on a light background
5. Band (several images only) — solid, under the image (and the caption)
6. Previous button (several images) — IconButton `primary`, icon `arrow_back`, in the band
7. Next button (several images) — IconButton `primary`, icon `arrow_forward`, in the band

## Variants

### Variant properties
None: the viewer has a single look.

| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `images` | List of `{ src, alt, caption?, thumbnailSrc? }` | — (required) | The images, in order. `alt` is required. `caption` (optional): the text shown under the image. `thumbnailSrc` (optional): the thumbnail, shown in place of the image until `src` is loaded. |
| `index` | Number | 0 | The image shown (position in `images`). |
| `open` | Boolean | — (required) | Whether the viewer is open. |
| `onClose` | Function | — (required) | Called by the close button, the Escape key. |
| `onIndexChange` | Function | — | Called by the previous / next buttons and the arrow keys, with the new index. |
| `label` | Text | "Image viewer" | Accessible name of the viewer. |

### Combinations
- **One image**: no band (no previous / next buttons).
- **Several images**: the band with the previous / next buttons. "Previous" is **disabled on the first image**, "Next" **on the last one** (no loop).
- No counter. The only text is the optional **caption** of the image shown; an image without caption shows no caption area.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Caption | No | "View from the north side of the building." | 150 characters | Wraps |
| Image alternative text (`alt`) | Yes | "North facade of the building" | — | Not displayed |
| Accessible name | Yes (default provided) | "Image viewer" | — | Not displayed |
| Button names | Yes (fixed) | "Close the image viewer", "Previous image", "Next image" | — | Not displayed |

## Sizes
One size: the viewer takes the **whole screen**.

| Part | Size |
| ---- | ---- |
| Space to the screen edges (image area, close button) | `--space-24` |
| Image | The whole image visible: scaled down to fit the space left by the close button and the band, never cropped, never enlarged beyond its own size; its own ratio |
| Image corners | `--radius-8` |
| Band | Padding `--space-16`, corners `--radius-8`; as wide as its content, at most the screen width minus the edges |
| Space between the previous and next buttons | `--space-8` |
| Space between the image, the caption and the band | `--space-16` |
| Caption | As wide as the image; padding `--space-8` (vertical) · `--space-16` (horizontal); corners `--radius-8` |
| Buttons | IconButton size (target at least 24×24px) |

## States
- **Open / closed.** Opening and closing use the motion tokens (`--duration-*`, `--easing-*`), so they are instant with reduced motion.
- **Previous / next disabled** at the ends (IconButton disabled state).
- **Loading**: while `src` loads, the thumbnail (`thumbnailSrc`) is shown in its place, at the same size. Without `thumbnailSrc`, nothing is shown until the image is loaded.
- **Error**: no specific state (the browser default).
- The buttons keep the IconButton states (hover, focus, pressed, disabled). In the band, the focus ring is the usual one (`--color-border-focus`, 5.50:1 on the band).
- The close button, on the dimmed background, has a **double focus ring**: white inside, brown outside.

### Keyboard and focus
| Event | Result |
| ----- | ------ |
| Viewer opens | Focus goes to the close button; focus stays inside the viewer |
| Escape | Closes the viewer |
| ← / → | Previous / next image (nothing at the ends) |
| Viewer closes | Focus returns to the element that opened it (the thumbnail) |

Screen reader: the viewer is a modal dialog named by `label`; the image is announced with its `alt`, then its caption (linked to the image).

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Dimmed background | Color | all | `--color-background-overlay` |
| Viewer | Space to the screen edges | all | `--space-24` |
| Image | Radius | all | `--radius-8` |
| Image / caption / band | Gap | all | `--space-16` |
| Caption | Background | all | `--color-background-subtle` |
| Caption | Text style · color | all | `body` · `--color-text-primary` |
| Caption | Padding · radius | all | `--space-8` `--space-16` · `--radius-8` |
| Band | Background | all | `--color-background-subtle` |
| Band | Padding · radius | all | `--space-16` · `--radius-8` |
| Band | Gap previous / next | all | `--space-8` |
| Close, previous, next | IconButton | all | `primary` (icons `close`, `arrow_back`, `arrow_forward`) |
| Previous, next | Focus ring | focus | `--border-width-2` · `--color-border-focus` |
| Close | Focus ring (double) | focus | inside `--border-width-2` · `--color-border-focus-inverse` (white), outside `--border-width-2` · `--color-border-focus` (brown) |
| Opening / closing | Motion | all | `--duration-300` · `--easing-ease-out` |

### Contrast (WCAG 2.2 AA)
| Pair | Ratio |
| ---- | ----- |
| Caption (`text.primary` on `background.subtle`) | 13.99:1 ✓ |
| Button icon (`icon.inverse` on `background.brand`) | 6.10:1 ✓ |
| Button on the band (`background.brand` on `background.subtle`) | 5.50:1 ✓ |
| Focus ring in the band (`border.focus` on `background.subtle`) | 5.50:1 ✓ |
| Close button double focus ring on the dimmed background | white and brown rings 6.10:1 between them; against the dimmed background on a white page: brown 2.36:1, white 2.58:1 — **below 3:1, accepted by the Design System Lead** (2026-10-23) |

## Open questions
- None.
