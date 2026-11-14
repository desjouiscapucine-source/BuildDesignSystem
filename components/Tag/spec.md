# Tag — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
A small label that names a category or a status. Replaces the tags drawn by hand on the documentation site (Atomic Design level, backlog category, "Decided"). Not interactive. Different from the Badge (counter).

## Types
| Type | Purpose |
| ---- | ------- |
| Tag (single type) | A small, static label showing one category or one status. |

## Anatomy
1. Container — background and corner radius (required). No border.
2. Icon — a Material Symbol before the label (optional).
3. Label — the name of the category or status (required).

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `tone` | `neutral` / `brand` / `success` / `warning` / `error` / `info` | `neutral` | Color of the tag. `brand` highlights content without the meaning of a feedback state (B141). |
| `icon` | Material Symbol name, or none | none | Icon shown before the label. |

### Combinations
- Allowed: all combinations.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Label | Yes | Decided | No fixed limit | One line; cut with an ellipsis when the tag is wider than its container. |

Capitalization: the label is shown as written (no text transform).

## Sizes
One size.

| Size | Text style | Padding (vertical / horizontal) | Radius | Icon size | Gap icon / label |
| ---- | ---------- | ------------------------------- | ------ | --------- | ---------------- |
| Default | `label-sm` | `--space-0` / `--space-8` | `--radius-4` | `--icon-size-16` | `--space-4` |

Not interactive: no target size requirement (WCAG 2.5.8 does not apply).

## States
- **Default** only.
- **No interaction states** (hover, focus, pressed): the tag is not interactive.
- **No disabled state.**

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | `tone = neutral` | `--color-background-subtle` |
| Container | Background | `tone = brand` | `--color-background-brand-subtle` |
| Container | Background | `tone = success` / `warning` / `error` / `info` | `--color-background-success-subtle` / `-warning-subtle` / `-error-subtle` / `-info-subtle` |
| Container | Padding vertical / horizontal | all | `--space-0` / `--space-8` |
| Container | Radius | all | `--radius-4` |
| Container | Gap icon / label | all | `--space-4` |
| Label | Text style | all | `label-sm` (`.ds-text-label-sm`) |
| Label | Color | `tone = neutral` | `--color-text-secondary` |
| Label | Color | `tone = brand` | `--color-text-brand` |
| Label | Color | `tone = success` / `warning` / `error` / `info` | `--color-text-success` / `-warning` / `-error` / `-info` |
| Icon | Size | all | `--icon-size-16` |
| Icon | Color | `tone = neutral` | `--color-icon-secondary` |
| Icon | Color | `tone = brand` | `--color-icon-brand` |
| Icon | Color | `tone = success` / `warning` / `error` / `info` | `--color-icon-success` / `-warning` / `-error` / `-info` |

Contrast (checked in `tokens/contrast-pairs.json`): every label color on its background — 4.5:1; every icon color on its background — 3:1 (`icon.secondary` on `background.subtle` added for this component; `icon.brand` on `background.brand-subtle` added for the brand tone, B141).

## Open questions
- None.
