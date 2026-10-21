// Discovers every prototype folder in prototypes/ that has an index.html (folders starting with "_" are ignored).
const pages = import.meta.glob(["../../prototypes/*/index.html", "!../../prototypes/_*/**"]);

/** Prototype folder names, sorted. */
export const prototypes: string[] = Object.keys(pages)
  .map((path) => path.split("/").at(-2)!)
  .sort();
