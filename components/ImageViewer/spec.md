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
4. Band (required when there are several images or a caption) — solid, under the image
5. Previous button (several images) — IconButton `primary`, icon `arrow_back`, in the band
6. Counter (several images) — "2 / 5", in the band, between the arrows
7. Next button (several images) — IconButton `primary`, icon `arrow_forward`, in the band
8. Caption (optional) — in the band, under the arrows and the counter

## Variants

### Variant properties
None: the viewer has a single look.

| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `images` | List of `{ src, alt, caption? }` | — (required) | The images, in order. `alt` is required; `caption` is optional. |
| `index` | Number | 0 | The image shown (position in `images`). |
| `open` | Boolean | — (required) | Whether the viewer is open. |
| `onClose` | Function | — (required) | Called by the close button, the Escape key. |
| `onIndexChange` | Function | — | Called by the previous / next buttons and the arrow keys, with the new index. |
| `label` | Text | "Image viewer" | Accessible name of the viewer. |

### Combinations
- **One image**: no previous / next buttons, no counter. The band shows only the caption, and is not shown when there is no caption.
- **Several images**: previous / next buttons and counter. "Previous" is **disabled on the first image**, "Next" **on the last one** (no loop).

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Counter | With several images | "2 / 5" | — | Never wraps |
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
| Space between the arrows and the counter, and above the caption | `--space-8` |
| Space between the image and the band | `--space-16` |
| Buttons | IconButton size (target at least 24×24px) |

## States
- **Open / closed.** Opening and closing use the motion tokens (`--duration-*`, `--easing-*`), so they are instant with reduced motion.
- **Previous / next disabled** at the ends (IconButton disabled state).
- The buttons keep the IconButton states (hover, focus, pressed, disabled), with a **white focus ring** (`--color-border-focus-inverse`): they sit on a dark background.

### Keyboard and focus
| Event | Result |
| ----- | ------ |
| Viewer opens | Focus goes to the close button; focus stays inside the viewer |
| Escape | Closes the viewer |
| ← / → | Previous / next image (nothing at the ends) |
| Viewer closes | Focus returns to the element that opened it (the thumbnail) |

Screen reader: the viewer is a modal dialog named by `label`; the image is announced with its `alt`; the counter and the caption are read with it.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Dimmed background | Color | all | `--color-background-overlay` |
| Viewer | Space to the screen edges | all | `--space-24` |
| Image | Radius | all | `--radius-8` |
| Image / band | Gap | all | `--space-16` |
| Band | Background | all | `--color-background-inverse` |
| Band | Padding · radius | all | `--space-16` · `--radius-8` |
| Band | Gap arrows / counter / caption | all | `--space-8` |
| Counter | Text style · color | all | `label` · `--color-text-inverse` |
| Caption | Text style · color | all | `body` · `--color-text-inverse` |
| Close, previous, next | IconButton | all | `primary` (icons `close`, `arrow_back`, `arrow_forward`) |
| Close, previous, next | Focus ring | focus | `--border-width-2` · `--color-border-focus-inverse` |
| Opening / closing | Motion | all | `--duration-300` · `--easing-ease-out` |

### Contrast (WCAG 2.2 AA)
| Pair | Ratio |
| ---- | ----- |
| Counter and caption (`text.inverse` on `background.inverse`) | 15.52:1 ✓ |
| Button icon (`icon.inverse` on `background.brand`) | 6.10:1 ✓ |
| Focus ring (`border.focus-inverse` on `background.inverse`) | 15.52:1 ✓ |
| Texts directly on the dimmed background | not used: no color reaches 4.5:1 on every page (white 2.58:1 on a white page, dark 1.57:1 on a brand page) — hence the band |

## Open questions
- None.
