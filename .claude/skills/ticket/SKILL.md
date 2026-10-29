---
name: ticket
description: How to write a backlog ticket — the ticket template (Goal, Why, Scope, Done when) and the parts expected for each type of ticket (Prototypes: Users, User journey, Components used), the fields they go in, and how the ticket's modal shows them. Use whenever a ticket is written or completed (new ticket, ticket worked on, prototype ticket), together with the `backlog` skill.
---

# Ticket — what a ticket contains

Decided by the Design System Lead on 2026-10-29 (B114, B116).
The `backlog` skill covers the fields of the backlog, the statuses and how a ticket is created and reserved; this skill covers **what is written in a ticket**.

## 1. Template — every ticket

Four parts, in this order:

| Part | Field | What to write |
| ---- | ----- | ------------- |
| Goal | `description` | What the ticket delivers, in one sentence. Shown on the card of the Backlog page. |
| Why | `why` | The need or the problem behind it. |
| Scope | `scope` | What is included — and what is not. |
| Done when | `doneWhen` (array) | The acceptance criteria, one per entry, each one checkable. |

## 2. Parts by type

A type adds its parts to the template. Only the types below have parts of their own; for another type, ask the Design System Lead before adding any (`never-invent`).

### Prototypes (category `Prototypes`)

A prototype is a user journey built with the coded components (`prototypes/README.md`). Its ticket also has:

| Part | Field | What to write |
| ---- | ----- | ------------- |
| Users | `users` | Who the journey is for: the profile of the user and their goal in this journey. |
| User journey | `journey` (array) | The steps of the journey, in order: one screen or one action per step. |
| Components used | `components` (array), `missingComponents` (array) | The design system components the screens use (names as in `@ds/components`); and the components that are missing, to create before or during the prototype (each one gets its own ticket, `component` skill). |

- Also the fields of every prototype ticket (`backlog` skill): `prototype` (folder name) and `iterations` (reviews).
- The ticket says **what** the journey is; the detail of each screen (components and real content) and the final acceptance criteria are in `prototypes/<folder>/spec.md`, written with the Design System Lead before building the screens (`prototype-setup`).

## 3. Writing rules

- In English, short sentences.
- Written by Claude from what the Design System Lead said in the chat. A part that was not said is **asked**, never invented (`never-invent`); a part with nothing to say is left out rather than filled with a guess.
- Tickets created before the template keep their description (the Goal); the other parts are added when the ticket is worked on.
- A ticket's parts change only on the branch of its ticket (`git-workflow`).

## 4. Where a ticket is shown

A click on a ticket of the Backlog page (`/docs/#/backlog`) opens it in a modal (Dialog, `large`, `#/backlog/<id>`):
1. The menus of its card (status, priority, release, stage).
2. Goal, Why — then, for a prototype, Users, User journey, Components used — then Scope, Done when. A part not written yet shows "Not written yet."
3. For a prototype: its specification (`spec.md`) and its iterations.

Built in `docs/src/pages/TicketDialog.tsx`; the fields are typed in `docs/src/backlog.ts`. A new part → add it to both, and to this skill.

## Checklist

- [ ] Goal, Why, Scope and Done when are written, from the chat (missing parts asked).
- [ ] Prototype ticket: Users, User journey and Components used (and missing ones) are written.
- [ ] Nothing was invented: every part comes from the Design System Lead.
