---
name: card
description: Rules for composing Cards in a page — how several cards are placed, stacked, spaced and grouped, with or without a Timeline. Use whenever a page, a template, a prototype screen or an example contains Cards; a page combining a Timeline and Cards also loads the `page-content` skill.
---

# Card — composing cards in a page

Rules approved by the Design System Lead for **how cards are organized in a page**.
The look of one card is in its spec (`components/Card/spec.md`); how and when to use it, and how to write its content, are in its guidelines (`components/Card/guidelines.md`). This skill covers **how cards work together in a page**.
A page combining a **Timeline** and Cards also follows the `page-content` skill (link between a step and its card, placement next to the timeline, selection).

## Placement

| Rule | Value |
| ---- | ----- |
| Cards layout | **Stacked**, one card under the other |
| Width | The card takes the **full width of the column** that contains it |
| Space between two stacked cards | **16px** (`--space-16`), the vertical spacing between blocks (`layout` skill) |
| Columns | On the **layout grid** (`layout` skill) |

## Grouping

- **No nested cards**: never put a card inside another card.
- **`clickable-image`**: the images of the **same subject** are grouped in one card.

## Checklist

- [ ] Cards stacked, each on the full width of its column.
- [ ] 16px (`--space-16`) between two stacked cards.
- [ ] No card inside another card.
- [ ] With a Timeline: the `page-content` checklist too.
