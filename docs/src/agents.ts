// Discovers every project agent in .claude/agents/ (one <name>.md per agent, with a frontmatter),
// and the rules shared by all agents (the "## Agents" section of CLAUDE.md).
import claude from "../../CLAUDE.md?raw";

export interface Agent {
  name: string;
  /** Role and when it is run. */
  description: string;
  /** Tools the agent is allowed to use. */
  tools: string[];
  /** Markdown content of the file, without the frontmatter. */
  body: string;
  /** What it reports: the "## Report" section of the file, if any. */
  report?: string;
}

const files = import.meta.glob<string>("../../.claude/agents/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

/** A "## <heading>" section of a Markdown file, without its heading: up to the next "## " heading outside code blocks. */
function section(source: string, heading: string): string | undefined {
  const lines = source.split("\n");
  const start = lines.indexOf(`## ${heading}`);
  if (start < 0) return undefined;
  let inCode = false;
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index++) {
    if (lines[index].startsWith("```")) inCode = !inCode;
    if (!inCode && lines[index].startsWith("## ")) {
      end = index;
      break;
    }
  }
  return lines.slice(start + 1, end).join("\n").trim() || undefined;
}

// Frontmatter: "key: value" lines between the two "---" lines at the top of the file.
function parse(source: string): Agent {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  const fields: Record<string, string> = {};
  for (const line of (match?.[1] ?? "").split("\n")) {
    const index = line.indexOf(":");
    if (index > 0) fields[line.slice(0, index).trim()] = line.slice(index + 1).trim();
  }
  const body = source.slice(match?.[0].length ?? 0);
  return {
    name: fields.name ?? "",
    description: fields.description ?? "",
    tools: (fields.tools ?? "").split(",").map((tool) => tool.trim()).filter(Boolean),
    body,
    report: section(body, "Report"),
  };
}

export const agents: Agent[] = Object.values(files)
  .map(parse)
  .sort((a, b) => a.name.localeCompare(b.name));

/** The rules shared by all agents: the "## Agents" section of CLAUDE.md, without its heading. */
export const agentRules = section(claude, "Agents") ?? "";
