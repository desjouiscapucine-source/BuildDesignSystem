// TextInput design preview (stage 1) — NOT the final component code.
// Every value is a --preview-<slot> variable. No visible label above the field: the empty
// field shows its label or its placeholder (never both). Label, placeholder,
// help text and error message are preview content; the value comes from the Content field.
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

// Either a label or a placeholder, never both (Design System Lead, 2026-11-19).
const CONTENT: Record<string, { label?: string; placeholder?: string; help?: string; icon?: string }> = {
  empty: { placeholder: "Enter a name", help: "Shown on the component page" },
  filled: { placeholder: "Enter a name", help: "Shown on the component page" },
  "with-icon": { label: "Email", icon: "mail" },
  search: { placeholder: "Search an icon", icon: "search" },
  number: { label: "Width", help: "In pixels" },
  error: { placeholder: "Enter a name", help: "Shown on the component page" },
};

export function Preview({ state, text, variant = "empty" }: PreviewProps) {
  const content = CONTENT[variant] ?? CONTENT.empty;
  const search = variant === "search";
  const number = variant === "number";
  const value = variant === "empty" ? "" : number ? (/^\d+$/.test(text) ? text : "240") : text;
  const disabled = state === "disabled";

  return (
    <div style={{ background: "var(--preview-page)", padding: "var(--space-8)", width: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--preview-message-gap)" }}>
        <div
          data-state={state}
          className="preview-state-layer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--preview-icon-gap)",
            boxSizing: "border-box",
            width: "100%",
            padding: "var(--preview-padding-y) var(--preview-padding-x)",
            background: "var(--preview-background)",
            border: "var(--preview-border-width) solid var(--preview-border)",
            borderRadius: "var(--preview-radius)",
            color: value ? "var(--preview-text)" : "var(--preview-placeholder)",
            ...textStyle("value"),
          }}
        >
          {content.icon && (
            <span className="ds-icon" aria-hidden="true" style={{ color: "var(--preview-icon)", fontSize: "var(--preview-icon-size)" }}>
              {content.icon}
            </span>
          )}
          <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {value || content.placeholder || content.label}
          </span>
          {search && value && !disabled && (
            // Clear button: icon in the field, target of 24×24px minimum (WCAG 2.5.8).
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "var(--icon-size-24)",
                minHeight: "var(--icon-size-24)",
                margin: "calc(-1 * var(--space-4)) 0",
                borderRadius: "var(--radius-full)",
              }}
            >
              <span className="ds-icon" aria-hidden="true" style={{ color: "var(--preview-icon)", fontSize: "var(--preview-icon-size)" }}>
                close
              </span>
            </span>
          )}
        </div>
        {variant === "error" ? (
          <span style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", color: "var(--preview-error-text)", ...textStyle("message") }}>
            <span className="ds-icon" aria-hidden="true" style={{ color: "var(--preview-error-icon)", fontSize: "var(--icon-size-16)" }}>
              error
            </span>
            Enter a name to save the component
          </span>
        ) : (
          content.help && <span style={{ color: "var(--preview-help-text)", ...textStyle("message") }}>{content.help}</span>
        )}
      </div>
    </div>
  );
}
