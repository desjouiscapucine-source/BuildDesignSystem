# BuildDesignSystem — Project Context

## Language
- Everything in this project is written in **English**: code, comments, documentation, token names, component names, and commit messages.

## Steps log
- `STEPS.md` documents every step taken in this project.
- After completing any step, append a new numbered entry to `STEPS.md` with: date, what was done (and why), and the files created or changed.

## Backlog
- The tasks still to do live in **`backlog/backlog.json`**, shown and edited on the **Backlog** page of the documentation site (`/docs/#/backlog`).
- `origin`: `decided` (from the Design System Lead) or `proposal` (from Claude). `status`: `proposal` → `todo` → `in-progress` → `done` (or `rejected`).
- Only the Design System Lead approves or rejects a proposal (on the Backlog page, or in the chat). **Never start a task whose status is `proposal`.**
- Read `backlog/backlog.json` at the start of a session; update an item's status (and `stage` for components) as work progresses, and add new ideas as `proposal`.

## Owner
- The project is led by the Design System Lead, who owns design decisions.

## Never invent — always ask
- **Never invent a design system decision** (token values or names, palettes, typography, spacing, component anatomy/variants/states, guidelines, naming). Always ask the Design System Lead first, and wait for an explicit answer.
- Derived values (a palette scale from a base color, a type scale…) are decisions too: ask first.
- Proposals may be shown, but are written into `tokens/`, `components/` or `prototypes/` only once approved.
- Full rule: `.claude/skills/never-invent/SKILL.md`.

## Token naming
- Every token name follows `.claude/skills/token-naming/SKILL.md`. If a needed naming pattern is not there, ask before naming.

## Goal
Build a design system **without Figma**: design, code and prototypes all live in this repository.

## Workflow
Every component goes through three stages, in order:

1. **Design** — define the component from a design point of view: purpose, anatomy, variants, sizes, states, design tokens used. Produce a written spec and a visual preview for review.
2. **Guidelines** — write the usage guidelines for the component (see below).
3. **Code** — build the developed version of the component from the approved design spec, using the shared design tokens.

A component is **complete** once its code is approved. Interactive mockups (prototypes) are made separately, as user journeys built with the coded components.

A component moves to the next stage only after the Design System Lead approves the current one.
**Always start with the design**, built from the information the Design System Lead gives; usage questions (when to use, contexts) come after, in the guidelines stage.
**Templates and pages** (Atomic Design levels) skip the Guidelines stage: Design → Code.
**Prototypes** are user journeys built with the components; templates and pages are independent layout references.
Guidelines are updated whenever coding or prototyping reveals a new rule or edge case.

## Layout
- Page margin **24px** (`--space-24`) and vertical spacing between blocks **16px** (`--space-16`) on the whole documentation site — see the `layout` skill.

## Page header
- Page title `heading-1` (30 characters max) and subtitle `lead` (80 characters max), **one line each**, cut with an ellipsis as a safety net — see the `page-header` skill. Component descriptions in `meta.json` follow the subtitle rule.

## Page content
- A page combining a Timeline and Cards follows the `page-content` skill: one card per step (same order, same title, anchor link), timeline on the right 16px from the cards, timeline fixed while scrolling, selected step following the card at the top of the screen.

## Component skill
- Every component task starts with the **`component`** skill (`.claude/skills/component/SKILL.md`), which routes to the sub-skill of the current stage and enforces the approval gate.

## Component guidelines
Every component has a dedicated guidelines document, separate from its design spec. The spec says **what** the component is; the guidelines say **how and when** to use it. Each guidelines document covers:
- **When to use / when not to use** — and which component to use instead.
- **Usage best practices** — placement, layout, combination with other components.
- **Do's and don'ts** — with visual examples.
- **Content guidelines** — labels, wording, tone, length, capitalization.
- **Behavior** — interactions, responsive behavior, edge cases (long text, empty, loading, error).
- **Accessibility** — keyboard, focus, screen reader, contrast, touch target size.
- **Related components.**

