// Comment design preview (stage 1) — NOT the final component code.
// The marker, the messages, the buttons and the reply field are the coded Avatar, CommentMessage, IconButton and TextInput
// (each with its own approved tokens); the bubble and the marker states use the --preview-<slot> variables set by the Design preview tab.
// Variants = the states of the comment: closed (marker only), open (marker + bubble), selected (ring on the marker, bubble open),
// resolved (marker shows a check icon, bubble open, Resolve becomes Reopen), editing (a reply being written).
// The marker is a button: the state row (hover, focus, pressed) is applied to the marker.
import type { PreviewProps } from "../../../docs/src/types";
import { Avatar } from "../../Avatar/Avatar";
import { CommentMessage } from "../../CommentMessage/CommentMessage";
import { IconButton } from "../../IconButton/IconButton";
import { TextInput } from "../../TextInput/TextInput";

export function Preview({ state, text, variant = "open" }: PreviewProps) {
  const isOpen = variant !== "closed";
  const isSelected = variant === "selected";
  const isResolved = variant === "resolved";
  const isEditing = variant === "editing";
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--preview-marker-gap)", padding: "var(--preview-ring-offset)" }}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isResolved ? "Comment by Capucine Desjouis, resolved" : "Comment by Capucine Desjouis"}
        data-state={state}
        className="preview-state-layer"
        style={{
          flex: "none",
          display: "inline-flex",
          padding: 0,
          border: "none",
          background: "none",
          cursor: "pointer",
          borderRadius: "var(--radius-full)",
          // State layers use the content color of the marker (text.inverse); focus ring and selected ring share color and width.
          color: "var(--color-text-inverse)",
          outline: state === "focus" || isSelected ? "var(--preview-ring-width) solid var(--preview-ring)" : "none",
          outlineOffset: state === "focus" ? "var(--preview-focus-offset)" : "var(--preview-ring-offset)",
        }}
      >
        {isResolved ? (
          // Resolved: the Avatar circle with the icon check instead of the initials (needs an icon in Avatar).
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "var(--space-32)",
              height: "var(--space-32)",
              borderRadius: "var(--radius-full)",
              background: "var(--color-background-brand)",
              color: "var(--color-icon-inverse)",
            }}
          >
            <span className="ds-icon" style={{ fontSize: "var(--icon-size-20)" }}>
              check
            </span>
          </span>
        ) : (
          <Avatar name="Capucine Desjouis" size="medium" />
        )}
      </button>
      {isOpen && (
        <div
          role="group"
          aria-label="Comment"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--preview-bubble-gap)",
            padding: "var(--preview-bubble-padding)",
            width: "var(--size-dialog-small)",
            maxWidth: "100%",
            boxSizing: "border-box",
            background: "var(--preview-bubble-background)",
            boxShadow: "var(--preview-bubble-shadow)",
            borderRadius: "var(--preview-bubble-radius)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--preview-header-gap)", color: "var(--preview-action-icon)" }}>
            {isResolved ? (
              <IconButton variant="tertiary" icon="undo" label="Reopen the comment" />
            ) : (
              <IconButton variant="tertiary" icon="check" label="Resolve the comment" />
            )}
            <IconButton variant="tertiary" icon="close" label="Close the comment" />
          </div>
          <div role="list" style={{ display: "flex", flexDirection: "column" }}>
            <div role="listitem">
              <CommentMessage position="first" author="me" name="Capucine Desjouis" date={new Date(2026, 10, 19, 14, 43)}>
                {text}
              </CommentMessage>
            </div>
            <div role="listitem">
              <CommentMessage position="reply" author="other" name="Anne Marie Dupont" date={new Date(2026, 10, 19, 15, 2)}>
                Yes, with a 16px margin on each side.
              </CommentMessage>
            </div>
            <div role="listitem">
              <CommentMessage position="reply" author="me" name="Capucine Desjouis" date={new Date(2026, 10, 20, 9, 15)} edited>
                Thanks, I will add it to the Button guidelines.
              </CommentMessage>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--preview-header-gap)" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <TextInput placeholder="Write a reply" defaultValue={isEditing ? "Could we also test it on tablet?" : ""} />
            </div>
            <IconButton variant="primary" icon="send" label="Send the reply" />
          </div>
        </div>
      )}
    </div>
  );
}
