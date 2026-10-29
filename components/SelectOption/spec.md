# SelectOption — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** atom — building block of the **Select** (molecule, B021), built first.

## Purpose
One option of the Select list: shows a choice, and which choice is selected.

## Types
| Type | Purpose |
| ---- | ------- |
| SelectOption | The only type. Differences go through the `selected`, `disabled` and `icon` properties. |

## Anatomy
1. Container (required)
2. Leading icon (optional) — before the label
3. Label (required)
4. Check mark (selected option only) — `check` icon, on the right

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `selected` | `true` / `false` | `false` | The option currently chosen in the Select. |
| `disabled` | `true` / `false` | `false` | The option is shown but cannot be chosen. |
| `icon` | Any Material Symbols name, or none | none | Leading icon, shown before the label. |

### Combinations
- Allowed: all combinations, except the forbidden one below.
- Forbidden:

| Combination | Reason |
| ----------- | ------ |
| `selected` + `disabled` | The chosen option always stays available. |

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Label | Yes | "In progress" | 25 characters | Single line, cut with an ellipsis ("…") when space is missing |

## Sizes
One size only. The option takes the full width of the list.

| Size | Height | Padding | Text style | Icon size |
| ---- | ------ | ------- | ---------- | --------- |
| Default | ≈ 37px (label line height + padding) | `--space-8` (all sides) | `body` · `label` when selected | `--icon-size-20` (leading icon and check mark) |

- Gap between icon, label and check mark: `--space-8`.
- Corner radius: `--radius-8`.
- Interactive target: full width × ≈ 37px, above the 24×24px minimum (WCAG 2.5.8).

## States
- Interaction (state layers, in the content color): **Default · Hover** (`--state-layer-hover`) **· Focus** (`--state-layer-focus` + outline) **· Pressed** (`--state-layer-pressed`)
- **Selected** — the option currently chosen: cream background, brown label in semibold, brown icon, check mark on the right.
- **Disabled** — disabled text and icon colors, transparent background. Never combined with selected.

Focus outline: `--border-width-2` solid `--color-border-focus`.

## Design tokens
The option sits on the list background (`--color-background-surface`), which belongs to the Select.

| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | default | none (transparent) |
| Container | Background | selected | `--color-background-brand-subtle` |
| Container | Padding | all | `--space-8` |
| Container | Gap | all | `--space-8` |
| Container | Radius | all | `--radius-8` |
| Container | Focus outline | focus | `--border-width-2` · `--color-border-focus` |
| Container | State layer | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` |
| Label | Text style | default | `body` |
| Label | Text style | selected | `label` |
| Label | Color | default | `--color-text-primary` |
| Label | Color | selected | `--color-text-brand` |
| Label | Color | disabled | `--color-text-disabled` |
| Leading icon | Size | all | `--icon-size-20` |
| Leading icon | Color | default | `--color-icon-secondary` |
| Leading icon | Color | selected | `--color-icon-brand` |
| Leading icon | Color | disabled | `--color-icon-disabled` |
| Check mark | Size | selected | `--icon-size-20` |
| Check mark | Color | selected | `--color-icon-brand` |

### Contrast (WCAG 2.2 AA)
| Pair | Ratio |
| ---- | ----- |
| Label (`text-primary`) on list (`background-surface`) | 5.85:1 ✓ |
| Leading icon (`icon-secondary`) on list | 5.85:1 ✓ |
| Selected label (`text-brand`) on `background-brand-subtle` | 5.35:1 ✓ |
| Check mark / selected icon (`icon-brand`) on `background-brand-subtle` | 5.35:1 ✓ |
| Disabled | exempt |

## Open questions
-
