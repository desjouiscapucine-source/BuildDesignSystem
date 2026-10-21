# Timeline — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- To trace a **history of dated events** (an order, a project, a file).

## When not to use
- For a sequence of **steps without dates** (e.g. a form in several steps).
- For **a single event**: a timeline has at least 2 steps.
- To **navigate between pages**: the steps lead to sections of the same page.

## Usage best practices
- **Placement**: **next to the content**, in a column beside the sections it lists.
- **One timeline per page**.
- **Only TimelineSteps** inside: no buttons, no text.
- **At least 2 steps**; no maximum.
- Steps in **chronological order**, **one selected step** (see TimelineStep).

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Use a timeline with several steps. | Use a timeline with a single step. |
| Put only TimelineSteps in the timeline. | Add buttons or text to the timeline. |
| Place the timeline next to the sections it lists. | Place the timeline in the middle of the content. |

## Content guidelines
- The steps follow the TimelineStep content rules (title, date range, description).
- Accessible name: "Timeline" by default; give a more precise name with `label` when it helps (e.g. "Order history").

## Behavior
- Fills the width of its column, frame included: on a Timeline + Cards page, the 4 timeline columns (`page-content`).
- Grows in height with its steps.

### Below desktop (mobile and tablet)
- The timeline is replaced by an **open button** (IconButton `timeline`), above the cards, aligned right.
- The button opens a **panel** from the right, over a dimmed background.
- **Choosing a step** closes the panel and jumps to its card.
- The panel also closes with its **close button** (top right), the **Escape** key, or a **click on the dimmed background**.

## Accessibility
- **Structure:** an ordered list (the steps are in chronological order), named "Timeline" by default (`label`).
- **Keyboard:** Tab moves from one step to the next, in chronological order.
- **Screen reader:** announces a list and the number of steps; the selected step is announced as the current location.
- **Below desktop:**
  - the open and close buttons are named "Open the timeline" and "Close the timeline";
  - the panel is announced as a **dialog** named after the timeline;
  - when it opens, **focus goes to the selected step**; while it is open, **focus stays inside the panel** (Tab cycles between the close button and the steps);
  - when it closes without choosing a step, **focus returns to the open button**.
- **Contrast:** the frame is decorative; see TimelineStep for the steps.

## Related components
- **TimelineStep** — the building block of the timeline.
- **IconButton** — the open and close buttons of the panel, below desktop.
