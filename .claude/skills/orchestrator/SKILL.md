---
name: orchestrator
description: Parent of all the project skills — the entry point of every task in this design system. Reads the task and dispatches it to the child skills to load (component lifecycle and stages, Atomic Design structure, token naming, never-invent, layout, page header, page content, prototype building). Use at the start of every task, before any other project skill, and again whenever the task changes.
---

# Orchestrator — parent of all skills

Every task starts here. This skill **only dispatches**: it says which child skills to load. The rules themselves live in the children.

## How to dispatch

1. Read the task.
2. Go through the table below and **load every child skill whose trigger matches** — several often apply together (e.g. a component spec that names tokens → `component` + `component-spec` + `token-naming` + `never-invent`).
3. Follow the loaded children.
4. When the task changes (new stage, new kind of work), dispatch again.

## Dispatch table

| Trigger | Child skill |
| ------- | ----------- |
| Any component task: create, continue, review, change, approve a stage | `component` (lifecycle and approval gate) + the stage skill below |
| Component `meta.json` status is `design`, or its spec / design preview is created or changed | `component-spec` |
| Component status is `guidelines`, or its guidelines are created or updated | `component-guidelines` |
| Component status is `code`, or its code / examples are written or changed | `component-code` |
| Component status is `complete` and it changes | the stage skill of every stage the change touches |
| New component, classification, a component that uses other components | `component-structure` |
| A design token is created, renamed, referenced or reviewed | `token-naming` |
| Any design decision: value, name, palette, anatomy, variant, state, guideline, behavior, content | `never-invent` |
| A page, screen or section is laid out (docs site, templates, pages, prototypes) | `layout` |
| A page title or subtitle, or a component description in `meta.json` | `page-header` |
| A page, template, screen or example combining a Timeline and Cards | `page-content` |
| A prototype (user journey) is started, built, changed or reviewed in `prototypes/` | `prototype-building` |

No trigger matches → follow `CLAUDE.md` only.

## Maintaining this table

- Every skill of the project is a child of this one: a **new skill gets a row** here when it is created; a removed or renamed skill is updated here too.
- Child skills do not dispatch to each other: dispatching happens only here.
