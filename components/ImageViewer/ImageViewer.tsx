import { useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent } from "react";
import { IconButton } from "../IconButton/IconButton";
import "./ImageViewer.css";

/** One image of the viewer. */
export interface ImageViewerImage {
  /** The image shown larger. */
  src: string;
  /** Alternative text: describes what the image shows. Required. */
  alt: string;
  /** Optional text shown under the image (150 characters maximum). */
  caption?: string;
  /** Optional thumbnail, shown in place of the image until `src` is loaded. */
  thumbnailSrc?: string;
}

export interface ImageViewerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** The images, in order. */
  images: ImageViewerImage[];
  /** The image shown (position in `images`). Default: 0. */
  index?: number;
  /** Whether the viewer is open. */
  open: boolean;
  /** Called by the close button and the Escape key. */
  onClose: () => void;
  /** Called by the previous / next buttons and the ← / → keys, with the new index. */
  onIndexChange?: (index: number) => void;
  /** Name of the viewer announced to screen readers. Default: "Image viewer". */
  label?: string;
}

type ViewerState = "closed" | "open" | "closing";

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

export function ImageViewer({
  images,
  index = 0,
  open,
  onClose,
  onIndexChange,
  label = "Image viewer",
  className,
  ...rest
}: ImageViewerProps) {
  const [state, setState] = useState<ViewerState>(open ? "open" : "closed");
  const [loaded, setLoaded] = useState(false);
  const [imageWidth, setImageWidth] = useState<number>();
  const dialog = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const current = images[Math.min(Math.max(index, 0), images.length - 1)];
  const several = images.length > 1;
  const first = index <= 0;
  const last = index >= images.length - 1;

  // Open / close: remember what had the focus, and keep the viewer on screen during the closing animation.
  useEffect(() => {
    if (open) {
      opener.current = document.activeElement as HTMLElement | null;
      setState("open");
    } else {
      setState((previous) => (previous === "open" ? "closing" : previous));
    }
  }, [open]);

  // On opening, the focus goes to the close button.
  useEffect(() => {
    if (state === "open") dialog.current?.querySelector<HTMLElement>(".ds-image-viewer-close")?.focus();
  }, [state]);

  // A new image: show its thumbnail until it is loaded.
  useEffect(() => {
    setLoaded(false);
  }, [current?.src]);

  // At the first / last image, the arrow that had the focus becomes disabled and loses it:
  // the focus moves to the other arrow, so it stays inside the viewer.
  useEffect(() => {
    if (state !== "open" || !dialog.current || dialog.current.contains(document.activeElement)) return;
    dialog.current.querySelector<HTMLElement>(".ds-image-viewer-band button:not([disabled])")?.focus();
  }, [index, state]);

  // The caption is as wide as the image shown.
  useLayoutEffect(() => {
    const element = image.current;
    if (!element) return;
    const measure = () => setImageWidth(element.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [state, loaded, current?.src]);

  const finishClosing = () => {
    if (state !== "closing") return;
    setState("closed");
    opener.current?.focus();
  };

  const go = (next: number) => {
    if (next >= 0 && next < images.length) onIndexChange?.(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowLeft" && several) {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === "ArrowRight" && several) {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "Tab" && dialog.current) {
      // The focus stays inside the viewer.
      const focusables = [...dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  if (state === "closed" || !current) return null;

  const classes = ["ds-image-viewer", `ds-image-viewer--${state}`, className].filter(Boolean).join(" ");

  return (
    <div
      ref={dialog}
      className={classes}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onKeyDown={onKeyDown}
      onAnimationEnd={finishClosing}
      {...rest}
    >
      <IconButton className="ds-image-viewer-close" icon="close" label="Close the image viewer" variant="primary" onClick={onClose} />

      <figure className="ds-image-viewer-figure">
        <div className="ds-image-viewer-frame">
          {!loaded && current.thumbnailSrc && (
            <img className="ds-image-viewer-thumbnail" src={current.thumbnailSrc} alt="" aria-hidden="true" />
          )}
          <img
            ref={image}
            key={current.src}
            className={`ds-image-viewer-image${loaded ? "" : " ds-image-viewer-image--loading"}`}
            src={current.src}
            alt={current.alt}
            onLoad={() => setLoaded(true)}
          />
        </div>
        {current.caption && (
          <figcaption className="ds-image-viewer-caption" style={imageWidth ? { maxWidth: imageWidth } : undefined}>
            {current.caption}
          </figcaption>
        )}
      </figure>

      {several && (
        <div className="ds-image-viewer-band">
          <IconButton icon="arrow_back" label="Previous image" variant="primary" disabled={first} onClick={() => go(index - 1)} />
          <IconButton icon="arrow_forward" label="Next image" variant="primary" disabled={last} onClick={() => go(index + 1)} />
        </div>
      )}
    </div>
  );
}
