// Playground tab of the documentation site: the canvas live, with a control per prop.
import { useState } from "react";
import { definePlayground, jsx, code } from "../../docs/src/playground";
import { Canvas } from "./Canvas";
import { Frame } from "../Frame/Frame";

function Demo({ zoom, empty }: { zoom: number; empty: boolean }) {
  const [value, setValue] = useState(zoom);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  return (
    <Canvas zoom={value} onZoomChange={setValue} panX={pan.x} panY={pan.y} onPanChange={(x, y) => setPan({ x, y })}>
      {!empty && (
        <div style={{ position: "absolute", left: 40, top: 40 }}>
          <Frame name="Home" size="mobile" />
        </div>
      )}
    </Canvas>
  );
}

export const playground = definePlayground({
  controls: {
    zoom: {
      type: "number",
      min: 10,
      max: 400,
      default: 100,
      description: "Zoom level of the view, in percent (10 to 400, steps of 10). Default: 100.",
    },
    empty: { type: "boolean", default: false, description: "Nothing placed on the canvas: here shows the empty message." },
  },
  minHeight: 420,
  render: ({ zoom, empty }) => <Demo zoom={zoom} empty={empty} />,
  code: ({ zoom }) =>
    jsx("Canvas", {
      zoom,
      onZoomChange: code("setZoom"),
      panX: code("pan.x"),
      panY: code("pan.y"),
      onPanChange: code("(x, y) => setPan({ x, y })"),
    }),
});
