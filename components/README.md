# Components

One folder per component, named in PascalCase (e.g. `Button/`).
To start a new component, copy `_template/` and rename `ComponentName` everywhere.

| File | Stage | Content |
| ---- | ----- | ------- |
| `meta.json` | — | Name, description, Atomic Design level (`atom`, `molecule`, `organism`, `template`, `page`) and current stage (`design`, `guidelines`, `code`, then `complete`) |
| `design/Preview.tsx` + `design/tokens.json` | 1. Design | Live design preview: tokens and content tested in the Design preview tab (not the final code) |
| `spec.md` | 1. Design | What the component is: anatomy, variants, sizes, states, tokens |
| `guidelines.md` | 2. Guidelines | How and when to use it |
| `ComponentName.tsx` + `.css` | 3. Code | The developed component |
| `examples.tsx` | 3. Code | Live examples shown in the documentation |
| `playground.tsx` | 3. Code | The component live with a control per prop (Playground tab, next to the Design preview tab during the Code stage, replaces it once complete) |

Folders starting with `_` are ignored by the documentation site.
Once coded, export the component from `components/index.ts`.
