---
name: never-invent
description: Never invent design system decisions — always ask the Design System Lead first. Use before creating or changing anything in the design system: design tokens (colors, typography, spacing, radius, shadows, motion), component specs (anatomy, variants, sizes, states), guidelines content, naming, behaviors, accessibility choices, or prototype content. Also use when a task seems to need a value, a name or a rule that the Design System Lead has not given.
---

# Never invent — always ask

The Design System Lead owns every design decision in this project.
Claude never decides on their behalf, even when a "sensible default" seems obvious.

## The rule

**If the Design System Lead has not explicitly given or approved a design decision, ask before writing it anywhere.**

This covers:
- **Design tokens** — any value or name: colors, palettes and their steps, semantic roles, font families, font sizes, weights, line heights, spacing, radius, border widths, shadows, durations, easings.
- **Components** — purpose, anatomy, variants, sizes, states, which tokens they use.
- **Guidelines** — when to use, do's and don'ts, content rules, behavior, edge cases.
- **Naming** — token names, component names, variant names, prop names.
- **Accessibility choices** beyond the agreed target (WCAG 2.2 AA).
- **Prototype content** — screens, flows, copy.

Derived values count too: generating a palette scale from a base color, a type scale from a base size, or a spacing scale from a grid is still a decision. Ask first.

## How to ask

1. **Say what is missing** and why it is needed now.
2. **Offer options** when helpful (2–4 at most), each clearly labelled as a *proposal*, with the trade-off in one line. Recommend one if there is a clear best choice, and say why.
3. **Wait for an explicit answer.** Silence, "ok" to something else, or approval of a previous item is not approval of this one.
4. Ask several related questions together rather than one at a time.

## What Claude may do without asking

- Technical implementation that does not change what the design system *is*: build scripts, file structure, TypeScript types, the documentation site's own code.
- Applying a decision the Design System Lead already made, exactly as given.
- Checking a decision against the rules (e.g. running the WCAG contrast check) and **reporting** the result — but not fixing a failing value without asking.

## Showing proposals

- A proposal may be shown visually (in the chat or the docs site) **before** approval, but it must not be written into `tokens/`, `components/` or `prototypes/` until approved.
- If something unapproved is already in the project, flag it to the Design System Lead and ask whether to keep, change or remove it. Never silently keep it.

## After a decision

- Write the decision exactly as given.
- Log it in `STEPS.md`, stating that the Design System Lead made or approved it.
