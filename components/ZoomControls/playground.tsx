// Playground tab of the documentation site: the zoom controls live, with a control per prop.
import { useEffect, useState } from "react";
import { definePlayground, jsx, code } from "../../docs/src/playground";
import { ZoomControls } from "./ZoomControls";

function Demo({ zoom }: { zoom: number }) {
  const [value, setValue] = useState(zoom);
  // The control sets the state; the buttons can still be used in the canvas.
  useEffect(() => setValue(zoom), [zoom]);
  return <ZoomControls zoom={value} onZoomChange={setValue} onFitToScreen={() => setValue(100)} />;
}

export const playground = definePlayground({
  controls: {
    zoom: {
      type: "number",
      min: 10,
      max: 400,
      default: 100,
      description: "The zoom level shown, in percent (10 to 400, steps of 10). Default: 100.",
    },
  },
  render: ({ zoom }) => <Demo zoom={zoom} />,
  code: ({ zoom }) =>
    jsx("ZoomControls", { zoom, onZoomChange: code("setZoom"), onFitToScreen: code("() => setZoom(100)") }),
});
