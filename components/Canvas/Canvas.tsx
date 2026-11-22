import {
  Children,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { ZoomControls } from "../ZoomControls/ZoomControls";
import "./Canvas.css";

const MIN_ZOOM = 10;
const MAX_ZOOM = 400;
const STEP = 10;
const LONG_PRESS_MS = 500;
const DRAG_THRESHOLD = 4;

export interface SelectionRectangle {
  /** Left of the rectangle, in the canvas's own content space (unaffected by pan or zoom). */
  x: number;
  /** Top of the rectangle, in content space. */
  y: number;
  width: number;
  height: number;
}

export interface CanvasProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Zoom level of the view, in percent (10 to 400, steps of 10). Default: 100. */
  zoom?: number;
  /** Called by the zoom controls, the keyboard, the trackpad or a pinch, with the new zoom level. */
  onZoomChange?: (zoom: number) => void;
  /** Horizontal pan of the view, in pixels. Default: 0. */
  panX?: number;
  /** Vertical pan of the view, in pixels. Default: 0. */
  panY?: number;
  /** Called when the view is panned (Space + drag, the wheel, the trackpad, one finger, or to keep a focused element in view). */
  onPanChange?: (panX: number, panY: number) => void;
  /** Called when a drag on the background (or a long press then a drag, on touch screens) ends, with the rectangle's bounds in content space. The Canvas does not know its children: the caller decides which ones are inside and selects them. */
  onSelectionRectangle?: (rectangle: SelectionRectangle) => void;
  /** The frames, sticky notes, comments and components placed on the canvas. */
  children?: ReactNode;
}

/** Reads a token's pixel value, so JS stays in sync with the CSS (no hardcoded value). */
function tokenPx(element: HTMLElement, name: string): number {
  return parseFloat(getComputedStyle(element).getPropertyValue(name)) || 0;
}

function round10(value: number) {
  return Math.round(value / STEP) * STEP;
}

function floor10(value: number) {
  return Math.floor(value / STEP) * STEP;
}

function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

type DragMode = "pan" | "select" | "pinch" | null;

