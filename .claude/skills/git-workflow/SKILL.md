---
name: git-workflow
description: How work is organized with git branches — two branch types (governance, component — prototypes included), one folder and one Claude session per branch, the conversations and their usage (Gouvernance, Composant <Name>), steps numbered per backlog ticket, when and how a branch is merged into develop, and the release (review, develop merged into main, tag, release note). Use at the start of every task (which branch?), before every commit, whenever a branch is created, updated from develop or merged, and on release day.
---

# Git workflow

**One piece of work = one branch = one folder = one Claude session.**
Decided by the Design System Lead on 2026-10-29 (B107):

```
component/…  ─┐
              ├──▶ develop ──(release R<n>, after review)──▶ main  + tag R<n> + release note
governance/… ─┘   (approved work, waiting for its release)
```

- **`develop`** (permanent) receives the approved work of every piece of work, during the two weeks of a release.
- **`main`** holds **released work only**: it changes only on release day (section 8).
- Nobody works directly on `develop` or `main`.

**Everything is automatic: no manual action from the Design System Lead.** Claude picks the branch from the ticket, sets up the folder, commits, updates from `develop`, merges and prepares the release. The Design System Lead only describes the task, reviews and approves; never runs a git command, creates a folder or a branch, or names a skill.

## 1. Branches

Every branch is tied to a **backlog ticket** (`backlog/backlog.json`). **Two branch types only** (B110): `governance/…` and `component/…` — a prototype is worked on a `component/` branch.

| Piece of work | Branch | Lifetime | Merged into `develop` |
| ------------- | ------ | -------- | ------------------ |
| Component (new or changed) | `component/<Name>` (PascalCase, e.g. `component/Modal`) | Short | After **each approved stage** (design, guidelines, code) |
| Prototype (screens, iterations, fixes) | `component/<prototype-folder>` (the folder name, kebab-case, e.g. `component/work-description`) | Long | When the Design System Lead **validates** the prototype, or asks for it |
| Governance: backlog, process, skills, `CLAUDE.md`, documentation site, tooling | `governance/<topic>` (kebab-case, e.g. `governance/backlog-process`) | Very short | As soon as the Design System Lead **approves** it |

- Governance is merged first: skills and `CLAUDE.md` guide every other session, so the new rules reach them sooner.
- A task with no ticket (e.g. a quick request in the chat) → add a ticket first (`origin: decided`, since the Design System Lead asked for it), then create its branch.

## 2. Conversations, folders and sessions

All conversations are opened in the same Claude project, `BuildDesignSystem`. Each one is for one kind of work:

| Conversation | Usage | Branch | End |
| ------------ | ----- | ------ | --- |
| **Gouvernance** (one, permanent) | Backlog, process, skills, `CLAUDE.md`, documentation site, tooling | `governance/<topic>`, one topic at a time | Never archived; each topic is merged into `develop` as soon as approved |
| **Composant `<Name>`** (one per component, or per prototype) | Design, guidelines and code of one component — or the screens and iterations of one prototype (e.g. `Composant WorkDescription`) | `component/<Name>`, or `component/<prototype-folder>` | Archived once the component is `complete`, or the prototype validated and merged |

- No conversation works on `develop` or `main` directly. Release day (section 8) is run from the **Gouvernance** conversation.
- At the start of a new conversation, Claude names it after the table (e.g. `Composant Modal`).
- A task outside the usage of the conversation → Claude says which conversation to open, and does not start it there.
- **End of a component or a prototype**: once merged and its branch deleted, Claude offers to archive the conversation, and archives it once the Design System Lead agrees (archived, not deleted: the history stays readable and can be restored). A later change to that component → a new `Composant <Name>` conversation, with a new branch from `develop`; the decisions are in `spec.md`, `guidelines.md` and `STEPS.md`.

