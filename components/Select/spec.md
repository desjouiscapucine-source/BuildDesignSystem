# Select — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** molecule — built from its building block **SelectOption** (atom, B117).

## Purpose
Lets the user choose one option in a list that opens under a field.

## Types
| Type | Purpose |
| ---- | ------- |
| Select | The only type: single choice. |

## Anatomy
1. Label (required) — above the field
2. Field (required) — the container that opens the list
3. Value or placeholder (required) — the chosen option, or the placeholder while none is chosen
4. Arrow (required) — `expand_more` icon on the right of the field, turned upside down when the list is open
5. List (when open) — under the field, over the page
6. Options (required) — **SelectOption** components, in the list
7. Error message (optional) — under the field, with an `error` icon before it

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `label` | Text | — (required) | Names the field. |
| `placeholder` | Text, or none | none | Shown while no option is chosen. |
| `value` | One of the options, or none | none | The chosen option (shown in the field, selected in the list). |
| `error` | Text, or none | none | Error message; the field takes the error border. |
| `disabled` | `true` / `false` | `false` | The Select cannot be opened. |

### Combinations
- Allowed: all combinations, except the forbidden one below.
- Forbidden:

| Combination | Reason |
| ----------- | ------ |
| `error` + `disabled` | A disabled Select cannot be corrected by the user. |

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Label | Yes | "Status" | 25 characters | Single line, cut with an ellipsis ("…") |
| Placeholder | No | "Choose a status" | Width of the field | Single line, cut with an ellipsis |
| Value | — | "In progress" (the label of the chosen option) | 25 characters (SelectOption) | Single line, cut with an ellipsis |
| Error message | No | "Choose a status to save the task" | One sentence | Wraps to a new line |
| Options | Yes | "To do", "In progress", "Done" | See SelectOption | See SelectOption |

## Sizes
One size only. The Select takes the **full width** of its container; the list takes the width of the field.

| Part | Height | Padding | Text style | Icon size |
| ---- | ------ | ------- | ---------- | --------- |
| Label | One line | — | `label` | — |
| Field | ≈ 39px (value line height + padding + border) | `--space-16` horizontal · `--space-8` vertical | `body` | `--icon-size-20` (arrow) |
| List | Height of its options (no maximum) | `--space-4` | — | — |
| Error message | One line or more | — | `body-sm` | `--icon-size-16` (error icon) |

- Space between label and field: `--space-4`.
- Space between field and list: `--space-4`. Space between options: `--space-4`.
- Space between field and error message: `--space-4`.
- Corner radius (field and list): `--radius-8`.
- The list opens **over the page** (and over dialogs), at `--z-index-dropdown`.
- The field is ≈ 39px high, 2px more than the Button (its border): kept as is.
- Interactive target: full width × ≈ 39px, above the 24×24px minimum (WCAG 2.5.8).

## States
- Interaction on the field (state layers, in the content color): **Default · Hover** (`--state-layer-hover`) **· Focus** (`--state-layer-focus` + outline) **· Pressed** (`--state-layer-pressed`)
- **Placeholder** — no option chosen: placeholder text in the secondary color.
- **Open** — list shown: field border in `--color-border-focus`, arrow turned upside down.
- **Error** — field border in `--color-border-error`, error message under the field.
- **Disabled** — disabled background, subtle border, label, value, placeholder and arrow in the disabled colors; the list cannot be opened.

Focus outline: `--border-width-2` solid `--color-border-focus`.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Label | Text style | all | `label` |
| Label | Color | default | `--color-text-primary` |
| Label | Color | disabled | `--color-text-disabled` |
| Label | Space to field | all | `--space-4` |
| Field | Background | default | `--color-background-surface` |
| Field | Background | disabled | `--color-background-disabled` |
| Field | Border width | all | `--border-width-1` |
| Field | Border color | default | `--color-border-strong` |
| Field | Border color | open | `--color-border-focus` |
| Field | Border color | error | `--color-border-error` |
| Field | Border color | disabled | `--color-border-subtle` |
| Field | Padding | all | `--space-16` / `--space-8` |
| Field | Radius | all | `--radius-8` |
| Field | Focus outline | focus | `--border-width-2` · `--color-border-focus` |
| Field | State layer | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` |
| Value | Text style | all | `body` |
| Value | Color | default | `--color-text-primary` |
| Value | Color | disabled | `--color-text-disabled` |
| Placeholder | Color | default | `--color-text-secondary` |
| Placeholder | Color | disabled | `--color-text-disabled` |
| Arrow | Size | all | `--icon-size-20` |
| Arrow | Color | default | `--color-icon-secondary` |
| Arrow | Color | disabled | `--color-icon-disabled` |
| List | Background | open | `--color-background-surface` |
| List | Border | open | `--border-width-1` · `--color-border-default` |
| List | Padding | open | `--space-4` |
| List | Gap between options | open | `--space-4` |
| List | Space to field | open | `--space-4` |
| List | Radius | open | `--radius-8` |
| List | Stacking | open | `--z-index-dropdown` |
| Error message | Text style | error | `body-sm` |
| Error message | Color | error | `--color-text-error` |
| Error message | Icon | error | `error` · `--icon-size-16` · `--color-icon-error` |
| Error message | Space to field | error | `--space-4` |
| Error message | Space between icon and text | error | `--space-4` |

Options: see the SelectOption spec.

### Contrast (WCAG 2.2 AA)
| Pair | Ratio |
| ---- | ----- |
| Label (`text-primary`) on page | 15.52:1 ✓ |
| Value (`text-primary`) on field (`background-surface`) | 14.87:1 ✓ |
| Placeholder (`text-secondary`) on field | 5.26:1 ✓ |
| Field border (`border-strong`) on page | 6.10:1 ✓ |
| Arrow (`icon-secondary`) on field | 5.26:1 ✓ |
| Error message (`text-error`) on page | 8.26:1 ✓ |
| Disabled | exempt |

## Open questions
-