export function Canvas({
  zoom = 100,
  onZoomChange,
  panX = 0,
  panY = 0,
  onPanChange,
  onSelectionRectangle,
  className,
  children,
  onKeyDown,
  ...rest
}: CanvasProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const zoomControlsRef = useRef<HTMLDivElement>(null);
  const descriptionId = useRef(`ds-canvas-description-${Math.random().toString(36).slice(2)}`).current;

  const spacePressed = useRef(false);
  const mode = useRef<DragMode>(null);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pinch = useRef({ distance: 0, zoom: 100 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());

  const [selectionBox, setSelectionBox] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const isEmpty = Children.count(children) === 0;

  const clearSelection = () => setSelectionBox(null);

  const beginPan = (x: number, y: number) => {
    mode.current = "pan";
    dragStart.current = { x, y, panX, panY };
  };

  const beginSelect = (x: number, y: number) => {
    mode.current = "select";
    dragStart.current = { x, y, panX, panY };
    setSelectionBox({ left: x, top: y, width: 0, height: 0 });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const rootRect = root.getBoundingClientRect();
    const x = event.clientX - rootRect.left;
    const y = event.clientY - rootRect.top;

    if (event.pointerType === "touch") {
      pointers.current.set(event.pointerId, { x, y });
      if (pointers.current.size === 2) {
        clearTimeout(longPressTimer.current);
        const [a, b] = [...pointers.current.values()];
        mode.current = "pinch";
        pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom };
        return;
      }
      if (event.target !== root && event.target !== contentRef.current) return;
      longPressTimer.current = setTimeout(() => {
        if (mode.current === null) beginSelect(x, y);
      }, LONG_PRESS_MS);
      dragStart.current = { x, y, panX, panY };
      return;
    }

    if (event.target !== root && event.target !== contentRef.current) return;
    if (spacePressed.current) beginPan(x, y);
    else beginSelect(x, y);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const rootRect = root.getBoundingClientRect();
    const x = event.clientX - rootRect.left;
    const y = event.clientY - rootRect.top;

    if (event.pointerType === "touch") {
      const point = pointers.current.get(event.pointerId);
      if (point) pointers.current.set(event.pointerId, { x, y });

      if (mode.current === "pinch" && pointers.current.size === 2) {
        const [a, b] = [...pointers.current.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y) || 1;
        onZoomChange?.(clampZoom(round10((pinch.current.zoom * distance) / (pinch.current.distance || 1))));
        return;
      }
      if (mode.current === null && point) {
        const moved = Math.hypot(x - dragStart.current.x, y - dragStart.current.y);
        if (moved > DRAG_THRESHOLD) {
          clearTimeout(longPressTimer.current);
          beginPan(dragStart.current.x, dragStart.current.y);
        } else {
          return;
        }
      }
    }

    if (mode.current === "pan") {
      onPanChange?.(dragStart.current.panX + (x - dragStart.current.x), dragStart.current.panY + (y - dragStart.current.y));
    } else if (mode.current === "select") {
      setSelectionBox({
        left: Math.min(x, dragStart.current.x),
        top: Math.min(y, dragStart.current.y),
        width: Math.abs(x - dragStart.current.x),
        height: Math.abs(y - dragStart.current.y),
      });
    }
  };

  const endGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    clearTimeout(longPressTimer.current);
    if (event.pointerType === "touch") pointers.current.delete(event.pointerId);

    if (mode.current === "select" && selectionBox) {
      const scale = zoom / 100;
      onSelectionRectangle?.({
        x: (selectionBox.left - panX) / scale,
        y: (selectionBox.top - panY) / scale,
        width: selectionBox.width / scale,
        height: selectionBox.height / scale,
      });
    }

    if (pointers.current.size === 0) mode.current = null;
    else if (mode.current === "pinch" && pointers.current.size === 1) mode.current = null;
    clearSelection();
  };

  // Space engages pan mode (guidelines, Behavior); only when the canvas region itself has the focus.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.target !== event.currentTarget) return;
    const root = rootRef.current;
    if (!root) return;
    const step = tokenPx(root, "--space-16") * (zoom / 100);

    if (event.key === " ") {
      event.preventDefault();
      spacePressed.current = true;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      onPanChange?.(panX, panY + step);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      onPanChange?.(panX, panY - step);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onPanChange?.(panX + step, panY);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      onPanChange?.(panX - step, panY);
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomAtCenter(clampZoom(zoom + STEP));
    } else if (event.key === "-") {
      event.preventDefault();
      zoomAtCenter(clampZoom(zoom - STEP));
    } else if (event.key === "0") {
      event.preventDefault();
      onZoomChange?.(100);
    } else if (event.code === "Digit1" && event.shiftKey) {
      event.preventDefault();
      fitToScreen();
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " ") spacePressed.current = false;
  };

  // Zoom in / out / fit always keep the view centered on the same point of the content.
  const zoomAround = (nextZoom: number, screenX: number, screenY: number) => {
    const scale = zoom / 100;
    const nextScale = nextZoom / 100;
    const contentX = (screenX - panX) / scale;
    const contentY = (screenY - panY) / scale;
    onZoomChange?.(nextZoom);
    onPanChange?.(screenX - contentX * nextScale, screenY - contentY * nextScale);
  };

  const zoomAtCenter = (nextZoom: number) => {
    const root = rootRef.current;
    if (!root) {
      onZoomChange?.(nextZoom);
      return;
    }
    const rect = root.getBoundingClientRect();
    zoomAround(nextZoom, rect.width / 2, rect.height / 2);
  };

  // Fits the bounding box of the actual rendered children (however they are positioned by the caller).
  const fitToScreen = () => {
    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || !content) return;
    const kids = [...content.children];
    if (kids.length === 0) {
      onZoomChange?.(100);
      onPanChange?.(0, 0);
      return;
    }

    const rootRect = root.getBoundingClientRect();
    const rects = kids.map((kid) => kid.getBoundingClientRect());
    const minX = Math.min(...rects.map((r) => r.left));
    const minY = Math.min(...rects.map((r) => r.top));
    const maxX = Math.max(...rects.map((r) => r.right));
    const maxY = Math.max(...rects.map((r) => r.bottom));

    const scale = zoom / 100;
    const contentLeft = (minX - rootRect.left - panX) / scale;
    const contentTop = (minY - rootRect.top - panY) / scale;
    const contentWidth = Math.max(1, (maxX - minX) / scale);
    const contentHeight = Math.max(1, (maxY - minY) / scale);

    const margin = tokenPx(root, "--space-16");
    const fitZoom = clampZoom(
      floor10(Math.min((rootRect.width - margin * 2) / contentWidth, (rootRect.height - margin * 2) / contentHeight) * 100),
    );
    const nextScale = fitZoom / 100;
    onZoomChange?.(fitZoom);
    onPanChange?.(
      (rootRect.width - contentWidth * nextScale) / 2 - contentLeft * nextScale,
      (rootRect.height - contentHeight * nextScale) / 2 - contentTop * nextScale,
    );
  };

  // An element that receives the focus is brought into view, never under the zoom controls (guidelines, Accessibility).
  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root || event.target === root) return;
    const rootRect = root.getBoundingClientRect();
    const targetRect = event.target.getBoundingClientRect();
    const margin = tokenPx(root, "--space-16");
    const zoomControlsRect = zoomControlsRef.current?.getBoundingClientRect();

    let dx = 0;
    let dy = 0;
    if (targetRect.left < rootRect.left + margin) dx = rootRect.left + margin - targetRect.left;
    else if (targetRect.right > rootRect.right - margin) dx = rootRect.right - margin - targetRect.right;
    if (targetRect.top < rootRect.top + margin) dy = rootRect.top + margin - targetRect.top;
    else if (targetRect.bottom > rootRect.bottom - margin) dy = rootRect.bottom - margin - targetRect.bottom;

    if (zoomControlsRect) {
      const shifted = { left: targetRect.left + dx, top: targetRect.top + dy, right: targetRect.right + dx, bottom: targetRect.bottom + dy };
      const overlapsZoomControls =
        shifted.left < zoomControlsRect.right && shifted.right > zoomControlsRect.left && shifted.top < zoomControlsRect.bottom && shifted.bottom > zoomControlsRect.top;
      if (overlapsZoomControls) dy -= shifted.bottom - zoomControlsRect.top + margin;
    }

    if (dx !== 0 || dy !== 0) onPanChange?.(panX + dx, panY + dy);
  };

  const classes = ["ds-canvas", className].filter(Boolean).join(" ");

  return (
    <div
      ref={rootRef}
      className={classes}
      role="region"
      aria-label="Canvas"
      aria-describedby={descriptionId}
      tabIndex={0}
      style={{ "--ds-canvas-zoom": zoom / 100, "--ds-canvas-pan-x": `${panX}px`, "--ds-canvas-pan-y": `${panY}px` } as CSSProperties}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endGesture}
      onPointerCancel={endGesture}
      onFocus={handleFocus}
      {...rest}
    >
      <div ref={zoomControlsRef} className="ds-canvas-zoomcontrols">
        <ZoomControls zoom={zoom} onZoomChange={(next) => zoomAtCenter(next)} onFit={fitToScreen} />
      </div>

      <div ref={contentRef} className="ds-canvas-content">
        {children}
      </div>

      {isEmpty && <p className="ds-canvas-empty">Add a frame to start</p>}

      {selectionBox && (
        <div
          className="ds-canvas-selection"
          aria-hidden="true"
          style={{ left: selectionBox.left, top: selectionBox.top, width: selectionBox.width, height: selectionBox.height }}
        >
          <div className="ds-canvas-selection-fill" />
        </div>
      )}

      <span id={descriptionId} hidden>
        Pan with Space and drag, the mouse wheel or trackpad, or one finger. Zoom with the zoom controls, the plus and minus keys, or a pinch. Arrow
        keys move the view; 0 resets the zoom to 100%; Shift+1 fits the content to the view. Drag on the background to select, or on touch screens,
        long-press then drag.
      </span>
    </div>
  );
}
