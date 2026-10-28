// NavigationItem design preview (stage 1) — NOT the final component code.
// Shown on the brand surface it lives on; every value is a --preview-<slot> variable.
// Variants "parent*" add the arrow on the right (expand_more, turned upside down when open);
// "child*" and the children of "parent-open" are indented by --preview-indent per level and have no leading icon.
import type { PreviewProps } from "../../../docs/src/types";

function Mock({ state, text, variant, icon = "dashboard", arrow, indented, level = 1 }: PreviewProps & { icon?: string; arrow?: "closed" | "open"; indented?: boolean; level?: number }) {
  return (
    <div
      data-state={state}
      className="preview-state-layer"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--preview-gap)",
        width: indented ? `calc(100% - var(--preview-indent) * ${level})` : "100%",
        marginLeft: indented ? `calc(var(--preview-indent) * ${level})` : undefined,
        boxSizing: "border-box",
        padding: "var(--preview-padding-y) var(--preview-padding-x)",
        borderRadius: "var(--preview-radius)",
        background: "var(--preview-background, transparent)",
        color: "var(--preview-text)",
        fontFamily: "var(--preview-label-family)",
        fontSize: "var(--preview-label-size)",
        fontWeight: "var(--preview-label-weight)",
        lineHeight: "var(--preview-label-line-height)",
        opacity: state === "disabled" ? "var(--opacity-disabled)" : undefined,
        outlineColor: state === "focus" ? "var(--preview-focus)" : undefined,
      }}
      data-variant={variant}
    >
      {/* A child has no leading icon */}
      {!indented && (
        <span className="ds-icon" aria-hidden="true" style={{ color: "var(--preview-icon)", fontSize: "var(--preview-icon-size)" }}>
          {icon}
        </span>
      )}
      <span style={{ flex: 1, minWidth: 0, overflowWrap: "anywhere" }}>{text}</span>
      {arrow && (
        <span
          className="ds-icon"
          aria-hidden="true"
          style={{
            color: "var(--preview-icon)",
            fontSize: "var(--preview-arrow-size)",
            transform: arrow === "open" ? "rotate(180deg)" : undefined,
            transition: "transform var(--duration-200) var(--easing-ease-in-out)",
          }}
        >
          expand_more
        </span>
      )}
    </div>
  );
}

export function Preview(props: PreviewProps) {
  const variant = props.variant ?? "default";
  const isParent = variant.startsWith("parent");
  const isOpen = variant === "parent-open";
  const isChild = variant.startsWith("child");
  return (
    <div
      style={{
        background: "var(--preview-surface)",
        padding: "var(--space-8)",
        borderRadius: "var(--radius-8)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
      }}
    >
      <Mock {...props} icon={isParent ? "folder" : "dashboard"} arrow={isParent ? (isOpen ? "open" : "closed") : undefined} indented={isChild} />
      {isOpen && (
        <>
          {/* Nested example: a child that is itself an open parent, its children one more level in */}
          <Mock state="default" text="Projet A" arrow="open" indented />
          <Mock state="default" text="Tâches" indented level={2} />
          <Mock state="default" text="Documents" indented level={2} />
          <Mock state="default" text="Projet B" indented />
        </>
      )}
    </div>
  );
}
