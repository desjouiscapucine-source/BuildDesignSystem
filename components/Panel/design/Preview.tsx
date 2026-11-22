// Panel design preview (stage 1) — NOT the final component code.
// The panel sits on the right of the playground canvas, full height, over the canvas (shadow).
// "expanded": resize handle on the left edge, tabs + collapse button at the top, tab content below.
// "collapsed": a narrow strip with one icon per tab; a click reopens the panel on that tab.
// The tabs come from the Tabs component (B093, in progress): shown here as a dashed placeholder.
import type { PreviewProps } from "../../../docs/src/types";
import { IconButton } from "../../IconButton/IconButton";

const tabs = [
  { label: "Library", icon: "widgets" },
  { label: "Properties", icon: "tune" },
  { label: "Compositions", icon: "dashboard" },
];

const bodyStyle = {
  margin: 0,
  fontFamily: "var(--preview-body-family)",
  fontSize: "var(--preview-body-size)",
  fontWeight: "var(--preview-body-weight)",
  lineHeight: "var(--preview-body-line-height)",
  color: "var(--preview-body-color)",
} as const;

export function Preview({ text, variant = "expanded" }: PreviewProps) {
  const collapsed = variant === "collapsed";
  const selected = tabs.find((tab) => tab.label === text) ?? tabs[0];
  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "100%",
        height: "440px",
        display: "flex",
        justifyContent: "flex-end",
        background: "var(--color-background-subtle)",
      }}
    >
      <aside
        aria-label="Panel"
        style={{
          boxSizing: "border-box",
          position: "relative",
          width: collapsed ? "auto" : "var(--size-panel)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          background: "var(--preview-background)",
          boxShadow: "var(--preview-shadow, none)",
        }}
      >
        {collapsed ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", padding: "var(--preview-padding)" }}>
            {tabs.map((tab) => (
              <IconButton key={tab.label} variant="tertiary" icon={tab.icon} label={`Open ${tab.label}`} />
            ))}
          </div>
        ) : (
          <>
            {/* Hit area size.resize-handle (24×24px), corners radius.4. */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "var(--size-resize-handle)",
                height: "var(--size-resize-handle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "var(--radius-4)",
                background: "var(--preview-background)",
                cursor: "ew-resize",
              }}
            >
              <span className="ds-icon" style={{ fontSize: "var(--preview-handle-size)", color: "var(--preview-handle-color)" }}>
                drag_indicator
              </span>
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-8)", padding: "var(--space-8) var(--space-8) 0 var(--preview-padding-left)" }}>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  gap: "var(--space-16)",
                  padding: "var(--space-8)",
                  border: "var(--border-width-1) dashed var(--color-border-default)",
                  borderRadius: "var(--radius-4)",
                }}
              >
                {tabs.map((tab) => (
                  <span key={tab.label} style={{ ...bodyStyle, color: tab === selected ? "var(--color-text-primary)" : "var(--preview-body-color)" }}>
                    {tab.label}
                  </span>
                ))}
              </div>
              <IconButton variant="tertiary" icon="right_panel_close" label="Collapse the panel" />
            </div>
            <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "var(--preview-padding)", paddingLeft: "var(--preview-padding-left)" }}>
              <p style={bodyStyle}>Content of the {selected.label} tab.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
