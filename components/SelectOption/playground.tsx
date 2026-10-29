// Playground tab of the documentation site: the option live, with a control per prop.
// The option sits on the Select list (role="listbox"), as in its examples.
import { definePlayground, jsx } from "../../docs/src/playground";
import { SelectOption } from "./SelectOption";

export const playground = definePlayground({
  controls: {
    children: { type: "text", default: "In progress", description: "The label: sentence case, no punctuation, 25 characters maximum." },
    icon: { type: "icon", optional: true, default: "", description: "Icon before the label: a Material Symbols name, decorative." },
    selected: { type: "boolean", default: false, description: "The option currently chosen in the Select. Ignored when disabled." },
    disabled: { type: "boolean", default: false, description: "The option is shown but cannot be chosen (to avoid: prefer hiding it)." },
  },
  render: ({ children, icon, selected, disabled }) => (
    <div
      role="listbox"
      aria-label="Status"
      style={{ background: "var(--color-background-surface)", padding: "var(--space-8)", borderRadius: "var(--radius-8)", width: "240px" }}
    >
      {disabled ? (
        <SelectOption icon={icon || undefined} disabled>
          {children}
        </SelectOption>
      ) : (
        <SelectOption icon={icon || undefined} selected={selected}>
          {children}
        </SelectOption>
      )}
    </div>
  ),
  code: ({ children, icon, selected, disabled }) =>
    jsx("SelectOption", { icon, selected: !disabled && selected, disabled }, children),
});
