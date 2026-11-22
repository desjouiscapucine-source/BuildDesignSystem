# Avatar — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
A round mark that stands for a person, with their initials, or a generic person icon when the name is unknown. Building block of CommentMessage (B160) and Comment (B146): the comment marker and each message show the author in an avatar. Not interactive.

## Types
| Type | Purpose |
| ---- | ------- |
| Avatar (single type) | A small, static circle standing for one person. |

## Anatomy
1. Container — a circle with a background color (required). No border.
2. Content — one of (required):
   - **Initials** — when the person's name is known;
   - **Icon** — the Material Symbol `person`, when the name is unknown.

## Variants

### Variant properties
| Property | Values | Default | Description |
| -------- | ------ | ------- | ----------- |
| `size` | `small` / `medium` / `large` | `medium` | Diameter of the circle, with the matching text style and icon size. |

The content is **not** a variant property: it is chosen automatically from the name (initials when a name is given, icon otherwise).

### Combinations
- Allowed: all combinations (every size, with initials or the icon).

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Name (full name of the person, not shown) | No — without a name the icon is shown | Capucine Desjouis | No limit | Not shown: only the initials are drawn. |
| Initials (derived from the name) | Shown when a name is given | CD | 2 letters | Never overflows: at most 2 letters. |

- **Initials**: uppercase. Two letters for a name of two words or more — first letter of the **first** and of the **last** word ("Capucine Desjouis" → "CD", "Anne Marie Dupont" → "AD"); **one letter** for a one-word name ("Capucine" → "C").
- **Screen reader** (changed at the guidelines stage, B159-2):
  - avatar **shown alone** (e.g. the Comment marker): announces the **full name** of the person (not the initials);
  - avatar **with the name written next to it**: **decorative**, hidden from screen readers, so the name is not read twice;
  - avatar without a name (icon): **decorative**, hidden; the context says who it is.

## Sizes
Three sizes. The circle is square: width = height = the diameter.

| Size | Diameter | Initials text style | Icon size |
| ---- | -------- | ------------------- | --------- |
| `small` | `--space-24` | `label-sm` | `--icon-size-16` |
| `medium` (default) | `--space-32` | `label` | `--icon-size-20` |
| `large` | `--space-48` | `heading-5` | `--icon-size-32` |

Not interactive: no target size requirement (WCAG 2.5.8 does not apply).

## States
- **Default** only.
- **No interaction states** (hover, focus, pressed): the avatar is not interactive; a parent component (e.g. the Comment marker) handles any click.
- **No disabled state.**

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Container | Background | all | `--color-background-brand` |
| Container | Width and height | `size = small` / `medium` / `large` | `--space-24` / `--space-32` / `--space-48` |
| Container | Radius | all | `--radius-full` |
| Initials | Text style | `size = small` / `medium` / `large` | `label-sm` / `label` / `heading-5` (`.ds-text-<style>`) |
| Initials | Color | all | `--color-text-inverse` |
| Icon | Size | `size = small` / `medium` / `large` | `--icon-size-16` / `--icon-size-20` / `--icon-size-32` |
| Icon | Color | all | `--color-icon-inverse` |

Contrast (already checked in `tokens/contrast-pairs.json`): `text.inverse` on `background.brand` — 6.10:1 (min 4.5:1); `icon.inverse` on `background.brand` — 6.10:1 (min 3:1).

## Open questions
- Prop name for the person's name in code (e.g. `name`), and how the code knows the name is written next to the avatar (decorative): decided at the code stage.
