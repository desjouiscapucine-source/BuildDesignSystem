// Pages that only lead to other pages (navigation skill): Overview, Level 2 sections (Prototypes included),
// component categories. Their links are stacked cards (card skill).
import type { ReactNode } from "react";
import { components } from "../registry";
import { StageBadge } from "../StageBadge";
import { pathTo, type NavNode } from "../structure";

function LinkCards({ nodes, children }: { nodes: NavNode[]; children?: (node: NavNode) => ReactNode }) {
  return (
    <ul className="cards">
      {nodes.map((node) => (
        <li key={node.href}>
          <a href={node.href}>
            <strong>{node.label}</strong>
            {node.description && <span>{node.description}</span>}
            {children?.(node)}
          </a>
        </li>
      ))}
    </ul>
  );
}

// Page header (page-header skill): title + subtitle, with their full text in the title attribute (shown on hover when cut).
export function Header({ title, lead }: { title: string; lead: string }) {
  return (
    <>
      <h1 title={title}>{title}</h1>
      <p className="lead" title={lead}>
        {lead}
      </p>
    </>
  );
}

const nodeAt = (href: string) => pathTo(href).at(-1)!;

// Level 2 — Overview: Description + Summary (one card per section).
export function OverviewPage() {
  const sections = (pathTo("#/")[0].children ?? []).filter((node) => node.href !== "#/");
  return (
    <>
      <Header title="Overview" lead="Design tokens, component specs and usage guidelines." />
      <section>
        <h2>Description</h2>
        <p>
          This is the design system of BuildDesignSystem, the project that built this site. Everything you see here (the
          rules of the project, the design tokens, each component with its design spec, usage guidelines and code) was
          made with it, without Figma.
        </p>
      </section>
      <section>
        <h2>Summary</h2>
        <LinkCards nodes={sections} />
      </section>
    </>
  );
}

// Level 2 — a section with Level 3 pages (Governance, Foundations): one card per page.
export function SectionPage({ href }: { href: string }) {
  const node = nodeAt(href);
  return (
    <>
      <Header title={node.label} lead={node.description ?? ""} />
      <LinkCards nodes={node.children ?? []} />
    </>
  );
}

// Level 2 — Components: one card per Atomic Design category.
export function ComponentsPage() {
  const node = nodeAt("#/components");
  return (
    <>
      <Header title="Components" lead="Components by Atomic Design level" />
      <LinkCards nodes={node.children ?? []} />
    </>
  );
}

// Level 3 — one Atomic Design category: its components (Level 4).
export function CategoryPage({ href }: { href: string }) {
  const node = nodeAt(href);
  const list = node.children ?? [];
  const bySlug = (child: NavNode) => components.find((c) => `#/components/${c.slug}` === child.href);
  return (
    <>
      <Header title={node.label} lead={`${node.label} of the design system (Atomic Design)`} />
      {list.length === 0 ? (
        <p className="empty">No component yet.</p>
      ) : (
        <LinkCards nodes={list}>
          {(child) => {
            const component = bySlug(child);
            return component && <StageBadge status={component.status} level={component.level} />;
          }}
        </LinkCards>
      )}
    </>
  );
}

// Level 2 — Prototypes: one card per prototype.
export function PrototypesPage() {
  const node = nodeAt("#/prototypes");
  return (
    <>
      <Header title="Prototypes" lead={node.description ?? ""} />
      <LinkCards nodes={node.children ?? []} />
    </>
  );
}

// Level 1 — Portfolio: content not defined yet.
