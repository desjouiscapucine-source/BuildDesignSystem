// CommentMessage design preview (stage 1) — NOT the final component code.
// Every visual value of the message is a --preview-<slot> variable set by the Design preview tab.
// The Content field sets the message text. The Avatar is drawn with its own approved tokens (B159, small).
// author "me" only: the "…" button shows on hover and focus (always on touch screens); in the focus state, it is the button that has the focus.
// Hover also puts the hover state layer on the whole message. author "other": no button, no hover (B160-2); the header keeps the same height.
import type { CSSProperties } from "react";
import type { PreviewProps } from "../../../docs/src/types";

function textStyle(slot: string): CSSProperties {
  return {
    fontFamily: `var(--preview-${slot}-family)`,
    fontSize: `var(--preview-${slot}-size)`,
    fontWeight: `var(--preview-${slot}-weight)` as CSSProperties["fontWeight"],
    lineHeight: `var(--preview-${slot}-line-height)`,
  };
}

function initials(name: string) {
  const words = name.trim().split(/\s+/);
  return (words.length === 1 ? [words[0]] : [words[0], words[words.length - 1]]).map((w) => w[0]).join("").toUpperCase();
}

function Mock({ state, text, variant, name, edited }: PreviewProps & { name: string; edited?: boolean }) {
  const isMe = variant?.endsWith("-me") ?? false;
  const showActions = isMe && (state === "hover" || state === "focus");
  return (
    <div
      data-state={isMe && state === "hover" ? "hover" : "default"}
      className="preview-state-layer"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--preview-gap)",
        padding: "var(--preview-padding)",
        borderRadius: "var(--preview-radius)",
        background: "var(--preview-background, transparent)",
        borderTop: "var(--preview-separator-width) solid var(--preview-separator)",
        // Preview frame only: the width of a narrow comment bubble.
        width: "var(--size-dialog-small)",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--preview-header-gap)", minWidth: 0, minHeight: "var(--space-24)" }}>
        <span
          aria-hidden="true"
          className="ds-text-label-sm"
          style={{
            flex: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "var(--space-24)",
            height: "var(--space-24)",
            borderRadius: "var(--radius-full)",
            background: "var(--color-background-brand)",
            color: "var(--color-text-inverse)",
          }}
        >
          {initials(name)}
        </span>
        <span style={{ ...textStyle("name-style"), color: "var(--preview-name)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
          {name}
        </span>
        <span style={{ ...textStyle("date-style"), color: "var(--preview-date)", flex: "none", whiteSpace: "nowrap" }}>
          19 Nov 2026, 14:43{edited ? " · Edited" : ""}
        </span>
        <span
          data-state={state === "focus" ? "focus" : "default"}
          className="preview-state-layer"
          style={{
            marginLeft: "auto",
            flex: "none",
            display: "inline-flex",
            padding: "var(--space-8)",
            borderRadius: "var(--radius-8)",
            color: "var(--preview-icon)",
            visibility: showActions ? "visible" : "hidden",
          }}
        >
          <span className="ds-icon" aria-hidden="true" style={{ fontSize: "var(--icon-size-20)" }}>
            more_horiz
          </span>
        </span>
      </div>
      <p style={{ ...textStyle("body-style"), color: "var(--preview-body)", margin: 0, overflowWrap: "anywhere" }}>{text}</p>
    </div>
  );
}

export function Preview(props: PreviewProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-16)" }}>
      <Mock {...props} name="Capucine Desjouis" />
      <Mock {...props} name="Anne-Marie Fontaine-Delacroix de Montmorency" edited />
    </div>
  );
}
