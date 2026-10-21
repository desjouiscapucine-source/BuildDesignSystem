---
name: prototype-building
description: How to build an interactive mockup (prototype = user journey) with the real React components of the design system — creation steps from the template, screens with Screen and @ds/components, tokens only, sample data, navigation, check and verification. Use whenever a new prototype is started, and when a prototype is built, changed or reviewed in prototypes/.
---

# Prototype building

A prototype is a **user journey**: interactive screens built with the **real React components** of the design system (`@ds/components`).
Templates and pages are separate layout references; a prototype does not use them.

## 1. Before starting

1. Find the prototype in `backlog/backlog.json`.
   - Status **`proposal`** → stop: it is not approved. Ask the Design System Lead.
   - Not in the backlog → ask whether to add it.
   - Otherwise set its status to `in-progress`.
2. **Ask the Design System Lead for the content** (`never-invent`): the journey, its screens, the content of each screen, and the folder name. Never invent screens, flows or copy.
3. List the components the screens need. If one is **not coded yet** (not exported from `components/index.ts`), or a component would be used outside its guidelines, stop and tell the Design System Lead: the component goes through its own stages first (`component` skill).

## 2. Create the prototype

1. Copy `prototypes/_template/` to `prototypes/<prototype-name>/` (kebab-case, e.g. `checkout-flow/`).
2. In `index.html`, set `<title>` to `<Prototype name> — BuildDesignSystem`.
3. Keep `main.tsx` structure:
   - first import: `import "../_shared/setup";` (fonts, tokens, icons, grid, base styles);
   - components: `import { … } from "@ds/components";` only;
   - layout: `import { Screen } from "../_shared/Screen";`;
   - data: `import { sample } from "../_data/sample";` while the real content is not given.
4. Replace the template screens with the screens of the journey.

The prototype appears automatically on `/prototypes/` and in the build.

## 3. Build the screens

| Rule | Detail |
| ---- | ------ |
| **One `Screen` per screen** | `title` (30 characters max) and `subtitle` (80 characters max), one line each (`page-header` skill). |
| **Layout** | Same as the documentation site: 24px page margin, 16px between blocks, at most `size.content` wide (`layout` skill, section Prototypes). Built into `Screen`. |
| **Components only** | Every control and content block is a component from `@ds/components`, used as its guidelines say. No raw HTML controls (`<button>`, `<input>`…) in place of a component. |
| **Tokens only** | Any extra style uses `var(--…)` semantic tokens. No raw color or length, in CSS or in `style={{…}}`. |
| **Navigation** | Between screens with simple React state (`useState`), as in the template. A `Button` with `onClick` moves to the next screen. |
| **Content** | The content given by the Design System Lead. Sample data (`_data/sample.json`) is only a placeholder until then. |
| **Timeline + Cards** | A screen combining them follows the `page-content` skill. |

## 4. Check

1. `npm run check:prototypes` passes (components from `@ds/components` only, no raw values). `npm run build` runs it too.
2. `npm run typecheck` passes.
3. Open `/prototypes/<prototype-name>/`: go through the whole journey, check every screen, the keyboard (Tab, Enter / Space), mobile width, and that the console has no errors.

## 5. Approval

1. Show the journey to the Design System Lead (screenshots in the chat + link to the prototype).
2. Ask for an **explicit approval**; list any open question.
3. Once approved: set the backlog item to `done`.

If building the prototype reveals a new rule or an edge case for a component, update that component's guidelines (`component-guidelines` skill) after asking the Design System Lead.
