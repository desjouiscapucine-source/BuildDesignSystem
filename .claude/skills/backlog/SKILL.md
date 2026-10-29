---
name: backlog
description: Rules of the project backlog (backlog/backlog.json, Backlog page of the documentation site) — the fields of a ticket, how a ticket is created (approval in the chat, priority asked to the Design System Lead), and how its status, stage and iterations change as work progresses. Use whenever a backlog ticket is created, read, updated or closed, and before adding anything to the backlog.
---

# Backlog — tickets and their rules

The tasks still to do live in **`backlog/backlog.json`**, shown and edited on the **Backlog** page of the documentation site (`/docs/#/backlog`); each ticket has its own page, `/docs/#/backlog/<id>`.
Branches, ticket IDs, reservation and commits are in the `git-workflow` skill: this skill covers **what a ticket contains and when it changes**.

## Fields of a ticket

| Field | Values | Notes |
| ----- | ------ | ----- |
| `id` | `B<nnn>` | Next free ID across every branch (`git-workflow`, section 7) |
| `title` | Short title | In English |
| `category` | `Foundations`, `Components`, `Prototypes`, `Skills`, `Tooling` | |
| `status` | `todo` → `in-progress` → `done` (or `rejected`) | |
| `origin` | `decided` (from the Design System Lead) or `proposal` (suggested by Claude, approved in the chat) | |
| `description` | One or two sentences | Can be empty |
| `priority` | `high` / `medium` / `low`, or absent (none) | **Asked at creation** (below); the columns of the Backlog page are sorted by priority |
| `release` | `R1`, `R2`… or absent (not planned) | **Asked at creation**, with the priority; see `release-planning` |
| `stage` | `design` / `guidelines` / `code` | Components only, same value as `meta.json` `status` |
| `prototype`, `iterations` | Folder name; reviews (`feedback` + `decision` `changes-requested` / `validated`) | Prototypes only — see `prototypes/README.md` |

## Create a ticket

1. **No ticket without approval**: every idea or suggestion is asked in the chat first. No proposal is written in the backlog before the Design System Lead agrees.
2. **Ask the priority and the release**: before writing the ticket, ask the Design System Lead its priority — `high`, `medium`, `low` or none — and its release — `R1`, `R2`… with their dates, or not planned (`release-planning`) — with the title and the category of the ticket. Never choose them alone (`never-invent`).
3. Write the ticket with the answers: `priority` and `release` set to the chosen values, or no field when none was chosen. Status `todo` (`in-progress` when work starts on it right away), `origin` `decided` or `proposal`.
4. Reserve the ticket at once (ID, commit, push: `git-workflow`, sections 3 and 7).

## Update a ticket

- Read `backlog/backlog.json` at the start of a session.
- On a branch, change **only the ticket of the branch** (`git-workflow`).
- Status: `in-progress` when work starts, `done` when the work is finished (component complete, prototype validated, governance approved), `rejected` when the Design System Lead drops it.
- Component: `stage` follows the `meta.json` `status` at each approved stage.
- Prototype: one entry in `iterations` per review by the Design System Lead; the last `validated` iteration closes the ticket.
- Changes made by the Design System Lead **on the Backlog page** (approve, reject, status, stage, priority) are saved by the dev server directly in `develop` (`git-workflow`, section 7).

## Releases

Which release delivers a ticket (`release` field, R1, R2…): the **`release-planning`** skill.

## Checklist

- [ ] The Design System Lead agreed in the chat before the ticket was created.
- [ ] The priority and the release were asked, and the ticket has the chosen values (or no field).
- [ ] The ticket ID is free across every branch, and the ticket was reserved at once.
- [ ] Only the ticket of the branch was changed.
