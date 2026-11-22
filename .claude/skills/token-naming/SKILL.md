---
name: token-naming
description: Naming rules for design tokens in this design system. Use whenever a design token is created, renamed, referenced or reviewed — in tokens/primitives.json, tokens/semantic.json, CSS custom properties (--…), component CSS, specs or guidelines — and before proposing any new token name.
---

# Token naming

Every token name follows the rules below. They were approved by the Design System Lead.
If a rule needed for a new token is not written here, **do not invent it**: ask the Design System Lead (see the `never-invent` skill), then add the approved rule to this file.

## General rules

1. **English only.**
2. **Lowercase, kebab-case** for multi-word segments: `neutral-warm`, never `neutralWarm` or `neutral_warm`.
3. **A token name is a path of segments**, from the most general to the most specific: `category.group.variant`.
4. **CSS custom property = the path joined with dashes**, prefixed with `--`:
   `color.primary.600` → `--color-primary-600`
   `color.neutral-warm.200` → `--color-neutral-warm-200`
5. **No raw values in names** (no `--color-795b55`, no `--brown`): names say what the token is, not what it looks like.
6. **Stable names:** a name never changes once used by a component, unless the Design System Lead approves the rename.

## Tiers

| Tier | File | What the name describes | Used by components |
| ---- | ---- | ----------------------- | ------------------ |
| **Primitive** | `tokens/primitives.json` | A raw value in a scale | Never |
| **Semantic** | `tokens/semantic.json` | What the value is used for | Always |

## Primitive color tokens

Pattern: **`color.<palette>.<step>`** → `--color-<palette>-<step>`

**Approved palettes**

