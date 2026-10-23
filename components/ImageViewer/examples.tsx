// Live examples shown in the Examples tab of the documentation site.
// The viewer opens over the page: each example has a button to open it.
import { useState } from "react";
import type { Example } from "../../docs/src/types";
import { Button } from "../Button/Button";
import { ImageViewer, type ImageViewerImage } from "./ImageViewer";
import landscape from "./examples/landscape.svg";
import portrait from "./examples/portrait.svg";
import small from "./examples/small.svg";

function Demo({ images, button }: { images: ImageViewerImage[]; button: string }) {
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
        {button}
      </Button>
      <ImageViewer images={images} index={index} open={open} onClose={() => setOpen(false)} onIndexChange={setIndex} />
    </>
  );
}

export const examples: Example[] = [
  {
    title: "Several images, with captions",
    description: "Previous / next in the band, disabled at the first and the last image; ← / → keys; Escape closes.",
    render: () => (
      <Demo
        button="Open 3 images"
        images={[
          { src: landscape, alt: "House with a brown door, seen from the garden", caption: "View from the garden." },
          { src: portrait, alt: "Narrow building with six windows and a brown door", caption: "North facade of the building." },
          { src: small, alt: "Small drawing of a house on a yellow background" },
        ]}
      />
    ),
  },
  {
    title: "One image, no caption",
    description: "No band and no caption: only the image and the close button.",
    render: () => <Demo button="Open 1 image" images={[{ src: landscape, alt: "House with a brown door, seen from the garden" }]} />,
  },
  {
    title: "Small image",
    description: "The image is never enlarged beyond its own size.",
    render: () => <Demo button="Open a small image" images={[{ src: small, alt: "Small drawing of a house on a yellow background", caption: "A small image stays at its own size." }]} />,
  },
  {
    title: "Long caption",
    description: "The caption wraps, within the width of the image (150 characters maximum).",
    render: () => (
      <Demo
        button="Open with a long caption"
        images={[
          {
            src: landscape,
            alt: "House with a brown door, seen from the garden",
            caption: "The house seen from the garden in the late afternoon, with the brown front door and the two windows of the living room on the ground floor.",
          },
        ]}
      />
    ),
  },
];
