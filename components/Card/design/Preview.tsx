// Card design preview (stage 1) — NOT the final component code.
import type { PreviewProps } from "../../../docs/src/types";

export function Preview({ text }: PreviewProps) {
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
    </div>
  );
}