Guidelines appear on the component's page in the local documentation site.

## Scope
- Foundations / design tokens (color, typography, spacing, radius, elevation, motion…)
- Components (design spec + code)
- Interactive mockups built from the coded components
<!-- TODO: target products and audience -->

## Tech stack
- **Everything runs locally** for now: no hosted services, no deployment.
- **Components:** React + TypeScript.
- **Design tokens:** a single JSON file as the source of truth, compiled to CSS custom properties.
- **Documentation / showcase:** a local documentation site built in-house (no Storybook). Each component gets a page with its design spec, variants and states.
- **Interactive mockups:** a Vite app that imports the coded components directly.
- **Tooling:** Vite, npm (Node 24).

## Project structure
```
tokens/
  primitives.json      Primitive tokens: raw values (W3C Design Tokens format: $value, $type, $description)
  semantic.json        Semantic tokens: roles, referencing primitives with {group.name}
  contrast-pairs.json  Color pairs checked against WCAG 2.2 AA
  fonts.css            Loads the approved Google Fonts (text fonts + Material Symbols)
  icons.css            Base icon class .ds-icon
  grid.css             Layout grid classes .ds-grid, .ds-grid-span-<n>
  lib.ts               Shared token logic (build script + docs site)
  tokens.css           Generated by `npm run tokens` — never edit by hand
components/
  _template/           Copy this to start a new component
  <ComponentName>/
    meta.json          Name, description, current stage
    design/            Stage 1 — Live design preview (Preview.tsx + tokens.json), tested in the Design preview tab
    spec.md            Stage 1 — Design spec
    guidelines.md      Stage 2 — Usage guidelines
    <Name>.tsx + .css  Stage 3 — Code
    examples.tsx       Stage 3 — Live examples for the docs
  index.ts             Public exports of all coded components
docs/                  Local documentation site (auto-discovers components), styled with the design system tokens; layout in docs/src/AppShell.tsx (site only, not a DS component)
backlog/
  backlog.json         Tasks still to do (Backlog page of the docs site)
prototypes/
  _template/           Copy this to start a new prototype
  <prototype-name>/    One interactive mockup per folder
scripts/build-tokens.ts  Builds tokens.css and checks contrast (fails if a pair is below AA)
```

Run `npm run dev`, then open http://localhost:5173 (`/docs/` and `/prototypes/`).

## Conventions
Approved by the Design System Lead on 2026-10-16.
- CSS custom properties: the token path joined with dashes (`color.primary.600` → `--color-primary-600`).
- Component folders: PascalCase (`Button/`). Prototype folders: kebab-case (`checkout-flow/`).
- Folders starting with `_` are templates and are ignored by the docs and prototypes pages.
- CSS class names are prefixed with `ds-` (e.g. `.ds-button`). Variant values use BEM modifiers (`.ds-button--primary`); internal parts use a single dash (`.ds-button-icon`). See the `component-code` skill.
- Component styles use design tokens only (`var(--…)`), never raw values.
- Components are organized with **Atomic Design** (5 levels: atom, molecule, organism, template, page) — see the `component-structure` skill. Folders stay flat; the level is the `level` field of `meta.json`.
- `meta.json` `status` is one of: `design`, `guidelines`, `code`, then **`complete`** once the code is approved (shown with a Complete badge on the site). Update it when a stage is approved.
- Prototypes import components only from `@ds/components`.

