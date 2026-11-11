# TimelineStep — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** molecule — building block of the **Timeline**.

## Purpose
One step of a timeline: an event or a stage, with its marker and its content.

Every step is **clickable**: it is a link to a section of the same page (`<a href="#section">`), and the whole content is the clickable area.

## Types
| Type | Purpose |
| ---- | ------- |
| TimelineStep | The only type. Vertical timeline. |

## Anatomy
1. Marker (required) — a dot, centered on the first line of the title
2. Line (required, except on the last step) — from the marker down to the next step
3. Clickable area (required) — wraps title, date range and description
4. Title (required)
5. Date range (required) — to the right of the title, aligned right; **under the title** when the title would be narrower than `--size-timeline-step-title` (200px)
6. Description (required) — under the title

## Variants

### Variant properties
None: every step has the same look (no status). Its differences are **states** (see States).

| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `title` | Text | — (required) | Name of the event or stage. |
| `startDate` | Date | — (required) | Start of the date range. |
| `endDate` | Date | — (required) | End of the date range. |
| `children` | Text | — (required) | The description. |
| `href` | Anchor of a section of the page (`#section`) | — (required) | The section the step leads to. |
| `selected` | `true` / `false` | `false` | The step of the section currently shown. |

### Combinations
- Not applicable (no variant property).
- The last step of a timeline has no line (handled by the Timeline).

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Title | Yes | "Order shipped" | 60 characters | Wraps to a new line. The date range stays on its right while the title keeps at least `--size-timeline-step-title` (200px); otherwise the date range goes under the title |
| Date range | Yes | "12 Oct 2026 – 16 Oct 2026" | — | Never wraps |
| Description | Yes | "The parcel left the warehouse." | 150 characters | Wraps |

- **Always a range** (start and end), never a single date.
- Format: **full date on both sides** — "12 Oct 2026 – 16 Oct 2026" (day, abbreviated month, year), separated by an en dash.

## Sizes
One size only. The step takes the **full width of the timeline**.

| Part | Size |
| ---- | ---- |
| Clickable area | `--space-8` padding, `--radius-8` corners |
| Marker | `--space-16` diameter, `--border-width-2` outline |
| Line | `--border-width-2` wide |
| Space between marker column and content | `--space-16` |
| Space between title and date range (minimum) | `--space-16` |
| Title minimum width next to the date range | `--size-timeline-step-title` (200px) |
| Space between title and date range, date range under the title | `--space-4` |
| Space between title line and description | `--space-4` |
| Space below a step (before the next one) | `--space-24` |

## States
- Interaction (state layers on the clickable area, in the content color): **Default · Hover** (`--state-layer-hover`) **· Focus** (`--state-layer-focus` + outline) **· Pressed** (`--state-layer-pressed`)
- **Selected** — the step of the section currently shown: the marker becomes **solid brown**.
- No status (completed, current…), no disabled state.

Focus outline: `--border-width-2` solid `--color-border-focus`, around the clickable area.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Marker | Fill | default | `--color-background-brand-subtle` |
| Marker | Fill | selected | `--color-icon-brand` |
| Marker | Outline color | all | `--color-icon-brand` |
| Marker | Outline width | all | `--border-width-2` |
| Marker | Diameter | all | `--space-16` |
| Marker | Shape | all | `--radius-full` |
| Line | Color | all | `--color-border-default` |
| Line | Width | all | `--border-width-2` |
| Layout | Gap marker / content | all | `--space-16` |
| Layout | Gap title / date range | all | `--space-16` |
| Layout | Title minimum width next to the date range | all | `--size-timeline-step-title` |
| Layout | Gap title / date range under it | all | `--space-4` |
| Layout | Gap title / description | all | `--space-4` |
| Layout | Space below the step | all (except last) | `--space-24` |
| Clickable area | Padding · radius | all | `--space-8` · `--radius-8` |
| Clickable area | State layer | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` |
| Clickable area | Focus outline | focus | `--border-width-2` · `--color-border-focus` |
| Title | Text style · color | all | `label` · `--color-text-primary` |
| Date range | Text style · color | all | `body-sm` · `--color-text-primary` |
| Description | Text style · color | all | `body` · `--color-text-primary` |

### Contrast (WCAG 2.2 AA, on the page background)
| Pair | Ratio |
| ---- | ----- |
| Title (`text.primary`) | 15.52:1 ✓ |
| Date range (`text.primary`) | 15.52:1 ✓ |
| Description (`text.primary`) | 15.52:1 ✓ |
| Marker outline (`icon.brand`) — graphic | 6.10:1 ✓ (≥ 3:1) |
| Line (`border.default`) | 1.48:1 — decorative |
| Focus outline (`border.focus`) | 6.10:1 ✓ |

**With the state layer applied** (all texts in `text.primary`): hover 13.32:1 ✓ · focus 12.29:1 ✓ · pressed 9.51:1 ✓.

Decision of the Design System Lead: date range and description use **`text.primary`** (not `text.secondary`), so that every text keeps AA contrast in the focus state.

## Open questions
- None.
