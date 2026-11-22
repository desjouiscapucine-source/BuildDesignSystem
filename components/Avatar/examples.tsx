// Live examples shown in the Examples tab of the documentation site.
import type { Example } from "../../docs/src/types";
import { Avatar } from "./Avatar";

const row = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-16)" } as const;
const list = { display: "flex", flexDirection: "column", gap: "var(--space-8)" } as const;
// Avatar + name written next to it, space-8 apart; a long name wraps, the avatar stays on the first line.
const person = { display: "flex", alignItems: "flex-start", gap: "var(--space-8)" } as const;

export const examples: Example[] = [
  {
    title: "Sizes",
    description: "size = small, medium (default), large.",
    render: () => (
      <div style={row}>
        <Avatar name="Capucine Desjouis" size="small" />
        <Avatar name="Capucine Desjouis" />
        <Avatar name="Capucine Desjouis" size="large" />
      </div>
    ),
  },
  {
    title: "Unknown name",
    description: "Without a name, the person icon is shown (deleted account, anonymous).",
    render: () => (
      <div style={row}>
        <Avatar size="small" />
        <Avatar />
        <Avatar size="large" />
      </div>
    ),
  },
  {
    title: "Initials",
    description: "First letter of the first and of the last word; one letter for a one-word name.",
    render: () => (
      <div style={row}>
        <Avatar name="Capucine Desjouis" />
        <Avatar name="Anne Marie Dupont" />
        <Avatar name="Capucine" />
      </div>
    ),
  },
  {
    title: "List of people",
    description: "One person per row, the name next to the avatar (space-8), the same size for the whole list.",
    render: () => (
      <div style={list}>
        {["Capucine Desjouis", "Anne Marie Dupont", "Léa"].map((name) => (
          <div key={name} className="ds-text-body" style={person}>
            <Avatar name={name} size="small" />
            <span>{name}</span>
          </div>
        ))}
        <div className="ds-text-body" style={person}>
          <Avatar size="small" />
          <span>Deleted account</span>
        </div>
      </div>
    ),
  },
  {
    title: "Long name",
    description: "The name wraps onto several lines; the avatar stays aligned with the first line and never shrinks.",
    render: () => (
      <div className="ds-text-body" style={{ ...person, width: "200px" }}>
        <Avatar name="Marie-Charlotte de La Rochefoucauld-Montmorency" size="small" />
        <span>Marie-Charlotte de La Rochefoucauld-Montmorency</span>
      </div>
    ),
  },
  {
    title: "Shown alone",
    description: "decorative = false: no name next to it (e.g. a marker), the avatar announces the full name to screen readers.",
    render: () => <Avatar name="Capucine Desjouis" decorative={false} />,
  },
];
