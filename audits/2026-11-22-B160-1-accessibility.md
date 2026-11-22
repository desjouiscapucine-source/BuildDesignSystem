# Accessibility check — CommentMessage — 2026-11-22

Context: Step B160-1, design stage · Branch: component/CommentMessage

Ratios computed from `tokens/primitives.json` and `tokens/semantic.json` (WCAG relative luminance), checked again by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 4 (+2 failures resolved) |
| Fail | 0 (2 found, both resolved) |
| Not applicable | 1 |

**Blocking: no** (after the resolutions below)

## Failures found — and how they were resolved

| # | Criterion | Finding | Resolution |
| - | --------- | ------- | ---------- |
| 1 | AA text contrast (1.4.3) | In hover, `text.secondary` (`label-sm`) on `background.subtle` (`me`) with the 8% `text.primary` state layer: **4.26:1** when the layer is mixed into the background only; **4.62:1** when the layer is painted over the whole message, content included. On a `brand-subtle` bubble (`other`): 4.14:1 / 4.50:1. | Decided by the Design System Lead: the hover state layer is painted over the whole message, content included, as Button and NavigationItem already do (`::after`) → 4.62:1 on `background.subtle`, AA, at the limit. Written in `spec.md` (States). |
| 2 | Pair in `contrast-pairs.json` (1.4.11) | `color.icon.brand` / `color.background.subtle` (`me` variants) missing from `tokens/contrast-pairs.json` (5.50:1). | Pair added (min 3); `npm run tokens`: 70/70 pairs pass. |

## Open points

1. Surface of the Comment bubble (B146): the `other` variant has no background, its contrast depends on the bubble. To check when Comment is designed (hover on `brand-subtle` is at 4.50:1).
2. Content color of the hover layer: `text.primary` (written in the spec).
3. Keyboard access to the hidden "…" button: the preview hides it with `visibility: hidden`; in code, the button must stay in the Tab order and show on focus (2.1.1). **To check at the code stage.**
4. Header height: 36px (the IconButton), decided by the Design System Lead.

## To check in the browser (code stage)

- Tab reaches the "…" button while hidden, and it shows with its focus ring.
- 320px width and 200% text: the header stays usable (date never wraps, name with ellipsis, fixed button).
- Increased text spacing (1.4.12): no fixed height cuts the text.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Text pairs on page, surface, subtle, brand-subtle in the default state (`text.primary` 13.99–15.52; `text.secondary` 4.82–5.49), in `contrast-pairs.json` | `spec.md` Design tokens |
| Target size: "…" IconButton 36×36px ≥ 24×24 (2.5.8); the message itself is not interactive | `spec.md`, `IconButton/spec.md` |
| Visible focus: IconButton focus ring `border.focus`, ≥ 3:1 also over the hover layer (~4.7:1) (2.4.7) | `spec.md` States |
| State layers for interaction states; no disabled state | `spec.md` States |
| Text sizes in rem (1.4.4) | `tokens/semantic.json` |

The separator `border.subtle` is decorative (not a UI component boundary). The Avatar (`text.inverse` / `background.brand`, 6.10:1) is decorative here and checked in B159.

## Not applicable

| Criterion | Why |
| --------- | --- |
| Disabled roles / `opacity.disabled` | No disabled state. |
