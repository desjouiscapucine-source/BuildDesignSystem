# Panel — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- In the UX playground (B130) only: the right panel holding the **Library**, **Properties** and **Compositions** tabs, next to the canvas.

## When not to use
- To navigate between the pages of a site → use **SideNavigation** instead.
- To show a detail or ask for an action that blocks the rest of the screen → use **Dialog** instead.
- To switch content inside a page with no workspace → use **Tabs** instead (B093, not in the design system yet).
- For the panel of steps that slides in below desktop → use the panel of the **Timeline** instead.
- For any other side panel → not covered by the Panel: ask for a new component or a change of the Panel.

## Usage best practices
- **One Panel per screen**, on the right of the canvas, full height of the workspace.
- The Panel sits **over the canvas** (shadow `shadow.panel`): the canvas keeps its full width behind it.
- Keep the three tabs as they are: Library, Properties, Compositions, in this order.
- The content of a tab scrolls inside the Panel; the Panel never grows taller than the workspace.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Place one Panel on the right of the canvas. | Place two Panels, or a Panel on the left. |
| Keep the three tabs Library, Properties and Compositions. | Add, rename or remove a tab. |
| Let long content scroll inside the Panel. | Let the Panel grow taller than the workspace, so the whole page scrolls. |
| When collapsed, keep the strip of tab icons visible. | Hide the Panel completely. |

## Content guidelines
- **Tab labels** are fixed: `Library`, `Properties`, `Compositions`. Never change them.
- **Accessible labels** of the icon buttons start with a verb, in sentence case: `Collapse the panel`, `Open Library`, `Open Properties`, `Open Compositions`.
- **Empty tab** (e.g. no composition saved yet): one short sentence in the content, text style `body`, color `color.text.secondary`, ending with a period (e.g. "No composition yet."), until an empty state component exists (B065).

## Behavior
- **Collapse**: the collapse button folds the Panel into the strip of tab icons; the selected tab does not change.
- **Expand**: a click on an icon of the strip reopens the Panel on that tab.
- **Animation**: collapsing and expanding are animated with `duration.200` and `easing.ease-out` (no animation when the user reduces motion).
- **Resize**: dragging the handle changes the width between `size.panel-min` and `size.panel-max`; the width follows the pointer directly, with no animation. A double-click on the handle resets the width to `size.panel`.
- **Memory**: the Panel keeps the last tab, the chosen width and the collapsed state when it is collapsed and expanded, and after a page reload (browser preference).
- **Below desktop** (under `breakpoint.desktop`, 1024px): the Panel always opens **collapsed**, whatever was saved; expanded, it slides over the canvas at `size.panel` and **cannot be resized** (the handle is hidden). It collapses again with `Escape`, or as soon as the focus or a click leaves it for the canvas.
- **Long content**: the tab content scrolls vertically inside the Panel; the header (tabs and collapse button) stays in place.
- **Empty**: see Content guidelines.
- **Loading**: not covered yet — waiting for the loading state component (B065).

## Accessibility
- **Keyboard:**
  - `Tab` / `Shift+Tab` move through the resize handle (desktop only), the collapse button, the tabs and the tab content (the collapse button comes before the tabs, so it is reached quickly); in the collapsed strip, through the three icons.
  - Leaving the Panel: `Tab` / `Shift+Tab` go on to the rest of the page, expanded, collapsed and below desktop — the Panel is never a keyboard trap (WCAG 2.1.2).
  - `Enter` / `Space` activate the collapse button and the icons of the strip.
  - On the focused resize handle, `←` / `→` make the Panel wider / narrower by `space.8` (8px) per key press, between `size.panel-min` and `size.panel-max`.
  - Below desktop, `Escape` collapses the expanded Panel and moves the focus to the icon of the current tab in the strip. On desktop, `Escape` does nothing.
  - The tabs follow the keyboard behavior of the Tabs component (B093).
  - No other keyboard shortcut to collapse or expand the Panel.
- **Focus:**
  - The focus follows the Panel: collapsing with the collapse button or `Escape` moves the focus to the icon of the current tab in the strip; expanding from an icon moves it to the selected tab. The focus is never lost.
  - Visible focus: `color.border.focus` outline, `border-width.2`; on the resize handle, drawn inside its hit area.
  - Focus never hidden (WCAG 2.4.11): when an element of the canvas receives the focus behind the Panel, the canvas moves to bring it into the visible area, on the left of the Panel (rule to apply in Canvas, B142).
  - Below desktop, when the focus leaves the expanded Panel for the canvas (`Tab`, `Shift+Tab` or a click in the canvas), the Panel collapses into its strip and the focus stays on the canvas element, which is never hidden.
- **Screen reader:**
  - The Panel is a complementary landmark (`<aside>`) named "Playground panel".
  - The resize handle is a vertical separator (`role="separator"`, `aria-orientation="vertical"`) named "Resize the panel", with its current, minimum and maximum width (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`).
  - The collapse button announces `aria-expanded="true"` and the icons of the strip `aria-expanded="false"`; both point to the Panel content with `aria-controls`. The content stays in the page (hidden) while the Panel is collapsed, so `aria-controls` always points to an element.
  - The icons of the strip are named "Open Library", "Open Properties", "Open Compositions".
- **Contrast:** checked at the design stage — `color.icon.secondary` (resize handle), `color.icon.brand` (icons of the IconButton `tertiary`) and `color.border.focus` on `color.background.surface` pass 3:1; text pairs pass 4.5:1.
- **Touch target:** resize handle `size.resize-handle` (24×24px); IconButtons 36×36px (WCAG 2.5.8).

## Related components
- **Tabs** (B093, in progress) — the three tabs inside the Panel.
- **IconButton** — the collapse button and the icons of the collapsed strip.
- **Canvas** (B142, in progress) — the workspace the Panel sits over; it brings a focused element out from behind the Panel.
- **Frame** (B143), **StickyNote** (B145), **Comment** (B146) — other components of the playground (in progress).

## Open questions
- **Loading** state of a tab: waiting for B065.
- **Tabs**: keyboard and screen reader details come from the Tabs component (B093).
- **Canvas** (B142): applies the rule "a focused element is never hidden by the Panel".