| Palette | Description | Key step |
| ------- | ----------- | -------- |
| `primary` | Brown, generated from #412722 | 600 = brand color (#795b55) |
| `secondary` | Light cream, generated from #f5f3bb | 600 = secondary brand color (#f5f3bb) |
| `neutral` | Pure gray | 0 = white (#ffffff) |
| `neutral-warm` | Greige (gray tinted with the secondary hue) | — |
| `success` | Sage green — success feedback | — |
| `warning` | Orange — warning feedback | — |
| `error` | Terracotta red — error feedback | — |
| `info` | Slate blue — info feedback | — |

**Steps:** always the same 11 steps, from lightest to darkest:
`50` · `100` · `200` · `300` · `400` · `500` · `600` · `700` · `800` · `900` · `950`

- A higher number is always darker.
- Every palette uses the full scale — no missing or extra steps.
- **One exception:** `neutral` also has step **`0` = white (#ffffff)** → `--color-neutral-0`. There is no black token: the darkest value is `neutral-950`.
- A new palette name must be approved by the Design System Lead.

## Semantic color tokens

Pattern: **`color.<property>.<role>`** → `--color-<property>-<role>` (structure A: by property, then role).

**Properties:** `text` · `icon` · `background` · `border`

**Approved roles**

| Property | Roles |
| -------- | ----- |
| `text` | `primary`, `secondary`, `disabled`, `inverse`, `link`, `link-hover`, `link-pressed`, `link-visited`, `brand`, `success`, `warning`, `error`, `info` |
| `icon` | Same roles as `text`, except `link-hover`, `link-pressed` and `link-visited` |
| `background` | `page`, `surface`, `subtle`, `inverse`, `disabled`, `overlay`, `brand`, `brand-subtle`, `success-subtle`, `warning-subtle`, `error-subtle`, `info-subtle`, `success`, `warning`, `error`, `info` |
| `border` | `default`, `subtle`, `strong`, `focus`, `focus-inverse`, `success`, `warning`, `error`, `info` |

**States:** there are **no per-role state tokens** (no `.hover`): interactive states use **state layers** (see below).

**One exception — Link** (decided by the Design System Lead on 2026-11-04, B018): a text link changes color instead of using a state layer. Roles `color.text.link-hover` (primary-700), `color.text.link-pressed` (primary-800) and `color.text.link-visited` (primary-800) for a link already visited. Pattern: `<role>-<state>`. Any other exception must be approved.

## State layer tokens

Semantic tier: **`state-layer.<state>`** → `--state-layer-<state>`. The value is the **opacity** of the layer.

| Token | Value | State |
| ----- | ----- | ----- |
| `state-layer.hover` | 0.08 | Mouse hover |
| `state-layer.focus` | 0.12 | Keyboard focus (in addition to the focus outline) |
| `state-layer.pressed` | 0.24 | While clicking or pressing |

- The layer color is the element's **content color** (`currentColor`): white on a dark button, dark on a light surface. There is no state layer color token.
- No other states (dragged, selected…) for now: ask before adding one.

## Font family tokens

Semantic tier only (no primitive): **`font-family.<role>`** → `--font-family-<role>`

| Token | Value |
| ----- | ----- |
| `font-family.heading` | Poppins, system font fallback |
| `font-family.body` | Open Sans, system font fallback |

## Font weight tokens

Semantic tier only: **`font-weight.<name>`** → `--font-weight-<name>`, named by weight name (not number).

| Token | Value | Available for |
| ----- | ----- | ------------- |
| `font-weight.regular` | 400 | Poppins, Open Sans |
| `font-weight.semibold` | 600 | Poppins, Open Sans |
| `font-weight.bold` | 700 | Poppins only |

Never use `bold` with `font-family.body` (Open Sans 700 is not loaded).

## Font size tokens

Semantic tier only: **`font-size.<px>`** → `--font-size-<px>`, named by the size in pixels. Values are in **rem** (1rem = 16px, browser default).

| Usage | Tokens |
| ----- | ------ |
| Text (12 → 24px) | `font-size.12`, `.14`, `.16`, `.18`, `.20`, `.24` |
| Headings (above 24px) | `font-size.28`, `.32`, `.40`, `.48`, `.56` |

- **Base size for body text: 14px** (`font-size.14` = 0.875rem).

## Line height tokens

Semantic tier only: **`line-height.<role>`** → `--line-height-<role>`, unitless ratios.

| Token | Value |
| ----- | ----- |
| `line-height.heading` | 1.2 |
| `line-height.body` | 1.5 |

## Text style tokens

Semantic tier: **`typography.<style>.<property>`** → `--typography-<style>-<property>`
Properties: `family`, `size`, `weight`, `line-height` — each one references a typography token.
Each style also generates a CSS class: **`.ds-text-<style>`**.

| Style | Family | Size | Weight | Line height |
| ----- | ------ | ---- | ------ | ----------- |
| `display-lg` | heading | 56 | bold | heading |
| `display` | heading | 48 | bold | heading |
| `heading-1` | heading | 40 | semibold | heading |
| `heading-2` | heading | 32 | semibold | heading |
| `heading-3` | heading | 28 | semibold | heading |
| `heading-4` | heading | 24 | semibold | heading |
| `heading-5` | heading | 20 | semibold | heading |
| `lead` | body | 18 | regular | body |
| `body-lg` | body | 16 | regular | body |
| `body` | body | 14 | regular | body |
| `body-sm` | body | 12 | regular | body |
| `label` | body | 14 | semibold | body |
| `label-sm` | body | 12 | semibold | body |

## Spacing tokens

Semantic tier: **`space.<px>`** → `--space-<px>`, named by the value in pixels. Values in **px**.

- **8px grid**, from 0 to 64: `space.0`, `.8`, `.16`, `.24`, `.32`, `.40`, `.48`, `.56`, `.64`
- **One half-step exception:** `space.4` (4px), for very small gaps.

## Radius tokens

Semantic tier: **`radius.<px>`** → `--radius-<px>`, named by the value in pixels. Values in **px**.

- On the grid: `radius.0`, `radius.4`, `radius.8`, `radius.16`
- **`radius.full`** = `50%` — a circle on a square element (avatars, round icon buttons). On a rectangle it gives an ellipse, not a pill.

## Border width tokens

Semantic tier: **`border-width.<px>`** → `--border-width-<px>`, named by the value in pixels. Values in **px**.

`border-width.0`, `border-width.1`, `border-width.2`, `border-width.4`

## Shadow tokens

Two tiers:
- **Primitive:** **`shadow.<level>`** → `--shadow-1`, `--shadow-2`, `--shadow-3` (low → high). Neutral color: neutral-950 (#141414) with transparency.
- **Semantic:** named **by usage** (`shadow.<usage>`). Approved: **`shadow.panel`** → `shadow.3` (a panel sliding over the page), **`shadow.dialog`** → `shadow.3` (a Dialog over the page). Ask before creating another usage.

| Primitive | Value |
| --------- | ----- |
| `shadow.1` | `0 1px 2px rgba(20, 20, 20, 0.12)` |
| `shadow.2` | `0 4px 8px rgba(20, 20, 20, 0.14)` |
| `shadow.3` | `0 8px 24px rgba(20, 20, 20, 0.18)` |

## Motion tokens

Semantic tier, named by value:
- **`duration.<ms>`** → `--duration-100`, `--duration-200`, `--duration-300`, `--duration-500`
- **`easing.<curve-name>`** → `--easing-ease-out` (`cubic-bezier(0, 0, 0.2, 1)`), `--easing-ease-in-out` (`cubic-bezier(0.4, 0, 0.2, 1)`)

**Reduced motion (WCAG 2.3.3):** when the user asks the system to reduce motion, every `--duration-*` becomes `0.01ms` (generated automatically in `tokens/tokens.css`). Always animate with the duration tokens so this works.

## Icon size tokens

Semantic tier: **`icon-size.<px>`** → `--icon-size-<px>`, named by the value in pixels. Values in **px**.

`icon-size.16`, `icon-size.20`, `icon-size.24` (default), `icon-size.32`

## Opacity tokens

Semantic tier: **`opacity.<usage>`** → `--opacity-<usage>`, named by usage.

| Token | Value | Usage |
| ----- | ----- | ----- |
| `opacity.disabled` | 0.38 | Disabled elements **on a colored background** (brand, dark). On light backgrounds, use the disabled color roles (`color.*.disabled`). |

## Size tokens

Semantic tier: **`size.<usage>`** → `--size-<usage>`, named by usage. Values in **px**, except `size.sticky-note` (rem, see the table).

| Token | Value | Usage |
| ----- | ----- | ----- |
| `size.side-navigation` | 240px | Width of the side navigation |
| `size.timeline` | 400px | Maximum width of the timeline panel (below desktop) |
| `size.timeline-step-title` | 200px | Minimum width of a timeline step title next to its date range; below it, the date range goes under the title |
| `size.content` | 1040px | Maximum width of the page content, page margins included |
| `size.dialog-small` | 400px | Maximum width of a small Dialog |
| `size.dialog-medium` | 560px | Maximum width of a medium Dialog (default) |
| `size.dialog-large` | 800px | Maximum width of a large Dialog |
| `size.panel` | 320px | Default width of the Panel of the UX playground |
| `size.panel-min` | 280px | Minimum width of the Panel when it is resized |
| `size.panel-max` | 480px | Maximum width of the Panel when it is resized |
| `size.resize-handle` | 24px | Width and height of the hit area of a resize handle (WCAG 2.5.8) |
| `size.sticky-note` | 10rem (160px) | Width and height of a sticky note (StickyNote, fixed square); **in rem**, so the note grows with the text size (WCAG 1.4.4) — decided by the Design System Lead, B145 |

## Breakpoint tokens

Semantic tier: **`breakpoint.<device>`** → `--breakpoint-<device>`, named by device. **Mobile first**: the base style is mobile; a breakpoint is a `min-width`.

| Token | Value | Screen |
| ----- | ----- | ------ |
| (none) | below 768px | Mobile (base style) |
| `breakpoint.tablet` | 768px | Tablet and above |
| `breakpoint.desktop` | 1024px | Desktop and above |

**Documented exception to "no raw values":** CSS cannot use custom properties in media queries, so `@media` rules write the value (`768px` or `1024px`) with a comment naming the token:
```css
/* --breakpoint-desktop (1024px) */
@media (min-width: 1024px) { … }
/* Below desktop */
@media not all and (min-width: 1024px) { … }
```
`npm run tokens` fails if a media query uses any other width.

## Grid tokens

Semantic tier: **`grid.*`** → `--grid-*`. Layout grid, mobile first (see `breakpoint.*`).

| Token | Value | Usage |
| ----- | ----- | ----- |
| `grid.columns.mobile` | 4 | Columns below tablet |
| `grid.columns.tablet` | 8 | Columns from `breakpoint.tablet` |
| `grid.columns.desktop` | 12 | Columns from `breakpoint.desktop` |
| `grid.gutter` | `{space.16}` | Space between columns (and rows) |
| `grid.margin` | `{space.24}` | Space on each side of the grid (= page margin) |

- Columns: `grid.columns.<device>`, using the breakpoint device names. Values are unitless numbers.
- The maximum width of the grid is `size.content` (margins included).
- CSS classes in `tokens/grid.css`: `.ds-grid` (container) and `.ds-grid-span-<1–12>` (width of an item, in columns).

## Z-index tokens

Semantic tier: **`z-index.<usage>`** → `--z-index-<usage>`, named by usage. Scale from **0 (content)** to **100 (tooltips)**, with gaps to insert layers later. Higher = in front.

| Token | Value | Layer |
| ----- | ----- | ----- |
| `z-index.content` | 0 | Content of the page |
| `z-index.sticky` | 10 | Elements stuck while scrolling (site header, fixed timeline) |
| `z-index.navigation` | 20 | Navigation opened over the page (mobile menu) |
| `z-index.overlay` | 30 | Dimmed background and panel (Timeline panel) |
| `z-index.modal` | 40 | Dialog windows |
| `z-index.dropdown` | 50 | List opened over the page and over dialogs (Select list) |
| `z-index.tooltip` | 100 | Tooltips |
| `z-index.skip-link` | 110 | "Skip to content" link, in front of everything |

Never write a raw z-index: always a `--z-index-*` token. A new layer must be approved.

## Not defined yet — ask before naming

These naming patterns have **not** been decided. Ask the Design System Lead before creating any of these tokens:

- **Semantic shadows** — the list of usages.

## Checklist before adding a token

- [ ] The value was given or approved by the Design System Lead.
- [ ] The name follows a pattern listed in this file (otherwise: ask first).
- [ ] English, lowercase, kebab-case.
- [ ] Primitive or semantic tier chosen correctly; components only reference semantic tokens.
- [ ] `npm run tokens` passes (including the contrast check).
- [ ] The new token and its name are logged in `STEPS.md`.
