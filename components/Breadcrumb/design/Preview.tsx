// Breadcrumb design preview (stage 1) — NOT the final component code.
// The items are the BreadcrumbItem component. Top: enough space. Bottom: a narrow container,
// labels cut with an ellipsis, the last item kept whole. The content field sets the last item.
import type { PreviewProps } from "../../../docs/src/types";
import { BreadcrumbItem } from "../../BreadcrumbItem/BreadcrumbItem";

function Mock({ text, narrow }: { text: string; narrow?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" style={{ width: narrow ? "35%" : "100%", minWidth: 0 }}>
      <ol style={{ display: "flex", gap: "var(--preview-gap)", margin: 0, padding: 0, listStyle: "none", minWidth: 0 }}>
        <BreadcrumbItem href="#/">Documentation</BreadcrumbItem>
        <BreadcrumbItem href="#/foundations">Foundations</BreadcrumbItem>
        <BreadcrumbItem href="#/foundations/layout-grid" last style={{ flexShrink: 0 }}>
          {text}
        </BreadcrumbItem>
      </ol>
    </nav>
  );
}

export function Preview({ text }: PreviewProps) {
  return (
    <div
      style={{
        background: "var(--preview-surface)",
        padding: "var(--space-8)",
        borderRadius: "var(--radius-8)",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-16)",
      }}
    >
      <Mock text={text} />
      <Mock text={text} narrow />
    </div>
  );
}
