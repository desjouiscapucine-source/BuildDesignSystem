# Accessibility check — ZoomControls (design stage) — 2026-11-22

Step B161-1 · Branch `component/ZoomControls` · Agent `ds-accessibility-audit` (WCAG 2.2 AA, `accessibility-check` checklist), result checked by Claude. Includes the new token `size.zoom-level`.

## Summary
| Result | Count |
| ------ | ----- |
| Pass | 5 |
| Fail | 0 |
| Not applicable | 6 |

**Blocking: no** · Accepted exceptions: none.

## Contrast (values from `tokens/tokens.css`)
| Pair | Ratio | Target | Result |
| ---- | ----- | ------ | ------ |
| Zoom level `text.primary` on `background.surface` | 14.87:1 | 4.5:1 | Pass |
| Tertiary icon `icon.brand` on `background.surface` | 5.85:1 | 3:1 | Pass |
| Focus ring `border.focus` on `background.surface` | 5.85:1 | 3:1 | Pass |
| Focus ring `border.focus` on `background.subtle` (canvas) | 5.50:1 | 3:1 | Pass |
| Disabled icon `icon.disabled` on `background.surface` | 2.13:1 | exempt | N/A — inactive control |
| Divider `border.subtle` on `background.surface` | 1.20:1 | — | N/A — decorative, `aria-hidden` |
| Container `background.surface` on canvas `background.subtle` | 1.06:1 | — | N/A — not interactive; icons identify the buttons; `shadow.dropdown` |

## Passes
- 1.4.3 / 1.4.11: every text, icon and focus pair is in `tokens/contrast-pairs.json` and meets AA.
- 2.5.8: targets 36 × 36px (IconButton); zoom level and divider are not interactive.
- 2.4.7: visible focus `border.focus` (IconButton), light background.
- States: state layers (IconButton); disabled uses `icon.disabled`, not `opacity.disabled`.
- 1.4.4: zoom level text `label-sm` in rem.

## Not applicable
New colour pair (none: `size.zoom-level` is a size), motion, opacity, font sizes in rem (the token is a minimum width, in px like the other size tokens).

## Notes (not failures)
1. `spec.md` said the zoom level area "grows with the text size": the token is 40px, so the **minimum** width does not scale; the text is never cut (min-width), but at 200% text size the area can widen with the digits. Wording fixed in `spec.md`; the Design System Lead then chose **rem**: `size.zoom-level` = 2.5rem.
2. `aria-label` on a plain `<span>` is not reliably announced: how "Zoom level 100%" is announced is left as an open question for the guidelines and code stages.
