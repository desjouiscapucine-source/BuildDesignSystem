# Accessibility check — Avatar — 2026-11-22

Context: Step B159-3, code stage · Branch: `component/Avatar` · Commit: 9c287f5 (`Avatar.tsx`, `Avatar.css`, `examples.tsx`, `playground.tsx` audited on disk, not committed yet) · Agent: `ds-accessibility-audit`, checked by Claude; browser checks by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 8 |
| Fail | 0 (1 accepted exception) |
| Not applicable | 4 |

Since the previous check (`audits/2026-11-22-B159-2-accessibility.md`): 0 fixed, 1 new (accepted exception), 0 open. The guidelines-stage decision is in the code: decorative by default, named only when shown alone.

**Blocking: no**

## Failures

None open.

## Accepted exceptions

| Criterion | Finding | Decision |
| --------- | ------- | -------- |
| Resize text 200% (WCAG 1.4.4) | The diameters are fixed in px (`--space-24` / `-32` / `-48`, approved spec); with the text zoomed to 200% (root font size doubled, checked in the browser), the initials grow past the circle and are cut by `overflow: hidden`: small 33px of text in 24px, medium 38px in 32px, large 59px in 48px. The icons stay in px and fit. No information is lost: the name is written next to the avatar, or announced (`aria-label`) when it is shown alone. | **Accepted as an exception** by the Design System Lead on 2026-11-22 (approved diameters kept). |

## Browser checks (code stage)

| Check | Result |
| ----- | ------ |
| 200% text zoom | Initials cut off at every size — accepted exception above. |
| 320px wide (Examples) | Pass: no horizontal scroll (page 320px wide); the long name wraps onto 3 lines; the avatar keeps 24px. |
| Increased text spacing (WCAG 1.4.12: letter 0.12em, word 0.16em, line 1.5) | Pass: initials still fit (small 19/24px, medium 22/32px, large 35/48px). |
| Screen reader attributes (Examples and Playground) | Pass: every avatar next to a written name or without a name is `aria-hidden`; "Shown alone" is `role="img"` named "Capucine Desjouis"; the Playground `decorative` control switches between the two. |

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard, role, name, states as in the guidelines (WCAG 2.1.1, 4.1.2): non-focusable `<span>`; decorative by default (`aria-hidden`); `decorative={false}` with a name → `role="img"` + `aria-label` = full name; no name → always `aria-hidden`. | `Avatar.tsx` |
| Icon and initials `aria-hidden`: the ligature text "person" and the initials are never read. | `Avatar.tsx` |
| No keyboard trap (WCAG 2.1.2). | `Avatar.tsx` |
| Motion: no transition or animation. | `Avatar.css` |
| Tokens only; `text.inverse` / `icon.inverse` on `background.brand` (6.10:1) in `contrast-pairs.json`. | `Avatar.css` |
| Examples and Playground: decorative next to a written name, `decorative={false}` only for "Shown alone". | `examples.tsx`, `playground.tsx` |
| Reflow at 320px (WCAG 1.4.10). | Browser |
| Text spacing (WCAG 1.4.12). | Browser |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Label in name (WCAG 2.5.3) | Not interactive; the initials are not a label. |
| Native states | No states (spec). |
| Visible focus (2.4.7), focus not obscured (2.4.11) | Never focused. |
| Target size (2.5.8) | Not interactive; smallest circle 24×24px anyway. |

## Note (not a failure)

`{...rest}` is spread after the aria attributes, so a consumer can override `aria-hidden` / `role` on purpose. Not a checklist criterion.

**Verdict: PASS** (one accepted exception, WCAG 1.4.4).
