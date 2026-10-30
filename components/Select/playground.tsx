// Playground tab of the documentation site: the Select live, with a control per prop.
// The options are the status examples; open the list to try it.
import { code, definePlayground, jsx } from "../../docs/src/playground";
import { Select, type SelectOptionItem } from "./Select";

const STATUSES: SelectOptionItem[] = [
  { value: "todo", label: "To do" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
];

export const playground = definePlayground({
  controls: {
    label: { type: "text", default: "Status", description: "Names the field: a noun, no punctuation, 25 characters maximum." },
    placeholder: { type: "text", default: "Choose a status", description: "Shown while no option is chosen: \"Choose a …\" + the noun of the label." },
    value: {
      type: "select",
      options: ["", "todo", "in-progress", "done"],
      default: "",
      description: "The chosen option (its value). Empty: no option chosen.",
    },
    error: { type: "text", default: "", description: "Error message: one sentence that says how to fix it. Ignored when disabled." },
    disabled: { type: "boolean", default: false, description: "The Select cannot be opened." },
  },
  minHeight: 240,
  render: ({ label, placeholder, value, error, disabled }) => (
    <div style={{ width: "320px", maxWidth: "100%" }}>
      {disabled ? (
        <Select key={value} label={label} placeholder={placeholder || undefined} options={STATUSES} value={value || undefined} disabled />
      ) : (
        <Select key={value} label={label} placeholder={placeholder || undefined} options={STATUSES} value={value || undefined} error={error || undefined} />
      )}
    </div>
  ),
  code: ({ label, placeholder, value, error, disabled }) =>
    jsx("Select", { label, placeholder, options: code("statuses"), value, error: disabled ? "" : error, disabled }),
});
