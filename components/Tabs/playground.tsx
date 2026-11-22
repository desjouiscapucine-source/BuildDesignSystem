// Playground tab of the documentation site: Tabs live, with a control per prop.
import { code, definePlayground, jsx } from "../../docs/src/playground";
import { Tabs } from "./Tabs";

const names = ["Design spec", "Guidelines", "Code"];

export const playground = definePlayground({
  controls: {
    label: { type: "text", default: "Component documentation", description: "Required name of the tab list, read by screen readers." },
    selected: { type: "select", options: names, default: "Design spec", description: "The selected tab." },
    disabled: { type: "boolean", default: false, description: "The last tab (Code) is disabled: its content is not available yet." },
  },
  render: ({ label, selected, disabled }) => (
    // Uncontrolled, restarted when the control changes: clicks and arrow keys select tabs in the canvas too.
    <Tabs
      key={selected}
      label={label}
      defaultSelected={selected}
      tabs={names.map((name) => ({
        id: name,
        label: name,
        disabled: disabled && name === "Code",
        content: <p className="ds-text-body" style={{ margin: 0 }}>Content of {name}.</p>,
      }))}
    />
  ),
  code: ({ label, selected, disabled }) =>
    jsx("Tabs", {
      label,
      defaultSelected: selected,
      tabs: code(
        `[\n${names.map((name) => `  { id: "${name}", label: "${name}"${disabled && name === "Code" ? ", disabled: true" : ""}, content: <Panel /> },`).join("\n")}\n]`,
      ),
    }),
});
