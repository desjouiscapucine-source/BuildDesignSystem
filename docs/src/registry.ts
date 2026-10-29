// Discovers every component folder in components/ (folders starting with "_" are ignored).
import type { ComponentType } from "react";
import type { ChangelogEntry, ComponentDoc, DesignTokens, Example, Level, PreviewProps, Status } from "./types";

type Meta = {
  name: string;
  description: string;
  level: Level;
  status: Status;
  version?: string;
  changelog?: ChangelogEntry[];
};

const metas = import.meta.glob<Meta>(["../../components/*/meta.json", "!../../components/_*/**"], {
  eager: true,
  import: "default",
});
const specs = import.meta.glob<string>(["../../components/*/spec.md", "!../../components/_*/**"], {
  eager: true,
  query: "?raw",
  import: "default",
});
const guidelines = import.meta.glob<string>(["../../components/*/guidelines.md", "!../../components/_*/**"], {
  eager: true,
  query: "?raw",
  import: "default",
});
const examples = import.meta.glob<Example[]>(["../../components/*/examples.tsx", "!../../components/_*/**"], {
  eager: true,
  import: "examples",
});

const designTokens = import.meta.glob<DesignTokens>(["../../components/*/design/tokens.json", "!../../components/_*/**"], {
  eager: true,
  import: "default",
});
const previews = import.meta.glob<ComponentType<PreviewProps>>(
  ["../../components/*/design/Preview.tsx", "!../../components/_*/**"],
  { eager: true, import: "Preview" },
);

// Component folder name: the segment right after "components/".
// Source files of the coded component (not the examples, not the design preview).
const sources = import.meta.glob<string>(
  ["../../components/*/*.tsx", "../../components/*/*.css", "!../../components/*/examples.tsx", "!../../components/*/playground.tsx", "!../../components/_*/**"],
  { eager: true, query: "?raw", import: "default" },
);

const folderOf = (path: string) => path.split("/components/")[1].split("/")[0];
const byFolder = <T>(files: Record<string, T>) =>
  Object.fromEntries(Object.entries(files).map(([path, value]) => [folderOf(path), value]));

const specByFolder = byFolder(specs);
const guidelinesByFolder = byFolder(guidelines);
const examplesByFolder = byFolder(examples);
const designTokensByFolder = byFolder(designTokens);
const previewsByFolder = byFolder(previews);

export const components: ComponentDoc[] = Object.entries(metas)
  .map(([path, meta]) => {
    const folder = folderOf(path);
    return {
      slug: folder.toLowerCase(),
      folder,
      name: meta.name,
      description: meta.description,
      level: meta.level,
      status: meta.status,
      version: meta.version ?? "0.0",
      changelog: meta.changelog ?? [],
      spec: specByFolder[folder],
      guidelines: guidelinesByFolder[folder],
      examples: examplesByFolder[folder] ?? [],
      code: Object.fromEntries(
        Object.entries(sources)
          .filter(([path]) => folderOf(path) === folder)
          .map(([path, content]) => [path.split("/").at(-1)!, content])
          .sort(([a], [b]) => (a.endsWith(".tsx") ? -1 : 1) - (b.endsWith(".tsx") ? -1 : 1)),
      ),
      design:
        designTokensByFolder[folder] && previewsByFolder[folder]
          ? { tokens: designTokensByFolder[folder], Preview: previewsByFolder[folder] }
          : undefined,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const levels: { level: Level; title: string }[] = [
  { level: "atom", title: "Atoms" },
  { level: "molecule", title: "Molecules" },
  { level: "organism", title: "Organisms" },
  { level: "template", title: "Templates" },
  { level: "page", title: "Pages" },
];
