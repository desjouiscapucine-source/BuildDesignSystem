---
name: prototype-setup
description: Sets up a new interactive mockup (prototype = user journey) so it runs with the real React components of the design system — backlog item, dedicated git branch (prototype/<folder-name>), folder from the template, title, design system loading, check that it runs. Building the screens afterwards uses the other skills. Use whenever a new prototype is started in prototypes/.
---

# Prototype setup

A prototype is a **user journey**: interactive screens built with the **real React components** of the design system (`@ds/components`).
This skill only **sets up** a new prototype so it runs. The screens are then built with the other skills, dispatched by the `orchestrator` (section 4).

## 1. Before starting

1. Find the prototype in `backlog/backlog.json`.
   - Not in the backlog → ask whether to add it.
2. Ask the Design System Lead for the **prototype name** and its **folder name** (`never-invent`).
3. Create the branch `prototype/<folder-name>` from an up-to-date `develop` and push it to GitHub, **before creating any file** (`git-workflow`). Every step of the prototype is previewed on the local site (`/docs/#/prototypes/<prototype-name>`), then committed and pushed on this branch only once the Design System Lead validates it (`CLAUDE.md`, Git); the branch is merged into `develop` when the Design System Lead validates the prototype, or asks for it, and updated from `develop` before every commit (`git-workflow`).
4. On the branch, set the backlog item status to `in-progress`, its `prototype` field to the folder name and `iterations` to `[]` (see `prototypes/README.md`, Backlog ticket).

## 2. Create the prototype

1. Copy `prototypes/_template/` to `prototypes/<prototype-name>/` (kebab-case, e.g. `checkout-flow/`).
2. In `index.html`, set `<title>` to `<Prototype name> — BuildDesignSystem`.
3. In `spec.md`, set the prototype name in the title. Its sections (Components & content, Acceptance criteria) are written with the Design System Lead (`never-invent`).
4. Keep the imports of `main.tsx`:
   - first import: `import "../_shared/setup";` (fonts, tokens, icons, grid, base styles);
   - components: `import { … } from "@ds/components";` only;
   - layout of each screen: `import { Screen } from "../_shared/Screen";`;
   - placeholder data: `import { sample } from "../_data/sample";`.

The prototype appears automatically on `/prototypes/` and in the build.

## 3. Check that it runs

1. `npm run check:prototypes` passes (components from `@ds/components` only, no raw style values). `npm run build` runs it too.
2. `npm run typecheck` passes.
3. `/prototypes/` lists the new prototype, and `/prototypes/<prototype-name>/` opens the template screens with no console errors.

## 4. Then: build the screens

The setup is done. The screens are built with the other skills, which the `orchestrator` dispatches as the work goes:
- **Content** (journey, screens, copy): asked to the Design System Lead (`never-invent`).
- **Each review** by the Design System Lead: add an iteration to the ticket (`feedback`, `decision`); once `validated`, the ticket goes to `done`.
- **Layout and page header** of each screen: `layout` and `page-header` (built into `Screen`).
- **A screen with a Timeline and Cards**: `page-content`.
- **A component that is missing or used outside its guidelines**: `component`.
