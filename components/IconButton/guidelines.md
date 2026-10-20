# IconButton — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- For an **obvious action**, when the icon alone is enough to understand it (e.g. close, open a panel).

## When not to use
- When the **icon is ambiguous** (it can be understood in several ways).

## Usage best practices
- Space between two icon buttons side by side: **`--space-8`**.
- Choose the variant like for the Button: `primary` for the main action, `secondary` for an alternative, `tertiary` for a discreet action.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Use a clear icon: `close` to close. | Use an ambiguous icon. |
| Give a precise accessible name: "Close the timeline". | Give a vague name ("Button") or no name. |

## Content guidelines
- **Accessible name (`label`)**: always required; **starts with a verb** — "Close the timeline", "Open the timeline".

## Behavior
- Activates on click or tap.
- In a form, it does not send the form by default (`type="button"`, like the Button).
- **Disabled**: like the Button — allowed **only with an explanation** next to it; native `disabled` (skipped by the Tab key).
- No tooltip for now.

## Accessibility
- **Keyboard:** reachable with Tab; activated with Enter and Space.
- **Focus:** always visible — `--border-width-2` outline in `--color-border-focus`, plus the focus state layer.
- **Screen reader:** announced as "button" with its `label` as name; the icon is decorative.
- **Contrast:** icons 3:1 or more in every state (see `spec.md`).
- **Touch target:** 36 × 36px, above the 24×24px minimum (WCAG 2.5.8).

## Related components
- **Timeline** — uses icon buttons to open and close its panel on small screens.
