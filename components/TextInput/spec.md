# TextInput — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** molecule — field, leading icon, clear button and help or error message in one component, like the Select.

## Purpose
Lets the user type a single line of text, a search or a number.

## Types
| Type | Purpose |
| ---- | ------- |
| `text` (default) | Free text on one line. |
| `search` | A search: fixed `search` icon before the text, clear button once the field holds text. |
| `number` | A number: digits only, numeric keyboard on mobile, no + / − buttons, aligned left. |

## Anatomy
1. Field (required) — the container the user types in
2. Label or placeholder (one of them, required) — **inside** the empty field; disappears as soon as the user types. There is **no label above the field**.
3. Value (when filled) — the text typed
4. Leading icon (optional) — before the text; always `search` for the `search` type
5. Clear button (`search` type, when filled) — `close` icon on the right of the field
6. Help text (optional) — under the field
7. Error message (optional) — under the field, with an `error` icon before it; **replaces the help text**

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `type` | `text` / `search` / `number` | `text` | Type of the field. |
| `label` | Text, or none | none | Names the field; shown in the empty field. |
| `placeholder` | Text, or none | none | Shown in the empty field. |
| `icon` | A Material Symbols name, or none | none | Icon before the text (`text` type only). |
| `helpText` | Text, or none | none | Help text under the field. |
| `error` | Text, or none | none | Error message under the field (replaces the help text); the field takes the error border. |
| `disabled` | `true` / `false` | `false` | The field cannot be used. |

A field has **either a `label` or a `placeholder`**, never both and never none.

### Combinations
- Allowed: all combinations, except the forbidden ones below.
- Forbidden:

| Combination | Reason |
| ----------- | ------ |
| `label` + `placeholder` | The empty field shows one text only: either a label or a placeholder. |
| `error` + `disabled` | A disabled field cannot be corrected by the user. |
| `icon` + `search` | The search type already has its fixed `search` icon. |
| `icon` + `number` | No icon before a number. |
| `helpText` + `search` | The search type has no help text. |

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Label | One of label / placeholder | "Email" | 25 characters | Single line, cut with an ellipsis ("…") |
| Placeholder | One of label / placeholder | "Enter a name" | Width of the field | Single line, cut with an ellipsis |
| Value | — | "Primary button" | None | Scrolls horizontally while typing; cut with an ellipsis when the field is not focused |
| Help text | No | "Shown on the component page" | One sentence | Wraps to a new line |
| Error message | No | "Enter a name to save the component" | One sentence | Wraps to a new line |

## Sizes
One size only. The TextInput takes the **full width** of its container.

| Part | Height | Padding | Text style | Icon size |
| ---- | ------ | ------- | ---------- | --------- |
| Field | ≈ 39px (value line height + padding + border), same as the Select | `--space-16` horizontal · `--space-8` vertical | `body` | `--icon-size-20` (leading icon, clear icon) |
| Help text / error message | One line or more | — | `body-sm` | `--icon-size-16` (error icon) |

- Space between the icons and the text: `--space-8`.
- Space between field and help text or error message: `--space-4`. Space between the error icon and its text: `--space-4`.
- Corner radius: `--radius-8`.
- Clear button: the 20px icon in a target of **24×24px minimum** (WCAG 2.5.8), inside the field, which keeps its height.
- Interactive target of the field: full width × ≈ 39px, above the 24×24px minimum (WCAG 2.5.8).

## States
- Interaction on the field (state layers, in the content color): **Default · Hover** (`--state-layer-hover`) **· Focus** (`--state-layer-focus` + outline) **· Pressed** (`--state-layer-pressed`)
- Clear button: hover / focus / pressed state layers on its own target.
- **Empty** — the label or the placeholder in the secondary color.
- **Error** — field border in `--color-border-error`, error message under the field instead of the help text.
- **Disabled** — disabled background, subtle border, value, label or placeholder, icons and help text in the disabled colors; the clear button is hidden.

Focus outline: `--border-width-2` solid `--color-border-focus`.

## Accessibility
- **Accessible name**: the text shown in the empty field — the `label`, or else the `placeholder` (Design System Lead, 2026-11-19).
- Help text and error message are linked to the field (described by), so screen readers announce them.
- Clear button: announced with a name that starts with a verb (e.g. "Clear the search").

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Field | Background | default | `--color-background-surface` |
| Field | Background | disabled | `--color-background-disabled` |
| Field | Border width | all | `--border-width-1` |
| Field | Border color | default | `--color-border-strong` |
| Field | Border color | error | `--color-border-error` |
| Field | Border color | disabled | `--color-border-subtle` |
| Field | Padding | all | `--space-16` / `--space-8` |
| Field | Radius | all | `--radius-8` |
| Field | Focus outline | focus | `--border-width-2` · `--color-border-focus` |
| Field | State layer | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` |
| Value | Text style | all | `body` |
| Value | Color | default | `--color-text-primary` |
| Value | Color | disabled | `--color-text-disabled` |
| Label / placeholder | Text style | all | `body` |
| Label / placeholder | Color | default | `--color-text-secondary` |
| Label / placeholder | Color | disabled | `--color-text-disabled` |
| Leading icon, clear icon | Size | all | `--icon-size-20` |
| Leading icon, clear icon | Color | default | `--color-icon-secondary` |
| Leading icon | Color | disabled | `--color-icon-disabled` |
| Icons | Space to text | all | `--space-8` |
| Clear button | Minimum target size | `search`, filled | `--icon-size-24` (24×24px) |
| Help text | Text style | all | `body-sm` |
| Help text | Color | default | `--color-text-secondary` |
| Help text | Color | disabled | `--color-text-disabled` |
| Help text / error message | Space to field | all | `--space-4` |
| Error message | Text style | error | `body-sm` |
| Error message | Color | error | `--color-text-error` |
| Error message | Icon | error | `error` · `--icon-size-16` · `--color-icon-error` |
| Error message | Space between icon and text | error | `--space-4` |

### Contrast (WCAG 2.2 AA)
| Pair | Ratio |
| ---- | ----- |
| Value (`text-primary`) on field (`background-surface`) | 14.87:1 ✓ |
| Label / placeholder (`text-secondary`) on field | 5.26:1 ✓ |
| Help text (`text-secondary`) on page | 5.49:1 ✓ |
| Error message (`text-error`) on page | 8.26:1 ✓ |
| Icons (`icon-secondary`) on field | 5.26:1 ✓ |
| Error icon (`icon-error`) on page | 5.92:1 ✓ |
| Field border (`border-strong`) on page | 3.64:1 ✓ |
| Error border (`border-error`) on page | 3.89:1 ✓ |
| Focus outline (`border-focus`) on page | 6.10:1 ✓ |
| Disabled | exempt |

## Accepted accessibility exception
- **WCAG 3.3.2 Labels or Instructions** — no visible name once the field is filled: the label or placeholder disappears as soon as the user types. Accepted as an exception by the Design System Lead on 2026-11-21 (`audits/2026-11-19-B019-1-accessibility.md`). To cover in the guidelines: the error message names the field by itself.

## Open questions
-
