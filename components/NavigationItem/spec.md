# NavigationItem — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** molecule

## Purpose
A link in a navigation, with an icon and a label. It always leads to a page (`<a href>`).

It sits on the **brand background** of the side navigation.

## Types
| Type | Purpose |
| ---- | ------- |
| NavigationItem | The only type. |

## Anatomy
1. Container (required) — takes the full width of the navigation
2. Icon (required) — aligned with the first line of the label
3. Label (required)

## Variants

### Variant properties
None: the item has a single look. Its differences are **states** (see States).

| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `icon` | Any Material Symbols name | — (required) | Icon before the label. |
| `href` | A page address | — (required) | The page the item leads to. |
| `selected` | `true` / `false` | `false` | The item of the page currently displayed. |
| `disabled` | `true` / `false` | `false` | The page is not available. |

### Combinations
- Allowed: all, except the forbidden one below.

| Combination | Reason |
| ----------- | ------ |
| `selected` + `disabled` | The page currently displayed is always available. |

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Label | Yes | "Dashboard" | 20 characters | Wraps to a new line; the icon stays aligned with the first line |

## Sizes
One size only.

| Size | Height | Padding | Text style | Icon size |
| ---- | ------ | ------- | ---------- | --------- |
| Default | ≈ 37px for one line (label line height + padding) | `--space-8` (all sides) | `body` · `label` when selected | `--icon-size-20` |

- Gap between icon and label: `--space-8`.
- Corner radius: `--radius-8`.
- Interactive target: full width × ≈ 37px, above the 24×24px minimum (WCAG 2.5.8).

## States
- Interaction (state layers, in the content color): **Default · Hover** (`--state-layer-hover`) **· Focus** (`--state-layer-focus` + outline) **· Pressed** (`--state-layer-pressed`)
- **Selected** — the item of the page currently displayed: cream background, brown label in semibold.
- **Disabled** — the whole item at `--opacity-disabled` (0.38), no state layer.

Focus outline: `--border-width-2` solid `--color-border-focus-inverse` (white on the brand background).

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Context | Background the item sits on | all | `--color-background-brand` |
| Container | Background | default | none (transparent) |
| Container | Background | selected | `--color-background-brand-subtle` |
| Container | Padding | all | `--space-8` |
| Container | Gap | all | `--space-8` |
| Container | Radius | all | `--radius-8` |
| Container | Focus outline | focus | `--border-width-2` · `--color-border-focus-inverse` |
| Container | State layer | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` |
| Container | Opacity | disabled | `--opacity-disabled` |
| Label | Text style | default | `body` |
| Label | Text style | selected | `label` |
| Label | Color | default | `--color-text-inverse` |
| Label | Color | selected | `--color-text-brand` |
| Icon | Size | all | `--icon-size-20` |
| Icon | Color | default | `--color-icon-inverse` |
| Icon | Color | selected | `--color-icon-brand` |

### Contrast (WCAG 2.2 AA)
| State | Label | Icon | Focus outline |
| ----- | ----- | ---- | ------------- |
| Default (white on brand) | 6.10:1 ✓ | 6.10:1 ✓ | 6.10:1 ✓ |
| Selected (brand on cream) | 5.35:1 ✓ | 5.35:1 ✓ | — |
| Disabled | exempt | exempt | — |

**With the state layer applied:**

| State | Hover | Focus | Pressed |
| ----- | ----- | ----- | ------- |
| Default | 5.07:1 ✓ | 4.64:1 ✓ | 3.58:1 — accepted |
| Selected | 4.82:1 ✓ | 4.57:1 ✓ | 3.87:1 — accepted |

Decision of the Design System Lead: as for the Button, the **pressed** state is momentary, so its lower contrast is **accepted**.

## Open questions
- **Counter**: a counter will be added with the future **Badge** component (spec update to approve then).
