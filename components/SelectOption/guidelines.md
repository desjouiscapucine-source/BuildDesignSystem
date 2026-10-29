# SelectOption — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- Inside the **Select** list only: one SelectOption per choice.

## When not to use
- **On its own**, outside a Select: the option only makes sense in its list.
- To **trigger an action** (e.g. "Delete"): use a **Button**. A menu of actions is not in the design system yet.
- To **switch the view or filter the content** with choices always visible: use **Chips**.

## Usage best practices
- **One selected option at most**: the Select is a single choice; the selected option is the value of the Select.
- **Icons: all or none** — in the same list, every option has a leading icon, or none has one, so the labels stay aligned.
- **Prefer hiding to disabling**: when a choice is not available, remove its option. Disable it only when the user needs to know the choice exists.
- **Order**: a logical order when there is one (steps, size…), otherwise alphabetical.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Give every option of a list an icon, or none. | Mix options with and without an icon. |
| Remove the option of a choice that is not available. | Fill the list with disabled options. |
| Use a short label: "Done". | Use a long label: "All the tasks that are finished". |
| Write parallel labels: "To do", "In progress", "Done". | Mix forms: "To do", "Working on it", "Finished task". |
| Use sentence case: "In progress". | Use title case or punctuation: "In Progress." |

## Content guidelines
- **Sentence case**: capital letter on the first word only.
- **No punctuation**.
- **Parallel**: every option of a list has the same grammatical form.
- **Distinct**: two options never start with the same words, so they are told apart at a glance.
- **25 characters maximum** (see `spec.md`).

## Behavior
- A click (or Enter) on an option **chooses it and closes the list**; the focus goes back to the Select field.
- The selected option shows the selected look (cream background, semibold brown label) and the check mark.
- **Long label**: single line, cut with an ellipsis ("…"). Keep labels under 25 characters so this does not happen.
- **Disabled**: the option cannot be chosen; a click or Enter does nothing. Never selected and disabled at the same time.
- Empty list and loading are handled by the Select.

## Accessibility
- **Keyboard:** handled by the Select (WAI-ARIA listbox pattern): arrows move between options, Home / End go to the first / last option, Enter chooses, Escape closes the list. A **disabled option is reached** with the arrows but cannot be chosen.
- **Focus:** the option reached with the keyboard is always visible — `--border-width-2` outline in `--color-border-focus`, plus the focus state layer.
- **Screen reader:** announced as "option" (`role="option"`) with its label as accessible name; selected with `aria-selected="true"`; disabled announced as unavailable (`aria-disabled="true"`). The leading icon and the check mark are decorative (`aria-hidden="true"`).
- **Contrast:** label, icon and check mark meet WCAG 2.2 AA in default and selected states (see `spec.md`).
- **Touch target:** full width × ≈ 37px, above the 24×24px minimum (WCAG 2.5.8).

## Related components
- **Select** — the field that contains the options (in progress, B021).
- **Chip** — choices always visible, to switch the view or filter.
