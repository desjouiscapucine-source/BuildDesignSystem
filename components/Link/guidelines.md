# Link — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- Inside a text (sentence or paragraph), to go to another page or to an anchor of the same page.
- Alone, under a block or in a table cell, to go to another page (e.g. "Read the git workflow skill").
- To go to another site (external link).

## When not to use
- To do something on the page (send, copy, open a modal) → use **Button** (`tertiary` for a discreet action).
- For the main navigation of the site → use **SideNavigation** / **NavigationItem**; for the path of the page → use **Breadcrumb**.
- For a link that needs an icon (arrow, `open_in_new`) → use **Button** `tertiary` with an icon and `href`: the Link is text only.

## Usage best practices
- Keep links apart: avoid several links side by side in a sentence (hard to target and to read).
- Never add styling to a link: no bold, no italic, no other color.
- One link per destination: do not repeat the same link in the same block.
- A standalone link keeps at least 24px from the next target (WCAG 2.5.8, spacing exception).
- Use the Link only on `background.page`, `background.surface` or `background.brand-subtle` (contrast pairs checked).
- Links rendered from Markdown (spec, guidelines, skills) get the same styles as the Link (`.ds-link`).

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Say where the link goes: "Read the git workflow skill before you start." | Use a vague label: "To read the git workflow skill, click here." |
| Keep the Link style: "See the design tokens page." | Make the link bold or change its color. |
| Keep links apart: "Read the spec, then the guidelines." | Put links side by side: "Read the spec guidelines code." |
| Use a Button for an action: "Copy code" (Button `tertiary` with an icon). | Use a Link for an action: "To copy the code, use copy code." |

## Content guidelines
- The label describes the destination and makes sense on its own (WCAG 2.4.4). Never "click here", "here" or "read more".
- Short: a few words, not a whole sentence. Never a raw URL as the label.
- Inside a text, the label follows the capitalization of the sentence; alone, it starts with a capital letter.
- No final punctuation inside the link: the period stays outside.
- A link to a page of the site uses the title of that page.

## Behavior
- All links, external ones included, open in the **same tab**: the user keeps control.
- A long label wraps with the surrounding text; the underline follows each line.
- A link to an anchor of the same page scrolls to the section and moves the focus to it; the section stops below the sticky header (scroll offset), never hidden under it.
- The visited state is handled by the browser (`:visited`): nothing to do in the component.
- No disabled state: a link that cannot be used is removed, or written as plain text.

## Accessibility
- **Keyboard:** reachable with Tab, activated with Enter (not Space). Rendered as `<a href>`. Tab / Shift+Tab move the focus to the next / previous element: no keyboard trap.
- **Focus:** focus order = order of the document. The focused link and the anchor target are never hidden by a sticky element or a panel. No outline and no state layer; the underline gets thicker (`--border-width-2`). This meets WCAG 2.4.7 (focus visible) but stays discreet: to check in a keyboard user test.
- **Screen reader:** announced as "link" + its label (+ "visited", depending on the screen reader). The accessible name is, or contains, the visible label (WCAG 2.5.3).
- **Contrast:** `text.link`, `text.link-hover`, `text.link-pressed` and `text.link-visited` pass 4.5:1 on `background.page`, `background.surface` and `background.brand-subtle`. The link is always underlined, so it is never told apart by color only (WCAG 1.4.1).
- **Touch target:** inside a sentence, exempt from WCAG 2.5.8 (inline exception). Alone, the link uses the spacing exception: keep at least 24px between a standalone link and the next target.

## Related components
- **Button** — for an action, or a link with an icon (`tertiary`, `href`).
- **Breadcrumb** / **BreadcrumbItem** — for the path of the page.
- **SideNavigation** / **NavigationItem** — for the main navigation of the site.
