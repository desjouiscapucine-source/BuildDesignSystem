# Accessibility check — Comment — 2026-11-22 (Step B146-2, design stage)

WCAG 2.2 AA, checklist of the `accessibility-check` skill. Run twice: the first run found 2 failures, fixed with the Design System Lead the same day; the second run passes.

## Summary (second run)
| Result | Count |
| ------ | ----- |
| Pass | 9 |
| Fail | 0 |
| Not applicable | 3 |

**Blocking: no.** First run: 5 pass, 2 fail, 4 not applicable (blocking).

## Failures of the first run, fixed
1. **Focus ring of the marker not visible** (WCAG 2.4.7, 1.4.11). The ring (`border.focus`, primary-600) touched the marker (`background.brand`, primary-600): 1:1. Fixed (decision of the Design System Lead): focus offset `space.4` (selected `space.8`), so the page background shows between the marker and the ring; the ring is checked against `background.page` (3:1, in `contrast-pairs.json`). Marker → bubble gap raised to `space.16` so that the selected ring (10px) does not touch the bubble.
2. **Resolved marker below 3:1** (WCAG 1.4.3, 1.4.11). The marker stayed an active button at `opacity.disabled` (about 1.7:1). Fixed: the resolved marker shows the icon `check` (`icon.inverse` on `background.brand`, 6.10:1) at full opacity. Consequence: Avatar must accept an icon (Avatar 1.1, own ticket).
3. **Not a checklist failure, defined in the spec**: role, name and state of the marker. It is a button, named "Comment by <author>" (", resolved" when resolved), with `aria-expanded`; the Avatar inside is decorative.

## Passes (second run)
- `icon.inverse` on `background.brand` (6.10:1), `border.focus` on `background.page` (3:1) and `icon.brand` on `background.page` (3:1) are in `contrast-pairs.json`.
- Interactive targets at least 24×24px: marker 32px, IconButtons and TextInput.
- Focus visible with `border.focus`; hover and pressed use state layers; no disabled state.
- The text and icons of Avatar, CommentMessage, IconButton and TextInput are covered by their own specs; Comment defines no text size.

## Not applicable
Disabled roles (no disabled state); text sizes in rem (no text of its own); guidelines and code criteria (other stages).

## Observation, for the Design System Lead
A marker both **selected and focused**: in the preview the focus offset (`space.4`) replaces the selected offset (`space.8`), so the ring moves in. Whether to specify this combination is asked in the chat.

## Accepted exceptions
None.
