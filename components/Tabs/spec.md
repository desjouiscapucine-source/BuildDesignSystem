# Tabs — Design spec

> What the component **is**. For how and when to use it, see `guidelines.md`.
> Every visual value is a **semantic design token** — never a raw value.

## Purpose
A row of tabs that shows one panel of the page at a time. It lines up its **Tab** building blocks (B157), manages the selection and shows the panel of the selected tab under the row.

## Types
| Type | Purpose |
| ---- | ------- |
| Single type | A row of Tab, left-aligned, with the panel of the selected tab under it. |

## Anatomy
1. Tab list (required) — the row of Tab, left-aligned; each tab as wide as its label.
2. Line (required) — under the whole row, drawn inside it; the selection line of the selected tab sits on it, so the scrolling row never cuts it.
3. Tabs (required, two or more) — **Tab** components; their look belongs to Tab.
4. Panel (required) — the content of the selected tab, given by the page; under the row.

## Variants
No variant property. The look of each tab (default, selected, disabled) belongs to Tab.

## Content
| Text | Required | Example | Max length | Overflow |
| ---- | -------- | ------- | ---------- | -------- |
| Tab labels | Yes | Design spec · Guidelines · Code | Tab rules (one to three words) | When the tabs do not fit, the row scrolls horizontally |
| Panel content | Yes | Given by the page | — | — |

## Sizes
One size.

| Part | Value |
| ---- | ----- |
| Space between two tabs | `--space-4` |
| Line under the row | `--border-width-1` |
| Space between the row and the panel | `--space-24` |
| Panel padding | None (the page or the container sets it) |

## States
- **Tabs**: the states of the Tab component (default, selected, hover, focus, pressed, disabled). The Tab focus ring is drawn inside the tab (Tab 1.1), so the scrolling row never cuts it.
- **Horizontal scroll**: when the tabs do not fit (mobile, narrow Panel), the row scrolls horizontally with a finger, a trackpad or the keyboard; no button, scrollbar hidden. The selected tab is brought into view.
- **Panel focus**: the panel is always focusable (after the row in the tab order), with the focus outline `--border-width-2` in `--color-border-focus`.

## Backgrounds
`--color-background-page` and `--color-background-surface` (e.g. in Panel). The contrast pairs of Tab on both backgrounds are in `contrast-pairs.json`.

## Design tokens
| Part | Property | Variant / state | Token |
| ---- | -------- | --------------- | ----- |
| Tab list | Space between tabs | All | `--space-4` |
| Line | Width | All | `--border-width-1` |
| Line | Color | All | `--color-border-subtle` |
| Panel | Space above (from the row) | All | `--space-24` |
| Panel | Focus ring | Focus | `--border-width-2`, `--color-border-focus` |
| Tabs | All properties | All | Tab (`components/Tab/spec.md`) |

## Open questions
- None.
