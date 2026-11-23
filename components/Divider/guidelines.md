# Divider — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To separate groups of content that are not distinct enough on their own.
- To separate parts side by side in a bar (vertical).
- To separate groups of actions.

## When not to use
- When the space already separates the parts: use the `--space-*` tokens, with no extra line.
- To frame a block: use a **Card** or a **Frame** instead.
- To decorate, without a real separation between two contents.

## Usage best practices
- The Divider has no margin: the parent sets the space around it with the `--space-*` tokens (16px between blocks, 16px gap in the Header).
- A vertical Divider needs a parent with a height (e.g. 32px in the Header); without one, the line is not visible.
- Separate groups, not every item: one line between two groups, never between each item.
- Never place it along an edge that already has a border (double line).

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| One vertical line between the groups of a bar (brand, search, actions). | A vertical line between every item of the bar: it looks busy. |
| A horizontal line between two sections that look alike. | A line where the space and a title already separate the parts. |
| A line between parts inside a container. | A line along an edge that already has a border (double line). |

## Content guidelines
None: the Divider holds no text and no icon.

## Behavior
- The line takes the length of its container: full width (horizontal) or full height (vertical). It has no responsive change and no state.
- When a part disappears (e.g. below desktop), its Divider disappears with it: no line is left alone at the end of a bar.

## Accessibility
- **Keyboard:** not interactive, no keyboard interaction.
- **Focus:** not focusable.
- **Screen reader:** decorative, hidden from screen readers (`aria-hidden`). If the separation carries meaning, the structure also gives it (headings, lists, groups), never the line alone.
- **Contrast:** no requirement for a decorative line (WCAG 1.4.11).
- **Touch target:** not interactive, so no target size.

## Related components
- **Header**: uses the vertical Divider (not complete yet).
- **Card**, **Frame**: delimit a block instead of a line.
- **Menu** (B167, not in the design system yet): groups of actions.
