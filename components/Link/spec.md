# Link — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
A text action that takes the user to another page or place. Replaces the links written by hand on the documentation site (links in texts and descriptions).

## Types
| Type | Purpose |
| ---- | ------- |
| Link (single type) | A text link inside or next to a text, taking the user to another page or place. |

## Anatomy
1. Label — the text of the link, always underlined (required). No container, no icon.

## Variants

### Variant properties
One variant (default, brand color `text.link`). No variant property.

### Combinations
- Not applicable (one variant).

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Label | Yes | design guidelines | No fixed limit | Wraps with the surrounding text. |

Text only: no icon before or after the label.

## Sizes
No size of its own: the link **inherits the text style of the surrounding text** (font family, size, weight, line height).

| Size | Text style | Underline thickness |
| ---- | ---------- | ------------------- |
| Inherited | Surrounding text | `--border-width-1` |

Target size (WCAG 2.5.8): a link inside a sentence is exempt (inline exception). A standalone link uses the spacing exception: a 24px circle centered on the link never touches another target, so it keeps at least 24px from the next target (decided on 2026-11-04).

## States
- **Default** — `text.link`, underline 1px.
- **Hover** — darker color `text.link-hover`. **Link exception to state layers**: no state layer.
- **Focus** — no outline, no state layer: the underline gets thicker (`--border-width-2`).
- **Pressed** — darker color `text.link-pressed`. No state layer.
- **Visited** (component-specific) — `text.link-visited`, for a link already visited.
- **No disabled state.**

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Label | Text style | all | Inherited from the surrounding text |
| Label | Color (text and underline) | default, focus | `--color-text-link` (primary-600) |
| Label | Color (text and underline) | hover | `--color-text-link-hover` (primary-700) |
| Label | Color (text and underline) | pressed | `--color-text-link-pressed` (primary-800) |
| Label | Color (text and underline) | visited | `--color-text-link-visited` (primary-800) |
| Label | Underline | all | Always underlined |
| Label | Underline thickness | default, hover, pressed, visited | `--border-width-1` |
| Label | Underline thickness | focus | `--border-width-2` |

New tokens for this component (approved by the Design System Lead on 2026-11-04): `color.text.link-hover`, `color.text.link-pressed`, `color.text.link-visited`.

Contrast (checked in `tokens/contrast-pairs.json`): `text.link`, `text.link-hover`, `text.link-pressed` and `text.link-visited` on `background.page`, `background.surface` and `background.brand-subtle` — 4.5:1, all pass.

## Open questions
- None.
