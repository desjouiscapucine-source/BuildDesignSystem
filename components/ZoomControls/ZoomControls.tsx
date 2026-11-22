import { useEffect, useRef, type HTMLAttributes } from "react";
import { IconButton } from "../IconButton/IconButton";
import "./ZoomControls.css";

const MIN_ZOOM = 10;
const MAX_ZOOM = 400;
const STEP = 10;

export interface ZoomControlsProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** The zoom level shown, in percent (10 to 400, steps of 10). Default: 100. */
  zoom?: number;
  /** Called by the zoom out / zoom in buttons, with the new zoom level. */
  onZoomChange?: (zoom: number) => void;
  /** Called by the fit to screen button. */
  onFit?: () => void;
}

export function ZoomControls({
  zoom = 100,
  onZoomChange,
  onFit,
  className,
  ...rest
}: ZoomControlsProps) {
  const container = useRef<HTMLDivElement>(null);
  const zoomOutDisabled = zoom <= MIN_ZOOM;
  const zoomInDisabled = zoom >= MAX_ZOOM;

  // The zoom button that has the focus never loses it when it becomes disabled:
  // the focus moves to the other zoom button.
  useEffect(() => {
    if (!container.current || container.current.contains(document.activeElement)) return;
    container.current.querySelector<HTMLElement>(".ds-zoom-controls-group button:not([disabled])")?.focus();
  }, [zoomOutDisabled, zoomInDisabled]);

  const classes = ["ds-zoom-controls", "ds-zoom-controls--default", className].filter(Boolean).join(" ");

  return (
    <div ref={container} className={classes} role="group" aria-label="Zoom controls" {...rest}>
      <div className="ds-zoom-controls-group">
        <IconButton
          variant="tertiary"
          icon="remove"
          label="Zoom out"
          disabled={zoomOutDisabled}
          onClick={() => onZoomChange?.(Math.max(MIN_ZOOM, zoom - STEP))}
        />
        <span className="ds-zoom-controls-level" role="status" aria-live="polite" aria-label={`Zoom level ${zoom}%`}>
          {zoom}%
        </span>
        <IconButton
          variant="tertiary"
          icon="add"
          label="Zoom in"
          disabled={zoomInDisabled}
          onClick={() => onZoomChange?.(Math.min(MAX_ZOOM, zoom + STEP))}
        />
      </div>
      <span className="ds-zoom-controls-divider" aria-hidden="true" />
      <IconButton variant="tertiary" icon="fit_screen" label="Fit to screen" onClick={onFit} />
    </div>
  );
}
