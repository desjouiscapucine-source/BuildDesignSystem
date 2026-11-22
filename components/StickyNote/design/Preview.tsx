// StickyNote design preview (stage 1) — NOT the final component code.
// Every visual value comes from a --preview-<slot> variable set by the Design preview tab
// from design/tokens.json. The selected, editing and dragging states are shown as variants.
import type { CSSProperties } from "react";
import type { PreviewProps } from "../../../docs/src/types";
import { IconButton } from "../../IconButton/IconButton";

const textStyle = (slot: string, color: string): CSSProperties => ({
  fontFamily: `var(--preview-${slot}-family)`,
  fontSize: `var(--preview-${slot}-size)`,
  fontWeight: `var(--preview-${slot}-weight)` as CSSProperties["fontWeight"],
  lineHeight: `var(--preview-${slot}-line-height)`,
  color: `var(--preview-${color})`,
  margin: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export function Preview({ state, text, variant }: PreviewProps) {
  const editing = variant === "editing";
  // Selected and editing: no state layer (the border keeps 3:1), only the focus outline.
  const noLayer = editing || variant === "selected";
  return (
    <div
      data-state={noLayer ? undefined : state}
      className={noLayer ? undefined : "preview-state-layer"}
      style={{
        ...(noLayer && state === "focus"
          ? { outline: "var(--border-width-2) solid var(--color-border-focus)", outlineOffset: "var(--border-width-2)" }
          : {}),
        boxSizing: "border-box",
        width: "var(--size-sticky-note)",
        height: "var(--size-sticky-note)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--preview-gap)",
        textAlign: "left",
        background: "var(--preview-background)",
        border: "var(--preview-border-width) solid var(--preview-border)",
        color: "var(--preview-body-color)",
        borderRadius: "var(--preview-radius)",
        boxShadow: "var(--preview-shadow, none)",
        padding: "var(--preview-padding)",
      }}
    >
      {/* Text: cut with an ellipsis after 4 lines (proposal); the full text scrolls in the editing state. */}
      <p
        contentEditable={editing}
        suppressContentEditableWarning
        style={{
          ...textStyle("body", "body-color"),
          flex: 1,
          minHeight: 0,
          whiteSpace: "normal",
          ...(editing
            ? { overflowY: "auto", cursor: "text" }
            : { display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 4 }),
        }}
      >
        {text}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--preview-actions-gap)" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <span style={textStyle("author", "author-color")}>CD</span>
          <span style={textStyle("date", "date-color")}>19 Nov</span>
        </div>
        <IconButton variant="tertiary" icon="edit" label="Edit the note" />
        <IconButton variant="tertiary" icon="delete" label="Delete the note" />
      </div>
    </div>
  );
}
