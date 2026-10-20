---
name: component-spec
description: Stage 1 (Design) of a component — how to build and write its design spec (components/<Name>/spec.md) with the Design System Lead: purpose, anatomy, variants, sizes, states and the design tokens used. Use when a component's meta.json status is "design", when the `orchestrator` skill dispatches here, or when a spec is created, reviewed or changed.
---

# Component spec — Stage 1: Design

The spec says **what the component is**. How and when to use it belongs to the guidelines (stage 2).
Output: **`components/<Name>/spec.md`** and a **live design preview** (`components/<Name>/design/`) in which the Design System Lead tests tokens and content before approval.

## Rules

- **Never invent** (`never-invent`): purpose, anatomy, variants, sizes, states and token choices are design decisions. Propose, explain in one line, and wait for an explicit answer.
- Proposals are shown in the chat (visual preview) and **written into `spec.md` only once approved**.
- **Only existing tokens.** Every visual value in the spec is a semantic token (`token-naming`). Never a raw value (no `#795b55`, no `13px`).
  - If a needed token does not exist → stop and ask: a new token goes through the token process first.
- The component's Atomic Design level must already be approved (`component-structure`).
- English only.

## Process

### 1. Start from the Design System Lead's design information
**Always build the design first, from the information the Design System Lead gives** — usage comes later, in the guidelines (stage 2).
- Ask the Design System Lead for **their design information** on the component: what it looks like, what it contains, the variants, sizes and states they have in mind, any reference.
- **Do not ask usage questions at this stage** (when to use it, in which contexts, which component to use instead…): they belong to `component-guidelines`.
- Build the design preview from their information as soon as possible, then refine it with them.

**How to ask: a questionnaire with choices.** Ask the questions with the question tool (multiple choice, several questions per round, "other" always possible), not as a long text. The first round always covers:
1. **Identity** — name, folder, CSS class, Atomic Design level, one-sentence description (proposed values to validate).
2. **Hierarchy** — the levels of importance (e.g. primary, secondary, tertiary, danger), multiple choice.
3. **Sizes** — one size, or a set of sizes.
4. **Content** — what goes inside (text only, icon before / after the text…), multiple choice.

Then follow-up rounds on what the answers leave open (style of each hierarchy level, shape, width, extra states…). Options are **prompts, never decisions**: only the answers are decisions.

### 2. Start the design preview — from the very beginning
As soon as the component folder exists, create its **design preview**, and keep it up to date after every decision:
- Copy `components/_template/design/` to `components/<Name>/design/`:
  - `Preview.tsx` — a visual mock-up of the component, **not the final code**. Every visual value is a `--preview-<slot>` variable.
  - `tokens.json` — the **slots** (visual properties: background, text, border, padding, radius, text style…), the **token chosen for each slot, per variant**, state overrides (e.g. disabled), the default content and the contrast pairs to check.
- The preview appears in the **Design preview** tab of the component page (`/docs/#/components/<slug>`): every state side by side (default, hover, focus, pressed, disabled), a field to change the content, a token menu per slot and a live contrast check.
- Slot names, token choices and preview content are **proposals** until approved.

### 3. Define the types
The **types** are the main kinds of the component, each with its own purpose or structure (e.g. a navigation that can be *side* or *top*; an alert that can be *inline* or *banner*).
- Propose the types (or a single type), with one line on the purpose of each.
- Get approval of the types and their names.

### 4. Define the possible variants

Define **every way the component can vary** within its types, with the Design System Lead.

1. **List the variant properties** — the independent axes along which the component changes. Examples of axes to consider (only as prompts for the discussion, never as decisions):
   - hierarchy / emphasis, size, content (with icon, icon only…), shape, width (fixed / full width), tone (neutral, success, error…), layout (horizontal / vertical).
2. For each property: its **values**, and the **default** value.
3. Define the **combinations**: which combinations are allowed, and which are **forbidden** (with the reason).
4. Show the **variant matrix** visually (every allowed combination, forbidden ones crossed out). Add the variants to `design/tokens.json` so they can be tested in the Design preview tab.
5. Get explicit approval of the properties, values, defaults and forbidden combinations. **Property and value names must be approved** (they become prop names in code).

States (hover, focus, pressed, disabled…) are **not** variant properties: they are defined in the States section.

### 5. Define the content
The **text that goes inside** the component, with the Design System Lead:
- Which texts the component contains (label, title, description, placeholder, help text, counter…), required or optional.
- Example content, and the **default text** used in the preview (`design/tokens.json` → `text`).
- Length: expected and maximum length; behavior when the text is too long (wrap, truncate with ellipsis, line limit).
- Test short, long and very long texts in the Design preview tab before approval.

### 6. Build the spec, section by section
For each section below: **propose** (updating the design preview), **get approval**, then move on.
Group small sections in one round of questions when possible.

| Section | Content | Notes |
| ------- | ------- | ----- |
| **Purpose** | One or two sentences: the problem it solves. | |
| **Types** | The approved types (step 3). | |
| **Anatomy** | Numbered list of the parts (container, label, icon…), each marked required or optional. | Show a labelled diagram. |
| **Variants** | The approved variant properties, values, defaults and forbidden combinations (step 4). | |
| **Content** | The approved texts, lengths and overflow behavior (step 5). | |
| **Sizes** | Table: size name + dimensions, all as tokens (`--space-*`, `--typography-*`, `--icon-size-*`, `--radius-*`). | Interactive targets: at least 24×24px (WCAG 2.5.8). |
| **States** | The states that apply. | See "States" below. |
| **Design tokens** | Table: part / property / state → semantic token. | Every value of every variant, size and state. |
| **Open questions** | Anything not decided yet. | Keep it until resolved. |

### 7. States

- **Interaction states use state layers** — no extra color tokens: hover (`--state-layer-hover`), focus (`--state-layer-focus` + visible focus outline `--color-border-focus`), pressed (`--state-layer-pressed`). The layer uses the content color (`currentColor`).
- **Disabled** uses the disabled roles (`--color-text-disabled`, `--color-icon-disabled`, `--color-background-disabled`) — set as `states.disabled` overrides in `design/tokens.json`.
- Component-specific states (selected, error, loading, empty…) are **proposed and approved** like any other decision.

### 8. Test the tokens before approval
- The Design System Lead tests the tokens and the content directly in the **Design preview** tab. Their choices are saved automatically to `design/tokens.json`.
- **Never change a token choice made by the Design System Lead in the preview** without asking.
- Check the live contrast table: every failing pair must be fixed (with approval) before the spec is approved.

### 9. Write `spec.md`
- Start from `components/_template/spec.md`; keep its section order.
- Write only approved content; the **Design tokens** table reflects the final `design/tokens.json`.
- Keep unresolved points under **Open questions**.

### 10. Approval gate
Hand back to the `component` skill (approval gate): check the contrast of every text/icon/border pair used, the target sizes and the visible focus, show the spec and the design preview, and ask for explicit approval of stage 1.
