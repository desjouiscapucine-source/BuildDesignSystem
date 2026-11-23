# Divider — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
A thin line that separates two parts of an interface, horizontally or vertically. It carries no content and no information of its own: it only organizes what is around it.

## Types
A single type: the line.

## Anatomy
1. Line (required) — a single line, without text or icon.

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `orientation` | `horizontal`, `vertical` | `horizontal` | Direction of the line. Horizontal separates stacked parts, vertical separates parts side by side. |

One hierarchy level only: the color is the same for both orientations.

### Combinations
- Allowed: every value of `orientation`.
- Forbidden: none.

## Content
None: the line holds no text and no icon.

## Sizes
One size. The thickness is a token; the length is not set by the component.

| Part | Dimension | Token |
| ---- | --------- | ----- |
| Thickness | Width (vertical) or height (horizontal) of the line | `--border-width-1` |
| Length | The length of its container: full width (horizontal) or full height (vertical). The parent sets the height of a vertical line (e.g. 32px in the Header). | none |

## States
None: the Divider is not interactive, so it has no hover, focus, pressed or disabled state.

## Accessibility
Decorative by default: hidden from screen readers (`aria-hidden`), because the line alone gives no information. A decorative line has no contrast requirement (WCAG 1.4.11).

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Line | Color | all | `--color-border-default` |
| Line | Thickness | all | `--border-width-1` |

## Open questions
None.
