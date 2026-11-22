// Avatar design preview (stage 1) — NOT the final component code.
// Every visual value is a --preview-<slot> variable set by the Design preview tab.
// The avatar is not interactive: no state layer. Shown with initials (from the full name in the
// Content field), then with the icon (no name).
import type { PreviewProps } from "../../../docs/src/types";

// Initials from the full name: first letters of the first and last words, one letter for a one-word name.
function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  return (words.length === 1 ? words[0][0] : words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function Mock({ text, icon }: PreviewProps & { icon?: boolean }) {
  const label = icon ? undefined : text.trim() || undefined;
  return (
    <span
      role="img"
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: "var(--preview-diameter)",
        height: "var(--preview-diameter)",
        borderRadius: "var(--preview-radius)",
        background: "var(--preview-background)",
        color: "var(--preview-text)",
        fontFamily: "var(--preview-initials-family)",
        fontSize: "var(--preview-initials-size)",
        fontWeight: "var(--preview-initials-weight)",
        lineHeight: "var(--preview-initials-line-height)",
        textTransform: "uppercase",
        overflow: "hidden",
      }}
    >
      {icon || !label ? (
        <span className="ds-icon" aria-hidden="true" style={{ color: "var(--preview-icon)", fontSize: "var(--preview-icon-size)" }}>
          person
        </span>
      ) : (
        <span aria-hidden="true">{initials(text)}</span>
      )}
    </span>
  );
}

export function Preview(props: PreviewProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Mock {...props} />
      <Mock {...props} icon />
    </div>
  );
}
