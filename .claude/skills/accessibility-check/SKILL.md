---
name: accessibility-check
description: WCAG 2.2 AA accessibility check of a component (spec, guidelines, code) or of design tokens — the checklist of each stage, the ds-accessibility-audit agent that runs it, and the blocking rule (a failure blocks the approval unless the Design System Lead accepts it as an exception). Use before asking the Design System Lead to approve a component stage (design, guidelines, code), before approving a token created or changed, and whenever the Design System Lead asks for an accessibility check.
---

# Accessibility check

Decided by the Design System Lead on 2026-11-04 (B039). Target: **WCAG 2.2 AA** (`CLAUDE.md`).

| Item | Rule |
| ---- | ---- |
| **Scope** | **Components** (spec and design preview, guidelines, code) and **design tokens**. Not the documentation site (`ds-compliance-audit`) nor the prototypes. |
| **When** | Before asking the approval of **every component stage** (design, guidelines, code — the code check is also the check before `complete`), before approving a **token created or changed**, and **on request** of the Design System Lead. |
| **Who** | The **`ds-accessibility-audit`** agent (`.claude/agents/ds-accessibility-audit.md`), read-only. Claude checks its result before showing it (`CLAUDE.md`, Agents). |
| **Result** | **Blocking**: one failure → Claude does not ask for the approval; the failure is fixed first, then the check runs again. |
| **Exception** | Only the Design System Lead can accept a failure, explicitly, in the chat. The exception is written in the report and in the `STEPS.md` entry of the step. |

## How to run it

1. Before the approval gate (`component`, section 3) or the approval of a token: if tokens or contrast pairs changed, run `npm run tokens` (it fails on a pair below AA) and keep its output.
2. Run the `ds-accessibility-audit` agent with: the component (or the tokens changed), the stage, the branch, the `npm run tokens` output, and the previous accessibility report of the component if any.
3. **Check its result**: every failure has a `file:line` and a criterion; drop anything that is not a failure against the checklist below. Never add a rule of your own (`never-invent`).
4. **Code stage**: complete what the agent cannot see, in the browser pane on the component page: keyboard pass (Tab, Shift+Tab, Enter / Space, arrows, Escape), visible focus never hidden, width 320px (reflow), text zoom 200%.
5. Write the checked report to `audits/<YYYY-MM-DD>-<ticket>-<n>-accessibility.md` and show the summary and **every failure** in the chat.
6. Failures → fix them (design decisions are asked first: `never-invent`), then run the check again. No failure, or every failure accepted as an exception → ask for the approval. The report is committed with the step.

## Checklist

Every rule comes from an approved decision; the source is in brackets.

### Design (spec and design preview)

- Every text / icon / border pair on its background is in `tokens/contrast-pairs.json` and `npm run tokens` passes: 4.5:1 for text, 3:1 for UI elements and large text (WCAG 1.4.3, 1.4.11) [`CLAUDE.md`].
- Interactive targets are at least 24×24px (WCAG 2.5.8) [`component-spec`].
- Focus is visible: `border.focus`, or `border.focus-inverse` on a brand or dark background (WCAG 2.4.7) [`CLAUDE.md`, `component-spec`].
- Interaction states use the state layers; disabled uses the disabled roles, `opacity.disabled` only on a colored background [`CLAUDE.md`, `component-spec`].
- Text sizes in rem (the `font-size` tokens), so the text can be zoomed to 200% (WCAG 1.4.4) [`CLAUDE.md`].

### Guidelines

The Accessibility section gives [`component-guidelines`, section 4]:
- the keyboard behavior: keys and result; how to leave the component (no keyboard trap, WCAG 2.1.2) [B039];
- the focus order and the visible focus; the focused element is never hidden by a sticky element or a panel (WCAG 2.4.11) [B039];
- what a screen reader announces: role, name, state (WCAG 4.1.2); the accessible name contains the visible label (WCAG 2.5.3) [B039];
- the contrast pairs (already checked at the design stage);
- the minimum target size (24×24px).

### Code

- Keyboard, focus order, role, accessible name and states exactly as in the guidelines (WCAG 2.1.1, 4.1.2) [`component-code`].
- The accessible name contains the visible label (WCAG 2.5.3) [B039].
- No keyboard trap: Tab / Shift+Tab (and Escape for an overlay) always leave the component (WCAG 2.1.2) [B039].
- Icon-only controls have an `aria-label`; decorative icons have `aria-hidden="true"` [`component-code`].
- Native states (`:disabled`, `[aria-selected]`, `[aria-current]`, `[aria-invalid]`…), not classes [`component-code`].
- Visible focus on `:focus-visible` with `--color-border-focus` (or the variant of the spec) (WCAG 2.4.7) [`component-code`].
- Focus not obscured: a focused element is never hidden by a sticky element or a panel (WCAG 2.4.11) [B039].
- Interactive targets at least 24×24px (WCAG 2.5.8) [`component-code`].
- Motion only with `--duration-*` and `--easing-*` (reduced motion is then automatic) [`CLAUDE.md`].
- Zoom and reflow: usable with text zoomed to 200%, at 320px wide without horizontal scroll (except content that needs two dimensions), and with increased text spacing (no fixed heights that cut text) (WCAG 1.4.4, 1.4.10, 1.4.12) [B039].

### Tokens

- Every new semantic color pair (text, icon or border on a background) is in `tokens/contrast-pairs.json` and `npm run tokens` passes [`CLAUDE.md`].
- Durations are `duration.*` tokens, set to 0.01ms with `prefers-reduced-motion` (WCAG 2.3.3) [`CLAUDE.md`].
- `opacity.disabled` is used only on a colored background [`CLAUDE.md`].
- Font sizes in rem [`CLAUDE.md`].

## Not decided yet — ask before checking

- Accessibility check of the prototypes and of the documentation site (outside this skill; the site has `ds-compliance-audit`).
- A criterion not in the checklist above: ask the Design System Lead before adding it.
