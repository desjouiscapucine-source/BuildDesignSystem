# BuildDesignSystem — Steps Log

A chronological record of every step taken to build this design system.
Each entry describes what was done, why, and which files were affected.

---

## Step 1 — Project setup
**Date:** 2026-10-16

**What was done**
- Created the project folder `BuildDesignSystem`.
- Moved the working session into this folder.

**Files**
- `BuildDesignSystem/` (new folder)

---

## Step 2 — Project context file
**Date:** 2026-10-16

**What was done**
- Created `CLAUDE.md`, the project context file loaded automatically by Claude at the start of every session.
- Set the project rule: everything is written in English.
- Added placeholder sections to fill in: Goal, Scope, Tech stack, Design source, Conventions, Status.

**Files**
- `CLAUDE.md` (new)

---

## Step 3 — Steps log
**Date:** 2026-10-16

**What was done**
- Created this file, `STEPS.md`, to document every step of the project.
- Added a rule to `CLAUDE.md` so this log is updated after each completed step.

**Files**
- `STEPS.md` (new)
- `CLAUDE.md` (updated)

---

## Step 4 — Goal and workflow
**Date:** 2026-10-16

**What was done**
- Defined the project goal: build a design system without Figma, keeping design, code and prototypes in this repository.
- Defined the three-stage workflow for each component: Design (spec + visual preview) → Code (developed component) → Prototype (interactive mockups).
- Added a rule: a component moves to the next stage only after the Design System Lead approves the current one.

**Files**
- `CLAUDE.md` (updated: Owner, Goal, Workflow, Scope)

---

## Step 5 — Tech stack
**Date:** 2026-10-16

**What was done**
- Chose the tech stack: React + TypeScript components, design tokens in JSON compiled to CSS custom properties, Vite for tooling and interactive mockups.
- Decided not to use Storybook (not available to the team). Instead, a local documentation site will be built in-house to showcase each component's spec, variants and states.
- Decided to keep everything local for now.

**Files**
- `CLAUDE.md` (updated: Tech stack)

---

## Step 6 — Component guidelines
**Date:** 2026-10-16

**What was done**
- Added a dedicated **Guidelines** stage to the component workflow, which now has four stages: Design → Guidelines → Code → Prototype.
- Defined the content of each component's guidelines document: when to use / not to use, usage best practices, do's and don'ts, content guidelines, behavior, accessibility, related components.
- Separated the design spec (what the component is) from the guidelines (how and when to use it).
- Guidelines are updated whenever coding or prototyping reveals a new rule or edge case.

**Files**
- `CLAUDE.md` (updated: Workflow, new Component guidelines section)

---

## Step 7 — Project structure
**Date:** 2026-10-16

**What was done**
- Initialized the npm project and installed dependencies: React, React DOM, marked (Markdown rendering); dev tools: Vite, TypeScript and type definitions.
- Set up the design tokens pipeline: `tokens/tokens.json` (empty groups: color, typography, spacing, radius, elevation, motion) compiled to CSS custom properties by `scripts/build-tokens.mjs`. Token references like `{color.blue.500}` become `var(--color-blue-500)`.
- Created the component template (`components/_template/`) with one file per workflow stage: `meta.json`, `spec.md`, `guidelines.md`, component code + CSS, `examples.tsx`.
- Built the local documentation site (`docs/`), replacing Storybook:
  - Sidebar navigation: Overview, Design tokens, Components, Prototypes.
  - Design tokens page listing every token (with color swatches).
  - One page per component with its stage progress and three tabs: Design spec, Guidelines, Examples.
  - Components are discovered automatically from `components/` — no registration needed.
- Created the prototypes area (`prototypes/`) with a template for interactive mockups and an automatic list page.
- Added a home page linking to the documentation and prototypes, a `README.md`, and a `.gitignore`.
- Verified: type check and production build pass; the documentation site was tested in the browser with a temporary sample component (removed afterwards).

**Files**
- `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `.gitignore`, `index.html`, `README.md` (new)
- `tokens/tokens.json`, `scripts/build-tokens.mjs` (new)
- `components/_template/*`, `components/index.ts`, `components/README.md` (new)
- `docs/index.html`, `docs/src/*` (new)
- `prototypes/index.html`, `prototypes/list.tsx`, `prototypes/_template/*`, `prototypes/README.md` (new)
- `.claude/launch.json` (new — local dev server config)
- `CLAUDE.md` (updated: Project structure, Conventions)

---

## Step 8 — Design tokens foundations
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- No existing brand guidelines: start from a proposal.
- Two-tier token architecture: **primitive** (raw values) + **semantic** (roles). Components use semantic tokens only.
- Dark mode: later. The semantic tier makes it possible without changing components.
- Accessibility target: **WCAG 2.2 AA**.
- **Colors (palettes and roles) will be defined by the Design System Lead**, first in the chat. The example color palette proposed by Claude was removed.

**What was done**
- Split the tokens into `tokens/primitives.json` and `tokens/semantic.json` (replacing `tokens/tokens.json`).
- Primitive tokens defined (proposal, can be changed): font families (system font stack), font sizes (12 → 48px), font weights, line heights, spacing (4px grid), radius, border widths, shadows, durations, easings.
- Semantic typography: 10 text styles (display, heading-1 → heading-4, body-lg, body, body-sm, label, caption). Each one also generates a CSS class `.ds-text-<style>`.
- Color tokens left empty, waiting for the Design System Lead's palettes and roles.
- Added `tokens/contrast-pairs.json`: the list of color pairs checked against WCAG 2.2 AA (empty until colors are defined).
- Added `tokens/lib.ts` (shared token logic: reference resolution, text styles, contrast ratio) and replaced the build script with `scripts/build-tokens.ts`, which fails if a pair is below AA.
- Rebuilt the Design tokens page of the documentation site: primitive and semantic tiers, previews (swatches, spacing bars, radius and shadow shapes), text style samples, contrast table.

**Files**
- `tokens/primitives.json`, `tokens/semantic.json`, `tokens/contrast-pairs.json`, `tokens/lib.ts` (new)
- `tokens/tokens.json` (removed)
- `scripts/build-tokens.ts` (new, replaces `scripts/build-tokens.mjs`)
- `docs/src/pages/TokensPage.tsx`, `docs/src/docs.css` (updated)
- `package.json`, `tsconfig.json`, `.gitignore`, `README.md`, `CLAUDE.md` (updated)

---

## Step 9 — Primary color palette
**Date:** 2026-10-16

**What was done**
- The Design System Lead chose the brand color **#412722** (dark brown) for the primary palette.
- Generated an 11-step scale (50 → 950) around it in the OKLCH color space, keeping the same hue (≈31°) so every step reads as the same brown. The brand color sits at step **900**, unchanged.
- Added it as `color.primary.*` in `tokens/primitives.json`.

| Step | Value | Contrast on white |
| ---- | ----- | ----------------- |
| 50  | #fdf2f0 | 1.10:1 |
| 100 | #f5e6e3 | 1.21:1 |
| 200 | #efcbc3 | 1.50:1 |
| 300 | #d4ada5 | 2.03:1 |
| 400 | #b68d85 | 2.94:1 |
| 500 | #9a7067 | 4.30:1 |
| 600 | #795b55 | 6.10:1 |
| 700 | #694c46 | 7.71:1 |
| 800 | #533832 | 10.61:1 |
| 900 | #412722 | 13.65:1 (brand color) |
| 950 | #2b130e | 17.47:1 |

**Status:** proposal — waiting for validation by the Design System Lead.

**Files**
- `tokens/primitives.json` (updated)

---

## Step 10 — Brand color moved to primary-600
**Date:** 2026-10-16

**What was done**
- The Design System Lead chose **primary-600 (#795b55)** as the brand color, instead of #412722 (primary-900).
- The palette values are unchanged; only the role of the brand color moved.
- primary-600 has a 6.10:1 contrast on white: it passes WCAG AA both as text on white and as a background behind white text.

**Files**
- `tokens/primitives.json` (updated descriptions)

---

## Step 11 — First skill: never invent
**Date:** 2026-10-16

**What was done**
- At the Design System Lead's request, created the project skill **`never-invent`**: Claude never invents a design system decision and always asks first.
- The rule covers tokens, palettes (including derived scales), typography, spacing, components, guidelines, naming, accessibility choices and prototype content.
- Proposals can be shown but are written into the project only once approved. Any unapproved content already in the project must be flagged.
- Added the rule to `CLAUDE.md` too, so it applies in every session even when the skill is not triggered.

**Files**
- `.claude/skills/never-invent/SKILL.md` (new)
- `CLAUDE.md` (updated: Never invent — always ask)

---

## Step 12 — Reset of unapproved tokens
**Date:** 2026-10-16

**What was done**
- Applying the `never-invent` rule, Claude listed everything it had created without approval.
- Decision of the Design System Lead: **remove all of it and start again from scratch, together** — except the colors just defined.
- Removed from `tokens/primitives.json`: font families, font sizes, font weights, line heights, spacing, radius, border widths, shadows, durations, easings.
- Removed from `tokens/semantic.json`: the 10 typography styles.
- Kept: the `primary` palette (50 → 950), brand color primary-600.
- Removed the unapproved token rules from `CLAUDE.md` (single-tier categories, text style classes).
- The documentation site now shows empty states for the removed categories.

**Files**
- `tokens/primitives.json`, `tokens/semantic.json`, `tokens/lib.ts` (updated)
- `docs/src/pages/TokensPage.tsx` (updated: empty states)
- `CLAUDE.md` (updated: Design tokens)

---

## Step 13 — "stable" stage removed
**Date:** 2026-10-16

**What was done**
- The Design System Lead removed the `stable` stage, which Claude had added without approval.
- A component's stages are now exactly the four approved ones: `design`, `guidelines`, `code`, `prototype`.

**Files**
- `docs/src/types.ts`, `docs/src/StageBadge.tsx`, `components/README.md`, `CLAUDE.md` (updated)

---

## Step 14 — Conventions approved
**Date:** 2026-10-16

**What was done**
- The Design System Lead approved the naming conventions:
  - CSS custom properties: token path joined with dashes (`--color-primary-600`).
  - CSS class prefix: `ds-` (e.g. `.ds-button`).
  - Component folders: PascalCase (`Button/`).
  - Prototype folders: kebab-case (`checkout-flow/`).
- Marked the Conventions section of `CLAUDE.md` as approved and added the CSS custom property rule to it.

**Files**
- `CLAUDE.md` (updated: Conventions)

---

## Step 15 — Secondary color palette
**Date:** 2026-10-16

**What was done**
- The Design System Lead chose the secondary color **#f5f3bb** (light cream yellow) and asked for a light palette with this color at step **600**.
- Claude proposed two variants (A: same hue for the darker steps; B: darker steps warmed toward caramel) and showed option A combined with the primary palette on a sample screen.
- Decision of the Design System Lead: **option A, with 11 steps** (50 → 950).
- Added it as `color.secondary.*` in `tokens/primitives.json`.

| Step | Value | Contrast on white |
| ---- | ----- | ----------------- |
| 50  | #ffffef | 1.01:1 |
| 100 | #fdfde7 | 1.03:1 |
| 200 | #fcfbde | 1.05:1 |
| 300 | #faf9d6 | 1.07:1 |
| 400 | #f8f7cd | 1.10:1 |
| 500 | #f7f5c5 | 1.12:1 |
| 600 | #f5f3bb | 1.14:1 (secondary brand color) |
| 700 | #e4e2a8 | 1.33:1 |
| 800 | #cecb8e | 1.67:1 |
| 900 | #b5b271 | 2.19:1 |
| 950 | #999651 | 3.07:1 |

**Notes**
- This palette is for backgrounds and surfaces only: no step meets AA as text on white.
- Checked combinations with the primary palette: primary-900 on secondary-600 = 11.98:1, primary-600 on secondary-600 = 5.35:1 (both AA).

**Files**
- `tokens/primitives.json`, `CLAUDE.md` (updated)

---

## Step 16 — Neutral palettes
**Date:** 2026-10-16

**What was done**
- The Design System Lead asked for two neutral (gray) palettes and for proposals.
- Claude proposed four 11-step palettes with identical lightness per step: pure gray, cool gray, warm gray (primary hue), greige (secondary hue).
- Decision of the Design System Lead: keep **pure gray** and **greige**, named **`neutral`** and **`neutral-warm`**.
- Added them as `color.neutral.*` and `color.neutral-warm.*` in `tokens/primitives.json`.

| Step | neutral | neutral-warm | Contrast on white |
| ---- | ------- | ------------ | ----------------- |
| 50  | #fafafa | #fbfbf4 | ≈1.04:1 |
| 100 | #f3f3f3 | #f4f4ed | ≈1.10:1 |
| 200 | #e6e6e6 | #e7e7e0 | ≈1.25:1 |
| 300 | #d4d4d4 | #d5d5cb | ≈1.48:1 |
| 400 | #aeaeae | #afafa5 | ≈2.22:1 |
| 500 | #868686 | #87877d | ≈3.63:1 (borders, icons) |
| 600 | #696969 | #6a6a60 | ≈5.48:1 (text AA) |
| 700 | #525252 | #53534a | ≈7.79:1 |
| 800 | #3a3a3a | #3b3b33 | ≈11.3:1 |
| 900 | #242424 | #25251d | ≈15.5:1 |
| 950 | #141414 | #14140d | ≈18.4:1 |

**Not decided yet:** what each neutral palette is used for (will be defined with the semantic roles).

**Files**
- `tokens/primitives.json`, `CLAUDE.md` (updated)

---

## Step 17 — Second skill: token naming
**Date:** 2026-10-16

**What was done**
- At the Design System Lead's request, created the project skill **`token-naming`**, gathering the naming rules to respect for every token.
- It contains only approved rules: English, lowercase kebab-case, path of segments, CSS custom property = path joined with dashes, primitive/semantic tiers, primitive color pattern `color.<palette>.<step>`, the four approved palettes and the 11-step scale (50 → 950).
- Two rules suggested by Claude are listed as **proposals awaiting approval**: no raw values in names; stable names once used by a component.
- Naming patterns not decided yet are listed explicitly (semantic colors, feedback palettes, typography, spacing, radius, border width, shadow, motion): Claude must ask before naming these tokens.
- Added a pointer to the skill in `CLAUDE.md`.

**Files**
- `.claude/skills/token-naming/SKILL.md` (new)
- `CLAUDE.md` (updated: Token naming)

---

## Step 18 — Naming rules approved
**Date:** 2026-10-16

**What was done**
- The Design System Lead approved the two proposed naming rules, now part of the general rules of the `token-naming` skill:
  - **No raw values in names** (no `--color-795b55`, no `--brown`).
  - **Stable names:** a name never changes once used by a component, unless the Design System Lead approves the rename.

**Files**
- `.claude/skills/token-naming/SKILL.md` (updated)

---

## Step 19 — Feedback palettes
**Date:** 2026-10-16

**What was done**
- The Design System Lead asked for four feedback types — success, warning, error, info — with colors in harmony with the primary and secondary palettes.
- Claude proposed two options with the same hues (sage green, ochre, terracotta red, slate blue): A "earthy" (muted) and B "clear" (more saturated). Claude flagged that the earthy error (#93554e) was close to the brand brown.
- Decision of the Design System Lead: **option B**, names **`success`**, **`warning`**, **`error`**, **`info`**, and a **more orange warning**.
- Added `color.success.*`, `color.error.*` and `color.info.*` to `tokens/primitives.json`.
- Proposed three more orange warning variants (yellow-orange, orange, red-orange), waiting for the Design System Lead's choice.
- Added the feedback palette names to the `token-naming` skill.

| Step | success | error | info |
| ---- | ------- | ----- | ---- |
| 50  | #f1fff1 | #fff8f7 | #f6fbfe |
| 100 | #e6fae6 | #fef0ee | #e9f6fe |
| 200 | #d4efd4 | #ffddd9 | #ccecff |
| 300 | #bbe0bb | #fbc5be | #addcf8 |
| 400 | #86bf88 | #e5968c | #6cb8e3 |
| 500 | #4b9b51 | #ca6259 | #0a91c8 |
| 600 | #267d30 | #aa423a | #04729e |
| 700 | #1d6325 | #87332d | #005a7e |
| 800 | #134619 | #62231f | #01405b |
| 900 | #0b2c0e | #3e1512 | #01283a |
| 950 | #051907 | #240b08 | #011622 |

**Files**
- `tokens/primitives.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md` (updated)

---

## Step 20 — Warning palette
**Date:** 2026-10-16

**What was done**
- Decision of the Design System Lead: the **"orange"** variant for `warning` (between yellow-orange and red-orange).
- Added `color.warning.*` to `tokens/primitives.json`. The four feedback palettes are now complete.

| Step | warning |
| ---- | ------- |
| 50  | #fef9f6 |
| 100 | #fff0e7 |
| 200 | #ffdfcb |
| 300 | #f6caae |
| 400 | #df9d72 |
| 500 | #c36d2b |
| 600 | #a05003 |
| 700 | #7f3e02 |
| 800 | #5c2c02 |
| 900 | #3b1a01 |
| 950 | #230d01 |

**Files**
- `tokens/primitives.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md` (updated)

---

## Step 21 — Semantic color naming structure
**Date:** 2026-10-16

**What was done**
- Claude proposed three naming structures for semantic color tokens: A (by property, then role), B (by role, then property), C (by component).
- Decision of the Design System Lead: **structure A** — `color.<property>.<role>` (e.g. `color.text.primary`, `color.background.surface`, `color.border.subtle`).
- Added the pattern to the `token-naming` skill. The list of properties, roles and state names is still to be defined.

**Files**
- `.claude/skills/token-naming/SKILL.md` (updated)

---

## Step 22 — Semantic color roles
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Four properties: **`text`**, **`icon`** (separate from text), **`background`**, **`border`**.
- The list of roles proposed by Claude is approved as is:
  - `text`: primary, secondary, disabled, inverse, link, brand, success, warning, error, info
  - `icon`: same roles as `text`
  - `background`: page, surface, subtle, inverse, disabled, brand, brand-subtle, success-subtle, warning-subtle, error-subtle, info-subtle, success, warning, error, info
  - `border`: default, subtle, strong, focus, success, warning, error, info
- States: **only `hover`**, written as an extra segment — `color.background.brand.hover` → `--color-background-brand-hover`.
- Which roles get a hover state: **to be defined later**.

**What was done**
- Added the roles and the state format to the `token-naming` skill.
- Updated `tokens/lib.ts` so a token can have its own value and a `hover` child (e.g. `brand` and `brand.hover`).
- No values assigned yet.

**Files**
- `.claude/skills/token-naming/SKILL.md`, `tokens/lib.ts` (updated)

---

## Step 23 — Interface gray and white
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- The interface (text, backgrounds, borders) uses the **`neutral`** palette (pure gray).
- Add a pure white, named **`color.neutral.0`** (#ffffff) → `--color-neutral-0`. The `neutral` palette now has 12 steps (0 → 950).
- No pure black token: the darkest value stays `neutral-950` (#141414).

**Files**
- `tokens/primitives.json`, `.claude/skills/token-naming/SKILL.md` (updated)

---

## Step 24 — Semantic color values
**Date:** 2026-10-16

**What was done**
- Claude proposed a primitive shade for every semantic role, shown as tables and as a visual (role tiles + sample screen).
- Decision of the Design System Lead: **proposal approved as is**, keeping `border.default` = neutral-300 (decorative) and pure gray for `background.surface` / `subtle`.
- Wrote the 43 semantic color tokens in `tokens/semantic.json`.
- Added 42 contrast pairs to `tokens/contrast-pairs.json`: **42/42 pass WCAG 2.2 AA**.

| Property | Role | Primitive |
| -------- | ---- | --------- |
| text | primary / secondary / disabled / inverse | neutral-900 / neutral-600 / neutral-400 / neutral-0 |
| text | link, brand | primary-600 |
| text | success, warning, error, info | *-700 |
| icon | primary / secondary / disabled / inverse / link / brand | same as text |
| icon | success, warning, error, info | *-600 |
| background | page / surface / subtle / inverse / disabled | neutral-0 / neutral-50 / neutral-100 / neutral-900 / neutral-100 |
| background | brand / brand-subtle | primary-600 / secondary-600 |
| background | success-subtle … info-subtle | *-50 |
| background | success, warning, error, info | *-600 |
| border | subtle / default / strong / focus | neutral-200 / neutral-300 / neutral-500 / primary-600 |
| border | success, warning, error, info | *-500 |

**Not decided yet:** which roles get a hover state.

**Files**
- `tokens/semantic.json`, `tokens/contrast-pairs.json`, `CLAUDE.md` (updated)

---

## Step 25 — Font families
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Two font families, loaded from **Google Fonts** (online):
  - Headings: **Poppins**
  - Body text: **Open Sans**
- Token names: **`font-family.heading`** and **`font-family.body`**, in the **semantic tier** (no primitive for fonts).
- Fallback if Google Fonts does not load: the **system font** (`system-ui, sans-serif`).
- Weights: being corrected by the Design System Lead (pending).

**What was done**
- Showed both fonts in all their available weights, with a pairing sample.
- Added `--font-family-heading` and `--font-family-body` to `tokens/semantic.json`.
- Added the font family pattern to the `token-naming` skill.
- Google Fonts loading will be added once the weights are decided.

**Files**
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md` (updated)

---

## Step 26 — Font weights and font loading
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Weights kept: **Poppins 400, 600, 700** — **Open Sans 400, 600**.
- Token names by weight name: **`font-weight.regular`** (400), **`font-weight.semibold`** (600), **`font-weight.bold`** (700), in the **semantic tier**.

**What was done**
- Added the three weight tokens to `tokens/semantic.json`. `bold` is documented as Poppins only.
- Added `tokens/fonts.css`, which loads only the approved weights from Google Fonts, and imported it in the documentation site and the prototype template.
- Added the weight pattern to the `token-naming` skill.

**Files**
- `tokens/fonts.css` (new)
- `tokens/semantic.json`, `docs/src/main.tsx`, `prototypes/_template/main.tsx`, `.claude/skills/token-naming/SKILL.md` (updated)

---

## Step 27 — Font sizes
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Names by pixel value: `font-size.<px>`.
- Text sizes from 12 to 24px, larger sizes for headings. Approved list: **12, 14, 16, 18, 20, 24** (text) and **28, 32, 40, 48, 56** (headings).
- Values in **rem** (1rem = 16px, the browser default), for accessibility.
- **Base size for body text: 14px** (0.875rem).
- Semantic tier.

**What was done**
- Added the 11 font size tokens to `tokens/semantic.json`.
- Added the font size pattern to the `token-naming` skill.

| Token | Value |
| ----- | ----- |
| `--font-size-12` | 0.75rem |
| `--font-size-14` | 0.875rem (base) |
| `--font-size-16` | 1rem |
| `--font-size-18` | 1.125rem |
| `--font-size-20` | 1.25rem |
| `--font-size-24` | 1.5rem |
| `--font-size-28` | 1.75rem |
| `--font-size-32` | 2rem |
| `--font-size-40` | 2.5rem |
| `--font-size-48` | 3rem |
| `--font-size-56` | 3.5rem |

**Files**
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md` (updated)

---

## Step 28 — Line heights
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Line heights as **unitless ratios**, **one for headings and one for body text**.
- Values: **1.2** for headings, **1.5** for body text.
- Names: **`line-height.heading`** and **`line-height.body`**.

**What was done**
- Showed three ratios for each usage (1.1 / 1.2 / 1.3 and 1.4 / 1.5 / 1.6).
- Added the two tokens to `tokens/semantic.json` (semantic tier, like the other typography tokens).
- Added the pattern to the `token-naming` skill.

**Files**
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md` (updated)

---

## Step 29 — Text styles
**Date:** 2026-10-16

**What was done**
- Claude proposed 13 text styles (with a visual and a sample page), built only from approved typography tokens.
- Decision of the Design System Lead: **list, naming and CSS classes approved**.
  - Naming: `typography.<style>.<property>` → `--typography-heading-1-size`.
  - One CSS class per style: `.ds-text-<style>` (e.g. `.ds-text-heading-1`).
- Added the 13 styles to `tokens/semantic.json`. `npm run tokens` now generates the 13 CSS classes in `tokens/tokens.css`.
- Checked in the documentation site: the text styles render with Poppins and Open Sans.

| Style | Font | Size | Weight | Line height | Usage |
| ----- | ---- | ---- | ------ | ----------- | ----- |
| display-lg | Poppins | 56px | bold | 1.2 | Large hero titles |
| display | Poppins | 48px | bold | 1.2 | Hero titles |
| heading-1 | Poppins | 40px | semibold | 1.2 | Page title |
| heading-2 | Poppins | 32px | semibold | 1.2 | Section title |
| heading-3 | Poppins | 28px | semibold | 1.2 | Sub-section title |
| heading-4 | Poppins | 24px | semibold | 1.2 | Card or block title |
| heading-5 | Poppins | 20px | semibold | 1.2 | Small title |
| lead | Open Sans | 18px | regular | 1.5 | Intro paragraph |
| body-lg | Open Sans | 16px | regular | 1.5 | Comfortable reading |
| body | Open Sans | 14px | regular | 1.5 | Default text (base) |
| body-sm | Open Sans | 12px | regular | 1.5 | Notes, captions |
| label | Open Sans | 14px | semibold | 1.5 | Form labels, buttons |
| label-sm | Open Sans | 12px | semibold | 1.5 | Tags, small labels |

**Typography is complete.**

**Files**
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md` (updated)

---

## Step 30 — Spacing
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- **Multiples of 8**, starting at **0**, up to **64px**.
- Add a **4px half-step** for very small gaps (exception to the 8px grid).
- Names by pixel value: **`space.<px>`** → `--space-16`.
- Values in **px**, semantic tier.

**What was done**
- Added 10 spacing tokens to `tokens/semantic.json`: 0, 4, 8, 16, 24, 32, 40, 48, 56, 64.
- Added the pattern to the `token-naming` skill and the summary to `CLAUDE.md`.

**Files**
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md` (updated)

---

## Step 31 — Border radius
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Values on the grid: **0, 4, 8, 16**.
- A full rounding: **`radius.full` = `50%`**.
- Names by pixel value: **`radius.<px>`** → `--radius-8`.
- Values in **px**, semantic tier.

**What was done**
- Added 5 radius tokens to `tokens/semantic.json`.
- Documented that `50%` gives a circle on a square element, but an ellipse (not a pill) on a rectangle.
- Added the pattern to the `token-naming` skill and the summary to `CLAUDE.md`.

**Files**
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md` (updated)

---

## Step 32 — Border widths
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Values: **0, 1, 2, 4**.
- Names by pixel value: **`border-width.<px>`** → `--border-width-1`.
- Values in **px**, semantic tier.

**What was done**
- Added 4 border width tokens to `tokens/semantic.json`.
- Added the pattern to the `token-naming` skill and the summary to `CLAUDE.md`.

**Files**
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md` (updated)

---

## Step 33 — Shadows (primitives)
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Two tiers: **primitives** first, then **semantic shadows named by usage**.
- Primitive names by level: **`shadow.1`**, **`shadow.2`**, **`shadow.3`**.
- The 3 proposed levels approved as is. Color: **neutral** (neutral-950 with transparency).
- Semantic usages: **to be defined later**.

**What was done**
- Added the 3 primitive shadows to `tokens/primitives.json`.

| Token | Value | Level |
| ----- | ----- | ----- |
| `--shadow-1` | `0 1px 2px rgba(20, 20, 20, 0.12)` | Low |
| `--shadow-2` | `0 4px 8px rgba(20, 20, 20, 0.14)` | Medium |
| `--shadow-3` | `0 8px 24px rgba(20, 20, 20, 0.18)` | High |

- Added the pattern to the `token-naming` skill and the summary to `CLAUDE.md`.

**Files**
- `tokens/primitives.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md` (updated)

---

## Step 34 — Motion
**Date:** 2026-10-16

**What was done**
- Claude showed an interactive demo comparing durations (100 / 200 / 300 / 500 ms) and curves (linear, ease-out, ease-in, ease-in-out).
- Decisions of the Design System Lead:
  - Durations: **100, 200, 300, 500 ms**.
  - Curves: **ease-out** and **ease-in-out**.
  - Names **by value**: `duration.<ms>`, `easing.<curve-name>`.
  - **Reduced motion: yes** — animations become near-instant when the user asks the system to reduce motion (WCAG 2.3.3).
- Added 4 duration tokens and 2 easing tokens to `tokens/semantic.json`.
- Updated `scripts/build-tokens.ts`: it now generates a `prefers-reduced-motion` block that sets every duration to `0.01ms`.
- Added the pattern to the `token-naming` skill and the rule to `CLAUDE.md` (animations always use the duration tokens).

| Token | Value |
| ----- | ----- |
| `--duration-100` | 100ms |
| `--duration-200` | 200ms |
| `--duration-300` | 300ms |
| `--duration-500` | 500ms |
| `--easing-ease-out` | cubic-bezier(0, 0, 0.2, 1) |
| `--easing-ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) |

**All token categories now have a first version.** Still to define later: hover states for semantic colors, semantic shadows by usage.

**Files**
- `tokens/semantic.json`, `scripts/build-tokens.ts`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md` (updated)

---

## Step 35 — State layers
**Date:** 2026-10-16

**What was done**
- The Design System Lead asked to add **state layers** to the colors. Claude showed an interactive demo (overlay on buttons and a list item, with adjustable opacities).
- Decisions of the Design System Lead:
  - State layers **replace** the per-role hover tokens decided in step 22 (`color.background.brand.hover` will not exist).
  - States covered: **hover**, **focus**, **pressed** (no dragged).
  - Layer color: the element's **content color** (`currentColor`), as in Material Design.
  - Opacities: **hover 8%**, **focus 12%**, **pressed 24%**.
  - Names: **`state-layer.<state>`**.
- Added 3 tokens to `tokens/semantic.json`: `--state-layer-hover` (0.08), `--state-layer-focus` (0.12), `--state-layer-pressed` (0.24).
- Updated the `token-naming` skill (state layer section replaces the per-role hover state rule) and `CLAUDE.md`.

**Files**
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md` (updated)

---

## Step 36 — Roadmap
**Date:** 2026-10-16

**What was done**
- At the Design System Lead's request, created `ROADMAP.md`, the plan of tasks still to do.
- Tasks are marked 🟢 when they come from a decision of the Design System Lead (semantic shadows, dark mode) and 🟡 when they are Claude's proposals awaiting approval (icons, breakpoints, layout grid, z-index, opacity, pill radius, component list, first prototype, git, documentation improvements).
- Proposed a list of 15 components in a suggested order, starting with the Button — to approve and prioritize.
- Added a pointer to the roadmap in `CLAUDE.md`.

**Files**
- `ROADMAP.md` (new)
- `CLAUDE.md` (updated)

---

## Step 37 — Backlog page
**Date:** 2026-10-16

**What was done**
- At the Design System Lead's request, turned the roadmap into a **backlog on the documentation site**.
- Moved the tasks to `backlog/backlog.json` (35 items: 7 done, 2 decided to do, 26 proposals including the 15 components). `ROADMAP.md` was removed to keep a single source.
- Added a **Backlog** page (`/docs/#/backlog`): columns Proposals / To do / In progress / Done, filter by category, **Approve / Reject** buttons on proposals, status menu on other items, stage menu on components, rejected items hidden behind a button.
- Added a small save endpoint to the local dev server (`vite.config.ts`): changes made on the page are written to `backlog/backlog.json`. Saving only works with `npm run dev`.
- Updated `CLAUDE.md`: backlog rules (only the Design System Lead approves proposals; Claude never starts a `proposal` task and keeps statuses up to date).
- Tested: the page renders and the save endpoint writes the file.

**Files**
- `backlog/backlog.json`, `docs/src/pages/BacklogPage.tsx` (new)
- `ROADMAP.md` (removed)
- `vite.config.ts`, `docs/src/App.tsx`, `docs/src/docs.css`, `CLAUDE.md` (updated)

---

## Step 38 — Skills added to the backlog
**Date:** 2026-10-16

**What was done**
- At the Design System Lead's request, added the skills to create to the backlog, in a new **Skills** category.
- 8 skill proposals (awaiting approval): `component-spec`, `component-guidelines`, `component-code`, `accessibility-check`, `prototype-building`, `token-usage`, `steps-log`, `backlog-management`.
- Moved the existing done item "Skills: never-invent, token-naming" to the Skills category.

**Files**
- `backlog/backlog.json` (updated)

---

## Step 39 — Backlog triage and save fix
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Approved on the Backlog page: Icons, Breakpoints, Layout grid, Z-index, Opacity for disabled elements, Pill radius, Button, Icon button.
- Approved the **8 skills** (component-spec, component-guidelines, component-code, accessibility-check, prototype-building, token-usage, steps-log, backlog-management).

**Issue found and fixed**
- The Backlog page was open before the skills were added to the file. When the Design System Lead approved items, the page saved its whole (outdated) list and **erased the 8 skill items** and the Skills category change.
- Restored the 8 skills with status `todo` (approved) and moved "Skills: never-invent, token-naming" back to the Skills category.
- Fixed the cause: the page now loads the backlog from the file on disk when it opens, and each change sends **only the item that changed** (status or stage). The dev server applies it to the current file, so changes made elsewhere are never overwritten.
- Tested: the page lists 43 items and an update returns the current file.

**Files**
- `backlog/backlog.json`, `vite.config.ts`, `docs/src/pages/BacklogPage.tsx` (updated)

---

## Step 40 — Icons
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Icon library: **Material Symbols** (Google), style **Outlined**.
- Fill: **always unfilled**. Weight: **400**.
- Loaded from **Google Fonts** (online), like the text fonts.
- Sizes: **16, 20, 24, 32**, named by pixel value: **`icon-size.<px>`**.

**What was done**
- Showed the three Material Symbols styles (outlined, rounded, sharp), filled and unfilled, and five weights.
- Added the Material Symbols Outlined font to `tokens/fonts.css` (weight 400, unfilled, optical sizes 20–48 only).
- Added 4 icon size tokens to `tokens/semantic.json` (px, semantic tier; 24 is the default).
- Added `tokens/icons.css` with the base class **`.ds-icon`** (needed to display the icon font; the icon takes the text color, size defaults to `--icon-size-24`). Imported in the documentation site and the prototype template.
- Added an **Icons** page to the documentation site (`/docs/#/icons`): usage, sizes, a field to try any icon name, 32 example icons, link to the full catalog.
- Updated the `token-naming` skill and `CLAUDE.md`. Backlog item "Icons" set to done.

**Files**
- `tokens/icons.css`, `docs/src/pages/IconsPage.tsx` (new)
- `tokens/fonts.css`, `tokens/semantic.json`, `docs/src/main.tsx`, `docs/src/App.tsx`, `docs/src/docs.css`, `prototypes/_template/main.tsx`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json` (updated)

---

## Step 41 — Documentation site redesign and AppShell
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Redesign the documentation site **with the design system itself**.
- The AppShell is **only the layout of the site**, not a design system component.
- Structure: **header + side navigation**.
- Header color: **cream** (`background.brand-subtle`).

**What was done**
- Added `docs/src/AppShell.tsx`:
  - Header (cream): brand name with icon, **page search** (filters all pages, keyboard: `/` to focus, arrows, Enter, Escape), shortcuts to the Backlog and Prototypes.
  - Side navigation with Material icons, sections (Foundations, Components, Prototypes), current page highlighted in cream with brand text.
  - "Skip to content" link, visible keyboard focus, state layers on links and icon buttons.
  - Mobile (below 860px): the navigation opens from a menu button in the header.
- Rewrote `docs/src/docs.css` with the design system tokens: semantic colors, text styles (Poppins headings, Open Sans body), spacing, radius, border widths, shadows, motion and state layers. Only exception: the code font, which has no token.
- The home page (`index.html`) and the prototypes list now load the tokens and fonts too.
- Tested in the browser: tokens and icons pages, search, mobile navigation.

**Notes**
- The site layout uses a few values that have no token yet (header height uses `--space-64`, navigation width 256px, stacking order). They are site-only and can switch to tokens once breakpoints, layout grid and z-index are defined.

**Files**
- `docs/src/AppShell.tsx` (new)
- `docs/src/App.tsx`, `docs/src/docs.css`, `index.html`, `prototypes/list.tsx`, `CLAUDE.md` (updated)

---

## Step 42 — Side navigation in the brand color
**Date:** 2026-10-16

**Decision (Design System Lead)**
- The side navigation background uses the **primary color** (`background.brand`, primary-600).

**What was done**
- Side navigation: `background.brand`, links, section titles and icons in `text.inverse` / `icon.inverse` (white on primary-600 = 6.10:1, AA).
- Current page kept in cream (`background.brand-subtle`) with `text.brand` (5.35:1, AA).
- Focus outline inside the navigation switched to the inverse color: the usual `border.focus` (primary-600) would be invisible on the brown background.
- State layers on the links now use white (the content color), automatically.

**Files**
- `docs/src/docs.css` (updated)

---

## Step 43 — Side navigation added to the backlog
**Date:** 2026-10-16

**What was done**
- At the Design System Lead's request, added **"Side navigation"** to the backlog as a design system component (status `todo`, origin `decided`, stage `design`).
- Starting point noted in the item: the documentation site navigation.

**Files**
- `backlog/backlog.json` (updated)

---

## Step 44 — Main component skill
**Date:** 2026-10-16

**What was done**
- At the Design System Lead's request, created the main skill **`component`**, the entry point for every component. It redirects to sub-skills.
- Content (based only on approved decisions):
  - The four stages and their sub-skills: Design → `component-spec`, Guidelines → `component-guidelines`, Code → `component-code`, Prototype → `prototype-building`.
  - Cross-cutting sub-skills: `never-invent`, `token-naming`, `token-usage`, `accessibility-check`, `steps-log`, `backlog-management`.
  - Before starting: backlog check (never start a `proposal`), folder creation from the template (name approved by the Design System Lead).
  - Approval gate at the end of each stage: accessibility check, show the result, explicit approval, update `meta.json`, the backlog and `STEPS.md`.
  - Rules for changing an existing component.
- Added the skill to the backlog (done) and a pointer in `CLAUDE.md`.
- The sub-skills are still to write (backlog items in "To do").

**Files**
- `.claude/skills/component/SKILL.md` (new)
- `backlog/backlog.json`, `CLAUDE.md` (updated)

---

## Step 45 — Component structure: Atomic Design
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Components are structured with **Atomic Design**, in a new dedicated skill **`component-structure`**.
- **Five levels**: atoms, molecules, organisms, templates, pages.
- Folders stay **flat**; the level is a **field in `meta.json`** (`level`).

**What was done**
- Created `.claude/skills/component-structure/SKILL.md`: the five levels with definitions and examples, the composition rule from Atomic Design (a component only uses lower levels), how to record the level, how to classify (always proposed to and approved by the Design System Lead).
- Added `level` to the component template (`meta.json`) and to the documentation site: components are grouped by level in the navigation, and each component page shows its level.
- Linked the skill from the main `component` skill (level proposed and approved when a component is created) and from `CLAUDE.md`.
- Backlog: skill marked done; added "Templates and pages vs prototypes" (to decide) and a proposal to classify the backlog components.

**Open question**
- How templates and pages relate to the `prototypes/` folder, and whether they follow the four stages.

**Files**
- `.claude/skills/component-structure/SKILL.md` (new)
- `components/_template/meta.json`, `components/README.md`, `docs/src/types.ts`, `docs/src/registry.ts`, `docs/src/App.tsx`, `docs/src/pages/ComponentPage.tsx`, `docs/src/docs.css`, `.claude/skills/component/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json` (updated)

---

## Step 46 — Prototypes, templates and pages
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- **Prototypes are user journeys** (parcours): interactive mockups built with the design system components.
- **Templates and pages are independent of the prototypes**: they are layout references; the journeys build their screens directly from the components.
- **Templates and pages skip the Guidelines stage**: Design → Code → Prototype.

**What was done**
- Updated the `component-structure` skill (open question resolved), the main `component` skill, `CLAUDE.md` and `prototypes/README.md`.
- Documentation site: for templates and pages, the stage badge shows three stages and the Guidelines tab is hidden.
- Backlog item "Templates and pages vs prototypes" set to done.

**Files**
- `.claude/skills/component-structure/SKILL.md`, `.claude/skills/component/SKILL.md`, `CLAUDE.md`, `prototypes/README.md`, `docs/src/StageBadge.tsx`, `docs/src/pages/ComponentPage.tsx`, `docs/src/pages/HomePage.tsx`, `backlog/backlog.json` (updated)

---

## Step 47 — Skill: component-spec
**Date:** 2026-10-16

**What was done**
- Wrote the sub-skill **`component-spec`** (stage 1: Design), called by the main `component` skill.
  - Rules: never invent; proposals written into `spec.md` only once approved; only existing semantic tokens (a missing token goes through the token process first); Atomic Design level approved first.
  - Process: understand the need → build the spec section by section with approval (purpose, anatomy, variants, sizes, states, design tokens, open questions) → visual preview of every variant × size × state → write `spec.md` → approval gate (accessibility check).
  - States: interaction states use the state layers (hover, focus, pressed); disabled uses the disabled roles; component-specific states must be approved.
  - Interactive targets at least 24×24px (WCAG 2.5.8, part of the WCAG 2.2 AA target).
- Refined `components/_template/spec.md`: tokens-only reminder, required/optional parts, sizes with text style and icon size, states aligned with the state layers, token table by part / property / state.
- Backlog item "Skill: component-spec" set to in progress (waiting for the Design System Lead's review).

**Files**
- `.claude/skills/component-spec/SKILL.md` (new)
- `components/_template/spec.md`, `backlog/backlog.json` (updated)

---

## Step 48 — Variant definition step
**Date:** 2026-10-16

**Decision (Design System Lead)**
- Add a dedicated step to **define the possible variants** of a component.

**What was done**
- Added step 2 "Define the possible variants" to the `component-spec` skill, before the section-by-section spec:
  - list the variant properties (independent axes), their values and default value;
  - define allowed and forbidden combinations (with the reason);
  - show the variant matrix visually;
  - get approval of properties, values, defaults and forbidden combinations (names become prop names in code).
  - States are kept separate from variant properties.
- Updated the Variants section of `components/_template/spec.md`: variant properties table (property, values, default, description) and combinations (forbidden ones with reason).

**Files**
- `.claude/skills/component-spec/SKILL.md`, `components/_template/spec.md` (updated)

---

## Step 49 — Types, content, live design preview and token testing
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- The spec process also defines the component **types** and the **text content** inside the component.
- A **visual preview of the component from the start** of its creation.
- The Design System Lead can **test the tokens on the component before approval**.

**What was done**
- **Design preview tool** in the documentation site:
  - New per-component folder `components/<Name>/design/` (template in `components/_template/design/`): `Preview.tsx` (visual mock-up, not the final code, all values as `--preview-<slot>` variables) and `tokens.json` (slots, token per slot and per variant, state overrides such as disabled, default text, contrast pairs).
  - New **Design preview** tab on the component page (first tab when a preview exists): every state side by side (default, hover, focus, pressed, disabled — interaction states simulated with the state layers), a field to change the content, a menu per slot listing the semantic tokens of the right type, the resolved values, and a live WCAG contrast table.
  - Token choices and content are **saved automatically** to `design/tokens.json` through a new local dev-server endpoint (`/api/design-tokens`), one change at a time.
  - Tested with a temporary component (removed afterwards): token change rendered live and saved to the file.
- **`component-spec` skill** rewritten into 10 steps: understand the need → start the design preview → **define the types** → define the variants → **define the content** (texts, examples, max length, overflow) → build the spec → states → **test the tokens in the preview** (Claude never overrides the Design System Lead's choices) → write `spec.md` → approval gate.
- `components/_template/spec.md`: new **Types** and **Content** sections.
- `components/README.md` and `CLAUDE.md`: `design/` folder documented.

**Files**
- `components/_template/design/Preview.tsx`, `components/_template/design/tokens.json`, `docs/src/DesignPreview.tsx` (new)
- `.claude/skills/component-spec/SKILL.md`, `components/_template/spec.md`, `components/README.md`, `docs/src/types.ts`, `docs/src/registry.ts`, `docs/src/pages/ComponentPage.tsx`, `docs/src/docs.css`, `vite.config.ts`, `CLAUDE.md` (updated)

---

## Step 50 — Skill: component-guidelines
**Date:** 2026-10-16

**What was done**
- The Design System Lead approved the `component-spec` skill (backlog item set to done).
- Wrote the sub-skill **`component-guidelines`** (stage 2), called by the main `component` skill:
  - Rules: never invent; written into `guidelines.md` only once approved; start from the approved spec and never contradict it (a gap in the spec sends it back for approval first); use the approved names; templates and pages skip this stage.
  - The 8 approved sections (step 6): when to use, when not to use (with the alternative component), usage best practices, do's and don'ts with visual examples, content guidelines, behavior, accessibility, related components.
  - Process: prepare from the spec → propose and approve section by section → visual do / don't examples built with the design preview → accessibility section and check → write `guidelines.md` → approval gate.
  - Keeping guidelines up to date when coding or prototyping reveals a new rule.
- Backlog: "Skill: component-guidelines" in progress; added a proposal to show the do / don't examples visually in the Guidelines tab of the documentation site.

**Files**
- `.claude/skills/component-guidelines/SKILL.md` (new)
- `backlog/backlog.json` (updated)

---

## Step 51 — Skill: component-code
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Approved the `component-guidelines` skill (backlog item set to done).
- CSS class naming for components:
  - Variant values: **BEM modifiers** — `.ds-button--primary`, `.ds-button--md`.
  - Internal parts: **single dash** — `.ds-button-icon`, `.ds-button-label`.

**What was done**
- Wrote the sub-skill **`component-code`** (stage 3), called by the main `component` skill:
  - Rules: the approved spec is the source of truth (a gap sends it back for approval); semantic tokens only, never raw values or primitives; the design preview is not reused as code.
  - Files: `<Name>.tsx`, `<Name>.css`, `examples.tsx`, export in `components/index.ts`.
  - Class naming (approved), native states instead of state classes.
  - React / TypeScript: prop names and values = approved variant properties and values, approved defaults, native elements, attribute pass-through.
  - Styles: state layers in the content color, always-visible focus, disabled roles, motion tokens only, approved text styles, overflow as approved, no `!important`.
  - Accessibility (WCAG 2.2 AA), examples (every allowed combination, states, short / long text), verification (type check, build, Examples vs Design preview, keyboard, mobile, accessibility check), approval gate.
- Updated the code templates (`ComponentName.tsx`, `ComponentName.css`) to follow these rules.
- Added the class naming to `CLAUDE.md`. Backlog: "Skill: component-code" in progress.

**Files**
- `.claude/skills/component-code/SKILL.md` (new)
- `components/_template/ComponentName.tsx`, `components/_template/ComponentName.css`, `CLAUDE.md`, `backlog/backlog.json` (updated)

---

## Step 52 — component-code approved
**Date:** 2026-10-16

- The Design System Lead approved the `component-code` skill (backlog item set to done).
- Next: the first component.

---

## Step 53 — Rule: design first
**Date:** 2026-10-16

**Decision (Design System Lead)**
- For every component, **always start with the design, built from the information the Design System Lead gives**; the guidelines (usage) come after.

**What was done**
- `component-spec` step 1 rewritten: ask for the Design System Lead's design information (look, content, variants, sizes, states, references); **no usage questions** at this stage (they belong to `component-guidelines`); build the design preview from their information as soon as possible.
- Rule added to the main `component` skill and to `CLAUDE.md`.

**Files**
- `.claude/skills/component-spec/SKILL.md`, `.claude/skills/component/SKILL.md`, `CLAUDE.md` (updated)

---

## Step 54 — Button: identity and first design information
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Identity approved: **Button**, folder `components/Button/`, class `.ds-button`, level **atom**, description "Triggers an action."
- Hierarchy: **primary, secondary, tertiary (text), danger**.
- Sizes: **one size**.
- Content: **text only** and **icon before the text**.
- Rule added to the `component-spec` skill: **ask the design questions as a questionnaire with choices** (question tool, several questions per round); the first round always covers identity, hierarchy, sizes and content; then follow-up rounds.

**What was done**
- Created `components/Button/` with `meta.json` (status `design`) and the first **design preview** (`design/Preview.tsx`, `design/tokens.json`): the four hierarchy levels, text only and with a leading icon, all states. Token choices are proposals to test in the Design preview tab.

**Files**
- `components/Button/meta.json`, `components/Button/design/Preview.tsx`, `components/Button/design/tokens.json` (new)
- `.claude/skills/component-spec/SKILL.md` (updated)

---

## Step 55 — Button: design details
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Secondary: **cream background** (`background.brand-subtle`).
- Corners: **`radius.8`**.
- Width: **content width only** (no full-width option).
- States: interaction states + disabled only (**no loading**).
- **One type**.
- Long label: **ellipsis** (single line, cut with "…").
- Leading icon size: **`icon-size.20`**.
- Padding: **16 × 8** (`space.16` horizontal, `space.8` vertical).

**What was done**
- Updated the design preview: the label is cut with an ellipsis when too long.

**Files**
- `components/Button/design/Preview.tsx` (updated)

---

## Step 56 — Button: props, content and danger style
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Prop names: **`variant`** (primary, secondary, tertiary, danger) and **`icon`** (leading icon name).
- Label: **25 characters maximum** (content rule); cut with an ellipsis when space is missing.
- Tertiary disabled: **no background** (only the text turns to the disabled color).
- Danger: **light error background** (`background.error-subtle`) with `text.error` / `icon.error`.

**What was done**
- Design preview updated: danger style, tertiary disabled override. The preview tool now supports variant-specific state overrides (`variantStates` in `design/tokens.json`).
- Showed the full variant matrix (4 variants × text only / with icon × 5 states, plus a long label with ellipsis).

**Files**
- `components/Button/design/tokens.json`, `docs/src/DesignPreview.tsx`, `docs/src/types.ts` (updated)

---

## Step 57 — Button: spec written and accessibility check
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Default variant: **primary**. No forbidden combination.
- Accessibility check finding: with the pressed state layer (24%), the label contrast drops to 3.58:1 (primary) and 4.33:1 (tertiary). **Accepted**: the pressed state is momentary.

**What was done**
- Wrote `components/Button/spec.md` from the approved decisions: purpose, type, anatomy, variant properties (`variant`, `icon`), combinations, content (25 characters, ellipsis), size, states, full token table, contrast tables (default and with state layers).
- Ran the accessibility check: base contrasts all AA; focus outline 6.10:1 on the page; target ≈ 37px high (≥ 24px); contrast with state layers computed and documented.

**Files**
- `components/Button/spec.md` (new)

---

## Step 58 — Button: stage 1 (Design) approved
**Date:** 2026-10-16

- The Design System Lead approved the Button design spec.
- `components/Button/meta.json` status → `guidelines`; backlog stage → `guidelines`.

---

## Step 59 — Avatar logo illustration (variant C)
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- A kawaii self-portrait illustration, to be used later as the app logo. Mood inspired by Pompompurin (Sanrio): softness and warm colors only, none of the character's features.
- Colors from the design system palettes only. Holding a laptop; no hearts; big spiral curls with curly bangs; hoop earrings.
- **Variant C** chosen after testing three variants at 16–96px in the docs site header (temporary in-browser test, no site files changed).

**Colors used:** background `primary-600`, skin `primary-300`, hair `primary-950` with curl lines `primary-800`, cardigan `secondary-600`, top `secondary-50`, laptop `primary-800`, blush `primary-400`, hoops `secondary-900`, eyes and lines `primary-950`.

**Notes**
- The SVG uses hard-coded hex values (a standalone image file cannot read CSS custom properties).
- At 16px, details are lost; a simplified small-size version may be needed for a favicon.

**Files**
- `assets/logo/avatar-logo.svg` (new)

---

## Step 60 — Avatar logo in the docs site header
**Date:** 2026-10-16

- The Design System Lead asked to show the logo in the documentation site header.
- Replaced the `palette` icon of the header brand with `assets/logo/avatar-logo.svg`, shown at 32px (`--space-32`). The image has an empty `alt`, since the "BuildDesignSystem" text next to it already names the link.
- The brand (logo and name) stays hidden on narrow screens, as before.

**Files**
- `docs/src/AppShell.tsx`, `docs/src/docs.css` (updated)

---

## Step 59 — Button: guidelines written
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- When to use: submit / confirm, start an action, open an element, cancel / close; the button **can also go to another page** (rendered as a link).
- When not to use: an on / off choice.
- Hierarchy table approved (role, how many, examples); **no limit** on the number of primary buttons; primary and danger **can be side by side**.
- Groups: main action **on the right**; space between buttons **`--space-8`**; on small screens the buttons **wrap to a new line** keeping their order.
- Content: start with a verb, sentence case, no final punctuation, avoid vague labels.
- Disabled: allowed **only with an explanation**; implemented with the **native `disabled`** (skipped by the Tab key).
- Danger: an **irreversible** action asks for a confirmation.
- Related components: **none for now**.
- Do's and don'ts approved: clear verb vs vague label, main action on the right, danger for delete, explained disabled state.

**What was done**
- Wrote `components/Button/guidelines.md` with all sections (when to use, when not to use, best practices with the hierarchy table and groups, do's and don'ts, content, behavior, accessibility, related components).
- Showed the do / don't pairs visually in the chat.

**Spec impact found**
- Navigation was not in the approved spec (purpose "Triggers an action."). Proposed to update the spec before approving the guidelines.

**Files**
- `components/Button/guidelines.md` (new)

---

## Step 60 — Button: spec update and stage 2 (Guidelines) approved
**Date:** 2026-10-16

- The Design System Lead approved the spec update: purpose "Triggers an action or goes to another page."; rendered as `<button>` for an action and `<a href>` for navigation, same look.
- `meta.json` description updated accordingly.
- The Design System Lead approved the Button guidelines.
- `meta.json` status → `code`; backlog stage → `code`.

**Files**
- `components/Button/spec.md`, `components/Button/meta.json`, `backlog/backlog.json` (updated)

---

## Step 61 — Button: code
**Date:** 2026-10-16

**What was done**
- Wrote the developed Button from the approved spec and guidelines (`component-code` skill):
  - `components/Button/Button.tsx`: props `variant` (primary | secondary | tertiary | danger, default primary), `icon` (leading Material Symbols name, decorative), label as children; rendered as `<button>`, or as `<a href>` when `href` is given (a link cannot be disabled — enforced by the types); native attributes and `className` passed through.
  - `components/Button/Button.css`: semantic tokens only; `.ds-button`, modifiers `.ds-button--<variant>`, parts `.ds-button-icon` / `.ds-button-label`; state layers (hover / focus / pressed) in the content color; visible focus outline; native disabled with the disabled roles and no state layer (tertiary disabled without background); single-line label with ellipsis.
  - `components/Button/examples.tsx`: every variant (text only, with icon, disabled), default variant, navigation, button group, content (short, 25 characters, long label with ellipsis).
  - Exported from `components/index.ts`.
- Verification: type check and build pass; Examples tab checked in the browser against the Design preview (same colors: primary #795b55 / white, secondary #f5f3bb / #242424, tertiary transparent / #795b55, danger #fff8f7 / #87332d; height 37px); keyboard focus outline visible (2px, #795b55); link rendered as `<a>`; disabled buttons are native `disabled`.

**Open question**
- Default `type` of the `<button>`: the HTML default is `submit` inside a form.

**Files**
- `components/Button/Button.tsx`, `components/Button/Button.css`, `components/Button/examples.tsx` (new)
- `components/index.ts` (updated)

---

## Step 62 — Button: default type and stage 3 (Code) approved
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- Default button type: **`type="button"`** — in a form, only a button set as `type="submit"` sends the form (avoids sending a form by mistake).
- The Design System Lead approved the Button code.

**What was done**
- `Button.tsx`: `<button>` rendered with `type="button"` by default (can be overridden).
- `guidelines.md` (Behavior): new rule — in a form, the button that sends the form must be a submit button.
- `meta.json` status → `prototype`; backlog stage → `prototype`.

**Files**
- `components/Button/Button.tsx`, `components/Button/guidelines.md`, `components/Button/meta.json`, `backlog/backlog.json` (updated)

---

## Step 61 — Work-time digital clock in the docs site header
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- A digital clock on the right of the header shows the time spent building the site, format `HH:MM:SS`.
- Measured from the Claude Code session logs of this project; pauses longer than 15 minutes are not counted.
- Font **VT323**; dark screen look: `primary-950` background, `secondary-600` digits.
- The clock **replaces** the Backlog and Prototypes header shortcuts (both stay in the side navigation).

**What was done**
- `vite.config.ts`: new dev-only endpoint `/api/work-time` that reads `~/.claude/projects/<project>/*.jsonl`, sums the gaps between logged events (≤ 15 min) and returns the total and the last activity time.
- `docs/src/AppShell.tsx`: `WorkTime` component; refreshes every minute and ticks every second while a session is active (last activity < 15 min). Hidden if the endpoint is unavailable. Screen readers get a "Time spent building this site" label; no live region (it would announce every second).
- `docs/src/docs.css`: VT323 loaded for the site only (not a design system font); `.shell-work-time` styles; removed the unused `.shell-actions` styles. Hidden on narrow screens, like the shortcuts before.
- Note: the clock uses primitive color tokens directly, since no semantic role matches this pair; it is site-only, not a design system component.

**Files**
- `vite.config.ts`, `docs/src/AppShell.tsx`, `docs/src/docs.css` (updated)

---

## Step 63 — Prototype stage removed, Button complete, Code tab
**Date:** 2026-10-16

**Decisions (Design System Lead)**
- **The Prototype stage is removed for all components.** The workflow is now **Design → Guidelines → Code** (templates and pages: Design → Code). A component is complete once its code is approved. Interactive mockups (user journeys) are made separately, with the coded components.
- A **Code tab** on every component page of the documentation site.

**What was done**
- Updated the workflow in `CLAUDE.md`, the `component` and `component-structure` skills, `components/README.md`, and the documentation site (stage badges and backlog stage menu now show three stages).
- **Button complete**: `meta.json` status back to `code` (last stage); backlog item set to **done**.
- New **Code** tab on component pages: the import line and the source of the component files (`.tsx`, `.css`, without examples and design preview), each with a Copy button.

**Files**
- `CLAUDE.md`, `.claude/skills/component/SKILL.md`, `.claude/skills/component-structure/SKILL.md`, `components/README.md`, `docs/src/types.ts`, `docs/src/StageBadge.tsx`, `docs/src/pages/BacklogPage.tsx`, `docs/src/registry.ts`, `docs/src/pages/ComponentPage.tsx`, `docs/src/docs.css`, `components/Button/meta.json`, `backlog/backlog.json` (updated)

---

## Step 62 — Label next to the work-time clock
**Date:** 2026-10-16

- The Design System Lead chose the label **"Time spent building"**, plain text on the left of the clock screen.
- The label uses `color.text.secondary` and the `label-sm` text style. It replaces the visually hidden screen-reader label, so the clock is named the same way for everyone.
- New contrast pair `color.text.secondary` on `color.background.brand-subtle` (the header background) added to `tokens/contrast-pairs.json`; `npm run tokens`: 43/43 pairs pass AA.

**Files**
- `docs/src/AppShell.tsx`, `docs/src/docs.css`, `tokens/contrast-pairs.json`, `tokens/tokens.css` (regenerated)

---

## Step 64 — Complete badge
**Date:** 2026-10-16

**Decision (Design System Lead)**
- Add a **Complete** badge for finished components.

**What was done**
- New `meta.json` status **`complete`**, set once the code stage is approved.
- Documentation site: for a complete component, every stage is shown checked and a green **Complete** badge (with an icon) is added; finished stages show a check icon.
- Button `meta.json` status → `complete`.
- Documented in `CLAUDE.md`, the `component` skill and `components/README.md`.

**Files**
- `docs/src/StageBadge.tsx`, `docs/src/types.ts`, `docs/src/registry.ts`, `docs/src/docs.css`, `components/Button/meta.json`, `CLAUDE.md`, `.claude/skills/component/SKILL.md`, `components/README.md` (updated)

---

## Step 65 — Side navigation and Navigation item: identity
**Date:** 2026-10-19

**Decisions (Design System Lead)**
- **SideNavigation**: folder `components/SideNavigation/`, class `.ds-side-navigation`, description "Main navigation of an application, displayed on the side of the page.", level **organism**.
- Content: **links with an icon and a label**. **Always expanded** (no collapsed or mobile-hidden version).
- The navigation links are a **separate component**: **NavigationItem** — folder `components/NavigationItem/`, class `.ds-navigation-item`, description "A link in a navigation, with an icon and a label.", level **molecule**.
- Order: **NavigationItem first, through all its stages**, then the SideNavigation that uses it.

**What was done**
- Created `components/SideNavigation/meta.json` and `components/NavigationItem/meta.json` (status `design`).
- Backlog: Side navigation in progress; added "Navigation item" (decided, in progress, stage design).

**Files**
- `components/SideNavigation/meta.json`, `components/NavigationItem/meta.json` (new)
- `backlog/backlog.json` (updated)

---

## Step 66 — Navigation item: first design information
**Date:** 2026-10-19

**Decisions (Design System Lead)**
- Background: the item sits on the **brand background** (the side navigation).
- Content: **icon (required) + label**, and a **counter**, which will be the **future Badge component**.
- States: hover / focus / pressed, **current page**, **disabled**.
- **One size**.
- Current page: **cream background, brown text** (`background.brand-subtle` + `text.brand`, 5.35:1).
- Disabled on brown: **dimmed white** — needs a new opacity token (backlog item "Opacity for disabled elements").

**What was done**
- Created the first design preview (`components/NavigationItem/design/`): items on the brand surface, default and current, with a counter mock-up; token proposals to test in the Design preview tab.

**Dependencies found**
- The counter needs the **Badge** component (backlog "Tag / Badge").
- The disabled state needs an **opacity token**.

**Files**
- `components/NavigationItem/design/Preview.tsx`, `components/NavigationItem/design/tokens.json` (new)

---

## Step 67 — Opacity token for disabled elements
**Date:** 2026-10-19

**Decisions (Design System Lead)**
- Order of work: **opacity token → Navigation item without counter → Badge** (the counter is added to the Navigation item after the Badge exists).
- The counter component is named **Badge** (a Tag would be a separate component, later). Backlog "Tag / Badge" renamed **Badge**, status todo.
- Disabled opacity: **0.38**, token **`opacity.disabled`** (semantic, named by usage).
- Scope: **colored backgrounds only** (brand, dark); on light backgrounds the disabled color roles stay (Button unchanged).

**What was done**
- Added `opacity.disabled` to `tokens/semantic.json` → `--opacity-disabled: 0.38`.
- Added the opacity pattern to the `token-naming` skill and to `CLAUDE.md`.
- Navigation item preview: counter removed for now; disabled state shown with `--opacity-disabled`.
- Backlog: "Opacity for disabled elements" done.

**Files**
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md`, `components/NavigationItem/design/Preview.tsx`, `components/NavigationItem/design/tokens.json`, `backlog/backlog.json` (updated)

---

## Step 68 — Navigation item: design details
**Date:** 2026-10-19

**Decisions (Design System Lead)**
- Label text style: **`body`** (regular), **`label`** (semibold) for the current page.
- Padding **8 × 8** (`space.8`), corners **`radius.8`**.
- The item takes the **full width** of the navigation; a long label **wraps to a new line**.
- Label: **20 characters maximum**.

**What was done**
- Design preview: the label now wraps instead of being cut.

**Files**
- `components/NavigationItem/design/Preview.tsx` (updated)

---

## Step 69 — Navigation item: focus ring token and spec written
**Date:** 2026-10-19

**Decisions (Design System Lead)**
- Icon **aligned with the first line** when the label wraps.
- The item is **always a link** (`<a href>`).
- Props: **`icon`, `href`, `current`, `disabled`**.
- Pressed state contrast below AA (3.58:1 default, 3.87:1 current): **accepted** as momentary, like the Button.
- New semantic role **`color.border.focus-inverse`** = `neutral-0` (white): focus ring on brand or dark backgrounds (6.10:1 on brand).

**What was done**
- Added `color.border.focus-inverse` to `tokens/semantic.json`, and its contrast pairs (on brand, on inverse) to `tokens/contrast-pairs.json`: 45/45 pairs pass.
- Updated the `token-naming` skill (border roles) and `CLAUDE.md` (44 roles).
- Design preview: icon aligned to the top, white focus ring.
- Wrote `components/NavigationItem/spec.md` (purpose, type, anatomy, props, content, size, states, tokens, contrast). Open questions: the counter (after the Badge) and a proposed forbidden combination (`current` + `disabled`).

**Files**
- `components/NavigationItem/spec.md` (new)
- `tokens/semantic.json`, `tokens/contrast-pairs.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md`, `components/NavigationItem/design/Preview.tsx`, `components/NavigationItem/design/tokens.json` (updated)

---

## Step 70 — Navigation item: stage 1 (Design) approved
**Date:** 2026-10-19

- The Design System Lead approved the forbidden combination **`current` + `disabled`** (the current page is always available), now in the spec.
- The Design System Lead approved the Navigation item design spec.
- `meta.json` status → `guidelines`; backlog stage → `guidelines`.

**Files**
- `components/NavigationItem/spec.md`, `components/NavigationItem/meta.json`, `backlog/backlog.json` (updated)

---

## Step 71 — Navigation item: guidelines written
**Date:** 2026-10-19

**Decisions (Design System Lead)**
- When to use: in the **side navigation**.
- When not to use: for an **action** (use a Button), on a **light background**, for a **link inside a text**.
- **Exactly one current item**.
- Disabled: **to avoid** — prefer hiding the item.
- Content: a noun, not a verb; same as the page title; sentence case; no punctuation.
- Icons: a different icon for each item; consistent with the label.
- Space between items: **`--space-8`**.
- Do's and don'ts: short vs long label; link, not action; hide rather than disable.

**What was done**
- Wrote `components/NavigationItem/guidelines.md` (when to use, when not to use, best practices, do's and don'ts, content, behavior, accessibility, related components).

**Files**
- `components/NavigationItem/guidelines.md` (new)

---

## Step 72 — Navigation item: related components
**Date:** 2026-10-19

- The Design System Lead removed **Button** from the related components; only **Side navigation** remains.

**Files**
- `components/NavigationItem/guidelines.md` (updated)

---

## Step 73 — Navigation item: code
**Date:** 2026-10-19

**What was done**
- The Design System Lead approved the Navigation item guidelines; status → `code`, backlog stage → `code`.
- Wrote the developed Navigation item (`component-code` skill):
  - `NavigationItem.tsx`: props `icon` (required), `href` (required), `current`, `disabled`; always an `<a>`; `current` → `aria-current="page"`; `disabled` → no `href` + `aria-disabled` (not reachable with Tab, not activated); `current` + `disabled` forbidden by the types.
  - `NavigationItem.css`: semantic tokens only; `.ds-navigation-item`, parts `-icon` / `-label`; state layers in the content color; white focus ring (`--color-border-focus-inverse`); current page (cream background, brown label, `label` text style); disabled with `--opacity-disabled`, no state layer; label wraps, icon aligned with the first line.
  - `examples.tsx`: default, current, disabled, a navigation of four items, 20-character and long labels — all on the brand background.
  - Exported from `components/index.ts`.
- Verification: type check and build pass; in the browser — default white on transparent, 37px high, regular; current cream #f5f3bb / brown #795b55, semibold; disabled opacity 0.38, no href, not focusable; focus ring 2px white.

**Files**
- `components/NavigationItem/NavigationItem.tsx`, `components/NavigationItem/NavigationItem.css`, `components/NavigationItem/examples.tsx` (new)
- `components/index.ts`, `components/NavigationItem/meta.json`, `backlog/backlog.json` (updated)

---

## Step 74 — Navigation item: `current` renamed `selected`
**Date:** 2026-10-20

**Decision (Design System Lead)**
- The `current` prop and state are renamed **`selected`**.

**What was done**
- Renamed everywhere in the Navigation item: spec (props table, forbidden combination `selected` + `disabled`, states, token and contrast tables), guidelines ("one selected item, always"), code (`selected` prop, types), examples, and the design preview variant.
- Accessibility unchanged: the selected item is still announced to screen readers as the **current page** (`aria-current="page"`), the standard for navigation.
- Type check passes.

**Files**
- `components/NavigationItem/spec.md`, `guidelines.md`, `NavigationItem.tsx`, `NavigationItem.css`, `examples.tsx`, `design/tokens.json` (updated)

---

## Step 75 — Navigation item complete
**Date:** 2026-10-20

- The Design System Lead approved the Navigation item code.
- `meta.json` status → `complete`; backlog item → done.
- Next: the Side navigation (design stage).

---

## Step 76 — Side navigation: design and spec
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Width **240px**, as a new token **`size.side-navigation`** (new category `size`, named by usage).
- **Full height** of the screen (scrolls when the items do not fit).
- Padding **`space.16`**; space between items **`space.8`** (as in the NavigationItem guidelines).
- **No extra zone** (no section titles, no logo, no bottom links).
- **No separation** from the page content (the brand background is enough).
- Accessible name: **"Main navigation" by default**, can be changed by each product.

**What was done**
- Added `size.side-navigation` = 240px to `tokens/semantic.json`; documented in the `token-naming` skill and `CLAUDE.md`.
- Created the design preview (`components/SideNavigation/design/`), built with the coded NavigationItem.
- Wrote `components/SideNavigation/spec.md`.

**Files**
- `components/SideNavigation/design/Preview.tsx`, `components/SideNavigation/design/tokens.json`, `components/SideNavigation/spec.md` (new)
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md` (updated)

---

## Step 77 — Side navigation: stage 1 (Design) approved
**Date:** 2026-10-20

- The Design System Lead approved the prop name **`label`** (accessible name, default "Main navigation") and the Side navigation design spec.
- `meta.json` status → `guidelines`; backlog stage → `guidelines`.

---

## Step 78 — Side navigation: guidelines written
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- When to use: the **main navigation** of an application.
- When not to use: to **navigate within a page**.
- Number of items: **no limit**. Order of the items: **to be defined later**.
- Placement: **always on the left**. **One side navigation per page**.
- Do's and don'ts: one selected item; only NavigationItems inside.
- Related components: **NavigationItem**.

**What was done**
- Wrote `components/SideNavigation/guidelines.md`. The accessibility section describes a navigation landmark with a list of links (Tab order, selected item announced as current page).

**Files**
- `components/SideNavigation/guidelines.md` (new)

---

## Step 79 — Side navigation: code
**Date:** 2026-10-20

**What was done**
- The Design System Lead approved the Side navigation guidelines; status → `code`, backlog stage → `code`.
- Wrote the developed Side navigation (`component-code` skill):
  - `SideNavigation.tsx`: a `<nav>` named by `label` (default "Main navigation") containing a list (`<ul>` / `<li>`) of NavigationItem children — screen readers announce a navigation region with a list of links.
  - `SideNavigation.css`: semantic tokens only — width `--size-side-navigation`, padding `--space-16`, gap `--space-8`, background `--color-background-brand`; full screen height (`100dvh`) with vertical scroll when the items do not fit.
  - `examples.tsx`: default (5 items, one selected) and many items (8 items, scrolling, custom label "Admin navigation"); the height is reduced in the documentation.
  - Exported from `components/index.ts`.
- Verification: type check and build pass; in the browser — 240px wide, brown background, 16px padding, 8px gap, items rendered as list entries, accessible names correct, the 8-item example scrolls.

**Files**
- `components/SideNavigation/SideNavigation.tsx`, `components/SideNavigation/SideNavigation.css`, `components/SideNavigation/examples.tsx` (new)
- `components/index.ts`, `components/SideNavigation/meta.json`, `backlog/backlog.json` (updated)

---

## Step 80 — Side navigation complete
**Date:** 2026-10-20

- The Design System Lead approved the Side navigation code.
- `meta.json` status → `complete`; backlog item → done.

---

## Step 81 — Skill: layout
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- **Page margin: 24px** (`--space-24`) around the content of the page.
- **Vertical spacing between items: 16px** (`--space-16`) between blocks of content stacked vertically.
- No dedicated layout tokens: the skill uses the `--space-*` tokens directly.
- Scope: **the whole documentation site**.

**What was done**
- Created the skill **`layout`** (`.claude/skills/layout/SKILL.md`) with these rules, how they are applied, and what is not decided yet (other scopes, horizontal spacing, max width).
- Applied the rules to the documentation site: content area padding `--space-24` on every screen size (was 40 × 48, 24 × 16 on mobile); blocks stacked with a `--space-16` gap.
- Added the rule to `CLAUDE.md` and the skill to the backlog (done).

**Files**
- `.claude/skills/layout/SKILL.md` (new)
- `docs/src/docs.css`, `CLAUDE.md`, `backlog/backlog.json` (updated)

---

## Step 82 — Skill: page-header
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- A skill for the **page header**: the page title and the subtitle under it.
- Text styles: **`heading-1`** for the title, **`lead`** for the subtitle.
- **One line maximum** for each. Both rules together: a **maximum length** (title **30**, subtitle **80** characters) **and** an automatic ellipsis as a safety net.
- Skill name: **`page-header`**.

**What was done**
- Created `.claude/skills/page-header/SKILL.md`: rules, typography tokens of both styles (with their values), the one-line CSS, where it applies (site pages, component descriptions in `meta.json`), and what is not decided yet (colors, section titles).
- Applied to the documentation site: title and subtitle on one line with an ellipsis; full text on hover on component pages; `lead` now also uses its font weight token.
- Shortened three subtitles that were longer than 80 characters (Tokens, Icons, Backlog): the extra details moved to a normal paragraph under the header. The home page sentence now uses the `lead` style.
- Checked component names and descriptions: all within the limits (max 14 and 69 characters).
- Added the rule to `CLAUDE.md` and the skill to the backlog (done).

**Files**
- `.claude/skills/page-header/SKILL.md` (new)
- `docs/src/docs.css`, `docs/src/pages/BacklogPage.tsx`, `docs/src/pages/IconsPage.tsx`, `docs/src/pages/TokensPage.tsx`, `docs/src/pages/ComponentPage.tsx`, `index.html`, `CLAUDE.md`, `backlog/backlog.json` (updated)

---

## Step 83 — Page header colors
**Date:** 2026-10-20

- The Design System Lead approved the page header colors: title **`--color-text-primary`**, subtitle **`--color-text-secondary`** (already used on the site).
- Added to the `page-header` skill rules table; removed from its open questions.

**Files**
- `.claude/skills/page-header/SKILL.md` (updated)

---

## Step 84 — Layout skill: page header placement
**Date:** 2026-10-20

- At the Design System Lead's request, added the **placement of the page header** to the `layout` skill: at the top of the content area as its first block, inside the 24px margin, aligned left, title then subtitle separated by 16px, the rest of the page 16px below.
- For the text itself, the `layout` skill redirects to the **`page-header`** skill.

**Files**
- `.claude/skills/layout/SKILL.md` (updated)

---

## Step 85 — Rule: building blocks
**Date:** 2026-10-20

**Decision (Design System Lead)**
- A component made of repeated elements is **split into building blocks** (e.g. the **step** of a timeline). Each building block is a separate component, **built first through all its stages**, then the parent component.

**What was done**
- Added a "Building blocks" section to the `component-structure` skill (how to identify, build order, what belongs to the block vs the parent, approval of the split and names; example NavigationItem → SideNavigation).
- Referenced the rule in the main `component` skill ("Before starting").
- Next: the Timeline component, starting with its building block, the step.

**Files**
- `.claude/skills/component-structure/SKILL.md`, `.claude/skills/component/SKILL.md` (updated)

---

## Step 86 — Timeline and Timeline step: identity
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Building block **TimelineStep**: folder `components/TimelineStep/`, class `.ds-timeline-step`, description "One step of a timeline: an event or a stage, with its marker and its content.", level **molecule**.
- Parent **Timeline**: folder `components/Timeline/`, class `.ds-timeline`, description "A sequence of steps or events, in chronological order.", level **organism**.
- Orientation: **vertical**.

**What was done**
- Created both `meta.json` (status `design`).
- Backlog: "Timeline step" (decided, in progress, stage design) and "Timeline" (decided, todo).

**Files**
- `components/TimelineStep/meta.json`, `components/Timeline/meta.json` (new)
- `backlog/backlog.json` (updated)

---

## Step 87 — Timeline step: first design information
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Marker: a **dot**, **cream fill with a brown outline**.
- Content: **title**, **description** and a **date range** — all **required**.
- **No status** (no completed / current / upcoming): the date range situates the event.
- The **line to the next step belongs to the step** (the last step has none).
- Date range: **always a range** (no single date), format **"12 Oct 2026 – 16 Oct 2026"** (full dates on both sides), placed **to the right of the title, aligned right**.

**What was done**
- Created the design preview (`components/TimelineStep/design/`): three steps in a row (to show the line), title + date range on the first line, description below; token proposals to test in the Design preview tab.

**Files**
- `components/TimelineStep/design/Preview.tsx`, `components/TimelineStep/design/tokens.json` (new)

---

## Step 88 — Timeline step: spec written
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Marker outline: reuse **`color.icon.brand`** (no new token).
- Sizes approved: marker 16px with a 2px outline, 16px between marker and content, 4px between title and description, 24px between steps.
- Text approved: title `label` + `text.primary`; date range `caption` + `text.secondary`; description `body` + `text.secondary`; line `border.default` 2px.
- Long title: **wraps**, the date range stays on the right.
- Max lengths: title **60**, description **150** characters.
- Dot **centered on the first line** of the title.
- Props: **`title`, `startDate`, `endDate`, `children`** (description).

**What was done**
- Design preview updated (title wraps beside the date range, dot centered on the first line).
- Wrote `components/TimelineStep/spec.md` (purpose, anatomy, props, content, sizes, no states, tokens, contrast).

**Files**
- `components/TimelineStep/spec.md` (new)
- `components/TimelineStep/design/Preview.tsx` (updated)

---

## Step 89 — Wider design preview for stateless components
**Date:** 2026-10-20

- At the Design System Lead's request, the Timeline step preview is wider: the text was cramped in five narrow state columns.
- The design preview tool now supports `previewStates` in `design/tokens.json`: a component without interaction states shows a **single, wide canvas** (up to 640px). The Timeline step uses `["default"]`.

**Files**
- `docs/src/DesignPreview.tsx`, `docs/src/types.ts`, `docs/src/docs.css`, `components/TimelineStep/design/tokens.json` (updated)

---

## Step 90 — Timeline step: space between title and date range
**Date:** 2026-10-20

- Decision of the Design System Lead: **16px** (`--space-16`) between the title and the date range (minimum space, the date range stays aligned right).
- Added the `title-date-gap` slot to the design preview and the value to the spec (sizes and token tables).

**Files**
- `components/TimelineStep/design/tokens.json`, `components/TimelineStep/design/Preview.tsx`, `components/TimelineStep/spec.md` (updated)

---

## Step 91 — Timeline step: date range right after the title
**Date:** 2026-10-20

- The space looked large because the date range was pushed to the right edge (16px was only a minimum).
- Decision of the Design System Lead: the **date range comes right after the title, 16px to its right** (no more right alignment).
- Updated the design preview and the spec (anatomy, content overflow, sizes).

**Files**
- `components/TimelineStep/design/Preview.tsx`, `components/TimelineStep/design/tokens.json`, `components/TimelineStep/spec.md` (updated)

---

## Step 92 — Timeline step: back to right alignment, timeline max width
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Back to the **date range aligned right** (16px minimum from the title).
- To reduce the space, the timeline gets a **maximum width of 400px**, as a new token **`size.timeline`**.

**What was done**
- Added `size.timeline` = 400px to `tokens/semantic.json`; documented in the `token-naming` skill and `CLAUDE.md`.
- Design preview: date range aligned right again; steps shown at the timeline maximum width.
- Spec: anatomy and content back to right alignment; the step takes the full width of the timeline (max `--size-timeline`).

**Files**
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md`, `components/TimelineStep/design/Preview.tsx`, `components/TimelineStep/spec.md` (updated)

---

## Step 63 — Landing page animation: the avatar types
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- The landing page (`/`) gets an animation: the avatar types on its laptop, with the work-time clock next to it. It plays **once**, on load.

**What was done**
- `index.html`: new hero above the title — the avatar (inline copy of `assets/logo/avatar-logo.svg`, decorative, with classes on the hands) and the "Time spent building" clock.
- `docs/src/docs.css`: the hands move up and down in turn (`home-typing`, 12 × `--duration-200`, ≈ 2.4s), so the animation is skipped with `prefers-reduced-motion`. Clock screen styled like the header clock, larger (`--font-size-40`).
- `home.ts` (new): reads `/api/work-time`, counts the clock up from 00:00:00 to the real total in 2.4s (ease-out), then keeps ticking live during an active session. With reduced motion, the total is shown at once. Hidden if the endpoint is unavailable.
- `tsconfig.json`: includes `home.ts`.

**Files**
- `index.html`, `home.ts` (new), `docs/src/docs.css`, `tsconfig.json`

---

## Step 93 — Timeline step: clickable
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Steps are **always clickable**: a **link to a section of the same page** (anchor), the **whole content** is the clickable area.
- New state **selected** (the step of the section shown): the **marker becomes solid brown** (`icon.brand`).
- Clickable area: `space.8` padding, `radius.8` corners.
- Props: **`href`** and **`selected`**.
- Accessibility check: with the focus state layer, the secondary texts dropped to 4.35:1. Decision: **date range and description in `text.primary`** (all texts now pass AA in every state: hover 13.32, focus 12.29, pressed 9.51).

**What was done**
- Design preview: clickable area with state layers and focus outline, `selected` variant (the other steps keep the default marker), all interaction states shown.
- Spec updated: purpose (clickable), anatomy (clickable area), props, sizes, states, tokens and contrast.

**Files**
- `components/TimelineStep/design/Preview.tsx`, `components/TimelineStep/design/tokens.json`, `components/TimelineStep/spec.md` (updated)

---

## Step 94 — Design preview: horizontal scroll
**Date:** 2026-10-20

- The Design System Lead reported unreadable text in the Timeline step preview: the four state columns were too narrow (title and date range overlapped).
- The design preview tool now lays out the states in a row that **scrolls horizontally**; each state keeps a minimum width. New option `previewMinWidth` in `design/tokens.json` (Timeline step: 440px). The row is keyboard-focusable so it can be scrolled with the arrow keys.
- Checked in the browser: text readable, the row scrolls (1808px of content in 976px).

**Files**
- `docs/src/DesignPreview.tsx`, `docs/src/types.ts`, `docs/src/docs.css`, `components/TimelineStep/design/tokens.json` (updated)

---

## Step 95 — Timeline step: stage 1 (Design) approved
**Date:** 2026-10-20

- The Design System Lead approved the Timeline step design spec.
- `meta.json` status → `guidelines`; backlog stage → `guidelines`.

---

## Step 96 — Timeline step: guidelines written
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- When to use: **in a Timeline** only.
- When not to use: on its own, without dates, to go to another page.
- **One selected step**; **chronological order** (oldest to most recent).
- Content: title = a noun or an event, sentence case; description = one or two sentences.
- On click: **direct jump** to the section (no smooth scrolling).
- Do's and don'ts: chronological order, one selected step, short title, always a range.
- Related components: **Timeline**.

**What was done**
- Wrote `components/TimelineStep/guidelines.md`. Accessibility: the selected step is announced as the current location (`aria-current="location"`, the standard for an in-page position), and is shown by a change of shape (solid marker), not only of color.

**Files**
- `components/TimelineStep/guidelines.md` (new)

---

## Step 97 — Timeline step: code
**Date:** 2026-10-20

**What was done**
- The Design System Lead approved the Timeline step guidelines; status → `code`, backlog stage → `code`.
- Wrote the developed Timeline step (`component-code` skill):
  - `TimelineStep.tsx`: props `title`, `startDate`, `endDate` (Date objects), `href` (anchor), `selected`, `children` (description). The whole content is an `<a href>`; the selected step has `aria-current="location"`; dates rendered as `<time>` in the approved format "12 Oct 2026 – 16 Oct 2026" (en-GB).
  - `TimelineStep.css`: semantic tokens only; marker (cream fill, brown outline, solid brown when selected), line to the next step (hidden on the last step), clickable area with padding / radius, state layers, focus outline; title + date range aligned right with 16px minimum; texts in `text.primary`.
  - `examples.tsx`: three steps (second selected, last without line) and long content, at the timeline width.
  - Exported from `components/index.ts`.
- Verification: type check and build pass; in the browser — 400px wide, date range right-aligned, selected marker brown, last step without line, focus outline brown.

**Files**
- `components/TimelineStep/TimelineStep.tsx`, `components/TimelineStep/TimelineStep.css`, `components/TimelineStep/examples.tsx` (new)
- `components/index.ts`, `components/TimelineStep/meta.json`, `backlog/backlog.json` (updated)

---

## Step 64 — Landing page on the primary color
**Date:** 2026-10-20

- The Design System Lead asked for the landing page (`/`) background in the primary color: `color.background.brand` (primary-600).
- `index.html`: `<body class="home-page">`.
- `docs/src/docs.css`: title, subtitle and clock label use `color.text.inverse`; focus ring uses `color.border.focus-inverse`; the link cards stay light with `color.text.primary`. Both pairs are already checked in `tokens/contrast-pairs.json` (inverse text 4.5:1 and focus ring 3:1 on `background.brand`).
- Known issue: the avatar's circle background is also primary-600, so the circle no longer shows on this page (open question for the Design System Lead).
- The dragon scene (avatar riding a kawaii dragon) was shown as a proposal only; on hold until the Design System Lead shares inspiration.

**Files**
- `index.html`, `docs/src/docs.css`

---

## Step 98 — Timeline step complete
**Date:** 2026-10-20

- The Design System Lead approved the Timeline step code.
- `meta.json` status → `complete`; backlog item → done. Backlog "Timeline" → in progress.

---

## Step 99 — Timeline: first design information
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Container: a **border** (thin frame).
- **No title** above the steps.
- Accessible name: **"Timeline" by default**, can be changed with `label`.
- **At least 2 steps**.

**What was done**
- Created the design preview (`components/Timeline/design/`), built with the coded TimelineStep; border, radius and padding are token proposals to test.

**Files**
- `components/Timeline/design/Preview.tsx`, `components/Timeline/design/tokens.json` (new)

---

## Step 100 — Timeline: spec written
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Border `border.subtle`, `border-width.1`, `radius.8`; padding `space.16`; no background.
- The 400px maximum width (`size.timeline`) includes the frame.

**What was done**
- Wrote `components/Timeline/spec.md` (anatomy, props `label` / `children`, content, sizes, states, tokens, contrast).

**Files**
- `components/Timeline/spec.md` (new)

---

## Step 101 — Timeline: stage 1 (Design) approved
**Date:** 2026-10-20

- The Design System Lead approved the Timeline design spec.
- `meta.json` status → `guidelines`; backlog stage → `guidelines`.

---

## Step 102 — Timeline: guidelines written
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- When to use: a **history of dated events**.
- When not to use: steps without dates, a single event, navigation between pages.
- Placement: **next to the content**. **One timeline per page**. **No maximum** number of steps.
- Do's and don'ts: at least 2 steps, only TimelineSteps, next to the content.
- Related components: **TimelineStep**.

**What was done**
- Wrote `components/Timeline/guidelines.md`. Accessibility: an ordered list named by `label`, Tab in chronological order, number of steps announced.

**Files**
- `components/Timeline/guidelines.md` (new)

---

## Step 103 — Timeline: code
**Date:** 2026-10-20

**What was done**
- The Design System Lead approved the Timeline guidelines; status → `code`, backlog stage → `code`.
- Wrote the developed Timeline (`component-code` skill):
  - `Timeline.tsx`: an ordered list (`<ol>`) named by `label` (default "Timeline"), each TimelineStep in a `<li>` — screen readers announce a list and its number of steps.
  - `Timeline.css`: semantic tokens only — max width `--size-timeline` (frame included), padding `--space-16`, border `--border-width-1` `--color-border-subtle`, radius `--radius-8`, no background. Since each step is the last child of its list item, the timeline restores the line and the space below on every step except the last one.
  - `examples.tsx`: order history (3 steps, custom label) and the minimum (2 steps).
  - Exported from `components/index.ts`.
- Verification: type check and build pass; in the browser — `<ol>` 400px wide, 1px light border, 16px padding, lines on every step except the last, accessible names correct.

**Files**
- `components/Timeline/Timeline.tsx`, `components/Timeline/Timeline.css`, `components/Timeline/examples.tsx` (new)
- `components/index.ts`, `components/Timeline/meta.json`, `backlog/backlog.json` (updated)

---

## Step 104 — Timeline complete
**Date:** 2026-10-20

- The Design System Lead approved the Timeline code.
- `meta.json` status → `complete`; backlog item → done.

---

## Step 105 — Backlog: site elements not defined in the design system
**Date:** 2026-10-20

At the Design System Lead's request, listed the elements of the documentation site that are not defined in the design system yet, and added them to the backlog (origin `decided`, status `todo`).

**New items**
- Components: Header, Search field, Dropdown list (listbox), Filter chips, Tag, Stage indicator, Data table, Code block, Message banner (the earlier "Alert" proposal was rejected: to decide again), Kanban board, Empty state, Skip link.
- Foundations: Code font (monospace).

**Existing items completed with their use on the site**
- Card, Tabs, Select, Text input, Icon button, Link, Breakpoints (860px), Z-index, Layout grid (256px navigation, 1040px content).

**Not added** (site-only tools, not interface components): color swatches, spacing bars, token previews, icon grid, the Design preview canvas, the work-time clock display.

**Files**
- `backlog/backlog.json` (updated)

---

## Step 106 — Card: identity and first design information
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- **Card**: folder `components/Card/`, class `.ds-card`, description "A container that groups the content of one subject.", level **molecule**.
- Content: **title** and **text**.
- Link with the Timeline: each step leads to a card; the card of the selected step is **highlighted** (selected state).

**What was done**
- Created `components/Card/meta.json` and the design preview (`components/Card/design/`): default and selected variants, token proposals to test. Backlog "Card" in progress.

**Files**
- `components/Card/meta.json`, `components/Card/design/Preview.tsx`, `components/Card/design/tokens.json` (new)
- `backlog/backlog.json` (updated)

---

## Step 107 — Card: design details
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Card style kept: white background (`background.page`), `border.subtle` 1px, `radius.8`, padding `space.16`.
- **No selected state** (replaces the earlier "highlighted card" answer): the step leads to the card, the card does not change.
- Text styles kept: title `heading-5`, text `body`, both `text.primary`.
- **Not clickable**: the card displays content; the step leads to it.

**What was done**
- Removed the selected variant from the design preview.

**Files**
- `components/Card/design/tokens.json` (updated)

---

## Step 108 — Card: spec written
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Title and text **both required**. Title **60 characters** max; text **no limit**.
- Width: **full width available**.

**What was done**
- Wrote `components/Card/spec.md` (purpose and link with the TimelineStep through an anchor, anatomy, props, content, sizes, no states, tokens, contrast).

**Files**
- `components/Card/spec.md` (new)

---

## Step 109 — Card: stage 1 (Design) approved
**Date:** 2026-10-20

- The Design System Lead approved the Card design spec (props `title`, `children`, `id`).
- `meta.json` status → `guidelines`; backlog stage → `guidelines`.

---

## Step 110 — Card: guidelines written
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- When to use: the **content of a step** of a Timeline.
- When not to use: as a link or a button, inside another card, for an alert message.
- **One card per step**, in the same order; **`space.16`** between stacked cards.
- Content: title = title of the step, sentence case; text in complete sentences.
- Do's and don'ts: same title as the step, no nested card, not clickable.
- Related components: **Timeline**.

**What was done**
- Wrote `components/Card/guidelines.md`. Accessibility: the title is a heading (navigation from card to card), the card is reached through its `id` anchor and is not focusable.

**Files**
- `components/Card/guidelines.md` (new)

---

## Step 111 — Card: code
**Date:** 2026-10-20

**Decision (Design System Lead)**
- The card title is an **`h2` by default**, changeable with the prop **`headingLevel`** (2 to 6); the look does not change. Added to the spec (props) and the guidelines (accessibility).

**What was done**
- The Design System Lead approved the Card guidelines; status → `code`, backlog stage → `code`.
- Wrote the developed Card (`component-code` skill):
  - `Card.tsx`: a `<section>` with the title heading (`h2`…`h6`) and the text; `id` passed through as the anchor a TimelineStep leads to.
  - `Card.css`: semantic tokens only — `background.page`, `border.subtle` 1px, `radius.8`, padding `space.16`, gap `space.8`, title `heading-5`, text `body`, both `text.primary`; long content wraps.
  - `examples.tsx`: a card, cards with a timeline (each step leads to its card), long content.
  - Exported from `components/index.ts`.
- Documentation site: anchors that are not routes (e.g. `#card-shipped`) now only scroll to their element instead of changing the page.
- Verification: type check and build pass; in the browser — `h2` in Poppins 20px, white background, 1px light border, 16px padding; each step anchor points to an existing card; clicking a step scrolls to its card and stays on the Card page.

**Files**
- `components/Card/Card.tsx`, `components/Card/Card.css`, `components/Card/examples.tsx` (new)
- `components/Card/spec.md`, `components/Card/guidelines.md`, `components/Card/meta.json`, `components/index.ts`, `docs/src/App.tsx`, `backlog/backlog.json` (updated)

---

## Step 112 — Card complete
**Date:** 2026-10-20

- The Design System Lead approved the Card code.
- `meta.json` status → `complete`; backlog item → done.

---

## Step 113 — Skill: page-content
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- A skill **`page-content`** explaining the rules of the cards and the timeline steps on a page.
- Timeline **on the right** of the cards; **16px** between the cards column and the timeline.
- The timeline **stays visible (fixed)** while the cards scroll.
- The **selected step changes automatically** while scrolling (the step of the visible card).

**What was done**
- Created `.claude/skills/page-content/SKILL.md`: link between step and card (one card per step, same order, same title, anchor, direct jump), placement (right side, 16px gaps, widths), scrolling and selection, checklist, open questions (small screens, which card counts as visible).
- Added the rule to `CLAUDE.md` and the skill to the backlog (done).

- The Card example "With a timeline" now uses the 16px gap between the cards and the timeline.

**Files**
- `.claude/skills/page-content/SKILL.md` (new)
- `CLAUDE.md`, `backlog/backlog.json`, `components/Card/examples.tsx` (updated)

---

## Step 114 — Page content: open questions postponed
**Date:** 2026-10-20

- The Design System Lead postponed the two open questions of the `page-content` skill (timeline on small screens; which card counts as visible).
- Added to the backlog as "Page content: open questions" (decided, todo) so they are not forgotten.

**Files**
- `backlog/backlog.json` (updated)

---

## Step 115 — Page content: timeline on small screens
**Date:** 2026-10-20

**Decision (Design System Lead)**
- On small screens, when there is no room on the right, **the timeline is reached through a burger menu**.

**What was done**
- Added a "Small screens" section and a checklist item to the `page-content` skill.
- The details of the burger menu (from which width, button position, how the timeline opens, closing after a choice) remain open, in the skill and in the backlog item "Page content: open questions".

**Files**
- `.claude/skills/page-content/SKILL.md`, `backlog/backlog.json` (updated)

---

## Step 116 — Breakpoints
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Three screen sizes: **mobile / tablet / desktop** — breakpoints **768px** and **1024px**.
- Names by device: **`breakpoint.tablet`**, **`breakpoint.desktop`**.
- **Mobile first** (min-width).
- Media queries: **documented exception** — the value is written (CSS cannot use variables in `@media`), with a comment naming the token, and an automatic check.
- The site navigation switches to the burger menu **below desktop** (was 860px, an unapproved value).
- The timeline goes to the burger menu **below desktop**.

**What was done**
- Added `breakpoint.tablet` (768px) and `breakpoint.desktop` (1024px) to `tokens/semantic.json`.
- `scripts/build-tokens.ts`: `npm run tokens` now fails if a media query in the components or the site uses a width other than a breakpoint value (tested with a wrong value).
- Documentation site: media queries now use 1024px (below desktop: burger navigation, backlog in one column) and 768px (below tablet: brand name hidden), each with a comment naming the token. Checked in the browser at 900px (burger) and 1100px (side navigation).
- Documented in the `token-naming` skill (breakpoint section and the exception), the `component-code` skill (mobile first), the `page-content` skill (timeline below desktop) and `CLAUDE.md`. Backlog "Breakpoints" done.

**Files**
- `tokens/semantic.json`, `scripts/build-tokens.ts`, `docs/src/docs.css`, `.claude/skills/token-naming/SKILL.md`, `.claude/skills/component-code/SKILL.md`, `.claude/skills/page-content/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json` (updated)

---

## Step 117 — Timeline burger menu on small screens
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Button **above the cards, aligned right**; **icon only**, Material icon **`timeline`**.
- Opening: a **panel slides in from the right**, over the page, with a dimmed background.
- After choosing a step: the panel **closes** and the page **jumps to the card**.
- Closing without choosing: **Escape** or **click on the dimmed background** (no close button).
- The panel is **part of the Timeline**, not a separate component.

**What was done**
- Added these rules to the `page-content` skill ("Small screens" table).
- Backlog: new item "Timeline: small-screen panel" (decided, todo) — the Timeline is complete, so its spec, guidelines and code must be updated and approved again; it needs the **Icon button** (noted on that item). Still to define: panel width, shadow, dimmed background color, focus management.
- "Page content: open questions" now only keeps "which card counts as visible".

**Files**
- `.claude/skills/page-content/SKILL.md`, `backlog/backlog.json` (updated)

---

## Step 118 — Timeline panel: close button
**Date:** 2026-10-20

- Decision of the Design System Lead: the panel gets a **close icon button** (Material icon `close`), in addition to Escape and a click on the dimmed background.
- Updated the `page-content` skill and the backlog items "Timeline: small-screen panel" and "Icon button" (now in progress: next component). The position of the close button in the panel is still to define.

**Files**
- `.claude/skills/page-content/SKILL.md`, `backlog/backlog.json` (updated)

---

## Step 119 — Icon button: identity and first design information
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- **IconButton**: folder `components/IconButton/`, class `.ds-icon-button`, description "A button with an icon only, for a frequent or obvious action.", level **atom**.
- Hierarchy: **primary, secondary, tertiary** (no danger).
- **One size**. Shape: **rounded square** (`radius.8`).

**What was done**
- Created `components/IconButton/meta.json` and the design preview (`design/`): the three variants with the icons `timeline` and `close`, all states; token proposals aligned with the Button (padding `space.8`, icon `icon-size.20` → 36px square).

**Files**
- `components/IconButton/meta.json`, `components/IconButton/design/Preview.tsx`, `components/IconButton/design/tokens.json` (new)

---

## Step 120 — Icon button: spec written
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Size and colors kept (as the Button): 36px square (icon 20px + `space.8`); primary brand / white icon, secondary cream / dark icon, tertiary no background / brown icon.
- Props: **`icon`, `label`** (accessible name, required), **`variant`**; default variant **primary**.
- **No tooltip** for now (will come with the Tooltip component).

**What was done**
- Wrote `components/IconButton/spec.md`. Accessibility check: icons meet the 3:1 non-text contrast in every state, pressed included (lowest 3.58:1); target 36 × 36px.

**Files**
- `components/IconButton/spec.md` (new)

---

## Step 121 — Icon button: stage 1 (Design) approved
**Date:** 2026-10-20

- The Design System Lead approved the Icon button design spec.
- `meta.json` status → `guidelines`; backlog stage → `guidelines`.

---

## Step 122 — Icon button: guidelines written
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- When to use: an **obvious action**. When not to use: an **ambiguous icon**.
- Accessible name: **starts with a verb**.
- Do's and don'ts: clear icon, precise accessible name.
- Disabled: **like the Button** (only with an explanation, native `disabled`).
- Space between icon buttons: **`space.8`**.
- Related components: **Timeline**.

**What was done**
- Wrote `components/IconButton/guidelines.md`.

**Files**
- `components/IconButton/guidelines.md` (new)

---

## Step 123 — Icon button: code
**Date:** 2026-10-20

**What was done**
- The Design System Lead approved the Icon button guidelines (including the two lines added for consistency with the Button: choosing the variant, `type="button"` by default); status → `code`, backlog stage → `code`.
- Wrote the developed Icon button (`component-code` skill):
  - `IconButton.tsx`: props `variant` (primary | secondary | tertiary, default primary), `icon`, `label` (required, used as `aria-label`); `<button type="button">`; the icon is decorative.
  - `IconButton.css`: semantic tokens only; `.ds-icon-button`, modifiers `--primary` / `--secondary` / `--tertiary`, part `-icon`; padding `space.8`, radius `radius.8`, icon `icon-size.20`; state layers, focus outline, native disabled (tertiary disabled without background).
  - `examples.tsx`: each variant (open, close, disabled) and the default variant.
  - Exported from `components/index.ts`.
- Verification: type check and build pass; in the browser — 36 × 36px, colors as the spec, accessible names, `type="button"`, focus outline 2px brown with the keyboard (Tab).

**Files**
- `components/IconButton/IconButton.tsx`, `components/IconButton/IconButton.css`, `components/IconButton/examples.tsx` (new)
- `components/index.ts`, `components/IconButton/meta.json`, `backlog/backlog.json` (updated)

---

## Step 124 — Icon button complete; Timeline update started
**Date:** 2026-10-20

- The Design System Lead approved the Icon button code: `meta.json` status → `complete`; backlog item → done.
- Started the Timeline update for small screens (backlog "Timeline: small-screen panel" → in progress). Following the `component` skill (changing an existing component), the Timeline goes back to the **design** stage (`meta.json` status `design`): its spec, guidelines and code will be updated and approved again.

---

## Step 125 — Timeline update: small-screen panel design
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Close button **at the top right** of the panel.
- Panel width: **`size.timeline` (400px) max**, full screen width if narrower.
- Dimmed background: **black at 40%**, new token **`color.background.overlay`**.
- Panel shadow: new semantic token **`shadow.panel`** → `shadow.3` (first semantic shadow).
- On opening, keyboard focus goes to the **selected step**.
- Open button **primary**, close button **tertiary**.
- Panel: **white background, padding `space.16`**; the timeline keeps its frame inside.

**What was done**
- Added `color.background.overlay` (rgba of neutral-950 at 40%) and `shadow.panel` to `tokens/semantic.json`; documented in the `token-naming` skill and `CLAUDE.md`.
- Design preview: desktop timeline and a small-screen mock-up with the open button, the dimmed background and the open panel.
- Spec: new section "Small screens (below desktop)" (open button, panel, dimmed background, events table, motion) and new rows in the token table; level note mentions the IconButton.

**Files**
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md`, `components/Timeline/design/Preview.tsx`, `components/Timeline/design/tokens.json`, `components/Timeline/spec.md` (updated)

---

## Step 124 — Layout grid
**Date:** 2026-10-20

**Decisions (made by the Design System Lead)**
- Columns: **4 / 8 / 12** (mobile / tablet / desktop).
- Gutter: **16px** on every screen (`{space.16}`).
- Side margin: **24px** on every screen (`{space.24}`, = page margin).
- Maximum content width: **1040px, margins included** (992px for the columns).
- Token names: `grid.columns.mobile` / `.tablet` / `.desktop`, `grid.gutter`, `grid.margin`, and `size.content` (size named by usage).
- Ready-to-use CSS classes: `.ds-grid` and `.ds-grid-span-<1–12>`.
- Documentation site: only the hard-coded `1040px` is replaced by `--size-content`.

**What was done**
- Added the `grid` group and `size.content` to `tokens/semantic.json`; rebuilt `tokens/tokens.css`.
- New `tokens/grid.css`: `.ds-grid` (columns per breakpoint, gutter, margins, max width, centered) and `.ds-grid-span-<n>`; a span wider than the current number of columns takes the full width (avoids implicit columns). Imported in the docs site and the prototype template; its media queries are checked by `npm run tokens`.
- Tokens page: new "Layout grid" section with a live demo (moved to the Grid page in step 126).
- Updated the `token-naming` and `layout` skills and `CLAUDE.md`; backlog B012 → done.
- Verification: `npm run tokens` passes (contrast, breakpoints); in the browser the demo shows 12 columns at 1280px, 8 at 800px, 4 below 768px; `.shell-content` max width = 1040px.

**Files**
- `tokens/grid.css` (new)
- `tokens/semantic.json`, `tokens/tokens.css`, `scripts/build-tokens.ts`, `docs/src/main.tsx`, `docs/src/docs.css`, `docs/src/pages/TokensPage.tsx`, `prototypes/_template/main.tsx`, `.claude/skills/token-naming/SKILL.md`, `.claude/skills/layout/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json` (updated)

---

## Step 126 — Timeline update: design approved, guidelines updated
**Date:** 2026-10-20

- The Design System Lead approved the updated Timeline design (including the accessible names "Open the timeline" / "Close the timeline"). `meta.json` status → `guidelines`; backlog stage → `guidelines`.
- Updated `components/Timeline/guidelines.md`: behavior below desktop (open button, panel, closing), accessibility of the panel (dialog, focus on the selected step, focus kept in the panel, focus returned to the open button), IconButton added to the related components.

**Files**
- `components/Timeline/guidelines.md`, `components/Timeline/meta.json`, `backlog/backlog.json` (updated)

---

## Step 125 — Grid span rule approved; docs navigation aligned on its token
**Date:** 2026-10-20

**Decisions (made by the Design System Lead)**
- Approved the rule chosen in step 124: a span wider than the current number of columns takes the full width.
- The documentation site navigation uses the approved `size.side-navigation` (240px) instead of 256px.

**What was done**
- `docs/src/docs.css`: `--doc-nav-width` now references `var(--size-side-navigation)`.
- `layout` skill: the span rule is marked as approved.
- Verification: in the browser at 1280px, `.shell-nav` is 240px wide.

**Files**
- `docs/src/docs.css`, `.claude/skills/layout/SKILL.md` (updated)

---

## Step 127 — Timeline update: code
**Date:** 2026-10-20

**What was done**
- The Design System Lead approved the updated Timeline guidelines (including the dialog rules: dialog role, focus kept in the panel, focus returned to the open button); status → `code`, backlog stage → `code`.
- Updated the Timeline code (mobile first):
  - Below desktop (base): the list is hidden; an **IconButton** `primary` `timeline` ("Open the timeline", `aria-haspopup="dialog"`, `aria-expanded`) aligned right opens a layer with the **dimmed background** (`--color-background-overlay`) and the **panel** (`role="dialog"`, `aria-modal`, named by `label`): white, `--space-16` padding, `--shadow-panel`, at most `--size-timeline`, scrolls; close IconButton `tertiary` `close` at the top right.
  - Behavior: focus on the selected step at opening; Tab kept inside the panel; Escape, close button and click on the dimmed background close it and return focus to the open button; choosing a step closes it and the link jumps to the card. Slide / fade animations with `--duration-300` and `--easing-ease-out` (instant with reduced motion).
  - Desktop and above (`@media (min-width: 1024px)`, commented with `--breakpoint-desktop`): the list is shown, the button and panel are hidden; if the screen grows to desktop while the panel is open, it closes (the breakpoint is read from `--breakpoint-desktop`).
- Raw z-index (100) for the layer, documented: no z-index token yet (noted on the backlog item "Z-index").
- Verification: type check, build and media query check pass; in the browser at 900px — button shown, list hidden, dialog named "Order history" 400px wide, focus on the selected step, Escape closes and returns focus to "Open the timeline", choosing a step and clicking the dimmed background close the panel; at 1280px — list shown, button hidden.

**Files**
- `components/Timeline/Timeline.tsx`, `components/Timeline/Timeline.css`, `components/Timeline/meta.json`, `backlog/backlog.json` (updated)

---

## Step 128 — Timeline update complete
**Date:** 2026-10-20

- The Design System Lead approved the updated Timeline code (small-screen panel).
- `meta.json` status → `complete`; backlog "Timeline: small-screen panel" → done.

---

## Step 129 — Page content: which card is "visible"
**Date:** 2026-10-20

- Explained the open question: several cards can be on screen at once, so a rule must choose the one whose step gets selected while scrolling.
- Decision of the Design System Lead: the **card at the top of the screen** (the card that reaches the top of the reading area).
- Added to the `page-content` skill (scrolling and selection, checklist) and `CLAUDE.md`; the skill has no open question left. Backlog "Page content: open questions" → done.

**Files**
- `.claude/skills/page-content/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json` (updated)

---

## Step 130 — Page content: icon buttons by screen size
**Date:** 2026-10-20

- At the Design System Lead's request, added the rule of the icon buttons by screen resolution to the `page-content` skill: a table mobile / tablet / desktop — below `--breakpoint-desktop` (1024px) the open button (IconButton `primary`, `timeline`) is shown above the cards and the close button (IconButton `tertiary`, `close`) is in the panel; from 1024px both are hidden and the timeline is visible on the right. The panel closes if the screen grows to desktop. Checklist updated.

**Files**
- `.claude/skills/page-content/SKILL.md` (updated)

---

## Step 131 — Z-index
**Date:** 2026-10-20

**Decisions (Design System Lead)**
- Stacking scale from **0 (content)** to **100 (tooltips)**, with layers **sticky (10)**, **navigation (20)**, **overlay (30)**, **modal (40)**.
- Names **by usage**: `z-index.<usage>`.
- The skip link goes **one level above** the tooltips: **110**.

**What was done**
- Explained what a z-index is (stacking order of layers) and why tokens are needed.
- Added 7 tokens to `tokens/semantic.json`: `content` 0, `sticky` 10, `navigation` 20, `overlay` 30, `modal` 40, `tooltip` 100, `skip-link` 110.
- Replaced every raw z-index: Timeline panel → `--z-index-overlay`; site header → `--z-index-sticky`; mobile navigation → `--z-index-navigation`; skip link → `--z-index-skip-link`.
- Documented in the `token-naming` skill (never a raw z-index) and `CLAUDE.md`. Backlog "Z-index" done.
- Checked in the browser at 900px: the open Timeline panel (30) is in front of the site header (10).

**Files**
- `tokens/semantic.json`, `components/Timeline/Timeline.css`, `docs/src/docs.css`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json` (updated)

---

## Step 132 — Z-index in the documentation
**Date:** 2026-10-20

- At the Design System Lead's request, added a **"Stacking order (z-index)"** section to the Design tokens page of the documentation site: a short explanation (higher = in front, scale 0 → 100, never a raw value) and a diagram of the layers stacked from the back (content, 0) to the front (skip link, 110), each with its token, value and usage. The z-index tokens also stay listed in the semantic tokens table.
- Checked in the browser.

**Files**
- `docs/src/pages/TokensPage.tsx`, `docs/src/docs.css` (updated)

---

## Step 126 — Grid page in the documentation
**Date:** 2026-10-20

**Decisions (made by the Design System Lead)**
- A dedicated **Grid** page in Foundations. Title "Grid", subtitle "Columns, gutters and margins for every screen size".

**What was done**
- New `docs/src/pages/GridPage.tsx` (route `#/grid`, nav item "Grid", icon `grid_view`): columns by screen, max width, usage of `.ds-grid` / `.ds-grid-span-<n>` (including the full-width rule), live demo, and the grid tokens table (read from the tokens).
- Moved the grid demo from the Design tokens page to the Grid page.
- Verification: type check passes; in the browser the page renders without console errors, the nav item is active, and the demo shows 12 columns at 1280px.

**Files**
- `docs/src/pages/GridPage.tsx` (new)
- `docs/src/App.tsx`, `docs/src/pages/TokensPage.tsx`, `docs/src/docs.css`, `STEPS.md` (updated)

## Step 127 — Git repository connected to GitHub
**Date:** 2026-10-20

**What was done**
- Initialized git in the project (branch `main`). Commit identity set for this repository only: "Capucine Desjouis" with the GitHub noreply email.
- First commit of the whole project (118 files; `node_modules/`, `dist/`, `.DS_Store` and the generated `tokens/tokens.css` stay ignored by `.gitignore`).
- Connected the existing private repository `CapucineDjs/BuildDesignSystem` as `origin` and pushed `main`.

**Files**
- `.git/` (new)
- `STEPS.md` (updated)

## Step 128 — Commit and push after every step
**Date:** 2026-10-20

**Decisions (made by the Design System Lead)**
- Every step is committed and pushed to GitHub once it is done.

**What was done**
- Added a **Git** section to `CLAUDE.md`: the GitHub repository, and the rule to commit and push after every step (message `Step <n>: <short title>`).

**Files**
- `CLAUDE.md`, `STEPS.md` (updated)

## Step 129 — Orchestrator skill, parent of all skills
**Date:** 2026-10-20

**Decisions (made by the Design System Lead)**
- A parent skill named **`orchestrator`**, the entry point of every task, which dispatches to the child skills.
- Two levels: the orchestrator dispatches directly to every skill; `component` becomes a child like the others and no longer routes to the stage skills.
- The orchestrator only dispatches (no start or end routine, no rules of its own).

**What was done**
- New `orchestrator` skill: dispatch table "trigger → child skill" covering all 9 existing skills; several children can be loaded together; a new skill gets a row in the table.
- `component` skill: now describes the component lifecycle and approval gate only; the stage routing moved to the orchestrator.
- `component-spec`, `component-guidelines`, `component-code`, `component-structure`: descriptions and hand-back lines updated to the orchestrator.
- `CLAUDE.md`: the "Component skill" section becomes "Skills".

**Files**
- `.claude/skills/orchestrator/SKILL.md` (new)
- `.claude/skills/component/SKILL.md`, `.claude/skills/component-spec/SKILL.md`, `.claude/skills/component-guidelines/SKILL.md`, `.claude/skills/component-code/SKILL.md`, `.claude/skills/component-structure/SKILL.md`, `CLAUDE.md`, `STEPS.md` (updated)

## Step 130 — Mentions of missing skills removed
**Date:** 2026-10-20

**Decisions (made by the Design System Lead)**
- Remove, for now, the mentions of skills that do not exist: `token-usage`, `accessibility-check`, `steps-log`, `backlog-management`.

**What was done**
- `component`: removed them from the cross-cutting skills list and from the approval gate (steps renumbered).
- `component-spec`, `component-code`: `(token-naming, token-usage)` → `(token-naming)`. In the spec hand-back, the checks listed with `accessibility-check` (contrast pairs, target sizes, visible focus) are kept as plain words.
- `component-code`, `component-guidelines`: removed the "run `accessibility-check`" lines (the accessibility rules written in these skills stay).

**Files**
- `.claude/skills/component/SKILL.md`, `.claude/skills/component-spec/SKILL.md`, `.claude/skills/component-code/SKILL.md`, `.claude/skills/component-guidelines/SKILL.md`, `STEPS.md` (updated)

## Step 131 — Missing skills added to the backlog as proposals
**Date:** 2026-10-20

**Decisions (made by the Design System Lead)**
- The four skills removed in step 130 go to the backlog as proposals.

**What was done**
- Added to `backlog/backlog.json` (category Skills, status `proposal`, origin `proposal`): B071 `token-usage`, B072 `accessibility-check`, B073 `steps-log`, B074 `backlog-management`. They wait for the Design System Lead's approval on the Backlog page.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step 132 — Documentation page: How to use skills
**Date:** 2026-10-20

**Decisions (made by the Design System Lead)**
- A documentation page about the skills and how to use them. Title "How to use skills", subtitle "The orchestrator, its child skills and how to call them".
- In the first navigation group, after Backlog, label "How to use skills", icon `psychology`.
- Content read from the skill files (always up to date); sections: How to use, Hierarchy, one card per skill.

**What was done**
- New `docs/src/skills.ts`: discovers `.claude/skills/*/SKILL.md` (frontmatter `name` / `description` + body), separates the parent skill (`orchestrator`) from its children, and extracts its dispatch table.
- New `docs/src/pages/SkillsPage.tsx` (route `#/skills`): How to use (orchestrator first, calling a skill from the chat or with `/name`, adding a skill), Hierarchy (tree orchestrator → children with anchor links, dispatch table), Skills (one card per skill: name, description, full content in a "Show the full skill" disclosure, headings moved two levels down under the card title).
- The cards use the documentation site's own styles, not the DS Card component (its guidelines keep it for Timeline steps).
- Backlog: B075 added as done. `CLAUDE.md`: the page is mentioned in the Skills section.
- Verification: type check and build pass; in the browser, no console errors, 10 skills shown, anchors and disclosure work, no horizontal scroll at 375px.

**Files**
- `docs/src/skills.ts`, `docs/src/pages/SkillsPage.tsx` (new)
- `docs/src/App.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `CLAUDE.md`, `STEPS.md` (updated)

## Step 133 — Prototypes setup branch and shared sample data
**Date:** 2026-10-20

**Decisions (made by the Design System Lead)**
- Work on the prototypes setup happens on a dedicated branch.
- A sample data file shared by all the prototypes: `prototypes/_data/sample.json`, JSON content with a TypeScript type next to it, neutral placeholder structure (no journey content yet).

**What was done**
- Created the branch `prototypes-setup` (pushed to GitHub).
- New `prototypes/_data/sample.json` (3 placeholder items: `id`, `title`, `description`) and `prototypes/_data/sample.ts` (types `SampleItem`, `SampleData`, typed export `sample`). The `_` prefix keeps the folder out of the prototypes list and build pages.
- `prototypes/_template/main.tsx`: imports `sample` and lists its items on the home screen, as a usage example.
- `prototypes/README.md`: documents the shared sample data.
- Verification: type check and build pass; `/prototypes/_template/` shows the 3 items with no console errors.

**Files**
- `prototypes/_data/sample.json`, `prototypes/_data/sample.ts` (new)
- `prototypes/_template/main.tsx`, `prototypes/README.md`, `STEPS.md` (updated)

## Step 134 — Prototypes run with the real React components
**Date:** 2026-10-21 (branch `prototypes-setup`)

**Decisions (made by the Design System Lead)**
- Goal: prototypes use the real React components of the design system.
- Prototype screens follow the same layout rules as the documentation site: 24px page margin, 16px between blocks, page header `heading-1` + `lead`.
- The design system is loaded with a single import per prototype.
- Navigation between screens stays React state.
- A check at build time: components imported only from `@ds/components`, no raw values in styles.

**What was done**
- New `prototypes/_shared/setup.ts` (fonts, tokens, icons, grid, base styles), `prototypes/_shared/base.css` (page base with the same tokens as the docs site, `.prototype-screen` layout, one-line title / subtitle with ellipsis) and `prototypes/_shared/Screen.tsx` (page header + content blocks).
- `prototypes/_template/main.tsx` rewritten: `import "../_shared/setup"`, screens built with `Screen` and the real `Button` (`@ds/components`), sample data from `_data/sample`; no raw HTML buttons nor inline raw styles anymore.
- New `scripts/check-prototypes.ts` and `npm run check:prototypes`, run by `npm run build`: fails on a component imported other than from `@ds/components`, and on raw colors (hex, rgb, hsl), lengths with a unit, or bare numbers in inline styles and CSS files of the prototype folders.
- `prototypes/README.md` (setup and rules), `layout` skill (prototypes decision), `CLAUDE.md` (conventions) updated.
- Verification: the check passes on the prototypes and catches 6/6 problems in a throwaway bad folder (removed); type check and build pass; in the browser, the template shows the real Button (primary, then secondary), 24px margin, 16px gap, Poppins title, navigation between the two screens, no console errors.

**Files**
- `prototypes/_shared/setup.ts`, `prototypes/_shared/base.css`, `prototypes/_shared/Screen.tsx`, `scripts/check-prototypes.ts` (new)
- `prototypes/_template/main.tsx`, `prototypes/README.md`, `package.json`, `.claude/skills/layout/SKILL.md`, `CLAUDE.md`, `STEPS.md` (updated)

## Step 135 — Skill: prototype-building
**Date:** 2026-10-21 (branch `prototypes-setup`)

**Decisions (made by the Design System Lead)**
- The creation steps of a prototype go into a skill, so they are followed from the start of every new prototype (backlog B040, approved).

**What was done**
- New `prototype-building` skill: before starting (backlog item, content asked to the Design System Lead, components coded and used within their guidelines), creation from `_template/` (folder, `<title>`, `setup` / `@ds/components` / `Screen` / `sample` imports), screen rules (Screen header, layout, components only, tokens only, React state navigation, page-content), check (`check:prototypes`, typecheck, journey in the browser) and approval. Only rules already decided are written in it.
- `orchestrator`: new dispatch row "A prototype is started, built, changed or reviewed → `prototype-building`".
- `prototypes/README.md` points to the skill. Backlog B040 → `done`.
- Verification: the How to use skills page shows the new card and the new dispatch row.

**Files**
- `.claude/skills/prototype-building/SKILL.md` (new)
- `.claude/skills/orchestrator/SKILL.md`, `prototypes/README.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step 136 — prototype-building becomes prototype-setup
**Date:** 2026-10-21 (branch `prototypes-setup`)

**Decisions (made by the Design System Lead)**
- The skill only sets up a new prototype; the screens are then built with the other skills.
- Renamed `prototype-setup`.

**What was done**
- `.claude/skills/prototype-building/` → `.claude/skills/prototype-setup/`, rewritten: before starting (backlog item, prototype and folder name asked), creation from `_template/` (title, imports), check that it runs (`check:prototypes`, typecheck, the prototype opens and is listed), then the hand-off to the other skills (`never-invent` for content, `layout`, `page-header`, `page-content`, `component`). The screen-building and approval sections were removed.
- `orchestrator`: the row becomes "A new prototype is started → `prototype-setup`".
- `prototypes/README.md` and backlog B040 (title and description) updated.

**Files**
- `.claude/skills/prototype-setup/SKILL.md` (renamed from `prototype-building`, rewritten)
- `.claude/skills/orchestrator/SKILL.md`, `prototypes/README.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step 137 — Branch prototypes-setup merged into main
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- Merge the `prototypes-setup` branch into `main`.

**What was done**
- Fast-forward merge of `prototypes-setup` (steps 133 to 136: shared sample data, prototypes running with the real React components, build check, `prototype-setup` skill) into `main`, then pushed.
- Verification: `npm run build` passes on `main` (prototypes check included).
- The `prototypes-setup` branch is kept (local and on GitHub).

**Files**
- `STEPS.md` (updated)

## Step 138 — Branch prototypes-setup deleted
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- Delete the `prototypes-setup` branch, now merged into `main`.

**What was done**
- Deleted the branch locally and on GitHub (it was fully merged into `main`). Only `main` remains.

**Files**
- `STEPS.md` (updated)

## Step 139 — A dedicated branch for every new prototype
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- Whenever a new prototype is created, Claude asks to create a branch for it.

**What was done**
- `prototype-setup` skill, "Before starting": new step — ask the Design System Lead to create a branch and for its name; once agreed, create it from an up-to-date `main` and push it before creating any file; every step of the prototype is committed on it; merged into `main` only on request. The backlog status `in-progress` is now set on that branch (after it is created). Description updated.
- `CLAUDE.md`, Git section: the rule is mentioned.

**Files**
- `.claude/skills/prototype-setup/SKILL.md`, `CLAUDE.md`, `STEPS.md` (updated)

## Step 140 — A second working folder on main (git worktree)
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- Two chats work at the same time: one on the prototype branch `prototype-0.0`, the other stays on `main`.

**What was done**
- Created a git worktree `../BuildDesignSystem-main` on `main` (dependencies installed), so the `main` chat no longer shares its branch with the prototype chat. Same repository, same history, same GitHub remote.
- The original folder `BuildDesignSystem` stays on `prototype-0.0`.

**Files**
- `STEPS.md` (updated)

## Step 140 — Prototype WorkDescription set up
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- First prototype (backlog B031): name **WorkDescription**, folder `work-description`.
- Built on a dedicated branch `prototype-0.0`, created from an up-to-date `main` and pushed to GitHub before any file was created.

**What was done**
- Step 139 (committed on the new branch) was brought onto `main` and both branches were pushed.
- Copied `prototypes/_template/` to `prototypes/work-description/`; `<title>` set to `WorkDescription — BuildDesignSystem`; imports of `main.tsx` kept (setup, `@ds/components`, `Screen`, sample data). The template screens stay until the journey content is given.
- Backlog B031 set to `in-progress`.
- Verification: `npm run check:prototypes` and `npm run typecheck` pass; `/prototypes/` lists `work-description`; `/prototypes/work-description/` opens the Home screen and navigates to the Details screen with no console errors.

**Files**
- `prototypes/work-description/index.html`, `prototypes/work-description/main.tsx` (created)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step 141 — WorkDescription: four steps, each with its card
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- The WorkDescription screen has a Timeline of **4 steps**, each leading to its own Card (`page-content` skill).
- Neutral placeholder content and date ranges for now, to replace with the real content later.

**What was done**
- `prototypes/work-description/main.tsx`: the template screens replaced by one screen (title "WorkDescription", placeholder subtitle) with a `Timeline` of 4 `TimelineStep`s ("Step 1" → "Step 4", one month each from Jan to Apr 2026, placeholder description) and 4 `Card`s with the same titles, in the same order, linked by anchors (`#step-1` → `#step-4`), with placeholder text.
- The selected step follows the reading: the card at the top of the window selects its step; a clicked step stays selected until the reader scrolls again. Exactly one step is selected.
- `prototypes/work-description/main.css` (new): mobile and tablet — timeline open button above the cards, cards 16px apart; from `--breakpoint-desktop` (1024px) — cards on the left, timeline on the right (`--size-timeline` wide), 16px apart, sticky while scrolling.
- Verification: `npm run check:prototypes`, `npm run typecheck` and the breakpoint check pass. Desktop (1280px): timeline on the right, fixed while scrolling, selection follows the card at the top and the clicked step; open button hidden. Mobile (375px): open button above the cards aligned right, panel opens, choosing a step closes it and jumps to the card; no horizontal scroll.
- Known edge case (to decide): when the page cannot scroll far enough for the last cards to reach the top of the screen, their steps are selected only by clicking.

**Files**
- `prototypes/work-description/main.tsx` (updated), `prototypes/work-description/main.css` (created), `STEPS.md` (updated)

## Step 142 — Prototype tickets: specification and iteration history
**Date:** 2026-10-21 (on `main`; steps 140–141 of the `prototype-0.0` branch are numbered in parallel, so this step is 142)

**Decisions (made by the Design System Lead)**
- One backlog ticket per prototype, holding its specification and the history of its iterations up to the final validation.
- The specification lives in `prototypes/<name>/spec.md`, with two sections: **Components & content** and **Acceptance criteria**.
- Each iteration records the Design System Lead's **feedback** and the **decision** (changes requested, or validated = final validation).

**What was done**
- Backlog ticket fields: `prototype` (folder name) and `iterations` (`feedback`, `decision`: `changes-requested` | `validated`). B031 (WorkDescription) gets `prototype: "work-description"` and an empty history.
- New `prototypes/_template/spec.md` (the two sections, to write with the Design System Lead).
- Documentation site: new ticket page `#/backlog/<id>` (`docs/src/pages/TicketPage.tsx`): ticket header, link to the prototype, its `spec.md` rendered, and the iterations (Iteration n, decision tag, feedback). Prototype cards on the Backlog page link to it ("Spec and iterations (n)"). Backlog data and types moved to `docs/src/backlog.ts`, shared by both pages. Decision tags use existing AA-checked pairs (success / warning).
- `prototype-setup` skill (spec.md title, ticket fields, an iteration per review), `prototypes/README.md` (Backlog ticket section) and `CLAUDE.md` (Backlog section) updated.
- Verification: type check, prototypes check, tokens contrast check and build pass. Not checked in the browser: the dev server on port 5173 runs from the other folder (`prototype-0.0`), and the preview tool could not start a second one for this folder.
- Note: `prototypes/work-description/spec.md` belongs on the `prototype-0.0` branch; until it exists, the ticket page shows "No specification yet on this branch".

**Files**
- `docs/src/backlog.ts`, `docs/src/pages/TicketPage.tsx`, `prototypes/_template/spec.md` (new)
- `docs/src/App.tsx`, `docs/src/pages/BacklogPage.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `.claude/skills/prototype-setup/SKILL.md`, `prototypes/README.md`, `CLAUDE.md`, `STEPS.md` (updated)

## Step 143 — Prototype preview pages (mobile, tablet, desktop, grid overlay)
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- Each prototype gets its own page in the Prototypes section of the documentation site, with a live preview at 3 sizes side by side: **375 / 768 / 1280px**.
- A **Show grid** toggle (off by default) draws the layout grid columns over the frames.

**What was done**
- New `docs/src/prototypes.ts` (discovers prototype folders with an `index.html`, `_` folders ignored) and `docs/src/pages/PrototypePage.tsx` (route `#/prototypes/<name>`): title = folder name, subtitle "Live preview on mobile, tablet and desktop", Show grid toggle, Open in a new tab link, and 3 frames (Mobile 375×812, Tablet 768×1024, Desktop 1280×800) loading the real prototype in an iframe at its real width, scaled down to fit side by side (stacked below desktop). Each caption gives the width and the grid columns at that width.
- Grid overlay: same rules as `.ds-grid` (gutter `--grid-gutter`, margin `--grid-margin`, max width `--size-content`, centered), with the column count of the frame width from the tokens (4 / 8 / 12, using `breakpoint.*`).
- Navigation: one item per prototype (icon `preview`) above "All prototypes".
- Frame heights (812 / 1024 / 800), the subtitle, the icon and the Open in a new tab link were not specified: chosen by Claude, to confirm.
- Verification: type check, prototypes check and build pass. **Not checked in the browser**: `main` has no prototype yet (`work-description` is on `prototype-0.0`), and no dev server runs from this folder.

**Files**
- `docs/src/prototypes.ts`, `docs/src/pages/PrototypePage.tsx` (new)
- `docs/src/App.tsx`, `docs/src/docs.css`, `STEPS.md` (updated)

## Step 144 — Branch prototype-0.0 renamed prototype/work-description
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- The WorkDescription prototype branch is named `prototype/work-description`.

**What was done**
- Renamed `prototype-0.0` → `prototype/work-description` locally (the `BuildDesignSystem` folder follows it, its uncommitted changes untouched), pushed the new name to GitHub with tracking, and deleted `prototype-0.0` on GitHub. Same commits (head: step 141).

**Files**
- `STEPS.md` (updated)

## Step 145 — page-content: cards 8 columns, timeline 4 columns, full width
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- On desktop, a page combining Cards and a Timeline uses the 12-column grid: **cards 8 columns, timeline 4 columns** (closest to the 70 / 30 asked).
- It is the general rule of the `page-content` skill, not only for WorkDescription.
- The grid takes the **full width of the screen** (no `--size-content` maximum).
- The timeline **fills its 4 columns**: its 400px maximum width is removed on desktop (Timeline component change, to go through spec → guidelines → code).

**What was done**
- `page-content` skill, Placement: 12-column grid on the full screen width from `--breakpoint-desktop`, cards 8 columns, timeline 4 columns with no maximum width, 16px grid gutter between them; checklist updated. Small screens (panel) unchanged.
- Next: the Timeline spec change, shown to the Design System Lead for approval; then guidelines and code; then the WorkDescription prototype (branch `prototype/work-description`).

**Files**
- `.claude/skills/page-content/SKILL.md`, `STEPS.md` (updated)

## Step 146 — Timeline spec: fills its container (stage 1 of the change, approved)
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- Spec change approved: the Timeline takes the full width of its container on desktop (no maximum width); the 400px `--size-timeline` stays for the small-screen panel only.

**What was done**
- `components/Timeline/spec.md`: Sizes → container "Full width of its container, frame included; no maximum width" (on a Timeline + Cards page: the 4 timeline columns); Design tokens → "Container · Max width" row removed. Panel unchanged.
- `components/TimelineStep/spec.md`: the step takes the full width of the timeline (the 400px mention removed).
- Token `size.timeline` description → "Maximum width of the timeline panel (below desktop)" (`tokens/semantic.json`, `token-naming` skill, `CLAUDE.md`). Value unchanged.
- Design previews: Timeline desktop preview now shows cards (8 columns) and the timeline filling its 4 columns; TimelineStep preview comment updated.
- Backlog: B076 "Timeline: fill its 4 columns on desktop" added (decided, in progress, stage `guidelines`). `meta.json` stays `complete` while the change goes through the stages.
- Verification: tokens build (45/45 contrast pairs) and type check pass.

**Files**
- `components/Timeline/spec.md`, `components/Timeline/design/Preview.tsx`, `components/TimelineStep/spec.md`, `components/TimelineStep/design/Preview.tsx`, `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step 147 — Timeline guidelines: fills its column (stage 2 of the change, approved)
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- Guidelines change approved.

**What was done**
- `components/Timeline/guidelines.md`, Behavior: "At most 400px wide" → "Fills the width of its column, frame included: on a Timeline + Cards page, the 4 timeline columns (`page-content`)". Placement and small-screen behavior unchanged.
- Backlog B076 → stage `code`.

**Files**
- `components/Timeline/guidelines.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step 148 — Timeline fills its column; TimelineStep dates go under a narrow title
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- Testing the Timeline in its 4 columns showed a problem: in a narrow timeline (≈ 300px at a 1024px screen), the date range (never wraps, 170px) left ≈ 30px to the title, which broke letter by letter.
- Decided: **the date range goes under the title when the title would be narrower than 200px**; otherwise it stays on its right. New token **`size.timeline-step-title` = 200px**. Space between the title and the date range under it: **`--space-4`**.

**What was done**
- Timeline code (stage 3 of the change): `.ds-timeline` has no maximum width any more (fills its container); the panel keeps `--size-timeline`. New example "Next to the cards" (12-column grid on the full width, cards 8 columns, timeline 4 columns).
- New token `size.timeline-step-title` (`tokens/semantic.json`, `token-naming` skill, `CLAUDE.md`).
- TimelineStep: spec (anatomy, content overflow, sizes, tokens), guidelines (Behavior: narrow timeline) and code (header wraps: title `flex-basis: var(--size-timeline-step-title)`, row gap `--space-4`).
- Verification: tokens (45/45 contrast pairs), type check and build pass. In the browser (localhost:5174, Timeline Examples tab, no console errors): the "Next to the cards" grid has 12 columns, cards 612px / timeline 298px, 16px gap; a timeline cloned at several widths keeps the dates on the right from 470px (title 202px) and puts them under the title, 4px below and left-aligned, at 466px and narrower. So the timeline panel (at most 400px) always shows the dates under the title. Screenshots not possible (the Browser pane was hidden).
- Awaiting the Design System Lead's approval: TimelineStep spec and guidelines change, then the Timeline and TimelineStep code.

**Files**
- `components/Timeline/Timeline.css`, `components/Timeline/examples.tsx`, `components/TimelineStep/spec.md`, `components/TimelineStep/guidelines.md`, `components/TimelineStep/TimelineStep.css`, `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step 149 — TimelineStep spec and guidelines change approved
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- Approved: the TimelineStep spec and guidelines change of step 148 (date range under the title when the title would be narrower than `--size-timeline-step-title`, 200px; `--space-4` between them).

**What was done**
- Approval logged. Next: approval of the Timeline and TimelineStep code (Examples tab, http://localhost:5174/docs/#/components/timeline).

**Files**
- `STEPS.md` (updated)

## Step 150 — Work-time clock counts every checkout
**Date:** 2026-10-21

**What was done (and why)**
- The Design System Lead noticed that the work-time clock showed the wrong total. Cause: `/api/work-time` read only the Claude Code log folder of the checkout running the dev server, but the project now has two checkouts (git worktrees `BuildDesignSystem` and `BuildDesignSystem-main`), each with its own log folder (5h43 + 1h46).
- `/api/work-time` now reads the log folders of every checkout listed by `git worktree list` (falls back to the current folder if git fails). Events from all folders are merged and sorted before summing, so overlapping sessions are not counted twice.
- Verification: the API on localhost:5174 returns 27,142 s (7:32:22), the combined total.

**Files**
- `vite.config.ts`, `STEPS.md` (updated)

## Step 150 — Timeline and TimelineStep code approved: change complete
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- Approved: the Timeline and TimelineStep code of step 148.

**What was done**
- The change is complete: the Timeline fills its column (4 columns next to the cards, `page-content` skill) and the TimelineStep puts its date range under a title narrower than 200px. Both components stay `complete`.
- Backlog B076 → `done`.
- Next: apply the 8 / 4 column layout to the WorkDescription prototype, on its branch `prototype/work-description`.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step 151 — Ticket B031 renamed "Prototype: WorkDescription"
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- Ticket B031 title: **"Prototype: WorkDescription"**.
- The prototype specification (`prototypes/work-description/spec.md`) is written in the other chat, on the branch `prototype/work-description`.

**What was done**
- `backlog/backlog.json`: B031 title renamed (description, status and history unchanged).

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step 152 — page-content: one rule for main and the prototype branch
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- The two chats had written two versions of the 8 / 4 column rule. Kept: **the `main` version** — 12-column grid on the full screen width, the timeline filling its 4 columns with no maximum width (components already changed and approved, steps 145–150 on `main`). The branch version (1040px maximum, timeline at most 400px) is dropped.
- The two additions of the branch are approved for the general rule: on mobile and tablet the cards take the full width of the grid; space after the last card so every card can reach the top of the screen.

**What was done**
- `page-content` skill on `main`: "Mobile and tablet" placement row, "Every card can reach the top of the screen" rule and its checklist item added (wording from the branch).
- When `main` is merged into `prototype/work-description`, the `page-content` conflict is resolved with the `main` version; the prototype then follows it (full width, timeline in its 4 columns with no maximum).

**Files**
- `.claude/skills/page-content/SKILL.md`, `STEPS.md` (updated)

## Step 153 — Every card can reach the top of the screen
**Date:** 2026-10-21 (on `prototype/work-description`, committed as "Step 145"; renumbered when `main` was merged, since `main` uses 145–152)

**Decisions (made by the Design System Lead)**
- Option 3 for the edge case of Step 141: space is added after the last card, so every card (the last one included) can scroll up to the top of the screen and select its step.

**What was done**
- `page-content` skill, "Scrolling and selection": new rule — space after the last card, just enough for it to reach the top of the screen, at every screen size; measured (screen height minus the last card height and the page margin), not a design token. Checklist updated.
- `CLAUDE.md`, Page content: the rule is mentioned.
- `prototypes/work-description/main.tsx`: the cards column gets that space as bottom padding, measured on load and updated when the last card or the window is resized.
- Verification: `npm run check:prototypes` and `npm run typecheck` pass. Desktop (1280px) and mobile (375px): each card reaches the top and selects its step; at the bottom of the page the last card is at the top and Step 4 is selected; no horizontal scroll.
- Note: numbered 145 because Steps 142–144 were logged on `main` meanwhile; Step 140 exists twice (one on `main`, one on this branch).

**Files**
- `.claude/skills/page-content/SKILL.md`, `CLAUDE.md`, `prototypes/work-description/main.tsx`, `STEPS.md` (updated)

## Step 154 — main merged into prototype/work-description
**Date:** 2026-10-21 (on `prototype/work-description`, committed as "Step 146"; renumbered when `main` was merged, since `main` uses 145–152)

**Decisions (made by the Design System Lead)**
- See the WorkDescription prototype in dedicated preview frames (mobile, tablet, desktop), like Figma previews: bring Steps 140–144 of `main` (preview pages, prototype tickets) onto the prototype branch.

**What was done**
- Merged `origin/main` into `prototype/work-description`. One conflict, in `STEPS.md` (both branches had appended steps): resolved by keeping every entry, in step order (the two Step 140 entries are both kept).
- Verification: `npm run typecheck` and `npm run build` pass (prototypes check included). In the browser, `/docs/#/prototypes/work-description` shows the prototype in the 3 frames (Mobile 375px, Tablet 768px, Desktop 1280px), with the timeline icon button on mobile and tablet and the timeline on the right on desktop; Show grid draws 4 / 8 / 12 columns; no console errors. This is the first check of the Step 143 preview page in the browser.

**Files**
- Merge of `main` (see Steps 140, 142–144); `STEPS.md` (updated)

## Step 155 — Preview before commit
**Date:** 2026-10-21 (on `prototype/work-description`, committed as "Step 147"; renumbered when `main` was merged, since `main` uses 145–152)

**Decisions (made by the Design System Lead)**
- For the whole project: every change is previewed on the local site and validated by the Design System Lead **before** it is committed and pushed (no more automatic commit and push after every step).

**What was done**
- `CLAUDE.md`, Git section: the "after every step, commit and push" rule is replaced by "preview before commit" (Claude checks the change, gives the local preview link, iterates on requested changes) and "only once the Design System Lead validates" (then `STEPS.md` entry, commit, push to the current branch).
- `prototype-setup` skill: each step of a prototype is previewed on `/docs/#/prototypes/<prototype-name>`, then committed and pushed on its branch once validated.

**Files**
- `CLAUDE.md`, `.claude/skills/prototype-setup/SKILL.md`, `STEPS.md` (updated)

## Step 156 — Prototype name shown on the site
**Date:** 2026-10-21 (on `prototype/work-description`, committed as "Step 148"; renumbered when `main` was merged, since `main` uses 145–152)

**Decisions (made by the Design System Lead)**
- The documentation site shows the **prototype name** (e.g. "WorkDescription"), not its folder name, everywhere: preview page title, navigation and the All prototypes list.

**What was done**
- `docs/src/prototypes.ts`: reads each prototype's `index.html` and takes its name from the `<title>` ("<Prototype name> — BuildDesignSystem", set by the `prototype-setup` skill); new `prototypeName(folder)`, falling back to the folder name.
- `docs/src/pages/PrototypePage.tsx`: page title and frame titles use the name. `docs/src/App.tsx`: navigation item label. `prototypes/list.tsx`: reuses `docs/src/prototypes.ts` and shows the name.
- Verification: `npm run typecheck` and `npm run build` pass; in the browser, the preview page title, the navigation item and `/prototypes/` show "WorkDescription"; no console errors. Previewed and validated by the Design System Lead before commit.

**Files**
- `docs/src/prototypes.ts`, `docs/src/pages/PrototypePage.tsx`, `docs/src/App.tsx`, `prototypes/list.tsx`, `STEPS.md` (updated)

## Step 157 — WorkDescription aligned on the layout grid
**Date:** 2026-10-21 (on `prototype/work-description`, committed as "Step 149"; renumbered when `main` was merged, since `main` uses 145–152)

**Decisions (made by the Design System Lead)**
- Desktop split on the 12-column grid: **cards on columns 1–8, timeline on columns 9–12** — a `page-content` rule for every page combining a Timeline and Cards.
- Prototype screens are **centered** beyond `size.content` (1040px), like the layout grid, so their content sits on the grid columns.

**What was done**
- `prototypes/_shared/base.css`: `.prototype-screen` centered (`margin-inline: auto`); its 24px margin equals `--grid-margin`, so the content area is the 992px of the grid columns.
- `prototypes/work-description/main.css`: from `--breakpoint-desktop`, the content is a 12-column grid (`--grid-columns-desktop`, gutter `--grid-gutter`): cards `1 / span 8`, timeline `9 / span 4` (sticky).
- `page-content` skill (Placement table and checklist), `layout` skill (prototype screens centered) and `CLAUDE.md` (Page content) updated.
- Verification: prototypes check and breakpoint check pass. Measured at 1280px: screen 120 → 1160 (1040px, centered), title 144 → 1136, cards 144 → 800 (656px), timeline 816 → 1136 (320px) — exactly on the grid columns; the Show grid overlay of the preview page matches. Mobile and tablet unchanged (cards full width). No console errors. Previewed and validated by the Design System Lead before commit.

**Files**
- `prototypes/_shared/base.css`, `prototypes/work-description/main.css`, `.claude/skills/page-content/SKILL.md`, `.claude/skills/layout/SKILL.md`, `CLAUDE.md`, `STEPS.md` (updated)

## Step 158 — Prototype preview page choices confirmed
**Date:** 2026-10-21 (on `prototype/work-description`, committed as "Step 150"; renumbered when `main` was merged, since `main` uses 145–152)

**Decisions (made by the Design System Lead)**
- The choices left "to confirm" in Step 143 are approved: frame heights **812 / 1024 / 800px** (Mobile / Tablet / Desktop), subtitle **"Live preview on mobile, tablet and desktop"**, navigation icon **`preview`**, and the **Open in a new tab** link.

**What was done**
- Recorded the decision; no code change (`docs/src/pages/PrototypePage.tsx` already uses these values).

**Files**
- `STEPS.md` (updated)

## Step 159 — main merged again into prototype/work-description; prototype on the full-width rule
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- Merge `main` into `prototype/work-description`. `page-content` conflict: keep the `main` version (12-column grid on the full screen width, timeline filling its 4 columns, no maximum width); the branch version (1040px / 400px, Step 157) is dropped.
- `STEPS.md`: keep both histories; the branch's steps 145–150 are renumbered 153–158, after `main`'s 145–152.
- The WorkDescription prototype follows the `main` rule.

**What was done**
- Merged `origin/main` (Steps 145–152 of `main`: Timeline fills its column, TimelineStep dates under a narrow title, `size.timeline-step-title`, ticket B031 renamed, one `page-content` rule). Conflicts: `.claude/skills/page-content/SKILL.md` (main version), `STEPS.md` (both histories, branch entries renumbered with a note giving their commit number).
- `prototypes/work-description/main.css`: from `--breakpoint-desktop`, the screen has no maximum width; cards on columns 1–8, timeline on columns 9–12.
- `layout` skill: prototype screens stay centered at `size.content`, except a Timeline + Cards screen (full width, `page-content`). `CLAUDE.md`, Page content: full-width rule.
- Verification: build, prototypes check and breakpoint check pass. At 1280px: screen 1280px wide, cards 24 → 840 (816px, 8 columns), timeline 856 → 1256 (400px, 4 columns) — exactly on the grid; step dates under the title. No console errors. Previewed and validated by the Design System Lead before commit.

**Files**
- Merge of `main` (Steps 145–152 of `main`); `prototypes/work-description/main.css`, `.claude/skills/layout/SKILL.md`, `.claude/skills/page-content/SKILL.md`, `CLAUDE.md`, `STEPS.md` (updated)

## Step 160 — WorkDescription specification
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- The specification of ticket B031 is written from the decisions already made, and validated. The ticket description stays as it is.

**What was done**
- New `prototypes/work-description/spec.md` (from `prototypes/_template/spec.md`), shown on the ticket page `/docs/#/backlog/B031`:
  - **Components & content**: one screen (`Screen` + `page-content` rules); table of the parts — page header, `Timeline` (label "Steps") with its icon buttons, 4 `TimelineStep`s, 4 `Card`s — and their content; the content is neutral placeholders for now, with the list of what the real content must give.
  - **Acceptance criteria** (checkboxes): timeline and cards (one card per step, anchors, one selected step, space after the last card), layout (desktop full-width 12-column grid with cards 8 / timeline 4, mobile and tablet panel, page margin and header), quality (components and tokens only, no console errors, preview at 375 / 768 / 1280px with the grid).
- Verification: the ticket page shows the spec, no console errors. Previewed and validated by the Design System Lead before commit.

**Files**
- `prototypes/work-description/spec.md` (created), `STEPS.md` (updated)

## Step 161 — Branch prototype/work-description merged into main
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- Merge `prototype/work-description` into `main` (prototype set up, specified and validated so far).

**What was done**
- Merged `prototype/work-description` into `main` (no conflict: `main` had been merged into the branch at Step 159). `main` now has the WorkDescription prototype with placeholder content, its spec (ticket B031), the "preview before commit" rule, prototype names on the site, and Steps 153–160.
- The branch is kept (local and on GitHub) for the next iterations of the prototype.
- Verification: build passes on `main`.

**Files**
- Merge of `prototype/work-description` (Steps 140–141 and 153–160 of the branch); `STEPS.md` (updated)

## Step 153 — Card clickable-image variant started; image viewer first
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- New Card variant: property **`variant`** = `default` | **`clickable-image`**.
- Several images, shown as **thumbnails under the text**, fixed **16:9** ratio, corners `--radius-8`. **Only the images are clickable**; a click **opens the image larger**.
- The viewer that opens the image is a **new component, built first** (its own stages).

**What was done**
- Backlog: B077 "Component: image viewer" (decided, in progress, stage design) and B078 "Card: clickable-image variant" (decided, to do, stage design, with the decisions above and what is left to define). Nothing written in `components/Card/` yet: the Card spec is updated once the variant is fully defined and approved.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step 154 — ImageViewer: component created, design preview (stage 1 in progress)
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- Name **ImageViewer** (folder `ImageViewer/`, class `.ds-image-viewer`), level **organism**, description "Opens an image larger, over the page, one at a time."
- **Full screen** over the page, on the **dimmed background** (`background.overlay`); **whole image visible** (scaled down to fit, never cropped).
- **Previous / next** between the images of the card (IconButtons `primary`), **under the image**, with the **counter** ("2 / 5"); **close button** (IconButton `primary`) at the **top right**; **caption** optional, 150 characters max, wraps, under the counter.
- Contrast: on the dimmed background no text color reaches AA on every page (white text 2.58:1 on a white page, dark text 1.57:1 on a brand page). Decided: the arrows, counter and caption sit on a **solid band** under the image (`background.inverse`, text `text.inverse`: 15.52:1).

**What was done**
- `components/ImageViewer/` created from the template (`meta.json`: status `design`; template files renamed, class `.ds-image-viewer`).
- Design preview (`design/Preview.tsx`, `design/tokens.json`): a page seen through the dimmed background, close button top right, placeholder image, the band (previous · counter · next, then the caption). Proposed slot tokens, to approve: edge `space.24`, image corners `radius.8`, band padding `space.16`, gap `space.8`, counter `label`, caption `body`.
- Verification: type check passes; the Design preview tab of `/docs/#/components/imageviewer` renders with no console errors, band contrast 15.52:1 ✓.
- `spec.md` not written yet (only approved content goes in it).

**Files**
- `components/ImageViewer/` (new: `meta.json`, `design/Preview.tsx`, `design/tokens.json`, template files)
- `STEPS.md` (updated)

## Step 155 — ImageViewer spec written (awaiting approval)
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- Approved: the proposed slot tokens (edge `space.24`, image `radius.8`, band padding `space.16`, gap `space.8`, counter `label`, caption `body`); previous / next **disabled at the ends** (no loop); with **one image**, no arrows and no counter (band only for a caption); keyboard and focus (focus on the close button and kept in the viewer, Escape closes, ← / → change image, focus back to the thumbnail, white focus ring, motion tokens).

**What was done**
- `components/ImageViewer/spec.md` written: purpose, anatomy (8 parts), props, combinations, content, sizes, states with keyboard and focus, design tokens, contrast.
- Added by Claude, to approve with the spec: prop names (`images` with `src` / `alt` / `caption`, `index`, `open`, `onClose`, `onIndexChange`, `label`), image–band gap `space.16`, band corners `radius.8`, image never enlarged beyond its own size, motion `duration.300` + `easing.ease-out`, button names.

**Files**
- `components/ImageViewer/spec.md`, `STEPS.md` (updated)

## Step 156 — ImageViewer: brand-subtle band, previous / next only
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- The band under the image uses **`background.brand-subtle`** and holds **only the previous and next buttons**: no counter, no caption.

**What was done**
- Design preview (`design/Preview.tsx`, `design/tokens.json`): band in `brand-subtle` with the two buttons; slots `band-text`, `counter`, `caption` removed.
- `spec.md`: anatomy (6 parts), `images` items are `{ src, alt }`, one image → no band, no text in the viewer, band tokens, contrast. In the band the focus ring becomes the usual `border.focus` (5.35:1 ✓); the white ring (1.14:1 on the band) is dropped.
- Open question: the close button sits on the dimmed background, where neither the brown (2.36:1) nor the white (2.58:1) focus ring reaches 3:1 on a white page.

**Files**
- `components/ImageViewer/design/Preview.tsx`, `components/ImageViewer/design/tokens.json`, `components/ImageViewer/spec.md`, `STEPS.md` (updated)

## Step 157 — ImageViewer spec approved (stage 1 complete)
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- Spec approved, including the points proposed by Claude (prop names, button names, image–band gap `space.16`, band corners `radius.8`, image never enlarged, motion `duration.300` + `easing.ease-out`).
- Close button focus: a **double ring**, **white inside** (`border.focus-inverse`), **brown outside** (`border.focus`), `border-width.2` each. Claude reported that the two colors are only 6.10:1 apart (the two-color technique asks for 9:1) and that on a light page under the dimmed background both rings stay below 3:1 (brown 2.36:1, white 2.58:1); a dark ring with a new token was offered. The Design System Lead **accepted this exception** to the AA target.

**What was done**
- `components/ImageViewer/spec.md`: close button double focus ring, contrast table (exception recorded), no open question left.
- `meta.json` status → `guidelines`; backlog B077 renamed "Component: ImageViewer", stage `guidelines`.

**Files**
- `components/ImageViewer/spec.md`, `components/ImageViewer/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step 158 — ImageViewer guidelines written; spec: thumbnail while loading
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- When to use: from a Card `clickable-image`. When not to use: decorative images, images already big enough, content other than images (a dialog, not in the design system yet), navigation to a page (link or Button).
- Best practice: open the clicked image. Alt text: describe what the image shows. No maximum number of images.
- Loading: show the thumbnail until the large image is loaded → **spec change**: images get an optional **`thumbnailSrc`**. Error: nothing specific.
- Do / don't: images vs other content (shown visually in the chat).

**What was done**
- `spec.md`: `images` items `{ src, alt, thumbnailSrc? }`; Loading and Error states (the thumbnail is shown at the image size — added by Claude, to approve).
- `guidelines.md` written: when (not) to use, best practices, do / don't, content, behavior, accessibility, related components.

**Files**
- `components/ImageViewer/spec.md`, `components/ImageViewer/guidelines.md`, `STEPS.md` (updated)

## Step 159 — ImageViewer band: background.subtle
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- The band under the image uses **`background.subtle`** (neutral-100) instead of `background.brand-subtle`.

**What was done**
- `design/tokens.json` (band-background), `spec.md` (token and contrast) and `guidelines.md` (contrast) updated. Contrast on the band: buttons (`background.brand` on `background.subtle`) 5.50:1 ✓, focus ring (`border.focus`) 5.50:1 ✓.

**Files**
- `components/ImageViewer/design/tokens.json`, `components/ImageViewer/spec.md`, `components/ImageViewer/guidelines.md`, `STEPS.md` (updated)

## Step 160 — ImageViewer preview: text under the image, for comparison
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- Show an example with a text under the image, **for comparison only** (nothing changes in the spec): between the image and the band, on `background.subtle`.

**What was done**
- `design/Preview.tsx`: when the **Content** field of the Design preview tab is filled, a text appears between the image and the band (`body`, `text.primary` on `background.subtle`: 13.99:1, padding `space.8` / `space.16`, corners `radius.8`, as wide as the image — chosen by Claude for the comparison). Empty field → no text (the approved design).
- Verification: type check passes; in the browser, filling the field shows close · image · text · band in this order with the expected colors, and clearing it removes the text.

**Files**
- `components/ImageViewer/design/Preview.tsx`, `STEPS.md` (updated)

## Step 161 — ImageViewer: optional caption
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- The text under the image is kept as an **optional caption** per image: 150 characters max, wraps; between the image and the band; `body`, `text.primary` on `background.subtle` (13.99:1); padding `space.8` / `space.16`; corners `radius.8`; as wide as the image; no caption → nothing shown.
- Screen reader: the caption is **read after the alt**, linked to the image.

**What was done**
- `design/tokens.json`: caption slots (background, text, padding x / y, radius, text style) and contrast pair; default preview text set to a caption. `design/Preview.tsx` uses these slots.
- `spec.md`: anatomy (caption = part 4), `images` items `{ src, alt, caption?, thumbnailSrc? }`, content, sizes, screen reader, tokens, contrast.
- `guidelines.md`: caption in Content, Behavior, Accessibility. Wording rule proposed by Claude, to approve: "one or two sentences, sentence case; adds to the alt text, does not repeat it".

**Files**
- `components/ImageViewer/design/tokens.json`, `components/ImageViewer/design/Preview.tsx`, `components/ImageViewer/spec.md`, `components/ImageViewer/guidelines.md`, `STEPS.md` (updated)

## Step 162 — ImageViewer guidelines approved (stage 2 complete)
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- Guidelines approved, including the caption wording rule and the thumbnail shown at the image size while loading.

**What was done**
- `meta.json` status → `code`; backlog B077 stage → `code`.

**Files**
- `components/ImageViewer/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step 163 — ImageViewer code (stage 3, awaiting approval)
**Date:** 2026-10-23

**What was done**
- `components/ImageViewer/ImageViewer.tsx`: controlled component (`images` `{ src, alt, caption?, thumbnailSrc? }`, `index`, `open`, `onClose`, `onIndexChange`, `label`); modal dialog; close IconButton at the top right; image in a `<figure>` with its optional `<figcaption>` (read after the alt); band with previous / next IconButtons only when there are several images, disabled at the ends; thumbnail shown until the image is loaded; keyboard (Escape, ← / →, Tab kept inside), focus on the close button at opening and back to the opener at closing; when an arrow becomes disabled while focused, the focus moves to the other arrow.
- `ImageViewer.css`: semantic tokens only — dimmed background, `z-index.modal`, padding `space.24`, gaps `space.16`, image `radius.8`, never enlarged and never cropped (`object-fit: contain`), caption (`body`, `text.primary` on `background.subtle`, `space.8` / `space.16`, `radius.8`) as wide as the image, band (`background.subtle`, `space.16`, gap `space.8`, `radius.8`), close button double focus ring (white `border-width.2` inside, brown outside), fade with `duration.300` / `easing.ease-out`.
- The caption width is set from the measured image width (a layout measurement, not a design value).
- Found while testing: the close button overlapped the top of a wide image; it now sits on its own row above the image (the image takes the space left below it, as in the spec).
- `examples.tsx` (4 examples: 3 images with captions, 1 image without caption, small image, long caption) with 3 SVG example images in `components/ImageViewer/examples/`; export added to `components/index.ts`.
- Verification: type check and build pass. In the browser (localhost:5174, Examples tab, no console errors): dialog role / modal / name, focus on the close button, ← / → and buttons change the image, previous disabled on the first and next on the last, no loop, focus kept inside; one image → no band, no caption; Escape → closing → closed and focus back to the opening button; small image shown at 320×180 (not enlarged); caption width = image width (944px landscape, 398px portrait); long caption wraps on 2 lines; at mobile width no horizontal scroll. Not checkable here: the animations and the visible focus ring (the Browser pane was hidden, which freezes animations and prevents screenshots; the closing was completed by sending the end-of-animation event).

**Files**
- `components/ImageViewer/ImageViewer.tsx`, `components/ImageViewer/ImageViewer.css`, `components/ImageViewer/examples.tsx`, `components/ImageViewer/examples/*.svg` (new or rewritten)
- `components/index.ts`, `STEPS.md` (updated)

## Step 164 — ImageViewer complete
**Date:** 2026-10-23

**Decisions (made by the Design System Lead)**
- ImageViewer code approved: the component is **complete**.

**What was done**
- `meta.json` status → `complete`; backlog B077 → `done`. Exported from `@ds/components` since step 163.
- Next: the Card `clickable-image` variant (B078 → in progress).

**Files**
- `components/ImageViewer/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step 165 — Card clickable-image: design preview and spec (awaiting approval)
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- Thumbnails: **3 per row**, sharing the card width; one row that **wraps**; **`--space-16`** between the text and the thumbnails, **`--space-8`** between thumbnails; **no maximum** number.
- Thumbnail states: **state layers + focus ring**. Screen reader name: **"Open image: <alt>"**.
- Prop **`images`**, same shape as the ImageViewer (`{ src, alt, caption?, thumbnailSrc? }`).

**What was done**
- Documentation site: the Design preview tab now passes the selected variant to the component preview (`variant` in `PreviewProps`), so a preview can show variant-specific parts.
- Card design preview: variant `clickable-image` with 4 thumbnails (3 per row, 16:9, the first one showing the state), new slots `thumbnails-gap-top`, `thumbnails-gap`, `thumbnail-radius`; states default / hover / focus / pressed.
- `components/Card/spec.md`: purpose, anatomy (thumbnails), `variant` and `images` props, combinations (forbidden: `clickable-image` without images, `default` with images), content (alt), sizes, states (thumbnails, opening the ImageViewer, focus back), tokens, contrast (focus outline 6.10:1). Added by Claude, to approve: the image is cropped to fill the 16:9 thumbnail; the forbidden combinations.
- Verification: type check passes; in the browser the clickable-image preview shows 3 columns, thumbnails 92×52 (16:9), 8px gaps, 16px under the text, the 4th thumbnail on a second row, brown focus outline, no console errors.

**Files**
- `docs/src/types.ts`, `docs/src/DesignPreview.tsx`, `components/Card/design/Preview.tsx`, `components/Card/design/tokens.json`, `components/Card/spec.md`, `STEPS.md` (updated)

## Step 166 — Card clickable-image spec approved
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- Card spec with the `clickable-image` variant approved, including the 16:9 crop of the thumbnails and the forbidden combinations.

**What was done**
- Backlog B078 → stage `guidelines`. Card `meta.json` stays `complete` while the change goes through the stages.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step 167 — Card guidelines: clickable-image (awaiting approval)
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- When to use `clickable-image`: images that support the text. When not to use: decorative images (default card), a single hero image (not in the design system yet).
- Do's and don'ts: thumbnails under the text; meaningful alt; related images in one card (shown visually in the chat). No rule on the order of the images.

**What was done**
- `components/Card/guidelines.md`: When (not) to use, best practices, three do / don't pairs, content (alt text, captions, no maximum), behavior (thumbnails, opening the ImageViewer, focus back), accessibility (thumbnail buttons, name, focus, target size), related components (ImageViewer).

**Files**
- `components/Card/guidelines.md`, `STEPS.md` (updated)

## Step 168 — Card clickable-image code (stage 3, awaiting approval)
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- Card guidelines for `clickable-image` approved (step 167).

**What was done**
- `components/Card/Card.tsx`: props `variant` (`default` | `clickable-image`) and `images`; the types forbid `clickable-image` without images and `default` with images. Thumbnails are buttons (`aria-label` "Open image: <alt>", `aria-haspopup="dialog"`) showing `thumbnailSrc` or `src`; a click opens the `ImageViewer` on that image; the viewer gives the focus back to the thumbnail. Modifier class `ds-card--<variant>` always added.
- `components/Card/Card.css`: thumbnails grid 3 columns, `space.8` gap, `space.16` under the text, 16:9 cropped (`object-fit: cover`), `radius.8`, state layers and `border.focus` outline. The 16:9 ratio is written as `aspect-ratio: 16 / 9` (no token exists for ratios).
- `components/Card/examples.tsx`: 3 new examples (3 images, 4 images wrapping, 1 image). `components/index.ts`: Card types exported.
- Backlog B078 → stage `code`.
- Verification: type check and build pass. In the browser (Examples tab, no console errors): thumbnails 143×81 (16:9), 3 per row with the 4th on a second row, 8px gaps, 16px under the text, names "Open image: …"; a click on the 3rd thumbnail opens the viewer on that image with the band and the focus on the close button; Escape closes and the focus returns to that thumbnail; with one image, no band; the default card has no thumbnails.

**Files**
- `components/Card/Card.tsx`, `components/Card/Card.css`, `components/Card/examples.tsx`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step 169 — Card clickable-image complete
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- Card `clickable-image` code approved: the variant is complete.

**What was done**
- Backlog B078 → `done` (description updated with the final decisions). Card `meta.json` stays `complete`.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B079-1 — Git workflow: one branch per piece of work
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- One piece of work = one branch = one folder = one Claude session. Branches `component/<Name>` (merged into `main` after each approved stage), `prototype/<folder-name>` (merged when the prototype is validated, or on request), `governance/<topic>` (merged as soon as approved). `main` holds approved work only.
- Steps are numbered per backlog ticket (`Step B079-1`); steps 1 → 169 keep their number.
- Everything is automatic: Claude picks the branch from the ticket, sets up the folder, commits, updates from `main`, merges, and dispatches the skills. The Design System Lead never runs git, creates a folder or a branch, or names a skill.
- Also approved: a task with no ticket gets a `decided` ticket first; governance branches are merged first; the WorkDescription prototype numbers its next steps `B031-<n>`.

**What was done**
- New skill `.claude/skills/git-workflow/SKILL.md`: branches, one folder and one session per branch, start of a piece of work, steps numbered per ticket, update from `main` (start of session and before every commit), merge into `main` (fast-forward push, then the `main` folder updated), shared files and conflicts (`STEPS.md`, `backlog.json`, design system files).
- `orchestrator`: row for `git-workflow`; dispatch is automatic. `component`: work on `component/<Name>`, merged after each approved stage, branch deleted once complete. `prototype-setup`: branch `prototype/<folder-name>`, no name asked.
- `CLAUDE.md`: Steps log and Git sections.
- Backlog: ticket B079 added, done.

**Files**
- `.claude/skills/git-workflow/SKILL.md` (new)
- `.claude/skills/orchestrator/SKILL.md`, `.claude/skills/component/SKILL.md`, `.claude/skills/prototype-setup/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B080-1 — Conversations and their usage
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- All conversations are opened in the same Claude project, `BuildDesignSystem`: **Gouvernance** (one, permanent, branches `governance/<topic>`), **Composant `<Name>`** (one per component, `component/<Name>`) and **Prototype `<Name>`** (one per prototype, `prototype/<folder-name>`). No conversation works on `main`.
- When a component or a prototype is finished, its conversation is archived (not deleted); a later change opens a new conversation with a new branch.
- Claude names a new conversation after the table, and redirects a task outside the usage of the conversation to the right one.
- The conversations « main » (deleted), « Composants » and « Prototypes » (archived) are no longer used.

**What was done**
- `git-workflow` skill, section 2 "Conversations, folders and sessions": table of the conversations, naming, redirection, end of a component or a prototype.
- `component` skill: offer to archive the conversation once the component is complete. `CLAUDE.md`: conversations summarized in the Git section.
- Backlog: ticket B080 added, done.

**Files**
- `.claude/skills/git-workflow/SKILL.md`, `.claude/skills/component/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B081-1 — Skill: card
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- A new `card` skill covers **composing cards in a page** (placement, spacing, grouping), loaded for **any page with Cards**, with or without a Timeline.
- `page-content` keeps its Timeline + Cards rules and refers to the `card` skill.
- The skill contains only rules already approved (Card guidelines, `layout` skill). Open questions, not decided: order of cards without a timeline, cards side by side, number of cards per page, content between cards.

**What was done**
- New `.claude/skills/card/SKILL.md`: placement (stacked, full width of the column, 16px `--space-16` between cards, on the layout grid), grouping (no nested cards, `clickable-image` images of the same subject in one card), checklist.
- `page-content` skill: refers to `card` (intro and checklist). `orchestrator` skill: new row "page containing Cards → `card`", and Timeline + Cards loads `page-content` + `card`. `CLAUDE.md`: one line under Page content.
- Backlog: ticket B081 added, done.
- Verification: build passes; the skill shows on the How to use skills page, no console errors. Previewed and validated by the Design System Lead before commit.

**Files**
- `.claude/skills/card/SKILL.md` (created)
- `.claude/skills/page-content/SKILL.md`, `.claude/skills/orchestrator/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B031-1 — WorkDescription: cards with images, card skill
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- The prototype follows the new `card` skill (Step B081-1) together with `page-content`.
- All 4 cards use the **`clickable-image`** variant, with **3 images each** (one row of thumbnails).
- Images: **neutral placeholders** (landscape, portrait, small), alternative text "Placeholder image n of step n", no caption — to replace with the real images later.
- New screens come next, to define with the Design System Lead.

**What was done**
- `main` merged into `prototype/work-description` (fast-forward, Steps up to B081-1).
- New `prototypes/work-description/images/` (`landscape.svg`, `portrait.svg`, `small.svg`, neutral gray).
- `prototypes/work-description/main.tsx`: each card is `clickable-image` with its 3 images (`ImageViewerImage` from `@ds/components`); comments cite the `card` skill. `main.css`: comments cite the `card` skill.
- `prototypes/work-description/spec.md`: `card` rules, cards `clickable-image`, new Images row (ImageViewer), images in the real content to provide, new acceptance criteria "Cards" (`card` skill).
- Backlog: ticket B031, first iteration (changes requested: cards with images).
- Verification: typecheck, build and prototypes check pass. 12 thumbnails, 3 per row; a click opens the ImageViewer on the right image; Escape closes it and brings the focus back to the thumbnail. Cards full width of their column, 16px apart (1024px and 375px), no horizontal scroll, no console errors on load. Previewed and validated by the Design System Lead before commit.

**Files**
- `prototypes/work-description/images/landscape.svg`, `portrait.svg`, `small.svg` (created)
- `prototypes/work-description/main.tsx`, `main.css`, `spec.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B082-1 — Documentation page: Navigation structure
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- Navigation levels: **Level 0** landing page; **Level 1** Documentation (opens on Overview), Prototypes, Navigation, Portfolio; **Level 2** Overview (content: Description + Summary), Governance, Foundations, Components; **Level 3** Backlog and How to use skills (Governance), one page per Foundations category (Color, Typography, Spacing, Radius, Border width, Shadows, Motion, Opacity, Size, Breakpoints, Layout grid, Z-index, Icons), one category per Atomic Design level (Components); **Level 4** component pages only.
- Navigation principles: the logo goes back to Level 0 from every level; a breadcrumb goes back to any level above; Level 3 is the deepest level except component pages, and the detail of a Level 3 page (e.g. a ticket) opens in a modal (to build later); inside a page, anchors and a timeline on the right; component pages keep their current tabs.
- To define later: order of Level 1, content of Prototypes and Portfolio, empty Templates and Pages, which pages get the timeline, when the site follows this structure.
- Also approved: the "Navigation" section of the side navigation (icon `account_tree`), and one dev server port per conversation.

**What was done**
- New page `docs/src/pages/NavigationPage.tsx` (`#/navigation`), in a new "Navigation" section under Prototypes: levels table, flow (tree with level badges; components listed from their `meta.json`), principles, to define. Styles `.nav-tree*` in `docs/src/docs.css` (tokens only).
- Backlog: B082 added, done; B083 Breadcrumb added as `proposal`; B029 Modal description completed (detail of a Level 3 page).
- Tooling: the dev server takes the port given by the preview (`PORT`, 5173 otherwise), so several conversations can preview at the same time (`vite.config.ts`, `.claude/launch.json` with `autoPort`).
- Verification: type check and build pass; the page shows with no console errors.

**Files**
- `docs/src/pages/NavigationPage.tsx` (new)
- `docs/src/App.tsx`, `docs/src/docs.css`, `vite.config.ts`, `.claude/launch.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B082-2 — Navigation structure: open questions removed from the page
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- Remove from the Navigation structure page the note on the breadcrumb and the modal, and the "To define" section.

**What was done**
- `docs/src/pages/NavigationPage.tsx`: note and "To define" list removed; the page ends with the navigation principles. The open questions stay logged in Step B082-1.
- Verification: type check passes; the page shows with no console errors.

**Files**
- `docs/src/pages/NavigationPage.tsx`, `STEPS.md` (updated)

## Step B079-2 — Git workflow: show main after every merge
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- After every merge into `main`, Claude opens the documentation site in the browser pane, served from the latest `main`, on the page that changed. Each conversation serves the site of its own branch, so this is the reliable view of `main`; the Design System Lead runs nothing.

**What was done**
- `git-workflow` skill, section 6 (merge into `main`): new step 4 "Show `main`"; the next steps renumbered.

**Files**
- `.claude/skills/git-workflow/SKILL.md`, `STEPS.md` (updated)

## Step B084-1 — Backlog: proposals for agents
**Date:** 2026-10-27

**What was done**
- Two new backlog proposals about agents (sub-agents of Claude Code), added at the request of the Design System Lead after a question on what agents are for:
  - B084 — Dedicated agents for recurring checks (`.claude/agents/<name>.md`), e.g. a token auditor.
  - B085 — Rules for agents in `CLAUDE.md`, e.g. agents read and propose only.
- Both stay `proposal`: only the Design System Lead approves them.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B085-1 — Rules for agents
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- Agents (sub-agents launched by Claude) read and propose only: they never change `tokens/`, `components/` or `prototypes/`.
- Claude checks every agent result before showing it; the `never-invent` rule applies to agents too.

**What was done**
- New `Agents` section in `CLAUDE.md`. Ticket B085 approved and done.

**Files**
- `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B086-1 — Skill: navigation
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- Create a `navigation` skill from the approved navigation structure (Step B082-1).

**What was done**
- New skill `.claude/skills/navigation/SKILL.md`: levels (Level 0 → Level 4), structure of the site, navigation principles (logo, breadcrumb, depth and modals, anchors and timeline, component tabs), what to do when the structure changes (place every page in a level, modal below Level 3, change the skill and the Navigation structure page together), and what is not defined yet. Target structure: the site does not follow it yet.
- `orchestrator`: dispatch row for `navigation`. `CLAUDE.md`: Navigation section.
- Backlog: B086 added, done.

**Files**
- `.claude/skills/navigation/SKILL.md` (new)
- `.claude/skills/orchestrator/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B079-3 — Git workflow: reserve a new ticket at once
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- A new ticket is committed and pushed on its branch right away, before any other work, so other conversations see its ID (after a collision on B084 in Step B086-1). This is the only commit made before validation; it has no `STEPS.md` entry.

**What was done**
- `git-workflow` skill: section 3, new step 5 "Reserve the ticket at once" (commit message `Ticket <id> reserved: <title>`); section 7, check again after the push that no other branch uses the ID, otherwise take the next one.
- `CLAUDE.md`: the reservation is the only exception to "never commit or push before validation".

**Files**
- `.claude/skills/git-workflow/SKILL.md`, `CLAUDE.md`, `STEPS.md` (updated)

## Step B087-1 — Site follows the navigation structure
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- Level 1 spaces: **Documentation** and **Portfolio** only. **Prototypes** and **Navigation** are Level 2 sections of Documentation (correction after the first preview).
- Level 0 (root page `/`): one card per space. Spaces as links in the header; the side navigation shows only the current space.
- Overview: Description, then Summary with one card per section. Level 2 sections with Level 3 pages get a page of their own with one card per page.
- Foundations: one page per category; Text styles on Typography; contrast table and state layers on Color.
- Components: the five Atomic Design categories are always listed, an empty one says "No component yet".
- Prototypes: one card / navigation item per prototype plus "All prototypes". Portfolio: placeholder "Nothing yet.".
- Breadcrumb (B083) and modal (B029) come later, once they are components; tickets keep their page meanwhile.
- Below tablet, the header keeps the logo (only the site name is hidden), so Level 0 is reachable from a phone.

**What was done**
- `docs/src/structure.ts` (new): the navigation tree, which drives the header spaces, the side navigation (current space, current section unfolded) and the search (every page).
- `docs/src/foundations.ts` (new): the 13 Foundations categories and their token groups. `TokensPage.tsx` → `FoundationPage.tsx` (one category per page); Grid page renamed Layout grid.
- `docs/src/pages/SectionPages.tsx` (new): Overview, section pages, component categories, Prototypes, Portfolio. `HomePage.tsx` removed.
- `App.tsx`: routes by level; old routes `#/tokens`, `#/icons`, `#/grid` redirect. `AppShell.tsx` + `docs.css`: logo → `/`, spaces in the header (in the menu below desktop), nested side navigation, cards stacked full width (card skill).
- Root `index.html`: one card per space.
- `navigation` skill and Navigation structure page: the new levels and "How the site applies it".

**Files**
- `docs/src/structure.ts`, `docs/src/foundations.ts`, `docs/src/pages/SectionPages.tsx` (new)
- `docs/src/pages/FoundationPage.tsx` (renamed from `TokensPage.tsx`), `docs/src/pages/HomePage.tsx` (removed)
- `docs/src/App.tsx`, `docs/src/AppShell.tsx`, `docs/src/docs.css`, `docs/src/pages/GridPage.tsx`, `docs/src/pages/NavigationPage.tsx`, `index.html`, `.claude/skills/navigation/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B088-1 — Landing page: cloud background
**Date:** 2026-10-27

**Decisions (made by the Design System Lead)**
- Ticket B088 (landing page illustrations) is built in 3 steps; step 1 is the page background.
- Background: a sea of clouds seen from above, drawn as an engraving (proposal B3): each bump filled with concentric lines, thicker toward the shadow, hatching at the base, light from the top right.
- Colors: primary palette, with cream highlights (secondary-600) on the nearest lit tops; footbridge secondary-800 (planks secondary-900); walker primary-950.
- Composition given by the Design System Lead (portrait 9:16): hazy far sea at the top (horizon around 12 %), a great dark column on the left, a darker dome in front of it, cumulus getting smaller toward the top right, light cumulus on the right, a winding footbridge with a small walker in the valley. The walker sits on the bridge (the given point was off the bridge path).
- Option C: landscape screens get the same zones recomposed in a landscape layout.
- Readability: a dark panel (primary-900, radius 16, padding 24) behind the avatar, the clock, the title and the subtitle; the link cards stay light.

**What was done**
- `home-clouds.ts` (new): draws the illustration in SVG for the window size (portrait or landscape layout), with token colors only; drawn again on resize. About 3,000 shapes.
- `index.html`: the panel around the hero, the title and the subtitle. `docs.css`: fixed background, panel, the one-line title rule now targets the panel.
- `home.ts` loads the drawing; `tsconfig.json` checks the new file.

**Files**
- `home-clouds.ts` (new)
- `home.ts`, `index.html`, `docs/src/docs.css`, `tsconfig.json`, `STEPS.md` (updated)

## Step B089-1 — Work-time clock: keep the time of deleted conversations
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- Baseline: **08:50:14**, the value the clock showed on 2026-10-27 at 09:30:59 UTC (10:31 in Paris), just before conversations were deleted. Their logs, and their hours, were gone from the clock (it showed about 3 hours).
- Keep the time already counted, so deleting a conversation no longer removes time.

**What was done**
- `vite.config.ts` (`/api/work-time`): total = baseline + active time after it. Reads the logs of every checkout folder, including removed worktrees. The active periods are saved in a ledger shared by all the checkouts (`~/.claude/projects/<main checkout>/work-time.json`) and merged with the new ones (same 15-minute pause rule).
- Backlog: B089 added (reserved first), done.
- Verification: build passes; the clock shows 11:31:56 and keeps ticking; the ledger is written.

**Files**
- `vite.config.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B090-1 — BreadcrumbItem: design approved
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- B083 Breadcrumb approved from the chat (was a proposal): **Breadcrumb**, molecule, class `.ds-breadcrumb`, one style, one size, text links. Split into a building block, **BreadcrumbItem**, built first (ticket B090), in this same conversation.
- **BreadcrumbItem**: atom, class `.ds-breadcrumb-item`, description "One link of a breadcrumb, to a level above the page.", one type, one size.
- Link: `body-sm`, `--color-text-link`. Separator: a text slash "/" after the link, part of the item, `--color-text-secondary`, `--space-8` from the link.
- Variant `last` (boolean, default `false`): no slash on the last item.
- Long label: one line, ellipsis only when the breadcrumb runs out of space (no fixed width).
- States: hover and pressed underline the link (no state layer); focus = ring `--color-border-focus` + focus state layer behind the label (so it differs from hover), `--radius-4`; disabled = link and slash in `--color-text-disabled`, not a link, not focusable.
- Design approved; next stage: guidelines.

**What was done**
- `components/BreadcrumbItem/` created from the template: `meta.json` (status `guidelines`), `spec.md`, design preview (`design/Preview.tsx`, `design/tokens.json`, variants `default` and `last`, disabled state).
- Contrast: `text.link` and `text.secondary` already checked (AA); link on the focus layer 5.2:1; disabled exempt.
- Backlog: B083 in progress; B090 added (reserved first), stage `guidelines`.

**Files**
- `components/BreadcrumbItem/meta.json`, `spec.md`, `guidelines.md` (template), `design/Preview.tsx`, `design/tokens.json` (new)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B090-2 — BreadcrumbItem: guidelines approved
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- When to use: only inside a Breadcrumb; one item per level above the page. When not to use: NavigationItem for pages of the same level, TimelineStep for steps or events.
- The Breadcrumb sets `last` (final item) and `disabled` (a level with no page of its own); never set by hand.
- Content: label = the page title word for word, sentence case, text only (no icon, no punctuation).
- Four do / don't pairs: label = page title; sentence case, text only; no slash after the last item; disabled only for a level with no page.
- Accessibility: Tab + Enter, disabled items skipped; slash `aria-hidden`; disabled item as plain text, label still read; link color differs from body text, so the underline is not the only cue.
- Related component: Breadcrumb.
- Guidelines approved; next stage: code.

**What was done**
- `components/BreadcrumbItem/guidelines.md` written; `meta.json` status `code`; backlog B090 stage `code`.

**Files**
- `components/BreadcrumbItem/guidelines.md`, `meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B090-3 — BreadcrumbItem: code approved, component complete
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- Code approved: BreadcrumbItem is **complete**.

**What was done**
- `BreadcrumbItem.tsx`: props `href`, `children` (label), `last` and `disabled` (both `false` by default). Renders an `<li>` (the Breadcrumb will be the list); the link is an `<a>`, a disabled item a plain `<span>` (not focusable, label still read); the slash is `aria-hidden` and left out when `last`.
- `BreadcrumbItem.css`: semantic tokens only; `body-sm`, `--color-text-link`, underline on hover and pressed, focus ring `--color-border-focus` + focus state layer, slash `--color-text-secondary` at `--space-8`, disabled `--color-text-disabled`, ellipsis on one line.
- `examples.tsx`: Default, Last, Disabled, Several items, Long label. Exported from `components/index.ts`.
- Verification: typecheck and build pass; Tab skips the disabled item; focus ring + layer, hover underline and ellipsis checked in the browser.
- `meta.json` status `complete`; backlog B090 `done`.

**Files**
- `components/BreadcrumbItem/BreadcrumbItem.tsx`, `BreadcrumbItem.css`, `examples.tsx` (new)
- `components/BreadcrumbItem/meta.json`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B083-1 — Breadcrumb: design approved
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- **Breadcrumb**: molecule, class `.ds-breadcrumb`, description "Shows where the page sits and goes back to any level above it.", one style, one size, text links. Built from its building block **BreadcrumbItem** (B090, complete).
- Anatomy: a navigation landmark named "Breadcrumb" with BreadcrumbItems, one per level from Level 0 down to the parent of the current page; the current page is not an item.
- The Breadcrumb sets `last` on its final item and `disabled` on a level with no page.
- `--space-8` between a slash and the next item.
- Overflow: one line; labels cut with an ellipsis when the breadcrumb is wider than its container; the last item kept whole.
- No state of its own (those of BreadcrumbItem). Design approved; next stage: guidelines.

**What was done**
- `components/Breadcrumb/` created from the template: `meta.json` (status `guidelines`), `spec.md`, design preview (`design/Preview.tsx` with the BreadcrumbItem component, wide and narrow; `design/tokens.json`).
- Backlog: B083 stage `guidelines`.

**Files**
- `components/Breadcrumb/meta.json`, `spec.md`, `guidelines.md` (template), `design/Preview.tsx`, `design/tokens.json` (new)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B083-2 — Breadcrumb: guidelines approved
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- When to use: every page from Level 2 to Level 4; not on Level 0 nor Level 1. When not to use: inside a page or for a sequence of steps (Timeline), as the main navigation (it complements the SideNavigation).
- Placement: first block of the page content, `--space-16` above the title; one breadcrumb per page; ends with the parent of the current page.
- Three do / don't pairs: above the page title; end with the parent; one per page.
- Small screens: same breadcrumb, ellipsis, last item kept whole.
- Accessibility: nav landmark "Breadcrumb" + ordered list; Tab in reading order, disabled items skipped; a cut label keeps its full text for screen readers.
- Related components: BreadcrumbItem, SideNavigation, Timeline.
- Guidelines approved; next stage: code.

**What was done**
- `components/Breadcrumb/guidelines.md` written; `meta.json` status `code`; backlog B083 stage `code`.

**Files**
- `components/Breadcrumb/guidelines.md`, `meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B083-3 — Breadcrumb: code approved, component complete
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- Code approved: Breadcrumb is **complete**, with the props `items` (`{ label, href, disabled }`).

**What was done**
- `Breadcrumb.tsx`: `<nav aria-label="Breadcrumb">` with an ordered list of BreadcrumbItem, one per level; `last` set on the final item, `disabled` passed from the level.
- `Breadcrumb.css`: semantic tokens only; `--space-8` between items, one line, the last item never shrinks (the others get an ellipsis).
- `examples.tsx`: Level 4 page, Level 2 page, level with no page, not enough space. Exported from `components/index.ts`.
- Verification: typecheck and build pass; landmark and list checked; ellipsis with the last item kept whole checked in the browser.
- `meta.json` status `complete`; backlog B083 `done`; proposal B091 added (breadcrumb on the documentation site).

**Files**
- `components/Breadcrumb/Breadcrumb.tsx`, `Breadcrumb.css`, `examples.tsx` (new)
- `components/Breadcrumb/meta.json`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B091-1 — Site: breadcrumb on Level 2 to Level 4 pages
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- B091 approved from the chat (was a proposal), done in the Breadcrumb conversation as an exception.
- Level 0 item labelled **BuildDesignSystem** (link to the landing page `/`).
- Overview (where Documentation opens): "BuildDesignSystem / Documentation", like the other Level 2 pages.
- Ticket pages: breadcrumb up to the Backlog ("… / Governance / Backlog") until the Modal exists.

**What was done**
- `docs/src/AppShell.tsx`: the Breadcrumb component, first block of the content area (16px above the title), built from `structure.ts`: Level 0, then the levels down to the parent of the page; none on Level 1 (Portfolio). New optional prop `route` for a page outside the navigation (a ticket).
- `docs/src/App.tsx`: passes the route; `TicketPage.tsx`: the "← Backlog" link removed (the breadcrumb ends with the Backlog).
- `navigation` skill and Navigation structure page: the site now follows the breadcrumb principle; only the modal is missing.
- Verification: typecheck and build pass; breadcrumb checked on every kind of page (Level 2, 3, 4, ticket, none on Portfolio); fits on one line at mobile width.
- Backlog: B091 done.

**Files**
- `docs/src/AppShell.tsx`, `docs/src/App.tsx`, `docs/src/pages/TicketPage.tsx`, `docs/src/pages/NavigationPage.tsx`, `.claude/skills/navigation/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B079-4 — Git workflow: the root folder holds main
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- The root folder of the project (`BuildDesignSystem/`) stays on `main` and is updated after every merge: the Claude app reads the project skills (the `/` commands) from it. The `navigation` skill was missing from the commands because the root folder was on an old commit.
- The separate folder `BuildDesignSystem-main` is removed: the root folder is the only folder holding `main`.

**What was done**
- `BuildDesignSystem-main` removed (`git worktree remove`; it held only generated files). The root folder checked out on `main`.
- `git-workflow` skill: section 2, the root folder stays on `main` and is never used to work; section 6, step 3 updates the root folder after each merge.

**Files**
- `.claude/skills/git-workflow/SKILL.md`, `STEPS.md` (updated)

## Step B030-1 — Chip: design approved
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- Ticket B030 started as **Tabs**, then renamed: the component is the **chip** already used on the documentation site to switch the view or filter the content (Backlog category filter, Design preview variant switch). A separate **Tabs** component goes to a new ticket, **B093** (todo, decided).
- Split into building blocks: **Chip** (atom, `.ds-chip`, built first) and **ChipGroup** (molecule, arranges the chips, later). Description: "One choice of a chip group, to switch the view or filter the content."
- Look: the existing site chips — `body` text style, padding `space.4` / `space.16`, `radius.8`, `border-width.1`. Not selected: `background.page`, `border.strong`, `text.primary`. Selected: `background.brand` (background and border), `text.inverse`.
- Content: text only (no icon, no counter); long label cut with an ellipsis on one line.
- One variant property, `selected` (`true` / `false`, default `false`). No disabled state. Hover / focus / pressed: state layers, focus ring `border.focus`.
- For ChipGroup (to confirm then): horizontal scroll when the chips do not fit, chosen while it was still Tabs.

**What was done**
- `components/Chip/` created from the template: `meta.json`, design preview (`design/Preview.tsx`, `design/tokens.json`), `spec.md`. Stage set to `guidelines`.
- Contrast: `text.primary` / `background.page`, `text.inverse` / `background.brand` (4.5:1) and `border.strong` / `background.page` (3:1) already checked in `tokens/contrast-pairs.json`.
- Backlog: B030 renamed Chip, stage `guidelines`; B093 Tabs added.

**Files**
- `components/Chip/` (new), `backlog/backlog.json`, `STEPS.md` (updated)

## Step B030-2 — Chip: guidelines approved
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- When to use: switch the view, filter the content; only inside a ChipGroup. Not for an action (Button), sections of a page (Tabs, B093) or another page (NavigationItem / link). No rule yet for choosing an option in a form.
- One chip selected at a time, always one ("All" first); clicking the selected chip keeps it selected.
- Labels: 1 to 3 words, sentence case, text only, no final period.
- Screen reader: toggle button (`button` + `aria-pressed`); Tab between chips, Enter / Space selects.
- Do's and don'ts: one chip always selected / none selected; short sentence-case labels / sentences, uppercase, punctuation; at least two chips / a single chip; switch or filter / trigger an action.

**What was done**
- `components/Chip/guidelines.md` written. Stage set to `code`.
- Backlog: B030 stage `code`.

**Files**
- `components/Chip/guidelines.md`, `components/Chip/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B030-3 — Chip: code approved, component complete
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- Code of Chip approved: the component is complete.

**What was done**
- `components/Chip/Chip.tsx`: a `<button type="button">` with `aria-pressed` (toggle button); prop `selected` (default `false`), no disabled state; native attributes passed through.
- `components/Chip/Chip.css`: spec tokens only; selected styled on `[aria-pressed="true"]`; state layers for hover / focus / pressed; focus ring `--color-border-focus`; label on one line with an ellipsis.
- `components/Chip/examples.tsx`: not selected, selected, an interactive group (one chip selected at a time, always one), long label.
- `components/index.ts`: `Chip` and `ChipProps` exported. `meta.json` status `complete`.
- Verification: typecheck and build pass; selection and ellipsis checked in the Examples tab; height 31px (above 24px).
- Backlog: B030 done; **B094 ChipGroup** added (todo, decided) — the parent of Chip, approved split.

**Files**
- `components/Chip/Chip.tsx`, `components/Chip/Chip.css`, `components/Chip/examples.tsx`, `components/Chip/meta.json`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B092-1 — Backlog page: changes saved to main
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- A change made on the Backlog page is saved directly in `main` and pushed, whichever conversation serves the site. An approval of B083 made on a work branch's server had stayed on that branch only.

**What was done**
- `vite.config.ts` (`/api/backlog`): a PATCH updates `main` from the root folder (fetch, fast-forward, apply, commit `Backlog: <id> <change> (Design System Lead, Backlog page)`, push; one retry if `main` moved), and the folder that serves the page. If `main` cannot be saved (root folder not clean or not on `main`, ticket not in `main` yet), the response says why.
- `docs/src/pages/BacklogPage.tsx`: shows "Saved in this folder only, not in main: …" in that case.
- `git-workflow` skill (section 7) and `CLAUDE.md` (Backlog, Git): the rule, second exception to "commit only after validation", no `STEPS.md` entry.
- Backlog: B092 added (reserved first), done.
- Verification: type check and build pass. Tested: a change already in `main` (no commit, root folder clean); a ticket not in `main` yet (saved in the serving folder, reason shown). A real push to `main` will be checked with the next approval on the Backlog page.

**Files**
- `vite.config.ts`, `docs/src/pages/BacklogPage.tsx`, `.claude/skills/git-workflow/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B095-1 — Backlog: no proposals column, priorities
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- No more Proposals column or `proposal` status: Claude asks every suggestion in the chat first; the ticket is created in To do only once the Design System Lead agrees.
- Priority on every ticket: **High / Medium / Low**, none by default; the columns are sorted by priority.
- The Reject button is removed (the Status list still has Rejected).
- The 5 pending proposals are kept, in To do (B071, B072, B073, B074, B084).

**What was done**
- `docs/src/pages/BacklogPage.tsx`: columns To do, In progress, Done; Approve and Reject buttons removed; Priority list (None, High, Medium, Low) on every ticket; each column sorted High, Medium, Low, then no priority.
- `docs/src/backlog.ts`: `proposal` status removed; `priority` field, labels and sort order.
- `vite.config.ts` (`/api/backlog`): `priority` can be changed; an empty value removes it.
- `backlog/backlog.json`: the 5 proposals moved to `todo`; description of the fields updated.
- `CLAUDE.md` (Backlog), `git-workflow`, `component`, `prototype-setup` skills: no `proposal` status; suggestions asked in the chat first.
- Backlog: B095 added (reserved first), done.
- Verification: type check and build pass; the page shows three columns and the Priority list, no console errors.

**Files**
- `docs/src/pages/BacklogPage.tsx`, `docs/src/backlog.ts`, `vite.config.ts`, `backlog/backlog.json`, `CLAUDE.md`, `.claude/skills/git-workflow/SKILL.md`, `.claude/skills/component/SKILL.md`, `.claude/skills/prototype-setup/SKILL.md`, `STEPS.md` (updated)

## Step B096-1 — Component versioning and changelog
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- Every component has a version `X.Y`, shown as a badge next to its title, with a dated changelog.
- Complete components start at **1.0**; a component in progress is `0.0`.
- `Y` goes up for an addition or a fix (`1.0` → `1.1`); `X` for a breaking change (`1.1` → `2.0`).

**What was done**
- `meta.json` of the 11 components: `version` `1.0` and a changelog entry "First complete version." dated when the component became complete (from `STEPS.md`). `components/_template/meta.json`: `0.0`, empty changelog.
- `docs/src/types.ts`, `docs/src/registry.ts`: `version` and `changelog` read from `meta.json`.
- `docs/src/pages/ComponentPage.tsx`, `docs/src/docs.css`: version badge next to the title (the title keeps its one-line ellipsis), new Changelog tab (Version, Date, Changes).
- `component` skill (section "Version and changelog", end of the last stage) and `CLAUDE.md` (Conventions): the rule.
- Backlog: B096 added (reserved first), done.
- Verification: type check and build pass; NavigationItem shows the 1.0 badge and its changelog, no console errors.

**Files**
- `components/*/meta.json`, `components/_template/meta.json`, `docs/src/types.ts`, `docs/src/registry.ts`, `docs/src/pages/ComponentPage.tsx`, `docs/src/docs.css`, `.claude/skills/component/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B025-1 — Badge ticket: version badge and its color
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- The Badge component (B025, already in To do) also covers the version badge of the component pages; note to change its color (to define).

**What was done**
- `backlog/backlog.json`: B025 description completed (version badge as a first use, note on its color). No new ticket: B025 already existed.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B097-1 — Skill: changelog, and Changelog page
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- A `changelog` skill for the versions and changelogs of the components.
- A Changelog page in Governance, under How to use skills.

**What was done**
- New skill `.claude/skills/changelog/SKILL.md`: version `X.Y` (0.0 → 1.0 when complete; `Y` for an addition or a fix, `X` for a breaking change), changelog entry in `meta.json` (version, date of the approval, one sentence; written with the `STEPS.md` entry; never rewritten), where it is shown, what is not defined yet (changelogs for anything else than components).
- New page `docs/src/pages/ChangelogPage.tsx` (`#/changelog`): every version of every component, newest first, read from `meta.json`. Added to Governance in `docs/src/structure.ts` (icon `history`) and routed in `docs/src/App.tsx`.
- `component` skill: refers to the `changelog` skill. `orchestrator`: dispatch row. `navigation` skill and Navigation structure page: Changelog under How to use skills. `CLAUDE.md`: reference to the skill and the page.
- Backlog: B097 added (reserved first), done.
- Verification: type check and build pass; the page lists the 11 versions 1.0 with links to the components; the skill card shows on How to use skills.

**Files**
- `.claude/skills/changelog/SKILL.md`, `docs/src/pages/ChangelogPage.tsx` (new)
- `docs/src/structure.ts`, `docs/src/App.tsx`, `docs/src/pages/NavigationPage.tsx`, `.claude/skills/component/SKILL.md`, `.claude/skills/orchestrator/SKILL.md`, `.claude/skills/navigation/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B098-1 — Navigation item: expandable parent, design approved
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- Two types: **Link** (leads to a page) and **Parent** (a button that only opens and closes its children, never a page).
- Arrow on the right of a parent: `expand_more`, turned by 180° when open (`--duration-200` `--easing-ease-in-out`), `--icon-size-20`, same color as the icon. The children appear at once, no animation.
- Children: no leading icon, indented by `--space-16` per level. Levels: unlimited; a child parent behaves like a top-level parent.
- Default: closed, open when the page displayed is one of its children. Closed with a selected child → the parent takes the selected look.
- A parent is never disabled.
- Code (to come): a parent takes a `label` prop and its children inside; a link keeps its label as `children` (no breaking change → version 1.1, written once the change is approved).

**What was done**
- `components/NavigationItem/spec.md`: purpose, types, anatomy (arrow, children, levels), variants (`label`, forbidden combinations), sizes, states (closed / open, child selected), design tokens.
- Design preview: variants `parent`, `parent-open` (nested example), `parent-child-selected`, `child`, `child-selected`; slots `arrow-size` and `indent`.
- Backlog: B098 added (reserved first), stage `guidelines`. `meta.json` stays `complete` 1.0: the coded component is unchanged until the code of B098 is approved.

**Files**
- `components/NavigationItem/spec.md`, `components/NavigationItem/design/Preview.tsx`, `components/NavigationItem/design/tokens.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B098-2 — Navigation item: expandable parent, guidelines approved
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- A parent groups related pages: **2 children minimum** (a single child → a direct link).
- **3 levels maximum** recommended (unlimited in the spec).
- Parents are **independent**: opening one does not close the others.
- Accessibility of a parent: a button (Tab, Enter or Space), `aria-expanded`, decorative arrow, children of a closed parent not reachable.

**What was done**
- `components/NavigationItem/guidelines.md`: when to use / not to use a parent, best practices (children, levels, icons), two do / don't pairs, content of a parent label, behavior (open / closed, child selected, independent parents), accessibility of a parent.
- Backlog: B098 stage `code`.

**Files**
- `components/NavigationItem/guidelines.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B098-3 — Navigation item: expandable parent, code approved (version 1.1)
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- Code approved, including: the arrow turned with `rotate(180deg)` (structural angle, no token); `icon` optional in the types (ignored for a child, required at the top level by the documentation); `--space-8` above the first child, as between two items.
- Version **1.1** (an addition, no breaking change).

**What was done**
- `NavigationItem.tsx`: two types in one component — a link (`href`, unchanged) and a parent (`label` + NavigationItem children): a `<button>` with `aria-expanded` / `aria-controls`, closed by default, open when a child (at any level) is selected, selected look when closed with a selected child (`--child-selected`). Nesting level through a React context: children have no leading icon.
- `NavigationItem.css`: modifiers `--link`, `--parent`, `--child-selected`; parts `-arrow` (turns in `--duration-200` `--easing-ease-in-out`), `-group`, `-children` (`--space-16` indent per level, `--space-8` gap), `-child`.
- `examples.tsx`: Parent, Parent with a selected child, Nested parents.
- `meta.json`: version 1.1 and its changelog entry. Backlog: B098 done.
- Verification: type check and build pass; Examples tab checked (indent per level, no leading icon on children, selected look on a closed parent); keyboard: Space / Enter open and close, visible focus, hidden children not reachable; no console error.

**Files**
- `components/NavigationItem/NavigationItem.tsx`, `NavigationItem.css`, `examples.tsx`, `meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B099-1 — Skill backlog, priority asked at creation
**Date:** 2026-10-28

**Decisions (made by the Design System Lead)**
- A dedicated `backlog` skill gathers the backlog rules that were spread across `CLAUDE.md`, `git-workflow`, `component`, `prototype-setup` and `prototypes/README.md`.
- New rule: before a ticket is created, Claude asks the Design System Lead its priority (`high`, `medium`, `low` or none) and never chooses it alone.
- B099 priority: high.

**What was done**
- `.claude/skills/backlog/SKILL.md`: fields of a ticket, how a ticket is created (approval in the chat, priority asked, reservation), how it is updated (status, stage, iterations, Backlog page), checklist.
- `orchestrator`: new dispatch row for `backlog`.
- `git-workflow` (sections 3 and 7) and `CLAUDE.md` (Backlog): priority asked before every new ticket, link to the `backlog` skill.
- Verification: the skill shows on the How to use skills page, no console error.
- Backlog: B099 done.

**Files**
- `.claude/skills/backlog/SKILL.md` (created)
- `.claude/skills/orchestrator/SKILL.md`, `.claude/skills/git-workflow/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B103-1 — Release planning
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- A release is a batch of backlog tickets delivered on a given date, **every two weeks on Friday**, named **R1, R2…**; R1 on 2026-11-06.
- A Release planning page in Governance; a ticket is linked to a release with a Release list on the Backlog page; what is planned without a ticket is written as plain text.
- A ticket not done on the date of its release moves automatically to the next release.
- When a ticket is created, its release is asked together with its priority: a `release-planning` skill.
- Plan: R1 — B018 Link, B029 Modal (priority high), B104 Navigation architecture (new), git workflow organization (B100, on its branch). R2 — B056 Search field, B084 Dedicated agents, panel bug of WorkDescription (B102, on its branch). R3 — B105 Chatbot, B106 Task (new components). R4 — B031 WorkDescription, B088 Landing page illustrations.

**What was done**
- `backlog/backlog.json`: `releases` (`first`, `everyDays`, `planned`); tickets B104, B105, B106 created (reserved first); the releases of B018, B029, B056, B084, B031, B088 and the priority of B029 were saved directly in `main` from the Backlog page API.
- `docs/src/backlog.ts`: `release` field, release dates, list of releases, date format. `docs/src/pages/BacklogPage.tsx`: Release list on every ticket. `vite.config.ts`: `release` can be changed from the page.
- New page `docs/src/pages/ReleasePlanningPage.tsx` (`#/releases`): one card per release (date, planned lines, tickets sorted by priority, status, progress), late tickets shown in the next release, past releases folded. In Governance after Changelog (`docs/src/structure.ts`, icon `event`), routed in `docs/src/App.tsx`, styles in `docs/src/docs.css`.
- New skill `.claude/skills/release-planning/SKILL.md`. `backlog` skill: release asked with the priority at creation; release rules moved to the new skill. `orchestrator`: dispatch row. `navigation` skill and Navigation structure page: Release planning under Changelog. `CLAUDE.md`: Backlog section.
- Backlog: B103 done.
- Verification: type check and build pass; the page shows R1 to R4 with their tickets and planned lines, no console errors.

**Files**
- `.claude/skills/release-planning/SKILL.md`, `docs/src/pages/ReleasePlanningPage.tsx` (new)
- `backlog/backlog.json`, `docs/src/backlog.ts`, `docs/src/pages/BacklogPage.tsx`, `docs/src/pages/NavigationPage.tsx`, `docs/src/structure.ts`, `docs/src/App.tsx`, `docs/src/docs.css`, `vite.config.ts`, `.claude/skills/backlog/SKILL.md`, `.claude/skills/orchestrator/SKILL.md`, `.claude/skills/navigation/SKILL.md`, `CLAUDE.md`, `STEPS.md` (updated)

## Step B104-1 — Navigation architecture: category Foundations
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- B104 Navigation architecture is in the **Foundations** category (it was created in Tooling by default).

**What was done**
- `backlog/backlog.json`: B104 category set to Foundations (the category is not editable on the Backlog page).

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B107-1 — Git workflow: develop branch, release review and release notes
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- A permanent **`develop`** branch receives the approved work; work branches start from it and are merged into it.
- On release day, a **review** of what was pushed and committed on `develop`, then `develop` is merged into `main`, tagged `R<n>`.
- Every release has a **release note**, drafted by Claude and validated during the review, shown under its release on the Release planning page.
- The root folder of the project stays on `develop`; changes made on the Backlog page are saved in `develop`; a ticket not done on release day is carried over.
- Ticket priority high, release R1.

**What was done**
- `git-workflow` skill rewritten around `develop` (sections 1 to 7) and new section 8 "Release day" (prepare, release note, review, merge into `main`, tag, `Step R<n>-1`).
- `releases/_template.md` (new): template of a release note. `docs/src/pages/ReleasePlanningPage.tsx`, `docs/src/docs.css`: `releases/R<n>.md` shown under its release.
- `vite.config.ts`, `docs/src/pages/BacklogPage.tsx`: Backlog page changes saved in `develop` from the root folder.
- `CLAUDE.md` (Git, Backlog) and the `backlog`, `component`, `prototype-setup`, `release-planning`, `orchestrator` skills: `develop` instead of `main`; release day and release notes.
- Backlog: B107 added (reserved first), done.
- Verification: type check and build pass; a test release note showed under R1 (then removed).
- After this step: last merge into `main` with the former rule, `develop` created from `main`, root folder switched to `develop`.

**Files**
- `releases/_template.md` (new)
- `.claude/skills/git-workflow/SKILL.md`, `.claude/skills/backlog/SKILL.md`, `.claude/skills/component/SKILL.md`, `.claude/skills/prototype-setup/SKILL.md`, `.claude/skills/release-planning/SKILL.md`, `.claude/skills/orchestrator/SKILL.md`, `CLAUDE.md`, `docs/src/pages/ReleasePlanningPage.tsx`, `docs/src/pages/BacklogPage.tsx`, `docs/src/docs.css`, `vite.config.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B108-1 — Documentation page: Git workflow
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- A Git workflow page in Governance, under How to use skills, with the organization diagram and a link to the git-workflow documentation. Priority medium, release R1.

**What was done**
- New page `docs/src/pages/GitWorkflowPage.tsx` (`#/git-workflow`): diagram (component/, prototype/, governance/ → develop → main + tag R<n> + release note; stacked below the tablet breakpoint), "In short" list, link "Read the git-workflow skill".
- `docs/src/pages/SkillsPage.tsx`, `docs/src/App.tsx`: route `#/skills/<name>` opens How to use skills on that skill, unfolded and scrolled to (below the sticky header); the side navigation keeps How to use skills selected.
- `docs/src/structure.ts` (Governance, icon `account_tree`), `docs/src/docs.css` (diagram, scroll offset of the skill cards), `docs/src/pages/NavigationPage.tsx` and `navigation` skill (Git workflow under How to use skills).
- Backlog: B108 added (reserved first), done.
- Verification: type check and build pass; the link opens the git-workflow card unfolded, no console errors.
- First piece of work merged into `develop` (B107).

**Files**
- `docs/src/pages/GitWorkflowPage.tsx` (new)
- `docs/src/pages/SkillsPage.tsx`, `docs/src/App.tsx`, `docs/src/structure.ts`, `docs/src/docs.css`, `docs/src/pages/NavigationPage.tsx`, `.claude/skills/navigation/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B109-1 — See the branches: announce rule and Branches page
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Claude gives the branch it works on at the start of every task and in every message that asks for a validation; a fresh `claude/…` branch is renamed so the Claude app shows the real branch.
- A Branches page in Governance. Priority medium, release R1.
- The three branches already merged (`governance/backlog-skill`, `governance/landing-illustrations`, `prototype/work-description`) are deleted.

**What was done**
- `vite.config.ts`: dev-only endpoint `/api/branches` — every branch on GitHub and in a local folder, its folder, its Claude conversation (from the Claude app's session files; none for the root folder), its ticket (from its commits), ahead / behind `develop`, last commit; and the commits `develop` adds to `main`.
- New page `docs/src/pages/BranchesPage.tsx` (`#/branches`, Governance under Git workflow, icon `fork_right`): branches table and "Next release". `docs/src/structure.ts`, `docs/src/App.tsx`, `docs/src/docs.css`, `docs/src/pages/NavigationPage.tsx`, `navigation` skill.
- `git-workflow` skill (sections 2 and 3): say the branch; rename the fresh `claude/…` branch; the Branches page.
- Backlog: B109 added (reserved first), done.
- Verification: type check and build pass; the page lists the 9 branches and the 2 commits of the next release, no console errors.

**Files**
- `docs/src/pages/BranchesPage.tsx` (new)
- `vite.config.ts`, `docs/src/structure.ts`, `docs/src/App.tsx`, `docs/src/docs.css`, `docs/src/pages/NavigationPage.tsx`, `.claude/skills/navigation/SKILL.md`, `.claude/skills/git-workflow/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B109-2 — Branches with only a reserved ticket deleted, tickets kept
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Delete the three branches that held only a reserved ticket: `governance/claude-organization` (B100), `governance/backlog-filters` (B101), `prototype/work-description-panel-bug` (B102).

**What was done**
- Their tickets existed only on those branches: they are kept in the backlog of `develop`, unchanged (To do, priority medium), so the decided work is not lost. B100 takes release R1 and B102 release R2, as planned; the two planned lines that pointed to them are removed. B101 stays not planned.
- The three branches are deleted on GitHub (no work on them besides the ticket, no folder using them).

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B110-1 — Git workflow: governance and component branches only
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Two branch types only: `governance/<topic>` and `component/…`. A prototype is worked on `component/<prototype-folder>` (e.g. `component/work-description`), merged into `develop` when the prototype is validated.
- Two conversation kinds: **Gouvernance** (one, permanent) and **Composant `<Name>`** (one per component or prototype, e.g. `Composant WorkDescription`), archived when finished.
- Priority medium, release R1.

**What was done**
- `git-workflow` skill: description, diagram, branch table and conversation table.
- `prototype-setup` skill: branch `component/<folder-name>`, in a `Composant <Name>` conversation.
- `CLAUDE.md` (Git) and the Git workflow page (diagram and "In short").
- Backlog: B110 added (reserved first), done.
- Verification: type check and build pass; the Git workflow page shows the new diagram.

**Files**
- `.claude/skills/git-workflow/SKILL.md`, `.claude/skills/prototype-setup/SKILL.md`, `CLAUDE.md`, `docs/src/pages/GitWorkflowPage.tsx`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B111-1 — Live component playground (Storybook-like)
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- On each coded component page, a **Playground** tab shows the React component live, like Storybook. Ticket B111: Tooling, priority high, release R1.
- The Playground is shown from the Code stage. During the Code stage, the Design preview tab stays next to it (to check the code against the design); once the component is complete, the Playground replaces it.
- Layout: the canvas, then the controls under it (one row per prop), then the JSX code updated live (Copy button). Screen sizes Mobile 375px / Tablet 768px / Desktop 1024px, and a Reset button.
- Controls declared per component in `components/<Name>/playground.tsx`.
- A **Tokens** section keeps the possibility to change the tokens: every token used in the component's CSS can be replaced by another of its family in the canvas, to try only (nothing saved).

**What was done**
- `docs/src/playground.ts`: `definePlayground()` (typed controls: text, boolean, select, number, date), `jsx()` (JSX code from the values), messages between the page and the canvas.
- Canvas in an iframe (`docs/playground.html`, `docs/src/playground-frame.tsx`) at the real screen width, so media queries and window sizes are the real ones; shown scaled down when wider than the page; height follows the content (`minHeight` for the ImageViewer and the Timeline panel).
- `docs/src/PlaygroundTab.tsx`: toolbar (screen sizes with Chips, Reset), canvas, Controls, Tokens (read from the component's CSS; text styles grouped), Code. `docs/src/playgrounds.ts` discovers the playgrounds; `playground.tsx` is left out of the Code tab.
- A `playground.tsx` for the 11 components, with the content of their approved examples; template `components/_template/playground.tsx`.
- Skills `component-code` (Playground section, files, verification), `component`, `component-spec`; `components/README.md`; `CLAUDE.md` (project structure).
- Verification: type check and build pass; every control and token menu changes the canvas and the code, at the three screen sizes (Timeline open button below desktop, ImageViewer opening with focus on Close).

**Files**
- `docs/playground.html`, `docs/src/playground.ts`, `docs/src/playgrounds.ts`, `docs/src/playground-frame.tsx`, `docs/src/PlaygroundTab.tsx`, `components/*/playground.tsx`, `components/_template/playground.tsx` (created)
- `docs/src/pages/ComponentPage.tsx`, `docs/src/registry.ts`, `docs/src/docs.css`, `vite.config.ts`, `.claude/skills/component-code/SKILL.md`, `.claude/skills/component/SKILL.md`, `.claude/skills/component-spec/SKILL.md`, `components/README.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B029-1 — Dialog: design spec approved
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- The component is named **Dialog** (not Modal): folder `components/Dialog/`, class `.ds-dialog`, level **organism** (built from IconButton and Button), description "Dialog that opens over the page to show a detail or ask for an action." Ticket B029 renamed "Dialog"; branch `component/Dialog`.
- One type. Variant property `size`: `small` / `medium` (default) / `large`.
- New tokens: `size.dialog-small` 400px, `size.dialog-medium` 560px, `size.dialog-large` 800px, and the semantic shadow `shadow.dialog` → `shadow.3`.
- Anatomy: overlay, container, title, description and close button (IconButton `tertiary`) required; body and footer (Buttons, aligned right, main action last) optional.
- Tokens: overlay `color.background.overlay`, background `color.background.page`, radius `radius.8`, shadow `shadow.dialog`, padding and space between parts `space.24`, title `heading-4` primary, description `body` secondary (`space.4` under the title), body `body` primary, footer buttons `space.8` apart.
- Behavior: title and description wrap (no maximum length); only the body scrolls; below the dialog width, full width with `space.16` margins, same footer layout; closes with the close button, Escape, a click on the overlay or a footer button; fade in / out `duration.200` `easing.ease-out`.
- Props: `size`, `open`, `onClose`, `title`, `description`, `children` (body), `footer`.
- Stage 1 (Design) approved: the Dialog moves to Guidelines.

**What was done**
- `components/Dialog/` created from the template (`meta.json`, `spec.md`, design preview `design/Preview.tsx` + `design/tokens.json`).
- Tokens added to `tokens/semantic.json`, the `token-naming` skill and `CLAUDE.md`; `npm run tokens` passes (45/45 contrast pairs AA).
- Design preview tab: semantic shadows now listed with the primitives (comment updated).
- Backlog: B029 in progress, stage `guidelines`.
- Verification: type check and build pass; the Design preview and Design spec tabs show the Dialog.

**Files**
- `components/Dialog/` (created), `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md`, `docs/src/DesignPreview.tsx`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B112-1 — Backlog cleanup
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Duplicates: keep the older tickets (B039, B041, B042, B043); B071, B072, B073, B074 are rejected.
- Tickets already covered are closed: B043 Skill backlog-management (done, covered by the `backlog` skill), B032 Version control (done, covered by B107, B109, B110), B100 Git workflow organization rules (done, covered by the `git-workflow` skill). B042 Skill steps-log is rejected: no dedicated skill, the rules are in `CLAUDE.md` and `git-workflow`.
- B104 Navigation architecture stays in To do (Step B104-1 only moved it to Foundations).
- Ticket B112: Tooling, priority high, release R1.

**What was done**
- `backlog/backlog.json`: the 8 statuses changed; the reason added at the end of each description (no field for it). To do: 48 → 40 tickets.
- Backlog: B112 added (reserved first), done.
- Verification: the Backlog page shows the new columns.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B029-2 — Dialog: guidelines approved
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- When to use: the detail of a Level 3 item (e.g. a Backlog ticket), confirming an action, a short task or short form, important information to read before going on.
- When not to use: images (ImageViewer), long content or a main task (a page), a non-blocking message (inline message, not in the design system yet), from another dialog (never).
- Footer: 2 buttons at most, `Cancel` (secondary) + one main action (primary, or danger), main action last. Size by usage: `small` confirmation, `medium` default, `large` detail.
- Do's and don'ts: action verbs (not Yes / No / OK), at most 2 buttons, `small` for a confirmation, one dialog at a time.
- Content: title in sentence case, short; buttons with the verb of the action, "Cancel" for the secondary.
- Loading and errors shown in the body (the dialog stays open on an error).
- Accessibility: Escape closes, Tab stays inside, focus on the close button at opening and back to the opener at closing, modal dialog named by the title and described by the description, page behind not scrollable.
- Related components: Button, IconButton.
- Stage 2 (Guidelines) approved: the Dialog moves to Code.

**What was done**
- `components/Dialog/guidelines.md` written; `meta.json` status `code`; backlog B029 stage `code`.
- Verification: build passes; the Guidelines tab shows the Dialog guidelines.

**Files**
- `components/Dialog/guidelines.md`, `components/Dialog/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B029-3 — Dialog: code approved, component complete
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Stage 3 (Code) approved: the Dialog is **complete**, version 1.0.

**What was done**
- `Dialog.tsx` + `Dialog.css` from the approved spec: overlay (`z-index.modal`, `color.background.overlay`, `space.16` margins), container sized by `size` (`size.dialog-*`), header (title `heading-4`, description `body` secondary, close IconButton `tertiary`), optional body (the only part that scrolls) and footer (Buttons aligned right); fade in / out `duration.200` `easing.ease-out`.
- Accessibility: modal dialog named by the title and described by the description, focus on the close button at opening and back to the opener at closing, Tab kept inside, Escape and a click on the overlay close it, page behind not scrollable.
- `examples.tsx` (small confirmation, medium, large detail, minimal, long content, long title and description), `playground.tsx` (size, title, description, body, footer); export in `components/index.ts`.
- `meta.json`: status `complete`, version `1.0`, changelog "First complete version."; backlog B029 done.
- Verification: type check and build pass; checked in the Examples and Playground tabs (desktop and mobile 375px, keyboard, focus, body scroll).

**Files**
- `components/Dialog/Dialog.tsx`, `components/Dialog/Dialog.css`, `components/Dialog/examples.tsx`, `components/Dialog/playground.tsx` (created); `components/Dialog/meta.json`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B113-1 — Playground: list of icons
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- In the Playground, the icon controls (Button, IconButton, NavigationItem) offer the list of **every Material Symbols icon**, in a **dropdown list**, and **each option shows its icon**. Ticket B113: Tooling, priority medium, release R1.

**What was done**
- `docs/src/material-symbols.json`: the 4,304 icon names, from Google's codepoints file (`google/material-design-icons`, variable font Outlined), kept in the repository (everything stays local). The whole font is already loaded, so every icon shows.
- New control type `icon` (`optional: true` offers "None"): Button (optional), IconButton and NavigationItem (required).
- `docs/src/IconSelect.tsx`: a dropdown list built for the site (a native `<select>` cannot show the icon font in its options): the button shows the chosen icon; each option shows its icon and name; keyboard like a select (↑ / ↓, Home / End, Page Up / Down, Enter or Space, Escape, typing jumps to a name); placed over the page under the button (above when there is no room), so the table of the controls does not cut it.
- `component-code` skill: the `icon` control type.
- Verification: type check and build pass; choosing an icon (click or keyboard) changes the canvas and the code, and focus goes back to the button.

**Files**
- `docs/src/IconSelect.tsx`, `docs/src/material-symbols.json` (created)
- `docs/src/playground.ts`, `docs/src/PlaygroundTab.tsx`, `docs/src/docs.css`, `components/Button/playground.tsx`, `components/IconButton/playground.tsx`, `components/NavigationItem/playground.tsx`, `.claude/skills/component-code/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B114-1 — Ticket description template
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Every ticket is described with a template: **Goal** (what it delivers, one sentence), **Why** (the need), **Scope** (what is included — and what is not), **Done when** (acceptance criteria). Ticket B114: Tooling, priority high, release R1.
- A click on a ticket of the Backlog page opens it in a **modal** (the Dialog component, `large`), with the same menus as its card (status, priority, release, stage).
- The existing tickets keep their description as their Goal; the other parts are added when each ticket is worked on.

**What was done**
- `backlog/backlog.json` fields: `description` (Goal), `why`, `scope`, `doneWhen` (array); B114 written with the template.
- `docs/src/pages/TicketDialog.tsx` replaces the ticket page (`TicketPage.tsx`, removed): title, `ID · category · status · priority · release`, the menus, Goal, Why, Scope, Done when ("Not written yet." when empty), and for a prototype its spec and iterations.
- `BacklogPage.tsx`: a click on a card opens its modal (`#/backlog/<id>`), except on its menus; the menus are shared by the card and the modal. `App.tsx`: `#/backlog/<id>` shows the Backlog with the modal, without scrolling to the top; the navigation and the breadcrumb stay on Backlog.
- Skills `backlog` (Ticket template section, creation steps, checklist) and `navigation` (tickets open in a Dialog; the modal is no longer "not defined"); `CLAUDE.md`; Navigation structure page.
- Verification: type check and build pass; B114 and B031 (prototype: spec and iteration) open in the modal; Escape closes it; the menus of a card do not open it; the scroll is kept.

**Files**
- `docs/src/pages/TicketDialog.tsx` (created), `docs/src/pages/TicketPage.tsx` (removed)
- `docs/src/pages/BacklogPage.tsx`, `docs/src/App.tsx`, `docs/src/backlog.ts`, `docs/src/docs.css`, `docs/src/pages/NavigationPage.tsx`, `.claude/skills/backlog/SKILL.md`, `.claude/skills/navigation/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B116-1 — Skill: ticket
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- A dedicated **`ticket`** skill says what is written in a ticket: the template (Goal, Why, Scope, Done when) and the parts of each type. The `backlog` skill keeps the fields, the creation and the statuses. Ticket B116: Skills, priority medium, release R1.
- A **prototype** ticket also has **Users** (who the journey is for, and their goal), **User journey** (the steps, in order) and **Components used** (and the missing ones).

**What was done**
- `.claude/skills/ticket/SKILL.md` (new): template, parts by type (Prototypes only; ask before adding parts for another type), writing rules, where a ticket is shown, checklist. Orchestrator: dispatch row.
- Fields `users`, `journey`, `components`, `missingComponents` (`docs/src/backlog.ts`); the ticket's modal shows them for a prototype, between Why and Scope ("Not written yet." when empty).
- `backlog` skill: refers to `ticket` for the content of a ticket (template section moved), fields table and checklist; a ticket opens in a modal (no ticket page any more). `prototype-setup` skill, `prototypes/README.md`, `CLAUDE.md`.
- Verification: type check and build pass; the How to use skills page shows the `ticket` skill; B031 shows the prototype parts in its modal.

**Files**
- `.claude/skills/ticket/SKILL.md` (created)
- `.claude/skills/backlog/SKILL.md`, `.claude/skills/orchestrator/SKILL.md`, `.claude/skills/prototype-setup/SKILL.md`, `docs/src/backlog.ts`, `docs/src/pages/TicketDialog.tsx`, `docs/src/docs.css`, `prototypes/README.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B117-1 — SelectOption: design approved
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- The **Select** (B021) is a **molecule**, one size, with a label above; its options are a building block, **SelectOption** (atom), built first. Ticket B117: Components, priority medium, release R1, worked in the same conversation as the Select.
- SelectOption content: label, optional leading icon, check mark on the right when selected. Selected look as NavigationItem: `background-brand-subtle`, `text-brand`, text style `label`. States: selected, disabled; `selected` + `disabled` is forbidden (the chosen option always stays available).
- Label: 25 characters max, single line with an ellipsis. One size: `--space-8` padding and gap, `--radius-8`, `--icon-size-20`, text style `body`. Leading icon `icon-secondary` (not selected).
- Purpose and property names (`selected`, `disabled`, `icon`) approved with the spec.

**What was done**
- `components/SelectOption/` created from the template (`meta.json`: atom, status `guidelines` once the design was approved).
- Design preview (`design/Preview.tsx`, `design/tokens.json`): variants default and selected, each without and with a leading icon, on the list surface; every contrast pair passes AA (lowest 5.35:1).
- `spec.md` written from the approved decisions.

**Files**
- `components/SelectOption/` (created)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B117-2 — SelectOption: guidelines approved
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Used inside the **Select** list only; not for an action (Button) nor for choices always visible (Chip).
- Icons on every option of a list, or none. Prefer hiding an unavailable option to disabling it. Logical order, otherwise alphabetical. One selected option at most.
- Labels: sentence case, no punctuation, parallel, distinct, 25 characters maximum.
- A click or Enter chooses the option and closes the list; the focus goes back to the Select field.
- Accessibility: WAI-ARIA listbox pattern — `role="option"`, `aria-selected`, `aria-disabled`; icon and check mark decorative; keyboard handled by the Select; a disabled option is reached with the arrows but cannot be chosen.

**What was done**
- `components/SelectOption/guidelines.md` written; do's and don'ts shown visually in the chat. `meta.json` status and backlog stage set to `code`.

**Files**
- `components/SelectOption/guidelines.md`, `components/SelectOption/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B059-1 — Tag: design approved
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- New component **Tag** (`components/Tag/`, class `.ds-tag`), level **atom**: "A small label that names a category or a status." Replaces the tags drawn by hand on the documentation site (level, backlog category, "Decided").
- Property **`tone`**: `neutral` (default), `success`, `warning`, `error`, `info`. Subtle background (`background.subtle` / `background.<tone>-subtle`), text and icon in the tone color (`text.secondary` + `icon.secondary` for neutral), no border.
- One size: `label-sm` text, padding `space.0` / `space.8`, `radius.4`. Optional icon before the label (property `icon`), `icon-size.16`, gap `space.4`.
- Not interactive: no hover / focus / pressed, no disabled state. Label on one line, cut with an ellipsis, shown as written.
- Design stage approved; next stage: Guidelines.

**What was done**
- Component folder from the template: `meta.json`, design preview (`design/Preview.tsx`, `design/tokens.json`, default state only), `spec.md`.
- New contrast pair `icon.secondary` on `background.subtle` (3:1): 46/46 pairs pass.
- Ticket B059: `in-progress`, stage `guidelines`.

**Files**
- `components/Tag/meta.json`, `components/Tag/spec.md`, `components/Tag/design/Preview.tsx`, `components/Tag/design/tokens.json` (created)
- `tokens/contrast-pairs.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B117-4 — SelectOption: code approved, component complete
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Code of SelectOption approved: the component is **complete**, version **1.0**.

**What was done**
- `SelectOption.tsx`: `<div role="option" tabIndex={-1}>` (WAI-ARIA listbox; the Select moves the focus between the options), props `selected`, `disabled`, `icon`, `children`; `selected` + `disabled` forbidden by the types; a click on a disabled option does nothing; leading icon and check mark `aria-hidden`.
- `SelectOption.css`: semantic tokens only, state layers, focus outline `--border-width-2` `--color-border-focus`, selected look (`background-brand-subtle`, `text-brand`, `label`), disabled roles, single-line label with an ellipsis.
- `examples.tsx` (default, selected, disabled, with an icon, in a list, long label), `playground.tsx`, export in `components/index.ts`.
- `meta.json`: status `complete`, version `1.0`, changelog "First complete version."; ticket B117 `done`.
- Verification: type check, build and tokens pass; Examples and Playground checked in the browser (37px high, selected and disabled looks, ellipsis, focus outline).

**Files**
- `components/SelectOption/SelectOption.tsx`, `SelectOption.css`, `examples.tsx`, `playground.tsx`, `meta.json`
- `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B021-1 — Select: design approved
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- **Select** (`components/Select/`, class `.ds-select`), level **molecule**: "Choice of one option in a list." Options are the **SelectOption** building block (B117, complete).
- One size, full width of its container. Label above (required, `label`, 25 characters max, `--space-4` to the field).
- Field outlined: `background-surface`, `--border-width-1` `border-strong`, `--radius-8`, padding `--space-16` × `--space-8`, value in `body`, placeholder in `text-secondary`, arrow `expand_more` `icon-secondary` `--icon-size-20`. Height ≈ 39px (2px more than the Button because of the border): kept.
- List: border only (`border-default`, no shadow), `--space-4` under the field, padding and gap `--space-4`, no maximum height, over the page and over dialogs.
- New token **`z-index.dropdown` = 50** (above `modal` 40, below `tooltip` 100).
- States: placeholder, open (`border-focus` border, arrow turned), error (`border-error` border, message `body-sm` `text-error` with an `error` icon `--icon-size-16`, `--space-4` from the field and between icon and text), disabled (disabled roles, label included). `error` + `disabled` forbidden.
- Purpose, property names (`label`, `placeholder`, `value`, `error`, `disabled`) and preview content approved with the spec.

**What was done**
- `components/Select/` created from the template; design preview (`design/Preview.tsx`, `design/tokens.json`: variants placeholder, filled, open with SelectOption, error); every contrast pair passes AA (lowest 5.26:1).
- `spec.md` written. `meta.json` status and backlog stage set to `guidelines`.
- `z-index.dropdown` added to `tokens/semantic.json`, the `token-naming` skill and `CLAUDE.md`.

**Files**
- `components/Select/` (created)
- `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B059-2 — Tag: guidelines approved
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- When to use: name a category, show a status, next to a title or in the metadata of a card. When not to use: a number → Badge (B025), filter or switch → Chip, action → Button, message → inline alert (not in the design system yet).
- `neutral` for categories; a feedback tone only when it matches the meaning; never color alone; at most 3 tags side by side, `space.4` apart; tags wrap to the next line when the space runs out.
- Content: 1 or 2 words, sentence case, no final period; same wording everywhere; icon only to reinforce the label.
- Accessibility: label read as plain text, icon decorative (`aria-hidden`), not focusable.
- Four do / don't pairs (tone and meaning, short label, at most 3 tags, Chip to filter). Guidelines stage approved; next stage: Code.

**What was done**
- `components/Tag/guidelines.md` written; `meta.json` status and ticket B059 stage set to `code`.

**Files**
- `components/Tag/guidelines.md` (created)
- `components/Tag/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B115-2 — TicketCard: design approved
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- **TicketCard**: organism, folder `components/TicketCard/`, class `.ds-ticket-card`, description "The card of a backlog ticket, with its main information." One type, no variant, one size (full width of its column).
- Content: category tag, origin tag "Decided" (only for `decided` tickets), ID, title, description, menus Status / Priority / Release / Stage (Stage only for component tickets). Title and description in full, no maximum length.
- Building blocks: the tags are the **Tag** atom (B059) and the menus the **Select** atom (B021), completed before TicketCard.
- Look of the **Card** molecule (same tokens) in its own container, because Card is not clickable: the **whole card is clickable** (except the menus), focusable (Tab, Enter opens the ticket), with hover / focus / pressed state layers.
- ID `body-sm` in `--color-text-secondary`; gaps `--space-4` in the tags row, `--space-8` between the menus and between the rows.

**What was done**
- Branch `component/TicketCard` taken over in this session and updated from `develop`; ticket B115 `in-progress`.
- `components/TicketCard/` created from the template: `meta.json` (status `guidelines`), design preview (`design/Preview.tsx`, `design/tokens.json`, tags and menus as dashed placeholders), `spec.md`.
- Contrast: title and description 15.52:1, ID 5.49:1, focus outline 6.10:1; border subtle 1.25:1 decorative, as Card.
- Open question kept in the spec: the final look of the tags and menus once Tag and Select are coded.
- Backlog: B115 stage `guidelines`.

**Files**
- `components/TicketCard/` (created)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B021-3 — Select: guidelines approved
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Not for switching the view or filtering (Chips) nor for actions (Button). Always a placeholder: no option chosen in advance.
- Content: label = a noun, no punctuation; placeholder "Choose a …"; error message = one sentence saying how to fix it.
- Behavior: opens with a click, Enter, Space or Arrow down; focus on the chosen option, otherwise the first; Escape, Tab or a click outside close without changing; the error shows when the list closes without a choice and disappears once an option is chosen.
- Keyboard: arrows, Home / End, typing a letter goes to the next option starting with it, Enter chooses.
- Screen reader (`aria-haspopup="listbox"`, `aria-expanded`, `listbox` named by the label, `aria-describedby` + `aria-invalid` for the error), width set by the layout grid column, related components: approved with the guidelines.

**What was done**
- `components/Select/guidelines.md` written; do's and don'ts shown visually in the chat. `meta.json` status and backlog stage set to `code`.

**Files**
- `components/Select/guidelines.md`, `components/Select/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B059-3 — Tag: code approved, component complete
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Code stage approved: Tag is **complete**, version **1.0** ("First complete version.").

**What was done**
- `Tag.tsx`: a non-interactive `<span>`, props `tone` (`neutral` default, `success`, `warning`, `error`, `info`) and `icon` (optional, decorative, `aria-hidden`); `Tag.css`: semantic tokens only, classes `.ds-tag`, `.ds-tag--<tone>`, `.ds-tag-icon`, `.ds-tag-label`, label on one line with an ellipsis.
- `examples.tsx` (tones, with an icon, side by side, long label), `playground.tsx` (tone, icon, label), export in `components/index.ts`.
- Verification: type check and build pass; computed colors match the spec tokens for the 5 tones; long label cut with an ellipsis; Playground renders and writes the code; no console error.
- Ticket B059 `done`.

**Files**
- `components/Tag/Tag.tsx`, `components/Tag/Tag.css`, `components/Tag/examples.tsx`, `components/Tag/playground.tsx` (created)
- `components/Tag/meta.json`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B021-5 — Select: code approved, component complete
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Code of the Select approved: the component is **complete**, version **1.0**.
- Technical API approved: `options` (`{ value, label, icon?, disabled? }`), `onChange(value)`, `onOpenChange(open)`, `id`, `className`; `error` + `disabled` forbidden by the types. The arrow turns with `--duration-200` `--easing-ease-in-out` (as NavigationItem); the list opens without animation.

**What was done**
- `Select.tsx`: label, field (`<button>` with `aria-haspopup="listbox"`, `aria-expanded`, `aria-labelledby` label + value, `aria-invalid` + `aria-describedby` for the error), list (`role="listbox"` of SelectOption). Keyboard: Enter / Space / Arrow down open; focus on the chosen option, otherwise the first; arrows, Home / End, typing a letter; Enter chooses and gives the focus back to the field; Escape, Tab and a click outside close without changing.
- `Select.css`: semantic tokens only; open (`border-focus`, arrow turned), error, disabled (label included); list under the field at `--z-index-dropdown`.
- `examples.tsx` (placeholder, option chosen, options with icons, error, error when the list closes without a choice, disabled, long texts), `playground.tsx`, export in `components/index.ts`.
- `meta.json`: status `complete`, version `1.0`, changelog "First complete version."; ticket B021 `done`.
- Verification: type check, build and tokens pass; keyboard and mouse behavior tested in the browser (a stale value in the error example was found and fixed).

**Files**
- `components/Select/Select.tsx`, `Select.css`, `examples.tsx`, `playground.tsx`, `meta.json`
- `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B115-3 — TicketCard: guidelines approved
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- When to use: each ticket in a status column of the **Backlog board**. Not for the content of a step (Card), not inside a Card, not for a read-only list (not in the design system yet).
- Cards stacked full width of their column, `--space-16` apart, ordered by priority (high → medium → low → none).
- Title: short noun phrase, sentence case, no period (the component name for a component ticket). Description: one sentence ending with a period.
- A menu change is saved at once and the card moves; a save error is shown above the board (`role="alert"`), the card keeps its old value.
- Keyboard: Tab to the card, **Enter** opens the ticket, then Tab to the menus. A screen reader announces the **ID and title**.
- Do's and don'ts: title, description, stacking, no nested card (visual examples shown in the chat).

**What was done**
- `components/TicketCard/guidelines.md` written; `meta.json` status `code`; backlog B115 stage `code`.

**Files**
- `components/TicketCard/guidelines.md`, `components/TicketCard/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B115-4 — TicketCard: code with placeholder menus
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- Tags: category in tone `neutral`; "Decided" in tone `success` with the icon `check_circle` (as in the Tag examples).
- Props: `ticketId`, `title`, `description?`, `category`, `decided`, `menus` (slot: the Selects, given by the page), `onOpen` (click or Enter).
- `headingLevel` prop (h3 by default, under the h2 of a board column), the look does not change — as Card.
- The menus of the examples and the playground are native selects (`examples/PlaceholderMenus.tsx`, not part of the component) until Select (B021) is coded.

**What was done**
- `TicketCard.tsx` (`<article>` focusable, `aria-label` "ID, title", click except on the menus, Enter on the card), `TicketCard.css` (Card tokens, state layers, focus outline), `examples.tsx` (6 examples), `playground.tsx`, export in `components/index.ts`.
- Verification: type check and build pass; Examples and Playground tabs checked; Tab reaches the card (focus outline visible), Enter opens it.

**Files**
- `components/TicketCard/TicketCard.tsx`, `TicketCard.css`, `examples.tsx`, `playground.tsx`, `examples/PlaceholderMenus.tsx` (created / updated)
- `components/index.ts`, `STEPS.md` (updated)

## Step B115-6 — TicketCard: code approved, component complete
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- The menus are the real **Select** (B021, complete), in a **grid of 2 columns** (Status, Priority / Release, Stage), `--space-8` apart (spec and guidelines updated).
- **No card state layer while the pointer is on a menu** (the hover and pressed states belong to the Select); the card state layer is drawn under the menus (spec, States).
- Playground canvas taller (`minHeight` 520px) so the list of a menu opened at the bottom of the card is not cut off.
- Code approved: TicketCard is **complete**, version **1.0**.

**What was done**
- `TicketCard.css`: menus grid of 2 columns; state layer on `::before`, none while a menu is hovered or pressed. `examples/TicketMenus.tsx` (four Selects) replaces the placeholder menus in the examples and the playground.
- `meta.json`: status `complete`, version `1.0`, changelog entry `1.0`. Spec: no open question left.
- Verification: type check and build pass; a choice in a menu does not open the card; hovering a menu does not tint the card; the opened Stage list fits in the Playground canvas.
- Ticket B115 stays `in-progress`: the Backlog page still has to show its tickets with TicketCard.

**Files**
- `components/TicketCard/TicketCard.css`, `examples.tsx`, `playground.tsx`, `spec.md`, `guidelines.md`, `meta.json` (updated)
- `components/TicketCard/examples/TicketMenus.tsx` (created), `components/TicketCard/examples/PlaceholderMenus.tsx` (removed)
- `STEPS.md` (updated)

## Step B115-7 — Backlog page with TicketCard
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- The Backlog page shows its tickets with **TicketCard**; the menus are **Select** (B021), on the card and in the ticket's modal.
- The board has **3 columns** (To do, In progress, Done) instead of a grid of 4: the cards are wider and the menu values are no longer cut.
- Options of the Release menu: the release only ("R1"); the date is on the Release planning page.

**What was done**
- `docs/src/pages/BacklogPage.tsx`: one TicketCard per ticket (click or Enter opens its modal), the menus as Selects (Stage only for component tickets, change saved at once).
- `docs/src/pages/TicketDialog.tsx`: the Selects side by side (`.ticket-menus`).
- `docs/src/docs.css`: hand-drawn card, tags and native menus removed; cards 16px apart; board in 3 columns.
- Verification: type check and build pass; at 1440px no menu value is cut; a click on a card opens its modal; the Release list opens over the modal content.
- Ticket B115 `done`: TicketCard complete and used by the Backlog page.

**Files**
- `docs/src/pages/BacklogPage.tsx`, `docs/src/pages/TicketDialog.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B119-1 — Agent: design system compliance audit
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- A new agent, **`ds-compliance-audit`**, audits every UI element of the documentation site against the design system and sorts them in three groups: compliant, non-compliant, not in the design system.
- It runs **after each approved step** (before its commit) and **during the release review**, and on request.
- Its report is written in the repository, in `audits/` (`<date>-<ticket>-<n>.md` after a step, `<date>-R<n>.md` for a release), and its **non-compliant elements are shown in the chat**.

**What was done**
- `.claude/agents/ds-compliance-audit.md`: the agent (read-only; sources of truth, what to audit, classification, report shape, comparison with the previous audit).
- `git-workflow` (sections 4 and 8), `orchestrator` (new row) and `CLAUDE.md` (Agents): when the agent runs and what Claude does with its report.
- First audit: `audits/2026-10-29-B119-1.md` — 15 compliant, 24 non-compliant, 21 not in the design system; findings spot-checked by Claude.
- Ticket B119 `done`.

**Files**
- `.claude/agents/ds-compliance-audit.md`, `audits/2026-10-29-B119-1.md` (created)
- `.claude/skills/git-workflow/SKILL.md`, `.claude/skills/orchestrator/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B128-1 — Agents: audit proposes tickets, fix agent implements them
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- `ds-compliance-audit` ends its report with **proposed tickets** (findings grouped, existing tickets extended rather than duplicated); they are shown in the chat and created only once the Design System Lead agrees, with a priority and a release.
- **Two agents**: the audit stays read-only; a second agent, **`ds-compliance-fix`**, implements a validated ticket. The next audit checks its work.
- `ds-compliance-fix` changes **`docs/` only**: `tokens/`, `components/` and `prototypes/` stay forbidden to agents (a needed token is made by Claude after approval). It never runs git and starts only once every decision of the ticket is answered.

**What was done**
- `.claude/agents/ds-compliance-audit.md`: numbered non-compliant findings, "Proposed tickets" section and its rules.
- `.claude/agents/ds-compliance-fix.md` (created): limits, how to fix, report (done, blockers and questions, noticed, checks).
- `git-workflow` (section 4): proposed tickets after an audit, and the 5 steps to implement a compliance ticket; `orchestrator`: new row; `CLAUDE.md` (Agents): the `docs/` exception for `ds-compliance-fix`.
- Audit before the commit: `audits/2026-10-29-B128-1.md`.
- Ticket B128 `done`.

**Files**
- `.claude/agents/ds-compliance-fix.md`, `audits/2026-10-29-B128-1.md` (created)
- `.claude/agents/ds-compliance-audit.md`, `.claude/skills/git-workflow/SKILL.md`, `.claude/skills/orchestrator/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B124-1 — Documentation site: use the Card component
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- **Card 1.1**: a card may also group the content of one subject in a page (a release, a skill, an iteration); its text may hold rich content (lists, tables, a disclosure), never another card.
- The title is the name of the subject only ("R1", the skill name, "Iteration 1"); details (date, progress, decision) go in the first line of the text.
- Kept as implemented: " · " between the date and the progress of a release, 16px between the blocks inside a card, the divider above the release note.

**What was done**
- `components/Card/spec.md`, `guidelines.md`, `meta.json` (version 1.1 and changelog entry): the new usage and rich content (by Claude).
- First run of the `ds-compliance-fix` agent (B128), `docs/` only: release cards, skill cards and ticket iterations are Cards; the hand-built card CSS is removed; `.card-content` stacks the blocks inside a card.
- Verification: no file outside `docs/` changed by the agent; type check and build pass; Release planning, How to use skills and a ticket modal (B031) render without console errors.
- Compliance audit: `audits/2026-10-29-B124-1.md`.
- Ticket B124 `done`.

**Files**
- `audits/2026-10-29-B124-1.md` (created)
- `components/Card/spec.md`, `components/Card/guidelines.md`, `components/Card/meta.json`, `docs/src/pages/ReleasePlanningPage.tsx`, `docs/src/pages/SkillsPage.tsx`, `docs/src/pages/TicketDialog.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B124-2 — Card 1.2: blocks of the text 16px apart
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- The 16px between the blocks inside a card's text goes into the **Card spec** (Card 1.2).
- Skill card titles stay the raw skill name (e.g. `git-workflow`): exception to sentence case for names written as in code.
- The separator above a release note uses the card border (`border.subtle`).
- The next site compliance tickets are done on **one shared branch**, `governance/docs-compliance` (one step per ticket), merged into `develop` together at the end — exception to "one ticket = one branch". This branch is merged with them.

**What was done**
- `components/Card/Card.css`: blocks of `.ds-card-text` 16px apart; `spec.md` (anatomy, sizes, tokens), `guidelines.md` (title exception), `meta.json` (1.2, changelog).
- `docs/`: `.card-content` wrapper removed from the release, skill and iteration cards; site rules keeping the 16px inside cards (`table.tokens`, ticket modal); `.release-note` border `border.subtle`.
- Verification: 16px between blocks measured on Release planning, How to use skills and a ticket modal (B031); type check and build pass; no console error.
- Compliance audit: `audits/2026-10-29-B124-2.md` (no new finding).

**Files**
- `audits/2026-10-29-B124-2.md` (created)
- `components/Card/Card.css`, `spec.md`, `guidelines.md`, `meta.json`, `docs/src/docs.css`, `docs/src/pages/ReleasePlanningPage.tsx`, `SkillsPage.tsx`, `TicketDialog.tsx`, `STEPS.md` (updated)

## Step B122-1 — Documentation site: use SideNavigation and IconButton
**Date:** 2026-10-29

**Decisions (made by the Design System Lead)**
- **SideNavigation 1.1**: below desktop it is hidden and opens over the page with a burger **IconButton `primary`** (as the site did); closed with the burger or when a page opens (no Escape, no click outside). New `open` prop.
- Sections with pages below them are **parent items without a page**; their page is reached from the Overview cards and the breadcrumb (`navigation` skill updated).
- Follow the SideNavigation spec: no space title, no empty note, no icons on sub-pages. Below desktop, a **"Spaces"** parent item (icon `workspaces`) at the top lists the spaces; only the page displayed is selected.
- The site may place the navigation under its header; heights use `100dvh`.

**What was done**
- `components/SideNavigation`: `open` prop and below-desktop CSS (hidden, not focusable when closed, slides in with `--shadow-panel`), spec, guidelines, playground (`open` control), `meta.json` 1.1 (by Claude).
- `ds-compliance-fix`, `docs/` only: `AppShell.tsx` builds the navigation with SideNavigation + NavigationItem and the burger with IconButton; hand-built navigation CSS removed; `structure.ts` empty note removed. Then Claude: "Spaces" icon, no selected space, `100dvh`.
- `.claude/skills/navigation/SKILL.md`: side navigation and Level 2 sections rules.
- Verification: type check and build pass; 1440px: sticky navigation 240px, no burger, no "Spaces"; 375px and 800px: the burger opens the navigation over the page, one selected item; no console error.
- Compliance audit: `audits/2026-10-29-B122-1.md` (#1, #2, #20 fixed; #25–#28 resolved).
- Ticket B122 `done`. Committed on `governance/docs-compliance`, not merged into `develop` yet (Design System Lead's choice, Step B124-2).

**Files**
- `audits/2026-10-29-B122-1.md` (created)
- `components/SideNavigation/SideNavigation.tsx`, `SideNavigation.css`, `spec.md`, `guidelines.md`, `meta.json`, `playground.tsx`, `docs/src/AppShell.tsx`, `docs/src/docs.css`, `docs/src/structure.ts`, `.claude/skills/navigation/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B123-1 — Documentation site: use Button and Select
**Date:** 2026-10-30

**Decisions (made by the Design System Lead)**
- "Copy" and "Show / Hide rejected": **Button `tertiary`**. The Copy button goes **above the code block**, right-aligned, on the page background, 16px from the code.
- The selects of the Design preview and Playground tables are **Select** components with a **visible label** naming the row (slot, token or prop).
- **Select 1.1**: a value may be shown as chosen in advance when the field shows a setting that already exists.
- **Select 1.2**: the list shows **8 options at most**, then scrolls.
- **Readable labels** for code names: no "--" prefix, no token category (kept when the rest is only a number: "Space 16"), dashes and dots become spaces, sentence case.
- `IconSelect` stays: approved site exception, candidate for a future Combobox component.

**What was done**
- `components/Select`: guidelines (value chosen in advance, long lists), spec (list height), `Select.css` (max height of 8 options, scroll), `meta.json` 1.1 and 1.2 (by Claude).
- `ds-compliance-fix` (two runs), `docs/` only: Button and Select on the Component page (Code, Design preview, Playground) and the Backlog; `docs/src/readableName.ts`; Copy buttons above the code; unused CSS removed. Then Claude: category kept for number-only tokens, readable names for every Playground control, code block margin.
- Verification: type check and build pass; on the Button page, readable labels ("Variant", "Border width 2", "Background brand subtle"), a list of 8 options that scrolls, Copy button 16px above the code.
- Compliance audit: `audits/2026-10-30-B123-1.md` (#3, #4, #6 fixed, #7 approved exception; #32 still open, smaller).
- Ticket B123 `done`. Committed on `governance/docs-compliance`, not merged into `develop` yet.

**Files**
- `docs/src/readableName.ts`, `audits/2026-10-30-B123-1.md` (created)
- `components/Select/Select.css`, `spec.md`, `guidelines.md`, `meta.json`, `docs/src/DesignPreview.tsx`, `docs/src/PlaygroundTab.tsx`, `docs/src/pages/ComponentPage.tsx`, `docs/src/pages/BacklogPage.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B125-1 — Documentation site: accessibility fixes
**Date:** 2026-10-30

**Decisions (made by the Design System Lead)**
- Component page tabs: complete the WAI-ARIA tabs pattern now, without changing the look (replaced later by Tabs, B093); accessible name "Component documentation".
- The active option of the search results and of IconSelect is shown **like a focused SelectOption**: focus state layer + `border.focus` outline, hover layer, `--radius-8`, `--duration-100` transition; the IconSelect list gets `--space-4` padding on all sides.
- "No page found" leaves the listbox and is announced by a live region; it keeps the color shown so far (`text.primary`).

**What was done**
- `tokens/contrast-pairs.json` (by Claude): 6 semantic pairs added (text.brand on background.subtle, border.info / border.error on their subtle backgrounds, text.primary on info-subtle and error-subtle, icon.inverse on background.brand); 52/52 pass.
- `ds-compliance-fix`, `docs/` only: `ComponentPage.tsx` (tabs pattern), `AppShell.tsx` (live region), `docs.css` (active option). Then Claude: list padding, radius, hover layer and transition (`docs.css`).
- Verification: type check and build pass; Right arrow selects and focuses the next tab, tab ↔ panel linked; search active option with 2px outline and state layer; "No page found" announced without an empty listbox; IconSelect outline fully visible (4px padding).
- Compliance audit: `audits/2026-10-30-B125-1.md` (#11–#14 fixed, #37 and #38 found and fixed).
- Ticket B125 `done`. Committed on `governance/docs-compliance`, not merged into `develop` yet.

**Files**
- `audits/2026-10-30-B125-1.md` (created)
- `tokens/contrast-pairs.json`, `docs/src/pages/ComponentPage.tsx`, `docs/src/AppShell.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B126-1 — Documentation site: tokens only
**Date:** 2026-10-30

**Decisions (made by the Design System Lead)**
- Site sizes become **design system tokens** `size.*`, named by usage (30 new: header, logo, search field, home, Backlog, ticket menu, dropdown list, Playground, code block, previews, icon grid, git flow, tree connector, Foundations samples, checkbox, simulated screens, canvas minimum height); values unchanged.
- New semantic shadows: `shadow.dropdown` and `shadow.hover` → `shadow.2`, `shadow.frame` → `shadow.1`.
- **Site exceptions** (documented at the top of `docs.css`): primitive colors of the clock and the landing page, VT323 clock font, inline code em units (until B067), skip link `top: -100px` (until B066), `--doc-mono` (B067).

**What was done**
- `tokens/semantic.json` (by Claude): 30 `size.*` tokens and 3 shadows; `tokens/tokens.css` rebuilt (52/52 pairs pass); `CLAUDE.md` updated.
- `ds-compliance-fix`, `docs/` only: `docs.css` (sizes, shadows, `.z-stack` removed, exceptions comment), `IconSelect.tsx` (list size from tokens), `PlaygroundTab.tsx` (breakpoints). Then Claude: `PrototypePage.tsx` and `PlaygroundTab.tsx` read the simulated screen and canvas tokens, `size.checkbox`.
- Verification: type check and build pass; header 64px, logo 32px, search field 40px measured in the browser (nothing changes on screen).
- Compliance audit: `audits/2026-10-30-B126-1.md` (#15, #17, #18, #19, #39 fixed; #16 approved exception).
- Ticket B126 `done`. Committed on `governance/docs-compliance`, not merged into `develop` yet.

**Files**
- `audits/2026-10-30-B126-1.md` (created)
- `tokens/semantic.json`, `tokens/tokens.css`, `CLAUDE.md`, `docs/src/docs.css`, `docs/src/IconSelect.tsx`, `docs/src/PlaygroundTab.tsx`, `docs/src/pages/PrototypePage.tsx`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B127-1 — Documentation site: layout, page header and text styles
**Date:** 2026-10-30

**Decisions (made by the Design System Lead)**
- Section titles: `h2` → `heading-4`, `h3` → `heading-5`. Small texts (12px) → `body-sm`; tables and notes (14px) → `body`; Backlog column titles and ticket sub-headings → `label`; the site name → `heading-5` at every screen size.
- Text styles are applied in the site CSS with the **4 tokens of the style**; the `.ds-text-*` classes are not required in the markup (`page-header` skill).
- Approved full-width exceptions: the **Backlog** and **Prototype** pages (`layout` skill).
- The Select list in tables that scroll horizontally (#32) is accepted as is.
- `ds-compliance-fix` may run **read-only git commands** (`diff`, `status`, `log`, `show`).

**What was done**
- `.claude/skills/page-header/SKILL.md` and `.claude/skills/layout/SKILL.md` (by Claude); `ds-compliance-fix` agent and `git-workflow`: read-only git.
- `ds-compliance-fix`, `docs/` only: top-level blocks 16px apart, shared `Header` with `title` on 11 pages, text styles with their 4 tokens, comments on the full-width exceptions. Then Claude: ticket sub-headings `label`, site name `heading-5` below desktop, `title` on the landing page (`index.html`), B127 "done when" updated.
- Verification: type check and build pass; 16px between all top-level blocks measured on the Button, Governance and Backlog pages; `title` on the Backlog title and subtitle.
- Compliance audit: `audits/2026-10-30-B127-1.md` (#21, #23 fixed; #22, #32 approved exceptions; #24 smaller; #40, #41 new).
- Ticket B127 stays `in-progress`: #24 (16 partial styles), #40 (spacing inside nested blocks) and #41 (clock sizes) need decisions.

**Files**
- `audits/2026-10-30-B127-1.md` (created)
- `docs/src/docs.css`, `docs/src/pages/SectionPages.tsx` and 11 page files, `index.html`, `.claude/skills/page-header/SKILL.md`, `.claude/skills/layout/SKILL.md`, `.claude/skills/git-workflow/SKILL.md`, `.claude/agents/ds-compliance-fix.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B127-2 — Text styles completed, last site exceptions
**Date:** 2026-10-30

**Decisions (made by the Design System Lead)**
- Code-font text (`--doc-mono`, until B067) takes only the **size and line height** of its text style.
- The **spacing inside nested blocks** (Foundations sections, component tab panels, Markdown) is kept; 16px applies between the top-level blocks (`layout` skill).
- The clock sizes (28px, 40px) are part of the **VT323 clock exception**.

**What was done**
- `docs/src/docs.css` (by Claude): the 12 rules that set part of a text style now set its 4 tokens; exceptions comment updated.
- `.claude/skills/layout/SKILL.md` and `.claude/skills/page-header/SKILL.md`: nested spacing and font exceptions.
- Visible: `.git-flow-arrow-label` becomes semibold (label-sm); link card titles take the heading line height (1.2).
- Verification: type check and build pass; label-sm measured on the Git workflow and Navigation pages.
- Compliance check: `audits/2026-10-30-B127-2.md` (#24 fixed; #40, #41 approved exceptions).
- Ticket B127 `done`.

**Files**
- `audits/2026-10-30-B127-2.md` (created)
- `docs/src/docs.css`, `.claude/skills/layout/SKILL.md`, `.claude/skills/page-header/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B129-1 — Agents page
**Date:** 2026-10-30

**Decisions (made by the Design System Lead)**
- An **Agents** page in Governance documents every agent of the project, read from `.claude/agents/`, with the rules shared by all agents. Ticket B129: Tooling, priority medium, release R1.
- After the compliance audit: the allowed tools of an agent are shown as **plain text** (not Tags: Tag guidelines allow 3 tags side by side, and a tool is not a category or a status); the Governance subtitle becomes "Backlog, skills, agents, git workflow, branches, changelog and releases" (70 characters, maximum 80).

**What was done**
- `docs/src/agents.ts`: reads `.claude/agents/*.md` (frontmatter `name`, `description`, `tools`; the `## Report` section, code blocks ignored) and the `## Agents` section of `CLAUDE.md` (shared rules).
- `docs/src/pages/AgentsPage.tsx` (`#/agents`, Level 3 under Governance, after How to use skills): intro, "Rules for every agent", one Card per agent (description: role and when it is run; allowed tools; "What it reports" and "Show the full agent", folded). A new agent appears without changing the page.
- Navigation: `structure.ts` (entry, Governance subtitle), `App.tsx` (route), Navigation structure page and `navigation` skill tree; `CLAUDE.md` (Agents section).
- Compliance audit (`ds-compliance-audit`): report checked and written to `audits/2026-10-30-B129-1.md`; its two new findings (#25 Tags, #26 subtitle) came from the step and were fixed in it; 23 findings still open, covered by B094, B118, B122 to B127.
- Verification: type check and build pass; the page shows the 4 shared rules and the 2 agents with their tools and folded sections.

**Files**
- `docs/src/agents.ts`, `docs/src/pages/AgentsPage.tsx`, `audits/2026-10-30-B129-1.md` (created)
- `docs/src/App.tsx`, `docs/src/structure.ts`, `docs/src/pages/NavigationPage.tsx`, `.claude/skills/navigation/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B127-3 — Agents page aligned, full audit before the merge into develop
**Date:** 2026-10-30

**What was done**
- `develop` merged into `governance/docs-compliance` (B129 Agents page, B130 reservation); `STEPS.md` conflict resolved by keeping both sides.
- `docs/src/pages/AgentsPage.tsx`: shared `Header` (title attribute), `.card-content` wrapper removed (Card 1.2 spacing) — the B127 and B124-2 rules applied to the page that came from develop.
- Full compliance audit of the site: `audits/2026-10-30-before-develop-merge.md` (30 compliant, 6 non-compliant: #5, #10 → B094; #9 → B118; #42–#44 new, tickets to propose).
- `governance/docs-compliance` merged into `develop` (B124-2, B122, B123, B125, B126, B127), as decided by the Design System Lead.

**Files**
- `audits/2026-10-30-before-develop-merge.md` (created)
- `docs/src/pages/AgentsPage.tsx`, `STEPS.md` (updated)

## Step B131-1 — Git workflow: project branches
**Date:** 2026-10-30

**Decisions (made by the Design System Lead)**
- A third branch type, **`project/<name>`** (kebab-case), for a long piece of work on the documentation site or the tooling, used only when the Design System Lead asks for it. Long lifetime; merged into `develop` once the project is validated, or on request. Ticket B131: Tooling, priority medium, release R1.
- One conversation per project, **Projet `<Name>`**, archived once the project is validated and merged.
- First project: the UX playground (B130), on `project/ux-playground`.

**What was done**
- `git-workflow` skill: three branch types, the `project/` row in the Branches table and its conversation, diagram, end of a project.
- `CLAUDE.md` (Git): branch types, conversations, merge into `develop`.
- Git workflow page of the site: a 4th branch box `project/<name>` and the Projet conversation.
- Compliance audit (`ds-compliance-audit`): report checked and written to `audits/2026-10-30-B131-1.md`; no finding introduced by the step; one older finding found (#27, the git workflow diagram is hidden from screen readers), not fixed in this step.
- Verification: type check passes; the Git workflow page shows the 4 branch types.

**Files**
- `audits/2026-10-30-B131-1.md` (created)
- `.claude/skills/git-workflow/SKILL.md`, `CLAUDE.md`, `docs/src/pages/GitWorkflowPage.tsx`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B104-2 — Navigation structure page moved to Governance
**Date:** 2026-11-04

**Decisions (made by the Design System Lead)**
- B104 Navigation architecture: review the structure of the site.
- The Navigation section (Level 2 of Documentation) becomes a **Level 3 page of Governance**, placed right after **Changelog**. Same icon as Git workflow (`account_tree`). The URL stays `#/navigation`.
- Its side navigation item and its card are labelled like the page title, **Navigation structure** (finding #46 of the audit).
- Governance subtitle: "Backlog, skills, agents, git workflow, branches, changelog, navigation, releases" (80 characters, finding #45 of the audit).

**What was done**
- `docs/src/structure.ts`: Navigation structure moved from the Documentation sections to the Governance pages, after Changelog; Documentation and Governance descriptions updated. The Overview loses its Navigation card; the Governance page gets one; the breadcrumb of the page is now "BuildDesignSystem / Documentation / Governance".
- `docs/src/pages/NavigationPage.tsx`: Levels table (Level 2 without Navigation) and Flow tree updated.
- `docs/src/App.tsx`: route comment (`#/navigation` in Level 3).
- `navigation` skill: Level 2 row, structure tree, history and the Navigation structure row.
- The principle "the logo in the header goes back to the landing page" asked by the Design System Lead already exists ("Back to Level 0") and is applied by the site: nothing added.
- Compliance audit (`ds-compliance-audit`): report checked and written to `audits/2026-11-04-B104-2.md`; #45 (introduced by the step) and #46 (older) fixed after the Design System Lead's decisions; 7 older findings still open, all covered by existing tickets.
- Verification: type check and build pass; side navigation, Governance page and Navigation structure page checked in the browser.

**Files**
- `audits/2026-11-04-B104-2.md` (created)
- `docs/src/structure.ts`, `docs/src/pages/NavigationPage.tsx`, `docs/src/App.tsx`, `.claude/skills/navigation/SKILL.md`, `STEPS.md` (updated)

## Step B104-3 — Navigation architecture: ticket done
**Date:** 2026-11-04

**What was done**
- B104 Navigation architecture closed by the Design System Lead: status `done` (release R1). The structure review is in Step B104-2; no other navigation principle to add.
- Branch `governance/navigation-architecture` merged into `develop`, then deleted.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B018-1 — Link: design approved
**Date:** 2026-11-04

**Decisions (made by the Design System Lead)**
- Ticket B018 taken for release R1. Identity: `Link`, `components/Link/`, `.ds-link`, atom, "Text action that takes the user to another page or place."
- One variant (default, `color.text.link`), size inherited from the surrounding text, text only, always underlined (`border-width.1`).
- States: hover `color.text.link-hover` (primary-700), pressed `color.text.link-pressed` (primary-800), visited `color.text.link-visited` (primary-800) — a **Link exception to state layers** (no state layer on hover / pressed). Focus: no outline, no state layer, underline `border-width.2`. No disabled state.
- Design stage approved; the component moves to Guidelines.

**What was done**
- Branch `component/Link` from `develop`; ticket B018 reserved (`in-progress`), then stage `guidelines`.
- `components/Link/` from the template: `meta.json`, design preview (`design/Preview.tsx`, `design/tokens.json`, states default / hover / focus / pressed / visited), `spec.md`.
- 3 new semantic tokens `color.text.link-hover`, `-pressed`, `-visited` in `tokens/semantic.json`, with 9 contrast pairs (page, surface, brand-subtle) in `tokens/contrast-pairs.json`: 61/61 pairs pass AA.
- `token-naming` skill and `CLAUDE.md`: the Link exception and the new roles.
- Docs site: `visited` added to the preview states (`docs/src/types.ts`).
- Compliance audit (`ds-compliance-audit`): `audits/2026-11-04-B018-1.md` — 29 compliant, 6 non-compliant (all already open: #5, #9, #10, #42–#44), 0 new; the site's hand-written text links are tracked as "in progress (B018)".

**Files**
- `components/Link/` (created), `audits/2026-11-04-B018-1.md` (created)
- `tokens/semantic.json`, `tokens/contrast-pairs.json`, `.claude/skills/token-naming/SKILL.md`, `CLAUDE.md`, `docs/src/types.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B033-1 — Split the tokens page by category: ticket done
**Date:** 2026-11-04

**What was done**
- B033 closed by the Design System Lead: status `done`. The work was already delivered by Step B087-1 (2026-10-27): the Foundations section has one page per category (Color, Typography, Spacing, Radius, Border width, Shadows, Motion, Opacity, Size, Breakpoints, Layout grid, Z-index, Icons). The ticket had stayed in To do.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B039-1 — Skill: accessibility-check
**Date:** 2026-11-04

**Decisions (made by the Design System Lead)**
- A skill `accessibility-check`, run by a dedicated read-only agent **`ds-accessibility-audit`**, checks **components** (spec and design preview, guidelines, code) and **design tokens** against WCAG 2.2 AA.
- When: before the approval of **every component stage** (the code check is also the check before `complete`), before the approval of a token created or changed, and on request.
- **Blocking**: a failure is fixed before the approval; only the Design System Lead can accept a failure as an explicit exception, written in the report and in `STEPS.md`.
- Checklist: the accessibility rules already approved (`CLAUDE.md`, `component-spec`, `component-guidelines`, `component-code`), plus four WCAG 2.2 AA criteria added: name, role, value and label in name (4.1.2, 2.5.3); no keyboard trap (2.1.2); focus not obscured (2.4.11); zoom, reflow and text spacing (1.4.4, 1.4.10, 1.4.12).
- Reports in `audits/<YYYY-MM-DD>-<ticket>-<n>-accessibility.md`.

**What was done**
- `.claude/skills/accessibility-check/SKILL.md` (created): scope, moments, blocking rule and exception, how to run it, the checklist per stage and for tokens (each rule with its source).
- `.claude/agents/ds-accessibility-audit.md` (created): read-only agent, report shape (pass / fail / not applicable, "Blocking: yes / no", what Claude checks in the browser at the code stage).
- `orchestrator` skill: dispatch row. `component` skill: the accessibility check is step 0 of the approval gate. `CLAUDE.md` (Accessibility): the rule.
- The skill and the agent show on the How to use skills and Agents pages (discovered automatically).
- B039 done.
- Compliance audit (`ds-compliance-audit`): report checked and written to `audits/2026-11-04-B039-1.md`; no finding introduced by the step; one older finding found (#47, tables inside cards break words), not fixed in this step; 7 older findings still open.
- Verification: type check passes; both pages checked in the browser.

**Files**
- `.claude/skills/accessibility-check/SKILL.md`, `.claude/agents/ds-accessibility-audit.md`, `audits/2026-11-04-B039-1.md` (created)
- `.claude/skills/orchestrator/SKILL.md`, `.claude/skills/component/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B132-1 — Accessibility follow-up: finding 47 added
**Date:** 2026-11-04

**Decisions (made by the Design System Lead)**
- Finding 47 of the compliance audit of Step B039-1 (tables inside cards break words, `audits/2026-11-04-B039-1.md`) is added to **B132 Documentation site: accessibility follow-up** (priority medium, release R2), rather than a new ticket.

**What was done**
- `backlog/backlog.json`: B132 description, why, scope (finding 47 and its decisions to ask first: site only or Card component; scroll or wrap) and done-when updated. Status unchanged (`todo`).

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B018-2 — Link: guidelines approved
**Date:** 2026-11-05

**Decisions (made by the Design System Lead)**
- Guidelines: when to use (link in a text, standalone, external); when not to use (action → Button, main navigation → SideNavigation / Breadcrumb, link with an icon → Button `tertiary` with `href`); best practices (links kept apart, no extra styling, one link per destination, allowed backgrounds, Markdown links styled like the Link); 4 do / don't pairs; content (label describes the destination, short, sentence case, no final punctuation, page title for a site page); behavior (same tab for every link, wrap, anchor scroll, browser `:visited`, no disabled state).
- Accessibility check (`accessibility-check`, B039, run on the design and the guidelines): 7 failures on the first run. Decided: a standalone link uses the WCAG 2.5.8 spacing exception (24px from the next target, also written in `spec.md` Sizes); an anchor target stops below the sticky header (scroll offset); wording added for no keyboard trap, focus order and accessible name. **Accepted exceptions**: D2 — hover and pressed change color, no state layer; D3 — focus is a thicker underline (`border-width.1` → `border-width.2`), no outline and no `border.focus`.
- Guidelines stage approved; the component moves to Code.

**What was done**
- `components/Link/guidelines.md` written; `spec.md` (Sizes, target size); `meta.json` status `code`; B018 stage `code`.
- Accessibility report: `audits/2026-11-04-B018-2-accessibility.md` (second run: 11 pass, 0 fail, 2 accepted exceptions).
- Compliance audit (`ds-compliance-audit`): `audits/2026-11-05-B018-2.md` — no site change in this step; 33 compliant, 7 non-compliant (all already open, covered by B094, B118, B132, B133, B134), 0 new.

**Files**
- `audits/2026-11-04-B018-2-accessibility.md`, `audits/2026-11-05-B018-2.md` (created)
- `components/Link/guidelines.md`, `components/Link/spec.md`, `components/Link/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B018-3 — Link: code approved, component complete
**Date:** 2026-11-05

**Decisions (made by the Design System Lead)**
- Code stage approved: Link is `complete`, version `1.0` ("First complete version.").
- The documentation site adopts the Link inside B018 (next step, B018-4), before the ticket is done. Decisions for it: "Read the git-workflow skill" becomes a Link without the icon; the Icons page external link opens in the same tab; "Open in a new tab" on the Prototype page keeps the new tab (exception added to the guidelines, Behavior); the skill tree links become Links.

**What was done**
- `components/Link/Link.tsx` (`<a href>`, `href` and label required, `className` and native attributes passed through), `Link.css` (semantic tokens only: `text.link`, `-visited`, `-hover`, `-pressed`; underline `border-width.1`, `border-width.2` on `:focus-visible`, no outline), `examples.tsx` (in a text, inherited text styles, standalone, visited, long label, allowed backgrounds), `playground.tsx` (`href`, label); demo links keep the click on the page.
- Export in `components/index.ts`; `meta.json` status `complete`, version `1.0`, changelog; B018 stage `complete` (status stays `in-progress` until the site adopts the Link).
- `guidelines.md`: the new-tab exception.
- Accessibility check (code): `audits/2026-11-05-B018-3-accessibility.md` — 8 pass, 0 fail; browser checks pass (keyboard, focus, 320px, 200% zoom, text spacing, standalone spacing); exceptions D2 / D3 unchanged.
- Compliance audit (`ds-compliance-audit`): `audits/2026-11-05-B018-3.md` — 33 compliant, 13 non-compliant; 6 new (#45–#50, the site's hand-written links, scope of B018-4), 7 still open.

**Files**
- `audits/2026-11-05-B018-3-accessibility.md`, `audits/2026-11-05-B018-3.md` (created)
- `components/Link/Link.tsx`, `Link.css`, `examples.tsx`, `playground.tsx`, `meta.json`, `guidelines.md`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B084-1 — Dedicated agents: token audit
**Date:** 2026-11-05

**Decisions (made by the Design System Lead)**
- B084 delivers one new agent, **`ds-token-audit`**: it checks that a component uses semantic tokens only — no raw value, no primitive token, no unknown or badly named token.
- When: before the approval of a component's **design** and **code** stages, on **release day** (every component) and **on request**. **Blocking** (the stage, or the release), unless the Design System Lead accepts a failure as an exception.
- Allowed without a token (current practice): `0`, `100%`, `auto`, `inherit`, `currentColor`, `transparent`, `none`, CSS keywords, flex ratios, `opacity` 0 / 1, and the 768 / 1024px media queries with their comment.
- Not checked: contrast pairs (`ds-accessibility-audit`), `examples.tsx` / `playground.tsx`, the frames of the design preview (frame and placeholder sizes, space between mock-ups, `previewMinWidth`), and the role of a token on a property.
- The `caption` bug of TimelineStep found by the trial run is fixed **before R1**: new ticket **B135** (priority high, release R1), worked on in a Composant TimelineStep conversation.

**What was done**
- `.claude/agents/ds-token-audit.md` (created): scope per stage and release, the four failure types, allowed values, report shape (failures, "Blocking: yes / no", exceptions).
- `component` skill: the token audit at step 0 of the approval gate (design and code stages), report in `audits/<date>-<ticket>-<n>-tokens.md`. `git-workflow` skill, section 8: the token audit of every component on release day, blocking the release. `orchestrator` skill: dispatch row. `CLAUDE.md` (Agents): `ds-accessibility-audit` and `ds-token-audit` described; the Agents page shows them.
- Trial run on the 17 components: `audits/2026-11-05-B084-1-tokens.md` — 4 failures left after the scope decisions, all TimelineStep `caption` (B135); Link (complete since B018-3) re-checked: no failure.
- `backlog/backlog.json`: B135 created (reserved first); B084 done.
- Compliance audit (`ds-compliance-audit`): `audits/2026-11-05-B084-1.md`; no finding introduced by the step; the text links become non-compliant now that Link is complete (#48–#53, the #45–#50 of `audits/2026-11-05-B018-3.md` renumbered), covered by B018-4.
- Verification: type check passes; the Agents page shows the new agent and the rules.

**Files**
- `.claude/agents/ds-token-audit.md`, `audits/2026-11-05-B084-1-tokens.md`, `audits/2026-11-05-B084-1.md` (created)
- `.claude/skills/component/SKILL.md`, `.claude/skills/git-workflow/SKILL.md`, `.claude/skills/orchestrator/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B018-4 — Documentation site: use the Link component
**Date:** 2026-11-05

**Decisions (made by the Design System Lead)**
- The site adopts the Link in B018 (decisions of Step B018-3). Approved after review: the Icons page label becomes "Google Fonts icon library" (no raw URL); the skill tree parent chip is no longer semibold (no bold link).
- Audit findings 51 and 52 go to a new ticket **B136** "Link: code labels and spacing in lists" (proposal, medium, R2).
- B018 is done.

**What was done**
- `Link` from `@ds/components` in `GitWorkflowPage`, `BranchesPage`, `ReleasePlanningPage`, `TicketDialog`, `ChangelogPage`, `IconsPage` (same tab), `PrototypePage` ("Open in a new tab", approved exception), `SkillsPage` (tree links, parent chip on a wrapper span).
- `Markdown.tsx`: rendered links get `class="ds-link"`.
- `docs.css`: `.git-flow-link` and `.skill-tree a` rules removed; semibold removed from `.skill-tree-parent`.
- Verification: type check and build pass; every content link of the site is a `.ds-link` (underlined, `text.link`, regular weight); no console error.
- Compliance audit (`ds-compliance-audit`): `audits/2026-11-05-B018-4.md` — 38 compliant, 9 non-compliant; #45–#50 fixed; 2 new (#51, #52 → B136); 7 still open.
- Token audit (`ds-token-audit`, rule B084 that reached `develop` during this step; Link's design and code were approved before it): `audits/2026-11-05-B018-4-tokens.md` — 33 values checked, 0 failure.
- Ticket B136 created and reserved; B018 status `done`.

**Files**
- `audits/2026-11-05-B018-4.md`, `audits/2026-11-05-B018-4-tokens.md` (created)
- `docs/src/pages/GitWorkflowPage.tsx`, `BranchesPage.tsx`, `ReleasePlanningPage.tsx`, `TicketDialog.tsx`, `ChangelogPage.tsx`, `IconsPage.tsx`, `PrototypePage.tsx`, `SkillsPage.tsx`, `docs/src/Markdown.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B130-1 — UX playground: user journey content
**Date:** 2026-11-05

**Decisions (made by the Design System Lead)**
- Before building the UX playground: a user journey, then a user flow, then a prototype. The reusable structure of a user journey (phases + actions, shown as a visual journey map) is governance work, made in the Gouvernance conversation; not in `develop` yet, so the content is recorded here and moved into the template once it is merged.
- Playground decisions: free canvas holding layout frames (mobile, tablet, desktop), components on the grid of each frame; right panel with two tabs, Library and Properties (variants, states, texts, tokens); tokens changed for one placed component only, with another approved token or a free value marked not approved; compositions saved in the repository by the dev server; sticky notes and comments; a new space next to Prototypes.
- Phase 7: two actions visible on the canvas, **Create the prototype** (prototype ticket and prototype) or **Add to the backlog** (ticket only); the ticket arrives **to be validated** by the Design System Lead, who chooses its priority and release; it takes over the components used, the frames (screens and journey steps), the sticky notes and comments, and a link to the composition. The "to be validated" status is a governance change, to ticket later.

**User journey — UX playground** (user: a UX designer)

| Phase | User actions | Touchpoints |
| ----- | ------------ | ----------- |
| 0. Have an idea | Has a need (a screen to explore, a feature to test) and opens the documentation site. | Landing page |
| 1. Open the playground | Finds the UX playground space in the navigation, opens it, sees the existing compositions. | Side navigation, list of compositions |
| 2. Create a composition | Creates a new composition and names it. | New composition button, name field |
| 3. Compose | Adds frames (mobile, tablet, desktop), opens the component library, drags components into a frame, places them on the grid and moves them. | Canvas, frames, right panel (Library tab) |
| 4. Adjust | Selects a placed component; changes its variants, states and texts; changes its tokens (that component only): another approved token or a free value marked not approved. | Right panel (Properties tab) |
| 5. Annotate | Adds sticky notes on the canvas; comments on a component or a frame. | Sticky notes, comments |
| 6. Save and share | Saves the composition in the repository; the team reopens it from the list. | Save button, list of compositions |
| 7. Turn into a prototype or a ticket | Chooses Create the prototype (ticket + prototype) or Add to the backlog (ticket only); the ticket waits for the Design System Lead's validation (priority, release) and takes over the composition. | Two buttons on the canvas, Backlog, Prototypes space |

**What was done**
- `backlog/backlog.json`: B130 scope updated with the decisions and the order of the work.
- No change to the documentation site: no compliance audit for this step (the last report, `audits/2026-11-05-B084-1.md`, still applies).

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B130-2 — Projects section and the UX playground journey map
**Date:** 2026-11-05

**Decisions (made by the Design System Lead)**
- **Projects**: a Level 2 section of Documentation, right after Prototypes, icon `folder_special`; one Level 3 page per project.
- A project page has **one section per deliverable** (User journey, then User flow and Prototype); the user journey is a **journey map, one Card per phase** (4 columns on desktop, 2 on tablet, 1 on mobile).
- Subtitles approved with the preview: Projects "User journeys of each project, before its user flow and prototype"; UX playground "Compose the coded components in a layout before a prototype".

**What was done**
- `projects/ux-playground/project.json` (created): name, subtitle, ticket and the user journey of Step B130-1 (user, 8 phases with actions and touchpoints). Moved into the format of the user journey template once it is in `develop`.
- `docs/src/projects.ts` (created): discovers `projects/<name>/project.json`. `docs/src/pages/ProjectPage.tsx` (created): page header and the User journey section. `docs/src/docs.css`: `.journey-map` (tokens only, 768 / 1024px media queries).
- `docs/src/structure.ts`: the Projects section; Documentation description. `docs/src/App.tsx`: routes `#/projects` and `#/projects/<name>`.
- `navigation` skill and Navigation structure page: Projects in the levels, the tree and the rules.
- Branch updated from `develop` (B018-4 and others).
- Compliance audit (`ds-compliance-audit`): `audits/2026-11-05-B130-2.md` — 4 new findings from this step (#54 phase number in the card titles, #55 "Touchpoints" line, #56 cards side by side, #57 side navigation of a single project); #48–#53 fixed by the update from `develop`. The new findings are worked on in the next step of B130.
- Verification: type check and build pass; the Projects page and the UX playground page show with no console error.

**Files**
- `projects/ux-playground/project.json`, `docs/src/projects.ts`, `docs/src/pages/ProjectPage.tsx`, `audits/2026-11-05-B130-2.md` (created)
- `docs/src/structure.ts`, `docs/src/App.tsx`, `docs/src/docs.css`, `docs/src/pages/NavigationPage.tsx`, `.claude/skills/navigation/SKILL.md`, `STEPS.md` (updated)

## Step B135-1 — TimelineStep: date range text style
**Date:** 2026-11-11

**Decisions (made by the Design System Lead)**
- The date range of TimelineStep uses the existing `body-sm` text style ("Notes, captions"); no new `caption` style. Fixed before release R1 (token audit of R1, B084).

**What was done**
- `TimelineStep.css`: `--typography-caption-*` (undefined) replaced with `--typography-body-sm-*`. The dates now render at 12px (they inherited 14px from their parent before).
- `design/tokens.json` (variants default and selected) and `spec.md` (Design tokens table): `caption` → `body-sm`.
- `meta.json`: version 1.1 with its changelog entry.
- Verification: type check and `npm run tokens` pass; computed style of the dates = Open Sans 12px / 400 / 1.5; no console error. Color unchanged (`text.primary`), so contrast unchanged. `docs/` unchanged: the R1 compliance audit (`audits/2026-11-11-R1.md`) still applies.
- B135 status `done`.

**Files**
- `components/TimelineStep/TimelineStep.css`, `components/TimelineStep/design/tokens.json`, `components/TimelineStep/spec.md`, `components/TimelineStep/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step R1-1 — Release R1
**Date:** 2026-11-11 (planned 2026-11-06)

**Decisions (made by the Design System Lead)**
- Release R1 validated after review: commits, files, tickets, compliance audit and release note.
- The token audit blocked the release on TimelineStep (unknown `caption` text style): fixed before the release with `body-sm` (B135, Step B135-1, TimelineStep 1.1).
- The release note shows the actual date with the planned date in parentheses.

**What was done**
- Compliance audit of `develop`: `audits/2026-11-11-R1.md` — 41 compliant, 10 non-compliant (all covered by existing tickets), 21 not in the design system; no new ticket.
- Token audit of every component: `audits/2026-11-11-R1-tokens.md` — 4 failures (TimelineStep), fixed by B135-1 and re-checked: 0 failure.
- Release note `releases/R1.md`: tickets delivered by category, component versions, B055 and B057 carried over to R2.
- `develop` merged into `main` (fast-forward) and tagged `R1`.

**Files**
- `releases/R1.md`, `audits/2026-11-11-R1.md`, `audits/2026-11-11-R1-tokens.md` (created)
- `STEPS.md` (updated)

## Step B102-1 — Prototype preview frames: Timeline panel visible in Safari
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- The bug happens in **Safari** on the Prototype page of the documentation site (`/docs/#/prototypes/work-description`): in the Mobile and Tablet frames, a click on the `timeline` icon button showed a blank frame, or the panel cut and on the left, with no dimmed background and no step text.
- Fix validated in Safari by the Design System Lead.

**What was done**
- Cause: the preview frames are iframes scaled down with `transform: scale()`; Safari does not paint the fixed, animated layers inside them correctly (the Timeline panel). Not reproduced in Chromium, nor in the prototype opened on its own; the Timeline and the prototype are not at fault.
- `docs/src/docs.css`: `.prototype-frame-screen` gets `will-change: transform`, so Safari paints each scaled frame on its own layer (comment naming B102). Timeline, prototype and components unchanged.
- Verification: in Chromium the panel still opens in the Mobile and Tablet frames, no console error; in Safari checked by the Design System Lead.
- Compliance audit: `audits/2026-11-14-B102-1.md` — 41 compliant, 10 non-compliant (all covered by existing tickets), 21 not in the design system; 0 fixed, 0 new; no new ticket.
- B102 status `done`.

**Files**
- `audits/2026-11-14-B102-1.md` (created)
- `docs/src/docs.css`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B102-2 — Playground canvas: visible in Safari
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- B102-1 merged into `develop`.
- The same fix is applied to the Playground tab of the component pages, which scales its canvas iframe the same way.

**What was done**
- `docs/src/docs.css`: `.playground-canvas` gets `will-change: transform` (comment naming B102), so Safari paints the scaled canvas on its own layer.
- Verification: in Chromium, Timeline Playground at Mobile (375px): the `timeline` button opens the panel with its steps, no console error; in Safari checked by the Design System Lead.
- Compliance audit: `audits/2026-11-14-B102-2.md` — 41 compliant, 10 non-compliant (all covered by existing tickets), 21 not in the design system; 0 fixed, 0 new; no new ticket.

**Files**
- `audits/2026-11-14-B102-2.md` (created)
- `docs/src/docs.css`, `STEPS.md` (updated)

## Step B130-3 — Journey map card rules and Projects in the side navigation
**Date:** 2026-11-14

**Decisions (made by the Design System Lead, from the findings of `audits/2026-11-05-B130-2.md`)**
- #54: journey map card titles are the phase name only, no number.
- #55: the "Touchpoints" label line (a bold label and a list of nouns, no final period) is an exception to "complete sentences", written in the `card` skill.
- #56: the journey map cards sit side by side (4 / 2 / 1 per row), an exception written in the `card` and `layout` skills.
- #57: Projects is a parent item in the side navigation, with each project and "All projects" (`#/projects`), like "All prototypes".
- Timeline on the right of a project page: one step per section (User journey, User flow, Prototype), working dates, the role of the deliverable as description; User flow and Prototype dates empty for now. TimelineStep requires dates: a new ticket "TimelineStep: optional dates" (priority high, release R2) is created in a Composant TimelineStep conversation; the timeline comes to the project page once it is done.

**What was done**
- `docs/src/pages/ProjectPage.tsx`: card titles without the number. `docs/src/structure.ts`: "All projects" item.
- `docs/src/pages/SectionPages.tsx` and `docs/src/AppShell.tsx`: a section with its own "All …" item shows the section (title, subtitle, cards without itself) and the breadcrumb stops above it — fix of #58, found by the audit of this step.
- `card`, `layout` and `navigation` skills: the exceptions and the Projects rule.
- Branch updated from `develop` (B135, R1, B102).
- Compliance audit (`ds-compliance-audit`): `audits/2026-11-14-B130-3.md` — B130-2 #54–#57 fixed; #58 found and fixed in the step (checked in the browser); no new open finding.
- Verification: type check and build pass; `#/projects`, `#/projects/ux-playground`, Overview and Governance checked in the browser.

**Files**
- `audits/2026-11-14-B130-3.md` (created)
- `docs/src/pages/ProjectPage.tsx`, `docs/src/structure.ts`, `docs/src/pages/SectionPages.tsx`, `docs/src/AppShell.tsx`, `.claude/skills/card/SKILL.md`, `.claude/skills/layout/SKILL.md`, `.claude/skills/navigation/SKILL.md`, `STEPS.md` (updated)

## Step B130-4 — UX playground user flow
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- Entry points of the playground: a Level 2 section "UX playground" of Documentation, after Projects, and an icon button `design_services` in the header, just before the search field. Both open the playground page.
- The playground opens directly on a canvas, which is a new composition, named on its first save; saved compositions are in the right panel of the canvas, a third tab "Compositions" (with Library and Properties).
- First features: frames, library, properties, tokens, annotations, save, create the prototype / add to the backlog, pan and zoom.
- User journey updated: phases 1 (Open the playground), 2 (Create a composition) and 6 (Save and share).
- The user flow is shown as a **diagram** in a "User flow" section of the project page: steps in order (Entry points, Playground page, On the canvas, Exit), boxes, labelled arrows.
- Audit finding #59: the user flow boxes in 4 / 2 / 1 columns, 8px apart, are an exception written in the `layout` skill.

**What was done**
- `projects/ux-playground/project.json`: `userFlow` (4 steps) and the 3 journey phases.
- `docs/src/projects.ts`: `FlowStep` type. `docs/src/pages/ProjectPage.tsx`: User flow section (ordered list of steps, `h3`, boxes, arrow with label). `docs/src/docs.css`: `.user-flow` styles (tokens only, same boxes as the git workflow diagram, 768 / 1024px media queries).
- `layout` skill: the user flow exception.
- Compliance audit (`ds-compliance-audit`): `audits/2026-11-14-B130-4.md` — #59 found and settled by the decision above; "Flow diagrams" (not in the design system) now counts 2 pages; no new open finding.
- Verification: type check and build pass; the project page shows the user flow on desktop and mobile with no console error.

**Files**
- `audits/2026-11-14-B130-4.md` (created)
- `projects/ux-playground/project.json`, `docs/src/projects.ts`, `docs/src/pages/ProjectPage.tsx`, `docs/src/docs.css`, `.claude/skills/layout/SKILL.md`, `STEPS.md` (updated)

## Step B139-1 — How to use skills: skills grouped by theme
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- Ticket B139 (Tooling, priority high, release R2): organize the How to use skills page by grouping the skills by theme.
- Themes, in order: Entry point (orchestrator, never-invent), Components (component, component-spec, component-guidelines, component-code, component-structure, changelog, accessibility-check), Tokens (token-naming), Pages & layout (layout, page-header, page-content, card, navigation), Prototypes (prototype-setup), Backlog & releases (backlog, ticket, release-planning, git-workflow).

**What was done**
- `docs/src/skills.ts`: `SKILL_THEMES` (the approved themes) and `skillGroups` (the skills grouped in that order; a skill without a theme goes to a last group, "Other"). `cardBody` takes the card heading level, so the body headings stay under the card title (h6 at most).
- `docs/src/pages/SkillsPage.tsx`: the Skills section shows one `section` per theme with an `h3` title; skill cards are `h4`. The "Add a skill" item says to add its theme to `SKILL_THEMES`. How to use and Hierarchy unchanged.
- `docs/src/docs.css`: `.skill-group` keeps the 16px spacing between cards; body headings (now h5/h6) keep the body text size.
- Verification: all 20 skills in one group each, 16px between cards, `#/skills/<name>` still opens and scrolls to the skill, no console error, typecheck and build pass.
- Compliance audit: `audits/2026-11-14-B139-1.md` — 42 compliant, 11 non-compliant, 21 not in the design system; 0 fixed, 1 new (#56: headings in the skill body have no text style), proposed as a new ticket.
- B139 status `done`.

**Files**
- `audits/2026-11-14-B139-1.md` (created)
- `docs/src/skills.ts`, `docs/src/pages/SkillsPage.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B138-1 — Portfolio page: experience of the Design System Lead
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- The Portfolio page shows the design experience of the Design System Lead (from the CV slides), in English, without the first name and without contact details. Title "Designing systems that scale", subtitle "Product Designer · Design Systems · AI-assisted design".
- **Exception to the `page-content` skill and the TimelineStep guidelines** (chronological order), for this page only: the steps go from the most recent to the oldest — BNP Paribas, then the mc2i internal project right below it, then Volunteer projects, then Tokywoky.
- **Exception to the `page-content` grid**: a skills panel on the left. Desktop: panel on 3 columns, cards on 6, timeline on 3.
- Content of the cards approved: BNP Paribas (Tag "Ongoing", context, sections Product Designer, Design System PO, AI-powered forms, AI-assisted design · Since summer 2026), mc2i (Jan → Dec 2024), Volunteer projects (Jul → Sep 2022), Tokywoky (Jun 2021 → May 2023, start date chosen by Claude at the Lead's request); the short descriptions of the timeline steps; section titles in the `label` style, the note in the secondary color.
- Skills panel: groups Skills, Tools, Expertise. Education: Icademie only, as a section under the experience cards, not linked to the timeline.
- No side navigation on the Portfolio page (desktop); below desktop the burger still opens "Spaces".
- The skills Tags need another color: new ticket **B141 — Tag: brand tone** (high, R2), worked in a Composant Tag conversation. Images: later (B138-2).

**What was done**
- `docs/src/pages/PortfolioPage.tsx` (new): page header, skills panel (Tag), Timeline + TimelineStep on the right, Card per job (anchor = step `href`, selection following the card at the top below the sticky header, measured space after the last card), Education (Card, `headingLevel` 3). Dates at day precision until B137 (month-year, "Present"); the ongoing job ends today.
- `docs/src/docs.css`: Portfolio block (full-width 12-column grid, sticky panel and timeline below the header, cards' scroll margin, Tags 4px apart); `.shell--single-page` hides the side navigation on desktop.
- `docs/src/AppShell.tsx`: a space that is its own only page has no side navigation (desktop) and only the "Spaces" item below desktop.
- `docs/src/pages/SectionPages.tsx`, `docs/src/App.tsx`: placeholder removed, new page wired.
- `.claude/skills/navigation/SKILL.md`, `docs/src/pages/NavigationPage.tsx`: Portfolio content and its missing side navigation.
- Verification: typecheck and build pass, no console error; columns checked at 1440px, no overflow at 1024px, timeline button and no horizontal scroll at 375px; a click on a step jumps to its card below the header.
- Compliance audit: `audits/2026-11-14-B138-1.md` — 50 compliant, 14 non-compliant, 22 not in the design system; 4 new (#56–#59), of which #57 (panel keyboard access) and #58 (note style) fixed in the step and #56 partly (Tag spacing). Open: #56 (more than 3 tags side by side → extend B141?), #59 (card sub-headings in `label` → extend B140?).
- B138 status `in-progress`; B141 created and reserved.

**Files**
- `docs/src/pages/PortfolioPage.tsx`, `audits/2026-11-14-B138-1.md` (created)
- `docs/src/docs.css`, `docs/src/AppShell.tsx`, `docs/src/App.tsx`, `docs/src/pages/SectionPages.tsx`, `docs/src/pages/NavigationPage.tsx`, `.claude/skills/navigation/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B138-2 — Portfolio page: education in the timeline, landing description
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- B138-1 merged into `develop`.
- Education: the other degrees of the CV are added (Euridis, Ipac, École Sup Paris, with Icademie), and the trainings become steps of the timeline, after the jobs, each group from the most recent to the oldest (same approved exception). Short titles (60 characters max): the degree type goes to the step description and the card ("Master's degree · 2019 – 2021"); years only: 1 Jan → 31 Dec until B137; timeline label "Experience and education".
- Landing page: the Portfolio space description becomes "Experience, skills and education".
- Finding 56 (more than 3 tags side by side): the **Tag guidelines change** (no exception) → B141 extended. Finding 59 (card sub-headings in `label`): **B140 extended** to the Portfolio cards.
- The Tag brand tone (B141) is worked in its own Composant Tag conversation.

**What was done**
- `docs/src/pages/PortfolioPage.tsx`: `education` with dates and degree; a `steps` array (jobs then trainings) drives the timeline and the selection; education cards show "<degree> · <dates>".
- `index.html`, `docs/src/structure.ts`: Portfolio description.
- `backlog/backlog.json`: B141 and B140 scope and "done when" extended.
- Verification: typecheck passes; 8 steps; a click on a training step jumps to its card below the header and selects it; landing page shows the new description; Backlog page loads.
- Compliance audit: `audits/2026-11-14-B138-2.md` — 50 compliant, 13 non-compliant, 22 not in the design system; 2 fixed (#57, #58), 1 new (#60: job and degree titles in Title Case, sentence case asked → question for the Design System Lead, B138).

**Files**
- `audits/2026-11-14-B138-2.md` (created)
- `docs/src/pages/PortfolioPage.tsx`, `docs/src/structure.ts`, `index.html`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B118-1 — Documentation site: tags use the Tag component
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- Atomic Design level of the component pages: neutral Tag, sentence case ("Atom").
- Iteration decisions of the ticket modal: "Validated" success, "Changes requested" warning, no icon.
- Levels L0–L4 of the Navigation structure page: neutral Tag.
- "Complete" stays in the stage indicator (B060), out of B118.
- B118 stays in progress: it waits for the brand tone of the Tag (B141), then chooses which tags of the site use it. B147, created as a duplicate of B141, is removed (B141 scope extended).

**What was done**
- `ds-compliance-fix` agent: hand-drawn tags replaced with `Tag` from `@ds/components` (backlog category and "Decided" already in TicketCard); `.level-tag`, `.backlog-tag`, `.nav-tree-level` removed from `docs.css`.
- Verification: typecheck and build pass; preview checked on a component page, the Navigation structure page and the B031 ticket modal; no console error.
- Compliance audit: `audits/2026-11-14-B118-1.md` — 54 compliant, 12 non-compliant, 22 not in the design system; 1 fixed (#9), 0 new; no new ticket.

**Files**
- `audits/2026-11-14-B118-1.md` (created)
- `docs/src/pages/ComponentPage.tsx`, `docs/src/pages/NavigationPage.tsx`, `docs/src/pages/TicketDialog.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B118-2 — Documentation site: tags use the Tag component, ticket closed
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- B118 is closed with the tones of B118-1 (neutral levels, success / warning iteration decisions), without waiting for the brand tone.
- Choosing which tags of the documentation site use the brand tone (e.g. the levels L0–L4 of the Navigation structure page) becomes part of B141 (scope and "done when" extended on `develop`).

**What was done**
- `backlog/backlog.json`: B118 `done`, scope updated.
- No change to the site since B118-1: the compliance audit `audits/2026-11-14-B118-1.md` stays valid.
- Branch updated from `develop`, then merged into `develop`.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B141-1 — Tag: brand tone, design approved
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- New Tag tone **`brand`** (prop `tone="brand"`, class `.ds-tag--brand`): background `background.brand-subtle`, label `text.brand`, icon `icon.brand` (5.35:1). Chosen over a solid brand background with white text.
- Design stage of the brand tone approved; next: guidelines.

**What was done**
- `spec.md`: `brand` added to the `tone` values and to the Design tokens table.
- `design/tokens.json`: variant `brand`.
- `tokens/contrast-pairs.json`: pair `icon.brand` on `background.brand-subtle` (3:1) added; `npm run tokens`: 62/62 pairs pass.
- Accessibility check (`audits/2026-11-14-B141-1-accessibility.md`): 2 pass, 0 fail. Token audit (`audits/2026-11-14-B141-1-tokens.md`): 90 values, 0 fail.
- `docs/` unchanged: the latest compliance audit (`audits/2026-11-14-B138-2.md`) still applies.
- The Tag stays `complete` 1.0 until the code of the brand tone is approved (new version then). B141 stage `guidelines`.

**Files**
- `audits/2026-11-14-B141-1-accessibility.md`, `audits/2026-11-14-B141-1-tokens.md` (created)
- `components/Tag/spec.md`, `components/Tag/design/tokens.json`, `tokens/contrast-pairs.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B141-2 — Tag: brand tone, guidelines approved
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- `brand` highlights content with no meaning of feedback (e.g. skills, keywords); `neutral` stays the default for categories; never `brand` for a status.
- Tones can be mixed in the same group of tags.
- No limit on the number of tags side by side: they wrap to the next line (replaces "at most 3"; finding 56 of `audits/2026-11-14-B138-1.md`).
- Component description: "A small label that names a category or a status, or highlights content."
- Guidelines approved; next: code.

**What was done**
- `guidelines.md`: When to use, Usage best practices, Do's and don'ts (brand pair replaces the "3 tags" pair).
- `meta.json`: description.
- Accessibility check (`audits/2026-11-14-B141-2-accessibility.md`): 3 pass, 0 fail.
- `docs/` unchanged: the latest compliance audit still applies. B141 stage `code`.

**Files**
- `audits/2026-11-14-B141-2-accessibility.md` (created)
- `components/Tag/guidelines.md`, `components/Tag/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B138-3 — Portfolio page: Tokywoky mockups
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- B138-2 merged into `develop`.
- Job titles and degree names stay in Title Case: an **approved exception** to the sentence case of the Card and TimelineStep guidelines (finding 60).
- Images go inside the cards (Card `clickable-image`). The Tokywoky mockups are recreated by Claude from the Lead's captures, as a new section of the Lead's Figma file "All project" ("Tokywoky — mockups (recreated)", editable layers, local components, Lato), then exported and shown in the Tokywoky card. Photos and brand products are replaced by colored shapes.
- The Figma connector now uses the Lead's personal account (the file is not on the BNP Paribas account).

**What was done**
- Figma (outside the repository): section "Tokywoky — mockups (recreated)" with palette, components (16 icons, Button 4 variants, round icon button, side menu, mobile tab bar 5 variants, text field, notification item, product tile) and 6 screens (desktop: Product testing — Apply to test, Homepage; mobile: Notifications, Edit profile, Routines — Product tag, Homepage).
- `assets/portfolio/tokywoky/*.png` (new): the 6 screens exported from Figma (desktop 1440 px, mobile 2x).
- `docs/src/pages/PortfolioPage.tsx`: optional `images` per experience; the Tokywoky card uses `clickable-image` with alt texts; the other cards stay `default`.
- `backlog/backlog.json`: B138 scope ("cards with images where mockups exist").
- Verification: typecheck passes; the 6 thumbnails load (1440 / 750 px), a click opens the ImageViewer with the right image, Escape closes it; no console error.
- Compliance audit: `audits/2026-11-14-B138-3.md` — 52 compliant, 12 non-compliant, 22 not in the design system; #60 resolved by approval; no new finding. Remark: portrait mockups are cropped to 16:9 in the thumbnails (per the Card spec).

**Files**
- `assets/portfolio/tokywoky/` (6 PNG), `audits/2026-11-14-B138-3.md` (created)
- `docs/src/pages/PortfolioPage.tsx`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B138-4 — Portfolio page: BNP Paribas diagrams, data visualization, credit chain
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- B138-3 merged into `develop`.
- Two BNP Paribas workshop diagrams are added to the BNP Paribas card (workspace and settings map; user flow of a data table page). Publishing them is the Lead's decision.
- New section "Data visualization": dashboards and charts for a reporting application linked to My Credit App.
- Context of the card: a cross-functional UX team at BNP Paribas CIB, working across the credit chain; timeline step description "Cross-functional UX team, credit chain."

**What was done**
- `assets/portfolio/bnp-paribas/workspace-map.webp`, `table-user-flow.webp` (new): images given by the Lead.
- `docs/src/pages/PortfolioPage.tsx`: BNP Paribas card in `clickable-image` with alt texts; "Data visualization" section; context and timeline description.
- Verification: typecheck passes; the 2 thumbnails load (2000 px), no console error.
- Compliance audit: `audits/2026-11-14-B138-4.md` — 56 compliant, 11 non-compliant, 22 not in the design system; #9 fixed (B118, from `develop`), no new finding. Remarks: diagrams cropped to 16:9 in the thumbnails; dense images may need a longer text alternative (guideline question).

**Files**
- `assets/portfolio/bnp-paribas/` (2 images), `audits/2026-11-14-B138-4.md` (created)
- `docs/src/pages/PortfolioPage.tsx`, `STEPS.md` (updated)

## Step B141-3 — Tag: brand tone, code approved (Tag 1.1)
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- Code of the brand tone approved; the `code` icon stays on the "React" tag of the "With an icon" example.
- Tag version 1.1 (addition).

**What was done**
- `Tag.tsx`: `"brand"` added to `TagTone`; prop and component comments updated.
- `Tag.css`: `.ds-tag--brand` (`--color-background-brand-subtle`, `--color-text-brand`, `--color-icon-brand`).
- `examples.tsx`: brand "React" in Tones and With an icon; Side by side describes the no-limit rule and shows mixed tones wrapping.
- `playground.tsx`: `brand` in the Tone control.
- `meta.json`: version 1.1 with its changelog entry.
- Verification: `tsc` and `npm run build` pass; computed colors checked (5.35:1); wrapping and ellipsis checked at 375px; no console error.
- Accessibility check (`audits/2026-11-14-B141-3-accessibility.md`): 5 pass, 0 fail. Token audit (`audits/2026-11-14-B141-3-tokens.md`): 30 values, 0 fail.
- `docs/` unchanged: the latest compliance audit still applies.

**Files**
- `audits/2026-11-14-B141-3-accessibility.md`, `audits/2026-11-14-B141-3-tokens.md` (created)
- `components/Tag/Tag.tsx`, `components/Tag/Tag.css`, `components/Tag/examples.tsx`, `components/Tag/playground.tsx`, `components/Tag/meta.json`, `STEPS.md` (updated)

## Step B138-5 — Portfolio page: personal design system project, governance, mc2i
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- B138-4 merged into `develop`.
- New first step and card: **"Design system built with AI — Personal project"** (16 Oct 2026 → today, "Ongoing"): design system without Figma, 20 Claude skills, 4 agents, full process; 4 captures of the documentation site (landing page, Card component page, Backlog, How to use skills).
- BNP Paribas card: the Lead is a consultant employed by mc2i, on assignment at BNP Paribas CIB (context sentence); design system governance process item and the Lead's governance flowchart (3rd image); Design System PO: "Integration tests" removed, "UI review of what has been developed, against the design" and "Breaking down epics into user stories" added.

**What was done**
- `assets/portfolio/bnp-paribas/governance-process.webp` (image given by the Lead), `assets/portfolio/build-design-system/*.png` (4 captures of the local site at 1440 × 900, headless Chrome).
- `docs/src/pages/PortfolioPage.tsx`: new experience first (timeline 9 steps), BNP Paribas images, context and items.
- Verification: typecheck passes; the new card, its "Ongoing" Tag and its 4 thumbnails load; 3 BNP thumbnails load; no console error.
- Compliance audit: `audits/2026-11-14-B138-5.md` — 58 compliant, 11 non-compliant, 22 not in the design system; no new finding. Remarks: thumbnails cropped to 16:9, dense flowchart, PNG captures heavier than WebP.

**Files**
- `assets/portfolio/bnp-paribas/governance-process.webp`, `assets/portfolio/build-design-system/` (4 captures), `audits/2026-11-14-B138-5.md` (created)
- `docs/src/pages/PortfolioPage.tsx`, `STEPS.md` (updated)

## Step B138-6 — Portfolio page: AI team organization at BNP Paribas
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- B138-5 merged into `develop`.
- In the "AI-assisted design" section of the BNP Paribas card: the team organization set up around the AI tools (an owner per domain, GitHub as the source of truth for the UX and development docs, a branch and pull request workflow with Claude, linked to the Jira tickets), and the Lead's team workflow diagram (4th image, already anonymized).

**What was done**
- `assets/portfolio/bnp-paribas/ai-team-workflow.webp` (image given by the Lead).
- `docs/src/pages/PortfolioPage.tsx`: new item and image with its alt text.
- Verification: typecheck passes; the 4 BNP thumbnails load; no console error.
- Compliance audit: `audits/2026-11-14-B138-6.md` — 58 compliant, 11 non-compliant, 22 not in the design system; no new finding.

**Files**
- `assets/portfolio/bnp-paribas/ai-team-workflow.webp`, `audits/2026-11-14-B138-6.md` (created)
- `docs/src/pages/PortfolioPage.tsx`, `STEPS.md` (updated)

## Step B141-4 — Portfolio page: skills in the brand Tag tone
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- The skills, tools and expertise of the Portfolio page use the Tag `brand` tone. Rendering validated.

**What was done**
- `PortfolioPage.tsx`: `<Tag>` → `<Tag tone="brand">` for the 22 skills tags (the "Ongoing" tag stays `info`). Checked in the browser: 22 brand tags on the `background.subtle` panel, no console error.
- Compliance audit (`audits/2026-11-14-B141-4.md`): 59 compliant, 10 non-compliant (all covered by existing tickets), 22 not in the design system; finding 56 fixed; no new ticket.

**Files**
- `audits/2026-11-14-B141-4.md` (created)
## Step B138-7 — Portfolio page: anonymized BNP Paribas mockups
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- B138-6 merged into `develop`.
- Mockups exported as SVG by the Lead are anonymized by Claude and added to the BNP Paribas card: "Dashboard — Pending signatures" and "Prototype" (AI data extraction). "Request_Greenlight" is anonymized too but kept in Figma only, not in the portfolio.
- Anonymization of an SVG: MyCreditApp logo → neutral "Logo" block; BNP Paribas colors → design system colors (header → brand, green and gold actions → brand, teal and purple → info, tags → warning / success); outlined text → one lorem ipsum line per text line, same position and size, not distorted (the first version, squeezed to the original width, was blurry).
- Each anonymized mockup is also imported into the Figma file "All project" (editable vectors).

**What was done**
- `assets/portfolio/bnp-paribas/dashboard-pending-signatures.svg`, `ai-data-extraction.svg` (new, anonymized; the anonymizer script stays outside the repository).
- `docs/src/pages/PortfolioPage.tsx`: 2 images with alt texts in the BNP Paribas card (6 images).
- Verification: typecheck passes; the 6 BNP thumbnails load; no console error; each SVG checked visually and only design system colors left.
- Compliance audit: `audits/2026-11-14-B138-7.md` — 58 compliant, 11 non-compliant, 22 not in the design system; no new finding. Remarks: dashboard SVG heavy (654 KB, outlined text); lorem text of the AI mockup in the system font when Open Sans is not installed; near-square dashboard cropped in its thumbnail.

**Files**
- `assets/portfolio/bnp-paribas/dashboard-pending-signatures.svg`, `ai-data-extraction.svg`, `audits/2026-11-14-B138-7.md` (created)
- `docs/src/pages/PortfolioPage.tsx`, `STEPS.md` (updated)

## Step B141-5 — Tag: brand level tag, 16px between tags; ticket closed
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- The Atomic Design level of the component pages uses the Tag `brand` tone (the L0–L4 tags of the Navigation structure page stay `neutral`).
- Tag guidelines: a category is `neutral` by default, `brand` when it is highlighted (e.g. the level of a component in its page header) — replaces "always neutral".
- Spacing between tags side by side: `--space-16`, in both directions (between the lines when they wrap too). Applied to TicketCard.
- Tag 1.2 and TicketCard 1.1.

**What was done**
- `ComponentPage.tsx`: level Tag `tone="brand"` (comment updated).
- Tag: `guidelines.md` (category rule, spacing), `examples.tsx` (gap `--space-16`), `meta.json` 1.2.
- TicketCard: `TicketCard.css`, `spec.md`, `design/tokens.json` (tags row gap `--space-16`), `meta.json` 1.1.
- `docs.css`: `.portfolio-tags` gap `--space-16`.
- Verification: type check passes; computed gap 16px on the Portfolio and Backlog pages; Backlog at 320px: no overflow, no horizontal scroll; no console error.
- Token audit (`audits/2026-11-14-B141-5-tokens.md`): 105 values, 0 fail. Accessibility check (`audits/2026-11-14-B141-5-accessibility.md`): 3 pass, 0 fail.
- Compliance audit (`audits/2026-11-14-B141-5.md`): 59 compliant, 10 non-compliant (existing tickets), 22 not in the design system; 0 new; question added for the stage indicator spacing (B060). No new ticket.
- B141 status `done`.

**Files**
- `audits/2026-11-14-B141-5.md`, `audits/2026-11-14-B141-5-tokens.md`, `audits/2026-11-14-B141-5-accessibility.md` (created)
- `docs/src/pages/ComponentPage.tsx`, `docs/src/docs.css`, `components/Tag/guidelines.md`, `components/Tag/examples.tsx`, `components/Tag/meta.json`, `components/TicketCard/TicketCard.css`, `components/TicketCard/spec.md`, `components/TicketCard/design/tokens.json`, `components/TicketCard/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B138-8 — Portfolio page: ticket closed
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- B138-7 merged into `develop`. B138 is finished: the Portfolio page shows the personal project, the experience (BNP Paribas, mc2i, volunteer projects, Tokywoky) and the education on a timeline with cards, the skills panel (brand Tag tone, B141-4) and the mockups and diagrams; the BNP Paribas mockups are anonymized.

**What was done**
- `backlog/backlog.json`: B138 `done`. Branch `governance/portfolio-page` merged into `develop` and deleted.
- No change to the documentation site: no compliance audit for this step (last report: `audits/2026-11-14-B138-7.md`).

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B148-1 — Portfolio page: Figma and GitHub links, languages
**Date:** 2026-11-14

**Decisions (made by the Design System Lead)**
- New ticket **B148** (high, R2) after B138 was closed.
- Two link buttons on the subtitle line of the Portfolio page, aligned right: "Open the Figma file" (the whole file All project) and "Open GitHub repository" (`CapucineDjs/BuildDesignSystem`, private for now; it will be made public and moved to another account later, the link will be updated then). Brown buttons (Button `primary`) with the `open_in_new` icon, opening in a new tab (the Link guidelines exception: the icon and the accessible name say it).
- A "Languages" group in the skills panel: French, English (professional).

**What was done**
- `docs/src/pages/PortfolioPage.tsx`: the page header is written inline (title, then a row with the subtitle and the two buttons); "Languages" in the skills data.
- `docs/src/docs.css`: `.portfolio-lead-row` (subtitle and buttons on one line, wrapping below on small screens; the subtitle keeps the one-line + ellipsis rule), `.portfolio-links`.
- `backlog/backlog.json`: B148 reserved, then `done`.
- Verification: typecheck passes; at 1024px the subtitle and the buttons share one line, buttons right-aligned; at 375px the subtitle is cut with an ellipsis, the buttons go below, no horizontal scroll; `target="_blank"`, accessible names "…, in a new tab".
- Compliance audit: `audits/2026-11-14-B148-1.md` — 61 compliant, 10 non-compliant, 22 not in the design system; #56 fixed (B141 Tag guidelines); #61 (subtitle ellipsis) and #62 (label in name) found and fixed in the step.

**Files**
- `audits/2026-11-14-B148-1.md` (created)
- `docs/src/pages/PortfolioPage.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B148-2 — Portfolio page: French (native)
**Date:** 2026-11-15

**Decisions (made by the Design System Lead)**
- B148-1 merged into `develop`. In the Languages group, French gets its level: "French (native)".

**What was done**
- `docs/src/pages/PortfolioPage.tsx`: Languages tag "French (native)".
- Verification: typecheck passes; the Languages group shows "French (native)" and "English (professional)".
- Compliance audit: `audits/2026-11-15-B148-2.md` — 61 compliant, 10 non-compliant, 22 not in the design system; no change.

**Files**
- `audits/2026-11-15-B148-2.md` (created)
- `docs/src/pages/PortfolioPage.tsx`, `STEPS.md` (updated)

## Step B149-1 — Repository moved to the new GitHub account
**Date:** 2026-11-15

**Decisions (made by the Design System Lead)**
- New ticket **B149** (high, R2): the repository moves from `CapucineDjs/BuildDesignSystem` (private) to **`desjouiscapucine-source/BuildDesignSystem` (public)**, an empty repository created by the Lead; `CapucineDjs` invited as a collaborator (push).
- No token pasted in the chat: access through the collaborator invitation.

**What was done**
- History scanned before going public: all 309 commits use the GitHub noreply address; no real name, client ID, phone number or personal email in any version of any file.
- Every branch (8) and the tag R1 pushed to the new repository, full history; refs compared: identical.
- `origin` of the project now points to the new repository: one setting shared by the root folder, `BuildDesignSystem-main` and every worktree (the other conversations push there at their next commit).
- `CLAUDE.md`: the public repository and its move; `docs/src/pages/PortfolioPage.tsx`: the "Open GitHub repository" button points to the new repository. No skill or other page named the repository.
- `backlog/backlog.json`: B149 reserved, then `done`.
- Compliance audit: `audits/2026-11-15-B149-1.md` — 61 compliant, 10 non-compliant, 22 not in the design system; no change.
- Left to the Lead on GitHub (admin of the new account): default branch → `main` (GitHub chose `component/Select`, the first branch pushed); archive or delete the old repository.

**Files**
- `audits/2026-11-15-B149-1.md` (created)
- `CLAUDE.md`, `docs/src/pages/PortfolioPage.tsx`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step R2-1 — Release R2
**Date:** 2026-11-15

**Decisions (made by the Design System Lead)**
- Release R2 made on 2026-11-15, ahead of its planned date (Fri 2026-11-20); release validated after the review.
- B132 extended with findings 64 (search field border pair `border.strong` / `background.brand-subtle`) and 65 (accessible name of the Portfolio skills panel); B140 extended with the h4 headings of the Agents cards (finding 63).

**What was done**
- Review of `origin/main..origin/develop`: 50 commits, 68 files; 9 of the 23 R2 tickets done (B084 delivered early in R1).
- Release note `releases/R2.md`: B141 Tag brand tone; B102; B118, B139, B138, B148, B147, B149; Tag 1.2, TicketCard 1.1; 14 tickets carried over to R3 (B055 and B057 from R1).
- Token audit of every component: `audits/2026-11-15-R2-tokens.md` — 17 components, 0 failures, not blocking.
- Compliance audit: `audits/2026-11-15-R2.md` — 61 compliant, 13 non-compliant (new: 64, 65; 63 re-listed), 22 not in the design system; no new ticket.
- `develop` merged into `main`, tag `R2`.

**Files**
- `releases/R2.md`, `audits/2026-11-15-R2.md`, `audits/2026-11-15-R2-tokens.md` (created)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B150-1 — Public site on Netlify
**Date:** 2026-11-15

**Decisions (made by the Design System Lead)**
- The site is made public on Netlify (kept over GitHub Pages, even with the public repository), the whole site (`/docs/` and `/prototypes/`), deployed from `main` (released work only). B150: Tooling, priority high, release R2.
- The Netlify account and its link to the repository are created by the Design System Lead.
- The subtitle of the landing page ("Local workspace for the design system.") will change; the new text is still to give.

**What was done**
- `netlify.toml`: build command `npm run build`, publish folder `dist`, Node 24.
- Online the site is read-only (no `/api/*` routes): checked on the built site (`vite preview`) — the Backlog page shows its read-only message, the Branches page says it needs `npm run dev`, the work-time clock is hidden; landing page, Portfolio, documentation and the WorkDescription prototype show with no console error.
- `.claude/launch.json`: `public-site` configuration (`vite preview`, port 4173) to check the built site.
- Compliance audit: `audits/2026-11-15-B150-1.md` — 61 compliant, 13 non-compliant, 22 not in the design system; no change, no new ticket.

**Files**
- `netlify.toml`, `audits/2026-11-15-B150-1.md` (created)
- `.claude/launch.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B150-2 — Public site online, B150 done
**Date:** 2026-11-15

**What was done**
- The Design System Lead created the Netlify site, connected to the repository and deployed from `main`: https://builddesignsystem.netlify.app
- Checked online: landing page, Portfolio, documentation and the WorkDescription prototype show; the only console errors are the expected 404s of `/api/work-time` (local dev server only; the clock is hidden online).
- `netlify.toml` reaches `main` with release R3; until then the same settings are set in the Netlify UI.
- `backlog/backlog.json`: B150 `done`.

**Files**
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B151-1 — Public site: landing page and Design system wording
**Date:** 2026-11-15

**Decisions (made by the Design System Lead)**
- Landing page: subtitle "A design system built with AI, from tokens to code." and an introduction text ("BuildDesignSystem is a design system built without Figma…"); the Documentation card renamed Design system.
- The Documentation space is renamed **Design system** everywhere on the site.
- Overview: new Description — the design system of BuildDesignSystem, the project that built this site.
- Every text mentioning `npm run dev` is removed: no message on the Backlog page and in the Design preview tab; Branches page: "Read live from git." and "Not available online.".
- B151: Tooling, priority high, release R3.

**What was done**
- `index.html`: subtitle, introduction paragraph, Design system card. `docs/index.html`: tab title "Design system — BuildDesignSystem".
- `docs/src/structure.ts` (space label, Overview description), `App.tsx` (comment), `pages/NavigationPage.tsx`, `pages/PortfolioPage.tsx` (image alt): Design system.
- `pages/SectionPages.tsx`: Overview Description.
- `backlog.ts`, `pages/BacklogPage.tsx`, `DesignPreview.tsx`, `pages/BranchesPage.tsx`: `npm run dev` messages removed.
- `.claude/skills/navigation/SKILL.md`: the structure, Level 0 and breadcrumb rules say Design system.
- Checked on the dev server and on the built site (`vite preview`): no text mentions `npm run dev`.
- Compliance audit: `audits/2026-11-15-B151-1.md` — 62 compliant, 14 non-compliant (new: #66, no feedback when a change cannot be saved; #44 one new occurrence), 22 not in the design system.
- `backlog/backlog.json`: B151 `done`.

**Files**
- `audits/2026-11-15-B151-1.md` (created)
- `index.html`, `docs/index.html`, `docs/src/structure.ts`, `docs/src/App.tsx`, `docs/src/backlog.ts`, `docs/src/DesignPreview.tsx`, `docs/src/pages/SectionPages.tsx`, `docs/src/pages/NavigationPage.tsx`, `docs/src/pages/PortfolioPage.tsx`, `docs/src/pages/BacklogPage.tsx`, `docs/src/pages/BranchesPage.tsx`, `.claude/skills/navigation/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B152-1 — Public site: frozen work time and read-only tickets
**Date:** 2026-11-15

**Decisions (made by the Design System Lead)**
- Online, the time spent building is shown as a frozen total, saved in the repository and updated on release day; locally the clock keeps ticking.
- Online, the ticket menus are disabled (Select `disabled`) until the read-only TicketCard variant (B153, reserved on `component/TicketCard`, priority high, no release yet).
- B152: Tooling, priority high, release R3; an early release R3 follows, run from the Gouvernance conversation.

**What was done**
- `scripts/work-time.ts`: the work-time calculation, moved out of `vite.config.ts` (which now imports it); `scripts/save-work-time.ts` + `npm run work-time`: saves the total in `docs/src/work-time.json` (69,508 s today).
- `home.ts` and `docs/src/AppShell.tsx`: without `/api/work-time`, the clock shows the saved total, frozen.
- `docs/src/backlog.ts` (`readOnly` when `/api/backlog` is missing) and `docs/src/pages/BacklogPage.tsx`: the menus of the cards and of the ticket modal are disabled online.
- `.claude/skills/git-workflow/SKILL.md`, section 8: `npm run work-time` on release day.
- Checked on the built site (`vite preview`): frozen clock on the landing page and in the header, disabled menus; on the dev server: live clock, menus enabled.
- Compliance audit: `audits/2026-11-15-B152-1.md` — 61 compliant, 15 non-compliant (new: #67, disabled Selects online until B153; #66 partly fixed), 22 not in the design system.
- `backlog/backlog.json`: B152 `done`.

**Files**
- `scripts/work-time.ts`, `scripts/save-work-time.ts`, `docs/src/work-time.json`, `audits/2026-11-15-B152-1.md` (created)
- `vite.config.ts`, `package.json`, `home.ts`, `docs/src/AppShell.tsx`, `docs/src/backlog.ts`, `docs/src/pages/BacklogPage.tsx`, `.claude/skills/git-workflow/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B152-2 — Audit decisions: exception for finding 67, ticket B154
**Date:** 2026-11-15

**Decisions (made by the Design System Lead)**
- Compliance audit finding 67 (ticket menus shown as disabled Selects on the public site) is **accepted as an exception** until the read-only TicketCard variant (B153).
- Finding 66 gets its own ticket: **B154** "Documentation site: feedback when a change cannot be saved" (`todo`, origin `proposal`, priority high, release R3); its decisions are asked when it is worked on.

**Files**
- `audits/2026-11-15-B152-1.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B154-1 — Documentation site: feedback when a change cannot be saved
**Date:** 2026-11-15

**Decisions (made by the Design System Lead)**
- Locally, a ticket change that cannot be saved shows "Could not save the change. Try again." above the board; the ticket keeps its old value (TicketCard guidelines).
- Online, the Design preview token pickers are disabled and nothing is saved (same exception as audit finding 67, until B153).
- Locally, a backlog that cannot be read: menus disabled, no message (as online).
- B154 finished before the early release R3.

**What was done**
- `docs/src/pages/BacklogPage.tsx`: error message on a failed local save.
- `docs/src/DesignPreview.tsx`: pickers disabled online (`import.meta.env.DEV`), no save online (the Content field stays editable, not saved); the same message on a failed local save.
- Checked on the dev server with a simulated failed save: message shown (`role="alert"`), value kept, nothing saved. During a first test the simulation did not apply: B008 was saved `in-progress` in `develop` by the Backlog page, then set back to `todo` the same way (two automatic `Backlog: B008` commits).
- Compliance audit: `audits/2026-11-15-B154-1.md` — 60 compliant, 15 non-compliant (#66 fixed; new: #68, Design preview save message not announced; #67 extended to the Design preview pickers), 22 not in the design system.
- `backlog/backlog.json`: B154 `done`.

**Files**
- `audits/2026-11-15-B154-1.md` (created)
- `docs/src/pages/BacklogPage.tsx`, `docs/src/DesignPreview.tsx`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B155-1 — Design preview: announced save message
**Date:** 2026-11-15

**Decisions (made by the Design System Lead)**
- The error "Could not save the change. Try again." is an alert (`role="alert"`) in the same style as the Backlog error; "Saved to design/tokens.json" is a status (`role="status"`), in secondary text.
- After a failed save, the token picker goes back to the saved value.
- B155 finished before the early release R3.

**What was done**
- `docs/src/DesignPreview.tsx`: save message by kind (saved / error), a persistent `role="status"` region, the error in `.backlog-error` with `role="alert"`, `save` returns whether it saved and `setSlot` restores the saved design on a failure.
- Checked on the dev server with Breadcrumb set to the design stage on the local copy only (restored after) and a simulated failed save: alert shown, picker back to the saved token, nothing saved.
- Compliance audit: `audits/2026-11-15-B155-1.md` — 61 compliant, 14 non-compliant (#68 fixed, no new finding), 22 not in the design system.
- `backlog/backlog.json`: B155 `done`.

**Files**
- `audits/2026-11-15-B155-1.md` (created)
- `docs/src/DesignPreview.tsx`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step R3-1 — Release R3
**Date:** 2026-11-15

**Decisions (made by the Design System Lead)**
- Release R3 made on 2026-11-15, ahead of its planned date (Fri 2026-12-04), so that B151, B152, B154 and B155 reach the public site; release validated after the review.
- **Exception**: the release was run from the conversation of the public site work, not from the Gouvernance conversation (git-workflow, section 8), at the Design System Lead's request.

**What was done**
- Review of `origin/main..origin/develop`: 19 commits, 29 files; no change in `components/` or `tokens/`. Tickets delivered: B150 (carried over from R2), B151, B152, B154, B155.
- Release note `releases/R3.md`: delivered tickets; no component version; tickets carried over to R4.
- `npm run work-time`: `docs/src/work-time.json` — 72,400 s (20:06:40), shown frozen on the public site.
- Token audit of every component: `audits/2026-11-15-R3-tokens.md` — 17 components, 0 failures, not blocking.
- Compliance audit: `audits/2026-11-15-R3.md` — 61 compliant, 14 non-compliant (no new finding; #66 and #68 fixed during the cycle, #67 accepted exception), 22 not in the design system; no new ticket.
- `develop` merged into `main`, tag `R3`; Netlify deploys `main` to https://builddesignsystem.netlify.app

**Files**
- `releases/R3.md`, `audits/2026-11-15-R3.md`, `audits/2026-11-15-R3-tokens.md` (created)
- `docs/src/work-time.json`, `STEPS.md` (updated)

## Step B156-1 — All rights reserved license
**Date:** 2026-11-15

**Decisions (made by the Design System Lead)**
- New ticket **B156** (high, no release): GitHub cannot turn off the ZIP download of a public repository, so the repository stays public with an explicit **All rights reserved** license (option chosen over making the repository private, so the GitHub link of the Portfolio page and the CV keeps working).
- License text validated, with the Lead's email as contact.

**What was done**
- `LICENSE` at the root: copyright Capucine Desjouis 2026, all rights reserved; the content may be viewed, not copied, modified, distributed or reused without written permission.
- `package.json`: `"license": "SEE LICENSE IN LICENSE"`.
- `backlog/backlog.json`: B156 reserved, then `done`.
- Compliance audit: `audits/2026-11-15-B156-1.md` — 61 compliant, 14 non-compliant, 22 not in the design system; no change, no new ticket.

**Files**
- `LICENSE`, `audits/2026-11-15-B156-1.md` (created)
- `package.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B158-1 — One conversation per release ticket
**Date:** 2026-11-19

**Decisions (made by the Design System Lead)**
- New ticket **B158** (high, R4): when the tickets of a release are worked on, Claude prepares one suggestion (task chip) per component or prototype ticket, which opens its own conversation already set up, instead of taking the tickets one after another in the same conversation. First reserved as B157, renumbered: B157 was taken meanwhile by `component/Tabs` (Tab).
- Tried first on the tickets of R2 not done yet: 8 chips (TextInput, Tabs, Canvas, Frame, Panel, StickyNote, Comment, SearchField), all started by the Design System Lead.

**What was done**
- `.claude/skills/git-workflow/SKILL.md`, section 2: rule "Working on the tickets of a release" — one chip per component or prototype ticket of the release not done yet; the opened conversation names itself `Composant <Name>`, sets up its branch and reserves its ticket (section 3), reads the ticket and starts the current stage, in French; self-contained chip prompt (ticket, release, branch, steps, related tickets); governance tickets stay in the Gouvernance conversation; Claude can only suggest, the Design System Lead clicks each chip.
- `backlog/backlog.json`: B158 reserved, then `done`.
- Compliance audit: `audits/2026-11-19-B158-1.md` — 61 compliant, 14 non-compliant, 22 not in the design system; no change, no new ticket.

**Files**
- `audits/2026-11-19-B158-1.md` (created)
- `.claude/skills/git-workflow/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B157-1 — Tab: design approved
**Date:** 2026-11-19

**Decisions (made by the Design System Lead)**
- B093 Tabs started (branch `component/Tabs`). Split into a building block, **Tab**, built first (new ticket **B157**, high, R2), in this same conversation; then **Tabs**.
- **Tab**: atom, class `.ds-tab`, description "One tab of a tab list, that shows one panel of the page.", one type (underline), one size, text label only (no icon, no counter).
- Label: `body`, `--color-text-secondary`; selected: `label` style (semibold), `--color-text-brand`, selection indicator `--border-width-2` in `--color-border-focus` (as the current tabs of the site).
- Padding `--space-8` top and bottom, `--space-16` left and right.
- States: hover, focus (ring `--color-border-focus` + focus state layer) and pressed with state layers, top corners `--radius-4`; disabled = label in `--color-text-disabled`, not focusable. Selected + disabled is forbidden.
- Long label: one line, the tab grows; lack of space is handled by Tabs.
- Design approved; next stage: guidelines.

**What was done**
- `components/Tab/` created from the template: `meta.json` (status `guidelines`), `spec.md`, design preview (`design/Preview.tsx`, `design/tokens.json`, variants `default` and `selected`, disabled state).
- Accessibility check: `audits/2026-11-19-B157-1-accessibility.md` — 5 pass, 0 fail, 1 not applicable; note: the label on the pressed state layer is 3.97:1 / 4.33:1 (shared state layer value, not a checklist criterion).
- Token audit: `audits/2026-11-19-B157-1-tokens.md` — 39 values, 0 failures.
- Backlog: B093 in progress; B157 added (reserved first), stage `guidelines`.

**Files**
- `components/Tab/meta.json`, `spec.md`, `guidelines.md` (template), `design/Preview.tsx`, `design/tokens.json` (new)
- `audits/2026-11-19-B157-1-accessibility.md`, `audits/2026-11-19-B157-1-tokens.md` (new)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B143-1 — Frame: design approved
**Date:** 2026-11-19

**Decisions (made by the Design System Lead)**
- Component **Frame**: molecule, folder `components/Frame/`, class `.ds-frame`, description "A layout frame on the canvas, in mobile, tablet or desktop size."; one type.
- Props: `size` (`mobile` default, `tablet`, `desktop`), `selected`, `empty`, `name`.
- Sizes: mobile 375 × 812, tablet **768 × 1024** (new tokens `size.viewport-tablet` / `size.viewport-tablet-height`), desktop 1280 × 800.
- Anatomy: name (`label`, `text.primary`) and size label (`body-sm`, `text.secondary`) above the frame, `space.8` apart and `space.8` from the frame; container on `background.page`, 1px `border.subtle`, `radius.8`, `shadow.frame`; device bar (status bar on mobile and tablet, browser bar on desktop) on `background.page` with a `border.subtle` line, `label-sm` + `text.primary`, `icon-size.16`, padding `space.8` / `space.16`, items `space.8` apart, status icons `space.4` apart, desktop address field `background.subtle` + `radius.16`.
- Content: long name cut with an ellipsis at the frame width; the content scrolls inside the frame; empty = `add_box` (`icon-size.32`) + "Drop components here" (`body`, `text.secondary`), gap `space.8`, padding `space.16`.
- States: hover = `border.strong` + `state-layer.hover`; focus = 2px `border.focus` outline offset `space.4` + `state-layer.focus`; selected = 2px `border.focus` outline on the frame; focus and selected show together.
- Contrast pairs added: `border.focus` / `background.subtle` and `border.strong` / `background.subtle` (min 3).

**What was done**
- `components/Frame/` from the template: `meta.json`, `spec.md`, design preview (`design/Preview.tsx`, `design/tokens.json`).
- Accessibility check: `audits/2026-11-19-B143-1-accessibility.md` — 3 failures at first (two missing contrast pairs, no state layers), fixed with the Lead's decisions; 0 failure, no exception.
- Token audit: `audits/2026-11-19-B143-1-tokens.md` — 241 values, 0 failure.
- Design approved: `meta.json` status and the B143 `stage` set to `guidelines`.
- Compliance audit: `audits/2026-11-19-B143-1.md` — 61 compliant, 15 non-compliant (1 new: #68, the site's simulated tablet screen should use the new `size.viewport-tablet*` tokens), 22 not in the design system.
- Open question: the canvas background is decided by Canvas (B142); the label contrast is checked again then.

**Files**
- `components/Frame/` (created), `audits/2026-11-19-B143-1.md`, `audits/2026-11-19-B143-1-accessibility.md`, `audits/2026-11-19-B143-1-tokens.md` (created)
- `tokens/semantic.json`, `tokens/contrast-pairs.json`, `.claude/skills/token-naming/SKILL.md` (size table), `backlog/backlog.json`, `STEPS.md` (updated)

## Step B146-1 — Comment: first design decisions (draft spec)
**Date:** 2026-11-19

**Decisions (made by the Design System Lead)**
- B146 Comment started on `component/Comment`; level **organism**.
- Type: a **marker** placed on a component or a frame of the canvas, which opens a **bubble** with the comment thread. The marker is the Avatar of the author of the first message.
- Content of each message: author (initials in an avatar + name), date and time, text; replies form a thread.
- Actions: Reply, Resolve, Edit / delete a message, Close.
- Component-specific states: open / closed, selected, resolved, editing (in addition to hover, focus, pressed).
- Text field: its place is defined in the design; the component (Textarea B020 or Text input B019) is chosen at the Code stage.
- Building blocks, built first through all their stages: new tickets **B159 Avatar** (atom) and **B160 CommentMessage** (molecule), both high priority, release R2 (proposals approved by the Design System Lead).
- Name `Comment`, class `.ds-comment` and the description are proposals, still to confirm (open question of the spec).

**What was done**
- `components/Comment/meta.json` (status `design`, version 0.0) and a draft `components/Comment/spec.md` with the approved decisions only; everything else under "Not decided yet" or Open questions. No design preview yet: its look waits for Avatar and CommentMessage.
- `backlog/backlog.json`: B146 `in-progress`; B159 and B160 created (`todo`, `origin: proposal`).
- `develop` merged into `component/Comment` (backlog conflict: both sides kept).
- Compliance audit: `audits/2026-11-19-B146-1.md` — 61 compliant, 15 non-compliant (#68 already reported by B143-1), 22 not in the design system; no new ticket.

**Files**
- `components/Comment/meta.json`, `components/Comment/spec.md`, `audits/2026-11-19-B146-1.md` (created)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B144-1 — Panel: design approved
**Date:** 2026-11-19

**Decisions (made by the Design System Lead)**
- **Identity**: `Panel`, folder `components/Panel/`, class `ds-panel`, level **organism**, description "Right panel of the UX playground: Library, Properties and Compositions tabs."
- **Specific to the playground** (B130): three fixed tabs, Library, Properties and Compositions, built with the **Tabs** component (B093). The spec is approved with a placeholder for the tabs; Tabs must be complete before the Panel code.
- **Behavior**: fixed on the right, full height, over the canvas; collapsible; resizable.
- **Look**: background `color.background.surface`, shadow `shadow.panel`, no border.
- **Width**: new tokens `size.panel` (320px, default), `size.panel-min` (280px), `size.panel-max` (480px).
- **Header**: tabs + collapse IconButton `tertiary`, icon `right_panel_close`; padding `space.8` top and right, `space.24` left.
- **Tab content**: padding `space.16`, `space.24` on the left (clear of the resize handle); scrolls when long.
- **Resize handle**: `drag_indicator` icon (`color.icon.secondary`, `icon-size.20`), always visible, inside the panel against its left edge; hit area new token `size.resize-handle` (24px, WCAG 2.5.8), corners `radius.4`; state layers on hover and while dragging; focusable, focus outline `color.border.focus` `border-width.2` drawn inside the hit area; left / right arrow keys change the width; double-click resets it to `size.panel`.
- **Collapsed** (prop `collapsed`, default `false`): narrow strip of three IconButton `tertiary` — Library `widgets`, Properties `tune`, Compositions `dashboard` — padding and gap `space.8`; a click reopens the panel on that tab.
- **Animation**: `duration.200`, `easing.ease-out`.
- Stage 1 (Design) approved; status `guidelines`.

**What was done**
- `components/Panel/` created from the template: `meta.json`, `spec.md`, design preview (`design/Preview.tsx`, `design/tokens.json`, variants `expanded` / `collapsed`).
- `tokens/semantic.json`: `size.panel`, `size.panel-min`, `size.panel-max`, `size.resize-handle`; added to the size table of the `token-naming` skill.
- `tokens/contrast-pairs.json`: `color.icon.secondary`, `color.border.focus` and `color.icon.brand` on `color.background.surface` (min 3) — `npm run tokens`: 65/65 pairs pass.
- Accessibility check: `audits/2026-11-19-B144-1-accessibility.md` — 3 failures (missing contrast pairs, colors unchanged) fixed; not blocking.
- Token audit: `audits/2026-11-19-B144-1-tokens.md` — 65 values, 0 failures.
- `backlog/backlog.json`: B144 `in-progress`, stage `guidelines`.
- Open questions kept in the spec: look of the tabs (Tabs, B093); behavior below desktop (guidelines stage).
- Compliance audit: `audits/2026-11-19-B144-1.md` — 61 compliant, 14 non-compliant (0 fixed, 0 new), 22 not in the design system; no new ticket.

**Files**
- `components/Panel/` (created), `audits/2026-11-19-B144-1-accessibility.md`, `audits/2026-11-19-B144-1-tokens.md`, `audits/2026-11-19-B144-1.md` (created)
- `tokens/semantic.json`, `tokens/contrast-pairs.json`, `.claude/skills/token-naming/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B143-2 — Frame: guidelines approved
**Date:** 2026-11-19

**Decisions (made by the Design System Lead)**
- Audit finding #68 → new ticket **B162** "Documentation site: tablet screen size tokens" (`proposal`, low, R4).
- When to use: on the canvas of the UX playground only. When not to use: outside the canvas → Screen (prototypes) or the layout of the page.
- Best practices: one composition per frame; explicit names; frames of a composition side by side, mobile → tablet → desktop; content on the layout grid of its size; no nested frames.
- Do's and don'ts (shown visually): explicit name, one screen per frame, sizes aligned, no frame inside a frame.
- Content: name in sentence case, a few words, no final period, never the size.
- Behavior: a click anywhere in the frame selects it.
- Accessibility: Tab to the frame, Enter / Space toggle the selection, Escape removes it; after the content, Tab goes to the next frame, then out of the canvas (Shift+Tab backwards); focused content scrolled below the device bar, focused frame never under the Panel; the frame is a named group ("Home, Mobile 375 × 812") and its name is a toggle button exposing the selection (anatomy line added to `spec.md`); the name button meets WCAG 2.5.8 with the spacing exception.
- Related components: Canvas (B142), Panel (B144), StickyNote (B145), Comment (B146).

**What was done**
- `components/Frame/guidelines.md` written; `spec.md`: the name is a toggle button.
- Accessibility check: `audits/2026-11-19-B143-2-accessibility.md` — 6 failures over the runs (keyboard exit, focus obscured, selected state on a group, contrast pairs listed, target size, its wording), all fixed with the Lead's decisions; no exception.
- Guidelines approved: `meta.json` status and the B143 `stage` set to `code`.
- Compliance audit: `audits/2026-11-19-B143-2.md` — 61 compliant, 15 non-compliant (no new finding; #68 now B162), 22 not in the design system; no new ticket.

**Files**
- `audits/2026-11-19-B143-2.md`, `audits/2026-11-19-B143-2-accessibility.md` (created)
- `components/Frame/guidelines.md`, `components/Frame/spec.md`, `components/Frame/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B145-1 — StickyNote: design stage
**Date:** 2026-11-19

**Decisions (made or approved by the Design System Lead)**
- Component **StickyNote** (`components/StickyNote/`, `.ds-sticky-note`), level **molecule** (it uses the IconButton atom); description "A sticky note placed on the canvas, to annotate a composition."
- One type, one color, one fixed size: a 160 × 160 square, new token **`size.sticky-note`** = 160px (value chosen and name approved by the Design System Lead).
- Container: `background.brand-subtle`, `radius.4`, `shadow.frame`, padding `space.8`.
- Anatomy: text on top (`body`, cut with an ellipsis after 4 lines); footer with the author in initials (`label-sm`) and a short date (`body-sm`) on the left, Edit and Delete actions on the right (tertiary IconButtons, always visible); gaps `space.8` (text / footer) and `space.4` (footer). The "more" menu was dropped: no Menu component exists.
- States: hover and focus with the state layers; **selected** and **editing**: border `border-width.2` `border.strong`, no state layer (the focus outline still shows); **editing**: the full text scrolls; **dragging**: `shadow.hover`.
- Accessibility fixes chosen by the Design System Lead: the date is `text.primary` (text.secondary fell to 3.83:1 under the focus layer); no state layer on a selected or editing note (the border fell to 2.54:1).

**What was done**
- `components/StickyNote/`: `meta.json`, `spec.md`, design preview (`design/Preview.tsx`, `design/tokens.json`; selected, editing and dragging shown as variants).
- `tokens/semantic.json`: `size.sticky-note`; `tokens/contrast-pairs.json`: `color.border.strong` on `color.background.brand-subtle` (min 3).
- Token audit: `audits/2026-11-19-B145-1-tokens.md` — 103 values, 0 failures.
- Accessibility check: `audits/2026-11-19-B145-1-accessibility.md` — first run 2 failures, fixed; 6 pass, 0 fail.
- Compliance audit: `audits/2026-11-19-B145-1.md` — 61 compliant, 13 non-compliant (#64 fixed by the new contrast pair), 22 not in the design system; no new ticket.
- Design stage approved: `meta.json` status and backlog B145 stage → `guidelines`.

**Files**
- `components/StickyNote/meta.json`, `spec.md`, `design/Preview.tsx`, `design/tokens.json`, `audits/2026-11-19-B145-1.md`, `audits/2026-11-19-B145-1-tokens.md`, `audits/2026-11-19-B145-1-accessibility.md` (created)
- `tokens/semantic.json`, `tokens/contrast-pairs.json`, `.claude/skills/token-naming/SKILL.md` (size table), `backlog/backlog.json`, `STEPS.md` (updated)

## Step B157-2 — Tab: guidelines approved
**Date:** 2026-11-19

**Decisions (made by the Design System Lead)**
- When to use: only inside Tabs, one tab per panel; to go to another page → NavigationItem; for a sequence of steps → TimelineStep.
- Disabled only when the content of the panel is not available yet (e.g. Code before the Code stage); a tab whose content will not exist is removed. Never selected and disabled.
- Content: name the content of the panel, one to three words, sentence case, text only, no punctuation.
- Behavior: automatic activation — the arrow keys move the focus and select the tab (as the current tabs of the site, B125); long label on one line, the tab grows.
- The four do / don't pairs (case and punctuation, name the content, when to disable, never selected and disabled).
- Accessibility: WAI-ARIA tabs pattern (Tab enters on the selected tab; Left / Right move and select, wrapping; Home / End; disabled tabs skipped; tab role, name = label, selected state, linked to its panel); sentence "The focused tab is never hidden by a sticky element or a panel." added after the accessibility check (WCAG 2.4.11).
- Related components: Tabs only.
- Guidelines approved; next stage: code.

**What was done**
- `components/Tab/guidelines.md` written; `meta.json` status `code`; backlog B157 stage `code`.
- Accessibility check: `audits/2026-11-19-B157-2-accessibility.md` — first run 1 failure (WCAG 2.4.11), fixed; 7 pass, 0 fail.
- Compliance audit: `audits/2026-11-19-B157-2.md` — 61 compliant, 14 non-compliant, 22 not in the design system; no change, no new ticket.

**Files**
- `audits/2026-11-19-B157-2.md`, `audits/2026-11-19-B157-2-accessibility.md` (new)
- `components/Tab/guidelines.md`, `components/Tab/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)



## Step B157-3 — Tab: code approved, component complete
**Date:** 2026-11-19

**Decisions (made by the Design System Lead)**
- Code approved: Tab is **complete**, version 1.0.
- Two rows added to the Design tokens table of the spec, at the Design System Lead's request: focus ring offset `--border-width-2`; state layer transition `--duration-100`, `--easing-ease-out` (already in the code).

**What was done**
- `components/Tab/Tab.tsx`: `<button type="button" role="tab" aria-selected>`; prop `selected` (default `false`), native `disabled` (not focusable); selected + disabled forbidden by the types; roving `tabIndex` (0 when selected, -1 otherwise, set by Tabs); `ref` and native attributes passed through (`role`, `aria-selected`, `type`, `disabled` cannot be overridden).
- `components/Tab/Tab.css`: semantic tokens only; selected = `label` style, `--color-text-brand`, indicator `--border-width-2` `--color-border-focus`; state layers, focus ring, top corners `--radius-4`; disabled `--color-text-disabled`, no state layer.
- `examples.tsx` (default, selected, disabled, several tabs, long label) and `playground.tsx`; a tab shown alone and not selected gets `tabIndex={0}` so it stays reachable with the keyboard.
- Export in `components/index.ts`; `meta.json` `complete`, version 1.0, changelog "First complete version."; backlog B157 `done`.
- Accessibility check: `audits/2026-11-19-B157-3-accessibility.md` — 9 pass, 0 fail, 1 not applicable; keyboard checked in the browser; screen reader still to check in a manual test.
- Token audit: `audits/2026-11-19-B157-3-tokens.md` — 35 values, 0 failures.
- Compliance audit: `audits/2026-11-19-B157-3.md` — 61 compliant, 15 non-compliant (1 new: #68, the hand-built tabs of the component pages, to adopt Tabs once complete), 21 not in the design system.

**Files**
- `components/Tab/Tab.tsx`, `Tab.css`, `examples.tsx`, `playground.tsx` (new)
- `audits/2026-11-19-B157-3.md`, `audits/2026-11-19-B157-3-accessibility.md`, `audits/2026-11-19-B157-3-tokens.md` (new)
- `components/Tab/meta.json`, `components/Tab/spec.md`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B143-3 — Frame: code approved, component complete
**Date:** 2026-11-21

**Decisions (made by the Design System Lead)**
- Selection controlled by the canvas: props `selected` + `onSelectedChange(selected)` (added to the spec's properties).
- The click that selects is on the container only; above the frame, only the name button is clickable (WCAG 2.5.8 spacing exception kept); guidelines Behavior line clarified.
- The selected outline is styled from the native state (`aria-pressed="true"` on the name), not a class.
- Hover on the container only (spec updated).
- Examples and Playground content: an "Order tracking" screen made of coded components (Breadcrumb, heading, Timeline, Card, Button).
- Open question added to the spec: components inside a frame respond to the browser width, not the frame width (iframe or container queries) — to decide with B130 and B142.

**What was done**
- `components/Frame/Frame.tsx`, `Frame.css` (semantic tokens only), `examples.tsx` (7 examples), `playground.tsx`; `Frame` and its types exported from `components/index.ts`.
- Browser checks: real sizes 375 × 812 / 768 × 1024 / 1280 × 800; selection by click, name toggle and Escape; keyboard order name → content → next frame and back, no trap; focus and selected outlines together; long name ellipsis; scrolling content; no overflow of the Examples tab at mobile width.
- Token audit: `audits/2026-11-21-B143-3-tokens.md` — 53 values, 0 failure.
- Accessibility check: `audits/2026-11-21-B143-3-accessibility.md` — 2 failures (selected styled with a class, label row clickable), fixed with the Lead's decisions; no exception.
- Component complete: `meta.json` status `complete`, version 1.0, changelog "First complete version."; B143 `done`.
- Compliance audit: `audits/2026-11-21-B143-3.md` — 61 compliant, 16 non-compliant (1 new: #69, the component page tab row overflows the page on mobile), 22 not in the design system.

**Files**
- `audits/2026-11-21-B143-3.md`, `audits/2026-11-21-B143-3-tokens.md`, `audits/2026-11-21-B143-3-accessibility.md` (created)
- `components/Frame/Frame.tsx`, `Frame.css`, `examples.tsx`, `playground.tsx`, `spec.md`, `guidelines.md`, `meta.json`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B093-1 — Tabs: design approved (and Tab 1.1)
**Date:** 2026-11-21

**Decisions (made by the Design System Lead)**
- **Tabs**: molecule, class `.ds-tabs`, description "A row of tabs that shows one panel of the page at a time.", one type, one size, no variant property.
- Row of **Tab** (B157), left-aligned, each tab as wide as its label, `--space-4` between tabs; line `--border-width-1` in `--color-border-subtle` under the whole row (as the current tabs of the site).
- Not enough space: the row scrolls horizontally, no button, scrollbar hidden; the selected tab is brought into view.
- The panel of the selected tab is part of Tabs: under the row, `--space-24` above, no padding, always focusable (focus ring `--border-width-2` `--color-border-focus`).
- Backgrounds: `background.page` and `background.surface` (Panel, B144).
- Disabled tabs: a rule belongs to the guidelines.
- B093 ticket completed (Why, Scope, Done when); its scope includes replacing the hand-built tabs of the component pages with Tabs (compliance finding #68).
- Accessibility check failure (WCAG 2.4.7, the scrolling row cut the Tab focus ring): **the Tab focus ring is drawn inside the tab** → **Tab 1.1** (spec, guidelines, design preview, CSS, changelog). Also, the line under the row is drawn inside the row (inset shadow) so the scrolling row no longer cuts the selection line (measured: 1px hidden).
- Design approved; next stage: guidelines.

**What was done**
- `components/Tabs/` created from the template: `meta.json` (status `guidelines`), `spec.md`, design preview (`design/Preview.tsx` with the coded Tab, `design/tokens.json`, states default and focus).
- `components/Tab/`: `Tab.css` (`outline-offset: calc(var(--border-width-2) * -1)`), `spec.md`, `guidelines.md`, `design/Preview.tsx`, `meta.json` 1.1.
- Accessibility check: `audits/2026-11-21-B093-1-accessibility.md` — first run 1 failure (2.4.7), fixed; 13 pass, 0 fail.
- Token audit: `audits/2026-11-21-B093-1-tokens.md` — 27 values, 0 failures.
- Compliance audit: `audits/2026-11-21-B093-1.md` — 61 compliant, 17 non-compliant (2 new, #69 and #70, carried from `develop`), 21 not in the design system; no new ticket.
- Backlog: B093 stage `guidelines`.

**Files**
- `components/Tabs/meta.json`, `spec.md`, `guidelines.md` (template), `design/Preview.tsx`, `design/tokens.json` (new)
- `audits/2026-11-21-B093-1.md`, `audits/2026-11-21-B093-1-accessibility.md`, `audits/2026-11-21-B093-1-tokens.md` (new)
- `components/Tab/Tab.css`, `spec.md`, `guidelines.md`, `design/Preview.tsx`, `meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B142-1 — Canvas: design approved
**Date:** 2026-11-21

**Decisions (made by the Design System Lead)**
- Component **Canvas**: organism, folder `components/Canvas/`, class `.ds-canvas`, description "The free canvas of the UX playground, which holds the layout frames."; one type: an infinite canvas with pan and zoom.
- Surface: fills its container, no border, no rounded corners; background `background.subtle`; grid of dots `border.subtle`, diameter `border-width.2`, every `space.16` at 100% zoom.
- Content: Frames (B143), sticky notes (B145), comments (B146) and components placed on their own; stacking `z-index.content`.
- Zoom controls: a separate building block, **ZoomControls** (new ticket B161, high, R2), at the bottom right, `z-index.sticky`: zoom out, zoom level in percent, zoom in, fit to screen; tertiary IconButtons; container `background.surface`, `radius.8`, `shadow.dropdown`. The Canvas design goes on; its code waits for ZoomControls to be complete.
- Prop: `zoom` (10 → 400, steps of 10, default 100). Empty is not a prop: deduced from the content; empty message "Add a frame to start" (`body`, `text.secondary`, centered, no icon).
- Behavior: pan with Space + drag or wheel / trackpad; a drag on the background draws the selection rectangle. Keyboard with focus: arrow keys move the view by `space.16`, `+` / `−` zoom, `0` back to 100%, `Shift` + `1` fit to screen.
- States: empty, panning (grab cursor), focus (2px `border.focus` outline inside the edges, in front of the content and the zoom controls), selecting (1px `border.focus` border, fill `border.focus` at `state-layer.hover`).

**What was done**
- `components/Canvas/` from the template: `meta.json`, `spec.md`, design preview (`design/Preview.tsx`, `design/tokens.json`, variants `empty` and `selection`, states default and focus).
- Ticket B161 ZoomControls created and reserved, merged into `develop`.
- Accessibility check: `audits/2026-11-19-B142-1-accessibility.md` — 7 pass, 0 failure, no exception (focus outline question resolved by the Lead).
- Token audit: `audits/2026-11-19-B142-1-tokens.md` — 55 values, 0 failure.
- Design approved: `meta.json` status and the B142 `stage` set to `guidelines`.
- Compliance audit: `audits/2026-11-19-B142-1.md` — 61 compliant, 15 non-compliant (0 new, 0 fixed), 22 not in the design system; no new ticket.

**Files**
- `components/Canvas/` (created), `audits/2026-11-19-B142-1.md`, `audits/2026-11-19-B142-1-accessibility.md`, `audits/2026-11-19-B142-1-tokens.md` (created)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B145-2 — StickyNote: guidelines approved
**Date:** 2026-11-21

**Decisions (made by the Design System Lead)**
- When to use: annotate a composition, explain a user journey between Frames, a working note, review feedback. When not to use: a discussion with replies (Comment, B146), text that is part of the screen (real components in the Frame), outside the canvas.
- Placement: anywhere on the canvas background, never inside a Frame; as many notes as needed, never overlapping (a moved note cannot cover another).
- Content: one idea per note, short sentences, sentence case, a task starts with a verb; author in two capital initials, date "19 Nov" (no year).
- Behavior: select with a click or Space; move by dragging or with the arrow keys; edit with the Edit button, a double-click or Enter (Enter = new line in editing); Escape or a click outside saves and leaves editing; an empty note is removed; delete at once (button, Delete / Backspace), undo handled by the Canvas.
- Accessibility: Tab order note → Edit → Delete; the note is a group named "Sticky note by CD, 19 Nov: <full text>", with "selected" added to the name; editing = multi-line text box "Note text", announcing "Editing note, Escape to save"; the focused note is never hidden (no overlap, the Canvas scrolls to it); after a delete, the focus goes to the next note, or the canvas.
- 4 do / don't pairs: one short idea; next to the Frame; side by side; initials and short date.
- Left to Canvas (B142): behavior below desktop, single-pointer alternative to dragging (WCAG 2.5.7), scrolling to the focused element.
- Spec wording aligned: the editing state is entered by the Edit action, a double-click, or Enter.

**What was done**
- `components/StickyNote/guidelines.md` written; `spec.md` (one wording line).
- Accessibility check: `audits/2026-11-21-B145-2-accessibility.md` — first run 3 failures (focus not obscured, editing state and selected state for screen readers), fixed; 6 pass, 0 fail.
- Compliance audit: `audits/2026-11-21-B145-2.md` — 61 compliant, 16 non-compliant (#64 fixed — corrected by Claude —, #70 renumbered from B157-3), 21 not in the design system; no new ticket.
- Guidelines approved: `meta.json` status and backlog B145 stage → `code`.

**Files**
- `components/StickyNote/guidelines.md`, `audits/2026-11-21-B145-2.md`, `audits/2026-11-21-B145-2-accessibility.md` (created)
- `components/StickyNote/spec.md`, `components/StickyNote/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B163-1 — Documentation site: component page tabs on small screens
**Date:** 2026-11-21

**Decisions (made by the Design System Lead)**
- When the tabs of a component page do not fit (mobile, tablet), the tab row scrolls horizontally inside itself; the page never scrolls sideways (WCAG 1.4.10).
- The row follows the approved Tabs design (B093, decision relayed by the Composant Tabs conversation and confirmed here): scrollbar hidden, no button, the selected tab brought into view. Temporary: Tabs replaces this hand-built row once complete.
- No ticket for finding #70 (hand-built tab buttons instead of Tab): it stays followed by the compliance audit.

**What was done**
- `.tabs` scrolls sideways (`overflow-x: auto`), tabs do not shrink or wrap, scrollbar hidden; a padding the size of the focus ring, cancelled by a negative margin, keeps the ring visible; the row line is drawn inside the row (content-box background) so the selected underline sits on it and stays within the content column.
- A click or Left / Right / Home / End scrolls the selected tab into view, without animation.
- Implemented by the `ds-compliance-fix` agent, checked and completed by Claude; checked in the browser on Button and Frame at 375px, 768px and desktop (page width = viewport, desktop unchanged).
- Compliance audit: `audits/2026-11-21-B163-1.md` — #69 fixed; #71 (row line past the content column, caused by the fix) fixed in the same step; 1 new open: #70; 61 compliant, 16 non-compliant, 22 not in the design system.

**Files**
- `docs/src/docs.css`, `docs/src/pages/ComponentPage.tsx`, `backlog/backlog.json`, `STEPS.md` (updated)
- `audits/2026-11-21-B163-1.md` (created)

## Step B093-2 — Tabs: guidelines approved
**Date:** 2026-11-21

**Decisions (made by the Design System Lead)**
- When to use: to switch between panels of the same page; to go to another page → SideNavigation; for a sequence of steps → Timeline; to filter a list → ChipGroup (not in the design system yet, B094).
- Two to seven tabs; at least two enabled tabs (otherwise show the content directly); one Tabs per view; no Tabs inside a panel of Tabs; right under the header (or at the top of its container, as in Panel).
- The four do / don't pairs (same page vs other pages, at least two enabled, no nesting, two to seven tabs).
- Content: Tab label rules; the tab list has a required accessible name that names the content.
- Behavior and accessibility: automatic activation, arrows wrapping, Home / End, disabled tabs skipped, Tab from the selected tab to the panel (always focusable), the selected or focused tab brought into view when the row scrolls; tablist named, tabs, tabpanel named by its tab.
- Related components: Tab only.
- B163 (another conversation): the hand-built tab row applies the horizontal scroll of the Tabs design until Tabs replaces it — decision relayed to the Gouvernance conversation, which applied it.
- Guidelines approved; next stage: code.

**What was done**
- `components/Tabs/guidelines.md` written; `meta.json` status `code`; backlog B093 stage `code`, "Done when" renumbered to finding #70 (numbering aligned with `develop`).
- Accessibility check: `audits/2026-11-21-B093-2-accessibility.md` — 7 pass, 0 fail.
- Compliance audit: `audits/2026-11-21-B093-2.md` — 61 compliant, 16 non-compliant (#64 fixed; #68 / #70 renumbered to match `develop`), 21 not in the design system; no new ticket.

**Files**
- `audits/2026-11-21-B093-2.md`, `audits/2026-11-21-B093-2-accessibility.md` (new)
- `components/Tabs/guidelines.md`, `components/Tabs/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B162-1 — Documentation site: tablet screen size tokens
**Date:** 2026-11-21

**Decisions (made by the Design System Lead)**
- The Playground Desktop screen uses `size.viewport-desktop` (1280px, was 1024px from `breakpoint.desktop`), like the prototype frames (audit finding #72, added to this step).
- B093's `why` cited finding #68 for the hand-built tabs: corrected to #70 by the Composant Tabs conversation on `component/Tabs`.

**What was done**
- Playground Tablet screen and the prototype tablet preview frame read `size.viewport-tablet` / `size.viewport-tablet-height` instead of the breakpoint tokens (same values, 768 × 1024: no visual change). Implemented by the `ds-compliance-fix` agent, checked by Claude.
- Playground Desktop screen reads `size.viewport-desktop` (visible change: 1280px); `size.viewport-desktop` description now says "(Playground, prototype frames)".
- Checked in the browser: Playground Desktop 1280px, Tablet 768px, Mobile 375px; prototype tablet frame 768 × 1024; no console error. `npm run tokens`: 68/68 contrast pairs pass.
- Compliance audit: `audits/2026-11-21-B162-1.md` — #68 fixed; #72 (Playground desktop size, existed before) fixed in the same step; 63 compliant, 15 non-compliant, 22 not in the design system.

**Files**
- `docs/src/PlaygroundTab.tsx`, `docs/src/pages/PrototypePage.tsx`, `tokens/semantic.json`, `backlog/backlog.json`, `STEPS.md` (updated)
- `audits/2026-11-21-B162-1.md` (created)

## Step B019-1 — TextInput: design approved
**Date:** 2026-11-21

**Decisions (made by the Design System Lead)**
- New component **TextInput** (`components/TextInput/`, `.ds-text-input`), level **molecule**, description "Single-line field to type text.".
- Types `text` (default), `search` (fixed `search` icon, clear button: icon inside the field with a 24×24px minimum target, no help text), `number` (digits only, no + / − buttons, aligned left).
- Properties `type`, `label`, `placeholder`, `icon`, `helpText`, `error`, `disabled`.
- **No label above the field**: the empty field shows **either a label or a placeholder, never both**; it disappears as soon as the user types. The accessible name is that label or placeholder.
- Forbidden combinations: `label` + `placeholder`, `error` + `disabled`, `icon` + `search`, `icon` + `number`, `helpText` + `search`.
- The error message replaces the help text. Extra state: error. One size, full width of the container. Value scrolls horizontally while typing, ellipsis when not focused; lengths as the Select.
- Tokens validated in the Design preview (aligned on the Select).
- **Accessibility exception**: WCAG 3.3.2 (no visible name once the field is filled) accepted on 2026-11-21.
- Design stage approved on 2026-11-21.

**What was done**
- `components/TextInput/`: `meta.json` (status `guidelines`), `spec.md`, `design/Preview.tsx`, `design/tokens.json`, `guidelines.md` (template).
- `tokens/contrast-pairs.json`: pair `color.icon.error` on `color.background.page` (min 3) added (`icon.secondary` on `surface` was already added on `develop`); `npm run tokens`: 69/69 pass.
- Token audit: `audits/2026-11-19-B019-1-tokens.md` — 183 values, 0 failures.
- Accessibility check: `audits/2026-11-19-B019-1-accessibility.md` — 2 missing contrast pairs fixed, 3.3.2 accepted as an exception.
- Compliance audit: `audits/2026-11-21-B019-1.md` — 61 compliant, 15 non-compliant (#64 fixed, 0 new), 22 not in the design system; no new ticket.
- `backlog/backlog.json`: B019 `in-progress`, stage `guidelines`.

**Files**
- `components/TextInput/` (meta.json, spec.md, guidelines.md, design/Preview.tsx, design/tokens.json), `audits/2026-11-19-B019-1-tokens.md`, `audits/2026-11-19-B019-1-accessibility.md`, `audits/2026-11-21-B019-1.md` (created)
- `tokens/contrast-pairs.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B142-2 — Canvas: guidelines approved
**Date:** 2026-11-21

**Decisions (made by the Design System Lead)**
- When to use: only as the working surface of the UX playground (B130). Not for a prototype screen (Screen), a page layout (layout grid), the preview of one component (Playground tab) or an image (ImageViewer).
- Best practice: one Canvas per page. Do's and don'ts: screens in Frames; sticky notes next to what they annotate; bottom right corner free for the zoom controls; background and grid of dots unchanged.
- Empty message fixed: "Add a frame to start" (no prop).
- Every screen size. **Spec completed** (approved again): touch gestures — one finger pans, pinch zooms, long press then drag draws the selection rectangle.
- Accessibility (after a blocking check with 2 failures, fixed): focus order canvas → zoom controls → content by position (top to bottom, then left to right) → leave; a focused element is brought into view with a `space.16` margin, never under the zoom controls; single-pointer alternatives: zoom controls for pan and pinch, Shift + click / long press then tap / Shift + Enter to add to the selection; screen reader: region "Canvas" describing shortcuts and gestures, zoom level announced. No exception.
- New ticket **B164** (high, R2): align the Frame guidelines with the Canvas on Tab order, focus never hidden and Shift + Enter.

**What was done**
- `components/Canvas/guidelines.md` written; `components/Canvas/spec.md` completed (touch gestures, selection without dragging, focus order, focus never hidden, `-` key).
- Accessibility check: `audits/2026-11-21-B142-2-accessibility.md` — first run 2 failures (focus order, focus hidden), fixed; 8 pass, 0 failure.
- Guidelines approved: `meta.json` status and the B142 `stage` set to `code`. The code waits for ZoomControls (B161) to be complete.
- Compliance audit: `audits/2026-11-21-B142-2.md` — 61 compliant, 15 non-compliant (1 fixed: #69 by B163; 0 new), 22 not in the design system; no new ticket.

**Files**
- `audits/2026-11-21-B142-2.md`, `audits/2026-11-21-B142-2-accessibility.md` (created)
- `components/Canvas/guidelines.md`, `components/Canvas/spec.md`, `components/Canvas/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B093-3 — Tabs: code approved, component complete
**Date:** 2026-11-21

**Decisions (made by the Design System Lead)**
- Code approved: Tabs is **complete**, version 1.0.
- Next: replace the hand-built tabs of the component pages with Tabs (finding #70, last "Done when" of B093).

**What was done**
- `components/Tabs/Tabs.tsx`: props `label` (required name of the tab list), `tabs` (`id`, `label`, `disabled`, `content`), `selected` + `onSelect` (controlled) or `defaultSelected`; a disabled tab is never the selected one (falls back to the first enabled tab); WAI-ARIA tabs with automatic activation (arrows wrapping, Home / End, disabled tabs skipped); the selected tab scrolled into view inside the row without scrolling the page; only the selected panel is rendered (`tabpanel`, named by its tab, `tabIndex={0}`), `aria-controls` on the selected tab only.
- `components/Tabs/Tabs.css`: semantic tokens only; full width; row `--space-4`, `overflow-x: auto`, scrollbar hidden, line as an inset shadow (`--border-width-1`, `--color-border-subtle`); panel `--space-24` above, focus ring `--border-width-2` `--color-border-focus`.
- `examples.tsx` (default, with a disabled tab, on the surface background, not enough space with seven tabs) and `playground.tsx` (uncontrolled, restarted when the control changes); export in `components/index.ts`; `meta.json` `complete`, 1.0, changelog "First complete version."
- Backlog: B093 `why` renumbered to finding #70 (asked by the Design System Lead through the Gouvernance conversation).
- Accessibility check: `audits/2026-11-21-B093-3-accessibility.md` — 9 pass, 0 fail, 1 not applicable; keyboard, Tab / Shift+Tab, scrolling row and 375px checked in the browser; screen reader, 200% zoom and text spacing still to check manually.
- Token audit: `audits/2026-11-21-B093-3-tokens.md` — 13 values, 0 failures.
- Compliance audit: `audits/2026-11-21-B093-3.md` — 61 compliant, 15 non-compliant (#69 fixed by B163), 21 not in the design system; no new ticket.

**Files**
- `components/Tabs/Tabs.tsx`, `Tabs.css`, `examples.tsx`, `playground.tsx` (new)
- `audits/2026-11-21-B093-3.md`, `audits/2026-11-21-B093-3-accessibility.md`, `audits/2026-11-21-B093-3-tokens.md` (new)
- `components/Tabs/meta.json`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B144-2 — Panel: guidelines approved
**Date:** 2026-11-21

**Decisions (made by the Design System Lead)**
- **When to use**: in the UX playground (B130) only, one Panel per screen, on the right of the canvas.
- **When not to use**: navigation → SideNavigation; detail or blocking action → Dialog; tabs inside a page → Tabs (B093); panel of steps below desktop → Timeline.
- **Do's and don'ts**: one Panel, on the right · keep the three tabs · long content scrolls inside the Panel · collapsed, the strip stays visible.
- **Content**: fixed tab labels; accessible labels start with a verb ("Collapse the panel", "Open Library"); empty tab → one short sentence in `body` / `color.text.secondary` until B065.
- **Behavior**: keeps the last tab, the width and the collapsed state, also after a reload; the width follows the pointer with no animation while resizing; the header stays fixed while the content scrolls; loading waits for B065.
- **Below desktop**: always opens collapsed; expanded, not resizable (handle hidden); collapses with `Escape`, or as soon as the focus or a click leaves it for the canvas (the focus stays on the canvas element).
- **Accessibility**: `Tab` / `Shift+Tab` leave the Panel (no keyboard trap); focus order handle (desktop only) → tabs → collapse button → content; the focus follows collapse / expand; arrows change the width by `space.8`; no other shortcut; a focused canvas element is never hidden behind the Panel (the canvas moves it, rule for Canvas B142); `<aside>` "Playground panel", separator with value / min / max, `aria-expanded` (`true` on the collapse button, `false` on the strip icons) with `aria-controls`.
- **Spec updated** with the Lead's answers: handle visible on desktop only; arrow step `--space-8`; "tooltip" removed from the Content table; below-desktop question pointing to the guidelines.
- Stage 2 (Guidelines) approved; status `code`. The code waits for Tabs (B093) to be complete.

**What was done**
- `components/Panel/guidelines.md` written; `components/Panel/spec.md` updated.
- Accessibility check: `audits/2026-11-21-B144-2-accessibility.md` — 3 failures found during the stage (WCAG 2.1.2, 2.4.11 desktop and below desktop), all fixed; not blocking.
- Compliance audit: `audits/2026-11-21-B144-2.md` — 63 compliant, 14 non-compliant (1 fixed: #64, 0 new), 22 not in the design system; no new ticket.
- `meta.json` status and `backlog/backlog.json` stage: `code`.

**Files**
- `audits/2026-11-21-B144-2-accessibility.md`, `audits/2026-11-21-B144-2.md` (created)
- `components/Panel/guidelines.md`, `components/Panel/spec.md`, `components/Panel/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B093-4 — Component pages use Tabs
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- The component pages of the documentation site use Tabs (B093 scope, finding #70), with the Tabs spec as is (24px between the row and the panel, focus ring inside the tab, focusable panel).
- Tabs examples shown inside the site's Tabs panel (documentation frame): no sentence added to the Tabs guidelines; the rule "No Tabs inside a panel of Tabs" is about the product UI.
- B093 done.

**What was done**
- `docs/src/pages/ComponentPage.tsx`: `<Tabs label="Component documentation" selected onSelect tabs=…>` with one panel per tab; the hand-built tab buttons and keyboard code (B125) are removed; `ExamplesTab` renders the examples only when the Examples tab is shown.
- `docs/src/docs.css`: the `.tabs` rules (hand-built row and its B163 scroll) are removed.
- Checked in the browser: arrows, panel named by its tab, line across the content width, the row scrolls at 375px without page overflow, no console error.
- Compliance audit: `audits/2026-11-22-B093-4.md` — 62 compliant, 13 non-compliant (#70 and #68 fixed, 0 new), 21 not in the design system; no new ticket.
- Backlog: B093 `done`.

**Files**
- `audits/2026-11-22-B093-4.md` (new)
- `docs/src/pages/ComponentPage.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B145-3 — StickyNote: code approved, component complete
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- API: `text`, `author`, `date`; `selected` + `onSelectedChange`; `editing` + `onEditingChange`; `dragging` (set by the Canvas); `onTextChange(text)` when leaving the editing state; `onDelete()` (Delete button, Delete / Backspace, empty text); `onMove(direction)` with the arrow keys — the distance is decided by the Canvas.
- In editing, Tab out of the note saves and leaves the editing state, like a click outside (added to the guidelines); Escape works wherever the focus is in the note.
- **`size.sticky-note` = 10rem** (160px at the default text size) instead of 160px, so the note grows with the text size (WCAG 1.4.4): first size token in rem, noted in `token-naming`.
- Code approved: StickyNote complete, version 1.0.

**What was done**
- `components/StickyNote/StickyNote.tsx` and `StickyNote.css`: named group (author, date, full text, ", selected"), keyboard (Enter, Space, Delete / Backspace, arrows when selected, Escape), editing text box "Note text" described by "Editing note, Escape to save", focus into the text box when editing starts, save on Escape / focus leaving the note, empty text removes the note; selected / editing border drawn inside (inset shadow, `--border-width-2` `--color-border-strong`) so the content does not move; text cut after 4 lines (fix: the text box is not stretched, so no part of a 5th line shows).
- `examples.tsx` (Default, Interactive, States, Text length), `playground.tsx`; export from `components/index.ts`.
- `spec.md` and `guidelines.md` aligned (10rem size, Tab out of an editing note); `tokens/semantic.json` and `.claude/skills/token-naming/SKILL.md` (size table, rem exception).
- Token audit: `audits/2026-11-21-B145-3-tokens.md` — 42 values, 0 failures.
- Accessibility check: `audits/2026-11-21-B145-3-accessibility.md` — 2 failures fixed (editing exit only from the text box; text cut at 200% text size); 10 pass, 0 fail; browser checks (keyboard, 200% text, text spacing, mobile width).
- Compliance audit: `audits/2026-11-22-B145-3.md` — 61 compliant, 14 non-compliant (#68 fixed by B162; #70 fixed on `develop` by B093-4), 21 not in the design system; no new ticket.
- `meta.json`: status `complete`, version 1.0, changelog "First complete version."; backlog B145 `done`, stage `complete`.

**Files**
- `components/StickyNote/StickyNote.tsx`, `StickyNote.css`, `examples.tsx`, `playground.tsx`, `audits/2026-11-21-B145-3-tokens.md`, `audits/2026-11-21-B145-3-accessibility.md`, `audits/2026-11-22-B145-3.md` (created)
- `components/StickyNote/meta.json`, `spec.md`, `guidelines.md`, `components/index.ts`, `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B159-1 — Avatar: design approved
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Avatar (atom, `components/Avatar/`, `.ds-avatar`), ticket B159 (building block of CommentMessage B160 and Comment B146); worked on `component/Avatar`, the ticket brought from `component/Comment`.
- Single type, round (`radius.full`), not interactive (default state only, no disabled state; a parent handles any click).
- Content chosen automatically: initials when a name is given, otherwise the Material Symbol `person`.
- Initials uppercase, from the first and last words of the name ("Anne Marie Dupont" → "AD"); one letter for a one-word name.
- Colors: `background.brand`, initials `text.inverse`, icon `icon.inverse`.
- Property `size`: `small` / `medium` (default) / `large` — diameter `space.24` / `space.32` / `space.48` (spacing tokens, no new token), initials `label-sm` / `label` / `heading-5`, icon `icon-size.16` / `20` / `32`.
- Screen reader: the full name is announced (not the initials); without a name the avatar is decorative.
- Open: prop name for the person's name, decided at the code stage. Design approved; next stage: guidelines.

**What was done**
- `components/Avatar/` created from the template: `meta.json` (status `guidelines`), `spec.md`, design preview (`design/tokens.json`, `design/Preview.tsx` — initials computed from the name in the Content field); backlog B159 `in-progress`, stage `guidelines`.
- Accessibility check: `audits/2026-11-22-B159-1-accessibility.md` — 2 pass, 0 fail, 3 not applicable; `npm run tokens`: 68/68 pairs pass.
- Token audit: `audits/2026-11-22-B159-1-tokens.md` — 41 values, 0 fail.
- Compliance audit: `audits/2026-11-22-B159-1.md` — 61 compliant, 16 non-compliant (0 new; #70 and #68 fixed on `develop`, closed by the update from `develop`), 22 not in the design system; no new ticket.

**Files**
- `components/Avatar/` (new: `meta.json`, `spec.md`, `design/`, template files for the later stages)
- `audits/2026-11-22-B159-1.md`, `audits/2026-11-22-B159-1-accessibility.md`, `audits/2026-11-22-B159-1-tokens.md` (new)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B019-2 — TextInput: guidelines approved
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Preview content: the sample text "kkkkk" (a test) replaced by "Primary button".
- The TextInput `search` type covers the Search field ticket **B056** (set to `rejected` on the Backlog page); the "/" keyboard hint of the site search is removed (not part of the TextInput).
- The fields of the Playground, the Design preview and the Icons page follow the rule "label or placeholder inside the field, no label above" when they adopt the TextInput.
- Guidelines: when not to use (Textarea B020, Select, Chips, dedicated date / time / color field); label = a noun, placeholder = a verb and a noun; mitigations of the 3.3.2 exception (error names the field, help text when ambiguous, icon that recalls the field, short forms); full width set by the grid, `--space-16` between stacked fields, search above the content it filters; 5 do / don't pairs; sentence case, no punctuation, short help text.
- Behavior: error checked while typing; required field: error when emptied or when the form is sent; `number`: any other character is written and shows an error; `search`: filters while typing, Escape empties the field, clearing (click, Enter, Space) gives the focus back to the field; in a Dialog or a panel, Escape first empties the field, then closes.
- Accessibility: `number` is a text field (numeric keyboard, Arrow up / down do not change the value), `search` a search field; the error is announced when it appears or changes (`aria-live="polite"`).
- **Spec changes** (approved with the guidelines): `number` line ("only digits are valid; any other character shows an error"); new property **`required`** (no visual mark, announced); clear button focus outline (`--border-width-2` `--color-border-focus`); roles and states announced; forbidden combination **`required` + `disabled`**.
- Guidelines stage approved on 2026-11-22.

**What was done**
- `components/TextInput/guidelines.md` written; `spec.md` updated; `meta.json` status `code`; `design/tokens.json` sample text.
- Accessibility check: `audits/2026-11-22-B019-2-accessibility.md` — 5 failures on the first run (2.1.2, 2.1.1, 2.4.11, 4.1.2 ×2), all fixed; 19 passes; 3.3.2 exception kept.
- Compliance audit: `audits/2026-11-22-B019-2.md` — 62 compliant, 13 non-compliant (#70 fixed by B093-4, 0 new), 21 not in the design system; no new ticket.
- `backlog/backlog.json`: B019 stage `code`.

**Files**
- `audits/2026-11-22-B019-2.md`, `audits/2026-11-22-B019-2-accessibility.md` (created)
- `components/TextInput/guidelines.md`, `components/TextInput/spec.md`, `components/TextInput/meta.json`, `components/TextInput/design/tokens.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B144-3 — Panel: code approved, component complete
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- **Space under the tabs**: only the `space.24` of Tabs; the tab content has no top padding (spec updated).
- **Props**: `library`, `properties`, `compositions` (content of each tab); `collapsed` with `onCollapsedChange`; `selected` (`"library" | "properties" | "compositions"`) with `onSelect`; the width and the browser memory are handled by the Panel.
- **Empty tab**: the sentence is written by the playground (example in `examples.tsx`).
- **`size.panel` 320px → 400px**, so the three tabs fit next to the collapse button (token, `token-naming` and spec updated).
- **Focus order** (accessibility check): resize handle → collapse button → tabs → content; the collapse button comes before the tabs in the DOM (guidelines updated).
- Stage 3 (Code) approved: Panel **complete**, version **1.0**.

**What was done**
- `components/Panel/Panel.tsx` + `Panel.css`: built with Tabs and IconButton, semantic tokens only; collapse / expand with the focus following, resize by pointer, arrows (`space.8`) and double-click, browser memory (`localStorage` key `ds-panel`), below desktop always collapsed at open, Escape and leaving the panel collapse it; breakpoint read in the window the panel is shown in (Playground iframe).
- Inside the Panel, the focus ring of the tab content is drawn inside (negative offset), like the resize handle, so it stays on the panel background.
- `examples.tsx` (expanded, collapsed, empty tab, long content), `playground.tsx`; `components/index.ts` exports `Panel`, `PanelProps`, `PanelTab`.
- Token audit: `audits/2026-11-22-B144-3-tokens.md` — 1 failure (raw `z-index`) fixed with no z-index; not blocking.
- Accessibility check: `audits/2026-11-22-B144-3-accessibility.md` — 1 failure (focus order) fixed; checked with the keyboard in the browser; not blocking. Still to check later: keyboard focus leaving below desktop, reduced motion, 200% zoom, 320px reflow; WCAG 2.4.11 with Canvas (B142).
- Compliance audit: `audits/2026-11-22-B144-3.md` — 64 compliant, 13 non-compliant (3 fixed: #70, #68, #64; 0 new), 21 not in the design system; no new ticket.
- `meta.json`: status `complete`, version `1.0`, changelog "First complete version."; `backlog/backlog.json`: B144 `done`, stage `complete`.

**Files**
- `components/Panel/Panel.tsx`, `Panel.css`, `examples.tsx`, `playground.tsx`, `audits/2026-11-22-B144-3-tokens.md`, `audits/2026-11-22-B144-3-accessibility.md`, `audits/2026-11-22-B144-3.md` (created or rewritten from the template)
- `components/Panel/meta.json`, `spec.md`, `guidelines.md`, `components/index.ts`, `tokens/semantic.json`, `.claude/skills/token-naming/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B159-2 — Avatar: guidelines approved
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- When to use: author of content (comment, message), assignee of a ticket or task, signed-in user, list of people.
- When not to use: logo or illustration (an image); status or category → Tag; group of overlapping avatars → AvatarGroup (not in the design system yet); clickable profile → wrap the avatar and the name in a Button or a Link (the Avatar is never interactive).
- Name always written next to the avatar, `--space-8` apart; only exception: a marker that shows the name on click (Comment marker).
- Sizes by context: `small` next to body text and in lists, `medium` (default) e.g. the Comment marker, `large` in a profile or page header. Lists: one person per row, same size for the whole list. No limit on the number of avatars per screen.
- Do / don't: icon only for a genuinely unknown name (never "??"); one size per list (never mixed); a Tag for a status (never letters that are not a person).
- Initials always computed from the full name, never typed by hand; the icon is never a loading placeholder.
- Behavior: a long name next to the avatar wraps, the avatar stays aligned with the first line and never shrinks; same size on every screen.
- Related components: CommentMessage (B160), Comment (B146).
- **Spec change** (raised by the accessibility check): the avatar is **decorative when the name is written next to it**, so screen readers do not read the name twice; it announces the full name only when shown alone (marker); without a name it stays decorative. How the code knows it: decided at the code stage.
- Guidelines approved; next stage: code.

**What was done**
- `components/Avatar/guidelines.md` written; `spec.md` (Content: screen reader rule; Open questions) updated; `meta.json` status `code`; backlog B159 stage `code`.
- Accessibility check: `audits/2026-11-22-B159-2-accessibility.md` — 5 pass, 0 fail, 2 not applicable.
- Compliance audit: `audits/2026-11-22-B159-2.md` — 62 compliant, 13 non-compliant (#70, #68, #64 fixed; 0 new), 21 not in the design system; no new ticket (B132's scope still names the fixed #64: to update in its own conversation).

**Files**
- `audits/2026-11-22-B159-2.md`, `audits/2026-11-22-B159-2-accessibility.md` (new)
- `components/Avatar/guidelines.md`, `components/Avatar/spec.md`, `components/Avatar/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)
## Step B161-1 — ZoomControls: design approved
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Identity: **ZoomControls**, folder `components/ZoomControls/`, class `.ds-zoom-controls`, level **molecule** (built from IconButton), description "The zoom controls of the canvas: zoom out, zoom level, zoom in, fit."
- Already decided in the Composant Canvas conversation (B142): zoom out, zoom level in percent, zoom in, fit to screen; tertiary IconButtons; container `background.surface`, `radius.8`, `shadow.dropdown`; bottom right of the Canvas; zoom from 10 to 400 in steps of 10.
- Layout: one horizontal row — zoom out (`remove`), zoom level, zoom in (`add`), divider, fit to screen (`fit_screen`).
- Zoom level: plain text, read only, `label-sm`, `text.primary`, centered, minimum width = new token **`size.zoom-level` = 2.5rem** (40px; rem so it grows with the text size, WCAG 1.4.4).
- Divider: `border.subtle`, `border-width.1`, height `icon-size.20`.
- Container: no border, padding `space.4`, gap `space.4` (44px high).
- Limits: zoom out disabled at 10%, zoom in disabled at 400%; fit to screen always enabled.
- Accessible names: "Zoom controls" (group), "Zoom out", "Zoom level 100%", "Zoom in", "Fit to screen".
- Design stage approved on 2026-11-22.

**What was done**
- Ticket B161 reserved (`in-progress`), branch `component/ZoomControls` from `develop`.
- `components/ZoomControls/` created from the template: `meta.json` (status `guidelines`), `spec.md`, `design/Preview.tsx` and `design/tokens.json` (Design preview tab, zoom level as content), template files for the later stages.
- Token `size.zoom-level` added to `tokens/semantic.json` and the `token-naming` skill.
- Accessibility check: `audits/2026-11-22-B161-1-accessibility.md` — 5 passes, 0 failures (2 notes: width in rem → chosen; how the zoom level is announced → open question for guidelines / code).
- Token audit: `audits/2026-11-22-B161-1-tokens.md` — 36 values, 0 fail.
- Compliance audit: `audits/2026-11-22-B161-1.md` — 62 compliant, 13 non-compliant (0 new, 0 fixed), 21 not in the design system; no new ticket.
- `backlog/backlog.json`: B161 stage `guidelines`.

**Files**
- `components/ZoomControls/` (new)
- `audits/2026-11-22-B161-1.md`, `audits/2026-11-22-B161-1-accessibility.md`, `audits/2026-11-22-B161-1-tokens.md` (new)
- `tokens/semantic.json`, `tokens/tokens.css`, `.claude/skills/token-naming/SKILL.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B019-3 — TextInput: code approved, component complete
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Code stage approved on 2026-11-22: TextInput is **complete**, version **1.0** ("First complete version.").
- Approved with the code: `--radius-full` for the clear button state layer, the clear button state layers and the `--duration-100` · `--easing-ease-out` transitions (added to the spec Design tokens table); example contents of the "Long texts" and "Search" examples.

**What was done**
- `components/TextInput/TextInput.tsx`: props `type`, `label` | `placeholder` (one of them), `icon`, `helpText`, `error`, `required`, `disabled`, `value` / `defaultValue` / `onChange`; forbidden combinations prevented by the types; native `<input>` (`search` → `type="search"`, `number` → `type="text"` + `inputMode="numeric"`); accessible name `aria-label` = label or placeholder; `aria-describedby`, `aria-invalid`, `aria-required`; error in an `aria-live="polite"` region always rendered; clear button (`<button>`, "Clear the search") gives the focus back to the field; Escape empties a filled `search` field and stops there (a Dialog closes on the next Escape).
- `TextInput.css`: semantic tokens only; field state layer on `::before` so the clear button stays above it without a z-index.
- `examples.tsx` (11 examples), `playground.tsx` (one control per prop), export in `components/index.ts`.
- `meta.json`: status `complete`, version `1.0`, changelog; `backlog/backlog.json`: B019 `done`.
- Token audit: `audits/2026-11-22-B019-3-tokens.md` — 57 values, 1 failure (raw `z-index: 1`) fixed in code.
- Accessibility check: `audits/2026-11-22-B019-3-accessibility.md` — 10 passes, 0 failures; clear by click / Enter / Space, Escape, Shift+Tab, number error and mobile width checked in the browser; no screen reader pass (checked in the code).
- Compliance audit: `audits/2026-11-22-B019-3.md` — 62 compliant, 18 non-compliant (5 new: #71–#74 the site text fields now covered by TextInput, #75 the "/" shortcut), 21 not in the design system; 2 tickets proposed (A: site search, B: Playground / Design preview / Icons fields).

**Files**
- `components/TextInput/TextInput.tsx`, `TextInput.css`, `examples.tsx`, `playground.tsx`, `audits/2026-11-22-B019-3.md`, `audits/2026-11-22-B019-3-tokens.md`, `audits/2026-11-22-B019-3-accessibility.md` (created)
- `components/TextInput/meta.json`, `components/TextInput/spec.md`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B159-3 — Avatar: code approved, component complete
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Props: `name` (full name; initials computed from it; without a name the person icon), `size` (`small` / `medium` default / `large`), `decorative` (default `true`: hidden from screen readers, the name is written next to it; `false` when shown alone: `role="img"` named with the full name). Written into `spec.md` (Variants).
- Accessibility exception accepted: at 200% text zoom (WCAG 1.4.4) the initials are cut off by the fixed-size circle (approved px diameters kept); no information lost (name written next to it, or announced).
- Code approved; Avatar complete, version 1.0.

**What was done**
- `components/Avatar/Avatar.tsx` and `Avatar.css` (semantic tokens only; `.ds-avatar`, `.ds-avatar--<size>`, `.ds-avatar-initials`, `.ds-avatar-icon`; no state layer), `examples.tsx` (sizes, unknown name, initials, list of people, long name, shown alone), `playground.tsx` (controls `name`, `size`, `decorative`); exported from `components/index.ts` (`Avatar`, `AvatarProps`, `AvatarSize`).
- Checked in the browser: diameters 24 / 32 / 48px, initials 12 / 14 / 20px, icon 16 / 20 / 32px, colors, aria attributes; Playground controls update the canvas and the code; 320px wide and increased text spacing pass.
- `meta.json`: status `complete`, version `1.0`, changelog "First complete version."; backlog B159 `done`, stage `complete`.
- Accessibility check: `audits/2026-11-22-B159-3-accessibility.md` — 8 pass, 0 fail, 1 accepted exception (WCAG 1.4.4), 4 not applicable.
- Token audit: `audits/2026-11-22-B159-3-tokens.md` — 25 values, 0 fail.
- Compliance audit: `audits/2026-11-22-B159-3.md` — 62 compliant, 18 non-compliant (5 new from `develop`, #71–#75, TextInput; 0 from this step), 21 not in the design system; no new ticket. Avatar is not used on the site: no site element shows a person.

**Files**
- `audits/2026-11-22-B159-3.md`, `audits/2026-11-22-B159-3-accessibility.md`, `audits/2026-11-22-B159-3-tokens.md` (new)
- `components/Avatar/Avatar.tsx`, `Avatar.css`, `examples.tsx`, `playground.tsx`, `meta.json`, `spec.md`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)
## Step B161-2 — ZoomControls: guidelines approved
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- When not to use: showing an image (**ImageViewer**), enlarging the text of a page (never: browser zoom), a surface that does not zoom.
- Placement: bottom right of the canvas, `space.16` from the edges, corner kept free; one per canvas; always the four parts.
- Do's and don'ts: corner free, one per canvas, full set, level in steps of 10.
- Content: level "120%" (whole number, no space, multiple of 10); no tooltip until the Tooltip component.
- Behavior: fit to screen rounds the level **down** to a multiple of 10 (73% → 70%); empty canvas → back to 100%, centered; same bar on every screen size.
- Accessibility: the zoom level is a **polite status** ("Zoom level 120%" after each change); disabled buttons stay the native IconButton disabled (no focusable disabled — IconButton unchanged); when the focused button becomes disabled, the focus moves to the other zoom button (zoom out at 400%, zoom in at 10%); the visible level is the explanation IconButton requires for a disabled button.
- Related components: Canvas, ImageViewer.
- **Spec changes** (approved with the guidelines): zoom level as a status; focus moved to the other zoom button at the limit.
- Guidelines stage approved on 2026-11-22.

**What was done**
- `components/ZoomControls/guidelines.md` written; `spec.md` updated; `meta.json` status `code`.
- Accessibility check: `audits/2026-11-22-B161-2-accessibility.md` — 6 passes, 0 failures (focusable disabled conflict with IconButton resolved by the decision above).
- Compliance audit: `audits/2026-11-22-B161-2.md` — 62 compliant, 13 non-compliant (0 new, 0 fixed), 21 not in the design system; no new ticket.
- `backlog/backlog.json`: B161 stage `code`.

**Files**
- `audits/2026-11-22-B161-2.md`, `audits/2026-11-22-B161-2-accessibility.md` (created)
- `components/ZoomControls/guidelines.md`, `components/ZoomControls/spec.md`, `components/ZoomControls/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B161-3 — ZoomControls: code approved, component complete
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Event props decided at the code stage (open question of `spec.md`): `zoom` (controlled), `onZoomChange(zoom)`, `onFitToScreen()` — same convention as `ImageViewer`'s `index` / `onIndexChange`.
- Code approved; ZoomControls complete, version 1.0.

**What was done**
- `components/ZoomControls/ZoomControls.tsx` and `.css` (semantic tokens only; `.ds-zoom-controls`, `.ds-zoom-controls-group`, `-level`, `-divider`; built from `IconButton` tertiary); `role="group"` `aria-label="Zoom controls"`; level `role="status"` `aria-live="polite"` `aria-label="Zoom level {n}%"`; zoom out / in disabled at 10% / 400% (native `disabled`); a `useEffect` moves the focus to the other zoom button when the focused one becomes disabled (same pattern as `ImageViewer`).
- `examples.tsx` (Default, Minimum 10%, Maximum 400%, each a `Stateful` wrapper); `playground.tsx` (control `zoom`); exported from `components/index.ts` (`ZoomControls`, `ZoomControlsProps`).
- Checked in the browser: zoom in/out steps of 10, disabled at the limits, focus moves to the other button at 400% (verified live), fit to screen resets to 100%, aria attributes match the spec exactly; Playground canvas interactive, generated code shows `onZoomChange`/`onFitToScreen`.
- `meta.json`: status `complete`, version `1.0`, changelog "First complete version."; `backlog/backlog.json`: B161 `done`, stage `complete`.
- Token audit: `audits/2026-11-22-B161-3-tokens.md` — 13 values, 0 fail.
- Accessibility check: `audits/2026-11-22-B161-3-accessibility.md` — 7 pass, 0 fail, 1 not applicable.
- Compliance audit: `audits/2026-11-22-B161-3.md` — 63 compliant, 18 non-compliant (5 new from `develop`, #71–#75, TextInput, already covered by B165/B166; 1 found and fixed in this step: ZoomControls' own Playground was not interactive, now wired with local state), 21 not in the design system; no new ticket.

**Files**
- `audits/2026-11-22-B161-3.md`, `audits/2026-11-22-B161-3-accessibility.md`, `audits/2026-11-22-B161-3-tokens.md` (created)
- `components/ZoomControls/ZoomControls.tsx`, `ZoomControls.css`, `examples.tsx`, `playground.tsx`, `meta.json`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B168-1 — Public site: login to edit the backlog live
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Asked directly in the chat (not from a `Composant`/`Gouvernance` conversation): keep the public site a showcase for visitors, but get the live, editable Backlog herself once logged in — one account, a password.
- Storage: commit straight to GitHub (`develop`), not a separate store (Netlify Blobs) — keeps the project's git-only philosophy (B092) and the full history of every change.
- Priority `medium`, no release (not planned): asked and answered in the chat before the ticket was created.
- Scope kept to the Backlog only: the Branches page cannot run on Netlify (needs a local git worktree); live editing of design tokens or work time on the public site is left for a later ticket, on request.
- Pushed to `main` out of the usual two-week cycle, on the Design System Lead's explicit request, **on its own** (cherry-picked), not as a full `develop` merge: `develop` currently also carries other, not-yet-reviewed work (Canvas, ZoomControls, Avatar and others), which stays out of this release and will reach `main` at the normal release R3+1.

**What was done**
- `netlify/functions/`: `login.ts` (checks `ADMIN_PASSWORD`, sets a signed session cookie), `logout.ts`, `session.ts` (whether the cookie is valid), `backlog.ts` (GET/PATCH, auth-gated) and `_lib/session.ts` (HMAC cookie, `SESSION_SECRET`) + `_lib/github.ts` (reads/writes `backlog/backlog.json` on `develop` through the GitHub Contents API, same `BACKLOG_FIELDS` and one-item-at-a-time rule as the local dev server, `vite.config.ts`).
- `netlify.toml`: `functions = "netlify/functions"` and redirects `/api/login`, `/api/logout`, `/api/session`, `/api/backlog` → the matching function.
- `docs/src/auth.tsx` (new): `AuthProvider` / `useAuth` — checks `/api/session` on load, `login`/`logout` call the functions above. Wrapped around `<App />` in `main.tsx`.
- `docs/src/backlog.ts`: `useBacklog` now takes `loggedIn` — logged out (or not known yet) it keeps the bundled last-release `items` and never calls `/api/backlog` (so `develop`, which can hold unreleased tickets, is never fetched for a logged-out visitor); logged in, it fetches the live items.
- `docs/src/pages/BacklogPage.tsx`: reads `loggedIn` from `useAuth`, passes it to `useBacklog`; a note ("Showing the last release. Log in from the header to edit the live backlog.") shown when logged out.
- `docs/src/pages/ReleasePlanningPage.tsx`: same wiring, so it also shows the live backlog once logged in.
- `docs/src/AppShell.tsx` + `docs.css`: a `Login` control in the header, next to the work-time clock — logged out, an IconButton (`login`) opens a Dialog with a password field (plain `<input type="password">`, like the Search field above it: TextInput (B019) has no password type) and a "Log in" / "Cancel" footer; logged in, the same spot is a "Log out" IconButton (`logout`).

**Checked**
- `npm run typecheck` and `npm run build`: pass.
- The Netlify Functions (outside the project's `tsconfig.json` `include`, so not covered by the commands above) type-check cleanly against their own, equivalent compiler options.
- Local preview (`npm run dev`): the login control opens, the password form submits (fails locally with a generic "Wrong password" — `/api/login` only exists once deployed on Netlify), the Backlog page shows the logged-out note and its menus stay disabled.
- Not run: the `ds-compliance-audit`, `ds-accessibility-audit` and `ds-token-audit` agents (not available in this session) — worth running from the usual Claude Code session before the next release review, same as any other step.
- Not yet checked: logging in for real. It needs `GITHUB_TOKEN`, `ADMIN_PASSWORD` and `SESSION_SECRET` set as Netlify environment variables (the Design System Lead's own secrets, never written here) and a deploy of this code — `develop` only goes live on `main` at the next release (R3, 2026-12-04), so a Netlify branch deploy of `project/public-site-login` (or of `develop`) is the way to try it sooner.

**Files**
- `netlify/functions/login.ts`, `logout.ts`, `session.ts`, `backlog.ts`, `_lib/session.ts`, `_lib/github.ts` (new)
- `netlify.toml`, `docs/src/backlog.ts`, `docs/src/AppShell.tsx`, `docs/src/docs.css`, `docs/src/main.tsx`, `docs/src/pages/BacklogPage.tsx`, `docs/src/pages/ReleasePlanningPage.tsx`, `backlog/backlog.json`, `package-lock.json`, `STEPS.md` (updated)
- `docs/src/auth.tsx` (new)

## Step B031-2 — Prototype WorkDescription validated
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- The current version (one screen, Timeline + 4 `TimelineStep`, 4 `clickable-image` Cards with 3 placeholder images each) is validated as it is — no further screens added for now.

**What was done**
- `develop` merged into `component/work-description` (fast-forward up to date; brings in the ZoomControls and B168 login steps, no conflict).
- Backlog: ticket B031 second iteration (feedback "Validé tel quel", decision `validated`); status set to `done`.
- Compliance audit: `audits/2026-11-22-B031-2.md` — 64 compliant, 18 non-compliant (0 new from this step; 1 new since `develop` moved, #76 Login password field, "not in the design system", already covered by the done ticket B168 — question asked to the Design System Lead, no ticket), 22 not in the design system; no new ticket (every open finding already covered by an existing one).
- Verification: typecheck and build pass.

**Files**
- `audits/2026-11-22-B031-2.md` (created)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B142-3 — Canvas: code approved, component complete
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Pan is **controlled**: `panX`/`panY` + `onPanChange`, same convention as `zoom`/`onZoomChange` (ZoomControls precedent).
- Children positioning is the **caller's responsibility**: neither Frame nor StickyNote have x/y props, so the Canvas only pans/zooms the whole content layer as one block; a consumer (UX playground, B130) positions each child itself (e.g. inline `position: absolute`).
- Selection rectangle: the Canvas draws it and reports its final bounds in content space via `onSelectionRectangle`; it does not know its children, so the caller decides which ones are inside and selects them.
- Code approved; Canvas complete, version 1.0.

**What was done**
- `components/Canvas/Canvas.tsx` and `.css`: pannable/zoomable surface (dot grid scaling with zoom via CSS custom properties), `ZoomControls` embedded bottom-right (DOM order before the content layer, for correct Tab order), content layer transformed by `panX`/`panY`/`zoom`, empty message, selection-rectangle overlay.
  - Keyboard (canvas region focused only): arrows pan by one `--space-16` step scaled by zoom; `+`/`=`/`-` zoom one step anchored on the viewport center; `0` resets to 100%; `Shift+1` fits the actual rendered children's bounding box to the view (zoom floored to a multiple of 10, read from the real DOM children so it works regardless of how the caller positions them); Space arms pan-drag mode.
  - Mouse: Space + drag pans; a plain drag on the background draws the selection rectangle. Touch: one finger pans; a ~500ms long-press then drag selects; a second touch pinch-zooms. `touch-action: none` so the browser does not intercept these gestures.
  - Focus never hidden: a focus listener on the root pans the view to keep a newly focused descendant clear of the edges (`--space-16` margin) and the zoom-controls corner.
  - `role="region"` `aria-label="Canvas"` `aria-describedby` a hidden description of the shortcuts and gestures; `:focus-visible` outline inside the edges (same technique as the approved Design preview mockup); single live region is ZoomControls' own (B161-2 decision, not repeated here).
- `examples.tsx` (Default: two Frames + a StickyNote, each positioned by the example itself; Empty), `playground.tsx` (controls `zoom`, `empty`; `Demo` wraps local zoom/pan state so the canvas stays interactive, same pattern as Panel's and StickyNote's playgrounds); exported from `components/index.ts` (`Canvas`, `CanvasProps`, `SelectionRectangle`).
- Checked in the browser: keyboard zoom and pan (exact pixel deltas), Space + drag pan, selection-rectangle lifecycle (appears during drag, gone after release), fit-to-screen math, Tab order (region → zoom controls → content), focus-visible.
- `meta.json`: status `complete`, version `1.0`, changelog "First complete version."; `backlog/backlog.json`: B142 `done`, stage `complete`.
- Token audit: `audits/2026-11-22-B142-3-tokens.md` — 32 values, 0 fail. The three inline custom properties (`--ds-canvas-zoom`, `--ds-canvas-pan-x`, `--ds-canvas-pan-y`) confirmed as component-local runtime state, not a token gap (same precedent as Panel's `--ds-panel-width`).
- Accessibility check: `audits/2026-11-22-B142-3-accessibility.md` — first run 2 failures (`Shift+1` never fired: `event.key` is layout-dependent for a shifted digit, fixed with `event.code === "Digit1"`; Space did not call `preventDefault()`, risking a page scroll, fixed), both fixed and verified live; 13 pass, 0 fail.
- Compliance audit: `audits/2026-11-22-B142-3.md` — 64 compliant (Canvas's own `examples.tsx` added), 18 non-compliant (unchanged, all covered by existing tickets), 21 not in the design system; no new ticket. Canvas's own `playground.tsx` checked specifically (after the ZoomControls Playground bug found at B161-3): already correctly wired, no repeat.

**Files**
- `audits/2026-11-22-B142-3.md`, `audits/2026-11-22-B142-3-accessibility.md`, `audits/2026-11-22-B142-3-tokens.md` (created)
- `components/Canvas/Canvas.tsx`, `Canvas.css`, `examples.tsx`, `playground.tsx`, `meta.json`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B166-1 — Documentation site: TextInput in the site fields
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Playground text and number controls: the control name as `label`, shown in the empty field.
- Number out of range: help text "From {min} to {max}"; the field keeps what is typed and the value is brought back into the range on blur (no error message).
- Icons page "Icon name" field: TextInput `text` type with a label (not `search`).
- Widths kept with `size.playground-input` and `size.icon-try`; the native date control stays.

**What was done**
- Playground (`PlaygroundTab.tsx`): text controls are TextInputs; number controls use a new `NumberControl` (TextInput `number`, help text with the range, clamped on blur); the date control keeps the native input.
- Design preview (`DesignPreview.tsx`): the "Content" field is a TextInput, save on blur kept.
- Icons page (`IconsPage.tsx`): the "Icon name" field is a TextInput, same name cleanup.
- `docs.css`: hand-built `.icon-try` label and input rules removed (only `max-width` kept), `.playground-text-input` width added.
- Checked in the browser (Breadcrumb Playground: "9" stays while typing, becomes "3" on blur; Icons page), `npm run typecheck` and `npm run build` pass. Done by the `ds-compliance-fix` agent, checked by Claude (nothing outside `docs/`).
- Compliance audit: `audits/2026-11-22-B166-1.md` — 66 compliant, 15 non-compliant (3 fixed: #72–#74; 0 new), 23 not in the design system (2 new: native date field, password field); no ticket proposed. B166 `done`.

**Files**
- `audits/2026-11-22-B166-1.md` (new)
- `docs/src/PlaygroundTab.tsx`, `docs/src/DesignPreview.tsx`, `docs/src/pages/IconsPage.tsx`, `docs/src/docs.css`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B165-1 — Documentation site: TextInput in the site search
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- The "/" shortcut is removed with its hint (WCAG 2.1.4).
- The results list keeps the combobox markup (`role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant` on the input) until the dropdown list B057 exists.
- The field takes the height of the TextInput (39px); the token `size.search-field-height` is removed.
- Width kept with `size.search-field` (360px); full width below desktop.

**What was done**
- `AppShell.tsx`: the header search is a TextInput `search` (placeholder "Search pages"); the "/" listener and the `<kbd>` hint are removed; arrows, Enter and "No page found" unchanged, Escape handled by the TextInput.
- `docs.css`: field, icon, placeholder and `.shell-search-key` rules removed; `.shell-search` only places the field and the results list.
- `tokens/semantic.json`: `size.search-field-height` removed (no remaining reference).
- Checked in the browser (results, ArrowDown, Escape, "No page found", 39px height); `npm run tokens`, `typecheck` and `build` pass.
- Compliance audit: `audits/2026-11-22-B165-1.md` — 67 compliant, 13 non-compliant (2 fixed: #71, #75; 0 new), 23 not in the design system; no ticket proposed. B165 `done`.

**Files**
- `audits/2026-11-22-B165-1.md` (new)
- `docs/src/AppShell.tsx`, `docs/src/docs.css`, `tokens/semantic.json`, `backlog/backlog.json`, `STEPS.md` (updated)
## Step B161-4 — ZoomControls: event renamed to onFit
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Another session had already merged the code of ZoomControls into `develop` (Step B161-3, event `onFitToScreen`). The Design System Lead chose to keep that code and rename the fit to screen event to **`onFit`**; the zoom event stays `onZoomChange(zoom)`.
- ZoomControls stays at version **1.0**, no changelog entry (1.0 was released the same day, not used outside the repository). No version bump for Canvas: only its internal call changed.

**What was done**
- `onFitToScreen` renamed to `onFit` in `components/ZoomControls/ZoomControls.tsx`, `examples.tsx`, `playground.tsx` and at its call site in `components/Canvas/Canvas.tsx`.
- `components/ZoomControls/spec.md`: new **Events** section (`onZoomChange(zoom)`, `onFit()`), open question on the event names closed.
- Checked in the browser: fit to screen resets to 100% in the ZoomControls examples and fits the content (30%) in the Canvas example. A console error ("createRoot() … already been passed") appears on the Canvas page with or without this change.
- A separate implementation written in parallel on this branch (`onFit`, hidden-text announcement of the level) was not used.
- Compliance audit: `audits/2026-11-22-B161-4.md` — 66 compliant, 15 non-compliant (0 new, 0 fixed), 23 not in the design system; no ticket proposed.

**Files**
- `components/ZoomControls/ZoomControls.tsx`, `examples.tsx`, `playground.tsx`, `spec.md`, `components/Canvas/Canvas.tsx`, `STEPS.md` (updated)
- `audits/2026-11-22-B161-4.md` (created)


## Step B160-1 — CommentMessage: design approved
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- B160 CommentMessage started on `component/CommentMessage` (ticket reserved from `component/Comment`, where it was created in B146-1): name `CommentMessage`, class `.ds-comment-message`, level **molecule**, description "One message of a comment thread: author avatar and name, date and text.", one size.
- Header on one line: Avatar `small`, author name (`label`, `text.primary`, one line with an ellipsis), date and time always absolute ("19 Nov 2026, 14:43", `label-sm`, `text.secondary`) followed by "· Edited" when the message was changed, then a "…" IconButton `tertiary` (`more_horiz`); gap `space.8`. Header height = the IconButton (36px), which keeps its place when hidden.
- Text: `body`, `text.primary`, wraps with no limit. Padding `space.8`, radius `radius.8`, gap header → text `space.8`.
- Variants: `position` `first` / `reply` (reply: separator above, `border.subtle`, `border-width.1`); `author` `other` / `me` (me: `background.subtle`; other: no background). All combinations allowed.
- States: hover = hover state layer (`text.primary`) painted over the whole message, content included, and the "…" button shown; focus on the "…" button shows it with its own focus ring; always shown on touch screens. The message itself is not focusable.
- The "…" button opens Edit / Delete: list of options waits for a new **Menu** component — ticket **B167** created (`todo`, high, R4, `origin: proposal`).
- Accessibility: hover contrast of the date on `background.subtle` measured with the layer over the content, 4.62:1 (AA, at the limit) — chosen by the Design System Lead.
- Design stage approved on 2026-11-22.

**What was done**
- `components/CommentMessage/` created from the template: `meta.json` (status `guidelines`), `spec.md`, `design/Preview.tsx` and `design/tokens.json` (4 variants, states default / hover / focus), template files for the later stages.
- `tokens/contrast-pairs.json`: pair `color.icon.brand` / `color.background.subtle` (min 3) added; 70/70 pairs pass.
- Accessibility check: `audits/2026-11-22-B160-1-accessibility.md` — 2 failures found (hover contrast of the date, missing contrast pair), both resolved; note for the code stage: the hidden "…" button stays in the Tab order.
- Token audit: `audits/2026-11-22-B160-1-tokens.md` — 102 values, 0 fail.
- Compliance audit: `audits/2026-11-22-B160-1.md` — 66 compliant, 15 non-compliant (0 new, 0 fixed), 22 not in the design system (count corrected); no new ticket.
- `backlog/backlog.json`: B160 `in-progress`, stage `guidelines`; B167 created.
- `develop` merged into `component/CommentMessage`.

**Files**
- `components/CommentMessage/` (new)
- `audits/2026-11-22-B160-1.md`, `audits/2026-11-22-B160-1-accessibility.md`, `audits/2026-11-22-B160-1-tokens.md` (new)
- `tokens/contrast-pairs.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B160-2 — CommentMessage: guidelines approved
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Use for the thread of a Comment (B146). Not for a chat (not in the design system yet), a note with no author (StickyNote), a message from the application (message banner B063, not in the design system yet), a quote put forward (Card).
- Thread: chronological order, one `first` then `reply` messages, messages stacked with no space between them (the separator above a reply is enough).
- **Only the author changes or deletes a message** — spec change: the "…" button and the hover state layer exist on `author: me` only; `author: other` has no interaction state; the header keeps the same height (36px) on every message.
- Delete is immediate, with no confirmation; deleting the `first` message deletes the whole Comment. Focus after a delete: the "…" button of the next `me` message, else the reply field of the Comment; when the whole Comment disappears, the Comment decides (B146).
- Content: full name of the author, absolute date, "· Edited" with no date, plain text only (no formatting, link or image), never empty.
- Same layout on narrow screens (name cut with an ellipsis, date never wraps).
- Do's and don'ts: one `first`, full name, `me` for the signed-in user only, plain text. Related: Comment, Avatar, IconButton, Menu (B167), StickyNote, Card.
- Screen reader: the thread is a list of articles; a `me` message is read with "(you)" after the name; the "…" button is named "Open message actions" (verb first).
- **Accepted exception** (Design System Lead, 2026-11-22): the "…" button has the same accessible name on every message, so a screen reader user cannot tell which message it acts on.
- Guidelines stage approved on 2026-11-22.

**What was done**
- `components/CommentMessage/guidelines.md` written; `spec.md`, `design/Preview.tsx` and `design/tokens.json` updated for the `me`-only button and hover; `meta.json` status `code`.
- Accessibility check: `audits/2026-11-22-B160-2-accessibility.md` — 4 failures found (focus after a delete ×2, no keyboard trap / focus not obscured, same button name on every message): 3 fixed, 1 accepted as an exception; 0 blocking.
- Compliance audit: `audits/2026-11-22-B160-2.md` — 67 compliant, 13 non-compliant (2 fixed by B165-1, 0 new), 22 not in the design system; no new ticket.
- `backlog/backlog.json`: B160 stage `code`.
- `develop` merged into `component/CommentMessage`.

**Files**
- `components/CommentMessage/guidelines.md` (written); `spec.md`, `meta.json`, `design/Preview.tsx`, `design/tokens.json` (updated)
- `audits/2026-11-22-B160-2.md`, `audits/2026-11-22-B160-2-accessibility.md` (new)
- `backlog/backlog.json`, `STEPS.md` (updated)

## Step B160-3 — CommentMessage: code approved, component complete
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Code stage approved on 2026-11-22: CommentMessage is **complete**, version **1.0** ("First complete version.").
- API: `position` (`first` default / `reply`), `author` (`other` default / `me`), `name`, `date` as a `Date` (always shown as an absolute date, "19 Nov 2026, 14:43"), `edited`, `onActionsClick` (the application opens its own menu until the Menu component, B167, exists), text as `children`.
- "(you)" is exposed to screen readers as visually hidden text after the name; "· Edited" is visible text.
- Reflow (spec change): when the name and the date do not fit side by side (narrow screen, larger text), the date goes under the name; it wraps onto several lines only if the message is too narrow even for the date alone.

**What was done**
- `components/CommentMessage/CommentMessage.tsx` and `.css`: uses Avatar `small` and IconButton `tertiary`; the "…" button hidden with opacity (stays in the Tab order), shown on hover, focus and touch screens; hover state layer over the whole message, `author: me` only; header as tall as the IconButton; semantic tokens only.
- `examples.tsx` (6 examples), `playground.tsx` (one control per prop), export in `components/index.ts`.
- `spec.md`, `guidelines.md`, `design/Preview.tsx` and `design/tokens.json` updated for the date under the name.
- `meta.json`: status `complete`, version `1.0`, changelog; `backlog/backlog.json`: B160 `done`, stage `complete`.
- Token audit: `audits/2026-11-22-B160-3-tokens.md` — 33 values, 0 fail.
- Accessibility check: `audits/2026-11-22-B160-3-accessibility.md` — 1 failure found (reflow at 320px / 200% text), fixed; 0 blocking; checked in the browser (keyboard, 320px, 200% text, text spacing).
- Compliance audit: `audits/2026-11-22-B160-3.md` — 67 compliant, 13 non-compliant (0 new, 0 fixed), 22 not in the design system; CommentMessage replaces no element of the site; no new ticket.
- `develop` merged into `component/CommentMessage`.

**Files**
- `components/CommentMessage/CommentMessage.tsx`, `CommentMessage.css`, `examples.tsx`, `playground.tsx`, `audits/2026-11-22-B160-3.md`, `audits/2026-11-22-B160-3-tokens.md`, `audits/2026-11-22-B160-3-accessibility.md` (created)
- `components/CommentMessage/meta.json`, `spec.md`, `guidelines.md`, `design/Preview.tsx`, `design/tokens.json`, `components/index.ts`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B143-4 — Frame: Playground canvas extended to the content
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- The Playground canvas of the Frame was restricted to the chosen screen width (375 / 768 / 1280px) and clipped the frame, which is wider; it is now as wide as its content.

**What was done**
- New opt-in option `fitWidth` of `definePlayground`: the canvas is as wide as the content instead of the chosen screen width. Other playgrounds are unchanged.
- The canvas page (`playground-frame.tsx`) reports its content width (widest child + page padding) with a new `playground-width` message, on resize and on any change of the content; the Playground tab uses it (and still scales it down to the available width).
- `components/Frame/playground.tsx` sets `fitWidth: true`.
- Checked in the browser: mobile frame 471px, desktop frame 1376px shown at 53%. `tsc` passes.

**Files**
- `docs/src/playground.ts`, `docs/src/playground-frame.tsx`, `docs/src/PlaygroundTab.tsx`, `components/Frame/playground.tsx`, `STEPS.md` (updated)

## Step B170-1 — Fix flow for the documentation site
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- A fix of the documentation site (a defect with no effect on components, tokens or guidelines) follows a light flow: **no version, no changelog**.
- Scope: documentation site only; a fix of a component keeps the component flow.
- New branch type `fix/<topic>` (four branch types now), one short ticket per fix (priority asked, release optional), a new skill `fix`.
- No audit in the light flow (the compliance audit stays in the release review), except the accessibility check when a fix changes what a user sees or does; no dedicated conversation: a fix is made in the conversation where the defect is reported.

**What was done**
- New skill `fix`: scope, flow (ticket, branch, minimal change, check, preview, validation, short STEPS entry, merge), and what a fix never does.
- `git-workflow`: four branch types, `fix/<topic>` row in the branches table.
- `orchestrator`: dispatch row for the defects of the documentation site.
- `CLAUDE.md`: the Git paragraph names the fourth branch type.
- `backlog/backlog.json`: B170 `done`.

**Files**
- `.claude/skills/fix/SKILL.md` (created)
- `.claude/skills/git-workflow/SKILL.md`, `.claude/skills/orchestrator/SKILL.md`, `CLAUDE.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B146-2 — Comment: design approved
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Name `Comment`, class `.ds-comment`, description and texts validated; no variant property, no disabled state.
- Marker: the Avatar `medium` (`space.32`) of the author of the first message, a **button** that opens and closes the bubble; hover / pressed = state layers, focus and selected = ring (`border.focus`, `border-width.2`); focus offset `space.4`, selected offset `space.8`, the focus offset wins when both apply; resolved = the icon `check` instead of the initials, at full opacity.
- Bubble: to the right of the marker, aligned on its top edge, flips to the left (or upward) near the edge of the canvas; `background.page`, `shadow.dropdown`, `radius.8`, no border, width `size.dialog-small`, height following the thread up to 100% of the visible canvas (the thread scrolls); padding `space.8`, gaps `space.8`, marker → bubble gap `space.16` (so that the selected ring does not touch the bubble), `space.4` between the header buttons and between the field and Send.
- Header: Resolve (becomes Reopen, icon `undo`, on a resolved comment) and Close, IconButton `tertiary`, icon color `icon.brand`; thread of CommentMessage; reply field always visible (TextInput "Write a reply" + IconButton `primary` Send).
- Marker for screen readers: button named "Comment by <author>" (", resolved" when resolved), `aria-expanded`; the Avatar inside is decorative.
- States: closed, open, selected, resolved, editing.
- New ticket **B171** (Avatar 1.1: an icon in the Avatar; high, R4), needed by the resolved marker; to be done before the code stage of Comment.
- `space.2` (asked for the focus offset) does not exist and is not allowed by the spacing rule; `space.4` kept instead.

**What was done**
- Complete `components/Comment/spec.md`, design preview (`components/Comment/design/`: tokens and Preview with the real Avatar, CommentMessage, IconButton and TextInput), `meta.json` status `guidelines`; backlog B146 stage `guidelines`.
- Accessibility check (`audits/2026-11-22-B146-2-accessibility.md`): 1st run 2 failures (focus ring same color as the marker; resolved marker at `opacity.disabled` below 3:1), fixed with the Design System Lead; 2nd run 9 pass, 0 fail.
- Token audit (`audits/2026-11-22-B146-2-tokens.md`): 0 failure, twice.
- Compliance audit: `audits/2026-11-22-B146-2.md` — 67 compliant, 13 non-compliant (2 fixed since the previous audit, none new), 23 not in the design system; no new ticket.

**Files**
- `components/Comment/design/tokens.json`, `components/Comment/design/Preview.tsx`, `audits/2026-11-22-B146-2.md`, `audits/2026-11-22-B146-2-accessibility.md`, `audits/2026-11-22-B146-2-tokens.md` (created)
- `components/Comment/spec.md`, `components/Comment/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B146-3 — Comment: guidelines approved
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Use: a discussion with replies; a question to be resolved. Not for: a free note (StickyNote), naming a frame (name of the Frame), an application message (banner, B063, not in the design system yet).
- Practice: marker at the point clicked on the element, follows it; several comments per element, one per subject; reply in the thread; one bubble open at a time; resolve rather than delete; no length limit. Four do / don't pairs (one subject per thread, marker on the element, resolve not delete, reply in the thread).
- Behavior: Escape (from any element of the bubble) or Close closes the bubble and returns the focus to the marker; a click on the canvas closes it without moving the focus; the unsent reply is kept; Enter sends; a reply to a resolved comment keeps it resolved (only Reopen reopens); deleting the whole comment moves the focus to the marker of the next comment, or the canvas; the focus goes to the reply field on opening and after a reply sent with Send.
- Send is disabled while the field is empty (changes the spec: Comment has no disabled state of its own except this button); a reply that cannot be sent keeps its text and shows the TextInput error "Your reply wasn't sent. Try again." (new spec state "Reply not sent"); status messages announced politely: "Reply sent", "Comment resolved", "Comment reopened" (spec updated).
- Accessibility: marker = button named "Comment by <author>" (", resolved") with `aria-expanded`; bubble = non-modal group with the same name; reply field named by its placeholder "Write a reply".
- Related: CommentMessage, Avatar, StickyNote, Frame, Canvas. Open question left: what happens to the comments of an element that is deleted.

**What was done**
- `components/Comment/guidelines.md` written; `spec.md` and the design preview updated (Send disabled, state "Reply not sent", status messages, reply field name); `meta.json` status `code`; backlog B146 stage `code`.
- Accessibility check (`audits/2026-11-22-B146-3-accessibility.md`): 1st run 2 failures (name of the reply field, state of Send when empty) and open questions, all decided; 2nd run 6 pass, 0 fail.
- Compliance audit: `audits/2026-11-22-B146-3.md` — 67 compliant, 13 non-compliant, 23 not in the design system; no change, no new ticket.

**Files**
- `components/Comment/guidelines.md`, `audits/2026-11-22-B146-3.md`, `audits/2026-11-22-B146-3-accessibility.md` (created)
- `components/Comment/spec.md`, `components/Comment/design/Preview.tsx`, `components/Comment/meta.json`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B146-4 — Comment: code approved, component complete
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- Code approved; Comment is `complete`, version **1.0**.
- Narrow canvas or screen: when the bubble fits neither on the right nor on the left of the marker, it opens **under the marker**, shifted and narrowed to stay inside the visible canvas, and above the marker near the bottom edge (spec "Position of the bubble" and guidelines updated).
- **Exception accepted** (token audit): `100vw` and `100vh` in `Comment.css` (`width: min(var(--size-dialog-small), 100vw)`, `max-height: 100vh`) express "the visible canvas" of the spec; no token exists for it.

**What was done**
- `components/Comment/Comment.tsx`, `Comment.css`, `examples.tsx` (10 examples), `playground.tsx`; export in `components/index.ts`; `meta.json` `complete`, `1.0`, changelog entry; backlog B146 `done`.
- Behavior: marker button with `aria-expanded`; bubble group with thread (list of articles), Resolve / Reopen, Close, reply field (TextInput) and Send (disabled while empty); Escape, Close and outside click; focus rules; draft kept; error under the field; polite status messages; flip to the left or upward, or under the marker; the Avatar is the marker, the check of the resolved marker is drawn in Comment until Avatar accepts an icon (B171).
- Accessibility check (`audits/2026-11-22-B146-4-accessibility.md`): 1st run 2 failures (reflow on a narrow screen, repeated status messages), fixed; 2nd run 11 pass, 0 fail. To check by hand: screen reader, 320px and 200% zoom.
- Token audit (`audits/2026-11-22-B146-4-tokens.md`): 0 failure; exception `100vw` / `100vh`.
- Compliance audit: `audits/2026-11-22-B146-4.md` — 67 compliant, 13 non-compliant, 23 not in the design system; no new ticket.

**Files**
- `components/Comment/Comment.tsx`, `Comment.css`, `examples.tsx`, `playground.tsx`, `audits/2026-11-22-B146-4.md`, `audits/2026-11-22-B146-4-accessibility.md`, `audits/2026-11-22-B146-4-tokens.md` (created)
- `components/index.ts`, `components/Comment/meta.json`, `components/Comment/spec.md`, `components/Comment/guidelines.md`, `backlog/backlog.json`, `STEPS.md` (updated)

## Step B130-6 — UX playground page
**Date:** 2026-11-22

**Decisions (made by the Design System Lead)**
- A component is placed **freely** in its frame; the 4 / 8 / 12 column grid is a guide.
- A component can also be placed on the canvas **outside any frame**; moved between frames and the canvas.
- Frames and the sticky note are chosen in the **Library** tab of the panel (also by drag and drop on the canvas); no toolbar.
- Tokens of a placed component are available as soon as it is selected (first section of its panel); the panel opens by itself on a selection.
- **No saving for now** (decided later): compositions are lost on reload.

**What was done**
- New page `#/ux-playground`, Level 2 section of Design system after Projects, and a `design_services` icon button in the header: **Canvas** (pan, zoom with the pinch or Ctrl / Cmd + wheel, Shift + wheel to scroll sideways), **Frame** (mobile, tablet, desktop), **Panel** (Library, Properties, Compositions), **StickyNote**, **Comment** (on a component or a frame, first message written in Properties), **Tabs** (Tokens, Settings, Comments of a selected component).
- Tokens of a placed component, for that component only: another approved token, or a free value marked **Not approved**. `tokenRows` and `tokenVars` are exported from `PlaygroundTab.tsx` and reused.
- The Canvas does not handle the wheel itself yet (its spec says it should): done in the page, a change of the Canvas component would be its own ticket.
- Fix found while testing: the click on a placed component no longer reaches the frame (the frame selected itself again).
- Compliance audit (`ds-compliance-audit`): `audits/2026-11-22-B130-6.md` — 5 new findings (#60–#64) and 2 candidates (Yes / No control, library row); tickets proposed in the chat.
- Verification: type check and build pass; page checked in the browser (add frames and components, move, zoom, tokens, comments, selection).

**Files**
- `audits/2026-11-22-B130-6.md`, `docs/src/pages/PlaygroundPage.tsx` (created)
- `docs/src/App.tsx`, `docs/src/AppShell.tsx`, `docs/src/structure.ts`, `docs/src/docs.css`, `docs/src/PlaygroundTab.tsx`, `STEPS.md` (updated)
- `docs/src/AppShell.tsx` + `docs.css`: a `Login` control in the header, next to the work-time clock — logged out, an IconButton (`login`) opens a Dialog with a password field (plain `<input type="password">`, like the Search field above it: TextInput (B019, not in `main` yet) has no password type anyway) and a "Log in" / "Cancel" footer; logged in, the same spot is a "Log out" IconButton (`logout`).

**Checked**
- `npm run typecheck` and `npm run build`: pass, on this branch (based on `main`, not `develop`).
- The Netlify Functions (outside the project's `tsconfig.json` `include`, so not covered by the commands above) type-check cleanly against their own, equivalent compiler options.
- Local preview (`npm run dev`): the login control opens, the password form submits (fails locally with a generic "Wrong password" — `/api/login` only exists once deployed on Netlify), the Backlog page shows the logged-out note and its menus stay disabled.
- Not run: the `ds-compliance-audit`, `ds-accessibility-audit` and `ds-token-audit` agents (not available in this session) — worth running from the usual Claude Code session once this reaches `develop`.
- Checked once deployed: `GITHUB_TOKEN`, `ADMIN_PASSWORD` and `SESSION_SECRET` set as Netlify environment variables by the Design System Lead (never written here), then a deploy of `main` (direct, since this went straight there) to confirm the login and the live save actually work.
- This same work already exists on `develop` (`project/public-site-login`, merged 2026-11-22, same ticket B168): nothing to redo there at the next release — R3+1 will simply carry `develop`'s other commits forward, past this already-delivered one.

**Files**
- `netlify/functions/login.ts`, `logout.ts`, `session.ts`, `backlog.ts`, `_lib/session.ts`, `_lib/github.ts` (new)
- `netlify.toml`, `docs/src/backlog.ts`, `docs/src/AppShell.tsx`, `docs/src/docs.css`, `docs/src/main.tsx`, `docs/src/pages/BacklogPage.tsx`, `docs/src/pages/ReleasePlanningPage.tsx`, `backlog/backlog.json`, `STEPS.md` (updated)
- `docs/src/auth.tsx` (new)

---

## Step R4-1 — Release R4

**Date:** 2026-11-22

**What was done**
- Release R4, on the Design System Lead's request, ahead of its planned date (2026-12-18), like R2 and R3. `develop` merged into `main` (fast-forward) and tagged `R4`.
- `main` had received B168 on its own (a cherry-pick, then the PR from `release/B168-login`) while `develop` carried the same work, so the two had diverged: `main` was merged into the release branch first. Conflicts in `AppShell.tsx` and `docs.css` solved by keeping `develop`'s version (uses the TextInput); `STEPS.md` and `backlog.json` kept both sides.
- Release note `releases/R4.md`; `npm run work-time` saved `docs/src/work-time.json` (frozen work time of the public site).
- `ds-compliance-audit` on the release: 71 compliant, 16 non-compliant, 25 not in the design system, no new ticket (`audits/2026-11-22-R4.md`).
- `ds-token-audit` on the 28 components: 0 failure; the runtime properties `--ds-canvas-*` and `--ds-panel-width` accepted as an exception by the Design System Lead (`audits/2026-11-22-R4-tokens.md`).

**Files**
- `releases/R4.md`, `audits/2026-11-22-R4.md`, `audits/2026-11-22-R4-tokens.md`, `docs/src/work-time.json`, `STEPS.md`
