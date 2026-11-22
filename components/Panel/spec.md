# Panel — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
The right panel of the UX playground (B130): it holds the three tools of the playground — **Library**, **Properties** and **Compositions** — in tabs, next to the canvas. It is specific to the playground (three fixed tabs), not a generic container.

## Types
| Type | Purpose |
| ---- | ------- |
| Panel (single type) | Right panel of the playground, full height, over the canvas. |

## Anatomy
**Expanded**
1. Container (required) — full height of the workspace, on the right, over the canvas (shadow).
2. Resize handle (required) — `drag_indicator` icon, always visible on desktop (hidden below desktop, where the panel is not resizable), vertically centered against the left edge, inside the panel.
3. Tabs (required) — Library, Properties, Compositions, built with the **Tabs** component (B093).
4. Collapse button (required) — IconButton `tertiary`, icon `right_panel_close`, on the right of the tabs.
5. Tab content (required) — the content of the selected tab; scrolls when it is longer than the panel.

**Collapsed**
1. Container (required) — a narrow strip on the right, same background and shadow.
2. Tab icons (required) — three IconButton `tertiary`, one per tab: Library `widgets`, Properties `tune`, Compositions `dashboard`. A click reopens the panel on that tab (no separate expand button).

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `collapsed` | `false` · `true` | `false` | `false` (expanded) shows the tabs and their content; `true` (collapsed) leaves a narrow strip of tab icons. |

### Combinations
- Allowed: both values. No forbidden combination.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Tab labels | Yes (fixed) | Library · Properties · Compositions | Fixed texts | — |
| Accessible labels of the icon buttons | Yes | "Collapse the panel" · "Open Library" | — | Not visible (screen readers) |
| Tab content | Yes | Given by the playground (B130) | — | The content area scrolls vertically |

## Sizes
One size. The width can be changed by the user.

| Property | Token |
| -------- | ----- |
| Default width | `--size-panel` (320px) |
| Minimum width | `--size-panel-min` (280px) |
| Maximum width | `--size-panel-max` (480px) |
| Height | Full height of the workspace |
| Tab content padding | `--space-16` (top, right, bottom), `--space-24` (left, clear of the resize handle) |
| Header padding (around the tabs and the collapse button) | `--space-8` top and right, `--space-24` left (aligned with the content) |
| Collapsed strip padding / space between the icons | `--space-8` / `--space-8` |
| Resize handle hit area | `--size-resize-handle` (24×24px, WCAG 2.5.8), corners `--radius-4` |
| Resize handle icon | `--icon-size-20` |

## States
- **Expanded / collapsed** (variant above). The change is animated with `--duration-200` and `--easing-ease-out` (no animation when the user reduces motion).
- **Resize handle**
  - Hover: `--state-layer-hover`; pressed (while dragging): `--state-layer-pressed`.
  - Focus: the handle is focusable, with the focus outline `--color-border-focus`, width `--border-width-2`, drawn **inside** the 24×24px hit area (negative offset `--border-width-2`) so it stays on the panel background, and `--state-layer-focus`; the **left / right arrow keys** change the width by `--space-8` per key press, between `--size-panel-min` and `--size-panel-max` (WCAG 2.1.1).
  - Double-click: the width goes back to `--size-panel`.
- **Buttons** (collapse, tab icons): the states of the IconButton component.
- **Tabs**: the states of the Tabs component (B093).

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | All | `--color-background-surface` |
| Container | Shadow | All | `--shadow-panel` |
| Container | Width | Expanded | `--size-panel` (resizable from `--size-panel-min` to `--size-panel-max`) |
| Container | Transition | Expanded ↔ collapsed | `--duration-200`, `--easing-ease-out` |
| Tab content | Padding | Expanded | `--space-16` (top, right, bottom) · `--space-24` (left) |
| Header | Padding | Expanded | `--space-8` (top, right) · `--space-24` (left) |
| Collapsed strip | Padding · gap | Collapsed | `--space-8` · `--space-8` |
| Resize handle | Hit area width and height | Expanded | `--size-resize-handle` |
| Resize handle | Hit area radius | Expanded | `--radius-4` |
| Resize handle | Icon color | Expanded | `--color-icon-secondary` |
| Resize handle | Icon size | Expanded | `--icon-size-20` |
| Resize handle | State layer | Hover · focus · pressed | `--state-layer-hover` · `--state-layer-focus` · `--state-layer-pressed` |
| Resize handle | Focus outline color | Focus | `--color-border-focus` |
| Resize handle | Focus outline width · offset | Focus | `--border-width-2` · minus `--border-width-2` (inside) |

## Open questions
- **Below desktop**: decided in the guidelines (always collapsed by default, no resize); reflow (WCAG 1.4.10) checked in the browser at the code stage.
- **Tabs**: the look of the tabs comes from the Tabs component (B093, in progress). The spec is approved with a placeholder for the tabs; Tabs must be complete before the Panel code (decided by the Design System Lead on 2026-11-19).
