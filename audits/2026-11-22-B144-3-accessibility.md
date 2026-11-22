# Accessibility check — Panel — 2026-11-22

Context: Step B144-3, code stage · Branch: component/Panel · Checked by Claude (agent report + browser checks).

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 9 |
| Fail | 1 → fixed |
| Not applicable | 4 |

Since `audits/2026-11-21-B144-2-accessibility.md`: 1 new failure, fixed in this step. Closed warnings: Tabs is complete (keyboard model, names and states in use); the tab content scrolls in its own container below the header.

**Blocking: no**

## Failures (fixed)

| # | Criterion | Finding | Fix (decided by the Design System Lead) |
| - | --------- | ------- | --------------------------------------- |
| 1 | Keyboard and focus order as in the guidelines (WCAG 2.1.1, 4.1.2) | Tabs renders the tab list and the focusable tab panel together, so the collapse button came after the whole tab content. | Collapse button placed before the tabs in the DOM; order **handle → collapse button → tabs → content**; `guidelines.md` updated. |

## Checked in the browser (desktop 1024px and Playground mobile 375px)

- Tab pass: handle → "Collapse the panel" → selected tab → tab panel → leaves the Panel (no trap); Shift+Tab from the tab reaches the collapse button, then the handle.
- Handle: ← widens and → narrows by 8px; stops at 280px and 480px; `aria-valuenow` follows; double-click resets to `size.panel` (400px).
- Escape on desktop does nothing.
- Collapse → focus on the strip icon of the current tab; Enter on a strip icon → panel expanded on that tab, focus on the selected tab.
- Below desktop (375px iframe): no handle; Escape collapses and focuses the strip icon; a pointerdown outside collapses the panel.
- Focus ring of the tab content drawn inside, visible on the panel background.
- Handle in front of the content with no z-index (hit test).

## Still to check later

- Below desktop, Tab / Shift+Tab from the expanded Panel to the canvas (focusin path, same logic as pointerdown; not reproducible in the unfocused Playground iframe).
- Reduced motion, 200% text zoom, increased text spacing, 320px reflow (`max-width: 100%`).
- With Canvas (B142): a canvas element focused behind the Panel or the collapsed strip is brought into view (WCAG 2.4.11).

## Passes

| Criterion | Where |
| --------- | ----- |
| Roles, names, states: `<aside>` "Playground panel"; separator "Resize the panel" with value / min / max; `aria-expanded` + `aria-controls`; content kept in the page while hidden | `Panel.tsx` |
| Accessible name contains the visible label (tabs from Tabs) | `Panel.tsx` |
| No keyboard trap; Escape below desktop only; collapse below desktop when the focus or a click leaves | `Panel.tsx` |
| Icon-only controls named; handle icon `aria-hidden` | `Panel.tsx` |
| Native states (`:hover`, `:focus-visible`, `:active`, ARIA) | `Panel.css` |
| Visible focus `--color-border-focus`, `--border-width-2` | `Panel.css` |
| Focus not obscured inside the Panel | `Panel.css` |
| Targets ≥ 24×24px (handle 24px, IconButtons 36px) | `Panel.css` |
| Motion with `--duration-*` / `--easing-*`, none while dragging | `Panel.css` |

## Not applicable

Token checks: only `size.panel` changed (320px → 400px, a size); no color pair, duration, opacity or font size changed.

## Accepted exceptions

None.
