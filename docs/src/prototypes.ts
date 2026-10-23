// Discovers every prototype folder in prototypes/ that has an index.html (folders starting with "_" are ignored).
const pages = import.meta.glob<string>(["../../prototypes/*/index.html", "!../../prototypes/_*/**"], {
  query: "?raw",
  import: "default",
  eager: true,
});

const folderOf = (path: string) => path.split("/").at(-2)!;

/** Prototype folder names, sorted. */
export const prototypes: string[] = Object.keys(pages).map(folderOf).sort();

// Prototype name: the <title> of its index.html, "<Prototype name> — BuildDesignSystem" (prototype-setup skill).
const names = new Map(
  Object.entries(pages).map(([path, html]) => {
    const title = /<title>(.*?)<\/title>/s.exec(html)?.[1].trim() ?? "";
    return [folderOf(path), title.split(" — ")[0] || folderOf(path)];
  }),
);

/** Name of a prototype (falls back to its folder name). */
export const prototypeName = (folder: string): string => names.get(folder) ?? folder;
