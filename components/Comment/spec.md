# Comment — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

> Decisions of the Design System Lead on 2026-11-19 and 2026-11-22 (B146).

## Purpose
A comment attached to a component or a frame of the canvas (UX playground, B130): a thread of messages that opens from a marker placed where the comment applies.

## Types
| Type | Purpose |
| ---- | ------- |
| Marker + bubble | A marker placed on the component or the frame opens a bubble with the comment thread. |

## Structure
- Level: **organism**.
- Built from four completed components, each with its own tokens:
  - **Avatar** (atom, B159) — the marker, size `medium`.
  - **CommentMessage** (molecule, B160) — each message of the thread.
  - **IconButton** (atom) — Resolve / Reopen and Close (`tertiary`), Send (`primary`).
  - **TextInput** (molecule, B019) — the reply field.
- Comment only arranges these parts (layout, spacing, bubble, ring); the look of each part belongs to its component.

## Anatomy
1. **Marker** (required) — the Avatar `medium` of the author of the first message. Always shown, open or closed. It is a **button** that opens and closes the bubble. In the **resolved** state it shows the icon `check` instead of the initials.
2. **Bubble** (shown when the comment is open) — a floating container to the right of the marker, its top edge aligned with the marker's. It holds, from top to bottom:
   1. **Header** (required) — one line with only the actions, on the right:
      1. Resolve — IconButton `tertiary`, icon `check`; on a resolved comment it becomes **Reopen**, icon `undo`.
      2. Close — IconButton `tertiary`, icon `close`.
   2. **Thread** (required) — the first message (`position: first`) and its replies (`position: reply`), each a CommentMessage, in chronological order. The thread scrolls when the bubble reaches its maximum height.
   3. **Reply field** (required) — always visible at the bottom, also on a resolved comment:
      1. Text field — TextInput, placeholder "Write a reply" (it is also the accessible name of the field). When a reply cannot be sent, the TextInput shows its **error message** under the field and keeps the text.
      2. Send — IconButton `primary`, icon `send`, at the right of the field; **disabled while the field is empty**.
3. **Ring** (selected and focus) — a ring around the marker.

Edit and Delete a message are the options of the "…" button of CommentMessage (Menu component, B167); they are not part of the Comment header.

## Variants

### Variant properties
No variant property: a comment has one look. What changes is its **state** (see States).

### Combinations
- Allowed: every state of the States section, with any number of messages.
- Forbidden: none.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Messages | Yes — at least the first | See CommentMessage | No limit | The thread scrolls inside the bubble. |
| Reply field placeholder | Yes | "Write a reply" | One line | Cut by the field (TextInput). |
| Resolve action (`label`) | Yes | "Resolve the comment" | — | Not displayed (screen readers). |
| Reopen action (`label`) | Yes, on a resolved comment | "Reopen the comment" | — | Not displayed (screen readers). |
| Close action (`label`) | Yes | "Close the comment" | — | Not displayed (screen readers). |
| Send action (`label`) | Yes | "Send the reply" | — | Not displayed (screen readers). |
| Error when a reply is not sent | Only on failure | "Your reply wasn't sent. Try again." | One sentence | Wraps (TextInput). |
| Status messages (announced, not displayed) | Yes | "Reply sent", "Comment resolved", "Comment reopened" | One short sentence | Not displayed (screen readers). |

Author, date and text of each message follow the CommentMessage spec.

## Sizes
One size. The bubble has a fixed width; its height follows its content.

| Part | Value |
| ---- | ----- |
| Marker | Avatar `medium`: `--space-32` |
| Bubble width | `--size-dialog-small` (400px), `max-width: 100%` |
| Bubble maximum height | 100% of the visible canvas; the thread scrolls beyond it |
| Bubble padding | `--space-8` |
| Gap between header, thread and reply field | `--space-8` |
| Gap between the marker and the bubble | `--space-16` (the ring of the selected state, 10px, must not touch the bubble) |
| Gap between the Resolve / Reopen and Close buttons | `--space-4` |
| Gap between the reply field and Send | `--space-4` |
| Ring width | `--border-width-2` |
| Space between the marker and the ring | selected `--space-8`; focus `--space-4` |

- Interactive targets: the marker (32 × 32px), the IconButtons and the TextInput are at least 24×24px (WCAG 2.5.8).

