# Accessibility check — Tab — 2026-11-19

Context: Step B157-3, code stage (stage 3) · Branch: component/Tabs · Checklist of the `accessibility-check` skill (WCAG 2.2 AA). Checked by Claude, browser checks done by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 9 |
| Fail | 0 |
| Not applicable | 1 |

Since `audits/2026-11-19-B157-2-accessibility.md`: 0 fixed, 0 new, 0 still open. **Blocking: no**

## Failures

None.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Role, name and state (4.1.2): `<button type="button" role="tab" aria-selected>`, named by its text; disabled = native `disabled` (not focusable). | `Tab.tsx` |
| Keyboard at the Tab level (2.1.1): roving `tabIndex` (0 when selected, -1 otherwise, can be set by Tabs); arrows, Home / End and `id` / `aria-controls` belong to Tabs (B093). | `Tab.tsx` |
| Accessible name contains the visible label (2.5.3). | `Tab.tsx` |
| No keyboard trap (2.1.2): native button, no key handler. | `Tab.tsx` |
| Native states, not classes: `:disabled`, `aria-selected` (paired with `.ds-tab--selected`). | `Tab.css`, `Tab.tsx` |
| Visible focus (2.4.7): `:focus-visible` outline `--border-width-2` `--color-border-focus`, offset `--border-width-2`, plus `--state-layer-focus`. | `Tab.css` |
| Target size (2.5.8): 39px tall (measured), same height when selected. | `Tab.css` |
| Motion: `--duration-100`, `--easing-ease-out` (reduced motion automatic). | `Tab.css` |
| Zoom and reflow (1.4.4, 1.4.10, 1.4.12): no fixed width or height; sizes and line height in tokens. | `Tab.css` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Focus not obscured (2.4.11) inside the component | Tab has no sticky, fixed or overlay part. Checked in the page: the focused tab is not covered. To check again in Tabs. |

## Browser checks (done)

- Keyboard on the Examples tab: Tab reaches each reachable tab in order; the disabled tabs are skipped; the focus ring shows on `:focus-visible` only, 2px `--color-border-focus` with a 2px offset, distinct from the selection line, not clipped by the example frame.
- No horizontal page scroll at the pane width. The "Long label" example is 405px wide on one line (approved: the tab grows; lack of space is handled by Tabs), so it can be wider than a 375px screen.
- Screen reader announcement (VoiceOver) not tested: to check in a manual test.

## Fixes made after the first run (no failure, robustness notes)

- `{...rest}` is spread first in `Tab.tsx`, so `role`, `aria-selected`, `type` and `disabled` cannot be overridden.
- Examples and Playground: a tab shown alone and not selected gets `tabIndex={0}`, so it stays reachable with the keyboard until Tabs adds the arrow keys.

## Notes (not failures)

1. Label on the pressed state layer: `text.brand` 4.34:1, `text.secondary` 3.97:1, only while pressing (shared state layer value, 0.24). Hover and focus stay at or above 4.69:1.
2. Selected + disabled is forbidden by the types; Tabs (B093) should also enforce it at runtime.
3. For Tabs (B093): the tab list must not clip the focus ring offset (e.g. with an `overflow` for horizontal scroll); add `id` / `aria-controls`, the arrow / Home / End keys, and make the panel reachable.
