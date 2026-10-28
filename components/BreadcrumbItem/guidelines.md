# BreadcrumbItem — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- **Only inside a Breadcrumb**: BreadcrumbItem is its building block, never used alone.
- **One item per level above the page**: from Level 0 down to the parent of the current page.

## When not to use
- To move between pages of the same level: use **NavigationItem** (side navigation) instead.
- For a sequence of steps or events: use **TimelineStep** instead.

## Usage best practices
- **The Breadcrumb sets `last` and `disabled`**: `last` on its final item, `disabled` on a level with no page. They are never set by hand.
- **Disabled only for a level with no page**: a level that exists in the structure but has no page of its own yet.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Repeat the title of each page: "Documentation / Foundations / Layout grid". | Use labels that differ from the page titles: "Docs home / All foundations / Grid". |
| Write in sentence case, text only: "Components / Atoms". | Use uppercase or punctuation: "COMPONENTS / Atoms.". |
| End with the last item, with no slash: "Documentation / Components". | Leave a trailing slash: "Documentation / Components /". |
| Disable a level that has no page yet: "Templates" in "Documentation / Templates / Page layout". | Disable a level that has a page. |

## Content guidelines
- **Same as the page title**: the label repeats the title of the level's page, word for word.
- **Sentence case**: first word capitalized only ("Layout grid").
- **Text only**: no icon, no final period, no extra characters.

## Behavior
- **Hover and pressed**: the link is underlined.
- **Click / Enter**: opens the page of the level.
- **Long label**: stays on one line; cut with an ellipsis only when the breadcrumb is wider than its container (handled by the Breadcrumb).
- **Disabled**: plain text in the disabled color; no underline, no click.

## Accessibility
- **Keyboard:** Tab reaches each enabled link in reading order; Enter opens it. Disabled items are skipped.
- **Focus:** focus ring `--color-border-focus` plus the focus state layer, clearly different from the hover underline.
- **Screen reader:** each enabled item is a link named by its label. The slash is decorative (`aria-hidden`): only the labels are read. A disabled item is plain text (no link role); its label is still read.
- **Contrast:** link `text.link` 6.1:1 on the page background, 5.2:1 on the focus layer; slash `text.secondary` AA. The link color differs from body text, so the underline is not the only cue. Disabled text is exempt.
- **Touch target:** smaller than 24×24px in height, but meets the spacing exception of WCAG 2.5.8 (links separated by the gap and the slash).

## Related components
- **Breadcrumb** — its parent: arranges the items (not built yet).
