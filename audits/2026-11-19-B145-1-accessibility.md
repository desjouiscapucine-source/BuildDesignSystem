# Accessibility check — StickyNote — 2026-11-19

Context: Step B145-1, design stage, plus the tokens changed for it (`size.sticky-note`, new pair `color.border.strong` / `color.background.brand-subtle`) · Branch: component/StickyNote · Checked by Claude (ratios recomputed).

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 6 |
| Fail | 0 |
| Not applicable | 3 |

**Blocking: no**

First run: 2 failures, both fixed by decisions of the Design System Lead (2026-11-19):

| # | Criterion | Finding | Fix |
| - | --------- | ------- | --- |
| 1 | Text contrast 4.5:1 (WCAG 1.4.3) | Date `text.secondary` on `background.brand-subtle`: 4.82:1, but 4.14:1 under the hover layer and 3.83:1 under the focus layer | Date in `color.text.primary`: 13.62 / 11.72 / 10.83:1 |
| 2 | UI contrast 3:1 (WCAG 1.4.11) | Selected / editing border `border.strong`: 3.19:1, but 2.75:1 (hover) and 2.54:1 (focus) under the state layer | Selected and editing notes have no state layer; the focus outline still shows |

## Failures

None.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Every text / icon / border pair is in `contrast-pairs.json`; `npm run tokens` passes 63/63 (text, author, date `text.primary` 13.62:1; border `border.strong` 3.19:1; IconButton icon `icon.brand` 5.35:1, 4.26:1 under the note's focus layer; focus `border.focus` on page 6.10:1 and on brand-subtle 5.35:1) | `spec.md`, `tokens/contrast-pairs.json` |
| Targets ≥ 24×24px (WCAG 2.5.8): IconButtons 36×36px, note 160×160px | `spec.md` Sizes |
| Visible focus (WCAG 2.4.7): outline `border-width-2` `border.focus` outside the note, kept on selected and editing notes | `spec.md` States, `design/Preview.tsx` |
| Interaction states use the state layers; selected, editing, dragging are set by tokens (border, shadow) | `spec.md` States |
| Text sizes in rem (`body` 0.875rem, `label-sm` / `body-sm` 0.75rem) | `spec.md` Design tokens |
| New semantic color pair added to `contrast-pairs.json` | `tokens/contrast-pairs.json` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Disabled roles / `opacity.disabled` | No disabled state |
| Durations with reduced motion | No motion token added; no animation in the spec |
| Font sizes in rem (tokens) | No font-size token added; `size.sticky-note` is a box size |

## To check at the code stage

- 200% zoom and text spacing (WCAG 1.4.4, 1.4.12) on the fixed 160×160 note.
- Keyboard: the editing state (editable text) can be left with the keyboard, no keyboard trap.
