# Accessibility check — Tab — 2026-11-19

Context: Tab (B157), design stage (stage 1) · Branch: component/Tabs · Checklist of the `accessibility-check` skill (WCAG 2.2 AA). Checked by Claude.

## Summary

| Result | Count |
| ------ | ----- |
| Pass | 5 |
| Fail | 0 |
| Not applicable | 1 |

**Blocking: no**

## Failures

None.

## Accepted exceptions

None.

## Passes

| Criterion | Where |
| --------- | ----- |
| Contrast, text (1.4.3): default label `color.text.secondary` on `color.background.page` = 5.49:1; selected label `color.text.brand` on `color.background.page` = 6.10:1 (both in `contrast-pairs.json`). | `spec.md`, `design/tokens.json` |
| Contrast, UI (1.4.11): selection indicator and focus ring `color.border.focus` on `color.background.page` = 6.10:1 (min 3:1). `npm run tokens`: 62/62 pairs pass. | `spec.md`, `design/tokens.json` |
| Target size (2.5.8): about 39px tall, width = label + 2 × `--space-16`; above 24×24px. | `spec.md` Sizes |
| Visible focus (2.4.7): `--border-width-2` ring in `color.border.focus` + `state-layer.focus`; the outline offset keeps it apart from the selection indicator. | `spec.md`, `design/Preview.tsx` |
| State layers and disabled roles: hover, focus and pressed use `state-layer.*` in the content color; disabled uses `color.text.disabled` (light background), not `opacity.disabled`. Text in rem (`font-size.14`). | `design/Preview.tsx`, `design/tokens.json` |

## Not applicable

| Criterion | Why |
| --------- | --- |
| Contrast of the disabled label (`color.text.disabled`, 2.22:1) | WCAG 1.4.3 and 1.4.11 do not apply to inactive components. |

## Notes (not failures)

1. Label on the pressed state layer: `text.secondary` 3.97:1, `text.brand` 4.33:1 (hover and focus stay above 4.5:1). Pressed lasts only while clicking, and the state layer values are a shared decision, not specific to Tab. Not covered by the checklist.
2. Focus ring and selection indicator share `color.border.focus`; keep them apart at the code stage (outline offset).
3. Keyboard, roles and names (`role="tab"`, `aria-selected`, arrow keys in Tabs) are checked at the Guidelines and Code stages.
