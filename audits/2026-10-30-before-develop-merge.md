# Design system compliance audit — 2026-10-30

Context: Before merge into develop (full audit) · Branch: governance/docs-compliance · Commit: 3dc68c8 (+ Agents page aligned)

Full audit of every page, including the new Agents page (B129, from develop). Approved exceptions are not reported again (`docs.css` header comment, IconSelect, full-width Backlog and Prototype pages, spacing inside nested blocks, Select list in scrolling tables, code-font text, text styles applied in CSS).

## Summary

| Group | Count |
| ----- | ----- |
| Compliant | 30 |
| Non-compliant | 6 |
| Not in the design system | 22 |

Since `audits/2026-10-30-B127-2.md`: 0 fixed, 3 new (#42–#44), 3 still open (#5, #9, #10). The Agents page came from develop without the B127 fixes: Claude aligned it before the merge (shared `Header` with `title`; `.card-content` wrapper removed so the card blocks get the Card 16px spacing).

## Non-compliant

| # | Page | Element | Where | Finding | Ticket |
| - | ---- | ------- | ----- | ------- | ------ |
| 5 | Backlog, Design preview | Category filter, variant switch | `BacklogPage.tsx:114-120`; `DesignPreview.tsx:92-99` | Hand-built toggles although Chip exists | B094 |
| 9 | Component pages, Ticket modal, Navigation | Tags, 4 kinds | `ComponentPage.tsx:66`; `TicketDialog.tsx:118`; `NavigationPage.tsx:110`; `StageBadge.tsx:26-33` | Hand-built labels although Tag exists | B118 |
| 10 | Playground | Screen size chips | `PlaygroundTab.tsx:148-154` | Chip outside a ChipGroup, `selected` set by hand | B094 |
| 42 | How to use skills, Agents | Markdown code blocks inside cards | `Markdown.tsx:5`; no `.markdown pre` rule in `docs.css` | Long code lines (up to ~145 characters) overflow the card: no horizontal scroll (WCAG 1.4.10, to check in the browser) | to propose |
| 43 | Playground, Backlog, Design preview | Brand fill as a control state | `docs.css:771` (`.playground-checkbox` accent color), `:561` (pressed toggle) | Pair `background.brand` on `background.page` (3:1) not in `contrast-pairs.json` (it would pass: 6.10:1) | to propose |
| 44 | Landing page, prototypes list | Page margin and block spacing | `docs.css:290` (16px side margin), `:37` (8px title to subtitle), `:338` (24px panel to cards) | `layout` rules (24px margin, 16px between blocks) not applied | to propose |

## Not in the design system

As `audits/2026-10-30-B123-1.md`, plus the disclosures of the Agents cards (2 per card) in the "Disclosure" row.

## Compliant

30 rows, including the new Agents page (Card, shared Header, side navigation entry).

## Proposed tickets

- A — Documentation site: accessibility follow-up (#42, #43). Decisions: Markdown code blocks like `pre.code` or scroll only? `background.brand` or `border.focus` for a checked control fill?
- B — Documentation site: landing page layout (#44). Decision: do the `layout` rules apply to the landing page and the prototypes list, or a site exception?
- Extend B118 (#9); B094 (#5, #10).

Outside the scope, noted: `prototypes/list.tsx` hand-built back link and title without `title`; landing avatar SVG raw hex colors (B088 in progress).
