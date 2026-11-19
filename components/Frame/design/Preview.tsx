// Frame design preview (stage 1) — NOT the final component code.
// The frame keeps its real size (size.viewport-* tokens) and is scaled down to fit the preview,
// like a canvas zoomed out; the name and size labels above it stay at their real size.
// Variants mobile / tablet / desktop; 'selected' and 'empty' are shown on the mobile size (the default size).
import type { CSSProperties } from "react";
import type { PreviewProps } from "../../../docs/src/types";

const sizes = {
  mobile: { label: "Mobile", width: "--size-viewport-mobile", height: "--size-viewport-mobile-height", px: "375 × 812", scale: 0.5 },
  tablet: { label: "Tablet", width: "--size-viewport-tablet", height: "--size-viewport-tablet-height", px: "768 × 1024", scale: 0.3 },
  desktop: { label: "Desktop", width: "--size-viewport-desktop", height: "--size-viewport-desktop-height", px: "1280 × 800", scale: 0.25 },
} as const;

const textStyle = (slot: string): CSSProperties => ({
  fontFamily: `var(--preview-${slot}-family)`,
  fontSize: `var(--preview-${slot}-size)`,
  fontWeight: `var(--preview-${slot}-weight)` as CSSProperties["fontWeight"],
  lineHeight: `var(--preview-${slot}-line-height)`,
});

const icon = (name: string, size: string) => (
  <span className="ds-icon" aria-hidden="true" style={{ fontSize: size }}>
    {name}
  </span>
);

function DeviceBar({ desktop }: { desktop: boolean }) {
  const bar: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "var(--preview-bar-gap)",
    padding: "var(--preview-bar-padding-y) var(--preview-bar-padding-x)",
    background: "var(--preview-bar-background)",
    borderBottom: "var(--preview-border-width) solid var(--preview-bar-border)",
    color: "var(--preview-bar-text-color)",
    ...textStyle("bar-text"),
  };
  if (desktop) {
    return (
      <div style={bar}>
        {icon("circle", "var(--preview-bar-icon-size)")}
        {icon("circle", "var(--preview-bar-icon-size)")}
        {icon("circle", "var(--preview-bar-icon-size)")}
        <span
          style={{
            flex: 1,
            padding: "0 var(--preview-bar-padding-x)",
            background: "var(--preview-address-background)",
            borderRadius: "var(--preview-address-radius)",
          }}
        >
          localhost:5173/prototypes/
        </span>
      </div>
    );
  }
  return (
    <div style={{ ...bar, justifyContent: "space-between" }}>
      <span>9:41</span>
      <span style={{ display: "flex", gap: "var(--preview-bar-icon-gap)" }}>
        {icon("signal_cellular_alt", "var(--preview-bar-icon-size)")}
        {icon("wifi", "var(--preview-bar-icon-size)")}
        {icon("battery_full", "var(--preview-bar-icon-size)")}
      </span>
    </div>
  );
}

// Placeholder content: grey blocks standing for the components placed in the frame.
function Content() {
  const block = (height: string): CSSProperties => ({
    height,
    background: "var(--color-background-subtle)",
    borderRadius: "var(--radius-8)",
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)", padding: "var(--space-24)" }}>
      <div style={{ ...block("var(--space-48)"), width: "60%" }} />
      <div style={block("var(--size-viewport-mobile)")} />
      <div style={{ ...block("var(--space-40)"), width: "40%" }} />
    </div>
  );
}

function Empty() {
  // Laid over the scaled-down frame, at its real size, so it stays readable in the preview.
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "var(--preview-empty-padding)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--preview-empty-gap)",
        color: "var(--preview-empty-color)",
      }}
    >
      {icon("add_box", "var(--preview-empty-icon-size)")}
      <span style={textStyle("empty-text")}>Drop components here</span>
    </div>
  );
}

export function Preview({ text, state, variant = "mobile" }: PreviewProps) {
  const sizeName = variant === "tablet" || variant === "desktop" ? variant : "mobile";
  const size = sizes[sizeName];
  const selected = variant === "selected";
  const empty = variant === "empty";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "var(--preview-label-gap)",
        padding: "var(--space-24)",
        background: "var(--preview-canvas)",
        textAlign: "left",
      }}
    >
      {/* One line, as wide as the frame: a long name is cut with an ellipsis, the size label stays whole. */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "var(--preview-label-row-gap)",
          width: `calc(var(${size.width}) * ${size.scale})`,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ ...textStyle("name"), color: "var(--preview-name-color)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
          {text || "Home"}
        </span>
        <span style={{ ...textStyle("size-label"), color: "var(--preview-size-label-color)", flexShrink: 0 }}>
          {size.label} · {size.px}
        </span>
      </div>
      {/* Wrapper: the focus outline is drawn around the frame, offset by space.4, so it can show with the selected outline. */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "relative",
            boxSizing: "border-box",
            width: `calc(var(${size.width}) * ${size.scale})`,
            height: `calc(var(${size.height}) * ${size.scale})`,
            overflow: "hidden",
            background: "var(--preview-background)",
            border: "var(--preview-border-width) solid var(--preview-border)",
            borderRadius: "var(--preview-radius)",
            boxShadow: "var(--preview-shadow, none)",
            // Selected: outline on the frame, no offset.
            outline: selected ? "var(--preview-selected-border-width) solid var(--preview-selected-border)" : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              flexDirection: "column",
              width: `var(${size.width})`,
              height: `var(${size.height})`,
              transform: `scale(${size.scale})`,
              transformOrigin: "top left",
            }}
          >
            <DeviceBar desktop={sizeName === "desktop"} />
            {/* The content scrolls inside the frame, under the device bar. */}
            {!empty && (
              <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
                <Content />
              </div>
            )}
          </div>
          {empty && <Empty />}
          {/* State layer (hover, focus) over the whole frame, in the layer color. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--preview-layer-color)",
              opacity: state === "hover" ? "var(--state-layer-hover)" : state === "focus" ? "var(--state-layer-focus)" : 0,
              pointerEvents: "none",
            }}
          />
        </div>
        {state === "focus" && (
          <div
            style={{
              position: "absolute",
              inset: "calc(-1 * (var(--preview-focus-offset) + var(--border-width-2)))",
              border: "var(--border-width-2) solid var(--preview-selected-border)",
              borderRadius: "calc(var(--preview-radius) + var(--preview-focus-offset) + var(--border-width-2))",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}
