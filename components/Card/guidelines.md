# Card — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To show the **content of a step** of a Timeline.

## When not to use
- As a **link or a button**: the card is not clickable.
- **Inside another card**: no nested cards.
- For an **alert message** (success, error…).

## Usage best practices
- **One card per step**: each step of the timeline leads to its own card, in the same order.
- Space between two stacked cards: **`--space-16`** (as the layout rule).
- The card takes the full width of the column that contains it.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Use the same title as the step that leads to the card. | Use a different title. |
| Use a single level of card. | Put a card inside another card. |
| Use the card to show content. | Use the card as a button. |

## Content guidelines
- **Title**: the same as the title of its step. Sentence case. 60 characters maximum.
- **Text**: complete sentences, ending with a period. Sentence case. No length limit.

## Behavior
- Not clickable, no selected state.
- The card is reached from its step through an anchor: the step's `href="#…"` matches the card's `id`.
- **Long title or text**: wraps; the card grows in height.

## Accessibility
- **Structure:** the title is a heading (`h2` by default, change it with `headingLevel` to follow the page structure), so screen reader users can move from card to card.
- **Anchor:** the card's `id` lets the step bring the reader to it; the card itself is not focusable.
- **Contrast:** title and text 15.52:1 (see `spec.md`); the border is decorative.

## Related components
- **Timeline** — its steps lead to the cards.
