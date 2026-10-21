# Prototypes

Prototypes are **user journeys** (parcours): interactive mockups built with the **real React components** of the design system.
Their screens are built directly from the components (organisms, molecules, atoms), not from the templates and pages.

One folder per interactive mockup, named in kebab-case (e.g. `checkout-flow/`).
To start a new prototype, follow the `prototype-setup` skill (`.claude/skills/prototype-setup/SKILL.md`): it copies `_template/` and checks that the prototype runs. New folders appear automatically on the prototypes page (`/prototypes/`).

## Setup

| File | Role |
| ---- | ---- |
| `_shared/setup.ts` | Loads the design system: fonts, tokens, icons, grid and the base page styles. Imported once at the top of `main.tsx`: `import "../_shared/setup";` |
| `_shared/base.css` | Page base (background, text color, body font) and the screen layout, with tokens only. |
| `_shared/Screen.tsx` | One screen: page header (title `heading-1` + subtitle `lead`, one line each) then the content blocks, 16px apart, in a 24px page margin — same rules as the documentation site (`layout` and `page-header` skills). |
| `<prototype-name>/spec.md` | The prototype specification (from `_template/spec.md`): **Components & content** and **Acceptance criteria**. |
| `_data/sample.json` + `_data/sample.ts` | Sample data shared by all the prototypes (typed): `import { sample } from "../_data/sample";`. Its placeholders are replaced with the real content of each journey. |

## Rules

- Build screens only with components imported from **`@ds/components`**, inside `Screen`.
- Styles use **design tokens only** (`var(--…)`): no raw color or length.
- Navigation between screens is handled with simple React state (see the template).
- `npm run check:prototypes` checks the imports and the style values; `npm run build` fails if the check fails.

## Backlog ticket

Each prototype has **one backlog ticket** (category Prototypes) with:
- `prototype`: its folder name — the ticket page (`/docs/#/backlog/<id>`) shows its `spec.md`;
- `iterations`: the history of the reviews, oldest first. Each review by the Design System Lead adds one entry: `feedback` (what they asked) and `decision` (`changes-requested` or `validated`). The last `validated` iteration is the final validation, and the ticket goes to `done`.

