// Discovers the playground of every component (components/<Name>/playground.tsx), by component slug.
// Shared by the component page (controls, code) and the canvas page (docs/playground.html).
import type { Playground } from "./playground";

const files = import.meta.glob<Playground>(["../../components/*/playground.tsx", "!../../components/_*/**"], {
  eager: true,
  import: "playground",
});

export const playgrounds: Record<string, Playground> = Object.fromEntries(
  Object.entries(files).map(([path, playground]) => [path.split("/components/")[1].split("/")[0].toLowerCase(), playground]),
);
