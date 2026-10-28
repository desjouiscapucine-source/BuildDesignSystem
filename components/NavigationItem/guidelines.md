# NavigationItem — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- In the **side navigation**, for each main page of the application.
- **Parent**: to group **related pages** under one entry (e.g. "Projects" → each project).

## When not to use
- To **trigger an action** (e.g. "Log out"): use a **Button**.
- On a **light background**: the item is designed for the brand background only.
- For a **link inside a text**.
- **Parent with a single child**: use a **link** to that page directly.

## Usage best practices
- **One selected item, always**: exactly one item of the navigation is `selected` — the item of the page displayed.
- Space between two items: **`--space-8`**.
- **Icons**:
  - a **different icon for each item** — two items never share the same icon;
  - an icon **consistent with the label**: it clearly evokes the page.
- **Prefer hiding to disabling**: when a page is not available, remove its item rather than showing it disabled.
- **Parents**:
  - **2 children minimum**;
  - **3 levels maximum** recommended (allowed by the spec beyond, but the navigation gets hard to read and the indent narrows the labels);
  - only the top-level items have a leading icon: children have none.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Use a short label: "Reports". | Use a long label: "All the reports of the year". |
| Use an item to go to a page. | Use an item for an action, like "Log out". |
| Remove the item of a page that is not available. | Show the item disabled. |
| Group 2 related pages or more under a parent. | Put a single child in a parent. |
| Keep 3 levels or fewer. | Nest a 4th level. |

## Content guidelines
- **A noun, not a verb**: "Reports", not "See the reports" — the label names the page.
- **Same as the page title**: the label matches the title of the page it leads to.
- **Parent**: the label names the group of its children (e.g. "Projects"); same rules (noun, sentence case, 20 characters maximum).
- **Sentence case**: capital letter on the first word only.
- **No punctuation**.
- **20 characters maximum** (see `spec.md`). A longer label wraps to a new line.

## Behavior
- A **link** always leads to a page (`<a href>`).
- A **parent** only opens and closes its children: the arrow turns, the children appear at once.
  - Closed by default; open when the page displayed is one of its children.
  - Closed with a selected child: the parent takes the selected look, so the current place stays visible.
  - Parents are **independent**: opening one does not close the others.
- The selected item (page displayed) is highlighted (cream background, semibold label).
- **Long label**: wraps to a new line; the icon stays aligned with the first line.
- **Disabled**: to avoid (see best practices). When used, the item is dimmed (`--opacity-disabled`) and cannot be activated.

## Accessibility
- **Keyboard:** reachable with Tab; activated with Enter.
- **Focus:** always visible — `--border-width-2` outline in `--color-border-focus-inverse` (white on the brand background), plus the focus state layer.
- **Screen reader:** announced as "link" with its label as accessible name; the selected item is announced as the **current page** (`aria-current="page"`); the icon is decorative (`aria-hidden="true"`).
- **Disabled:** not reachable with Tab and not activated.
- **Parent:** a button, reachable with Tab, opened and closed with Enter or Space; announced as "button" with its label and its state "expanded" / "collapsed" (`aria-expanded`); the arrow is decorative. The children of a closed parent are hidden and not reachable with Tab.
- **Contrast:** label and icon meet WCAG 2.2 AA in default and selected states (see `spec.md`); pressed state accepted as momentary.
- **Touch target:** full width × ≈ 37px, above the 24×24px minimum (WCAG 2.5.8).

## Related components
- **Side navigation** — the navigation that contains the items.
