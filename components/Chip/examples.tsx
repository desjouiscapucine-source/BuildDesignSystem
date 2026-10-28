// Live examples shown in the Examples tab of the documentation site.
import { useState } from "react";
import type { Example } from "../../docs/src/types";
import { Chip } from "./Chip";

const row = { display: "flex", gap: "var(--space-8)" } as const;

function Interactive() {
  const choices = ["All", "Components", "Prototypes", "Tooling"];
  const [current, setCurrent] = useState(choices[0]);
  return (
    <div style={row} role="group" aria-label="Filter by category">
      {choices.map((name) => (
        <Chip key={name} selected={current === name} onClick={() => setCurrent(name)}>
          {name}
        </Chip>
      ))}
    </div>
  );
}

export const examples: Example[] = [
  {
    title: "Not selected",
    description: "Default: selected = false.",
    render: () => <Chip>Components</Chip>,
  },
  {
    title: "Selected",
    description: "selected = true: the chip whose choice is active.",
    render: () => <Chip selected>Components</Chip>,
  },
  {
    title: "In a group",
    description: "One chip selected at a time, always one; clicking the selected chip keeps it selected. Layout by ChipGroup (not built yet).",
    render: () => <Interactive />,
  },
  {
    title: "Long label",
    description: "One line; cut with an ellipsis when the chip is wider than its container.",
    render: () => (
      <div style={{ width: "50%" }}>
        <Chip>Components, templates and prototypes in progress</Chip>
      </div>
    ),
  },
];
