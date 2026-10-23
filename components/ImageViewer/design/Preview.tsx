// ImageViewer design preview (stage 1) — NOT the final component code.
// A page seen through the dimmed background, the image in the middle, the close button at the top right,
// and the solid band under the image (previous and next buttons).
// Every visual value of the viewer comes from a --preview-<slot> variable (design/tokens.json).
import type { PreviewProps } from "../../../docs/src/types";
import { IconButton } from "../../IconButton/IconButton";

const pageCard = { background: "var(--color-background-page)", border: "var(--border-width-1) solid var(--color-border-subtle)", borderRadius: "var(--radius-8)", height: "64px" };

export function Preview({ text }: PreviewProps) {
  return (
    <div style={{ position: "relative", width: "640px", maxWidth: "100%", height: "440px", overflow: "hidden", border: "var(--border-width-1) solid var(--color-border-default)", borderRadius: "var(--radius-16)", background: "var(--color-background-page)" }}>
      {/* The page behind the viewer */}
      <div style={{ padding: "var(--space-24)", display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
        <div style={pageCard} />
        <div style={pageCard} />
        <div style={pageCard} />
        <div style={pageCard} />
      </div>

      {/* Viewer: dimmed background over the whole screen */}
      <div
        role="dialog"
        aria-label="Image viewer"
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--preview-overlay)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-16)",
          padding: "var(--preview-edge)",
        }}
      >
        <div style={{ position: "absolute", top: "var(--preview-edge)", right: "var(--preview-edge)" }}>
          <IconButton icon="close" label="Close the image viewer" variant="primary" />
        </div>

        {/* The image: whole image visible, scaled down to fit (placeholder) */}
        <div
          role="img"
          aria-label="Sample image"
          style={{
            width: "60%",
            aspectRatio: "4 / 3",
            maxHeight: "55%",
            borderRadius: "var(--preview-image-radius)",
            background: "var(--color-background-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-icon-secondary)",
          }}
        >
          <span className="ds-icon" aria-hidden="true" style={{ fontSize: "var(--icon-size-32)" }}>
            image
          </span>
        </div>

        {/* COMPARISON ONLY (not in the spec): a text under the image, shown when the content field is filled.
            text.primary on background.subtle: 13.99:1. */}
        {text && (
          <p
            style={{
              margin: 0,
              width: "60%",
              boxSizing: "border-box",
              padding: "var(--space-8) var(--space-16)",
              borderRadius: "var(--radius-8)",
              background: "var(--color-background-subtle)",
              color: "var(--color-text-primary)",
              textAlign: "center",
              fontFamily: "var(--typography-body-family)",
              fontSize: "var(--typography-body-size)",
              fontWeight: "var(--typography-body-weight)",
              lineHeight: "var(--typography-body-line-height)",
            }}
          >
            {text}
          </p>
        )}

        {/* Solid band: previous and next buttons only */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--preview-band-gap)",
            padding: "var(--preview-band-padding)",
            background: "var(--preview-band-background)",
            borderRadius: "var(--radius-8)",
          }}
        >
          <IconButton icon="arrow_back" label="Previous image" variant="primary" />
          <IconButton icon="arrow_forward" label="Next image" variant="primary" />
        </div>
      </div>
    </div>
  );
}
