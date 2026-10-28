# NavigationItem — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

**Level:** molecule

## Purpose
A link in a navigation, with an icon and a label. It always leads to a page (`<a href>`).

A **parent** item groups child items: it does not lead to a page, it only opens and closes its children, with an arrow on the right (B098).

It sits on the **brand background** of the side navigation.

## Types
| Type | Purpose |
| ---- | ------- |
| Link | Leads to a page (`<a href>`). At any level: top level, or a child inside a parent. |
| Parent | Opens and closes its children (a button, no page). Has an arrow on the right. At any level: a child can itself be a parent. |

## Anatomy
1. Container (required) — takes the full width of the navigation
2. Icon (required, except for a child: a child has no leading icon) — aligned with the first line of the label
3. Label (required)
4. Arrow (parent only, required) — on the right, aligned with the first line of the label
5. Children (parent only, required) — link or parent items **without leading icon**, shown below the parent when it is open, indented

**Levels**: unlimited — a child can itself be a parent, with the same behavior as a top-level parent (arrow, open / closed, child selected). Each level adds `--space-16` of indent.

```
📁 Projets            ⌄
     Projet A         ⌄
          Tâches
          Documents
     Projet B
```

## Variants

### Variant properties
None: the item has a single look. Its differences are **states** (see States).

| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `icon` | Any Material Symbols name | — (required, except for a child) | Icon before the label. A child has none. |
| `href` | A page address | — (required for a link) | The page the item leads to. A parent has none. |
| `label` | Text | — (required for a parent) | Label of a parent. Its children (link items) go inside the component. A link keeps its label as the content of the component. |
| `selected` | `true` / `false` | `false` | The item of the page currently displayed. |
| `disabled` | `true` / `false` | `false` | The page is not available. |

### Combinations
- Allowed: all, except the forbidden one below.

| Combination | Reason |
| ----------- | ------ |
| `selected` + `disabled` | The page currently displayed is always available. |
| Parent + `href` | A parent only opens and closes; it never leads to a page. |
| Parent + `disabled` | A parent is never disabled. |
| Child + `icon` | A child has no leading icon. |

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Label | Yes | "Dashboard" | 20 characters | Wraps to a new line; the icon stays aligned with the first line |

## Sizes
One size only.

| Size | Height | Padding | Text style | Icon size |
| ---- | ------ | ------- | ---------- | --------- |
| Default | ≈ 37px for one line (label line height + padding) | `--space-8` (all sides) | `body` · `label` when selected | `--icon-size-20` |

- Gap between icon, label and arrow: `--space-8`.
- Arrow (parent): `--icon-size-20`, same as the icon.
- Children: indented by `--space-16` from the left edge of their parent — `--space-16` more at each level (level 1: 16px, level 2: 32px…).
- Corner radius: `--radius-8`.
- Interactive target: full width × ≈ 37px, above the 24×24px minimum (WCAG 2.5.8).

## States
- Interaction (state layers, in the content color): **Default · Hover** (`--state-layer-hover`) **· Focus** (`--state-layer-focus` + outline) **· Pressed** (`--state-layer-pressed`)
- **Selected** — the item of the page currently displayed: cream background, brown label in semibold.
- **Disabled** — the whole item at `--opacity-disabled` (0.38), no state layer.
- **Closed / Open** (parent) — closed: arrow down (`expand_more`), children hidden. Open: arrow up (`expand_less`, the same icon turned by 180°), children shown below.
  - Default: **closed**, except when the page displayed is one of its children → **open**.
  - Animation: the arrow turns in `--duration-200` `--easing-ease-in-out`; the children appear at once, no animation.
- **Child selected** (parent, closed) — when the page displayed is one of its hidden children, the parent takes the **selected look** (cream background, brown semibold label), so the current place stays visible. Open, the parent keeps its default look: the selected child shows it.

Focus outline: `--border-width-2` solid `--color-border-focus-inverse` (white on the brand background).

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Context | Background the item sits on | all | `--color-background-brand` |
| Container | Background | default | none (transparent) |
| Container | Background | selected | `--color-background-brand-subtle` |
| Container | Padding | all | `--space-8` |
| Container | Gap | all | `--space-8` |
| Container | Radius | all | `--radius-8` |
| Container | Focus outline | focus | `--border-width-2` · `--color-border-focus-inverse` |
| Container | State layer | hover / focus / pressed | `--state-layer-hover` / `--state-layer-focus` / `--state-layer-pressed` |
| Container | Opacity | disabled | `--opacity-disabled` |
| Label | Text style | default | `body` |
| Label | Text style | selected | `label` |
| Label | Color | default | `--color-text-inverse` |
| Label | Color | selected | `--color-text-brand` |
| Icon | Size | all | `--icon-size-20` |
| Icon | Color | default | `--color-icon-inverse` |
| Icon | Color | selected | `--color-icon-brand` |
| Arrow | Size | parent | `--icon-size-20` |
| Arrow | Color | parent | same as the icon (`--color-icon-inverse`, or `--color-icon-brand` with the selected look) |
| Arrow | Rotation | open | `--duration-200` · `--easing-ease-in-out` |
| Children | Left indent | child | `--space-16` per level |

### Contrast (WCAG 2.2 AA)
| State | Label | Icon | Focus outline |
| ----- | ----- | ---- | ------------- |
| Default (white on brand) | 6.10:1 ✓ | 6.10:1 ✓ | 6.10:1 ✓ |
| Selected (brand on cream) | 5.35:1 ✓ | 5.35:1 ✓ | — |
| Disabled | exempt | exempt | — |

**With the state layer applied:**

| State | Hover | Focus | Pressed |
| ----- | ----- | ----- | ------- |
| Default | 5.07:1 ✓ | 4.64:1 ✓ | 3.58:1 — accepted |
| Selected | 4.82:1 ✓ | 4.57:1 ✓ | 3.87:1 — accepted |

Decision of the Design System Lead: as for the Button, the **pressed** state is momentary, so its lower contrast is **accepted**.

## Open questions
- **Counter**: a counter will be added with the future **Badge** component (spec update to approve then).
