// Playground tab of the documentation site: the frame live, with a control per prop.
import { useEffect, useState } from "react";
import { definePlayground, jsx } from "../../docs/src/playground";
import { OrderTrackingScreen } from "./examples";
import { Frame, type FrameSize } from "./Frame";

// The selection follows the control, and the frame can also change it (click, Enter / Space, Escape).
function LiveFrame({ name, size, selected, empty }: { name: string; size: FrameSize; selected: boolean; empty: boolean }) {
  const [isSelected, setSelected] = useState(selected);
  useEffect(() => setSelected(selected), [selected]);
  return (
    <div style={{ padding: "var(--space-24)", background: "var(--color-background-subtle)", width: "max-content" }}>
      <Frame name={name} size={size} selected={isSelected} empty={empty} onSelectedChange={setSelected}>
        <OrderTrackingScreen />
      </Frame>
    </div>
  );
}

export const playground = definePlayground({
  controls: {
    name: {
      type: "text",
      default: "Order tracking",
      description: "Name of the composition: the name of the screen, sentence case, a few words, never the size.",
    },
    size: {
      type: "select",
      options: ["mobile", "tablet", "desktop"],
      default: "mobile",
      description: "Screen size of the frame. Default: mobile.",
    },
    selected: { type: "boolean", default: false, description: "The frame is selected on the canvas. Default: false." },
    empty: {
      type: "boolean",
      default: false,
      description: "The frame holds no component yet: the empty message replaces the content. Default: false.",
    },
  },
  render: ({ name, size, selected, empty }) => (
    <LiveFrame name={name} size={size as FrameSize} selected={selected} empty={empty} />
  ),
  code: ({ name, size, selected, empty }) =>
    jsx("Frame", { name, size: size === "mobile" ? "" : size, selected, empty }, empty ? undefined : "…"),
});
