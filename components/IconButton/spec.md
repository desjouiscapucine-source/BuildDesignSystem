# IconButton — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** atom

## Purpose
A button with an icon only, for a frequent or obvious action.

## Types
| Type | Purpose |
| ---- | ------- |
| IconButton | The only type. |

## Anatomy
1. Container (required) — a rounded square
2. Icon (required) — a Material Symbols icon

No visible label: the name of the action is given to screen readers (`label`).

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `variant` | `primary`, `secondary`, `tertiary` | `primary` | Level of importance of the action. |
| `icon` | Any Material Symbols name | — (required) | The icon (e.g. `timeline`, `close`). |
| `label` | Text | — (required) | Name of the action announced to screen readers (e.g. "Close the timeline"). |

| Variant | Description |
| ------- | ----------- |
| `primary` | Filled with the brand color. |
| `secondary` | Cream background. |
| `tertiary` | Icon only, no background. |

### Combinations
- Allowed: all variants with any icon.
- Forbidden: none.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Accessible name (`label`) | Yes | "Close the timeline" | — | Not displayed |

No tooltip for now (will come with the Tooltip component).

## Sizes
One size only.

| Size | Box | Padding | Icon size |
| ---- | --- | ------- | --------- |
| Default | 36px square (icon + padding) | `--space-8` | `--icon-size-20` |

- Corner radius: `--radius-8`.
- Interactive target: 36 × 36px, above the 24×24px minimum (WCAG 2.5.8).

## States
- Interaction (state layers, in the content color): **Default · Hover** (`--state-layer-hover`) **· Focus** (`--state-layer-focus` + outline) **· Pressed** (`--state-layer-pressed`)
- **Disabled**

Focus outline: `--border-width-2` solid `--color-border-focus`, outside the button.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | primary | `--color-background-brand` |
| Container | Background | secondary | `--color-background-brand-subtle` |
| Container | Background | tertiary | none (transparent) |
| Container | Background | disabled (primary, secondary) | `--color-background-disabled` |
| Container | Background | disabled (tertiary) | none (transparent) |
| Container | Padding | all | `--space-8` |
| Container | Radius | all | `--radius-8` |
| Container | Focus outline | focus | `--border-width-2` · `--color-border-focus` |
| Container | State layer | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` |
| Icon | Size | all | `--icon-size-20` |
| Icon | Color | primary | `--color-icon-inverse` |
| Icon | Color | secondary | `--color-icon-primary` |
| Icon | Color | tertiary | `--color-icon-brand` |
| Icon | Color | disabled | `--color-icon-disabled` |

### Contrast (WCAG 2.2 AA — icons: 3:1)
| Variant | Default | Hover | Focus | Pressed |
| ------- | ------- | ----- | ----- | ------- |
| primary | 6.10:1 ✓ | 5.07:1 ✓ | 4.64:1 ✓ | 3.58:1 ✓ |
| secondary | 13.62:1 ✓ | 11.72:1 ✓ | 10.83:1 ✓ | 8.44:1 ✓ |
| tertiary (on page) | 6.10:1 ✓ | 5.47:1 ✓ | 5.17:1 ✓ | 4.33:1 ✓ |
| disabled | exempt | — | — | — |

## Open questions
- None.
