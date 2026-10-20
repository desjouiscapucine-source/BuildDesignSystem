# SideNavigation — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- For the **main navigation** of an application.

## When not to use
- To **navigate within a page** (from one section to another of the same page).

## Usage best practices
- **Placement**: always on the **left** of the screen, along the left edge, on the full height.
- **One side navigation per page**.
- **Only NavigationItems** inside: no buttons, no text.
- **One selected item**: the item of the page displayed is always selected (see NavigationItem).
- **Number of items**: no limit — the navigation scrolls when the items do not fit.
- **Order of the items**: to be defined later.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Select the item of the page displayed. | Leave the navigation without a selected item. |
| Put only NavigationItems in the navigation. | Add buttons or text to the navigation. |

## Content guidelines
- The labels follow the NavigationItem content rules (a noun, same as the page title, sentence case, 20 characters maximum).
- Accessible name: "Main navigation" by default; change it with `label` only if the product needs a more precise name.

## Behavior
- Always expanded, 240px wide (`--size-side-navigation`).
- Full height of the screen; **scrolls** when the items do not fit.

## Accessibility
- **Landmark:** a navigation region (`<nav>`) named "Main navigation" by default (`label`).
- **Keyboard:** Tab moves from one item to the next, in the order of the list; disabled items are skipped.
- **Focus:** white focus ring on each item (see NavigationItem).
- **Screen reader:** the items are announced as a list of links; the selected item is announced as the current page.
- **Contrast:** see NavigationItem.

## Related components
- **NavigationItem** — the items of the navigation.
