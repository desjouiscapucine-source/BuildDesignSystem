# Accessibility check — TicketCard (and Tag guidelines) — 2026-11-14

Context: Step B141-5 (tags row gap `--space-4` → `--space-16`) · Branch: component/Tag

| Result | Count |
| ------ | ----- |
| Pass | 3 |
| Fail | 0 |
| Not applicable | 7 |

**Blocking: no**

## Passes

| Criterion | Where |
| --------- | ----- |
| Sizes in tokens only (`var(--space-16)`) | `TicketCard.css:44`, `Tag/examples.tsx` |
| Zoom and reflow (WCAG 1.4.4, 1.4.10, 1.4.12): `flex-wrap: wrap`, no fixed size; checked by Claude at 320px on the Backlog page: 139 tag rows, none overflowing, no horizontal scroll | `TicketCard.css:40-45` |
| Code, spec and design tokens agree (`--space-16`) | `TicketCard.css`, `spec.md`, `design/tokens.json` |

## Not applicable

Keyboard, focus, names, states, icons, target size, motion: no change to markup, behavior or interaction.
