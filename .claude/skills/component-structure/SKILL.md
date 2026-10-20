---
name: component-structure
description: Atomic Design structure of the design system — the five levels (atom, molecule, organism, template, page), how to classify a component, and how the level is recorded. Use when creating a new component, when classifying or re-classifying one, when a component uses other components, and whenever the main `component` skill starts a new component.
---

# Component structure — Atomic Design

Components are organized with **Atomic Design**, in **five levels** (approved by the Design System Lead).

| Level | `meta.json` `level` | What it is | Built from |
| ----- | ------------------- | ---------- | ---------- |
| **Atoms** | `atom` | The smallest UI elements, that cannot be split further without losing their meaning (e.g. a button, an input, a label). | Design tokens only |
| **Molecules** | `molecule` | A small group of atoms working together as one unit with a single purpose (e.g. a form field = label + input + help text). | Atoms |
| **Organisms** | `organism` | A distinct, more complex section of an interface (e.g. a header, a side navigation, a form). | Molecules and atoms |
| **Templates** | `template` | A page layout: places organisms in a structure, with placeholder content. | Organisms (and lower levels) |
| **Pages** | `page` | A template filled with real, representative content. | A template + real content |

The "Built from" column is the Atomic Design definition: **a component only uses components of lower levels** (and tokens).

## How the level is recorded

- Folders stay **flat**: `components/<Name>/` — no sub-folder per level.
- The level is a field in **`components/<Name>/meta.json`**:
  ```json
  { "name": "Button", "description": "…", "level": "atom", "status": "design" }
  ```
- The documentation site groups components by level in the navigation.

## Classifying a component

1. Look at what the component is made of:
   - only tokens → atom candidate;
   - several atoms with one purpose → molecule candidate;
   - a full section built from molecules / atoms → organism candidate;
   - a page layout → template candidate; a template with real content → page candidate.
2. **Propose** the level to the Design System Lead with a one-line reason. **The level is a design decision: never set it without approval** (`never-invent`).
3. If a component turns out to need a component of the same or a higher level, flag it: the classification (or the split into components) must be reviewed with the Design System Lead.

## Building blocks

**A component made of repeated elements is split into building blocks.** (Rule approved by the Design System Lead.)

1. Before designing a component, look for its **building blocks**: the element repeated inside it (e.g. the **item** of a side navigation, the **step** of a timeline).
2. Each building block is a **separate component**, with its own folder, `meta.json`, Atomic Design level and stages.
3. **The building block is built first, through all its stages (Design → Guidelines → Code)**, then the parent component that uses it.
4. The parent component only arranges its building blocks (layout, spacing, container); the look of each element belongs to the block.
5. The name, the level and the split itself are **proposed and approved** by the Design System Lead (`never-invent`).

Example: **NavigationItem** (molecule, building block) → **SideNavigation** (organism).

## Templates and pages

- Templates and pages are **layout references** shown in the documentation site. They are **independent of the prototypes**.
- They follow **two stages only**: **Design → Code** (no guidelines stage).

## Prototypes (not an Atomic Design level)

- `prototypes/` contains **user journeys** (parcours): interactive mockups built with the design system components.
- Their screens are built **directly from the components** (organisms, molecules, atoms) — not from the templates and pages.
