# StickyNote — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** molecule (uses the IconButton atom)

## Purpose
A sticky note placed on the canvas, to annotate a composition.

## Types
| Type | Purpose |
| ---- | ------- |
| StickyNote | The only type. |

## Anatomy
1. Container (required) — a fixed square, cream background, light shadow
2. Text (required) — the body of the note, written by the designer
3. Footer (required) — one row under the text:
   1. Author (required) — initials, on the left
   2. Date (required) — short date, under the author
   3. Edit action (required) — tertiary IconButton `edit`, on the right
   4. Delete action (required) — tertiary IconButton `delete`, on the right

The actions are always visible (not only on hover or focus).

## Variants

### Variant properties
One color and one size: no variant property.

| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `text` | Text | — (required) | The body of the note. |
| `author` | Text | — (required) | Initials of the author (e.g. "CD"). |
| `date` | Text | — (required) | Short date (e.g. "19 Nov"). |

### Combinations
- Allowed: all.
- Forbidden: none.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Text | Yes | "Check the spacing between the cards and the timeline on mobile." | 4 lines | Cut with an ellipsis after 4 lines; the full text scrolls in the editing state |
| Author | Yes | "CD" | Initials | Cut with an ellipsis |
| Date | Yes | "19 Nov" | Short date | Cut with an ellipsis |
| Edit action (`label`) | Yes | "Edit the note" | — | Not displayed (screen readers) |
| Delete action (`label`) | Yes | "Delete the note" | — | Not displayed (screen readers) |

## Sizes
One fixed size.

| Size | Box | Padding | Text style | Actions |
| ---- | --- | ------- | ---------- | ------- |
| Default | `--size-sticky-note` square (160 × 160px) | `--space-8` | Text `body`; author `label-sm`; date `body-sm` | IconButton (36 × 36px) |

- Space between the text and the footer: `--space-8`; between the author / date and the actions, and between the two actions: `--space-4`.
- Interactive targets: the IconButtons are 36 × 36px, above the 24×24px minimum (WCAG 2.5.8).

## States
- Interaction (state layers, in the content color): **Default · Hover** (`--state-layer-hover`) **· Focus** (`--state-layer-focus` + outline `--border-width-2` solid `--color-border-focus`, outside the note)
- Selected and editing notes have **no state layer** (hover, focus): the border keeps its 3:1 contrast; the focus outline still shows.
- Component-specific (approved):
  - **Selected** — the note is selected on the canvas: border `--border-width-2` `--color-border-strong`.
  - **Editing** — the text becomes editable (Edit action, double-click, or Enter when the note has the focus): same border as Selected; the full text scrolls and the text cursor shows.
  - **Dragging** — the note is being moved on the canvas: shadow `--shadow-hover`.
- The IconButtons keep their own states.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Width and height | all | `--size-sticky-note` |
| Container | Background | all | `--color-background-brand-subtle` |
| Container | Radius | all | `--radius-4` |
| Container | Shadow | default, selected, editing | `--shadow-frame` |
| Container | Shadow | dragging | `--shadow-hover` |
| Container | Border | default, dragging | none (`--border-width-0`) |
| Container | Border | selected, editing | `--border-width-2` · `--color-border-strong` |
| Container | Padding | all | `--space-8` |
| Container | Gap (text / footer) | all | `--space-8` |
| Container | Focus outline | focus | `--border-width-2` · `--color-border-focus` |
| Container | State layer | hover / focus (default, dragging) | `--state-layer-hover` / `--state-layer-focus` |
| Container | State layer | selected, editing | none |
| Text | Text style | all | `body` (`--typography-body-*`) |
| Text | Color | all | `--color-text-primary` |
| Author | Text style | all | `label-sm` (`--typography-label-sm-*`) |
| Author | Color | all | `--color-text-primary` |
| Date | Text style | all | `body-sm` (`--typography-body-sm-*`) |
| Date | Color | all | `--color-text-primary` |
| Footer | Gap | all | `--space-4` |
| Actions | Component | all | IconButton `tertiary` (`edit`, `delete`) |

New token for this component: **`size.sticky-note`** = 160px (value and name approved by the Design System Lead).
New contrast pair: `color.border.strong` on `color.background.brand-subtle` (3:1, selected border).

## Open questions
- None.
