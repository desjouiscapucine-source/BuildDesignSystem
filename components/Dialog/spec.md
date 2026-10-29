# Dialog — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** organism — built from IconButton (close) and Button (footer actions).

## Purpose
A window that opens over the page, on a dimmed background, to show a detail or ask for an action without leaving the page.

It opens the detail of a Level 3 page (e.g. a ticket from the Backlog) instead of a new page (`navigation` skill).

## Types
| Type | Purpose |
| ---- | ------- |
| Dialog | The only type. The buttons of the footer give the hierarchy of the actions. |

## Anatomy
1. Overlay (required) — dims the page behind the dialog
2. Container (required) — background, radius, shadow
3. Title (required)
4. Description (required) — under the title
5. Close button (required) — IconButton `tertiary`, icon `close`, label "Close", at the top right of the header
6. Body (optional) — free content (text, the detail of a ticket, a form…)
7. Footer (optional) — action Buttons, aligned right, main action last

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `size` | `small`, `medium`, `large` | `medium` | Maximum width of the dialog. |
| `open` | Boolean | — (required) | Whether the dialog is shown. |
| `onClose` | Function | — (required) | Called by the close button, the Escape key and a click on the overlay. |
| `title` | Text | — (required) | Title of the dialog. |
| `description` | Text | — (required) | Text under the title. |
| `children` | Any content | — (optional) | The body. |
| `footer` | Buttons | — (optional) | The action Buttons of the footer. |

### Combinations
- Allowed: all sizes, with or without body, with or without footer.
- Forbidden: none.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Title | Yes | Delete this ticket? | None | Wraps onto several lines |
| Description | Yes | B029 · Dialog | None | Wraps onto several lines |
| Body | No | The ticket and its history will be removed from the backlog. This cannot be undone. | — | Only the body scrolls; header and footer stay in place |
| Footer | No | Cancel · Delete | — | Buttons stay side by side, aligned right; they wrap onto a new line if they do not fit |

## Sizes
| Size | Maximum width | Padding | Space between parts |
| ---- | ------------- | ------- | ------------------- |
| `small` | `--size-dialog-small` | `--space-24` | `--space-24` |
| `medium` (default) | `--size-dialog-medium` | `--space-24` | `--space-24` |
| `large` | `--size-dialog-large` | `--space-24` | `--space-24` |

- **Responsive**: on screens narrower than the dialog, it takes the full width, `--space-16` from the screen edges. Same layout on mobile (footer buttons side by side, aligned right).
- **Height**: at most the height of the screen minus the margins; beyond it, the body scrolls.
- Touch targets: the close button and the footer buttons keep their own sizes (IconButton, Button: at least 24×24px, WCAG 2.5.8).

## States
- **Open / closed.** It closes with the close button, the **Escape** key, a **click on the overlay**, or a footer button.
- **Motion**: overlay and dialog fade in and out — `--duration-200`, `--easing-ease-out` (0.01ms with `prefers-reduced-motion`).
- Interaction states (hover, focus, pressed, disabled) belong to the IconButton and Buttons inside; the dialog itself has none.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Overlay | Background | all | `--color-background-overlay` |
| Container | Background | all | `--color-background-page` |
| Container | Radius | all | `--radius-8` |
| Container | Shadow | all | `--shadow-dialog` |
| Container | Padding | all | `--space-24` |
| Container | Space between header, body and footer | all | `--space-24` |
| Container | Maximum width | `small` / `medium` / `large` | `--size-dialog-small` / `--size-dialog-medium` / `--size-dialog-large` |
| Container | Margin to the screen edges | all | `--space-16` |
| Header | Space between title block and close button | all | `--space-16` |
| Title | Text style / color | all | `.ds-text-heading-4` / `--color-text-primary` |
| Description | Space under the title | all | `--space-4` |
| Description | Text style / color | all | `.ds-text-body` / `--color-text-secondary` |
| Body | Text style / color | all | `.ds-text-body` / `--color-text-primary` |
| Footer | Space between buttons | all | `--space-8` |
| Overlay + container | Fade in / out | open / close | `--duration-200`, `--easing-ease-out` |

Contrast (checked in the Design preview tab): title, description and body text on `--color-background-page` meet 4.5:1.

## Open questions
- None.
