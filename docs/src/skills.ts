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
 * headings two levels lower (## → ####) so they stay under the card title (h3). Code blocks are left as is. */
export function cardBody(body: string): string {
  let inCode = false;
  return body
    .replace(/^\s*# .*\n/, "")
    .split("\n")
    .map((line) => {
      if (line.startsWith("```")) inCode = !inCode;
      return !inCode && /^#{2,4} /.test(line) ? `##${line}` : line;
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
