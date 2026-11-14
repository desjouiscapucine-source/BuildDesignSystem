# Tag — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- **To name a category**: e.g. the backlog category, the Atomic Design level.
- **To show a status**: e.g. "Decided", "Done", "Blocked".
- **To highlight content** with no meaning of feedback: e.g. the skills of a profile, keywords. Use the `brand` tone.
- **Next to a title or in the metadata of a card**: beside the element it describes.

## When not to use
- To show a number (unread items, count): use **Badge** instead (not in the design system yet, B025).
- To filter or switch the view: use **Chip** in a **ChipGroup** instead.
- To trigger an action: use **Button** instead. A Tag is never clickable.
- To give a message or a sentence of feedback: use an **inline alert** instead (not in the design system yet).

## Usage best practices
- **Neutral for categories**: a category has no meaning of success or error, so its tag is always `neutral`.
- **The tone matches the meaning**: `success` = done or positive, `warning` = needs attention, `error` = problem, `info` = information. Never a tone for decoration.
- **Brand to highlight**: `brand` highlights content with no meaning of feedback (e.g. skills, keywords). `neutral` stays the default for categories. Never `brand` for a status.
- **Tones can be mixed**: `brand` may sit next to `neutral` and the feedback tones in the same group.
- **Never color alone**: the label always carries the meaning; the tone only reinforces it.
- **No limit on the number of tags side by side**: they wrap to the next line when the space runs out (e.g. a list of skills).
- **Spacing between tags**: `--space-4`.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Match the tone with the meaning: "Blocked" in `error`. | Use a tone against its meaning: "Blocked" in `success`. |
| Write a short label: "In progress". | Write a sentence: "This ticket is currently in progress". |
| Highlight skills with `brand`: "React", "TypeScript". | Use `brand` for a status: "Done" in `brand`. |
| Use a Chip to filter: "All", "Done" in a ChipGroup. | Use a Tag as a filter button. |

## Content guidelines
- **Short**: 1 or 2 words.
- **Sentence case**: first word capitalized only ("In progress"), no final period. The label is shown as written.
- **Same wording everywhere**: one status = one label and one tone across the product.
- **Icon only to reinforce**: optional, matching the meaning (e.g. `check_circle` for success); never an icon without a label.

## Behavior
- **Not interactive**: no hover, focus or pressed state; never clickable.
- **Long label**: stays on one line; cut with an ellipsis when the tag is wider than its container. Keep labels short so this stays a safety net.
- **Responsive**: same size on every screen; tags side by side wrap to the next line when the space runs out.

## Accessibility
- **Keyboard:** none — the tag is not focusable.
- **Focus:** none.
- **Screen reader:** the label is read as plain text, with no role. The icon is decorative (`aria-hidden`).
- **Contrast:** every label color on its background (4.5:1) and every icon color on its background (3:1). Already checked in the spec.
- **Touch target:** not applicable (not interactive).

## Related components
- **Chip** — to filter or switch the view (clickable).
- **Badge** — to show a number (not in the design system yet, B025).
- **Button** — to trigger an action.
- **Card** — often shows tags in its metadata.
