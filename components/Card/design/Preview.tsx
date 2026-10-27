// Card design preview (stage 1) — NOT the final component code.
// Variant clickable-image: thumbnails under the text, 3 per row (16:9), clickable; the first one shows the state.
import type { PreviewProps } from "../../../docs/src/types";
import landscape from "../../ImageViewer/examples/landscape.svg";
import portrait from "../../ImageViewer/examples/portrait.svg";
import small from "../../ImageViewer/examples/small.svg";

const thumbnails = [landscape, portrait, small, landscape];

export function Preview({ text, state, variant }: PreviewProps) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--preview-gap)",
        textAlign: "left",
        background: "var(--preview-background)",
        border: "var(--preview-border-width) solid var(--preview-border)",
        borderRadius: "var(--preview-radius)",
        padding: "var(--preview-padding)",
        boxShadow: "var(--preview-shadow, none)",
      }}
    >
      <span style={{ fontFamily: "var(--preview-title-family)", fontSize: "var(--preview-title-size)", fontWeight: "var(--preview-title-weight)", lineHeight: "var(--preview-title-line-height)", color: "var(--preview-title-color)" }}>
        {text || "Order shipped"}
      </span>
      <span style={{ fontFamily: "var(--preview-text-family)", fontSize: "var(--preview-text-size)", fontWeight: "var(--preview-text-weight)", lineHeight: "var(--preview-text-line-height)", color: "var(--preview-text-color)" }}>
        The parcel left the warehouse in Lyon and was handed over to the carrier. It will be delivered to the address given in the order.
      </span>
      {variant === "clickable-image" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "var(--preview-thumbnails-gap)",
            // The text / thumbnails space replaces the title / text gap for this block.
            marginTop: "calc(var(--preview-thumbnails-gap-top) - var(--preview-gap))",
          }}
        >
          {thumbnails.map((src, index) => (
            <span
              key={index}
              data-state={index === 0 ? state : "default"}
              className="preview-state-layer"
              style={{ display: "block", aspectRatio: "16 / 9", borderRadius: "var(--preview-thumbnail-radius)", color: "var(--color-text-primary)" }}
            >
              <img src={src} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
