# Chip — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
One choice of a chip group, to switch the view or filter the content. Building block of **ChipGroup** (molecule), which arranges the chips. Same look as the chips already used on the documentation site (Backlog category filter, Design preview variant switch).

## Types
| Type | Purpose |
| ---- | ------- |
| Chip (single type) | A compact button showing one choice; selected when its choice is active. |

## Anatomy
1. Container — background, border and corner radius (required).
2. Label — the name of the panel (required). Text only: no icon, no counter.

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `selected` | `true` / `false` | `false` | `true` on the chip whose choice is active. |

### Combinations
- Allowed: all combinations.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Label | Yes | Components | No fixed limit | One line; cut with an ellipsis when the chip is wider than its container. |

## Sizes
One size.

| Size | Text style | Padding (vertical / horizontal) | Radius | Border |
| ---- | ---------- | ------------------------------- | ------ | ------ |
| Default | `body` | `--space-4` / `--space-16` | `--radius-8` | `--border-width-1` |

Target size (WCAG 2.5.8): height = `body` line height + 2 × `--space-4` + 2 × `--border-width-1`, above 24px.

## States
- **Default** — not selected: page background, strong border, primary text. Selected: brand background and border, inverse text.
- **Hover** — state layer `--state-layer-hover` in the content color.
- **Focus** — state layer `--state-layer-focus` and focus ring `--color-border-focus`, `--border-width-2` outline with a `--border-width-2` offset.
- **Pressed** — state layer `--state-layer-pressed`.
- **No disabled state.**

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | `selected = false` | `--color-background-page` |
| Container | Background | `selected = true` | `--color-background-brand` |
| Container | Border color | `selected = false` | `--color-border-strong` |
| Container | Border color | `selected = true` | `--color-background-brand` |
| Container | Border width | all | `--border-width-1` |
| Container | Padding vertical / horizontal | all | `--space-4` / `--space-16` |
| Container | Radius | all | `--radius-8` |
| Container | State layer (content color) | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` |
| Container | Focus outline color | focus | `--color-border-focus` |
| Container | Focus outline width / offset | focus | `--border-width-2` |
| Label | Text style | all | `body` (`.ds-text-body`) |
| Label | Color | `selected = false` | `--color-text-primary` |
| Label | Color | `selected = true` | `--color-text-inverse` |

Contrast (already checked in `tokens/contrast-pairs.json`): `text.primary` on `background.page`, `text.inverse` on `background.brand` — 4.5:1; `border.strong` on `background.page` — 3:1.

## Open questions
- None.
