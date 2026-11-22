# Accessibility check — TextInput — 2026-11-22

Context: Step B019-3, code stage · Branch: `component/TextInput` · Agent: `ds-accessibility-audit`, result checked by Claude (browser checks below).

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 10 |
| Fail | 0 |
| Not applicable | 0 |

**Blocking: no**

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard, focus order, roles, states (2.1.1, 4.1.2): native `<input>`; `search` = `type="search"`; `text` and `number` = `type="text"` (`number` with `inputMode="numeric"`, no spin button); clear button = native `<button>` after the field; `aria-required`, `aria-invalid`, native `disabled` | `TextInput.tsx` |
| Accessible name = visible label or placeholder, as `aria-label` (2.5.3, 1.3.1); `aria-label` cannot be overridden | `TextInput.tsx` |
| No keyboard trap (2.1.2); Escape caught only on a filled `search` field, passed on otherwise | `TextInput.tsx` |
| Escape in a Dialog: the first Escape only empties the field (`stopPropagation` before the Dialog handler) | `TextInput.tsx`; `Dialog.tsx:68-71` |
| Focus back in the field after clearing; stays in the field after Escape | `TextInput.tsx` |
| Clear button named "Clear the search"; leading, clear and error icons `aria-hidden` | `TextInput.tsx` |
| Native states, error not by color alone (border, icon, message) | `TextInput.css` |
| Visible focus (2.4.7): `--border-width-2` `--color-border-focus` outline + focus state layer, field and clear button | `TextInput.css` |
| Target size (2.5.8): clear button 24×24px; field full width × 39px | `TextInput.css` |
| Live region (4.1.3) always rendered; only the error is in it; `aria-describedby` to the error, or else the help text | `TextInput.tsx` |

## Checked in the browser by Claude

- Field height 39px.
- `search`: typing filters; Tab reaches "Clear the search"; **click, Enter and Space** empty the field, the focus returns to the field and the button disappears; Escape empties the field, the focus stays; Shift+Tab from the clear button goes back to the field.
- `number`: `type="text"`, `inputmode="numeric"`; a letter sets `aria-invalid="true"`, `aria-describedby` to the error, error border.
- Mobile width (375px): no horizontal scroll; every field fits.

## Not checked (no screen reader in this environment)

- Error read once by VoiceOver when it appears; roles and states read as expected. Checked in the code (see Passes).

## Accepted exceptions

| Criterion | Exception | Accepted by | Date |
| --------- | --------- | ----------- | ---- |
| 3.3.2 Labels or Instructions | No visible name once the field is filled. | Design System Lead | 2026-11-21 |
