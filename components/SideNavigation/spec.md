# SideNavigation — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** organism

## Purpose
Main navigation of an application, displayed on the side of the page.

## Types
| Type | Purpose |
| ---- | ------- |
| SideNavigation | The only type. Always expanded on desktop; below desktop, opened and closed with a burger button. |

## Anatomy
1. Container (required) — the brand-colored navigation area
2. Navigation items (required) — a list of **NavigationItem** components (icon + label)

No section titles, no logo, no extra zones.

## Variants

### Variant properties
None: the side navigation has a single look.

| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `label` | Text | "Main navigation" | Name of the navigation announced to screen readers. |
| `children` | NavigationItem components | — (required) | The items of the navigation. |
| `open` | `true`, `false` | `false` | Below desktop only: the navigation is shown over the page. Ignored on desktop (always shown). |

### Combinations
- Not applicable (no variant property).

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Items | Yes | "Dashboard", "Reports" | See NavigationItem (20 characters) | See NavigationItem (wraps) |
| Accessible name | Yes (default provided) | "Main navigation" | — | Not displayed |

## Sizes
One size only.

| Size | Width | Height | Padding | Gap between items |
| ---- | ----- | ------ | ------- | ----------------- |
| Default | `--size-side-navigation` (240px) | Full height of the screen | `--space-16` | `--space-8` |

- When the items do not fit in the height, the navigation **scrolls**.
- Always expanded: no collapsed version.
- **Below desktop** (`breakpoint.desktop`, 1024px): hidden by default, opened with a **burger button** placed outside the component (an **IconButton** `primary`, icon `menu` / `close`, label "Open navigation" / "Close navigation", `aria-expanded` and `aria-controls` = the navigation's `id`). When open (`open`), it slides in from the left **over the page**, with `--shadow-panel`, in `--duration-200` `--easing-ease-out`, at the `navigation` z-index. It closes with the burger button, or when a page is opened.

## States
- The container has no interaction state.
- The states (hover, focus, pressed, selected, disabled) are those of the **NavigationItem**.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | all | `--color-background-brand` |
| Container | Width | all | `--size-side-navigation` |
| Container | Padding | all | `--space-16` |
| Items | Gap | all | `--space-8` |
| Container | Separation from the page | desktop | none (the brand background is enough) |
| Container | Shadow | below desktop, open | `--shadow-panel` |
| Container | Slide in / out | below desktop | `--duration-200` · `--easing-ease-out` |
| Container | Stacking order | below desktop | `--z-index-navigation` |

### Contrast (WCAG 2.2 AA)
- Items: see the NavigationItem spec (white on brand 6.10:1; selected brand on cream 5.35:1; focus ring white 6.10:1).

## Open questions
- None.
