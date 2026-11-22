// Live examples shown in the Examples tab of the documentation site.
import { useState, type CSSProperties, type ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { Canvas } from "./Canvas";
import { Frame } from "../Frame/Frame";
import { StickyNote } from "../StickyNote/StickyNote";

const canvasBox: CSSProperties = { width: "100%", height: "420px" };

/** Positions a child at a fixed point of the canvas's content space (set by the caller, not the Canvas itself). */
function Placed({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return <div style={{ position: "absolute", left: x, top: y }}>{children}</div>;
}

/** A Canvas that keeps the zoom and pan clicked or dragged by the user, starting from `initialZoom`. */
function Stateful({ initialZoom = 100, children }: { initialZoom?: number; children?: ReactNode }) {
  const [zoom, setZoom] = useState(initialZoom);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  return (
    <div style={canvasBox}>
      <Canvas
        zoom={zoom}
        onZoomChange={setZoom}
        panX={pan.x}
        panY={pan.y}
        onPanChange={(x, y) => setPan({ x, y })}
        onSelectionRectangle={() => {
          /* The Canvas does not know its children: a real caller (UX playground) would select the ones inside this rectangle. */
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}

export const examples: Example[] = [
  {
    title: "Default",
    description: "Frames and a sticky note placed on the canvas. Drag the background to draw a selection rectangle, or Space + drag to pan.",
    render: () => (
      <Stateful>
        <Placed x={40} y={40}>
          <Frame name="Home" size="mobile" />
        </Placed>
        <Placed x={460} y={40}>
          <Frame name="Checkout" size="tablet" selected />
        </Placed>
        <Placed x={40} y={520}>
          <StickyNote text="Check the spacing between the two frames." author="CD" date="22 Nov" />
        </Placed>
      </Stateful>
    ),
  },
  {
    title: "Empty",
    description: "Nothing placed yet: the empty message.",
    render: () => <Stateful />,
  },
];
