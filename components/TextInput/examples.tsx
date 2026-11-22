// Live examples shown in the Examples tab of the documentation site.
// Each example is interactive: type in the field.
import { useState, type ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { TextInput } from "./TextInput";

/** Width of a form column, so the full-width TextInput has a realistic size. */
function Column({ children }: { children: ReactNode }) {
  return <div style={{ width: "320px", maxWidth: "100%" }}>{children}</div>;
}

/** Required name: the error shows when the user deletes all the text, and disappears once it is filled. */
function RequiredName() {
  const [value, setValue] = useState("Primary button");
  return (
    <TextInput
      placeholder="Enter a name"
      helpText="Shown on the component page"
      required
      value={value}
      onChange={setValue}
      error={value === "" ? "Enter a name to save the component" : undefined}
    />
  );
}

/** Number: only digits are valid; any other character is written and shows an error while typing. */
function Width({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial);
  return (
    <TextInput
      type="number"
      label="Width"
      helpText="In pixels"
      value={value}
      onChange={setValue}
      error={/^\d*$/.test(value) ? undefined : "Enter a number for the width"}
    />
  );
}

const ICONS = ["search", "close", "mail", "error", "check_circle", "schedule", "archive", "timeline"];

/** Search: the list is filtered while typing. */
function IconSearch() {
  const [value, setValue] = useState("");
  const shown = ICONS.filter((icon) => icon.includes(value.trim().toLowerCase()));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
      <TextInput type="search" placeholder="Search an icon" value={value} onChange={setValue} />
      <p className="ds-text-body" style={{ margin: 0 }}>
        {shown.length ? shown.join(", ") : "No icon found"}
      </p>
    </div>
  );
}

export const examples: Example[] = [
  {
    title: "Placeholder",
    description: "The empty field shows a placeholder: a verb and a noun. It disappears as soon as the user types.",
    render: () => (
      <Column>
        <TextInput placeholder="Enter a name" />
      </Column>
    ),
  },
  {
    title: "Label",
    description: "Or a label: a noun. Never a label and a placeholder together.",
    render: () => (
      <Column>
        <TextInput label="Name" />
      </Column>
    ),
  },
  {
    title: "Filled",
    render: () => (
      <Column>
        <TextInput placeholder="Enter a name" defaultValue="Primary button" />
      </Column>
    ),
  },
  {
    title: "Help text",
    render: () => (
      <Column>
        <TextInput placeholder="Enter a name" helpText="Shown on the component page" />
      </Column>
    ),
  },
  {
    title: "Leading icon",
    description: "An icon that recalls the field: it stays visible once the field is filled (text type only).",
    render: () => (
      <Column>
        <TextInput label="Email" icon="mail" />
      </Column>
    ),
  },
  {
    title: "Search",
    description: "Fixed search icon; the clear button appears once the field holds text; Escape empties the field.",
    render: () => (
      <Column>
        <IconSearch />
      </Column>
    ),
  },
  {
    title: "Number",
    description: "Numeric keyboard on mobile. Type a letter to see the error.",
    render: () => (
      <Column>
        <Width initial="240" />
      </Column>
    ),
  },
  {
    title: "Error",
    description: "Number with a letter: the error replaces the help text.",
    render: () => (
      <Column>
        <Width initial="240px" />
      </Column>
    ),
  },
  {
    title: "Required",
    description: "No visual mark. Delete all the text to see the error.",
    render: () => (
      <Column>
        <RequiredName />
      </Column>
    ),
  },
  {
    title: "Disabled",
    render: () => (
      <Column>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
          <TextInput placeholder="Enter a name" helpText="Shown on the component page" disabled />
          <TextInput label="Email" icon="mail" defaultValue="name@example.com" disabled />
          <TextInput type="search" placeholder="Search an icon" defaultValue="arrow" disabled />
        </div>
      </Column>
    ),
  },
  {
    title: "Long texts",
    description: "Placeholder and value on one line, cut with an ellipsis when the field is not focused; the error wraps.",
    render: () => (
      <Column>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
          <TextInput placeholder="Enter the name of the component shown on its page" />
          <TextInput
            placeholder="Enter a name"
            defaultValue="A very long component name typed by the user, longer than the field"
          />
          <TextInput
            placeholder="Enter a name"
            defaultValue="Primary button"
            error="Enter a name of 25 characters or less to save the component on its documentation page"
          />
        </div>
      </Column>
    ),
  },
];
