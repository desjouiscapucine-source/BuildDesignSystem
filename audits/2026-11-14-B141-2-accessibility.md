# Accessibility check — Tag — 2026-11-14

Context: Step B141-2, guidelines stage (tone `brand`; "at most 3 tags side by side" replaced by "no limit, tags wrap") · Branch: component/Tag

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 3 |
| Fail | 0 |
| Not applicable | 3 |

**Blocking: no**

## Passes

| Criterion | Where |
| --------- | ----- |
| Screen reader: label read as plain text, no role; icon decorative (`aria-hidden`). WCAG 4.1.2, 2.5.3. | `components/Tag/guidelines.md` (Accessibility) |
| Contrast (WCAG 1.4.3, 1.4.11): 4.5:1 for labels and 3:1 for icons, covering `brand` (`text.brand` and `icon.brand` on `background.brand-subtle` in `contrast-pairs.json`). | `components/Tag/guidelines.md`, `tokens/contrast-pairs.json` |
| Guidelines consistent with the spec: not interactive, same tones including `brand`; wrapping does not conflict with the one-line ellipsis of a single tag. | `components/Tag/guidelines.md`, `components/Tag/spec.md` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Keyboard, no keyboard trap (WCAG 2.1.2) | Not focusable. |
| Focus order and visible focus (WCAG 2.4.7, 2.4.11) | Never receives focus. |
| Target size (WCAG 2.5.8) | Not interactive. |
