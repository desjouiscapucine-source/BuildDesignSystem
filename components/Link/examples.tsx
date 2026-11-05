// Live examples shown in the Examples tab of the documentation site.
import type { Example } from "../../docs/src/types";
import { Link } from "./Link";

const text = { margin: 0, color: "var(--color-text-primary)" } as const;
// Demo links stay on the page, so hover, press and focus can be tried.
const stay = { onClick: (event: { preventDefault: () => void }) => event.preventDefault() };
const box = { padding: "var(--space-16)", borderRadius: "var(--radius-8)" } as const;

export const examples: Example[] = [
  {
    title: "In a text",
    description: "The link takes the text style of the sentence. Hover, press, Tab to focus: try it.",
    render: () => (
      <p className="ds-text-body" style={text}>
        Read the <Link {...stay} href="#/governance">git workflow skill</Link> before you start.
      </p>
    ),
  },
  {
    title: "Inherited text style",
    description: "Same Link in body-sm, body and lead text.",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        <p className="ds-text-body-sm" style={text}>
          See the <Link {...stay} href="#/foundations">design tokens</Link> page.
        </p>
        <p className="ds-text-body" style={text}>
          See the <Link {...stay} href="#/foundations">design tokens</Link> page.
        </p>
        <p className="ds-text-lead" style={text}>
          See the <Link {...stay} href="#/foundations">design tokens</Link> page.
        </p>
      </div>
    ),
  },
  {
    title: "Standalone",
    description: "Alone under a block; at least 24px from the next target (WCAG 2.5.8, spacing exception).",
    render: () => (
      <p className="ds-text-body" style={text}>
        <Link {...stay} href="#/governance">Read the git workflow skill</Link>
      </p>
    ),
  },
  {
    title: "Visited",
    description: "A link to a page already open in this browser (this page) shows text.link-visited.",
    render: () => (
      <p className="ds-text-body" style={text}>
        Back to the <Link {...stay} href="#/components/link">Link component</Link> page.
      </p>
    ),
  },
  {
    title: "Long label",
    description: "A long label wraps with the surrounding text; the underline follows each line.",
    render: () => (
      <p className="ds-text-body" style={{ ...text, maxWidth: "50%" }}>
        Before you start, read the <Link {...stay} href="#/governance">rules of the git workflow and of the release planning</Link> of the project.
      </p>
    ),
  },
  {
    title: "Allowed backgrounds",
    description: "background.page, background.surface and background.brand-subtle.",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        {(["page", "surface", "brand-subtle"] as const).map((bg) => (
          <p key={bg} className="ds-text-body" style={{ ...text, ...box, background: `var(--color-background-${bg})` }}>
            On background.{bg}: see the <Link {...stay} href="#/foundations">design tokens</Link> page.
          </p>
        ))}
      </div>
    ),
  },
];
