# Card — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To show the **content of a step** of a Timeline.
- **`clickable-image`**: when the card has **images that support its text**, that the reader may want to see in detail.

## When not to use
- As a **link or a button**: the card is not clickable (with `clickable-image`, only the thumbnails are).
- **`clickable-image`** for **decorative images**: use the `default` card, without images.
- **`clickable-image`** for **a single hero image** (a large image at the top of the card): not in the design system yet.
- **Inside another card**: no nested cards.
- For an **alert message** (success, error…).

## Usage best practices
- **One card per step**: each step of the timeline leads to its own card, in the same order.
- Space between two stacked cards: **`--space-16`** (as the layout rule).
- The card takes the full width of the column that contains it.
- **`clickable-image`**: group images of the **same subject** in one card. No rule on their order.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Use the same title as the step that leads to the card. | Use a different title. |
| Use a single level of card. | Put a card inside another card. |
| Use the card to show content. | Use the card as a button. |
| Keep the thumbnails under the text. | Put the thumbnails above the title. |
| Describe what the image shows: "North facade of the building". | Use a generic name: "Photo 1". |
| Group images of the same subject. | Mix unrelated images in one card. |

## Content guidelines
- **Title**: the same as the title of its step. Sentence case. 60 characters maximum.
- **Text**: complete sentences, ending with a period. Sentence case. No length limit.
- **Images** (`clickable-image`): every image has an **alternative text** that describes what it shows (sentence case, not "Image of…"); it also names the thumbnail ("Open image: …"). Captions follow the ImageViewer guidelines. No maximum number of images.

## Behavior
- Not clickable, no selected state.
- **`clickable-image`**: thumbnails 3 per row, cropped to 16:9, wrapping to the next row. A click (or Enter / Space) on a thumbnail opens the **ImageViewer** on that image; closing it brings the focus back to the thumbnail.
- The card is reached from its step through an anchor: the step's `href="#…"` matches the card's `id`.
- **Long title or text**: wraps; the card grows in height.

## Accessibility
- **Structure:** the title is a heading (`h2` by default, change it with `headingLevel` to follow the page structure), so screen reader users can move from card to card.
- **Anchor:** the card's `id` lets the step bring the reader to it; the card itself is not focusable.
- **Contrast:** title and text 15.52:1 (see `spec.md`); the border is decorative.
- **Thumbnails** (`clickable-image`): buttons reached with Tab, activated with Enter / Space, announced "Open image: <alt>"; visible focus outline (`border.focus`, 6.10:1); targets larger than 24×24px.

## Related components
- **Timeline** — its steps lead to the cards.
- **ImageViewer** — opened by the thumbnails of a `clickable-image` card.
