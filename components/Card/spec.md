# Card — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** molecule

## Purpose
A container that groups the content of one subject.

A **TimelineStep** can lead to a card: the step links to the card's anchor (`href="#…"` on the step, `id` on the card).

## Types
| Type | Purpose |
| ---- | ------- |
| Card | The only type. |

## Anatomy
1. Container (required) — white background with a thin border
2. Title (required)
3. Text (required) — under the title

## Variants

### Variant properties
None: the card has a single look (no selected state).

| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `title` | Text | — (required) | Title of the card. |
| `children` | Text | — (required) | The text of the card. |
| `id` | Text | — (optional) | Anchor the card can be reached at (e.g. from a TimelineStep). |
| `headingLevel` | 2 – 6 | 2 | Level of the title heading announced to screen readers (`h2`…`h6`); the look does not change. |

### Combinations
- Not applicable (no variant property).

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Title | Yes | "Order shipped" | 60 characters | Wraps |
| Text | Yes | "The parcel left the warehouse…" | No limit | Wraps; the card grows in height |

## Sizes
One size only. The card takes the **full width available** (the column that contains it).

| Part | Size |
| ---- | ---- |
| Container | Padding `--space-16` |
| Title / text | Gap `--space-8` |

## States
- No interaction state: the card is **not clickable**.
- No selected state.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | all | `--color-background-page` |
| Container | Border color | all | `--color-border-subtle` |
| Container | Border width | all | `--border-width-1` |
| Container | Radius | all | `--radius-8` |
| Container | Padding | all | `--space-16` |
| Container | Gap title / text | all | `--space-8` |
| Title | Text style · color | all | `heading-5` · `--color-text-primary` |
| Text | Text style · color | all | `body` · `--color-text-primary` |

### Contrast (WCAG 2.2 AA)
| Pair | Ratio |
| ---- | ----- |
| Title and text (`text.primary` on `background.page`) | 15.52:1 ✓ |
| Border (`border.subtle`) | 1.25:1 — decorative |

## Open questions
- None.
