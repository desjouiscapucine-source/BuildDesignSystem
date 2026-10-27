---
name: component
description: Lifecycle of a design system component — the three stages in order, what to do before starting, the approval gate at the end of each stage, and what to do once the component is complete. Use whenever a component (Button, Side navigation…) is created, continued, changed, reviewed or moved to its next stage; dispatched by the `orchestrator` skill together with the skill of the current stage.
---

# Components — lifecycle

Every component goes through **three stages, in order**. Each stage has its own skill, loaded by the `orchestrator` skill.
**A component moves to the next stage only after the Design System Lead explicitly approves the current one.**

**Always start with the design**, built from the information the Design System Lead gives; usage questions come after, in the guidelines stage.

**Templates and pages** skip the Guidelines stage: Design → Code (see `component-structure`).

There is **no prototype stage**: interactive mockups (user journeys) are made separately, with the coded components.

| # | Stage | `meta.json` status | Stage skill | Output |
| - | ----- | ------------------ | --------- | ------ |
| 1 | Design | `design` | `component-spec` | `spec.md` |
| 2 | Guidelines | `guidelines` | `component-guidelines` | `guidelines.md` |
| 3 | Code | `code` | `component-code` | `<Name>.tsx`, `<Name>.css`, `examples.tsx` |

Cross-cutting skills, used at every stage (dispatched by `orchestrator`):
- **`component-structure`** — Atomic Design level of the component (atom, molecule, organism, template, page).
- **`never-invent`** — never decide for the Design System Lead; ask.
- **`token-naming`** — which tokens exist and how they are named.

## 1. Before starting

1. Find the component in `backlog/backlog.json`.
   - Status **`proposal`** → stop: it is not approved. Ask the Design System Lead.
   - Not in the backlog → ask whether to add it.
   - Otherwise work on the branch `component/<Name>` (create it, or update it from `main`: `git-workflow`) and set its status to `in-progress`.
2. Read `CLAUDE.md` and the `token-naming` skill.
3. If the component folder does not exist yet:
   - Copy `components/_template/` to `components/<Name>/` (PascalCase, e.g. `SideNavigation/`).
   - Rename `ComponentName` everywhere, set `meta.json` (name, description, `level`, `status: "design"`).
   - Use `component-structure` to propose the Atomic Design level, and to **split the component into building blocks** when it is made of repeated elements: each building block is created and completed first.
   - The name, the description, the folder name and the level must be approved by the Design System Lead.

## 2. Find the current stage

Read `components/<Name>/meta.json` → `status`: it tells which stage skill applies (table above). The `orchestrator` skill dispatches to it.

## 3. End of a stage — approval gate

1. Show the result to the Design System Lead: in the chat (visual when helpful) and on the component page of the documentation site (`/docs/#/components/<slug>`).
2. Ask for an **explicit approval**. List any open question.
3. Once approved:
   - Set `meta.json` `status` to the next stage.
   - Set the backlog item `stage` to the same value.
   - Log the approval in `STEPS.md`, commit and push on `component/<Name>`, then merge it into `main` (`git-workflow`).
4. If changes are requested: apply them, then go back to step 1 of this gate.

## 4. After the last stage

When the code stage is approved, the component is **complete**:
- Set `meta.json` `status` to **`complete`** (the site shows every stage checked and a Complete badge).
- Set the backlog item status to `done`.
- Export the component from `components/index.ts` (if not already done at the code stage).
- Log it in `STEPS.md`, commit, merge `component/<Name>` into `main`, then delete the branch and offer to archive the conversation (`git-workflow`).

## Changing an existing component

- A change to a later stage can impact earlier ones (e.g. a new variant found while coding → update `spec.md` and `guidelines.md` first, and get them approved again).
- Guidelines are updated whenever coding or prototyping reveals a new rule or edge case.
- Token names used by a component never change without approval (`token-naming`, rule 6).
