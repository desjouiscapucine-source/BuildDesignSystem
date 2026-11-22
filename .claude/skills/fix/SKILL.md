---
name: fix
description: Light flow for a fix of the documentation site (docs/) — a defect with no effect on components, tokens or guidelines, e.g. a Playground canvas that clips its content. Short ticket, fix/<topic> branch, minimal change, preview, validation, short STEPS entry, no version, no changelog, no compliance audit. Use whenever the Design System Lead reports a defect of the documentation site or asks for a fix; a fix of a component keeps the component flow.
---

# Fix — light flow for the documentation site

Decided by the Design System Lead on 2026-11-22: a light flow for the fixes of the documentation site, **without version and without changelog**.

## 1. What is a fix

- A defect of the **documentation site** (`docs/`: Playground, pages, tooling of the site) that changes nothing for someone who uses a component: nothing in `tokens/`, no component version, no guideline.
- Anything else keeps its own flow: a fix of a component (version + changelog, `component` and `changelog` skills), a new feature of the site (`governance/` or `project/`), a design decision (`never-invent`).
- A fix that turns out to need a component, token or guideline change stops being a fix: tell the Design System Lead and switch to the right flow.

## 2. The flow

1. **Ticket** (`backlog`, `ticket`, `release-planning`): one ticket per fix, short — Goal and Done when are enough. Ask its priority in the chat as for every ticket; the release is optional. Created in `todo`, `origin: decided`.
2. **Branch** `fix/<topic>` (kebab-case, e.g. `fix/playground-frame-width`), from `origin/develop`; ticket in `in-progress` and reserved (`git-workflow` section 3).
3. **Change only what the ticket says**: smallest change that fixes the defect. Anything else found on the way → a question in the chat, never done in this fix. An addition that could change other pages is opt-in (the other pages stay as they are).
4. **Check**: `npm run typecheck`, and the page in the browser — the defect is gone and the neighbouring pages still work. No token audit, accessibility audit or compliance audit for a fix (the compliance audit runs at the release review, `git-workflow` section 8); a fix that changes what a user sees or does (colors, focus, keyboard) runs the `accessibility-check` skill.
5. **Preview before commit** (`CLAUDE.md`): the local link, the Design System Lead validates.
6. **Once validated**: short `STEPS.md` entry (`Step <ticket>-<n>`: date, what was done and why, files), commit (`Step <ticket>-<n>: <short title>`), update from `develop`, merge into `develop` straight away (`git-workflow` sections 5 and 6), ticket `done`, branch deleted.

## 3. Never

- No `version`, no `changelog` entry in any `meta.json`.
- No change in `tokens/`, `components/` (apart from a playground file that only configures the site) or `prototypes/`.
