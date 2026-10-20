---
name: page-header
description: Rules for the page header — the page title and the subtitle under it: text styles (typography tokens), one line maximum each, maximum lengths and overflow. Use whenever a page title or its subtitle is written, styled or reviewed: documentation site pages, component descriptions (meta.json), templates, pages and prototypes screens.
---

# Page header — title and subtitle

Rules approved by the Design System Lead.

## Rules

| Text | Text style | Color | Max length | Lines |
| ---- | ---------- | ----- | ---------- | ----- |
| **Title** | `heading-1` | `--color-text-primary` | **30 characters** | **1 line maximum** |
| **Subtitle** | `lead` | `--color-text-secondary` | **80 characters** | **1 line maximum** |

- **Both rules apply together**: write within the maximum length, **and** the text is cut with an ellipsis ("…") as a safety net if it still does not fit on one line (small screens).
- When the text is cut, the full text stays available: in the page (screen readers read it) and on hover (`title` attribute).
- Extra information does not go in the subtitle: put it in a normal paragraph under the header.

## Typography tokens

**Title — `heading-1`** (CSS class `.ds-text-heading-1`)

| Property | Token | Value |
| -------- | ----- | ----- |
| Font family | `--typography-heading-1-family` → `--font-family-heading` | Poppins |
| Font size | `--typography-heading-1-size` → `--font-size-40` | 2.5rem (40px) |
| Font weight | `--typography-heading-1-weight` → `--font-weight-semibold` | 600 |
| Line height | `--typography-heading-1-line-height` → `--line-height-heading` | 1.2 |

**Subtitle — `lead`** (CSS class `.ds-text-lead`)

| Property | Token | Value |
| -------- | ----- | ----- |
| Font family | `--typography-lead-family` → `--font-family-body` | Open Sans |
| Font size | `--typography-lead-size` → `--font-size-18` | 1.125rem (18px) |
| Font weight | `--typography-lead-weight` → `--font-weight-regular` | 400 |
| Line height | `--typography-lead-line-height` → `--line-height-body` | 1.5 |

## One line + ellipsis (CSS)

```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
max-width: 100%;
```

## Where it applies

- Every page of the documentation site (`h1` + `.lead` in the content area, and the home pages).
- **Component descriptions** in `meta.json`: they are the subtitle of the component page → 80 characters maximum.

## Not defined yet — ask before deciding

- Section titles and other title / subtitle pairs.
