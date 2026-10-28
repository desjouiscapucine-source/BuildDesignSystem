# BreadcrumbItem — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
One link of a breadcrumb, to a level above the page. Building block of the **Breadcrumb** (molecule), which arranges the items.

## Types
| Type | Purpose |
| ---- | ------- |
| Breadcrumb item (single type) | A text link to a level above the page, followed by a slash. |

## Anatomy
1. Link — the label of the level (required).
2. Separator — a text slash `/` after the link (required, except on the last item).

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `last` | `true` / `false` | `false` | `true` on the last item of the breadcrumb: no slash after the link. |

### Combinations
- Allowed: all combinations.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Link label | Yes | Components | No fixed limit | One line; cut with an ellipsis only when the breadcrumb is wider than its container (handled by Breadcrumb). |

## Sizes
One size.

| Size | Text style | Gap link → slash |
| ---- | ---------- | ---------------- |
| Default | `body-sm` | `--space-8` |

Target size (WCAG 2.5.8): the link is smaller than 24×24px in height, but meets the spacing exception: links are separated by the gap and the slash, so a 24px circle centered on each link does not overlap the next one.

## States
- **Default** — link in the link color, no underline.
- **Hover** — the link is underlined.
- **Pressed** — the link is underlined (same as hover).
- **Focus** — focus ring `--color-border-focus`, `--border-width-2` outline with a `--border-width-2` offset, plus the focus state layer behind the label (`--state-layer-focus`, in the link color), so focus does not look like the hover underline.
- **Disabled** — link and slash in `--color-text-disabled`. The item is not a link: no underline on hover, no click, not focusable (skipped by the Tab key); screen readers still read its label.
- Hover and pressed have no state layer.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Link | Text style | all | `body-sm` (`.ds-text-body-sm`) |
| Link | Color | default, hover, focus, pressed | `--color-text-link` |
| Link | Color | disabled | `--color-text-disabled` |
| Link | Text decoration | hover, pressed | underline |
| Link | Focus outline color | focus | `--color-border-focus` |
| Link | Focus outline width / offset | focus | `--border-width-2` |
| Link | State layer (link color) | focus | `--state-layer-focus` |
| Link | Radius (focus ring and layer) | focus | `--radius-4` |
| Separator | Text style | `last = false` | `body-sm` |
| Separator | Color | `last = false` | `--color-text-secondary` |
| Separator | Color | disabled | `--color-text-disabled` |
| Item | Gap link → slash | `last = false` | `--space-8` |

Contrast (already checked in `tokens/contrast-pairs.json`): `text.link` and `text.secondary` on `background.page`, `.surface` — AA. Disabled text is exempt (WCAG 1.4.3).

## Open questions
- None.
