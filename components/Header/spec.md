# Header — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
The top bar of a page: it shows the brand, the search and the actions available on every page, and gives access to the navigation below desktop.

## Types
A single type: the bar.

## Anatomy
1. Burger (required below desktop, absent on desktop) — an IconButton `primary` that opens and closes the side navigation.
2. Brand (required) — the logo and the name, one link to the landing page.
3. Divider after the brand (Divider, vertical).
4. Search (optional) — a TextInput of type `search`.
5. Information (optional) — a content of the site (e.g. the time-spent clock), with its own look.
6. Divider before the actions (Divider, vertical).
7. Actions (optional) — IconButtons, from left to right: the Workspace button (`primary`; it will open a Menu of widgets, e.g. the UX playground; B167), the other transverse actions and the log in / log out button, always last (`tertiary`; one button, its icon changes with the state).

The spaces links are not in the Header: the logo leads to the landing page, where the space is chosen.

## Variants

### Variant properties
None: the Header has a single look.

### Combinations
- Allowed: every optional part can be present or absent.
- Forbidden: none.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Brand name | Yes | BuildDesignSystem | One line | Not cut: the name never wraps (one line) |
| Search placeholder | If the search is present | Search pages | One line | Cut with an ellipsis (TextInput) |
| Information | No | Time spent building 00:00:00 | One line | Hidden below desktop |
| Action labels (accessible names) | Yes, one per IconButton | Workspace, Log in | — | Not visible (icon only) |

## Props
| Prop | Description | Required |
| ---- | ----------- | -------- |
| `brand` | `{ logo, name, href }`: the logo image, the name and the destination of the link | Yes |
| `menuOpen` | State of the burger (open or closed) | Yes |
| `onMenuClick` | What the burger does when it is pressed | Yes |
| `search` | The search field | No |
| `info` | The content of the site shown next to the search | No |
| `actions` | The list of IconButtons, with no fixed limit | No |

## Sizes
One size.

| Part | Dimension | Token |
| ---- | --------- | ----- |
| Header | Height | `--size-header` |
| Logo | Width and height | `--size-logo` |
| Search field | Width on desktop | `--size-search-field` |
| Divider | Height | `--space-32` |
| Padding (horizontal) | Desktop · below desktop | `--space-24` · `--space-16` |
| Gap between the parts | Desktop · below desktop | `--space-16` · `--space-8` |

## Responsive
- Below desktop (1024px, `--breakpoint-desktop`): the burger appears at the left, the information is hidden with its Divider, the search takes the remaining width, the padding and the gap are smaller (table above).
- Below tablet (768px, `--breakpoint-tablet`): the brand name is hidden, the logo stays.
- A Divider disappears with the part it separates; the Divider before the actions stays.

## Position
The Header is fixed at the top of the page while the content scrolls (`position: sticky`), above the content: `--z-index-sticky`.

## States
None on the bar itself. The IconButtons and the TextInput keep their own states.

The brand is a link of the Header (the logo and the name, without underline; the Link component does not fit, it is text only and always underlined). Its states:
- Focus: a visible outline, `--border-width-2` in `--color-border-focus`, around the logo and the name (the pair `border.focus` on `brand-subtle` is checked in `contrast-pairs.json`).
- Hover, pressed: not defined (no state layer on the brand).

## Accessibility
- A `<header>` element.
- The brand link, focusable with the keyboard (Enter follows it), has the accessible name "<name>, home".
- The burger has the accessible name "Open navigation" / "Close navigation", and the attributes `aria-expanded` and `aria-controls`.
- The Dividers are decorative (hidden from screen readers).
- The bottom border is decorative: no contrast requirement (WCAG 1.4.11), the bar is distinguished by its background.
- The Information is a content of the site: the site makes it meet WCAG 2.2 AA (contrast 4.5:1 for text); the Header only sets its place.
- Every IconButton has an accessible name; the log in / log out button names the action it does.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Header | Background | all | `--color-background-brand-subtle` |
| Header | Bottom border color | all | `--color-border-default` |
| Header | Bottom border width | all | `--border-width-1` |
| Header | Height | all | `--size-header` |
| Header | Horizontal padding | desktop | `--space-24` |
| Header | Horizontal padding | below desktop | `--space-16` |
| Header | Gap between the parts | desktop | `--space-16` |
| Header | Gap between the parts | below desktop | `--space-8` |
| Header | Stacking order | all | `--z-index-sticky` |
| Brand | Text color | all | `--color-text-primary` |
| Brand | Text style | all | `heading-5` (`--typography-heading-5-*`) |
| Brand | Focus outline width | focus | `--border-width-2` |
| Brand | Focus outline color | focus | `--color-border-focus` |
| Logo | Size | all | `--size-logo` |
| Search | Width | desktop | `--size-search-field` |
| Divider | Height | all | `--space-32` |

## Open questions
- The Menu (B167) is not in the design system yet: the Workspace button does not open anything until it exists.
- The chatbot (B105): where it opens is decided with the Chatbot component.
