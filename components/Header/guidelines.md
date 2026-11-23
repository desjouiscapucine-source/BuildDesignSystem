# Header — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- As the top bar of every page of an application or a site.
- To give access to the search and to the actions available on every page.
- To give access to the navigation below desktop (the burger opens the side navigation).

## When not to use
- For the main navigation of a space: use the **SideNavigation**, not links in the Header.
- For an action of one page only: put it in the page or in a **Panel**.
- More than one Header on a page: there is one, fixed at the top.

## Usage best practices
- The brand always leads to the landing page.
- Keep only the actions available on every page, as icon buttons: the Workspace button first, the log in / log out button last.
- When there are too many actions for the width, the extra ones go into the Workspace menu (how it works is decided with the Menu, B167).
- On a page without a side navigation, do not show the burger.
- Separate the groups with the Dividers, never every item.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Actions available on every page: Workspace, log in. | An action of one page only (e.g. Save) in the bar: it belongs to the page. |
| The brand leads home; the spaces are chosen on the landing page. | Navigation links (Docs, Portfolio, Blog) in the bar: use the SideNavigation. |
| Icon buttons, each with an accessible name. | Text buttons in the actions zone. |

## Content guidelines
- **Brand name:** on one line, never cut.
- **Search placeholder:** a verb and a noun, no punctuation (e.g. "Search pages").
- **Action names (accessible names):** a verb first, sentence case, no punctuation: "Open workspace", "Log in", "Log out".

## Behavior
- The Header stays fixed at the top while the page scrolls.
- Below desktop (1024px): the burger appears, the Information and its Divider are hidden, the search takes the remaining width. Below tablet (768px): the brand name is hidden, the logo stays. The Information must therefore never be essential.
- A placeholder that is too long is cut with an ellipsis (TextInput).
- Open point: the behavior when there are more actions than the width allows is decided with the Menu (B167).

## Accessibility
- **Keyboard:** Tab goes from left to right: the burger, the brand, the search, the Information if it is interactive, the actions. Enter follows the brand link. Enter or Space activates the burger and the actions. Tab and Shift+Tab move through the parts and out of the Header: nothing traps the focus.
- **Focus:** every part shows its focus; the brand link has an outline of `--border-width-2` in `--color-border-focus`. The fixed Header must not hide the focused element (WCAG 2.4.11): the page sets `scroll-padding-top` to the height of the Header (`--size-header`).
- **Screen reader:** a `<header>` element; the brand link is named "<name>, home"; the burger is named "Open navigation" / "Close navigation" and has `aria-expanded` and `aria-controls`; the search field is named by its placeholder (the TextInput gives it an `aria-label`), e.g. "Search pages"; every icon button has a name; the Dividers are hidden.
- **Contrast:** the pairs are those of the parts; the bottom border and the Dividers are decorative; the contrast of the Information is the site's responsibility.
- **Touch target:** the icon buttons are 36px, the brand link 32px high: at least 24×24px.

## Related components
- **SideNavigation**: the navigation of the space, opened by the burger.
- **Divider**, **IconButton**, **TextInput**: the parts of the Header.
- **Breadcrumb**: the trail under the Header.
- **Menu** (B167) and **Chatbot** (B105), not in the design system yet: the Workspace menu and the chatbot.

## Open questions
- The behavior of the actions when the width is not enough (with the Menu, B167).
- Where the chatbot opens (with the Chatbot, B105).
