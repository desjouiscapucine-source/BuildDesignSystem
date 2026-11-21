# Accessibility check — Panel — 2026-11-21

Context: Step B144-2, guidelines stage · Branch: component/Panel · Checked by Claude (three runs; final result below).

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 7 |
| Fail | 0 (3 found during the stage, all fixed) |
| Not applicable | 1 |

**Blocking: no**

## Failures found and fixed during the stage

| # | Criterion | Finding | Fix (decided by the Design System Lead) |
| - | --------- | ------- | --------------------------------------- |
| 1 | No keyboard trap (WCAG 2.1.2) | How the focus leaves the Panel was not written. | `Tab` / `Shift+Tab` leave the Panel (expanded, collapsed, below desktop); below desktop, `Escape` collapses it and moves the focus to the icon of the current tab. |
| 2 | Focus not hidden (WCAG 2.4.11), desktop | A focused canvas element could sit behind the Panel. | The canvas brings a focused element into the visible area on the left of the Panel (rule to apply in Canvas, B142). |
| 3 | Focus not hidden (WCAG 2.4.11), below desktop | At 320px the expanded Panel covers the whole viewport. | Below desktop, the Panel collapses when the focus or a click leaves it for the canvas; the focus stays on the canvas element. |

Warnings fixed during the stage: focus order (handle → tabs → collapse button → content, the handle on desktop only); `aria-expanded` on the collapse button (`true`) and the strip icons (`false`) with `aria-controls`, content kept in the page while collapsed; arrow step `space.8`; handle visible on desktop only (spec aligned); tooltip removed from the spec; the part using each icon color named in the contrast line; focus after an automatic collapse.

## Warnings

- Code stage: 2.4.11 on desktop and for the collapsed strip depends on Canvas (B142); to check in the browser at the Panel and Canvas code stages, with reflow at 320px and text zoom at 200%.
- The tab content is its own scroll container below the fixed header, so the header never covers a focused element.
- Tabs (B093): keyboard model, announcements, focus and states checked once Tabs is built.

## Passes

| Criterion | Where |
| --------- | ----- |
| Keyboard behavior, keys and result (incl. `Escape` below desktop, arrows by `space.8`) | `guidelines.md` Accessibility; `spec.md` States |
| How to leave the component, no keyboard trap (WCAG 2.1.2) | `guidelines.md` |
| Focus order, focus moves on collapse / expand, visible focus (WCAG 2.4.7) | `guidelines.md`, `spec.md` |
| Focus never hidden (WCAG 2.4.11) | `guidelines.md` Behavior and Focus |
| Screen reader role, name, state (WCAG 4.1.2) | `guidelines.md` |
| Contrast pairs (design stage) | `tokens/contrast-pairs.json` |
| Target size 24×24px (WCAG 2.5.8) | `guidelines.md`, `spec.md` |

## Not applicable

- Accessible name contains the visible label (WCAG 2.5.3): the Panel's controls have no visible text; the tab labels belong to Tabs.

## Accepted exceptions

None.
