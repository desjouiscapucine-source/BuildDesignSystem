# Accessibility check — Link — 2026-11-05

Context: Step B018-3, code stage · Branch: component/Link · Commit: 902c3da (+ uncommitted changes of the step: `Link.tsx`, `Link.css`, `examples.tsx`, `playground.tsx`, `components/index.ts`)

Tokens: no token change in this step (last `npm run tokens`: 61/61 pairs pass WCAG 2.2 AA).

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 8 |
| Fail | 0 |
| Not applicable | 2 |

Since the previous check (`audits/2026-11-04-B018-2-accessibility.md`): 0 fixed, 0 new, 0 still open. D2 and D3 stay accepted exceptions; the code matches them.

**Blocking: no**

## Failures

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard, role, states (WCAG 2.1.1, 4.1.2): native `<a>`, `href` required in the type, Enter (not Space) from the native element | `Link.tsx` |
| Accessible name contains the visible label (WCAG 2.5.3): name from `children`, no `aria-label` added | `Link.tsx` |
| No keyboard trap (WCAG 2.1.2): no key handler, no `tabIndex` | `Link.tsx` |
| Native states, not classes: `:visited`, `:hover`, `:focus-visible`, `:active` (visited → hover → focus → pressed) | `Link.css` |
| Visible focus on `:focus-visible` (WCAG 2.4.7): the spec variant, accepted exception D3 | `Link.css` |
| Focus not obscured (WCAG 2.4.11): no sticky / fixed / overlay / z-index in the component | `Link.css` |
| Target size (WCAG 2.5.8): inline exception in a sentence; spacing exception for the standalone example | `examples.tsx`, `spec.md` |
| Zoom and reflow (WCAG 1.4.4, 1.4.10, 1.4.12): `font: inherit`, no fixed size, no overflow; tokens only | `Link.css`, `examples.tsx` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Icon `aria-label` / `aria-hidden` | Text only, no icon. |
| Motion tokens | No transition or animation. |

## Browser checks (Claude, Examples and Playground tabs)

| Check | Result |
| ----- | ------ |
| Tab reaches the link; `:focus-visible` = 2px underline, no outline | Pass |
| Enter activates the link (click handler fires) | Pass |
| Space does not activate it | Pass |
| Shift+Tab leaves the link (no keyboard trap) | Pass |
| Hover = `text.link-hover` (primary-700) | Pass |
| Playground: real `<a class="ds-link">`, JSX code updated | Pass |
| Reflow at 320px: no horizontal scroll, no example overflows | Pass |
| Text zoom 200% (1024px wide): link grows with the text (28px for body), no example overflows | Pass |
| Text spacing (WCAG 1.4.12 values): no link text cut or overflowing | Pass |
| Standalone link: nearest other target 173px away (≥ 24px) | Pass |
| No console error | Pass |
| `:visited` color | Not readable by script (browser privacy); shown visually in the "Visited" example |
| Anchor target below the sticky header (WCAG 2.4.11) | Not testable in the component: the offset belongs to the page holding the target (`scroll-margin-top`); to check where the Link is first used for an anchor |

## Accepted exceptions

Accepted by the Design System Lead on 2026-11-04 (`audits/2026-11-04-B018-2-accessibility.md`):
- **D2** — hover and pressed change color, no state layer (`Link.css`).
- **D3** — focus has no outline and no `border.focus`; underline `border-width.1` → `border-width.2` (`Link.css`).