## Design tokens
- Two tiers: **primitive** (raw values) and **semantic** (roles). **Components use semantic tokens only.**
- Every token category (typography, spacing, radius, shadows, motion…) is defined together with the Design System Lead, from scratch.
- **Colors are defined by the Design System Lead** (palettes and roles).
- Approved so far:
  - `primary` palette (`color.primary.50` → `950`), brand color = **primary-600 (#795b55)**.
  - `secondary` palette (`color.secondary.50` → `950`), secondary brand color = **secondary-600 (#f5f3bb)**. Light palette for backgrounds and surfaces only: no step meets AA as text on white.
  - `neutral` palette (pure gray) and `neutral-warm` palette (greige), 50 → 950 each. Steps 600+ meet AA as text on white; step 500 meets 3:1 for borders and icons.
  - Feedback palettes `success`, `warning` (orange), `error`, `info` (option B, 50 → 950).
  - `neutral.0` = white (#ffffff). The interface uses the `neutral` palette (pure gray).
  - **Semantic colors** (`tokens/semantic.json`): 45 roles across `text`, `icon`, `background`, `border` — see the `token-naming` skill. Interactive states use **state layers** (`state-layer.hover` 0.08, `.focus` 0.12, `.pressed` 0.24, in the content color) instead of per-role hover tokens. `border.focus-inverse` (white) is the focus ring on brand or dark backgrounds. `background.overlay` = neutral-950 at 40% (dimmed background behind a panel).
  - **Typography** (`tokens/semantic.json`): font families `heading` (Poppins) and `body` (Open Sans), weights regular / semibold / bold, 11 font sizes in rem (base 14px), line heights `heading` 1.2 and `body` 1.5, and 13 text styles with CSS classes `.ds-text-<style>` — see the `token-naming` skill.
  - **Spacing** (`tokens/semantic.json`): 8px grid in px, `space.0` → `space.64`, plus `space.4`.
  - **Radius** (`tokens/semantic.json`): `radius.0`, `.4`, `.8`, `.16` in px, and `radius.full` = 50%.
  - **Border width** (`tokens/semantic.json`): `border-width.0`, `.1`, `.2`, `.4` in px.
  - **Shadows**: primitives `shadow.1` / `2` / `3` (neutral). Semantic shadows by usage: `shadow.panel` → `shadow.3`.
  - **Motion** (`tokens/semantic.json`): `duration.100` / `200` / `300` / `500`, `easing.ease-out`, `easing.ease-in-out`. Durations drop to 0.01ms with `prefers-reduced-motion` (WCAG 2.3.3).
  - **Opacity**: `opacity.disabled` = 0.38, for disabled elements on a colored background only; on light backgrounds, the disabled color roles.
  - **Breakpoints** (mobile first): `breakpoint.tablet` = 768px, `breakpoint.desktop` = 1024px. Media queries write these values (CSS cannot use variables there), with a comment naming the token; `npm run tokens` fails on any other width. The site navigation and the timeline switch to a burger menu below desktop.
  - **Z-index** (stacking order, by usage): `content` 0, `sticky` 10, `navigation` 20, `overlay` 30, `modal` 40, `tooltip` 100, `skip-link` 110.
  - **Size**: `size.side-navigation` = 240px, `size.timeline` = 400px max, `size.content` = 1040px max (margins included) (sizes named by usage).
  - **Layout grid** (`tokens/semantic.json` + `tokens/grid.css`): 4 / 8 / 12 columns (mobile / tablet / desktop), `grid.gutter` 16px, `grid.margin` 24px; classes `.ds-grid` and `.ds-grid-span-<n>` — see the `layout` skill.
  - **Icons**: Material Symbols **Outlined**, weight 400, always unfilled, loaded from Google Fonts. Sizes `icon-size.16` / `20` / `24` (default) / `32`. Base class `.ds-icon` in `tokens/icons.css`; the icon takes the text color.
- Dark mode is planned for later; the semantic tier will make it possible without changing components.

## Accessibility
- Target: **WCAG 2.2 AA** — contrast 4.5:1 for text, 3:1 for UI elements and large text.
- Animations always use the `--duration-*` tokens, so they respect the reduced motion setting.
- Every new semantic color pair (text/background, icon/background, border/background) is added to `tokens/contrast-pairs.json`; `npm run tokens` fails if one is below AA.

## Status
- 2026-10-16: Project created; goal and workflow defined.
