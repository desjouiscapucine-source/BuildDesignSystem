# BuildDesignSystem — Project Context

## Language
- Everything in this project is written in **English**: code, comments, documentation, token names, component names, and commit messages.

## Steps log
- `STEPS.md` documents every step taken in this project.
- After completing any step, append a new entry to `STEPS.md` with: date, what was done (and why), and the files created or changed.
- Steps are numbered **per backlog ticket**: `Step <ticket>-<n>` (e.g. `Step B031-2`). Steps written before this rule keep their number (1 → 169). See the `git-workflow` skill.

## Git
- The project is versioned with git and pushed to the private GitHub repository `CapucineDjs/BuildDesignSystem`: **`develop`** (permanent) receives the approved work; **`main`** receives `develop` on release day only, after a review, with a tag `R<n>` and a release note (`releases/R<n>.md`).
- **Preview before commit** (whole project): after a change, Claude checks it, then gives the Design System Lead the local preview link (`npm run dev`, http://localhost:5173 — it shows the files on disk, uncommitted changes included). The Lead reviews it; changes requested → iterate and preview again.
- **One piece of work = one branch = one folder = one Claude session**: **two branch types only**: `governance/<topic>` and `component/<Name>` (a prototype too: `component/<prototype-folder>`), each tied to a backlog ticket. Branches start from `develop` and are merged into it; never work directly on `develop` or `main`. **All automatic**: Claude picks the branch, sets up the folder, commits, updates from `develop`, merges and prepares the release; the Design System Lead never runs git, creates a folder or names a skill. Conversations (same Claude project): **Gouvernance** (one, permanent) and **Composant `<Name>`** (one per component or prototype, archived when finished). Full rule: the `git-workflow` skill.
- **Only once the Design System Lead validates**: write the `STEPS.md` entry, commit all the step's changes and push to the branch of the piece of work. Never commit or push before that validation, except the reservation of a new ticket and the changes made on the Backlog page (`git-workflow`). Commit message in English: `Step <ticket>-<n>: <short title>`.
- **Merge into `develop`**: a component after each approved stage, governance as soon as approved, a prototype when validated or on request. Branches are updated from `develop` before every commit. The root folder of the project stays on `develop`.
- **Release day** (every two weeks): review of what was pushed and committed on `develop`, release note, then `develop` merged into `main` and tagged `R<n>` — `git-workflow` section 8.

## Backlog
- The tasks still to do live in **`backlog/backlog.json`**, shown and edited on the **Backlog** page of the documentation site (`/docs/#/backlog`).
- **Ticket content** (B114, B116): template Goal (`description`), Why (`why`), Scope (`scope`), Done when (`doneWhen`), plus the parts of its type (Prototypes: Users, User journey, Components used) — see the `ticket` skill; a click on a ticket of the Backlog page opens it in a modal (Dialog).
- `origin`: `decided` (from the Design System Lead) or `proposal` (suggested by Claude). `status`: `todo` → `in-progress` → `done` (or `rejected`). `priority` (optional, none by default): `high` / `medium` / `low`, chosen by the Design System Lead: **asked in the chat before every new ticket**, changed on the Backlog page; the columns are sorted by priority. `release` (optional): `R1`, `R2`…, one release every two weeks on Friday from 2026-11-06, **asked with the priority when a ticket is created**, changed on the Backlog page, shown on the Release planning page (`/docs/#/releases`) — see the `release-planning` skill.
- **No proposals in the backlog**: Claude asks every suggestion in the chat first; only once the Design System Lead agrees is the ticket created, in `todo`. A change made on the Backlog page is saved directly in `develop` and pushed, whichever conversation serves the site (`git-workflow`).
- Read `backlog/backlog.json` at the start of a session; update an item's status (and `stage` for components) as work progresses. New ideas are asked in the chat, never added to the backlog without approval.
- **Prototype tickets**: one ticket per prototype, with `prototype` (folder name; spec in `prototypes/<name>/spec.md`) and `iterations` (each review: `feedback` + `decision` `changes-requested` / `validated`), plus Users, User journey and Components used (`ticket` skill). The ticket's modal (`/docs/#/backlog/<id>`) shows them, the spec and the iteration history. See `prototypes/README.md`.
- Full rule: the `backlog` skill.

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

## Navigation
- Navigation levels **Level 0** (landing page) → **Level 4** (component pages only); Level 3 is the deepest level otherwise, deeper detail opens in a modal; logo back to Level 0, breadcrumb to go back, anchors and timeline inside a page — see the `navigation` skill and the Navigation structure page (`/docs/#/navigation`).

## Page content
- A page combining a Timeline and Cards follows the `page-content` skill: one card per step (same order, same title, anchor link), on desktop a 12-column grid on the full screen width with cards on 8 columns and the timeline filling 4 columns (16px gutter), timeline fixed while scrolling, selected step following the card at the top of the screen, space after the last card so every card can reach the top.
- Cards in any page follow the `card` skill: stacked, full width of their column, 16px apart, no nested cards; `page-content` refers to it.

## Skills
- Every task starts with the **`orchestrator`** skill (`.claude/skills/orchestrator/SKILL.md`), the parent of all the project skills: it only dispatches the task to the child skills to load. Every new skill gets a row in its dispatch table.
- For a component, it loads the **`component`** skill (lifecycle and approval gate) together with the skill of the current stage.
- The **How to use skills** page of the documentation site (`/docs/#/skills`) reads the skills from `.claude/skills/` and shows them.

## Agents
- Agents (sub-agents launched by Claude) **read and propose only**: they never change `tokens/`, `components/` or `prototypes/`.
- Claude checks every agent result before showing it to the Design System Lead; the `never-invent` rule applies to agents too.

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
    playground.tsx     Stage 3 — Controls of the Playground tab (component live, like Storybook; replaces Design preview once complete)
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
- `meta.json` `version` (`X.Y`: `0.0` in progress, `1.0` once complete) and `changelog` (version, date, changes; newest first), shown on the component page (version badge, Changelog tab); `Y` goes up for an addition or a fix, `X` for a breaking change — see the `changelog` skill and the Changelog page (`/docs/#/changelog`).
- Prototypes import components only from `@ds/components`, load the design system with `prototypes/_shared/setup.ts` and lay out each screen with `prototypes/_shared/Screen.tsx`; styles use tokens only. `npm run build` fails otherwise (`scripts/check-prototypes.ts`).

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
  - **Shadows**: primitives `shadow.1` / `2` / `3` (neutral). Semantic shadows by usage: `shadow.panel` and `shadow.dialog` → `shadow.3`.
  - **Motion** (`tokens/semantic.json`): `duration.100` / `200` / `300` / `500`, `easing.ease-out`, `easing.ease-in-out`. Durations drop to 0.01ms with `prefers-reduced-motion` (WCAG 2.3.3).
  - **Opacity**: `opacity.disabled` = 0.38, for disabled elements on a colored background only; on light backgrounds, the disabled color roles.
  - **Breakpoints** (mobile first): `breakpoint.tablet` = 768px, `breakpoint.desktop` = 1024px. Media queries write these values (CSS cannot use variables there), with a comment naming the token; `npm run tokens` fails on any other width. The site navigation and the timeline switch to a burger menu below desktop.
  - **Z-index** (stacking order, by usage): `content` 0, `sticky` 10, `navigation` 20, `overlay` 30, `modal` 40, `tooltip` 100, `skip-link` 110.
  - **Size**: `size.side-navigation` = 240px, `size.timeline` = 400px max (timeline panel below desktop), `size.timeline-step-title` = 200px (minimum title width next to the dates), `size.content` = 1040px max (margins included), `size.dialog-small` / `-medium` / `-large` = 400 / 560 / 800px (sizes named by usage).
  - **Layout grid** (`tokens/semantic.json` + `tokens/grid.css`): 4 / 8 / 12 columns (mobile / tablet / desktop), `grid.gutter` 16px, `grid.margin` 24px; classes `.ds-grid` and `.ds-grid-span-<n>` — see the `layout` skill.
  - **Icons**: Material Symbols **Outlined**, weight 400, always unfilled, loaded from Google Fonts. Sizes `icon-size.16` / `20` / `24` (default) / `32`. Base class `.ds-icon` in `tokens/icons.css`; the icon takes the text color.
- Dark mode is planned for later; the semantic tier will make it possible without changing components.

## Accessibility
- Target: **WCAG 2.2 AA** — contrast 4.5:1 for text, 3:1 for UI elements and large text.
- Animations always use the `--duration-*` tokens, so they respect the reduced motion setting.
- Every new semantic color pair (text/background, icon/background, border/background) is added to `tokens/contrast-pairs.json`; `npm run tokens` fails if one is below AA.

## Status
- 2026-10-16: Project created; goal and workflow defined.
