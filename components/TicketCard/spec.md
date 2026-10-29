# TicketCard — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
Shows one backlog ticket as a card, with its main information (tags, ID, title, description) and its menus (status, priority, release, stage). A click on the card opens the ticket.

## Types
| Type | Purpose |
| ---- | ------- |
| Default (one type) | The card of one backlog ticket. |

## Anatomy
TicketCard is an **organism**. It has the look of the **Card** molecule (same tokens) in its own container, which is clickable (Card itself is not clickable).

1. Container (required) — clickable as a whole, focusable
2. Tags row (required)
   - Category tag (required) — **Tag** (B059)
   - Origin tag "Decided" (optional) — **Tag** (B059), shown only when the ticket's origin is `decided`
   - ID (required) — on the right of the row
3. Title (required)
4. Description (optional)
5. Menus row (required) — one **Select** (B021) each: Status, Priority, Release, and Stage (shown only for component tickets)

Building blocks: **Tag** (B059) and **Select** (B021) are completed first; until then the design preview shows them as dashed placeholders.

## Variants

### Variant properties
None: one type, no variant. Only the content changes (origin tag and Stage menu shown or not).

### Combinations
- Not applicable.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Category tag | Yes | "Components" | — | Tag rules (B059) |
| Origin tag | No (only for `decided`) | "Decided" | — | Tag rules (B059) |
| ID | Yes | "B115" | — | — |
| Title | Yes | "TicketCard" | No maximum | Wraps, full text |
| Description | No | "A design system component for the card of a backlog ticket." | No maximum | Wraps, full text |
| Menus | Yes | Status, Priority, Release, Stage | — | Select rules (B021) |

## Sizes
One size only. The card takes the **full width available** (the column that contains it).

| Part | Size |
| ---- | ---- |
| Container | Padding `--space-16` |
| Rows (tags, title, description, menus) | Gap `--space-8` |
| Tags row (tags and ID) | Gap `--space-4`; wraps when too long |
| Menus row | Gap `--space-8`; wraps when too long |

## States
- **The whole card is clickable**: a click anywhere opens the ticket, except on the menus (a menu keeps its own behavior).
- **Keyboard**: the card itself takes the focus (Tab); Enter opens the ticket. The menus inside come next in the tab order.
- Interaction states on the card, with state layers in `--color-text-primary`: hover (`--state-layer-hover`), focus (`--state-layer-focus` + outline `--border-width-2` `--color-border-focus`), pressed (`--state-layer-pressed`).
- No disabled state, no selected state.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | all | `--color-background-page` |
| Container | Border color | all | `--color-border-subtle` |
| Container | Border width | all | `--border-width-1` |
| Container | Radius | all | `--radius-8` |
| Container | Padding | all | `--space-16` |
| Container | Gap between rows | all | `--space-8` |
| Container | State layer | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` (in `--color-text-primary`) |
| Container | Focus outline | focus | `--border-width-2` · `--color-border-focus` |
| Tags row | Gap | all | `--space-4` |
| ID | Text style · color | all | `body-sm` · `--color-text-secondary` |
| Title | Text style · color | all | `heading-5` · `--color-text-primary` |
| Description | Text style · color | all | `body` · `--color-text-primary` |
| Menus row | Gap | all | `--space-8` |
| Tags | — | — | Tag tokens (B059) |
| Menus | — | — | Select tokens (B021) |

### Contrast (WCAG 2.2 AA)
| Pair | Ratio |
| ---- | ----- |
| Title and description (`text.primary` on `background.page`) | 15.52:1 ✓ |
| ID (`text.secondary` on `background.page`) | 5.49:1 ✓ |
| Border (`border.subtle`) | 1.25:1 — decorative, as Card |
| Focus outline (`border.focus` on `background.page`) | 6.10:1 ✓ |

## Open questions
- Tags and menus: final look once Tag (B059) and Select (B021) are coded.
