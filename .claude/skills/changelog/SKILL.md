---
name: changelog
description: Versions and changelogs of the design system components — the X.Y version, which number goes up, how a changelog entry is written in meta.json, and where it is shown (version badge, Changelog tab, Changelog page of Governance). Use whenever a component becomes complete, whenever a complete component changes, and whenever a version or a changelog entry is created, reviewed or corrected.
---

# Changelog

Decided by the Design System Lead on 2026-10-28 (B096, B097).

## 1. Version

- Every component has a **version** `X.Y` in its `meta.json` (`version`).
- **`0.0`** while the component goes through its stages (`components/_template/meta.json` starts there).
- **`1.0`** when it becomes `complete` (end of the code stage, `component` skill).
- **When a complete component changes** (e.g. a new variant of NavigationItem), once the change is approved:
  - **`Y`** goes up for an **addition or a fix** that keeps the existing usage working (a new variant, a corrected state…): `1.0` → `1.1`.
  - **`X`** goes up for a **breaking change**, which breaks the existing usage (a prop renamed or removed, a changed anatomy…): `1.1` → `2.0`; `Y` goes back to `0`.
  - Not sure whether a change is breaking → ask the Design System Lead (`never-invent`).

## 2. Changelog entry

Every version has one entry in the `changelog` list of `meta.json`, **newest first**:

```json
"version": "1.1",
"changelog": [
  { "version": "1.1", "date": "2026-11-02", "changes": "New compact size." },
  { "version": "1.0", "date": "2026-10-20", "changes": "First complete version." }
]
```

| Field | Rule |
| ----- | ---- |
| `version` | The new version; the same as `version` at the top of `meta.json`. |
| `date` | The day the Design System Lead approved the change, `YYYY-MM-DD`. |
| `changes` | One sentence, in English, saying what changed for someone who uses the component. `1.0` is always "First complete version." |

- The version, its changelog entry and the `STEPS.md` entry are written **in the same step**, once the change is approved. A change that is not approved yet gets no version.
- Entries are never rewritten or removed: a mistake is corrected by a new version.

## 3. Where it is shown

The site reads `meta.json`; nothing else to update.

- **Component page**: the version as a badge next to the title, and the **Changelog** tab (Version, Date, Changes).
- **Changelog page** (`/docs/#/changelog`, Governance, under How to use skills): every version of every component, newest first.

## Not defined yet — ask before deciding

- A changelog for anything else than components (tokens, foundations, skills, the site).
