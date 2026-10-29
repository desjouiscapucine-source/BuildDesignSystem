// Playground tab of the documentation site: the card live, with a control per prop.
import { code, definePlayground, jsx } from "../../docs/src/playground";
import type { ImageViewerImage } from "../ImageViewer/ImageViewer";
import landscape from "../ImageViewer/examples/landscape.svg";
import portrait from "../ImageViewer/examples/portrait.svg";
import small from "../ImageViewer/examples/small.svg";
import { Card } from "./Card";

const images: [ImageViewerImage, ...ImageViewerImage[]] = [
  { src: landscape, alt: "House with a brown door, seen from the garden", caption: "View from the garden." },
  { src: portrait, alt: "Narrow building with six windows and a brown door", caption: "North facade of the building." },
  { src: small, alt: "Small drawing of a house on a yellow background" },
];

export const playground = definePlayground({
  controls: {
    variant: {
      type: "select",
      options: ["default", "clickable-image"],
      default: "default",
      description: "default: no images. clickable-image: clickable thumbnails under the text (at least one image).",
    },
    title: { type: "text", default: "Order shipped", description: "Title of the card: same as the title of its step, 60 characters maximum." },
    children: {
      type: "text",
      default: "The parcel left the warehouse in Lyon and was handed over to the carrier.",
      description: "The text of the card: complete sentences.",
    },
    headingLevel: {
      type: "select",
      options: ["2", "3", "4", "5", "6"],
      default: "2",
      description: "Level of the title heading (h2 by default); the look does not change.",
    },
  },
  render: ({ variant, title, children, headingLevel }) => (
    <div style={{ maxWidth: "480px" }}>
      {variant === "clickable-image" ? (
        <Card variant="clickable-image" title={title} headingLevel={Number(headingLevel) as 2} images={images}>
          {children}
        </Card>
      ) : (
        <Card title={title} headingLevel={Number(headingLevel) as 2}>
          {children}
        </Card>
      )}
    </div>
  ),
  code: ({ variant, title, children, headingLevel }) =>
    jsx(
      "Card",
      {
        variant: variant === "default" ? undefined : variant,
        title,
        headingLevel: headingLevel === "2" ? undefined : Number(headingLevel),
        images: variant === "clickable-image" ? code("images") : undefined,
      },
      children,
    ),
});
