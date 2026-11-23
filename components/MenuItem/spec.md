# MenuItem — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** atom — building block of the **Menu** (molecule, B167), built first.

## Purpose
One tile of the Menu: an icon above a label, like an app of the Google apps menu. Chosen, it runs an action.

## Types
| Type | Purpose |
| ---- | ------- |
| MenuItem | The only type. The only difference goes through the `disabled` property. |

## Anatomy
1. Container (required)
2. Icon (required) — above the label
3. Label (required) — centered, under the icon

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `icon` | Any Material Symbols name | — (required) | Icon shown above the label. |
| `disabled` | `true` / `false` | `false` | The action is shown but cannot be chosen. |

### Combinations
- Allowed: all combinations. Forbidden: none.
- No `selected` property and no tone: a tile runs an action, it is not a choice.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Label | Yes | "Mail" | 20 characters | Single line, cut with an ellipsis ("…") |

## Sizes
One size only. The tile fills its grid cell (3 columns in the Menu).

| Size | Padding | Gap | Text style | Icon size |
| ---- | ------- | --- | ---------- | --------- |
| Default | `--space-16` top and bottom, `--space-8` left and right | `--space-8` | `body-sm`, centered | `--icon-size-32` |

- Corner radius: `--radius-8`.
- Interactive target: the whole tile, well above 24×24px (WCAG 2.5.8).

## States
- Interaction (state layers, in the content color): **Default · Hover** (`--state-layer-hover`) **· Focus** (`--state-layer-focus` + outline) **· Pressed** (`--state-layer-pressed`)
- **Disabled** — the tile keeps its brand background; the label and the icon take the disabled colors.

Focus outline: `--border-width-2` solid `--color-border-focus`.

## Design tokens
The tile sits on the Menu panel (`--color-background-surface`), which belongs to the Menu.

| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | default | `--color-background-brand` |
| Container | Padding | all | `--space-16` (top, bottom) · `--space-8` (left, right) |
| Container | Gap | all | `--space-8` |
| Container | Radius | all | `--radius-8` |
| Container | Focus outline | focus | `--border-width-2` · `--color-border-focus` |
| Container | State layer | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` |
| Label | Text style | all | `body-sm` |
| Label | Color | default | `--color-text-inverse` |
| Label | Color | disabled | `--color-text-disabled` |
| Icon | Size | all | `--icon-size-32` |
| Icon | Color | default | `--color-icon-inverse` |
| Icon | Color | disabled | `--color-icon-disabled` |

### Contrast (WCAG 2.2 AA)
| Pair | Ratio |
| ---- | ----- |
| Label (`text-inverse`) on tile (`background-brand`) | 6.10:1 ✓ |
| Icon (`icon-inverse`) on tile (`background-brand`) | 6.10:1 ✓ |
| Disabled | exempt |

## Open questions
- Tile width (set by the Menu grid).
