---
name: component-code
description: Stage 3 (Code) of a component — how to build the developed version (components/<Name>/<Name>.tsx, <Name>.css, examples.tsx, playground.tsx) from the approved spec: React + TypeScript, semantic tokens only, ds- class naming, state layers, accessibility, examples and verification. Use when a component's meta.json status is "code", when the `orchestrator` skill dispatches here, or when component code is written, reviewed or changed.
---

# Component code — Stage 3: Code

Build the **developed version** of the component from the **approved** spec and guidelines.
Output: `components/<Name>/<Name>.tsx`, `<Name>.css`, `examples.tsx`, `playground.tsx`, and the export in `components/index.ts`.

## Rules

- **The approved spec is the source of truth**: `spec.md` + `design/tokens.json` (and `guidelines.md` for behavior). Code exactly what was approved.
  - If coding reveals a gap (missing state, impossible combination, edge case): **stop**, propose the change to the Design System Lead, update and re-approve the spec / guidelines first (`never-invent`).
- **Semantic tokens only** (`token-naming`): every visual value is `var(--…)` of a semantic token. **Never** a raw value (no `#795b55`, no `13px`) and **never** a primitive token.
  - The only literals allowed are structural: `0`, `100%`, `auto`, `none`, `inherit`, `currentColor`. Border widths always use `--border-width-*`.
- `design/Preview.tsx` is a mock-up: **do not import it** in the component. The component is written from scratch.
- English only (code, comments, prop names).

## Files

| File | Content |
| ---- | ------- |
| `<Name>.tsx` | The React component and its props type. |
| `<Name>.css` | All styles of the component. |
| `examples.tsx` | Live examples shown in the **Examples** tab of the documentation site. |
| `playground.tsx` | The component live with a control per prop, shown in the **Playground** tab (B111). |
| `components/index.ts` | `export { <Name> } from "./<Name>/<Name>";` (+ the props type). |

Start from `components/_template/` (`ComponentName.tsx`, `ComponentName.css`, `examples.tsx`, `playground.tsx`).

## CSS class naming (approved)

| What | Format | Example |
| ---- | ------ | ------- |
| Component | `ds-<component>` (kebab-case) | `.ds-button`, `.ds-side-navigation` |
| Variant value (modifier) | `ds-<component>--<value>` (BEM modifier) | `.ds-button--primary`, `.ds-button--md` |
| Internal part | `ds-<component>-<part>` (single dash) | `.ds-button-icon`, `.ds-button-label` |

- One modifier class per variant property value, always added (including the default value).
- States are **not** classes when a native state exists: use `:hover`, `:focus-visible`, `:active`, `:disabled` / `[aria-disabled="true"]`, `[aria-selected]`, `[aria-current]`, `[aria-invalid]`.

## React / TypeScript

- Function component, named export, props type `<Name>Props`.
- **Prop names = approved variant property names; prop values = approved values** (TypeScript string unions). **Defaults = approved defaults.**
- Forbidden combinations: prevent them with the types when possible; otherwise document them in the props comment.
- Content props follow the approved Content section (required / optional texts).
- Use the **right native element** (`<button>` for an action, `<a href>` for navigation, `<input>`…), and pass native attributes through (`...rest`) and `className` (appended after the `ds-` classes).
- No inline styles for visual values; everything is in `<Name>.css`.
- Icons: `<span className="ds-icon" aria-hidden="true">name</span>` with an approved `--icon-size-*`.

## Styles

- **Interaction states with state layers**: an `::after` overlay in the content color:
  ```css
  .ds-<component> { position: relative; }
  .ds-<component>::after {
    content: ""; position: absolute; inset: 0; border-radius: inherit;
    background: currentColor; opacity: 0; pointer-events: none;
    transition: opacity var(--duration-100) var(--easing-ease-out);
  }
  .ds-<component>:hover::after { opacity: var(--state-layer-hover); }
  .ds-<component>:focus-visible::after { opacity: var(--state-layer-focus); }
  .ds-<component>:active::after { opacity: var(--state-layer-pressed); }
  ```
  (Use the durations and easings approved in the spec.)
- **Focus**: always visible — `outline: var(--border-width-2) solid var(--color-border-focus)` on `:focus-visible` (or the variant approved in the spec when the background is the brand color).
- **Disabled**: the disabled roles; no state layer on a disabled component.
- **Motion**: only `--duration-*` and `--easing-*` tokens (reduced motion is then automatic).
- **Text**: the approved text styles (`--typography-<style>-*` variables or `.ds-text-<style>` classes).
- Overflow behavior exactly as the Content section (wrap, ellipsis, line clamp).
- No `!important`.
- **Responsive: mobile first.** Media queries use `min-width` with the breakpoint values only (`768px` tablet, `1024px` desktop) and a comment naming the token — the only raw values allowed (`token-naming`).

## Accessibility (WCAG 2.2 AA)

- Keyboard behavior, focus order, accessible name, role and states exactly as in the guidelines' Accessibility section.
- Icon-only controls have an accessible name (`aria-label`).
- Interactive targets at least 24×24px.

## Examples (`examples.tsx`)

- One example per **allowed combination** of the variant matrix, plus **disabled** and component-specific states.
- Content examples: short, long and very long text (overflow behavior).
- Each example has a title (and a one-line description when useful).

## Playground (`playground.tsx`)

Once a component is coded (`meta.json` status `code` or `complete`), the **Playground** tab shows it live, like Storybook (B111). During the Code stage, the Design preview tab stays next to it (to check the code against the design); once the component is `complete`, the Playground replaces it:
- A **canvas**: the component live, in an iframe (`docs/playground.html`) at the chosen screen width — Mobile 375px, Tablet 768px, Desktop 1024px — so media queries are the real ones. Wider than the page: shown scaled down.
- The **controls** under the canvas: one row per prop (name, description, control), and a **Reset** button.
- The **Tokens** section: every token used in the component's CSS (text styles grouped), each with a menu to try another token of its family in the canvas. To try only: nothing is saved; a change of the component is asked in the chat (`never-invent`). Built automatically from `<Name>.css`.
- The **JSX code** of the component with the values of the controls, with a Copy button.

`playground.tsx` exports `playground = definePlayground({ controls, render, code })` (`docs/src/playground.ts`):
- `controls`: one entry per prop, keyed by the prop name, in the order of the table. Types: `text`, `boolean`, `select` (`options`), `number` (`min`, `max`), `date` (ISO string), `icon` (every Material Symbols icon in a dropdown list showing each icon, `docs/src/IconSelect.tsx` + `docs/src/material-symbols.json`; `optional: true` offers "None"). Each has a `default` and a `description` (the prop's description from the props type).
- `render(args)`: the component with the values. Content comes from the approved examples (`never-invent`). A component that needs a context (a list, the brand background) is wrapped as in its examples.
- `code(args)`: the JSX with `jsx(name, props, children)` — empty and `false` props are left out; `code("images")` writes a prop as code (`images={images}`).
- `minHeight` (px): for a component that opens over the page (viewer, panel).

## Verification

1. `npx tsc --noEmit` passes.
2. `npm run build` passes.
3. Open the component page (`/docs/#/components/<slug>`): check the **Examples** tab against the approved spec and design preview — same tokens, same look. Check the **Playground** tab: every control changes the canvas and the code, at the three screen sizes.
4. Check with the keyboard (Tab, Shift+Tab, Enter / Space, arrows if any) and at mobile width.

## Approval gate

Hand back to the `component` skill (approval gate): show the Examples tab (screenshots in the chat), list any difference with the spec, and ask for explicit approval of stage 3.
