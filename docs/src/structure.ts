// Navigation structure of the site (navigation skill): Level 1 spaces → Level 2 sections → Level 3 pages → Level 4 component pages.
// Drives the header (spaces), the side navigation (the current space) and the search (every page).
import { components, levels } from "./registry";
import { foundations } from "./foundations";
import { prototypeName, prototypes } from "./prototypes";
import { projects } from "./projects";

export interface NavNode {
  href: string; // "#/backlog", or "/prototypes/" for a page outside the documentation site
  label: string;
  icon: string; // Material Symbols name
  description?: string; // one line, shown on the cards that link to this page
  children?: NavNode[];
}

/** URL slug of an Atomic Design category page: "atom" → "atoms". */
export const categorySlug = (title: string) => title.toLowerCase();

// Level 2 — Prototypes: one Level 3 page per prototype.
const prototypesSection: NavNode = {
  href: "#/prototypes",
  label: "Prototypes",
  icon: "devices",
  description: "Interactive mockups built with the components",
  children: [
    ...prototypes.map((name) => ({
      href: `#/prototypes/${name}`,
      label: prototypeName(name),
      icon: "preview",
      description: "Live preview on mobile, tablet and desktop",
    })),
    { href: "/prototypes/", label: "All prototypes", icon: "devices", description: "Open the prototypes list" },
  ],
};

// Level 2 — Projects: one Level 3 page per project (its user journey, then user flow and prototype).
const projectsSection: NavNode = {
  href: "#/projects",
  label: "Projects",
  icon: "folder_special",
  description: "User journeys of each project, before its user flow and prototype",
  children: [
    ...projects.map((project) => ({
      href: `#/projects/${project.slug}`,
      label: project.name,
      icon: "folder_special",
      description: project.lead,
    })),
    { href: "#/projects", label: "All projects", icon: "folder_special", description: "Open the projects list" },
  ],
};

const documentation: NavNode = {
  href: "#/",
  label: "Design system",
  icon: "menu_book",
  description: "Governance, foundations, components, prototypes and projects",
  children: [
    { href: "#/", label: "Overview", icon: "home", description: "What the design system contains" },
    {
      href: "#/governance",
      label: "Governance",
      icon: "gavel",
      description: "Backlog, skills, agents, git workflow, branches, changelog, navigation, releases",
      children: [
        { href: "#/backlog", label: "Backlog", icon: "view_kanban", description: "Tasks still to do" },
        {
          href: "#/skills",
          label: "How to use skills",
          icon: "psychology",
          description: "The orchestrator, its child skills and how to call them",
        },
        {
          href: "#/agents",
          label: "Agents",
          icon: "smart_toy",
          description: "The agents Claude runs for recurring checks, and their rules",
        },
        {
          href: "#/git-workflow",
          label: "Git workflow",
          icon: "account_tree",
          description: "How the work goes from a branch to a release",
        },
        {
          href: "#/branches",
          label: "Branches",
          icon: "fork_right",
          description: "Every branch, its conversation and what the next release contains",
        },
        {
          href: "#/changelog",
          label: "Changelog",
          icon: "history",
          description: "Every version of every component, newest first",
        },
        {
          href: "#/navigation",
          label: "Navigation structure",
          icon: "account_tree",
          description: "Navigation levels of the site and how to move between them",
        },
        {
          href: "#/releases",
          label: "Release planning",
          icon: "event",
          description: "The tickets delivered by each release, every two weeks",
        },
      ],
    },
    {
      href: "#/foundations",
      label: "Foundations",
      icon: "token",
      description: "Design tokens, one page per category",
      children: foundations.map((f) => ({
        href: `#/foundations/${f.slug}`,
        label: f.label,
        icon: f.icon,
        description: f.lead,
      })),
    },
    {
      href: "#/components",
      label: "Components",
      icon: "widgets",
      description: "Components by Atomic Design level",
      children: levels.map(({ level, title }) => {
        const list = components.filter((c) => c.level === level);
        return {
          href: `#/components/${categorySlug(title)}`,
          label: title,
          icon: "category",
          description: list.length === 0 ? "No component yet" : list.map((c) => c.name).join(", "),
          children: list.map((c) => ({
            href: `#/components/${c.slug}`,
            label: c.name,
            icon: "widgets",
            description: c.description,
          })),
        };
      }),
    },
    prototypesSection,
    projectsSection,
  ],
};

const portfolio: NavNode = {
  href: "#/portfolio",
  label: "Portfolio",
  icon: "work",
  description: "Experience, skills and education",
  children: [{ href: "#/portfolio", label: "Portfolio", icon: "work" }],
};

/** Level 1 spaces, in the order of the navigation skill. */
export const spaces: NavNode[] = [documentation, portfolio];

/** Nodes from the space down to the page at `href` (deepest match), or [] if the page is not in the structure. */
export function pathTo(href: string, nodes: NavNode[] = spaces): NavNode[] {
  for (const node of nodes) {
    const below = node.children ? pathTo(href, node.children) : [];
    if (below.length > 0) return [node, ...below];
    if (node.href === href) return [node];
  }
  return [];
}

/** Every page of the site, for the search: label + the label of its space. */
export function allPages(): (NavNode & { space: string })[] {
  const seen = new Set<string>();
  const out: (NavNode & { space: string })[] = [];
  const walk = (nodes: NavNode[], space: string) =>
    nodes.forEach((node) => {
      if (!seen.has(node.href)) {
        seen.add(node.href);
        out.push({ ...node, space });
      }
      if (node.children) walk(node.children, space);
    });
  spaces.forEach((space) => walk(space.children ?? [], space.label));
  return out;
}
