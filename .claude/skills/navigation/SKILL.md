---
name: navigation
description: Navigation structure of the site — the navigation levels (Level 0 landing page to Level 4 component pages), where each page sits, and the navigation principles (logo, breadcrumb, depth and modals, anchors and timeline inside a page). Use whenever a page or a space is added, moved or removed, when the side navigation or the landing page changes, when a link goes deeper than Level 3, or when the logo, a breadcrumb, a modal or in-page navigation is built.
---

# Navigation

Approved by the Design System Lead on 2026-10-27. Shown on the **Navigation structure** page of the documentation site (`/docs/#/navigation`, `docs/src/pages/NavigationPage.tsx`).

The site follows this structure since B087 (2026-10-27), has the breadcrumb since B091 (2026-10-28), and opens the Backlog tickets in a modal since B114 (2026-10-29). Built from `docs/src/structure.ts`, which drives the header, the side navigation and the search.

## 1. Levels

Talk about the navigation in levels. **Level 0** is the landing page.

| Level | Content |
| ----- | ------- |
| **Level 0** | Landing page |
| **Level 1** | Spaces: Documentation, Portfolio |
| **Level 2** | Sections of a space: Overview, Governance, Foundations, Components, Prototypes, Navigation |
| **Level 3** | Pages of a section (e.g. one prototype), or categories of components |
| **Level 4** | Component pages only |

## 2. Structure

```
Level 0   Landing page
Level 1   ├── Documentation               → opens on Overview
Level 2   │   ├── Overview                (content: Description + Summary)
Level 2   │   ├── Governance
Level 3   │   │   ├── Backlog             (a ticket opens in a modal)
Level 3   │   │   ├── How to use skills
Level 3   │   │   ├── Git workflow        (organization diagram, link to the git-workflow skill)
Level 3   │   │   ├── Branches            (every branch, its conversation, the next release)
Level 3   │   │   ├── Changelog           (every version of every component)
Level 3   │   │   └── Release planning    (the tickets of each release)
Level 2   │   ├── Foundations             (one page per category)
Level 3   │   │   └── Color · Typography · Spacing · Radius · Border width · Shadows · Motion
          │   │       Opacity · Size · Breakpoints · Layout grid · Z-index · Icons
Level 2   │   ├── Components              (one category per Atomic Design level)
Level 3   │   │   ├── Atoms · Molecules · Organisms · Templates · Pages
Level 4   │   │   └── one page per component, with its tabs
Level 2   │   ├── Prototypes
Level 3   │   │   └── one page per prototype
Level 2   │   └── Navigation              (Navigation structure page)
Level 1   └── Portfolio
```

- Overview: Description and Summary are the **content** of the page, not navigation levels.
- Components: each category lists the components of its level (`level` in `meta.json`, see `component-structure`).

## 3. Navigation principles

| Principle | Rule |
| --------- | ---- |
| **Back to Level 0** | The site logo goes back to the landing page, from every level. |
| **Go back** | A breadcrumb shows where the page sits in the structure and goes back to any level above it. |
| **Depth** | Level 3 is the deepest level, except component pages (Level 4). The detail of a Level 3 page (e.g. a ticket from the Backlog) opens in a modal, not in a new page. |
| **Inside a page** | Anchors on the sections and a timeline on the right (`page-content` skill). Component pages keep their current tabs. |

The breadcrumb is the **Breadcrumb** component (B083, complete). The modal is the **Dialog** component (B029, complete).

## 4. When the structure changes

- A new page, section or space: place it in a level of the structure. It does not fit → ask the Design System Lead (`never-invent`).
- A link that would open a page below Level 3 (outside component pages) → it opens a modal instead.
- Any change to the levels or the principles: approved by the Design System Lead first, then written **here and** on the Navigation structure page, in the same step.

## How the site applies it

Decided by the Design System Lead on 2026-10-27 (B087). Prototypes and Navigation moved from Level 1 spaces to Level 2 sections of Documentation, same day.

| Item | Rule |
| ---- | ---- |
| **Level 0** | Root page (`/`): one card per Level 1 space, in the order Documentation, Portfolio. No side navigation. |
| **Logo** | In the header on every screen size; below tablet the logo stays and only the site name is hidden, so Level 0 is reachable from a phone. |
| **Level 1 spaces** | Links in the header, same order; below desktop they open at the top of the menu. |
| **Side navigation** | Shows only the current space: its Level 2 sections; the pages of a section open under it while the current page is inside it. |
| **Overview** | Description, then Summary: one card per section (Governance, Foundations, Components, Prototypes, Navigation). |
| **Level 2 sections** | A page of their own: title, subtitle and one card per Level 3 page (or per component category). |
| **Foundations** | One page per category. Text styles are on Typography; the WCAG contrast table and the state layers are on Color. |
| **Components** | The five categories are always listed; an empty one says "No component yet". |
| **Prototypes** | Level 2 section of Documentation: one card / navigation item per prototype (Level 3), plus "All prototypes" (`/prototypes/`). |
| **Navigation** | Level 2 section of Documentation, a page of its own (Navigation structure), with no Level 3 page. |
| **Portfolio** | Title, subtitle and "Nothing yet." until its content is defined. |
| **Breadcrumb** | Decided by the Design System Lead on 2026-10-28 (B091). The Breadcrumb component, first block of every page from Level 2 to Level 4, above the title. Starts at Level 0, labelled **BuildDesignSystem** (link to `/`), and ends with the parent of the page. Overview (where Documentation opens): "BuildDesignSystem / Documentation". No breadcrumb on Level 1 (Portfolio). Built once in `docs/src/AppShell.tsx` from `structure.ts`. |
| **Backlog tickets** | Decided on 2026-10-29 (B114). A click on a ticket of the Backlog page opens it in a **Dialog** (`large`) over the page, at `#/backlog/<id>` (a link to a ticket opens the Backlog with its modal). The Backlog stays the page shown: side navigation, breadcrumb and scroll do not change. The menus of a ticket (status, priority, release, stage) do not open it; they are also at the top of the modal. |

## Not defined yet — ask before deciding

- Content of Portfolio.
- Pages that get the timeline on the right; the timeline on component pages (with their tabs).
