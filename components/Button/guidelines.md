# Button — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To **submit or confirm**: send a form, save, confirm.
- To **start an action** on the current page: add, download, filter, share…
- To **open an element**: a dialog, a panel, a menu.
- To **cancel or close**: cancel an input, close a window.
- To **go to another page**: the button is then rendered as a link (`<a href>`).

## When not to use
- For an **on / off choice** (turning a setting on or off).

## Usage best practices

### Hierarchy
| Variant | Role | How many | Examples |
| ------- | ---- | -------- | -------- |
| `primary` | The main action, the one expected from the user | No limit | Save, Send, Confirm |
| `secondary` | An alternative or complementary action to the main one | Several | Cancel, Edit, Export |
| `tertiary` | A discreet, less important action | Several | Learn more, Skip, Reset |
| `danger` | A destructive or irreversible action | One per context | Delete, Remove access |

- A `primary` and a `danger` button can be placed side by side.

### Button groups
- In a group, the **main action is on the right**: `[Learn more]` … `[Cancel]` `[Save]`.
- Space between two buttons: **`--space-8`**.
- On small screens, when a group does not fit on one line, the buttons **wrap to a new line, keeping their order**.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Use a clear verb that says what the button does: "Save profile". | Use a vague label: "OK". |
| Put the main action on the right: `[Cancel]` `[Save]`. | Put the main action on the left: `[Save]` `[Cancel]`. |
| Use `danger` for a destructive action: "Delete" in danger. | Use `primary` for a destructive action: "Delete" in primary. |
| Explain why a button is disabled, with a text next to it. | Disable a button without any explanation. |

## Content guidelines
- **Start with a verb**: "Save", "Add a contact" — not "Contact".
- **Sentence case**: capital letter on the first word only — "Add a contact", not "Add A Contact" nor all caps.
- **No final punctuation**: no period, no exclamation mark.
- **Avoid vague labels** ("OK", "Yes", "Click here"): say what the button does.
- **25 characters maximum** (see `spec.md`). When space is missing, the label is cut with an ellipsis.

## Behavior
- Activates on click or tap.
- Rendered as `<button>` for an action, and as `<a href>` when it goes to another page.
- **In a form, a button does not send the form by default.** The button that sends the form must be set as a submit button (`type="submit"`). This avoids sending a form by mistake with "Cancel" or "Add an address".
- **Disabled**: allowed, **only with an explanation** next to the button (why it is disabled and how to enable it).
- **Danger**: an **irreversible** action must ask for a confirmation before it runs.
- **Long label**: single line, cut with an ellipsis; the full label stays in the page (read by screen readers).
- No loading state.

## Accessibility
- **Keyboard:** reachable with Tab; activated with Enter and Space (`<button>`), or Enter (`<a href>`).
- **Focus:** always visible — `--border-width-2` outline in `--color-border-focus`, plus the focus state layer.
- **Screen reader:** announced as "button" (or "link" when it navigates) with its label as accessible name; the leading icon is decorative (`aria-hidden="true"`).
- **Disabled:** native `disabled` — the button is skipped by the Tab key; the explanation text next to it must be readable on its own.
- **Contrast:** all labels and icons meet WCAG 2.2 AA (see `spec.md`); pressed state accepted as momentary.
- **Touch target:** ≈ 37px high, above the 24×24px minimum (WCAG 2.5.8).

## Related components
- None for now.
