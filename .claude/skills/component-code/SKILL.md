---
name: component-code
description: Stage 3 (Code) of a component — how to build the developed version (components/<Name>/<Name>.tsx, <Name>.css, examples.tsx) from the approved spec: React + TypeScript, semantic tokens only, ds- class naming, state layers, accessibility, examples and verification. Use when a component's meta.json status is "code", when the `orchestrator` skill dispatches here, or when component code is written, reviewed or changed.
---

# Component code — Stage 3: Code

Build the **developed version** of the component from the **approved** spec and guidelines.
Output: `components/<Name>/<Name>.tsx`, `<Name>.css`, `examples.tsx`, and the export in `components/index.ts`.

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
| `components/index.ts` | `export { <Name> } from "./<Name>/<Name>";` (+ the props type). |

Start from `components/_template/` (`ComponentName.tsx`, `ComponentName.css`, `examples.tsx`).

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

## Verification

1. `npx tsc --noEmit` passes.
2. `npm run build` passes.
3. Open the component page (`/docs/#/components/<slug>`): check the **Examples** tab against the **Design preview** tab — same tokens, same look.
4. Check with the keyboard (Tab, Shift+Tab, Enter / Space, arrows if any) and at mobile width.

## Approval gate

Hand back to the `component` skill (approval gate): show the Examples tab (screenshots in the chat), list any difference with the spec, and ask for explicit approval of stage 3.
