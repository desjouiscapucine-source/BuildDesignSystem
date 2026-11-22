# Accessibility check — TextInput — 2026-11-22

Context: Step B019-2, guidelines stage · Branch: `component/TextInput` · Agent: `ds-accessibility-audit` (two runs), result checked by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 19 |
| Fail | 0 (5 found on the first run, all fixed) |
| Not applicable | 0 |

**Blocking: no**

## Failures of the first run — fixed

| # | Criterion | Finding | Fix |
| - | --------- | ------- | --- |
| 1 | 2.1.2 No keyboard trap | How focus leaves the field was not stated. | Tab and Shift+Tab leave the field and the clear button. |
| 2 | 2.1.1 Keyboard, focus order | Focus after Enter / Space on the clear button not stated. | Click, Enter or Space gives the focus back to the field; after Escape the focus stays in the field (Design System Lead). |
| 3 | 2.4.11 Focus not obscured | Not stated. | Field and clear button never hidden by a sticky element or a panel. |
| 4 | 4.1.2 Name, role, value | Roles and states not stated; `number` role undecided. | Text field for `text` and `number` (Arrow up / down do not change the value), search field for `search`; clear button is a button; states required, invalid, disabled (Design System Lead). |
| 5 | 4.1.2 + spec consistency | "Required" used in the guidelines but missing from the spec. | New `required` property in the spec: no visual mark, announced, error when emptied or on send (Design System Lead). |

## Accepted exceptions

| Criterion | Exception | Accepted by | Date |
| --------- | --------- | ----------- | ---- |
| 3.3.2 Labels or Instructions | No visible name once the field is filled. | Design System Lead | 2026-11-21 (`audits/2026-11-19-B019-1-accessibility.md`) |

Mitigations in the guidelines: the error names the field, help text when the value is ambiguous, icon that recalls the field (`text` type), short forms, programmatic name kept after typing.

## Passes

Keyboard keys and results (2.1.1) · no keyboard trap (2.1.2) · focus order · visible focus on the field and the clear button (2.4.7) · focus not obscured (2.4.11) · roles and states (4.1.2) · accessible name (4.1.2, 2.5.3) · help text and error linked (`aria-describedby`) · error announced with `aria-live="polite"` (4.1.3) · error identification, not by color alone (3.3.1, 1.4.1) · Escape in a Dialog or panel · clear button name and decorative icons · contrast (clear button outline: `border.focus` on `background.surface` in `contrast-pairs.json`) · target size (2.5.8) · `number` and `required` consistent between spec and guidelines.

## To check in the browser (code stage)

- The `aria-live="polite"` region is in the DOM before the message appears; the error is not read twice.
- The field has an `aria-label`, not only the `placeholder` attribute.
- `number` does not use a native spin button.
- After clearing (click, Enter, Space, Escape), focus is in the field.
- In a Dialog or panel, the first Escape only empties the search field.

## Notes

- The spec changed after its design approval (`required`, clear button focus outline, roles and states): approved again with the guidelines.
- The clear button's states and focus outline are not shown in `design/Preview.tsx`.
