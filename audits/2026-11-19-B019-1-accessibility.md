# Accessibility check — TextInput — 2026-11-19

Context: Step B019-1 (ticket B019), design stage · Branch: `component/TextInput` · Agent: `ds-accessibility-audit`, result checked by Claude (every ratio recomputed).

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 7 |
| Fail | 3 (2 fixed, 1 accepted as an exception) |
| Not applicable | 2 |

**Blocking: no** (after the fixes and the exception below).

## Failures

| # | Criterion | Finding | Outcome |
| - | --------- | ------- | ------- |
| 1 | 1.4.11 Non-text Contrast — pair missing | `color.icon.secondary` on `color.background.surface` (leading and clear icons) was not in `tokens/contrast-pairs.json`. Ratio 5.26:1. | **Fixed**: pair added (min 3); `npm run tokens` 64/64 pass. |
| 2 | 1.4.11 Non-text Contrast — pair missing | `color.icon.error` on `color.background.page` (error message icon) was not in `tokens/contrast-pairs.json` nor in the preview contrast list. Ratio 5.92:1. | **Fixed**: pair added to `contrast-pairs.json` and `design/tokens.json`, row added to the spec. |
| 3 | 3.3.2 Labels or Instructions (assessed on request; not in the design checklist) | The only visible name is the label or placeholder inside the empty field; it disappears as soon as the user types. | **Accepted as an exception** by the Design System Lead on 2026-11-21. |

## Accepted exceptions

| Criterion | Exception | Accepted by | Date |
| --------- | --------- | ----------- | ---- |
| 3.3.2 Labels or Instructions | No visible name once the field is filled (label or placeholder inside the empty field only, never above). | Design System Lead | 2026-11-21 |

## Assessed on request

- **3.3.2**: fail → exception (above).
- **1.3.1 Info and Relationships**: pass at the design stage. Code condition: a real programmatic name (`aria-label` or associated label), not the `placeholder` attribute alone.
- **2.5.3 Label in Name**: pass. Code condition: the accessible name contains the exact visible text.
- **3.3.1 Error Identification**: pass (text + icon + border). Because of the exception, the error text names the field by itself (guidelines).

## Passes

| Criterion | Detail |
| --------- | ------ |
| 1.4.3 / 1.4.11 | Value 14.87:1 · label / placeholder 5.26:1 · help text 5.49:1 · error text 8.26:1 · field border 3.64:1 · error border 3.89:1 · focus outline 6.10:1 |
| 2.5.8 Target Size | Clear button ≥ 24×24px; field full width × ≈ 39px |
| 2.4.7 Focus Visible | `--border-width-2` `--color-border-focus` outline |
| State layers | Hover / focus / pressed on the field and the clear button |
| Disabled | Disabled roles on a light background; clear button hidden |
| 1.4.4 Resize Text | `body` and `body-sm` in rem |
| Error not by color alone | Icon + text + border |

## Not applicable

- `border.focus-inverse`: no brand or dark background.
- `opacity.disabled`: disabled uses the disabled roles on a light background.

## Notes

- The spec contrast table said 6.10:1 for the field border; the real ratio is 3.64:1 (fixed). The Select spec has the same wrong value.
- The clear button has no simulated hover / focus / pressed state in the design preview; defined in the spec, built at the code stage.
