import { useState, type HTMLAttributes, type ReactNode } from "react";
import { ImageViewer, type ImageViewerImage } from "../ImageViewer/ImageViewer";
import "./Card.css";

/** `clickable-image` adds clickable thumbnails under the text (spec: `variant`). */
export type CardVariant = "default" | "clickable-image";

interface CardBaseProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "title"> {
  /** Title of the card: same as the title of its step, 60 characters maximum. */
  title: string;
  /** Level of the title heading (h2 by default); the look does not change. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** The text of the card: complete sentences. */
  children: ReactNode;
}

/** Default card: no images. */
export interface CardDefaultProps extends CardBaseProps {
  variant?: "default";
  images?: never;
}

/** Card with clickable thumbnails under the text: at least one image (forbidden without images). */
export interface CardClickableImageProps extends CardBaseProps {
  variant: "clickable-image";
  /** The images, in order (same shape as the ImageViewer). The thumbnail shows `thumbnailSrc`, or `src`. */
  images: [ImageViewerImage, ...ImageViewerImage[]];
}

export type CardProps = CardDefaultProps | CardClickableImageProps;

export function Card({ title, headingLevel = 2, variant = "default", images, children, className, ...rest }: CardProps) {
  const [viewer, setViewer] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const classes = ["ds-card", `ds-card--${variant}`, className].filter(Boolean).join(" ");
  const Heading = `h${headingLevel}` as const;
  const withImages = variant === "clickable-image" && images && images.length > 0;

  return (
    // `id` (in rest) is the anchor a TimelineStep can lead to.
    <section className={classes} {...rest}>
      <Heading className="ds-card-title">{title}</Heading>
      <div className="ds-card-text">{children}</div>
      {withImages && (
        <>
          <ul className="ds-card-thumbnails">
            {images.map((image, index) => (
              <li key={`${image.src}-${index}`}>
                <button
                  type="button"
                  className="ds-card-thumbnail"
                  aria-label={`Open image: ${image.alt}`}
                  aria-haspopup="dialog"
                  onClick={() => setViewer({ open: true, index })}
                >
                  <img className="ds-card-thumbnail-image" src={image.thumbnailSrc ?? image.src} alt="" />
                </button>
              </li>
            ))}
          </ul>
          <ImageViewer
            images={images}
            index={viewer.index}
            open={viewer.open}
            onClose={() => setViewer((state) => ({ ...state, open: false }))}
            onIndexChange={(index) => setViewer((state) => ({ ...state, index }))}
          />
        </>
      )}
    </section>
  );
}
