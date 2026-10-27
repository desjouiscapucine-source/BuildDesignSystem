---
name: git-workflow
description: How work is organized with git branches — one branch per piece of work (component, prototype, governance), one folder and one Claude session per branch, the conversations and their usage (Gouvernance, Composant <Name>, Prototype <Name>), steps numbered per backlog ticket, and when and how a branch is merged into main. Use at the start of every task (which branch?), before every commit, and whenever a branch is created, updated from main or merged.
---

# Git workflow

**One piece of work = one branch = one folder = one Claude session.**
`main` holds **approved work only**: nobody works directly on it.

**Everything is automatic: no manual action from the Design System Lead.** Claude picks the branch from the ticket, sets up the folder, commits, updates from `main` and merges. The Design System Lead only describes the task, reviews and approves; never runs a git command, creates a folder or a branch, or names a skill.

## 1. Branches

Every branch is tied to a **backlog ticket** (`backlog/backlog.json`).

| Piece of work | Branch | Lifetime | Merged into `main` |
| ------------- | ------ | -------- | ------------------ |
| Component (new or changed) | `component/<Name>` (PascalCase, e.g. `component/Modal`) | Short | After **each approved stage** (design, guidelines, code) |
| Prototype | `prototype/<folder-name>` (kebab-case, e.g. `prototype/work-description`) | Long | When the Design System Lead **validates** the prototype, or asks for it |
| Governance: backlog, process, skills, `CLAUDE.md`, documentation site, tooling | `governance/<topic>` (kebab-case, e.g. `governance/backlog-process`) | Very short | As soon as the Design System Lead **approves** it |

- Governance is merged first: skills and `CLAUDE.md` guide every other session, so the new rules reach them sooner.
- A task with no ticket (e.g. a quick request in the chat) → add a ticket first (`origin: decided`, since the Design System Lead asked for it), then create its branch.

## 2. Conversations, folders and sessions

All conversations are opened in the same Claude project, `BuildDesignSystem`. Each one is for one kind of work:

| Conversation | Usage | Branch | End |
| ------------ | ----- | ------ | --- |
| **Gouvernance** (one, permanent) | Backlog, process, skills, `CLAUDE.md`, documentation site, tooling | `governance/<topic>`, one topic at a time | Never archived; each topic is merged into `main` as soon as approved |
| **Composant `<Name>`** (one per component) | Design, guidelines and code of one component | `component/<Name>` | Archived once the component is `complete` |
| **Prototype `<Name>`** (one per prototype) | Screens and iterations of one prototype | `prototype/<folder-name>` | Archived once the prototype is validated and merged |

- No conversation works on `main`.
- At the start of a new conversation, Claude names it after the table (e.g. `Composant Modal`).
- A task outside the usage of the conversation → Claude says which conversation to open, and does not start it there.
- **End of a component or a prototype**: once merged and its branch deleted, Claude offers to archive the conversation, and archives it once the Design System Lead agrees (archived, not deleted: the history stays readable and can be restored). A later change to that component → a new `Composant <Name>` conversation, with a new branch from `main`; the decisions are in `spec.md`, `guidelines.md` and `STEPS.md`.

Folders and sessions:
- Each Claude session works in its own folder (git worktree), created automatically by the Claude app, on a branch named `claude/…`. At the start of the task, Claude switches that folder to the branch of the piece of work on its own (section 3), with no question about the name: it follows the table (section 1).
- **Never work on a branch another session is working on.** Before using a branch, check where it is checked out: `git worktree list`. Already checked out in another folder → ask the Design System Lead.
- Never switch branches in a folder another session uses.

## 3. Start a piece of work

1. `git fetch origin`.
2. Find the ticket (status `proposal` → stop, see `CLAUDE.md`).
3. Create the branch from `origin/main` (`git checkout -b <branch> origin/main`, or `git branch -m <branch>` + `git reset --hard origin/main` on a fresh, clean `claude/…` branch) and push it: `git push -u origin <branch>`.
4. On the branch, set the ticket status to `in-progress`.

An existing branch (e.g. a prototype in progress) → continue on it, after updating it from `main` (section 5).

## 4. Steps log and commits — numbered per ticket

- Steps are numbered **per ticket**: `Step <ticket>-<n>`, e.g. `Step B031-1`, `Step B031-2`. `<n>` starts at 1 for each ticket and is the next free number for that ticket in `STEPS.md`. No renumbering, ever.
- Entry title in `STEPS.md`: `## Step B031-2 — <short title>`. Commit message: `Step B031-2: <short title>`.
- Steps written before this rule keep their number (`Step 1` → `Step 169`).
- **Preview before commit** (`CLAUDE.md`): commit and push only once the Design System Lead validates; always on the branch of the piece of work, **never on `main`**.

## 5. Update a branch from `main`

Automatic, at the start of every session on an existing branch and **before every commit**: the branch always gets the latest components and rules from `main`.

1. `git fetch origin`, then `git merge origin/main` on the branch.
2. Resolve conflicts (section 7), check that it runs (`npm run typecheck`, `npm run build`), commit (`Step <ticket>-<n>: main merged into <branch>`) and push.

A branch checked out in another session is updated **by that session**, automatically, at its next commit: never touch another session's folder.

## 6. Merge a branch into `main`

Only at the moments of the table (section 1), once the Design System Lead has approved.

1. Update the branch from `main` (section 5), so the merge into `main` is a fast-forward.
2. `git push origin HEAD:main` — refused if `main` moved meanwhile → go back to step 1.
3. Update the folder where `main` is checked out (found with `git worktree list`), so the local site shows it: `git -C <folder> merge --ff-only origin/main`. Only if that folder has uncommitted changes (`git -C <folder> status --short`) → leave it and tell the Design System Lead.
4. The other branches get the merge on their own, at their next session or commit (section 5).
5. Work finished (component complete, prototype validated, governance approved): the ticket goes to `done` (in the last step, before the merge), then delete the branch: `git push origin --delete <branch>` and `git branch -d <branch>`.

## 7. Shared files and conflicts

- **`STEPS.md`**: several branches append at the end → keep **all** the entries, from both sides, oldest date first. Numbers never collide (section 4).
- **`backlog/backlog.json`**: on a branch, change **only the ticket of the branch**. New tickets may be added (as `proposal`, or `decided` when asked): before choosing an ID, take the highest ID across `origin/main` and every remote branch (`git fetch`, then `git grep -h -o '"id": "B[0-9]*"' $(git branch -r | grep -v HEAD) -- backlog/backlog.json | sort -u | tail -1`), plus one. Conflict → keep both changes.
- Any other conflict on a design system file (token, spec, guidelines, code) → never choose alone: show both versions to the Design System Lead (`never-invent`).
