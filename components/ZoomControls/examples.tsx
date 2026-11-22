// Live examples shown in the Examples tab of the documentation site.
import { useState } from "react";
import type { Example } from "../../docs/src/types";
import { ZoomControls } from "./ZoomControls";

/** A ZoomControls that keeps the zoom level clicked by the user, starting from `initial`. */
function Stateful({ initial }: { initial: number }) {
  const [zoom, setZoom] = useState(initial);
  return <ZoomControls zoom={zoom} onZoomChange={setZoom} onFitToScreen={() => setZoom(100)} />;
}

export const examples: Example[] = [
  {
    title: "Default",
    render: () => <Stateful initial={100} />,
  },
  {
    title: "Minimum (10%)",
    description: "The zoom out button is disabled.",
    render: () => <Stateful initial={10} />,
  },
  {
    title: "Maximum (400%)",
    description: "The zoom in button is disabled.",
    render: () => <Stateful initial={400} />,
  },
];
