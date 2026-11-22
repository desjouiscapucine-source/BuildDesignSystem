# Comment — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- **Discussion with replies**: a thread between several people about a composition, opened from a marker.
- **Question to be resolved**: an open point that must get an answer, then be marked as resolved.

## When not to use
- For a free note with no exchange: use **StickyNote** instead.
- To name or label a frame: use the **name of the Frame** instead.
- For a message from the application (success, error): use a message banner (B063, not in the design system yet).

## Usage best practices
- **Place the marker on the element concerned**, at the point clicked on the component or the frame; it follows the element when it moves.
- **Several comments per element, one per subject**: each subject has its own thread and its own marker; a thread deals with a single subject.
- **Reply in the thread**: a reply is a message of the same thread, never a new comment.
- **One bubble open at a time**: opening a comment closes the one that was open.
- **Resolve a comment once it is answered**; do not delete it: a resolved comment stays on the canvas with its history.
- **Delete only a comment that was wrong or is no longer relevant**: deleting the first message deletes the whole comment, replies included (CommentMessage).
- **The marker and the bubble are Comment's own**: do not rebuild them with an Avatar, a Card or a Dialog.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| One thread, one question: "Could the button be full width on mobile?" followed by its replies. | Several unrelated questions in the same thread. |
| Place the marker on the component or the frame concerned, at the point clicked. | Place the marker on the empty canvas, away from the element it is about. |
| Resolve a comment that is answered: the marker shows a check and the thread stays readable. | Delete the first message to make a comment disappear: the whole thread and its history are lost. |
| Reply in the same thread: one comment, one marker. | Open a new comment for each reply: three markers for one discussion. |

## Content guidelines
- **Messages**: see CommentMessage — the full name of the author (never an identifier or an e-mail address), an absolute date and time, plain text.
- **Length**: no limit; the text is shown in full and the thread scrolls in the bubble.
- **Reply field**: placeholder "Write a reply" (a verb and a noun, no punctuation); it is also the name of the field. A reply is **never empty**: Send is disabled while the field is empty.
- **Error when a reply is not sent**: "Your reply wasn't sent. Try again." — one sentence, what happened then what to do, no "Error:" prefix.
- **Action names** (screen readers only): start with a verb, sentence case, no punctuation — "Resolve the comment", "Reopen the comment", "Close the comment", "Send the reply".

## Behavior
- **Open and close**: the marker opens and closes the bubble. **Escape** or the Close button closes it and the focus returns to the marker; a click on the canvas closes it without moving the focus. Opening a comment closes the one that was open.
- **Reply**: **Enter** in the reply field sends the reply, like the Send button. The field is one line (TextInput). **Send is disabled while the field is empty**, and Enter then does nothing. The reply field stays shown on a resolved comment.
- **Reply not sent**: the text stays in the field and the error "Your reply wasn't sent. Try again." shows under it (TextInput error); Send stays available to try again.
- **Unsent reply**: closing the bubble keeps the text of the field until the bubble is opened again.
- **Resolve and reopen**: Resolve marks the comment as resolved (check on the marker; Resolve becomes Reopen). A **reply to a resolved comment does not reopen it**: only Reopen does.
- **Delete**: deleting the first message deletes the whole comment. The focus then goes to the marker of the next comment, in the order of the canvas, or to the canvas itself when there is none.
- **Long thread**: the bubble grows with the thread up to 100% of the visible canvas, then the thread scrolls.
- **Near the edge of the canvas**: the bubble flips to the left of the marker, or upward, to stay visible. When it fits neither on the right nor on the left (narrow screen), it opens under the marker, inside the visible canvas, as wide as the space allows.
- **Narrow screen and larger text**: the bubble is never wider than the visible canvas; nothing overflows.
- **Touch screens**: the "…" button of the messages is always shown (CommentMessage); the marker is tapped like a button.

## Accessibility
- **Keyboard:**
  - **Tab** reaches the marker; **Enter** or **Space** opens and closes the bubble.
  - On opening, the focus goes to the **reply field**. **Shift+Tab** goes back up the thread.
  - Order in the bubble: Resolve (or Reopen), Close, the "…" button of each message of the author (CommentMessage), the reply field, Send.
  - **Escape** closes the bubble from any element inside it and returns the focus to the marker; the options menu of a message (Menu, B167) closes only itself with its own Escape. **Enter** in the reply field sends the reply.
  - The bubble comes right after its marker in the Tab order. After Resolve turns into Reopen, the focus stays on that button.
  - After a reply is sent with the Send button, the focus goes to the reply field (a disabled button cannot keep the focus).
  - After a message is deleted, the focus goes to the "…" button of the next message `me`, or to the reply field; after the whole comment is deleted, to the marker of the next comment (CommentMessage, Comment).
  - No keyboard trap: the bubble is not modal.
- **Focus:**
  - The marker shows a ring (`border.focus`, offset `space.4`) with a gap of page background between the marker and the ring.
  - The focused element is never hidden by the scrolling thread or by the edge of the canvas.
- **Screen reader:**
  - The **marker** is a button named "Comment by Capucine Desjouis" — ", resolved" when the comment is resolved — with `aria-expanded` set to `true` when the bubble is open. The Avatar inside is decorative.
  - The **bubble** is a non-modal **group** with the same name as the marker.
  - The thread is a **list**, each message an **article** (CommentMessage).
  - The **reply field** is named "Write a reply" (its placeholder, which TextInput uses as its accessible name).
  - The action buttons are named "Resolve the comment" / "Reopen the comment", "Close the comment" and "Send the reply"; Send is disabled while the field is empty.
  - The error of a reply that was not sent is read with the field (TextInput error, described by).
  - **Status messages**, polite and without moving the focus: "Reply sent", "Comment resolved", "Comment reopened".
- **Contrast:** `icon.brand` on `background.page` (3:1), `border.focus` on `background.page` (3:1, ring) and `icon.inverse` on `background.brand` (6.10:1, check of the resolved marker) are checked in `tokens/contrast-pairs.json`. The resolved marker is not dimmed.
- **Touch target:** the marker is 32 × 32px; the IconButtons and the TextInput keep their own sizes, at least 24 × 24px (WCAG 2.5.8).

## Related components
- **CommentMessage** — one message of the thread (building block).
- **Avatar** — the marker (building block).
- **StickyNote** — a note without exchange, instead of a comment.
- **Frame** — what a comment can be attached to; its name labels it.
- **Canvas** — the surface that carries the comments.

## Open questions
- **Element deleted**: what happens to the comments attached to a component or a frame that is deleted — to define.
