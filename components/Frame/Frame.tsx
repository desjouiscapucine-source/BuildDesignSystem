import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import "./Frame.css";

// Variant property: names and values exactly as approved in spec.md.
export type FrameSize = "mobile" | "tablet" | "desktop";

// Size label of each size (spec.md, Content): set by `size`, never written by hand.
const sizeLabels: Record<FrameSize, { name: string; dimensions: string }> = {
  mobile: { name: "Mobile", dimensions: "375 × 812" },
  tablet: { name: "Tablet", dimensions: "768 × 1024" },
  desktop: { name: "Desktop", dimensions: "1280 × 800" },
};

export interface FrameProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Name of the composition, shown above the frame: the name of the screen, sentence case, a few words, never the size. Cut with an ellipsis at the frame width. */
  name: string;
  /** Screen size of the frame. Default: "mobile". */
  size?: FrameSize;
  /** The frame is selected on the canvas. Default: false. */
  selected?: boolean;
  /** The frame holds no component yet: the empty message replaces the content. Default: false. */
  empty?: boolean;
  /** Called when the frame asks to be selected (click anywhere in the frame, Enter / Space on its name) or unselected (Enter / Space on its name, Escape). */
  onSelectedChange?: (selected: boolean) => void;
  /** The components placed in the frame. They scroll inside the frame, under the device bar. */
  children?: ReactNode;
}

/** Status bar (mobile, tablet) or browser bar (desktop) at the top of the frame. Decorative. */
function DeviceBar({ size }: { size: FrameSize }) {
  if (size === "desktop") {
    return (
      <div className="ds-frame-bar" aria-hidden="true">
        <span className="ds-icon ds-frame-bar-icon">circle</span>
        <span className="ds-icon ds-frame-bar-icon">circle</span>
        <span className="ds-icon ds-frame-bar-icon">circle</span>
        <span className="ds-frame-address">localhost:5173/prototypes/</span>
      </div>
    );
  }
  return (
    <div className="ds-frame-bar ds-frame-bar--status" aria-hidden="true">
      <span>9:41</span>
      <span className="ds-frame-bar-icons">
        <span className="ds-icon ds-frame-bar-icon">signal_cellular_alt</span>
        <span className="ds-icon ds-frame-bar-icon">wifi</span>
        <span className="ds-icon ds-frame-bar-icon">battery_full</span>
      </span>
    </div>
  );
}

/**
 * A layout frame on the canvas of the UX playground, at the size of a real screen.
 * A named group; its name is a toggle button (`aria-pressed`) that exposes the selection.
 */
export function Frame({
  name,
  size = "mobile",
  selected = false,
  empty = false,
  onSelectedChange,
  className,
  children,
  onClick,
  onKeyDown,
  ...rest
}: FrameProps) {
  const label = sizeLabels[size];
  const classes = ["ds-frame", `ds-frame--${size}`, className].filter(Boolean).join(" ");

  // A click anywhere on the container selects it (guidelines, Behavior). Not on the label row:
  // there, only the name button is a target (WCAG 2.5.8 spacing exception).
  const handleContainerClick = () => {
    if (!selected) onSelectedChange?.(true);
  };

  // Escape removes the selection (guidelines, Accessibility).
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (!event.defaultPrevented && event.key === "Escape" && selected) onSelectedChange?.(false);
  };

  // The name toggles the selection (Enter / Space, or a click on it).
  const handleNameClick = () => onSelectedChange?.(!selected);

  return (
    <div
      role="group"
      aria-label={`${name}, ${label.name} ${label.dimensions}`}
      className={classes}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div className="ds-frame-labels">
        <button type="button" className="ds-frame-name" aria-pressed={selected} onClick={handleNameClick}>
          {name}
        </button>
        <span className="ds-frame-size" aria-hidden="true">
          {label.name} · {label.dimensions}
        </span>
      </div>
      <div className="ds-frame-container" onClick={handleContainerClick}>
        <div className="ds-frame-screen">
          <DeviceBar size={size} />
          {empty ? (
            <div className="ds-frame-empty">
              <span className="ds-icon ds-frame-empty-icon" aria-hidden="true">
                add_box
              </span>
              <span>Drop components here</span>
            </div>
          ) : (
            <div className="ds-frame-content">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
