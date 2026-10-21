# Timeline — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** organism — built with its building block, the **TimelineStep**, and the **IconButton** (small screens).

## Purpose
A sequence of steps or events, in chronological order.

## Types
| Type | Purpose |
| ---- | ------- |
| Timeline | The only type. Vertical. |

## Anatomy
1. Container (required) — a thin frame around the steps
2. Steps (required) — a list of **TimelineStep** components, at least 2

No title above the steps.

## Variants

### Variant properties
None: the timeline has a single look.

| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `label` | Text | "Timeline" | Name of the timeline announced to screen readers. |
| `children` | TimelineStep components (2 or more) | — (required) | The steps, in chronological order. |

### Combinations
- Not applicable (no variant property).

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Steps | Yes, at least 2 | "Order placed", "Order shipped" | See TimelineStep | See TimelineStep |
| Accessible name | Yes (default provided) | "Timeline", "Order history" | — | Not displayed |

## Sizes
One size only.

| Part | Size |
| ---- | ---- |
| Container | **Full width of its container**, frame included; no maximum width. On a Timeline + Cards page, the container is the 4 timeline columns (`page-content` skill) |
| Container | Padding `--space-16` |
| Steps | Full width of the container; space between steps handled by the TimelineStep (`--space-24`) |

## Small screens (below desktop)

Below `--breakpoint-desktop` (1024px — mobile and tablet), the timeline is shown in a **panel**:

1. **Open button** — an **IconButton** `primary`, icon `timeline`, accessible name "Open the timeline"; placed where the timeline is (above the cards, aligned right — see the `page-content` skill).
2. **Panel** — slides in **from the right**, over the page:
   - width: at most `--size-timeline` (400px), the full screen width if the screen is narrower;
   - background `--color-background-page`, padding `--space-16`, shadow `--shadow-panel`;
   - full height, scrolls when the steps do not fit;
   - contains the **close button** (IconButton `tertiary`, icon `close`, "Close the timeline") **at the top right**, then the timeline (with its frame).
3. **Dimmed background** — over the page, behind the panel: `--color-background-overlay` (neutral-950 at 40%).

| Event | Result |
| ----- | ------ |
| Click on the open button | The panel opens; **keyboard focus goes to the selected step** |
| Click on a step | The panel closes and the page jumps to the card |
| Close button, Escape key, click on the dimmed background | The panel closes |

Opening and closing use the motion tokens (`--duration-*`, `--easing-*`), so they are instant with reduced motion.

## States
- The container has no interaction state.
- The states (hover, focus, pressed, selected) are those of the **TimelineStep**.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | all | none (transparent) |
| Container | Border color | all | `--color-border-subtle` |
| Container | Border width | all | `--border-width-1` |
| Container | Radius | all | `--radius-8` |
| Container | Padding | all | `--space-16` |
| Panel (below desktop) | Background · padding · shadow | all | `--color-background-page` · `--space-16` · `--shadow-panel` |
| Panel (below desktop) | Max width | all | `--size-timeline` |
| Dimmed background | Color | all | `--color-background-overlay` |
| Open button | IconButton | all | `primary`, icon `timeline` |
| Close button | IconButton | all | `tertiary`, icon `close`, top right of the panel |

### Contrast (WCAG 2.2 AA)
- Border (`border.subtle`): 1.25:1 — decorative.
- Steps: see the TimelineStep spec.

## Open questions
- None.
