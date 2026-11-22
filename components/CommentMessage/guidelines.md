# CommentMessage — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- **Thread of a Comment**: the first message and its replies, inside the bubble of a Comment (B146, in progress).

## When not to use
- For a live conversation between people: a chat is not in the design system yet.
- For a free note with no author on the canvas: use **StickyNote** instead.
- For a message from the application (success, error): use a message banner (B063, not in the design system yet).
- For a quote or a testimonial put forward: use **Card** instead.

## Usage best practices
- **One thread, in chronological order**: the oldest message on top, the replies under it.
- **One `first` per thread**: the first message is `position: first`, every other message is `position: reply`.
- **Messages stacked with no space between them**: the separator above each reply is enough.
- **`author: me` only for the signed-in user**: it marks their own messages, never a message to put forward.
- **Only the author changes or deletes a message**: the "…" button exists on `author: me` messages only. A message `other` has no button and no hover.
- **Delete is immediate**, with no confirmation:
  - deleting the `first` message deletes the whole Comment, replies included;
  - the focus then goes to the "…" button of the next message `me` of the thread, or to the reply field of the Comment when there is none (messages `other` have no button);
  - when the whole Comment disappears, the Comment decides where the focus goes (B146).
- The list of options of the "…" button (Edit, Delete) comes with the **Menu** component (B167, not in the design system yet).

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| One `first` message, then `reply` messages: "Could the button be full width?" followed by two replies, each with a separator above. | Two `first` messages in the same thread. |
| Write the full name of the author: "Capucine Desjouis". | Write an identifier or an e-mail address: "cdesjouis@example.com". |
| Use `author: me` for the messages of the signed-in user only. | Use `author: me` to highlight an important message of someone else. |
| Write plain text: "Could the primary button be full width on mobile?" | Format the text or add content: bold words, a bulleted list or an image in the message. |

## Content guidelines
- **Author**: the full name (first name and last name), never an identifier or an e-mail address. The Avatar takes its initials from it (`Avatar` guidelines).
- **Date and time**: always absolute ("19 Nov 2026, 14:43"). The date stays the one of the creation.
- **"· Edited"**: after the date, when the text was changed. It says only that the message changed, not when.
- **Text**: plain text only — no formatting, no clickable link, no image. A message is **never empty**: an empty message cannot be sent.
- **Length**: no limit; the text wraps and is shown in full.

## Behavior
- **Interaction**: only on `author: me`. Hover puts the hover state layer on the message and shows the "…" button; keyboard focus on the button shows it too. A message `other` has no interaction state. The message itself is never clickable or focusable.
- **Touch screens**: no hover, so the "…" button of a message `me` is always shown.
- **Long author name**: one line, cut with an ellipsis; the date, "· Edited" and the button stay visible.
- **Date**: never wraps.
- **Long text**: wraps onto several lines; the bubble of the Comment scrolls.
- **Narrow screen**: same layout — one-line header, name shortened with an ellipsis.
- **Header height**: the same on every message (the height of the "…" button), with or without the button, so the thread stays regular.

## Accessibility
- **Keyboard:**
  - the message is not a tab stop; on a message `me`, **Tab** reaches the "…" button, even while it is hidden, and it appears; **Enter** or **Space** opens its options (Menu, B167);
  - after a delete, the focus goes to the "…" button of the next message `me`, or to the reply field of the Comment when there is none; when the whole Comment is deleted, the Comment decides (B146).
  - **Tab** and **Shift+Tab** move through the thread and out of it; no keyboard trap. Escape from the Menu comes with B167.
- **Focus:** the "…" button shows its own focus ring (IconButton); the message has none. The focused button is never hidden by the scrolling bubble of the Comment.
- **Screen reader:**
  - the thread is a **list**, each message an **article** (set by Comment);
  - a message is read as "Capucine Desjouis (you), 19 Nov 2026, 14:43, Edited, text" — "(you)" only on `author: me`, "Edited" only when changed;
  - the Avatar is hidden (the name is written next to it);
  - the "…" button is named **"Open message actions"** (starts with a verb, like every IconButton name). The name is the same on every message: accepted by the Design System Lead as an exception (B160-2).
- **Contrast:** author name and text `text.primary`, date `text.secondary` — 4.5:1 or more on every background. In hover on `background.subtle` the date stays at 4.62:1 (AA, at the limit). Checked in the spec.
- **Touch target:** the "…" button is 36×36px (24×24px required, WCAG 2.5.8).

## Related components
- **Comment** — holds the thread of messages (in progress, B146).
- **Avatar** — shows the author.
- **IconButton** — the "…" button.
- **Menu** — the list of options of the "…" button (B167, not in the design system yet).
- **StickyNote** — a note with no author on the canvas.
- **Card** — a quote put forward.

## Open questions
- Focus, Escape and return of the focus around the Menu: with B167.
- How "(you)" and "Edited" are exposed to screen readers (visually hidden text or `aria-label`): code stage.
