# Comment — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

> **Draft.** Decisions of the Design System Lead on 2026-11-19 (B146). The design continues once its building blocks **Avatar** (B159) and **CommentMessage** (B160) are complete.

## Purpose
A comment attached to a component or a frame of the canvas (UX playground, B130).

## Types
| Type | Purpose |
| ---- | ------- |
| Marker + bubble | A marker placed on the component or the frame opens a bubble with the comment thread. |

## Structure
- Level: **organism**.
- Building blocks, built first through all their stages:
  - **Avatar** (atom, B159): a round avatar showing a person's initials.
  - **CommentMessage** (molecule, B160): one message of the thread — author avatar and name, date and time, text.

## Anatomy
1. Marker (required): the Avatar of the author of the first message.
2. Bubble (shown when open): holds the thread and the actions.
3. Thread (required in the bubble): the first message and its replies, each a CommentMessage.
4. Text field (in the editing state): to write a reply or change a message. Its place is defined in the design; the component used (Textarea B020 or Text input B019) is chosen at the Code stage.
5. Actions: Reply, Resolve, Edit / delete a message, Close.

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
|          |        |         | Not decided yet. |

## Content
Each message: author (initials in the Avatar + name), date and time, text.

| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
|      |          |         |            | Not decided yet. |

## Sizes
Not decided yet.

## States
- Interaction (state layers): Default · Hover · Focus · Pressed
- Component-specific (approved): **Open / closed** (bubble shown or folded into the marker) · **Selected** · **Resolved** · **Editing** (a message being written)

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
|      |          |                 | Not decided yet. |

## Open questions
- Name `Comment`, CSS class `.ds-comment` and the description of `meta.json`: proposed, to confirm.
- Look of the marker and the bubble, sizes, tokens: once Avatar and CommentMessage are complete.
- How each state looks (selected, resolved, editing).
- Where the actions sit, and with which components (Button, IconButton).
- Variants, if any.
- Disabled state: needed or not.
