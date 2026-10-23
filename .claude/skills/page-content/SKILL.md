---
name: page-content
description: Rules for page content built with a Timeline and Cards — how cards and timeline steps are linked, ordered, placed and spaced, and how the selection follows the reading. Use whenever a page, a template, a prototype screen or an example combines a Timeline (TimelineStep) with Cards.
---

# Page content — Timeline and Cards

Rules approved by the Design System Lead for a page whose content is a list of **Cards** with a **Timeline** that leads to them.
The look of each component is in its own spec (`components/Card`, `components/Timeline`, `components/TimelineStep`); this skill covers **how they work together**.

## Link between a step and a card

| Rule | Detail |
| ---- | ------ |
| **One card per step** | Each TimelineStep leads to its own Card. |
| **Same order** | The cards are in the same order as the steps: chronological, from the oldest to the most recent. |
| **Same title** | The card title is the title of its step. |
| **Anchor** | The step's `href="#<id>"` matches the card's `id`. Clicking a step **jumps directly** to its card (no smooth scrolling). |

```tsx
<TimelineStep title="Order shipped" href="#order-shipped" …>…</TimelineStep>
<Card id="order-shipped" title="Order shipped">…</Card>
```

## Placement

| Rule | Value |
| ---- | ----- |
| Timeline position | **On the right** of the cards |
| Columns (desktop, from `--breakpoint-desktop`) | The **12-column layout grid** (`layout` skill) on the **full width of the screen** — no maximum width (`--size-content` does not apply) |
| Cards width | **8 columns** |
| Timeline width | **4 columns** — the timeline fills them (no maximum width) |
| Space between the cards column and the timeline | **16px** — the grid gutter (`--grid-gutter`) |
| Space between two stacked cards | **16px** (`--space-16`) |
| Mobile and tablet | Cards on the full width of the grid (4 / 8 columns); the timeline is in the panel (see Small screens) |
| Page margin and page header | See the `layout` and `page-header` skills |

Approved by the Design System Lead on 2026-10-21 (cards 8 / timeline 4, full screen width).

- **One timeline per page.**

## Scrolling and selection

- **The timeline stays visible** (fixed) while the cards scroll.
- **The selected step follows the reading**: when the reader scrolls, the step of the card currently visible becomes selected automatically. Clicking a step also selects it.
- **"Visible" card = the card at the top of the screen**: the card that reaches the top of the reading area. When several cards are on screen, the one at the top wins.
- **Exactly one selected step** at any time.
- **Every card can reach the top of the screen**: space is added after the last card, just enough for the last card to scroll up to the top of the screen (at every screen size). Without it, the last cards of a short page never reach the top and their steps could only be selected by clicking. The space is measured (screen height minus the height of the last card and the page margin), not a design token.

## Small screens

- **Below desktop** (`--breakpoint-desktop`, 1024px — mobile and tablet), the timeline is **reached through a burger menu**:

| Rule | Detail |
| ---- | ------ |
| Button position | **Above the cards, aligned right** |
| Button look | **Icon only** (Icon button), Material icon **`timeline`** — different from the site navigation burger (`menu`); it needs an accessible name |
| Opening | A **panel slides in from the right**, over the page, with a **dimmed background** |
| After choosing a step | The panel **closes** and the page **jumps to the card** |
| Closing without choosing | A **close icon button** (Material icon `close`) in the panel, the **Escape key**, or a **click on the dimmed background** |
| Component | The panel is **part of the Timeline** (its small-screen behavior), not a separate component |

### Icon buttons by screen size

| Screen | Width | Timeline | Open button (IconButton `primary`, icon `timeline`) | Close button (IconButton `tertiary`, icon `close`) |
| ------ | ----- | -------- | --------------------------------------------------- | -------------------------------------------------- |
| Mobile | below 768px | In the panel | **Shown**, above the cards, aligned right | In the panel, top right, when it is open |
| Tablet | 768px – 1023px (`--breakpoint-tablet`) | In the panel | **Shown**, above the cards, aligned right | In the panel, top right, when it is open |
| Desktop | 1024px and above (`--breakpoint-desktop`) | On the right of the cards | **Hidden** | **Hidden** (no panel) |

- The switch happens at **`--breakpoint-desktop` (1024px)**: below it the icon buttons are used, from it the timeline is always visible and needs no button.
- If the screen grows to desktop while the panel is open, the panel closes.

- The panel details (close button at the top right, width, shadow, dimmed background, focus) are in the **Timeline spec** (section "Small screens").

## Checklist

- [ ] One card per step, same order, same title.
- [ ] Each step `href` matches an existing card `id`.
- [ ] From 1024px: 12-column grid on the full screen width, cards 8 columns, timeline 4 columns on the right (16px gutter); 16px between cards.
- [ ] Timeline fixed while scrolling; the selected step follows the card at the top of the screen.
- [ ] Space after the last card, so every card (the last one included) can reach the top of the screen.
- [ ] One timeline per page.
- [ ] Below 1024px, the timeline is reached through the open icon button; from 1024px, no icon button is shown.
