# WorkDescription — Specification

> Written with the Design System Lead before building the screens, and updated after each iteration.
> Shown on the prototype's ticket in the Backlog (`/docs/#/backlog/<id>`).

## Components & content

**One screen**, laid out with the shared `Screen` (page header + content), the `page-content` rules (Timeline + Cards) and the `card` rules (composing the cards).

| Part | Component (`@ds/components`) | Content |
| ---- | ---------------------------- | ------- |
| Page header | `Screen` (prototype layout) | Title "WorkDescription", subtitle "Placeholder content: four steps, each with its own card" |
| Timeline | `Timeline` (label "Steps"), with its open / close `IconButton`s below desktop | 4 steps |
| Steps | `TimelineStep` × 4 | "Step 1" → "Step 4"; one month each, Jan → Apr 2026; description "Short description of step n." |
| Cards | `Card` × 4, one per step, variant `clickable-image` | Same title as its step ("Step 1" → "Step 4"); placeholder text (3 paragraphs); 3 images each (one row of thumbnails) |
| Images | `ImageViewer` (opened by the card thumbnails) | Neutral placeholder images (landscape, portrait, small) in `prototypes/work-description/images/`; alternative text "Placeholder image n of step n"; no caption |

- **Content: neutral placeholders** for now (decided by the Design System Lead), to replace with the real journey content: screen title and subtitle, timeline label, and for each step its title, date range, description, card content and images (files, alternative texts, captions).

## Acceptance criteria

**Timeline and cards** (`page-content` skill)
- [ ] 4 steps and 4 cards: one card per step, same order (chronological), same title.
- [ ] Each step leads to its card (anchor `#step-n` = card `id`); clicking a step jumps directly to the card.
- [ ] Exactly one selected step at any time: the step of the card at the top of the screen; a clicked step is selected.
- [ ] Space after the last card, so every card (the last one included) can reach the top of the screen and select its step.

**Cards** (`card` skill)
- [ ] Cards stacked, each on the full width of its column, 16px (`--space-16`) between two cards.
- [ ] No card inside another card.
- [ ] Every card is `clickable-image` with 3 thumbnails (one row); a click (or Enter / Space) on a thumbnail opens the ImageViewer on that image; closing it brings the focus back to the thumbnail.

**Layout**
- [ ] Desktop (from 1024px): 12-column grid on the full screen width, cards on columns 1–8, timeline filling columns 9–12 (16px gutter); 16px between cards; the timeline stays visible while the cards scroll.
- [ ] Mobile and tablet (below 1024px): cards on the full width; the timeline is reached through the `timeline` icon button above the cards, aligned right; the panel slides in from the right, and choosing a step closes it and jumps to the card; it also closes with the close button, Escape or a click on the dimmed background.
- [ ] Page margin 24px; page header: title `heading-1` and subtitle `lead`, one line each.

**Quality**
- [ ] Components imported from `@ds/components` only; styles use design tokens only (`npm run check:prototypes`).
- [ ] No console errors; no horizontal scroll on mobile.
- [ ] Previewed on the prototype page (`/docs/#/prototypes/work-description`) at 375 / 768 / 1280px, on the layout grid (Show grid).
