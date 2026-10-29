// Playground tab of the documentation site: the image viewer live, with a control per prop.
// The viewer opens over the page: a button opens it.
import { useState } from "react";
import { definePlayground, jsx, code } from "../../docs/src/playground";
import { Button } from "../Button/Button";
import { ImageViewer, type ImageViewerImage } from "./ImageViewer";
import landscape from "./examples/landscape.svg";
import portrait from "./examples/portrait.svg";
import small from "./examples/small.svg";

const all: ImageViewerImage[] = [
  { src: landscape, alt: "House with a brown door, seen from the garden", caption: "View from the garden." },
  { src: portrait, alt: "Narrow building with six windows and a brown door", caption: "North facade of the building." },
  { src: small, alt: "Small drawing of a house on a yellow background", caption: "Drawing of the house." },
];

function Demo({ images, label }: { images: ImageViewerImage[]; label: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <>
      <Button
        variant="secondary"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
      >
        Open the viewer
      </Button>
      <ImageViewer images={images} index={index} open={open} onClose={() => setOpen(false)} onIndexChange={setIndex} label={label} />
    </>
  );
}

export const playground = definePlayground({
  controls: {
    images: { type: "number", min: 1, max: all.length, default: all.length, description: "The images, in order. Here: how many." },
    captions: { type: "boolean", default: true, description: "Optional text under each image (caption of each image)." },
    label: { type: "text", default: "Image viewer", description: "Name of the viewer announced to screen readers." },
  },
  minHeight: 560,
  render: ({ images, captions, label }) => (
    <Demo
      // A new key closes the viewer when the images change.
      key={`${images}-${captions}`}
      images={all.slice(0, images).map((image) => (captions ? image : { ...image, caption: undefined }))}
      label={label}
    />
  ),
  code: ({ label }) =>
    jsx("ImageViewer", {
      images: code("images"),
      index: code("index"),
      open: code("open"),
      onClose: code("() => setOpen(false)"),
      onIndexChange: code("setIndex"),
      label: label === "Image viewer" ? undefined : label,
    }),
});