Folders and sessions:
- Each Claude session works in its own folder (git worktree), created automatically by the Claude app, on a branch named `claude/…`. At the start of the task, Claude switches that folder to the branch of the piece of work on its own (section 3), with no question about the name: it follows the table (section 1).
- **Never work on a branch another session is working on.** Before using a branch, check where it is checked out: `git worktree list`. Already checked out in another folder → ask the Design System Lead.
- Never switch branches in a folder another session uses.
- **Say the branch** (B109): at the start of every task and in every message that asks for a validation, Claude gives the branch it works on, e.g. "Branch: `governance/release-planning` (from `develop`)" — or "no branch" between two topics. On a fresh `claude/…` branch, Claude renames it (`git branch -m <branch>`, section 3) so the Claude app shows the real branch.
- The **Branches** page (`/docs/#/branches`, Governance) lists every branch with its conversation, folder, ticket and position against `develop`, and what `develop` adds to `main` (the next release).
- The root folder of the project (`BuildDesignSystem/`) stays on **`develop`** and is never used to work: only updated after each merge (section 6). The Claude app reads the skills (the `/` commands) from it, so new rules reach every conversation at once, without waiting for the release.

## 3. Start a piece of work

1. `git fetch origin`.
2. Find the ticket. No ticket → ask in the chat first; once the Design System Lead agrees, ask its priority and its release and create it in `todo` (section 7, `backlog` and `release-planning` skills).
3. Create the branch from `origin/develop`: on a fresh, clean `claude/…` branch, **rename it** (`git branch -m <branch>` + `git reset --hard origin/develop`) so the Claude app shows the real branch; otherwise `git checkout -b <branch> origin/develop` and push it: `git push -u origin <branch>`.
4. On the branch, set the ticket status to `in-progress`.
5. **Reserve the ticket at once**: commit `backlog/backlog.json` alone and push it on the branch, before any other work (commit message `Ticket <id> reserved: <title>`). Other conversations then see the ID (section 7). This is the only commit made before the Design System Lead validates, and it has no `STEPS.md` entry.

An existing branch (e.g. a prototype in progress) → continue on it, after updating it from `develop` (section 5).

## 4. Steps log and commits — numbered per ticket

- Steps are numbered **per ticket**: `Step <ticket>-<n>`, e.g. `Step B031-1`, `Step B031-2`. `<n>` starts at 1 for each ticket and is the next free number for that ticket in `STEPS.md`. No renumbering, ever.
- Entry title in `STEPS.md`: `## Step B031-2 — <short title>`. Commit message: `Step B031-2: <short title>`.
- Steps written before this rule keep their number (`Step 1` → `Step 169`).
- **Preview before commit** (`CLAUDE.md`): commit and push only once the Design System Lead validates; always on the branch of the piece of work, **never on `develop` or `main`**.
- **Compliance audit after each approved step** (B119): once the Design System Lead validates a step, before its commit, Claude runs the `ds-compliance-audit` agent (`.claude/agents/ds-compliance-audit.md`) with the previous report, checks its result, writes it to `audits/<YYYY-MM-DD>-<ticket>-<n>.md` (e.g. `audits/2026-10-29-B119-1.md`) and **shows in the chat** the summary (counts, fixed / new since the previous audit) and **every non-compliant element** (page, element, where, finding, suggested fix). The report is committed with the step. Findings are not fixed in that step. The report ends with **proposed tickets** (findings grouped, existing tickets extended rather than duplicated): Claude shows them in the chat and asks the Design System Lead to agree, with a priority and a release for each (`backlog`, `release-planning`); approved tickets are created in `todo` (`origin: proposal`), reserved and merged into `develop` (section 7). Candidate components are questions, never tickets proposed by the agent.
- **Implementing a compliance ticket** (B128), in its own `governance/<topic>` branch and session like any piece of work:
  1. Ask the Design System Lead every decision listed in the ticket (`never-invent`); no answer → no fix.
  2. Run the `ds-compliance-fix` agent (`.claude/agents/ds-compliance-fix.md`) with the ticket, its findings and the decisions. It changes `docs/` only and never runs git.
  3. Check its changes (`git diff`; nothing outside `docs/`), handle its blockers yourself once the Design System Lead agrees (a token, a contrast pair, a component change → their own skills and approval), and ask its questions.
  4. Re-run `ds-compliance-audit`: the ticket's findings must be gone, with no new one.
  5. Give the Design System Lead the local preview (preview before commit). Once validated: `STEPS.md`, commit, audit report, merge (as for any step).

## 5. Update a branch from `develop`

Automatic, at the start of every session on an existing branch and **before every commit**: the branch always gets the latest components and rules from `develop`.

1. `git fetch origin`, then `git merge origin/develop` on the branch.
2. Resolve conflicts (section 7), check that it runs (`npm run typecheck`, `npm run build`), commit (`Step <ticket>-<n>: develop merged into <branch>`) and push.

