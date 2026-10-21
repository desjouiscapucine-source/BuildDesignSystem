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

## Step 145 — Every card can reach the top of the screen
**Date:** 2026-10-21

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

## Step 146 — main merged into prototype/work-description
**Date:** 2026-10-21

**Decisions (made by the Design System Lead)**
- See the WorkDescription prototype in dedicated preview frames (mobile, tablet, desktop), like Figma previews: bring Steps 140–144 of `main` (preview pages, prototype tickets) onto the prototype branch.

**What was done**
- Merged `origin/main` into `prototype/work-description`. One conflict, in `STEPS.md` (both branches had appended steps): resolved by keeping every entry, in step order (the two Step 140 entries are both kept).
- Verification: `npm run typecheck` and `npm run build` pass (prototypes check included). In the browser, `/docs/#/prototypes/work-description` shows the prototype in the 3 frames (Mobile 375px, Tablet 768px, Desktop 1280px), with the timeline icon button on mobile and tablet and the timeline on the right on desktop; Show grid draws 4 / 8 / 12 columns; no console errors. This is the first check of the Step 143 preview page in the browser.

**Files**
- Merge of `main` (see Steps 140, 142–144); `STEPS.md` (updated)
