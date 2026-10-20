# Prototypes

Prototypes are **user journeys** (parcours): interactive mockups built with the design system components.
Their screens are built directly from the components (organisms, molecules, atoms), not from the templates and pages.

One folder per interactive mockup, named in kebab-case (e.g. `checkout-flow/`).
To start a new prototype, copy `_template/`.

- Build screens only with components imported from `@ds/components`.
- Navigation between screens is handled with simple React state (see the template).
- New folders appear automatically on the prototypes page (`/prototypes/`).
