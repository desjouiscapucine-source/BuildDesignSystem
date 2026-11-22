# Tab — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- **Only inside Tabs**: Tab is its building block, never used alone.
- **One tab per panel**: each tab shows one panel of the same page.

## When not to use
- To go to another page: use **NavigationItem** (side navigation) instead.
- For a sequence of steps or events: use **TimelineStep** instead.

## Usage best practices
- **Disabled only for content not available yet**: the panel exists but cannot be used yet (e.g. Code before the Code stage of a component). A tab whose content will not exist is removed, not disabled.
- **Never selected and disabled**: a disabled tab cannot be the selected one.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Write in sentence case, short nouns: "Design spec", "Guidelines", "Code". | Use capitals, punctuation or extra words: "DESIGN SPEC", "Guidelines.", "Code Tab". |
| Name the content of the panel: "Guidelines", "Examples". | Use sentences or actions as labels: "Read the usage rules", "See it live". |
| Disable a tab whose content is not available yet: "Code" before the Code stage. | Disable a tab that will never have content: remove it. |
| Select an enabled tab. | Select a disabled tab. |

## Content guidelines
- **Name the content of the panel**: "Design spec", "Guidelines".
- **Short**: one to three words.
- **Sentence case**: first word capitalized only ("Design preview").
- **Text only**: no icon, no punctuation.

## Behavior
- **Click**: selects the tab and shows its panel.
- **Arrow keys**: move the focus and select the tab at once (automatic activation); the panel changes straight away.
- **Long label**: stays on one line; the tab grows. Lack of space is handled by Tabs.
- **Disabled**: label in the disabled color; no click, no focus.

## Accessibility
- **Keyboard:** Tab enters the tab list on the selected tab; Left and Right arrows move to the previous or next tab and select it (wrapping at both ends); Home and End go to the first and last tab. Disabled tabs are skipped. Tab again leaves the list for the panel.
- **Focus:** one tab in the tab order at a time (the selected one); focus ring `--color-border-focus` inside the tab, plus the focus state layer. The focused tab is never hidden by a sticky element or a panel.
- **Screen reader:** each tab has the tab role, is named by its label, says whether it is selected, and is linked to its panel. A disabled tab is announced as unavailable.
- **Contrast:** label `text.secondary` 5.49:1 and selected label `text.brand` 6.10:1 on the page background; selection indicator and focus ring `border.focus` 6.10:1. Disabled text is exempt.
- **Touch target:** about 39px tall, width = label + 2 × `--space-16`; above 24×24px.

## Related components
- **Tabs** — its parent: lines the tabs up and manages the selection (not built yet).
