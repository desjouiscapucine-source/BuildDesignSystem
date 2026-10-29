# Dialog — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To show the **detail of a Level 3 item** (e.g. a ticket from the Backlog) without leaving the page, instead of a new page (`navigation` skill).
- To **confirm an action**, especially a destructive or irreversible one (e.g. delete).
- For a **short task or a short form** the user finishes without leaving the page.
- For **important information** the user must read before going on.

## When not to use
- To open **images** larger: use the **ImageViewer** instead.
- For **long content or a main task** (long reading, complex flow): use a **page** instead.
- For a **non-blocking message** (success, information with no action needed): use an inline message instead — not in the design system yet.
- **From another dialog**: never open a dialog on top of a dialog.

## Usage best practices
- **One dialog at a time.**
- **Footer: 2 buttons at most** — `Cancel` (Button `secondary`) and one main action (Button `primary`, or `danger` for a destructive action). The main action is last, on the right.
- **Size by usage**:
  - `small` — a confirmation.
  - `medium` (default) — most dialogs.
  - `large` — the detail of an item (e.g. a ticket).

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Label the main button with the verb of the action ("Delete"). | Label the buttons "Yes" / "No" / "OK". |
| Use at most 2 buttons: `Cancel` and the main action. | Put more than 2 buttons in the footer. |
| Use `small` for a confirmation. | Use `large` for a short confirmation. |
| Open one dialog at a time. | Open a dialog on top of another dialog. |

## Content guidelines
- **Title**: sentence case, short. A question for a confirmation ("Delete this ticket?"), the name of the item for a detail.
- **Description**: required; it wraps when long (no maximum length).
- **Footer buttons**: the verb of the action ("Delete", "Save"), never "OK" or "Yes"; the secondary button is "Cancel".

## Behavior
- **Close**: the close button, the Escape key, a click on the overlay, or a footer button.
- **Long content**: only the body scrolls; the header and the footer stay in place. The title and the description wrap.
- **Responsive**: below the width of the dialog, it takes the full width, 16px from the screen edges; the footer buttons stay side by side, aligned right.
- **Loading**: shown in the body; the header and the footer stay.
- **Error**: the message is shown in the body; the dialog stays open.
- **Motion**: fades in and out (`--duration-200`, `--easing-ease-out`); no animation with reduced motion.

## Accessibility
- **Keyboard:** Escape closes; Tab and Shift+Tab move between the interactive elements and stay inside the dialog.
- **Focus:** on opening, focus goes to the close button; on closing, it returns to the element that opened the dialog. The focus ring is the one of the IconButton and Buttons.
- **Screen reader:** a modal dialog, named by its title and described by its description; the page behind is not reachable and cannot scroll.
- **Contrast:** title, description and body text on `--color-background-page` meet 4.5:1 (checked in the spec).
- **Touch target:** the close button and the footer buttons keep their own sizes (at least 24×24px, WCAG 2.5.8).

## Related components
- **Button** — the footer actions.
- **IconButton** — the close button.
