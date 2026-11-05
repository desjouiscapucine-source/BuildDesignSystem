# Accessibility check — Link — 2026-11-04

Context: Step B018-2, design stage (checked again: approved in B018-1 before the `accessibility-check` checklist existed) and guidelines stage, plus Tokens · Branch: component/Link · Commit: 389c987 (+ uncommitted changes of the step)

Tokens note: the 3 Link tokens are already on `develop` (Step B018-1), so they are checked as they are in `tokens/semantic.json` and `tokens/contrast-pairs.json`.

## Summary

| Result | Design | Guidelines | Tokens | Total |
| ------ | ------ | ---------- | ------ | ----- |
| Pass | 3 | 7 | 1 | 11 |
| Fail | 0 | 0 | 0 | 0 |
| Not applicable | 1 | 0 | 3 | 4 |
| Accepted exception | 2 | 0 | 0 | 2 |

First run of the day: 7 failures (D1, D2, D3, G1–G4). After the Design System Lead's decisions: 5 fixed (D1, G1, G2, G3, G4), 2 accepted as exceptions (D2, D3), 0 new, 0 still open.

**Blocking: no.**

## First run — failures and how they were resolved

| # | Criterion | Finding | Resolution |
| - | --------- | ------- | ---------- |
| D1 | WCAG 2.5.8 | The spec did not cover a standalone link (body line 21px < 24px) | Decided: spacing exception — a standalone link keeps at least 24px from the next target (`spec.md` Sizes, `guidelines.md`) |
| D2 | State layers (checklist) | Hover and pressed change color, no state layer | **Accepted exception** |
| D3 | Focus visible with `border.focus` (WCAG 2.4.7) | Focus = underline `border-width.1` → `border-width.2`, no outline | **Accepted exception** |
| G1 | WCAG 2.1.2 | How to leave the link not stated | Added: Tab / Shift+Tab, no keyboard trap |
| G2 | WCAG 2.4.11 | Focus order and focus not obscured not stated; anchor target could be under the sticky header | Decided: scroll offset below the sticky header; focus order = document order |
| G3 | WCAG 2.5.3 | "Never an aria-label that contradicts" weaker than the criterion | Added: the accessible name is, or contains, the visible label |
| G4 | WCAG 2.5.8 | Same gap as D1 in the guidelines | Aligned with D1 |

## Design stage — passes

| Criterion | Where |
| --------- | ----- |
| Contrast (WCAG 1.4.3, 1.4.11): `text.link`, `-hover`, `-pressed`, `-visited` on `background.page`, `surface`, `brand-subtle` — 12 pairs in `contrast-pairs.json`, 61/61 pass; underline uses the text color | `design/tokens.json`, `spec.md` |
| Target size (WCAG 2.5.8): inline exception in a sentence, spacing exception alone | `spec.md` Sizes |
| Text sizes in rem (WCAG 1.4.4): inherited from the surrounding text style | `spec.md`, `design/Preview.tsx` |

Not applicable: disabled roles / `opacity.disabled` — no disabled state (decision confirmed by the Design System Lead).

## Guidelines stage — passes

| Criterion | Where |
| --------- | ----- |
| Keyboard keys and results (Tab, Enter not Space, `<a href>`) | Accessibility › Keyboard |
| No keyboard trap (WCAG 2.1.2) | Accessibility › Keyboard |
| Focus order, visible focus, never hidden (WCAG 2.4.7, 2.4.11) | Accessibility › Focus; Behavior (anchor offset) |
| Screen reader: role, name, visited (WCAG 4.1.2) | Accessibility › Screen reader |
| Accessible name contains the visible label (WCAG 2.5.3) | Accessibility › Screen reader |
| Contrast pairs; never color only (WCAG 1.4.1) | Accessibility › Contrast |
| Target size (WCAG 2.5.8) | Accessibility › Touch target; Usage best practices |

## Tokens — passes

| Criterion | Where |
| --------- | ----- |
| Every new pair in `contrast-pairs.json`, `npm run tokens` passes (61/61) | `tokens/semantic.json`, `tokens/contrast-pairs.json` |

Not applicable: durations, `opacity.disabled`, font sizes (none added or changed).

## To check in the browser (code stage)

- Keyboard pass: the focus (underline 1px → 2px) is visible enough.
- Anchor links: the target stops below the sticky header.
- Standalone links: at least 24px from the next target.

## Accepted exceptions

Accepted by the Design System Lead in the chat on 2026-11-04:
- **D2 — hover and pressed change color, no state layer** (`text.link-hover` primary-700, `text.link-pressed` primary-800). Documented in the `token-naming` skill. No WCAG impact: 4.5:1 everywhere.
- **D3 — focus has no outline and no `border.focus`**: the underline goes from `border-width.1` to `border-width.2`. Meets the minimum of WCAG 2.4.7; discreet, to check in a keyboard user test.
