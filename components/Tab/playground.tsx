// Playground tab of the documentation site: the tab live, with a control per prop.
// Tab is a building block: it sits in a plain tab list, as Tabs lays it out (tabIndex 0 keeps it reachable when not selected).
import { definePlayground, jsx } from "../../docs/src/playground";
import { Tab } from "./Tab";

export const playground = definePlayground({
  controls: {
    children: { type: "text", default: "Guidelines", description: "The label: names the content of the panel, one to three words, sentence case." },
    selected: { type: "boolean", default: false, description: "The tab whose panel is shown. Set by Tabs. Cannot be combined with disabled." },
    disabled: { type: "boolean", default: false, description: "The content of the panel is not available yet: not focusable, not clickable." },
  },
  render: ({ children, selected, disabled }) => (
    <div role="tablist" aria-label="Playground" style={{ display: "flex" }}>
      {selected ? <Tab selected>{children}</Tab> : <Tab disabled={disabled} tabIndex={0}>{children}</Tab>}
    </div>
  ),
  code: ({ children, selected, disabled }) => jsx("Tab", selected ? { selected } : { disabled }, children),
});
