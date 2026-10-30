# Select — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To choose **one option** in a list, when the choices do not need to stay visible (e.g. the status of a task in a form).

## When not to use
- To **switch the view or filter the content**: use **Chips** — the choices stay visible.
- To **trigger an action** (e.g. "Delete", "Duplicate"): use a **Button**. A menu of actions is not in the design system yet.

## Usage best practices
- **Always a placeholder**: no option is chosen in advance; the user always chooses. **Exception**: when the field shows a setting that already exists (e.g. the token a component uses, the current value of a prop), that value is shown as chosen; the placeholder stays for when no value is set.
- **Full width**: the Select takes the width of its container; place it in a column of the layout grid to set its width.
- **Options**: follow the SelectOption guidelines (order, icons all or none, prefer hiding to disabling).
- **Error and disabled are never combined**: a disabled Select cannot be corrected.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Name the field with a noun: "Status". | Write a sentence or punctuation: "Select the status of the task:". |
| Write a placeholder that asks to choose: "Choose a status". | Write a placeholder that looks like an option: "To do". |
| Say how to fix the error: "Choose a status to save the task". | Write a vague error: "Invalid". |
| Use Chips to switch the view. | Use a Select to switch the view. |
| Use Buttons for actions. | Put actions in a Select: "Delete", "Duplicate". |

## Content guidelines
- **Label**: a noun, sentence case, no colon, no punctuation, 25 characters maximum.
- **Placeholder**: "Choose a …" followed by the noun of the label ("Choose a status"); never the label of a real option.
- **Error message**: one sentence that says how to fix it ("Choose a status to save the task").
- **Options**: see the SelectOption content guidelines.

## Behavior
- **Open**: a click on the field, or Enter, Space or Arrow down when the field has the focus. The list opens under the field, over the page.
- **Long lists**: the list shows 8 options at most, then scrolls; the focused option is always scrolled into view.
- **Focus when opening**: on the chosen option; on the first option when none is chosen.
- **Choose**: a click or Enter on an option chooses it, closes the list and gives the focus back to the field.
- **Close without changing**: Escape, Tab, or a click outside the list; the value stays the same.
- **Error**: shown when the list closes without a choice; it disappears as soon as an option is chosen.
- **Disabled**: the list cannot be opened.
- **Long texts**: label, placeholder and value on one line, cut with an ellipsis; the error message wraps to a new line.

## Accessibility
- **Keyboard:** the field is reached with Tab. Enter, Space or Arrow down open the list; in the list, Arrow up / down move between options, Home / End go to the first / last option, **typing a letter goes to the next option starting with it**, Enter chooses, Escape closes without changing, Tab closes. A disabled option is reached but cannot be chosen.
- **Focus:** always visible — `--border-width-2` outline in `--color-border-focus` on the field, plus the focus state layer; the option reached in the list shows its own focus (see SelectOption).
- **Screen reader:** the field is announced with its label, its value (or placeholder) and its state "collapsed" / "expanded" (`aria-haspopup="listbox"`, `aria-expanded`); the list is a `listbox` named by the label; the error message is linked to the field (`aria-describedby`) and the field is marked invalid (`aria-invalid="true"`). The arrow and the error icon are decorative.
- **Disabled:** not reachable with Tab.
- **Contrast:** label, value, placeholder, border, arrow and error message meet WCAG 2.2 AA (see `spec.md`). The error is not shown by color alone: border, icon and message.
- **Touch target:** full width × ≈ 39px, above the 24×24px minimum (WCAG 2.5.8).

## Related components
- **SelectOption** — the options of the list.
- **Chip** — choices always visible, to switch the view or filter.
- **Button** — to trigger an action.
