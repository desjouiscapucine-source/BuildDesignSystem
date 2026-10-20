---
name: component-guidelines
description: Stage 2 (Guidelines) of a component — how to write its usage guidelines (components/<Name>/guidelines.md) with the Design System Lead: when to use it, best practices, do's and don'ts, content rules, behavior, accessibility and related components. Use when a component's meta.json status is "guidelines", when the `orchestrator` skill dispatches here, or when guidelines are created, reviewed or updated (including after coding or prototyping reveals a new rule).
---

# Component guidelines — Stage 2: Guidelines

The spec says **what** the component is; the guidelines say **how and when** to use it.
Output: **`components/<Name>/guidelines.md`**, shown in the **Guidelines** tab of the component page.

**Templates and pages skip this stage** (`component-structure`).

## Rules

- **Never invent** (`never-invent`): usage rules are design decisions. Propose, explain in one line, and wait for an explicit answer.
- Proposals are written into `guidelines.md` **only once approved**.
- **Start from the approved spec** (`spec.md`, `design/tokens.json`): the guidelines must never contradict it. If writing the guidelines reveals a gap in the spec (a missing variant, state or content rule), stop: the spec is updated and approved again first.
- Refer to variants, types and content **with their approved names**.
- English only. Short, direct sentences; one rule per bullet.

## Sections

Follow the order of `components/_template/guidelines.md`:

| Section | Content |
| ------- | ------- |
| **When to use** | The situations the component is made for. |
| **When not to use** | The situations to avoid, each with **the component to use instead**. |
| **Usage best practices** | Placement, layout, spacing around it, combination with other components, how many per screen. |
| **Do's and don'ts** | Pairs of a good and a bad usage, each with a **visual example**. |
| **Content guidelines** | Labels, wording, tone, length, capitalization — consistent with the Content section of the spec. |
| **Behavior** | Interactions, responsive behavior, edge cases: long text, empty, loading, error. |
| **Accessibility** | Keyboard, focus, screen reader, contrast, touch target size (WCAG 2.2 AA). |
| **Related components** | Components often used with it, or that can replace it. |

## Process

### 1. Prepare
- Read the approved `spec.md` and `design/tokens.json`.
- List what is already known from the spec, and what must be decided for each section.

### 2. Propose and approve, section by section
- Send the questions for several sections at once when they are related.
- For each proposal, give the reason in one line.
- A related component that does not exist yet is named as such ("not in the design system yet") — never assume it exists.

### 3. Do's and don'ts — visual examples
- Each do / don't pair is shown **visually** in the chat, built with the design preview (`design/Preview.tsx`) and approved tokens only.
- In `guidelines.md`, each row describes the example in one sentence.

### 4. Accessibility section
- Write the expected keyboard behavior (keys and result), focus order and visible focus, what a screen reader announces (role, name, state), contrast pairs (already checked in the spec), and the minimum target size (24×24px, WCAG 2.5.8).
- Run `accessibility-check` on the section.

### 5. Write `guidelines.md`
- Start from `components/_template/guidelines.md`; keep its section order.
- Write only approved content; keep open points in a final **Open questions** list.

### 6. Approval gate
Hand back to the `component` skill (approval gate): show the guidelines (chat + Guidelines tab), ask for explicit approval of stage 2.

## Keeping guidelines up to date

Guidelines are **updated whenever coding or prototyping reveals a new rule or edge case**:
1. Propose the new rule to the Design System Lead.
2. Once approved, add it to `guidelines.md` and log the change in `STEPS.md`.
