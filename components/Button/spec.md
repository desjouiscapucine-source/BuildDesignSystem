# Button — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** atom

## Purpose
Triggers an action or goes to another page.

Rendered as `<button>` for an action, and as `<a href>` for navigation. Same look in both cases.

## Types
| Type | Purpose |
| ---- | ------- |
| Button | The only type. Differences go through the `variant` and `icon` properties. |

## Anatomy
1. Container (required)
2. Leading icon (optional) — before the label
3. Label (required)

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `variant` | `primary`, `secondary`, `tertiary`, `danger` | `primary` | Level of importance of the action. |
| `icon` | Any Material Symbols name, or none | none | Leading icon, shown before the label. |

| Variant | Description |
| ------- | ----------- |
| `primary` | Main action: filled with the brand color. |
| `secondary` | Secondary action: cream background. |
| `tertiary` | Discreet action: text only, no background. |
| `danger` | Destructive action: light error background. |

### Combinations
- Allowed: all combinations (every variant, with or without icon).
- Forbidden: none.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Label | Yes | "Save changes" | 25 characters | Single line, cut with an ellipsis ("…") when space is missing |

## Sizes
One size only. The button always takes the width of its content (no full-width option).

| Size | Height | Padding | Text style | Icon size |
| ---- | ------ | ------- | ---------- | --------- |
| Default | ≈ 37px (label line height + padding) | `--space-16` horizontal · `--space-8` vertical | `label` (`--typography-label-*`) | `--icon-size-20` |

- Gap between icon and label: `--space-8`.
- Corner radius: `--radius-8`.
- Interactive target: ≈ 37px high, above the 24×24px minimum (WCAG 2.5.8).

## States
- Interaction (state layers, in the content color): **Default · Hover** (`--state-layer-hover`) **· Focus** (`--state-layer-focus` + outline) **· Pressed** (`--state-layer-pressed`)
- **Disabled**
- No component-specific state (no loading).

Focus outline: `--border-width-2` solid `--color-border-focus`, outside the button.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | primary | `--color-background-brand` |
| Container | Background | secondary | `--color-background-brand-subtle` |
| Container | Background | tertiary | none (transparent) |
| Container | Background | danger | `--color-background-error-subtle` |
| Container | Background | disabled (primary, secondary, danger) | `--color-background-disabled` |
| Container | Background | disabled (tertiary) | none (transparent) |
| Container | Border width | all | `--border-width-0` |
| Container | Padding | all | `--space-16` / `--space-8` |
| Container | Gap | all | `--space-8` |
| Container | Radius | all | `--radius-8` |
| Container | Focus outline | focus | `--border-width-2` · `--color-border-focus` |
| Container | State layer | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` |
| Label | Text style | all | `label` |
| Label | Color | primary | `--color-text-inverse` |
| Label | Color | secondary | `--color-text-primary` |
| Label | Color | tertiary | `--color-text-brand` |
| Label | Color | danger | `--color-text-error` |
| Label | Color | disabled | `--color-text-disabled` |
| Icon | Size | all | `--icon-size-20` |
| Icon | Color | primary | `--color-icon-inverse` |
| Icon | Color | secondary | `--color-icon-primary` |
| Icon | Color | tertiary | `--color-icon-brand` |
| Icon | Color | danger | `--color-icon-error` |
| Icon | Color | disabled | `--color-icon-disabled` |

### Contrast (WCAG 2.2 AA)
| Variant | Label on background | Icon on background |
| ------- | ------------------- | ------------------ |
| primary | 6.10:1 ✓ | 6.10:1 ✓ |
| secondary | 13.62:1 ✓ | 13.62:1 ✓ |
| tertiary (on page) | 6.10:1 ✓ | 6.10:1 ✓ |
| danger | 7.88:1 ✓ | 5.64:1 ✓ |
| disabled | exempt | exempt |

**With the state layer applied** (label on the resulting background):

| Variant | Hover | Focus | Pressed |
| ------- | ----- | ----- | ------- |
| primary | 5.07:1 ✓ | 4.64:1 ✓ | 3.58:1 — accepted |
| secondary | 11.72:1 ✓ | 10.83:1 ✓ | 8.44:1 ✓ |
| tertiary | 5.47:1 ✓ | 5.17:1 ✓ | 4.33:1 — accepted |
| danger | 6.93:1 ✓ | 6.49:1 ✓ | 5.27:1 ✓ |

Decision of the Design System Lead: the **pressed** state is momentary (only while clicking), so the lower contrast of primary and tertiary in this state is **accepted**.

## Open questions
- None.
