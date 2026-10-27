---
name: navigation
description: Navigation structure of the site — the navigation levels (Level 0 landing page to Level 4 component pages), where each page sits, and the navigation principles (logo, breadcrumb, depth and modals, anchors and timeline inside a page). Use whenever a page or a space is added, moved or removed, when the side navigation or the landing page changes, when a link goes deeper than Level 3, or when the logo, a breadcrumb, a modal or in-page navigation is built.
---

# Navigation

Approved by the Design System Lead on 2026-10-27. Shown on the **Navigation structure** page of the documentation site (`/docs/#/navigation`, `docs/src/pages/NavigationPage.tsx`).

This is the **target structure**: the site does not follow it yet. Making the site follow it is a separate task, asked by the Design System Lead.

## 1. Levels

Talk about the navigation in levels. **Level 0** is the landing page.

| Level | Content |
| ----- | ------- |
| **Level 0** | Landing page |
| **Level 1** | Spaces: Documentation, Prototypes, Navigation, Portfolio |
| **Level 2** | Sections of a space: Overview, Governance, Foundations, Components |
| **Level 3** | Pages of a section, or categories of components |
| **Level 4** | Component pages only |

## 2. Structure

```
Level 0   Landing page
Level 1   ├── Documentation               → opens on Overview
Level 2   │   ├── Overview                (content: Description + Summary)
Level 2   │   ├── Governance
Level 3   │   │   ├── Backlog             (a ticket opens in a modal)
Level 3   │   │   └── How to use skills
Level 2   │   ├── Foundations             (one page per category)
Level 3   │   │   └── Color · Typography · Spacing · Radius · Border width · Shadows · Motion
          │   │       Opacity · Size · Breakpoints · Layout grid · Z-index · Icons
Level 2   │   └── Components              (one category per Atomic Design level)
Level 3   │       ├── Atoms · Molecules · Organisms · Templates · Pages
Level 4   │       └── one page per component, with its tabs
Level 1   ├── Prototypes
Level 1   ├── Navigation                  (Navigation structure page)
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

The breadcrumb (B083) and the modal (B029) are not design system components yet: they go through the component stages first (`component`).

## 4. When the structure changes

- A new page, section or space: place it in a level of the structure. It does not fit → ask the Design System Lead (`never-invent`).
- A link that would open a page below Level 3 (outside component pages) → it opens a modal instead.
- Any change to the levels or the principles: approved by the Design System Lead first, then written **here and** on the Navigation structure page, in the same step.

## Not defined yet — ask before deciding

- Order of the Level 1 spaces.
- Content of Prototypes and Portfolio.
- Templates and Pages while they have no component: shown or hidden.
- Pages that get the timeline on the right; the timeline on component pages (with their tabs).
- When the site follows this structure (landing page, Governance, one page per Foundations category, breadcrumb, modals).
