// Playground tab of the documentation site: the panel live, with a control per prop.
// The panel sits on the right of a positioned workspace, staged as in the examples.
import { useEffect, useState } from "react";
import { definePlayground, jsx, code } from "../../docs/src/playground";
import { Panel, type PanelTab } from "./Panel";

const paragraph = (content: string, secondary = false) => (
  <p className="ds-text-body" style={{ margin: 0, color: secondary ? "var(--color-text-secondary)" : "var(--color-text-primary)" }}>
    {content}
  </p>
);

function Demo({ collapsed, selected, emptyCompositions }: { collapsed: boolean; selected: PanelTab; emptyCompositions: boolean }) {
  const [isCollapsed, setCollapsed] = useState(collapsed);
  const [tab, setTab] = useState(selected);
  // The controls set the state; the panel can still be used in the canvas.
  useEffect(() => setCollapsed(collapsed), [collapsed]);
  useEffect(() => setTab(selected), [selected]);
  return (
    <div style={{ position: "relative", width: "100%", height: "var(--size-panel-max)", background: "var(--color-background-subtle)" }}>
      <Panel
        collapsed={isCollapsed}
        onCollapsedChange={setCollapsed}
        selected={tab}
        onSelect={setTab}
        library={paragraph("The coded components of the design system.")}
        properties={paragraph("The variants, states and texts of the selected component.")}
        compositions={emptyCompositions ? paragraph("No composition yet.", true) : paragraph("The saved compositions.")}
      />
    </div>
  );
}

export const playground = definePlayground({
  controls: {
    collapsed: { type: "boolean", default: false, description: "The panel is folded into the strip of tab icons. Below desktop, it always opens collapsed." },
    selected: {
      type: "select",
      options: ["library", "properties", "compositions"],
      default: "library",
      description: "The selected tab. Default: the last tab used, else \"library\".",
    },
    compositions: { type: "boolean", default: true, description: "Content of the Compositions tab. Here: off shows the empty sentence." },
  },
  minHeight: 480,
  render: ({ collapsed, selected, compositions }) => (
    <Demo collapsed={collapsed} selected={selected as PanelTab} emptyCompositions={!compositions} />
  ),
  code: ({ collapsed, selected }) =>
    jsx("Panel", {
      collapsed: collapsed || undefined,
      onCollapsedChange: code("setCollapsed"),
      selected: selected === "library" ? undefined : selected,
      onSelect: code("setSelected"),
      library: code("<Library />"),
      properties: code("<Properties />"),
      compositions: code("<Compositions />"),
    }),
});
