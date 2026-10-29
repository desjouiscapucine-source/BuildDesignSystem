---
name: release-planning
description: Release planning of the project — the releases R1, R2… (one every two weeks on Friday), how a backlog ticket is linked to a release (release asked when the ticket is created), what is planned without a ticket, tickets carried over to the next release, and the Release planning page. Use whenever a backlog ticket is created, whenever a ticket is planned, moved or removed from a release, and whenever the Design System Lead talks about what a release contains.
---

# Release planning — tickets and releases

Decided by the Design System Lead on 2026-10-29 (B103).
The fields and the life of a ticket are in the `backlog` skill; this skill covers **which release delivers a ticket**.

## 1. Releases

- A **release** is a batch of backlog tickets delivered on a given date: **one every two weeks, on Friday**.
- Named **R1, R2, R3…**: R1 on **2026-11-06**, R2 on 2026-11-20, R3 on 2026-12-04, and so on.
- Calendar in `backlog/backlog.json`, `releases`: `first` (date of R1) and `everyDays` (14). The site computes the dates; nothing to add for a new release.

## 2. Link a ticket to a release

- A ticket is linked with its **`release`** field: `R1`, `R2`… or no field (not planned).
- **When a ticket is created, ask its release** in the chat, together with its priority (`backlog` skill, "Create a ticket"): give the next releases with their dates, e.g. "R1 (Fri 6 Nov), R2 (Fri 20 Nov), R3 (Fri 4 Dec), or not planned?". Write the answer in the ticket; never choose the release alone (`never-invent`).
- Later changes: the Design System Lead uses the **Release** list of the Backlog page (saved directly in `develop`, `git-workflow` section 7), or asks in the chat.

## 3. Planned without a ticket

- What is planned for a release before it has a ticket: plain text, one line per item, in `releases.planned` of `backlog/backlog.json` (`"R1": ["…"]`), written from what the Design System Lead says. Shown at the top of the release card.
- An item whose ticket is still on another branch: write the ticket ID in the line (e.g. "(B100, in progress on its branch)").
- When the item gets its ticket in `develop`, the ticket takes the release and the line is removed.

## 4. Ticket not done on time

- A ticket not done on the date of its release **moves automatically to the next release**: the Release planning page shows it there, marked "carried over from R<n>".
- Its `release` field keeps the original release (the history of the plan).

## 5. Release planning page

`/docs/#/releases` (Governance, after Changelog): one card per release with its date, the planned lines, its tickets sorted by priority with their status and priority, and how many are done. Past releases are folded at the bottom.

## 6. Release day and release note

- On the date of a release, the work approved in `develop` is reviewed with the Design System Lead, then merged into `main` with a tag `R<n>`: the procedure is in `git-workflow`, section 8.
- Every release has a **release note**, `releases/R<n>.md` (template `releases/_template.md`), drafted by Claude from the tickets and the component changelogs, and validated by the Design System Lead during the review: date, tickets delivered by category, component versions, tickets carried over. In English.
- The release note is shown **under its release** on the Release planning page.

## Checklist (new ticket)

- [ ] The release was asked with the priority, and the ticket has the chosen `release` (or no field).
- [ ] A planned line covered by the new ticket was removed.
