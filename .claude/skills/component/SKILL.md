---
name: component
description: Main skill for design system components — the entry point for creating, continuing or changing any component (Button, Side navigation…). Routes to the right sub-skill for each stage (design spec, guidelines, code). Use whenever a component is mentioned, started, reviewed or moved to its next stage.
---

# Components — main skill

Every component goes through **three stages, in order**. Each stage has its own sub-skill.
**A component moves to the next stage only after the Design System Lead explicitly approves the current one.**

**Always start with the design**, built from the information the Design System Lead gives; usage questions come after, in the guidelines stage.

**Templates and pages** skip the Guidelines stage: Design → Code (see `component-structure`).

There is **no prototype stage**: interactive mockups (user journeys) are made separately, with the coded components.

| # | Stage | `meta.json` status | Sub-skill | Output |
| - | ----- | ------------------ | --------- | ------ |
| 1 | Design | `design` | `component-spec` | `spec.md` |
| 2 | Guidelines | `guidelines` | `component-guidelines` | `guidelines.md` |
| 3 | Code | `code` | `component-code` | `<Name>.tsx`, `<Name>.css`, `examples.tsx` |

Cross-cutting sub-skills, used at every stage:
- **`component-structure`** — Atomic Design level of the component (atom, molecule, organism, template, page).
- **`never-invent`** — never decide for the Design System Lead; ask.
- **`token-naming`** and **`token-usage`** — which tokens exist and which one to use.
- **`accessibility-check`** — run before asking for approval of any stage.
- **`steps-log`** — log every step in `STEPS.md`.
- **`backlog-management`** — keep `backlog/backlog.json` up to date.

## 1. Before starting

1. Find the component in `backlog/backlog.json`.
   - Status **`proposal`** → stop: it is not approved. Ask the Design System Lead.
   - Not in the backlog → ask whether to add it.
   - Otherwise set its status to `in-progress`.
2. Read `CLAUDE.md` and the `token-naming` skill.
3. If the component folder does not exist yet:
   - Copy `components/_template/` to `components/<Name>/` (PascalCase, e.g. `SideNavigation/`).
   - Rename `ComponentName` everywhere, set `meta.json` (name, description, `level`, `status: "design"`).
   - Use `component-structure` to propose the Atomic Design level, and to **split the component into building blocks** when it is made of repeated elements: each building block is created and completed first.
   - The name, the description, the folder name and the level must be approved by the Design System Lead.

## 2. Find the current stage

Read `components/<Name>/meta.json` → `status`, then **load the sub-skill of that stage** (table above) and follow it.

## 3. End of a stage — approval gate

1. Run `accessibility-check` on what was produced.
2. Show the result to the Design System Lead: in the chat (visual when helpful) and on the component page of the documentation site (`/docs/#/components/<slug>`).
3. Ask for an **explicit approval**. List any open question.
4. Once approved:
   - Set `meta.json` `status` to the next stage.
   - Set the backlog item `stage` to the same value.
   - Log the approval in `STEPS.md` (`steps-log`).
5. If changes are requested: apply them, then go back to step 1 of this gate.

## 4. After the last stage

When the code stage is approved, the component is **complete**:
- Set `meta.json` `status` to **`complete`** (the site shows every stage checked and a Complete badge).
- Set the backlog item status to `done`.
- Export the component from `components/index.ts` (if not already done at the code stage).
- Log it in `STEPS.md`.

## Changing an existing component

- A change to a later stage can impact earlier ones (e.g. a new variant found while coding → update `spec.md` and `guidelines.md` first, and get them approved again).
- Guidelines are updated whenever coding or prototyping reveals a new rule or edge case.
- Token names used by a component never change without approval (`token-naming`, rule 6).
