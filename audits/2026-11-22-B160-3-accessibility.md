# Accessibility check — CommentMessage — 2026-11-22 (code stage)

Context: Step B160-3, code stage · Branch: component/CommentMessage · Previous report: `audits/2026-11-22-B160-2-accessibility.md`

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 11 |
| Fail | 0 (1 found, fixed) |
| Not applicable | 3 |

**Blocking: no**

## Failure found — and how it was resolved

| # | Criterion | Finding | Resolution |
| - | --------- | ------- | ---------- |
| 1 | Reflow (1.4.10), resize text (1.4.4) | Header on one line: at 320px with text at 200%, the name collapsed to 0 and the "…" button left the message (measured in the browser). | Decided by the Design System Lead: when the name and the date do not fit side by side, the date goes under the name; it wraps onto several lines only if the message is too narrow even for the date alone. Spec, guidelines and design preview updated. Measured again at 400px, 320px (272px message) and 240px, default text and 200%: the button is always inside the message, nothing overflows. |

## Accepted exceptions

- Same accessible name "Open message actions" on every message (Design System Lead, B160-2, 2026-11-22).

## Checked in the browser

- Tab reaches the "…" button while it is hidden (opacity 0); it appears with its 2px focus ring.
- Headers are 36px high on `me` and `other`; `other` has no button; the Avatar is `aria-hidden`; "(you)" is a visually hidden span after the name; the date is a `<time dateTime>`.
- WCAG 1.4.12 text spacing applied to the 8 examples: no clipped text, no overflow.
- No console error; no horizontal overflow of the page.

## Passes

| Criterion | Where |
| --------- | ----- |
| Role and name of the "…" button (native button, `aria-label`), keyboard, no trap | `CommentMessage.tsx` |
| Hidden button stays in the Tab order (opacity only); shown on hover, focus and touch screens | `CommentMessage.css` |
| Visible focus and target size 36×36px (IconButton) | `IconButton` |
| Contrast pairs (text.primary, text.secondary, hover 4.62:1) | `contrast-pairs.json`, spec |
| Reflow, text spacing, text sizes in rem | `CommentMessage.css` |
| Reading order, `<time>`, plain text paragraph | `CommentMessage.tsx` |
| Reduced motion: motion tokens only | `CommentMessage.css` |
| Spec and guidelines match the code | `spec.md`, `guidelines.md` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Native states (`:disabled`, `aria-*`) | No disabled, selected or invalid state. |
| Focus not obscured by sticky / fixed elements | None in the component; the bubble scroll is checked in Comment (B146). |
| Contrast pairs, `npm run tokens` | Design-stage criterion; the code adds no new color. |

## Open points

- The Menu opened by the "…" button, with its focus and Escape behavior: B167.
- Focus ring of the button inside the scrolling bubble of the Comment: to check in Comment (B146).
