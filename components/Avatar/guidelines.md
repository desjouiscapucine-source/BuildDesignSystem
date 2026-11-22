# Avatar — Guidelines

> **How and when** to use the component. For what it is, see `spec.md`.

## When to use
- **Author of content**: who wrote a comment or a message (CommentMessage, Comment marker).
- **Assignee**: who a ticket or a task belongs to.
- **Signed-in user**: the current user, e.g. in the header.
- **List of people**: the members of a team, the participants.

## When not to use
- For a logo or an illustration: a brand or an illustration is an **image**, not a person (e.g. the site logo).
- For a status or a category: use **Tag** instead.
- For a group of people shown as overlapping avatars: use **AvatarGroup** instead (not in the design system yet).
- For a clickable profile: the Avatar is never interactive; wrap it, with the name, in a **Button** or a **Link** (or a parent component that handles the click).

## Usage best practices
- **Name always visible**: the full name is written next to the avatar, `--space-8` between them.
  - Only exception: a **marker** that shows the name on click (e.g. the Comment marker, whose bubble shows the author's name).
- **Size by context**:
  - `small` — next to body text and in lists;
  - `medium` (default) — e.g. the Comment marker;
  - `large` — in a profile or a page header.
- **Lists of people**: one person per row (avatar + name), rows stacked, the **same size** for every avatar of the list.
- **No limit** on the number of avatars on a screen: as many as there are people shown.

## Do's and don'ts
| Do | Don't |
| -- | ----- |
| Show the `person` icon when the name is genuinely unknown: avatar with the icon + "Deleted account". | Invent initials or a placeholder: "??" + "Deleted account". |
| Use one size in a list, one person per row: three `small` avatars, each with its name. | Mix sizes in a list: `large`, `small` and `medium` avatars in the same list. |
| Show a status with a Tag next to the person: `small` avatar + name + Tag "In progress". | Use an avatar for something that is not a person: "OK" in an avatar next to "Ticket B159". |

## Content guidelines
- **The full name of the person** is given to the avatar; the initials are computed from it (`spec.md`, Content): uppercase, first letter of the first and of the last word ("Capucine Desjouis" → "CD"), one letter for a one-word name ("Capucine" → "C").
- **Never type initials by hand** and never use letters that are not a person (a status, an abbreviation).
- **Icon only when the name is unknown** (deleted account, anonymous) — never as a placeholder while the name is loading.

## Behavior
- **Not interactive**: no hover, focus or pressed state; a parent component handles any click.
- **Content chosen automatically**: initials when a name is given, the `person` icon otherwise.
- **Long name written next to it**: the name wraps onto several lines; the avatar stays aligned with the first line and never shrinks.
- **Responsive**: same size on every screen; the layout around it adapts.

## Accessibility
- **Keyboard:** none — the avatar is not focusable. A clickable parent (Button, Link, Comment marker) carries the keyboard behavior.
- **Focus:** none on the avatar itself.
- **Screen reader:**
  - avatar **with the name written next to it** (the usual case): **decorative** and hidden, so the name is read once, from the text;
  - avatar **shown alone** (the marker exception): an image named with the **full name** (not the initials);
  - avatar **without a name** (icon): **decorative** and hidden; the context says who it is.
- **Contrast:** `text.inverse` and `icon.inverse` on `background.brand` — 6.10:1 (4.5:1 and 3:1 required). Already checked in the spec.
- **Touch target:** not applicable (not interactive); the smallest size is 24×24px anyway.

## Related components
- **CommentMessage** — shows the author of a message with an Avatar (in progress, B160).
- **Comment** — its marker is the Avatar of the author of the first message (in progress, B146).
