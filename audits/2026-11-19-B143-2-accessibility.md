# Accessibility check — Frame — 2026-11-19

Context: Step B143-2, guidelines stage · Branch: component/Frame · Agent: `ds-accessibility-audit` (three runs, results checked by Claude; the last failure was a wording fix, applied by Claude as the agent suggested, with no re-run) · Previous report: `audits/2026-11-19-B143-1-accessibility.md`

## Summary

| Run | Pass | Fail | Blocking |
| --- | ---- | ---- | -------- |
| 1 | 6 | 4 | yes |
| 2 (after the fixes) | 8 | 1 (new) | yes |
| 3 (after the target size decision) | 9 | 1 (new: wording) | yes |
| Final (wording fixed by Claude, no decision needed) | 10 | 0 | **no** |

## Failures and fixes

| # | Criterion | Finding | Fix |
| - | --------- | ------- | --- |
| 1 | No keyboard trap, how to leave (WCAG 2.1.2) | Where the focus goes after the content of a frame was not said | Decision of the Design System Lead: Tab goes to the next frame of the canvas, then leaves the canvas after the last frame; Shift+Tab backwards |
| 2 | Focus not obscured (WCAG 2.4.11) | Focused content could sit under the device bar; a focused frame under the Panel (B144) | Decision: focused content scrolls into view below the device bar; a focused frame scrolls into view on the canvas, never under the Panel |
| 3 | Name, role, value (WCAG 4.1.2) | "Selected" announced on a group (`aria-selected` is not allowed on `group`) | Decision: the frame stays a named group; its name is a toggle button (pressed / not pressed) that exposes the selection. One-line anatomy update in `spec.md` |
| 4 | Contrast pairs listed (1.4.3, 1.4.11) | Address text and hover border missing from the list | Added (values already approved at the design stage) |
| 5 | Target size (WCAG 2.5.8) | The name button is about 21px high (`label`, 14px × 1.5) | Decision: WCAG 2.5.8 spacing exception — no other target within 24px of its center (the frame is `space.8` below, the size label is not interactive); the guidelines forbid placing another control next to the name |
| 6 | Target size wording (WCAG 2.5.8) | The rule said "within 24px of its center" (a 24px radius) instead of a 24px-diameter circle | Wording fixed: "a 24px-diameter circle centered on it (12px around its center) touches no other target". Check: the circle goes 1.5px below the 21px button; the frame is 8px below, so 6.5px clear |

## Passes

- Keyboard keys and result: Tab, Enter / Space (toggle the selection), Escape (remove the selection).
- Focus order: name button, content, next frame; no keyboard trap.
- Visible focus (2.4.7): 2px `border.focus` around the frame, offset `space.4`, focus state layer; both outlines when also selected.
- Focus not obscured (2.4.11).
- Screen reader (4.1.2): named group "Home, Mobile 375 × 812"; toggle button for the selection; empty message read; device bar decorative.
- Label in name (2.5.3).
- Contrast pairs listed, all in `tokens/contrast-pairs.json`.
- Target size (2.5.8): frame far above 24×24px; name button by the spacing exception.
- Guidelines agree with `spec.md`.

## Accepted exceptions

None (the spacing exception is a WCAG 2.5.8 rule, not a project exception).

## To check at the code stage

- Keyboard pass (name button → content → next frame → out of the canvas; Shift+Tab back; `aria-pressed` follows; Escape).
- The focus is on the name button but the outline is drawn around the frame; with the selected outline at the same time.
- Focused content scrolled below the device bar; focused frame clear of the Panel.
- Space around the name button (24px circle free of other targets).
- Once the Canvas (B142) chooses its background: label and outline contrast (size label 4.95:1, small margin).
