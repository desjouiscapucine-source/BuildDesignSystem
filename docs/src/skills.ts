// Discovers every project skill in .claude/skills/ (one folder per skill, with a SKILL.md).

export interface Skill {
  name: string;
  description: string;
  /** Markdown content of SKILL.md, without the frontmatter. */
  body: string;
}

const files = import.meta.glob<string>("../../.claude/skills/*/SKILL.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// Frontmatter: "key: value" lines between the two "---" lines at the top of the file.
function parse(source: string): Skill {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  const fields: Record<string, string> = {};
  for (const line of (match?.[1] ?? "").split("\n")) {
    const index = line.indexOf(":");
    if (index > 0) fields[line.slice(0, index).trim()] = line.slice(index + 1).trim();
  }
  return { name: fields.name ?? "", description: fields.description ?? "", body: source.slice(match?.[0].length ?? 0) };
}

/** The body shown inside a skill card: its top title removed (the card shows the name), and its
 * headings moved down so they stay under the card title (`level`, h3 by default: ## → ####), h6 at most.
 * Code blocks are left as is. */
export function cardBody(body: string, level = 3): string {
  let inCode = false;
  return body
    .replace(/^\s*# .*\n/, "")
    .split("\n")
    .map((line) => {
      if (line.startsWith("```")) inCode = !inCode;
      const heading = !inCode && line.match(/^(#{2,4}) /);
      return heading ? "#".repeat(Math.min(heading[1].length + level - 1, 6)) + line.slice(heading[1].length) : line;
    })
    .join("\n");
}

export const PARENT_SKILL = "orchestrator";

const all = Object.values(files).map(parse);

/** The parent skill, which dispatches every task to its children. */
export const parentSkill = all.find((skill) => skill.name === PARENT_SKILL);

/** Every other skill, by name. */
export const childSkills = all.filter((skill) => skill.name !== PARENT_SKILL).sort((a, b) => a.name.localeCompare(b.name));

/** The dispatch table of the parent skill (its "## Dispatch table" section, without the heading). */
export const dispatchTable = parentSkill?.body.match(/## Dispatch table\n([\s\S]*?)(?=\n## |$)/)?.[1].trim() ?? "";

/** Themes of the Skills section of the How to use skills page, in order (B139, approved by the Design System Lead).
 * A new skill gets its theme here; a skill without a theme is shown in a last group, "Other". */
export const SKILL_THEMES: { title: string; skills: string[] }[] = [
  { title: "Entry point", skills: [PARENT_SKILL, "never-invent"] },
  {
    title: "Components",
    skills: [
      "component",
      "component-spec",
      "component-guidelines",
      "component-code",
      "component-structure",
      "changelog",
      "accessibility-check",
    ],
  },
  { title: "Tokens", skills: ["token-naming"] },
  { title: "Pages & layout", skills: ["layout", "page-header", "page-content", "card", "navigation"] },
  { title: "Prototypes", skills: ["prototype-setup"] },
  { title: "Backlog & releases", skills: ["backlog", "ticket", "release-planning", "git-workflow"] },
];

/** The skills grouped by theme, in the order of SKILL_THEMES; the skills without a theme last, in "Other". */
export const skillGroups: { title: string; skills: Skill[] }[] = (() => {
  const byName = new Map(all.map((skill) => [skill.name, skill]));
  const groups = SKILL_THEMES.map((theme) => ({
    title: theme.title,
    skills: theme.skills.flatMap((name) => byName.get(name) ?? []),
  })).filter((group) => group.skills.length > 0);
  const themed = new Set(SKILL_THEMES.flatMap((theme) => theme.skills));
  const other = childSkills.filter((skill) => !themed.has(skill.name));
  return other.length > 0 ? [...groups, { title: "Other", skills: other }] : groups;
})();
