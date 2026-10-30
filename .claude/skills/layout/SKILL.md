---
name: layout
description: Layout rules of the design system — page margin and vertical spacing between blocks of content. Use whenever a page, a screen or a section is laid out: the documentation site, templates and pages, prototypes, or any new page of the site.
---

# Layout

Rules approved by the Design System Lead. They apply to **the whole documentation site**.

| Rule | Value | Token |
| ---- | ----- | ----- |
| **Page margin** — space around the content of the page | 24px | `--space-24` |
| **Vertical spacing between items** — space between blocks of content stacked vertically | 16px | `--space-16` |

## Page header placement

The page header (title + subtitle) is placed:
- **at the top of the content area**, as its **first block**, inside the 24px page margin;
- **aligned left**, on the full width of the content area;
- title first, subtitle right under it, separated like any other block (**16px**, `--space-16`); the rest of the page follows 16px below the subtitle.

For the text itself (text styles, colors, one line maximum, maximum lengths), **use the `page-header` skill**.

## General

- Use the `--space-*` tokens directly for spacing. Columns use the layout grid (below).
- The page margin is the same on every screen size.
- Inside a component, spacing follows the component's spec, not these rules.

## Layout grid

Approved by the Design System Lead on 2026-10-20. Tokens in the `token-naming` skill (`grid.*`, `size.content`).

| Screen | Columns | Gutter | Side margin |
| ------ | ------- | ------ | ----------- |
| Mobile (below 768px) | 4 | 16px | 24px |
| Tablet (768px and above) | 8 | 16px | 24px |
| Desktop (1024px and above) | 12 | 16px | 24px |

- **Maximum content width: 1040px, margins included** (992px for the columns). Beyond that, the grid stays centered.
- **Exceptions (full width)**, approved by the Design System Lead on 2026-10-30 (B127): the **Backlog** page (Kanban board) and the **Prototype** pages (preview frames); and a page combining a Timeline and Cards (`page-content` skill).
- Classes (`tokens/grid.css`): `.ds-grid` on the container, `.ds-grid-span-<n>` on each item (1 column by default).
- A span wider than the current number of columns takes the full width (e.g. `span-6` on mobile) — approved by the Design System Lead on 2026-10-20.

## How it is applied in the documentation site

- `docs/src/docs.css` → `.shell-content`: `padding: var(--space-24)`, `max-width: var(--size-content)`, and its direct children are stacked with `gap: var(--space-16)` (their own top / bottom margins are removed).
- A new page of the site follows the same structure: its blocks are direct children of the content area.

## Prototypes

Approved by the Design System Lead on 2026-10-21: **prototype screens follow the same rules as the documentation site** — 24px page margin, 16px between blocks, page header (title `heading-1` + subtitle `lead`, `page-header` skill), content at most `size.content` wide and **centered** beyond it, like the layout grid (approved 2026-10-21), so the content sits on the grid columns. Exception: a screen combining a Timeline and Cards uses the full screen width on desktop (`page-content` skill). Built in `prototypes/_shared/Screen.tsx` and `prototypes/_shared/base.css`.

## Not defined yet — ask before deciding

- Whether these rules also apply to templates and pages.
- Horizontal spacing between items outside the grid, and spacing inside sections.
- Whether the documentation site pages are laid out on the column grid (for now only the max width uses `size.content`).
