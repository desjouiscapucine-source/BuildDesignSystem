# Tab — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
One tab of a tab list: a text label that shows one panel of the page when selected. Building block of **Tabs** (B093), which lines the tabs up and manages the selection.

## Types
| Type | Purpose |
| ---- | ------- |
| Underline (single type) | A text label; the selected tab has a line under it. |

## Anatomy
1. Container (required) — the clickable area, with the padding.
2. Label (required) — the text of the tab.
3. Selection indicator (selected tab only) — the line under the tab.

The line under the whole tab list belongs to **Tabs**, not to the tab.

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `selected` | `true` · `false` | `false` | The tab whose panel is shown. |

### Combinations
- Allowed: all combinations, except the forbidden ones below.
- Forbidden:

| Combination | Reason |
| ----------- | ------ |
| `selected` + disabled | The panel shown would belong to a tab that cannot be used. |

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Label | Yes | Guidelines | — | One line; the tab grows with its label. Lack of space is handled by Tabs. |

Text only: no icon, no counter.

## Sizes
One size.

| Size | Height | Padding | Text style |
| ---- | ------ | ------- | ---------- |
| Default | Line height of `body` + padding + indicator (about 39px, above the 24×24px target of WCAG 2.5.8) | `--space-8` top and bottom, `--space-16` left and right | `body` (`label` when selected) |

## States
- **Default** — label `--color-text-secondary`, `body`.
- **Selected** — label `--color-text-brand`, `label` (semibold); selection indicator `--border-width-2` in `--color-border-focus`.
- **Hover** — state layer `--state-layer-hover` (content color), top corners `--radius-4`.
- **Focus** — ring `--border-width-2` in `--color-border-focus` + state layer `--state-layer-focus`, top corners `--radius-4`.
- **Pressed** — state layer `--state-layer-pressed`, top corners `--radius-4`.
- **Disabled** — label `--color-text-disabled`; not focusable, not clickable.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Padding top / bottom | All | `--space-8` |
| Container | Padding left / right | All | `--space-16` |
| Container | Radius (top corners of the state layer and focus ring) | Hover · Focus · Pressed | `--radius-4` |
| Container | State layer opacity | Hover · Focus · Pressed | `--state-layer-hover` · `--state-layer-focus` · `--state-layer-pressed` |
| Container | Focus ring | Focus | `--border-width-2`, `--color-border-focus` |
| Label | Color | Default | `--color-text-secondary` |
| Label | Color | Selected | `--color-text-brand` |
| Label | Color | Disabled | `--color-text-disabled` |
| Label | Text style | Default | `body` |
| Label | Text style | Selected | `label` |
| Selection indicator | Width | Selected | `--border-width-2` |
| Selection indicator | Color | Selected | `--color-border-focus` |

## Open questions
- None.
