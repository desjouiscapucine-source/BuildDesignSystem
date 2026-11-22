# Accessibility check — Avatar — 2026-11-22

Context: Step B159-1, design stage · Branch: `component/Avatar` · Commit: f78070b (Avatar files audited on disk, not committed yet) · Agent: `ds-accessibility-audit`, checked by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 2 |
| Fail | 0 |
| Not applicable | 3 |

No previous check for B159.

**Blocking: no**

## Failures

None.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Contrast pairs in `contrast-pairs.json` (WCAG 1.4.3, 1.4.11): initials `color.text.inverse` on `color.background.brand` (min 4.5) and icon `color.icon.inverse` on `color.background.brand` (min 3) — both 6.10:1. No border. `npm run tokens`: 68/68 pairs pass WCAG 2.2 AA. Avatar adds no token and no pair. | `spec.md`, `design/tokens.json`, `tokens/contrast-pairs.json` |
| Text sizes in rem (WCAG 1.4.4): initials `label-sm` (0.75rem), `label` (0.875rem), `heading-5` (1.25rem). | `spec.md` Sizes, `design/tokens.json`, `design/Preview.tsx` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Target size 24×24px (WCAG 2.5.8) | Not interactive (a parent handles any click). Smallest diameter is `space.24` anyway. |
| Visible focus (WCAG 2.4.7) | Not interactive, never focused. |
| State layers and disabled roles | Default state only. |

## Notes (not failures)

- Screen reader: with a name, `role="img"` + `aria-label` = full name, initials hidden; without a name, the icon avatar is `aria-hidden` (decorative). Matches the spec; checked again at the guidelines and code stages.
- `gap: "12px"` in the preview wrapper: demo frame, covered by the token audit (not a failure).

**Verdict: PASS** — nothing blocks the approval of the design stage.
