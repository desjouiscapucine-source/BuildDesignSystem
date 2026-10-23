import type { HTMLAttributes, ReactNode } from "react";
import "./ImageViewer.css";

// Variant properties: names and values exactly as approved in spec.md.
export type ImageViewerVariant = "default";

export interface ImageViewerProps extends HTMLAttributes<HTMLDivElement> {
  /** Approved variant property (default: "default"). */
  variant?: ImageViewerVariant;
  children?: ReactNode;
}

export function ImageViewer({ variant = "default", className, children, ...rest }: ImageViewerProps) {
  const classes = ["ds-image-viewer", `ds-image-viewer--${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      <span className="ds-image-viewer-label">{children}</span>
    </div>
  );
}
