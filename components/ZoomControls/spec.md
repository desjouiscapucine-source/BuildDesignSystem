# ZoomControls — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** molecule (built from IconButton, atom)

## Purpose
The zoom controls of the canvas (Canvas, B142): zoom out, read the zoom level, zoom in and fit all the content to the screen, in one compact bar placed at the bottom right of the canvas.

## Types
| Type | Purpose |
| ---- | ------- |
| ZoomControls | The only type: a horizontal bar of zoom controls. |

## Anatomy
One horizontal row, in this order:

1. **Container** (required) — groups the controls, named "Zoom controls" for screen readers.
2. **Zoom out button** (required) — tertiary IconButton, icon `remove`, accessible name "Zoom out".
3. **Zoom level** (required) — plain text, read only: the zoom in percent (e.g. "100%"); a status (polite live region), announced as "Zoom level 100%" after each change.
4. **Zoom in button** (required) — tertiary IconButton, icon `add`, accessible name "Zoom in".
5. **Divider** (required) — a short vertical line, separating the zoom group from fit to screen.
6. **Fit to screen button** (required) — tertiary IconButton, icon `fit_screen`, accessible name "Fit to screen".

```
┌───────────────────────────────┐
│  −    100%    +   │   [⛶]    │
└───────────────────────────────┘
   2     3      4   5    6        1 = container
```

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `zoom` | Number, from 10 to 400, in steps of 10 | `100` | The zoom level shown, in percent (same scale as the Canvas `zoom`). |

### Combinations
- Allowed: every zoom level from 10 to 400.
- At **10%** the zoom out button is disabled; at **400%** the zoom in button is disabled (see States).
- Forbidden: none.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Zoom level | Yes | "100%" | 4 characters ("400%") | None: the text area has a minimum width (`--size-zoom-level`) that fits "400%", centered, so the buttons do not move when the level changes. In rem: it grows with the text size (WCAG 1.4.4). |
| Accessible names | Yes | "Zoom controls" (group), "Zoom out", "Zoom level 100%", "Zoom in", "Fit to screen" | — | Not displayed |

## Sizes
One size only.

| Part | Size | Token |
| ---- | ---- | ----- |
| Container padding | 4px | `--space-4` |
| Space between the parts | 4px | `--space-4` |
| Buttons | 36 × 36px (IconButton) | IconButton spec |
| Zoom level | minimum width 2.5rem (40px at the default text size) | `--size-zoom-level` |
| Divider | 1px wide, icon height (20px) | `--border-width-1`, `--icon-size-20` |
| Container height | 44px (36px buttons + 2 × 4px) | — |

Interactive targets: 36 × 36px (IconButton), above the 24 × 24px minimum (WCAG 2.5.8).

## States
- **Container** — no interaction state (not interactive).
- **Buttons** — the IconButton states: default, hover, focus, pressed (state layers), disabled.
- **Zoom out at the minimum (10%)** — the zoom out button is disabled.
- **Zoom in at the maximum (400%)** — the zoom in button is disabled.
- A disabled zoom button is the native IconButton disabled (skipped by the Tab key). When the button that has the focus becomes disabled, the focus moves to the other zoom button (zoom out at 400%, zoom in at 10%), so it is never lost.
- **Fit to screen** — always enabled.
- **Zoom level** — no state: plain text.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | all | `--color-background-surface` |
| Container | Shadow | all | `--shadow-dropdown` |
| Container | Corner radius | all | `--radius-8` |
| Container | Padding | all | `--space-4` |
| Container | Space between the parts | all | `--space-4` |
| Container | Border | all | none |
| Buttons | Variant | all | IconButton `tertiary` (its own tokens) |
| Zoom level | Text style | all | `--typography-label-sm-*` |
| Zoom level | Color | all | `--color-text-primary` |
| Zoom level | Minimum width | all | `--size-zoom-level` |
| Divider | Color | all | `--color-border-subtle` |
| Divider | Width | all | `--border-width-1` |
| Divider | Height | all | `--icon-size-20` |

New token, decided by the Design System Lead (B161): **`size.zoom-level`** = 2.5rem (40px) — minimum width of the zoom level, in rem so it grows with the text size.

### Contrast
| Pair | Ratio | Target |
| ---- | ----- | ------ |
| Zoom level `text.primary` on `background.surface` | see the Design preview tab | 4.5:1 |
| Buttons | IconButton tertiary (checked in its spec) | 3:1 |

## Open questions
- Names of the event props (zoom out, zoom in, fit to screen): decided at the code stage.
