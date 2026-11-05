// Discovers every project in projects/<name>/project.json (folders starting with "_" are ignored).
export interface JourneyPhase {
  title: string;
  actions: string;
  touchpoints: string;
}

export interface Project {
  slug: string; // folder name, kebab-case
  name: string;
  lead: string; // subtitle of the project page (page-header skill: 80 characters max)
  ticket?: string;
  journey?: { user: string; phases: JourneyPhase[] };
}

const files = import.meta.glob<Omit<Project, "slug">>(["../../projects/*/project.json", "!../../projects/_*/**"], {
  import: "default",
  eager: true,
});

/** Projects, sorted by name. */
export const projects: Project[] = Object.entries(files)
  .map(([path, data]) => ({ slug: path.split("/").at(-2)!, ...data }))
  .sort((a, b) => a.name.localeCompare(b.name));
