# Card — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** molecule

## Purpose
A container that groups the content of one subject.

A **TimelineStep** can lead to a card: the step links to the card's anchor (`href="#…"` on the step, `id` on the card).

With the **`clickable-image`** variant, the card also shows images as thumbnails; a click on a thumbnail opens it larger in the **ImageViewer**.

## Types
| Type | Purpose |
| ---- | ------- |
| Card | The only type. |

## Anatomy
1. Container (required) — white background with a thin border
2. Title (required)
3. Text (required) — under the title: text, or rich content (lists, tables, a disclosure…), never another card
4. Thumbnails (`clickable-image` only) — under the text, 3 per row; each one is a button that opens the ImageViewer

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `variant` | `default`, `clickable-image` | `default` | `clickable-image` adds clickable thumbnails under the text. |
| `images` | List of `{ src, alt, caption?, thumbnailSrc? }` (same as the ImageViewer) | — | `clickable-image` only, at least one image, no maximum. The thumbnail shows `thumbnailSrc` (or `src`); the ImageViewer receives the list as is. |
| `title` | Text | — (required) | Title of the card. |
| `children` | Text or rich content | — (required) | The text of the card; it can also hold lists, tables or a disclosure (never another card). |
| `id` | Text | — (optional) | Anchor the card can be reached at (e.g. from a TimelineStep). |
| `headingLevel` | 2 – 6 | 2 | Level of the title heading announced to screen readers (`h2`…`h6`); the look does not change. |

### Combinations
- `default`: no images (no thumbnails).
- `clickable-image`: at least one image. **Forbidden**: `clickable-image` without images (nothing to click), `default` with images.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Title | Yes | "Order shipped" | 60 characters | Wraps |
| Text | Yes | "The parcel left the warehouse…" | No limit | Wraps; the card grows in height. Rich content (list, table, disclosure) follows the same rule |
| Image alternative text (`alt`) | Yes, per image (`clickable-image`) | "North facade of the building" | — | Not displayed; names the thumbnail button: "Open image: North facade of the building" |

## Sizes
One size only. The card takes the **full width available** (the column that contains it).

| Part | Size |
| ---- | ---- |
| Container | Padding `--space-16` |
| Title / text | Gap `--space-8` |
| Blocks inside the text (paragraphs, lists, tables, a disclosure) | Gap `--space-16` |
| Text / thumbnails (`clickable-image`) | Gap `--space-16` |
| Thumbnails (`clickable-image`) | **3 per row**, each one third of the content width (minus the gaps); ratio **16:9** (the image is cropped to fill it); corners `--radius-8`; gap `--space-8`; more than 3 → next row |

## States
- No interaction state on the card: the card itself is **not clickable**.
- No selected state.
- **Thumbnails** (`clickable-image`): interaction states with state layers — hover (`--state-layer-hover`), focus (`--state-layer-focus` + outline `--border-width-2` `--color-border-focus`), pressed (`--state-layer-pressed`). A click opens the **ImageViewer** on that image (`index`); closing it brings the focus back to the thumbnail.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | all | `--color-background-page` |
| Container | Border color | all | `--color-border-subtle` |
| Container | Border width | all | `--border-width-1` |
| Container | Radius | all | `--radius-8` |
| Container | Padding | all | `--space-16` |
| Container | Gap title / text | all | `--space-8` |
| Text | Gap between its blocks | all | `--space-16` |
| Title | Text style · color | all | `heading-5` · `--color-text-primary` |
| Text | Text style · color | all | `body` · `--color-text-primary` |
| Thumbnails | Gap with the text | `clickable-image` | `--space-16` |
| Thumbnails | Gap between thumbnails | `clickable-image` | `--space-8` |
| Thumbnail | Radius | `clickable-image` | `--radius-8` |
| Thumbnail | State layer | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` (in `--color-text-primary`) |
| Thumbnail | Focus outline | focus | `--border-width-2` · `--color-border-focus` |

### Contrast (WCAG 2.2 AA)
| Pair | Ratio |
| ---- | ----- |
| Title and text (`text.primary` on `background.page`) | 15.52:1 ✓ |
| Border (`border.subtle`) | 1.25:1 — decorative |
| Thumbnail focus outline (`border.focus` on `background.page`) | 6.10:1 ✓ |

## Open questions
- None.