A branch checked out in another session is updated **by that session**, automatically, at its next commit: never touch another session's folder.

## 6. Merge a branch into `develop`

Only at the moments of the table (section 1), once the Design System Lead has approved.

1. Update the branch from `develop` (section 5), so the merge into `develop` is a fast-forward.
2. `git push origin HEAD:develop` — refused if `develop` moved meanwhile → go back to step 1.
3. Update the **root folder** of the project (`BuildDesignSystem/`, the first line of `git worktree list`), which always stays on `develop`: `git -C <root> merge --ff-only origin/develop`. The Claude app reads the project skills (the `/` commands) from this folder, so it must have the latest `develop`. Only if it has uncommitted changes (`git -C <root> status --short`) → leave it and tell the Design System Lead. No other folder holds `develop`.
4. **Show `develop`**: open the documentation site in the browser pane, served from the latest `develop` (the folder of the session, now at `origin/develop`), on the page that changed. Each conversation serves the site of its own branch, so this is the reliable view of `develop`; the Design System Lead runs nothing.
5. The other branches get the merge on their own, at their next session or commit (section 5).
6. Work finished (component complete, prototype validated, governance approved): the ticket goes to `done` (in the last step, before the merge), then delete the branch: `git push origin --delete <branch>` and `git branch -d <branch>`.

## 7. Shared files and conflicts

- **`STEPS.md`**: several branches append at the end → keep **all** the entries, from both sides, oldest date first. Numbers never collide (section 4).
- **`backlog/backlog.json`**: on a branch, change **only the ticket of the branch**. New tickets are added only once the Design System Lead agreed in the chat and chose the priority and the release (`backlog`, `release-planning`), in `todo` (`origin` `decided`, or `proposal` when Claude suggested it): before choosing an ID, take the highest ID across `origin/develop`, `origin/main` and every remote branch (`git fetch`, then `git grep -h -o '"id": "B[0-9]*"' $(git branch -r | grep -v HEAD) -- backlog/backlog.json | sort -u | tail -1`), plus one. A new ticket is **reserved at once** (section 3, step 5): commit and push it on the branch right away, then `git fetch` and check again that no other branch uses the same ID. Used meanwhile → take the next free ID and push again. Conflict → keep both changes.
- **Changes made on the Backlog page** (status, stage, priority, release, by the Design System Lead): the dev server saves them **directly in `develop`** — committed in the root folder (`Backlog: <id> <change> (Design System Lead, Backlog page)`) and pushed — and in the folder that serves the page. Like the reservation of a ticket, no `STEPS.md` entry. If it cannot (root folder not clean or not on `develop`, ticket not in `develop` yet), the page says so and the change stays in the serving folder only: commit it with the work of the branch.
- Any other conflict on a design system file (token, spec, guidelines, code) → never choose alone: show both versions to the Design System Lead (`never-invent`).

## 8. Release day

On the date of a release (`release-planning`), in the **Gouvernance** conversation. `main` changes only here.

1. **Prepare**: `git fetch origin`; list what `develop` adds to `main` since the previous release: `git log --oneline origin/main..origin/develop` (commits), `git diff --stat origin/main origin/develop` (files), the tickets of the release and their status, the new component versions (`changelog`); run the `ds-compliance-audit` agent on `origin/develop` and write its checked report to `audits/<YYYY-MM-DD>-R<n>.md` on the release-note branch, and show its non-compliant elements in the chat.
2. **Release note**: draft `releases/R<n>.md` on a `governance/release-R<n>` branch (template `releases/_template.md`): date, tickets delivered by category, component versions, tickets carried over to the next release. In English.
3. **Review**: show the Design System Lead the commits, the files changed, the tickets, the compliance audit and the release note (preview on the Release planning page). Changes requested → fix them on their own branches first, merged into `develop` as usual.
4. Once the Design System Lead **validates the release**: merge the release-note branch into `develop` (section 6), then:
   - `git push origin origin/develop:main` — a fast-forward: `main` only ever receives `develop`.
   - `git tag R<n> origin/main` and `git push origin R<n>`.
5. The release is logged in `STEPS.md` in the release-note commit, numbered after the release (no ticket): `## Step R<n>-1 — Release R<n>`, commit `Step R<n>-1: Release R<n>`. Then show the release on the Release planning page (served from `main`).
6. A ticket not done on release day stays on its branch (or in `develop` if already approved) and is carried over to the next release (`release-planning`).
