# CommentMessage — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

> Decisions of the Design System Lead on 2026-11-22 (B160).

## Purpose
One message of a comment thread: who wrote it, when, and what it says. Building block of Comment (B146): the bubble of a comment holds the first message and its replies, each a CommentMessage.

## Types
| Type | Purpose |
| ---- | ------- |
| CommentMessage (single type) | One message of a thread. |

## Structure
- Level: **molecule**.
- Uses **Avatar** (atom, B159), size `small`, and **IconButton** (atom) for the "…" button.

## Anatomy
1. Container (required) — holds the header and the text; background in the `me` variant, separator above in the `reply` variant.
2. Header (required) — on one line:
   1. Avatar of the author (required), size `small`.
   2. Author name (required).
   3. Date and time (required), followed by "· Edited" when the message was changed (optional).
   4. "…" button (`author: me` only) — IconButton `tertiary`, icon `more_horiz`, at the end of the line; shown on hover and focus, always shown on touch screens. Only the author can change or delete a message (B160-2).
3. Text of the message (required) — under the header, full width.

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `position` | `first` / `reply` | `first` | Place of the message in the thread. A `reply` has a separator above it. |
| `author` | `other` / `me` | `other` | Who wrote the message. A message of the current user (`me`) has a background and the "…" button; `other` has neither. |

### Combinations
- Allowed: all combinations (`first` / `reply` × `other` / `me`).

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Author name | Yes | Capucine Desjouis | No limit | One line, cut with an ellipsis; the date and the "…" button stay visible. |
| Date and time | Yes | 19 Nov 2026, 14:43 | — | Always absolute (day, short month, year, 24-hour time). Never wraps. |
| Edited mark | No — only for a changed message | · Edited | — | After the date, same style as the date. |
| Text | Yes | Could the primary button be full width on mobile? | No limit | Wraps, shown in full; the Comment bubble scrolls. |

## Sizes
One size.

| Part | Value |
| ---- | ----- |
| Padding | `--space-8` |
| Corner radius | `--radius-8` |
| Space between the header and the text | `--space-8` |
| Space between avatar, name, date and button | `--space-8` |
| Avatar | `small` (`--space-24`) |
| Header height | the height of the "…" IconButton, on every message — with or without the button (`other`) — so the thread stays regular |
| Author name | text style `label` |
| Date and Edited mark | text style `label-sm` |
| Text | text style `body` |

## States
- States below apply to `author: me` only. A message `other` has **no interaction state**: no "…" button, no hover state layer (B160-2).
- **Default**: the "…" button is hidden (always shown on touch screens, which have no hover).
- **Hover**: hover state layer (`--state-layer-hover`, in the content color `--color-text-primary`) painted over the whole message, content included (like Button and NavigationItem), and the "…" button is shown. Contrast in hover: the date (`--color-text-secondary`) on `--color-background-subtle` stays at 4.62:1 (AA), at the limit (decided by the Design System Lead, B160).
- **Focus**: when the "…" button has the keyboard focus, it is shown, with its own focus ring (IconButton).
- The message itself is not focusable and not clickable. The list of options of the "…" button (Edit, Delete) comes with the Menu component (B167).

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | `author: me` | `--color-background-subtle` |
| Container | Background | `author: other` | none |
| Container | Separator above, color | `position: reply` | `--color-border-subtle` |
| Container | Separator above, width | `position: reply` | `--border-width-1` |
| Container | State layer | hover, `author: me` | `--state-layer-hover` |
| Container | Padding | all | `--space-8` |
| Container | Corner radius | all | `--radius-8` |
| Container | Gap header → text | all | `--space-8` |
| Header | Gap between avatar, name, date and button | all | `--space-8` |
| Author name | Color | all | `--color-text-primary` |
| Author name | Text style | all | `label` |
| Date, Edited | Color | all | `--color-text-secondary` |
| Date, Edited | Text style | all | `label-sm` |
| Text | Color | all | `--color-text-primary` |
| Text | Text style | all | `body` |
| "…" button | IconButton variant | `author: me` | `tertiary` (its own tokens) |

## Open questions
- The list of options of the "…" button (Edit, Delete) comes with the **Menu** component (B167, high, R4).
