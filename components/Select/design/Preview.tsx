// Select design preview (stage 1) — NOT the final component code.
// Every value is a --preview-<slot> variable. The list (variant "open") uses the
// coded SelectOption building block. Label, placeholder and options are preview content.
import type { PreviewProps } from "../../../docs/src/types";
import { SelectOption } from "../../SelectOption/SelectOption";

const OPTIONS = ["To do", "In progress", "Done"];

export function Preview({ state, text, variant = "placeholder" }: PreviewProps) {
  const open = variant === "open";
  const showValue = variant !== "placeholder";
  return (
    <div style={{ background: "var(--preview-page)", padding: "var(--space-8)", width: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--preview-label-gap)" }}>
        <span
          style={{
            color: "var(--preview-label-text)",
            fontFamily: "var(--preview-label-family)",
            fontSize: "var(--preview-label-size)",
            fontWeight: "var(--preview-label-weight)",
            lineHeight: "var(--preview-label-line-height)",
          }}
        >
          Status
        </span>
        <div
          data-state={state}
          className="preview-state-layer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-8)",
            boxSizing: "border-box",
            width: "100%",
            padding: "var(--preview-padding-y) var(--preview-padding-x)",
            background: "var(--preview-background)",
            border: "var(--preview-border-width) solid var(--preview-border)",
            borderRadius: "var(--preview-radius)",
            color: showValue ? "var(--preview-text)" : "var(--preview-placeholder)",
            fontFamily: "var(--preview-value-family)",
            fontSize: "var(--preview-value-size)",
            fontWeight: "var(--preview-value-weight)",
            lineHeight: "var(--preview-value-line-height)",
          }}
        >
          <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {showValue ? text : "Choose a status"}
          </span>
          <span
            className="ds-icon"
            aria-hidden="true"
            style={{ color: "var(--preview-arrow)", fontSize: "var(--preview-arrow-size)", transform: open ? "rotate(180deg)" : undefined }}
          >
            expand_more
          </span>
        </div>
        {variant === "error" && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
              color: "var(--preview-message-text)",
              fontFamily: "var(--preview-message-family)",
              fontSize: "var(--preview-message-size)",
              fontWeight: "var(--preview-message-weight)",
              lineHeight: "var(--preview-message-line-height)",
            }}
          >
            <span className="ds-icon" aria-hidden="true" style={{ color: "var(--preview-message-icon)", fontSize: "var(--icon-size-16)" }}>
              error
            </span>
            Choose a status to save the task
          </span>
        )}
      </div>
      {open && (
        <div
          role="listbox"
          aria-label="Status"
          style={{
            marginTop: "var(--preview-list-offset)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--preview-list-gap)",
            padding: "var(--preview-list-padding)",
            background: "var(--preview-list-background)",
            border: "var(--preview-border-width) solid var(--preview-list-border)",
            borderRadius: "var(--preview-radius)",
          }}
        >
          {OPTIONS.map((option) => (
            <SelectOption key={option} selected={option === text}>
              {option}
            </SelectOption>
          ))}
        </div>
      )}
    </div>
  );
}
