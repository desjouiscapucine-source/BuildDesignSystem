# TicketCard — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To show each ticket in a status column of the **Backlog board** (Backlog page).

## When not to use
- For the **content of a step** (text, no ticket): use **Card** instead.
- **Inside a Card**: no nested cards.
- For a **read-only list** of tickets (menus that must not be changed): not in the design system yet.

## Usage best practices
- Stack the cards **one under the other**, full width of their column, **`--space-16`** apart (`card` rule).
- Order the cards of a column **by priority**: high → medium → low → none.
- Place each TicketCard directly in its column, never in another container card.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Write the title as a short noun phrase: "Ticket description template". | Write the title as a sentence: "We need to write a template for tickets." |
| Write the description as one sentence ending with a period. | Write a long paragraph in the description (the detail goes in Why and Scope). |
| Stack the cards 16px apart, full width of their column. | Put the cards side by side in a column. |
| Place the TicketCard directly in its column. | Put the TicketCard inside a Card. |

## Content guidelines
- **Title**: a short noun phrase, sentence case, no period (e.g. "Ticket description template"). A component ticket is titled with the component name (e.g. "TicketCard"). No maximum length: the title wraps.
- **Description**: the Goal of the ticket, **one complete sentence** ending with a period: what the ticket delivers (`ticket` skill). No maximum length: the text wraps.
- **Tags**: the category of the ticket, and "Decided" only when the ticket's origin is `decided`.
- **Menus**: Status, Priority, Release, and Stage only for component tickets.

## Behavior
- **Click**: a click anywhere on the card opens the ticket in its modal, except on the menus.
- **Menu change**: saved at once; the card moves to its new column (status) or its new place in the column (priority).
- **Error**: when a change cannot be saved, an error message is shown above the board (`role="alert"`) and the card keeps its old value.
- **Long text**: the title and the description wrap, in full; the tags row and the menus row wrap to the next line when they do not fit.
- **No description**: the description row is not shown.
- **Responsive**: the card takes the full width of its column, at every breakpoint.

## Accessibility
- **Keyboard:** Tab moves the focus to the card; **Enter** opens the ticket. Tab then reaches the menus of the card, in order (Status, Priority, Release, Stage).
- **Focus:** visible focus outline around the whole card (`--border-width-2`, `--color-border-focus`) and the focus state layer.
- **Screen reader:** the focused card announces its **ID and title** (e.g. "B115, TicketCard"); the tags and the description are read inside the card; each menu has its own label (Select, B021).
- **Contrast:** title and description 15.52:1, ID 5.49:1, focus outline 6.10:1 on `--color-background-page` (spec).
- **Touch target:** the whole card is the target of the click; the menus follow the Select target size (B021).

## Related components
- **Card** — the same look, for the content of a step; not clickable.
- **Tag** (B059) — the category and origin tags of the card.
- **Select** (B021) — the menus of the card.
- **Dialog** — the ticket's modal, opened by a click on the card.
