# Chip — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- **To switch the view**: show another version of the same content (e.g. the variant switch of the Design preview).
- **To filter the content**: narrow a list down to one category (e.g. the category filter of the Backlog).
- **Only inside a ChipGroup**: Chip is its building block, never used alone.

## When not to use
- To trigger an action (save, delete): use **Button** instead.
- To move between sections of a page: use **Tabs** instead (not in the design system yet, B093).
- To go to another page: use **NavigationItem** or a link instead.

## Usage best practices
- **At least two chips** in a group.
- **One chip selected at a time, always one**: e.g. "All" first, to show everything.
- **The ChipGroup sets `selected`**: never set by hand.
- **Place the group just above the content it changes.**

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Keep one chip selected, with "All" first: "All", "Components", "Prototypes". | Leave no chip selected. |
| Write short labels in sentence case: "In progress", "Done". | Write sentences, uppercase or punctuation: "SHOW ITEMS IN PROGRESS", "Done.". |
| Show at least two chips, in a ChipGroup: "Components", "Prototypes". | Show a single chip alone. |
| Use chips to switch the view or filter the content: "All", "Done". | Use chips to trigger an action: "Delete", "Save" (use Button). |

## Content guidelines
- **Short**: 1 to 3 words.
- **Sentence case**: first word capitalized only ("In progress").
- **Text only**: no icon, no counter, no final period.

## Behavior
- **Hover, focus, pressed**: state layers in the content color.
- **Click / Enter / Space**: the chip becomes selected; the previously selected chip is no longer selected.
- **Click on the selected chip**: it stays selected.
- **Long label**: stays on one line; cut with an ellipsis when the chip is wider than its container.

## Accessibility
- **Keyboard:** Tab moves from one chip to the next; Enter or Space selects it.
- **Focus:** focus ring `--color-border-focus` plus the focus state layer.
- **Screen reader:** each chip is a toggle button (`button` with `aria-pressed`), named by its label: "Components, button, pressed". The ChipGroup has an accessible name (e.g. "Filter by category").
- **Contrast:** `text.primary` on `background.page` and `text.inverse` on `background.brand` (4.5:1); `border.strong` on `background.page` (3:1). Already checked in the spec.
- **Touch target:** height above 24px (WCAG 2.5.8).

## Related components
- **ChipGroup** — its parent: arranges the chips and handles the selection (not built yet).
- **Button** — to trigger an action.
- **Tabs** — to move between sections of a page (not in the design system yet, B093).
