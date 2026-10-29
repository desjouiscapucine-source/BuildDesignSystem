// Live examples shown in the Examples tab of the documentation site.
// The option sits on the Select list: each example is shown in a list (role="listbox").
import type { ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { SelectOption } from "./SelectOption";

function List({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div
      role="listbox"
      aria-label={label}
      style={{
        background: "var(--color-background-surface)",
        padding: "var(--space-8)",
        borderRadius: "var(--radius-8)",
        width: "240px",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
      }}
    >
      {children}
    </div>
  );
}

export const examples: Example[] = [
  {
    title: "Default",
    render: () => (
      <List label="Status">
        <SelectOption>To do</SelectOption>
      </List>
    ),
  },
  {
    title: "Selected",
    description: "The option currently chosen (aria-selected=\"true\"): cream background, semibold label, check mark.",
    render: () => (
      <List label="Status">
        <SelectOption selected>In progress</SelectOption>
      </List>
    ),
  },
  {
    title: "Disabled",
    description: "To avoid: prefer hiding the option. Reached with the arrows, but cannot be chosen.",
    render: () => (
      <List label="Status">
        <SelectOption disabled>Archived</SelectOption>
      </List>
    ),
  },
  {
    title: "With an icon",
    description: "Every option of a list has an icon, or none.",
    render: () => (
      <List label="Status">
        <SelectOption icon="radio_button_unchecked">To do</SelectOption>
        <SelectOption icon="schedule" selected>
          In progress
        </SelectOption>
        <SelectOption icon="check_circle">Done</SelectOption>
        <SelectOption icon="archive" disabled>
          Archived
        </SelectOption>
      </List>
    ),
  },
  {
    title: "In a list",
    description: "One selected option at most. The space between options belongs to the Select.",
    render: () => (
      <List label="Status">
        <SelectOption>To do</SelectOption>
        <SelectOption selected>In progress</SelectOption>
        <SelectOption>Done</SelectOption>
      </List>
    ),
  },
  {
    title: "Long label",
    description: "Single line, cut with an ellipsis. Keep labels under 25 characters.",
    render: () => (
      <List label="Status">
        <SelectOption>Waiting for the review</SelectOption>
        <SelectOption selected>All the tasks that are finished this week</SelectOption>
        <SelectOption icon="description">A very long label that goes far beyond the maximum length of an option</SelectOption>
      </List>
    ),
  },
];
