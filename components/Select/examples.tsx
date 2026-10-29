// Live examples shown in the Examples tab of the documentation site.
// Each example is interactive: open the list with a click or the keyboard.
import { useRef, useState, type ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { Select, type SelectOptionItem } from "./Select";

const STATUSES: SelectOptionItem[] = [
  { value: "todo", label: "To do" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
];

const STATUSES_WITH_ICONS: SelectOptionItem[] = [
  { value: "todo", label: "To do", icon: "radio_button_unchecked" },
  { value: "in-progress", label: "In progress", icon: "schedule" },
  { value: "done", label: "Done", icon: "check_circle" },
  { value: "archived", label: "Archived", icon: "archive", disabled: true },
];

/** Width of a form column, so the full-width Select has a realistic size. */
function Column({ children }: { children: ReactNode }) {
  return <div style={{ width: "320px", maxWidth: "100%" }}>{children}</div>;
}

/** A Select that keeps the value chosen by the user, starting from `initial`. */
function Stateful({ initial, ...props }: Omit<Parameters<typeof Select>[0], "value" | "onChange"> & { initial?: string }) {
  const [value, setValue] = useState(initial);
  return <Select {...(props as Parameters<typeof Select>[0])} value={value} onChange={setValue} />;
}

/** Shows the error when the list closes without a choice; hides it once an option is chosen. */
function RequiredSelect() {
  const [value, setValue] = useState<string>();
  const [error, setError] = useState<string>();
  // Read when the list closes: up to date even when an option was just chosen.
  const chosen = useRef(false);
  return (
    <Select
      label="Status"
      placeholder="Choose a status"
      options={STATUSES}
      value={value}
      error={error}
      onChange={(next) => {
        chosen.current = true;
        setValue(next);
        setError(undefined);
      }}
      onOpenChange={(open) => {
        if (!open && !chosen.current) setError("Choose a status to save the task");
      }}
    />
  );
}

export const examples: Example[] = [
  {
    title: "Placeholder",
    description: "No option chosen in advance: the user always chooses.",
    render: () => (
      <Column>
        <Select label="Status" placeholder="Choose a status" options={STATUSES} />
      </Column>
    ),
  },
  {
    title: "Option chosen",
    render: () => (
      <Column>
        <Stateful label="Status" placeholder="Choose a status" options={STATUSES} initial="in-progress" />
      </Column>
    ),
  },
  {
    title: "Options with icons",
    description: "Every option has an icon. A disabled option is reached with the arrows but cannot be chosen.",
    render: () => (
      <Column>
        <Select label="Status" placeholder="Choose a status" options={STATUSES_WITH_ICONS} />
      </Column>
    ),
  },
  {
    title: "Error",
    description: "Border, icon and message. The message is linked to the field (aria-describedby).",
    render: () => (
      <Column>
        <Select label="Status" placeholder="Choose a status" options={STATUSES} error="Choose a status to save the task" />
      </Column>
    ),
  },
  {
    title: "Error when the list closes without a choice",
    description: "Open the list and close it (Escape, Tab or a click outside) without choosing: the error shows. Choose an option: it disappears.",
    render: () => (
      <Column>
        <RequiredSelect />
      </Column>
    ),
  },
  {
    title: "Disabled",
    description: "Cannot be opened; not reachable with Tab.",
    render: () => (
      <Column>
        <Select label="Status" placeholder="Choose a status" options={STATUSES} value="done" disabled />
      </Column>
    ),
  },
  {
    title: "Long texts",
    description: "Label, placeholder and value on one line, cut with an ellipsis; the error message wraps.",
    render: () => (
      <div style={{ width: "200px" }}>
        <Select
          label="Status of the task in the project"
          placeholder="Choose a status for this task"
          options={[...STATUSES, { value: "review", label: "Waiting for the review" }]}
          value="review"
          error="Choose another status: this one is not available for a task that has no reviewer yet"
        />
      </div>
    ),
  },
];
