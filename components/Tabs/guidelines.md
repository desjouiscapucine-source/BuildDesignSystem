# Tabs — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- **To switch between panels of the same page**: contents at the same level, one shown at a time (e.g. the documentation of a component, the tools of Panel).

## When not to use
- To go to another page: use **SideNavigation** instead.
- For a sequence of steps or events: use **Timeline** instead.
- To filter a list: use **ChipGroup** instead (not in the design system yet, B094).

## Usage best practices
- **Two to seven tabs**: more than seven → organize the content differently.
- **At least two enabled tabs**: with fewer, do not use Tabs; show the content directly.
- **One Tabs per view**: never two rows of tabs visible at the same time.
- **No Tabs inside a panel of Tabs**.
- **Right under the header**: under the title of the page, or at the top of its container (as in Panel).

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Switch between contents of the same page: "Design spec", "Guidelines", "Code". | Go to other pages ("Home", "Foundations", "Components"): use SideNavigation. |
| Keep two enabled tabs or more. | Leave a single enabled tab: show the content directly. |
| Show one row of tabs per view. | Put Tabs inside a panel of Tabs. |
| Use two to seven tabs. | Use more than seven tabs: organize the content differently. |

## Content guidelines
- **Tab labels**: the rules of Tab (name the content of the panel, one to three words, sentence case, text only).
- **Name of the tab list** (required, read by screen readers): names the content, e.g. "Component documentation", "Playground tools"; or the visible title right above, when there is one.

## Behavior
- **Click on a tab**: selects it and shows its panel, without reloading the page.
- **Arrow keys**: move the focus and select the tab at once (automatic activation, Tab guidelines).
- **Not enough space**: the row scrolls horizontally (finger, trackpad, keyboard), no button, scrollbar hidden; the selected or focused tab is brought into view.
- **Disabled tab**: skipped by the arrow keys; Tabs always keeps at least two enabled tabs.

## Accessibility
- **Keyboard:** Tab enters the row on the selected tab; Left and Right arrows move to the previous or next tab and select it (wrapping at both ends); Home and End go to the first and last tab; disabled tabs are skipped. Tab again goes to the panel, which is always focusable.
- **Focus:** the Tab focus ring, drawn inside the tab; the panel has its own focus ring `--border-width-2` `--color-border-focus`. The focused tab is brought into view when the row scrolls, and is never hidden by a sticky element or a panel.
- **Screen reader:** the row is a tab list, named by its required name; each tab is announced with its label and whether it is selected; the panel is a tab panel, named by its tab.
- **Contrast:** the pairs of Tab on `background.page` and `background.surface`, and the panel focus ring `border.focus` (6.10:1 on `background.page`). The line under the row is decorative.
- **Touch target:** each tab about 39px tall (Tab), above 24×24px.

## Related components
- **Tab** — its building block: one tab of the row.
