# Breadcrumb — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- On **every page from Level 2 down to Level 4**: to show where the page sits and go back to any level above it.
- Not on Level 0 (landing page) nor on Level 1 (spaces).

## When not to use
- To move between sections of the same page: use the anchors and the **Timeline** instead.
- For a sequence of steps (e.g. a form in steps): use the **Timeline** instead.
- As the main navigation: it complements the **SideNavigation**, never replaces it.

## Usage best practices
- **Above the page title**: first block of the page content, `--space-16` above the `heading-1` title.
- **One breadcrumb per page**, always at the same place.
- **Ends with the parent of the current page**: the title names the current page, which is not an item.
- The Breadcrumb sets `last` on its final item and `disabled` on a level with no page (see BreadcrumbItem).

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Place the breadcrumb above the page title, as the first block. | Place it under the title or lower in the page. |
| End with the parent of the page: "Documentation / Foundations", title "Layout grid". | Repeat the current page as a link: "Documentation / Foundations / Layout grid". |
| Use a single breadcrumb, at the top of the page. | Add a second breadcrumb at the bottom. |

## Content guidelines
- The labels follow the BreadcrumbItem content rules: the page titles word for word, sentence case, text only.

## Behavior
- **Too wide for its container** (e.g. small screens): stays on one line; the labels are cut with an ellipsis and the last item is kept whole.
- **Small screens**: same breadcrumb, same rules (no specific layout below tablet).
- Interactions (hover, focus, click, disabled): those of BreadcrumbItem.

## Accessibility
- **Keyboard:** Tab goes through the links in reading order, from Level 0 to the parent; disabled items are skipped. Enter opens a link.
- **Focus:** the focus of BreadcrumbItem (ring + focus state layer).
- **Screen reader:** a navigation landmark named "Breadcrumb", with an ordered list (the number of items is announced). A label cut with an ellipsis keeps its full text for screen readers (only visually cut). The slashes are not read.
- **Contrast:** the BreadcrumbItem colors, already checked (AA).
- **Touch target:** the BreadcrumbItem spacing exception (WCAG 2.5.8).

## Related components
- **BreadcrumbItem** — its building block.
- **SideNavigation** — the main navigation it complements.
- **Timeline** — for in-page navigation and sequences of steps.
