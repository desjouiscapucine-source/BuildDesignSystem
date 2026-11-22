# Accessibility check — Frame — 2026-11-21

Context: Step B143-3, code stage · Branch: component/Frame · Agent: `ds-accessibility-audit` (two runs, results checked by Claude) and browser checks by Claude · Previous report: `audits/2026-11-19-B143-2-accessibility.md`

## Summary

| Run | Pass | Fail | Blocking |
| --- | ---- | ---- | -------- |
| 1 | 8 | 2 | yes |
| 2 (after the fixes) | 10 | 0 | **no** |

## Failures and fixes

| # | Criterion | Finding | Fix (decision of the Design System Lead) |
| - | --------- | ------- | ---------------------------------------- |
| 1 | Native states, not classes (`component-code`, WCAG 4.1.2) | Selected styled with the class `.ds-frame--selected` | The selected outline comes from `aria-pressed="true"` on the name button; the class is removed |
| 2 | Target size (WCAG 2.5.8, spacing exception) | The select-on-click handler was on the whole group: the size label and the space around the name were clickable | The click that selects is on the container only; above the frame, only the name button is clickable (guidelines, Behavior: line clarified) |

## Passes

- Keyboard, focus order, role, name and states as in the guidelines (2.1.1, 4.1.2): `role="group"` named "<name>, <Size> <dimensions>"; native `<button>` with `aria-pressed`; Enter / Space toggle; Escape removes the selection.
- Label in name (2.5.3); no keyboard trap (2.1.2); decorative icons and device bar `aria-hidden`.
- Native states: selected = `[aria-pressed="true"]`, focus = `:focus-visible`.
- Visible focus (2.4.7): 2px `--color-border-focus` around the container, offset `--space-4`, with the focus state layer.
- Focus not obscured by the device bar (2.4.11): the bar is outside the scrolling content.
- Target size (2.5.8): container far above 24×24px; name button by the spacing exception.
- Motion with tokens only; zoom and reflow handled in the code (content scrolls inside the fixed-size screen).

## Browser checks (Claude, 2026-11-21)

- Group name "Home, Mobile 375 × 812"; container sizes 375 × 812, 768 × 1024, 1280 × 800.
- A click on the container selects; a click on the size label does not; a click on the name toggles; Escape (also from a button inside the content) removes the selection; the outline follows `aria-pressed`.
- Tab: name 1 → content 1 → name 2 → content 2 → out of the canvas; Shift+Tab the same way back; no trap.
- Keyboard focus on a selected frame: the selected outline and the focus outline show together, with the focus state layer; not clipped by the example canvas.
- Long name cut with an ellipsis; size label never cut; content scrolls under the device bar.
- At mobile width, the frames scroll inside their canvas; nothing of the Examples tab overflows the page. (The Playground tab overflows on every component page — tab row, playground canvas — a site issue, not Frame.)

## Accepted exceptions

None.

## Still to check later

- A focused frame clear of the Panel: once the Canvas (B142) and the Panel (B144) exist.
- The size label contrast (4.95:1) once the Canvas chooses its background (B142).
- Screen reader pass with VoiceOver, 200% text zoom.
