# Breadcrumb — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
Shows where the page sits in the navigation structure and goes back to any level above it.

## Types
| Type | Purpose |
| ---- | ------- |
| Breadcrumb (single type) | A row of text links, one per level above the page. |

## Anatomy
1. Container — a navigation landmark named "Breadcrumb" (required).
2. Items — **BreadcrumbItem** components, one per level above the page, in order from Level 0 (required, at least one).

The Breadcrumb only arranges the items; their look (link, slash, states) belongs to **BreadcrumbItem**. The Breadcrumb sets `last` on its final item and `disabled` on a level with no page.

## Variants
None: one style, one size.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Item labels | Yes | Documentation / Foundations / Layout grid | No fixed limit | One line. When the breadcrumb is wider than its container, the labels are cut with an ellipsis; the **last item is kept whole**. |

The current page is not an item: the breadcrumb ends with the parent of the current page.

## Sizes
One size: the size of BreadcrumbItem (`body-sm`).

| Size | Gap slash → next item |
| ---- | --------------------- |
| Default | `--space-8` |

## States
No state of its own: the states are those of each BreadcrumbItem (hover, pressed, focus, disabled).

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Items | Gap between a slash and the next item | all | `--space-8` |
| Items | Look of each item | all | see BreadcrumbItem `spec.md` |

Contrast: the colors are those of BreadcrumbItem, already checked (AA).

## Open questions
- None.
