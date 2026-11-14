// Live examples shown in the Examples tab of the documentation site.
import type { Example } from "../../docs/src/types";
import { Tag } from "./Tag";

const row = { display: "flex", flexWrap: "wrap", gap: "var(--space-16)" } as const;

export const examples: Example[] = [
  {
    title: "Tones",
    description: "tone = neutral (default), brand, success, warning, error, info.",
    render: () => (
      <div style={row}>
        <Tag>Components</Tag>
        <Tag tone="brand">React</Tag>
        <Tag tone="success">Done</Tag>
        <Tag tone="warning">Late</Tag>
        <Tag tone="error">Blocked</Tag>
        <Tag tone="info">In progress</Tag>
      </div>
    ),
  },
  {
    title: "With an icon",
    description: "Optional icon before the label, only to reinforce it.",
    render: () => (
      <div style={row}>
        <Tag icon="category">Components</Tag>
        <Tag tone="brand" icon="code">React</Tag>
        <Tag tone="success" icon="check_circle">Done</Tag>
        <Tag tone="warning" icon="warning">Late</Tag>
        <Tag tone="error" icon="error">Blocked</Tag>
        <Tag tone="info" icon="info">In progress</Tag>
      </div>
    ),
  },
  {
    title: "Side by side",
    description: "No limit, space-16 apart; tones can be mixed; they wrap to the next line when the space runs out.",
    render: () => (
      <div style={{ ...row, width: "200px" }}>
        <Tag>Components</Tag>
        <Tag tone="success" icon="check_circle">Decided</Tag>
        <Tag tone="brand">React</Tag>
        <Tag tone="brand">TypeScript</Tag>
      </div>
    ),
  },
  {
    title: "Long label",
    description: "One line; cut with an ellipsis when the tag is wider than its container.",
    render: () => (
      <div style={{ width: "160px" }}>
        <Tag tone="info">This ticket is currently in progress</Tag>
      </div>
    ),
  },
];
