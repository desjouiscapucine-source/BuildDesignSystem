# BuildDesignSystem

A design system built without Figma: design specs, usage guidelines, coded components and interactive mockups all live in this repository and run locally.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173:
- `/docs/` — documentation site (tokens, component specs, guidelines, examples)
- `/prototypes/` — interactive mockups

## Commands

| Command | What it does |
| ------- | ------------ |
| `npm run dev` | Builds the tokens and starts the local server |
| `npm run tokens` | Compiles the token files into `tokens/tokens.css` and checks WCAG AA contrast |
| `npm run typecheck` | Checks TypeScript types |
| `npm run build` | Builds a static version into `dist/` |

## Project structure

```
tokens/        Design tokens (primitives.json + semantic.json = source of truth)
components/    One folder per component: spec, guidelines, code, examples
docs/          Local documentation site
prototypes/    Interactive mockups, one folder each
scripts/       Build scripts (tokens)
```

See `CLAUDE.md` for the project context and workflow, and `STEPS.md` for the history of every step.