## States
The states of the comment (approved 2026-11-19):
- **Closed** — only the marker is shown.
- **Open** — the marker and the bubble are shown.
- **Selected** — the comment is the active one: the bubble is open and a **ring** surrounds the marker.
- **Resolved** — the marker shows the icon `check` (`--color-icon-inverse`, `--icon-size-20`) instead of the initials, at full opacity, so its contrast stays the one of the Avatar (6.10:1); the bubble, when open, stays readable and unchanged, except that Resolve becomes **Reopen** (it reopens the comment) and the reply field stays shown.
- **Editing** — a reply is being written in the reply field.
- **Reply not sent** — the TextInput shows its error message under the field (`--color-border-error` on the field, its own tokens); the text is kept and Send stays available to try again.

Interaction states of the **marker** (a button, approved 2026-11-22):
- **Hover**: state layer `--state-layer-hover`, **pressed**: `--state-layer-pressed`, in the content color of the marker (`--color-text-inverse`).
- **Focus**: a ring (`--color-border-focus`, `--border-width-2`, offset `--space-4`) — the same ring as the selected state, with a different offset. The offset leaves a gap of the page background between the marker and the ring: the ring and the marker have the same color (primary-600), so without the gap the focus would not be visible (accessibility audit B146-2).

Screen reader and keyboard, for the **marker** (approved 2026-11-22):
- It is a **button** (role `button`, **Enter** and **Space** open and close the bubble), in the tab order.
- Its name starts with the word "Comment" and gives the author of the first message: "Comment by Capucine Desjouis"; on a resolved comment: "Comment by Capucine Desjouis, resolved".
- `aria-expanded` says whether the bubble is open (`true`) or closed (`false`).
- The Avatar inside is decorative: the name of the button is the only one announced.
- Status messages (polite, announced without moving the focus): "Reply sent", "Comment resolved", "Comment reopened" (approved 2026-11-22).

- **Selected and focused**: the focus offset (`--space-4`) wins over the selected offset (`--space-8`): the ring moves in while the marker has the keyboard focus (approved 2026-11-22).

Interaction states of the other parts (hover, focus, pressed, disabled) are those of IconButton, TextInput and CommentMessage. Comment has **no disabled state** of its own. Only the **Send** button is disabled (IconButton `disabled`, its own tokens) while the reply field is empty; Enter then does nothing.

## Position of the bubble
- By default, to the right of the marker, aligned on its top edge.
- Near the edge of the canvas, it flips to the left of the marker, or upward, to stay visible.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Marker | Avatar size | all | `medium` (`--space-32`) |
| Marker | Icon `check` (instead of the initials), color | resolved | `--color-icon-inverse` |
| Marker | Icon size | resolved | `--icon-size-20` |
| Marker | State layer | hover / pressed | `--state-layer-hover` / `--state-layer-pressed` (in `--color-text-inverse`) |
| Ring | Color | selected, focus | `--color-border-focus` |
| Ring | Width | selected, focus | `--border-width-2` |
| Ring | Offset from the marker | selected | `--space-8` |
| Ring | Offset from the marker | focus | `--space-4` |
| Bubble | Background | open | `--color-background-page` |
| Bubble | Shadow | open | `--shadow-dropdown` |
| Bubble | Radius | open | `--radius-8` |
| Bubble | Width | open | `--size-dialog-small` |
| Bubble | Padding | open | `--space-8` |
| Bubble | Gap between header, thread, reply field | open | `--space-8` |
| Marker → bubble | Gap | open | `--space-16` |
| Header | Gap between actions | open | `--space-4` |
| Header | Action icon color | open | `--color-icon-brand` (IconButton `tertiary`, its own tokens) |
| Reply field | Gap between field and Send | open | `--space-4` |

No raw value and no new token: every value above is an existing semantic token.

Contrast (already checked in `tokens/contrast-pairs.json`): `icon.brand` on `background.page` (3:1 min, icon), `border.focus` on `background.page` (3:1 min, ring, which sits on the page background thanks to the offset) and `icon.inverse` on `background.brand` (6.10:1, the check icon of the resolved marker). Text and icons of the Avatar, the messages, the buttons and the field are checked in their own specs.

## Dependencies
- The resolved marker shows an icon instead of the initials: **Avatar** must accept an icon (today it shows initials, or the icon `person` when the name is unknown). This is a change to a complete component (Avatar 1.1), done on its own ticket, **B171** (high, R4), before the code stage of Comment.

## Open questions
- None.
