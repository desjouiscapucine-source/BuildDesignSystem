# TextInput — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To type **a single line of free text** (e.g. a name, an email).
- To **search** in a content and filter it while typing: `search` type (e.g. the icons of the Icons page).
- To type **a number**: `number` type (e.g. a width in pixels).

## When not to use
- To type **text on several lines**: use a **Textarea** (B020, not in the design system yet).
- To choose **a value in a list known in advance** (e.g. a status): use a **Select**.
- To **filter the content or switch the view** with a few choices: use **Chips** — the choices stay visible.
- To enter **a date, a time or a color**: use a dedicated field (not in the design system yet).

## Usage best practices
- **Either a label or a placeholder, never both**: the empty field shows one text only, which disappears as soon as the user types.
- **No visible name once filled** (accepted exception to WCAG 3.3.2), so:
  - the **error message names the field** by itself;
  - add a **help text** when the value alone does not say what the field is (e.g. a number: "In pixels");
  - prefer an **icon that recalls the field** (e.g. `mail` for an email) — it stays visible once filled (`text` type only);
  - prefer **short forms**: the TextInput alone or with few fields.
- **Full width**: the TextInput takes the width of its container; place it in a column of the layout grid to set its width.
- **Stacked fields**: `--space-16` between two fields.
- **Search**: the `search` type is placed **above the content it filters**.
- **Error or required are never combined with disabled**: a disabled field cannot be corrected or filled.
- **Documentation site**: the fields of the Playground, the Design preview, the Icons page and the site search follow these rules when they adopt the TextInput; the site search uses the `search` type, without the "/" keyboard hint.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Write a placeholder with a verb and a noun: "Enter a name". | Write an example value as placeholder: "name@example.com". |
| Write an error that names the field and says how to fix it: "Enter a name to save the component". | Write a vague error: "Required". |
| Add a help text when the value is ambiguous: "240" + "In pixels". | Leave a number with nothing to explain it. |
| Use an icon that recalls the field: `mail` for an email. | Put a label above the field, or a label and a placeholder together. |
| Use a Select for a list of values known in advance. | Use a TextInput to type a known value: "Type a status". |

## Content guidelines
- **Label**: a noun ("Email", "Width"), sentence case, no colon, no punctuation, 25 characters maximum.
- **Placeholder**: a verb and a noun ("Enter a name", "Search an icon"), sentence case, no punctuation; never an example value.
- **Help text**: short, gives the format or the unit in a few words ("In pixels"), sentence case, no final period.
- **Error message**: one sentence that names the field and says how to fix it ("Enter a name to save the component").

## Behavior
- **Typing**: the value replaces the label or placeholder; a value longer than the field scrolls horizontally; when the field is not focused, it is cut with an ellipsis.
- **Error**: checked **while typing**; the error message replaces the help text and disappears as soon as the value is correct.
- **Required field** (`required`): no visual mark. When it is empty, the error shows when the user deletes all the text, or when the form is sent without it.
- **`number` type**: only digits are valid; any other character is written and shows an error ("Enter a number for the width").
- **`search` type**:
  - the content is filtered **while typing**, with no button and no Enter;
  - the clear button appears once the field holds text; a click, Enter or Space on it empties the field and **gives the focus back to the field**;
  - **Escape** empties the field, like the clear button; the focus stays in the field;
  - **in a Dialog or a panel**, Escape first empties the `search` field; on an empty field, Escape closes the Dialog or the panel.
- **Disabled**: the field cannot be focused or changed; the clear button is hidden.
- **Long texts**: label and placeholder on one line, cut with an ellipsis; help text and error message wrap to a new line.

## Accessibility
- **Keyboard:** the field is reached with Tab; the clear button (`search` type, when filled) is reached with Tab after the field; Enter or Space on it empties the field and gives the focus back to the field. Escape empties a `search` field (focus stays in the field). Arrow up / down do not change a `number` value.
  Tab and Shift+Tab leave the field and the clear button: no keyboard trap (WCAG 2.1.2).
- **Focus:** always visible — `--border-width-2` outline in `--color-border-focus`, plus the focus state layer; the clear button shows the same outline and its own focus state layer. The focused field and clear button are never hidden by a sticky element or a panel (WCAG 2.4.11) — e.g. a `search` field under the sticky site header.
- **Screen reader:**
  - **role**: a text field for `text` and `number`, a search field for `search`; **states**: required, invalid, disabled;
  - the field is announced with its **accessible name: the label, or else the placeholder** — a real programmatic name (`aria-label`), never the `placeholder` attribute alone;
  - the accessible name contains the exact visible text (WCAG 2.5.3);
  - the help text and the error message are linked to the field (`aria-describedby`); in error, the field is marked invalid (`aria-invalid="true"`);
  - the error message is **announced when it appears or changes** (`aria-live="polite"`), not again at each character while it stays the same;
  - the clear button is a **button**, announced with a name that starts with a verb ("Clear the search");
  - the leading icon and the error icon are decorative.
- **Disabled:** not reachable with Tab; announced as disabled when reached by a screen reader in reading mode.
- **Contrast:** value, label, placeholder, help text, border, icons and error message meet WCAG 2.2 AA (see `spec.md`). The error is not shown by color alone: border, icon and message.
- **Touch target:** field full width × ≈ 39px; clear button 24×24px minimum (WCAG 2.5.8).
- **Accepted exception:** WCAG 3.3.2 — no visible name once the field is filled (Design System Lead, 2026-11-21); see the best practices above.

## Related components
- **Select** — to choose a value in a list known in advance.
- **Chip** — choices always visible, to filter or switch the view.
- **Textarea** — text on several lines (B020, not in the design system yet).
- **IconButton** — not used for the clear button: it is an icon inside the field, to keep the field height.
