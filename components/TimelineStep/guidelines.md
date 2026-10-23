# TimelineStep — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- **In a Timeline**, as one of its steps.

## When not to use
- **On its own**, outside a Timeline.
- For a sequence of steps **without dates** (e.g. a form in several steps).
- To **go to another page**: a step leads to a section of the same page only.

## Usage best practices
- **Chronological order**: from the oldest to the most recent.
- **One selected step, always**: the step of the section currently shown.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Order the steps from the oldest to the most recent. | Mix up the order of the dates. |
| Select one step: the section currently shown. | Show several solid markers (several selected steps). |
| Use a short title: "Order shipped". | Use a long sentence as a title. |
| Always show a range: "12 Oct 2026 – 16 Oct 2026". | Show a single date. |

## Content guidelines
- **Title**: a noun or an event ("Order shipped"), not a sentence. Sentence case. 60 characters maximum.
- **Date range**: always a range, full dates on both sides — "12 Oct 2026 – 16 Oct 2026".
- **Description**: one or two sentences, ending with a period. Sentence case. 150 characters maximum.

## Behavior
- The whole step is a link to a section of the same page.
- **On click: direct jump** to the section (no smooth scrolling); the step becomes selected.
- **Long title**: wraps to a new line; the date range stays on the right.
- **Narrow timeline**: when the title would be narrower than 200px (`--size-timeline-step-title`), the date range goes under the title (4px below it), above the description.

## Accessibility
- **Keyboard:** reachable with Tab; activated with Enter.
- **Focus:** always visible — `--border-width-2` outline in `--color-border-focus` around the clickable area, plus the focus state layer.
- **Screen reader:** announced as a link; its name includes the title, the date range and the description; the selected step is announced as the current location (`aria-current="location"`); the marker and the line are decorative.
- **Contrast:** every text in `text.primary`, AA in every state (see `spec.md`).
- **Not color only:** the selected step is shown by a solid marker (a change of shape, not only of color).
- **Touch target:** the whole content of the step, well above 24×24px (WCAG 2.5.8).

## Related components
- **Timeline** — the component that contains the steps.
