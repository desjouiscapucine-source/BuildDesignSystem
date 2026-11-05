// Link design preview (stage 1) — NOT the final component code.
// The link inherits the size of the surrounding text, so it is shown inside a paragraph.
// Every visual value of the link comes from a --preview-<slot> variable (design/tokens.json).
// Hover, pressed and visited change the text color (Link exception to state layers);
// focus: no outline and no state layer, a thicker underline (state override in tokens.json).
import type { PreviewProps } from "../../../docs/src/types";

export function Preview({ state, text }: PreviewProps) {
  return (
    <p
      className="ds-text-body"
      style={{ margin: 0, padding: "var(--space-8)", background: "var(--preview-background)", color: "var(--color-text-primary)" }}
    >
      Read the{" "}
      <a
        href="#"
        onClick={(event) => event.preventDefault()}
        data-state={state}
        style={{
          color: "var(--preview-text)",
          textDecorationLine: "underline",
          textDecorationThickness: "var(--preview-underline-thickness)",
          outline: "none",
        }}
      >
        {text}
      </a>{" "}
      before you start.
    </p>
  );
}
