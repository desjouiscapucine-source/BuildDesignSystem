# Accessibility check — Frame — 2026-11-19

Context: Step B143-1, design stage (with the new tokens `size.viewport-tablet` / `size.viewport-tablet-height`) · Branch: component/Frame · Agent: `ds-accessibility-audit` (result checked by Claude)

## Summary

First run: 12 pass, 3 fail, 7 not applicable. **Blocking: yes** → the 3 failures were fixed with the decisions of the Design System Lead (2026-11-19). After the fixes: **15 pass, 0 fail. Blocking: no.**

## Contrast ratios

| Pair | Foreground / background | Ratio | Min | In `contrast-pairs.json` |
| ---- | ----------------------- | ----- | --- | ------------------------ |
| Name on canvas | text.primary / background.subtle | 13.99 | 4.5 | yes |
| Size label on canvas | text.secondary / background.subtle | 4.95 | 4.5 | yes |
| Device bar text and icons | text.primary / background.page | 15.52 | 4.5 | yes |
| Address text (desktop) | text.primary / background.subtle | 13.99 | 4.5 | yes |
| Empty message text and icon | text.secondary / background.page | 5.49 | 4.5 | yes |
| Focus / selected outline vs frame | border.focus / background.page | 6.10 | 3 | yes |
| Focus / selected outline vs canvas | border.focus / background.subtle | 5.50 | 3 | **added (fix 1)** |
| Hover border vs canvas | border.strong / background.subtle | 3.28 | 3 | **added (fix 2)** |
| Hover border vs frame | border.strong / background.page | 3.64 | 3 | yes |

`npm run tokens`: 64/64 pairs pass WCAG 2.2 AA.

## Failures and fixes

| # | Criterion | Finding | Fix (decision of the Design System Lead) |
| - | --------- | ------- | ---------------------------------------- |
| 1 | Border pairs in `contrast-pairs.json` (1.4.11, 2.4.7) | `border.focus` / `background.subtle` (outline on the canvas) not checked | Pair added (min 3) |
| 2 | Border pairs in `contrast-pairs.json` (1.4.11) | `border.strong` / `background.subtle` (hover border on the canvas) not checked | Pair added (min 3) |
| 3 | Interaction states use the state layers | Hover = border only, focus = outline only | State layers added: hover `--state-layer-hover`, focus `--state-layer-focus`, in `--color-text-primary`, over the container; the hover border and the focus outline are kept |

Also decided: focus and selected show together (selected outline on the container + focus outline offset by `--space-4` around it); the preview shows it on the `selected` variant, Focus state.

## Passes

- Text contrast (1.4.3): name, size label, device bar text, address, empty message.
- Non-text contrast (1.4.11): device bar icons, empty icon, focus / selected outline, hover border.
- Target size (2.5.8): the whole frame is the target (375 × 812 at minimum).
- Visible focus (2.4.7): `border.focus` 2px, offset `space.4`; light backgrounds only, `focus-inverse` not needed.
- Text sizes in rem (1.4.4).

## Not applicable

- Disabled roles and `opacity.disabled`: no disabled state.
- 3:1 for the default frame border and the device bar line (`border.subtle`): decorative; the frame is identified by its labels and shadow, the selected state uses `border.focus`.
- New tokens: sizes only (no color pair, no duration).

## Accepted exceptions

None.

## To recheck

- Once the Canvas (B142) decides its background: the label and outline pairs (text.secondary on the canvas is 4.95, a small margin).
- Code stage: both outlines together, keyboard access to the frame.
