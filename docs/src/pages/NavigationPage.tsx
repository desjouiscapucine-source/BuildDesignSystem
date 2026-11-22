import { Tag } from "@ds/components";
import { components, levels } from "../registry";
import { Header } from "./SectionPages";

// Navigation structure of the site, approved by the Design System Lead on 2026-10-27.
// The site follows it; the modal is the Dialog component.

interface NavNode {
  label: string;
  level: number;
  note?: string;
  children?: NavNode[];
}

const foundations = [
  "Color",
  "Typography",
  "Spacing",
  "Radius",
  "Border width",
  "Shadows",
  "Motion",
  "Opacity",
  "Size",
  "Breakpoints",
  "Layout grid",
  "Z-index",
  "Icons",
];

const structure: NavNode = {
  label: "Landing page",
  level: 0,
  children: [
    {
      label: "Design system",
      level: 1,
      note: "opens on Overview",
      children: [
        { label: "Overview", level: 2, note: "content: Description + Summary" },
        {
          label: "Governance",
          level: 2,
          children: [
            { label: "Backlog", level: 3, note: "a ticket opens in a modal" },
            { label: "How to use skills", level: 3 },
            { label: "Agents", level: 3 },
            { label: "Git workflow", level: 3 },
            { label: "Branches", level: 3 },
            { label: "Changelog", level: 3 },
            { label: "Navigation structure", level: 3, note: "this page" },
            { label: "Release planning", level: 3 },
          ],
        },
        {
          label: "Foundations",
          level: 2,
          note: "one page per category",
          children: foundations.map((label) => ({ label, level: 3 })),
        },
        {
          label: "Components",
          level: 2,
          note: "one category per Atomic Design level",
          children: levels.map(({ level, title }) => {
            const names = components.filter((c) => c.level === level).map((c) => c.name);
            return {
              label: title,
              level: 3,
              note: names.length === 0 ? "no component yet" : undefined,
              children: names.map((name) => ({ label: name, level: 4, note: "component page, with its tabs" })),
            };
          }),
        },
        { label: "Prototypes", level: 2, note: "one page per prototype (Level 3)" },
        { label: "Projects", level: 2, note: "one page per project (Level 3): user journey, then user flow and prototype" },
      ],
    },
    { label: "Portfolio", level: 1, note: "experience, skills and education" },
  ],
};

const levelRows = [
  { level: 0, content: "Landing page" },
  { level: 1, content: "Spaces: Design system, Portfolio" },
  { level: 2, content: "Sections of a space: Overview, Governance, Foundations, Components, Prototypes, Projects" },
  { level: 3, content: "Pages of a section (e.g. one prototype), or categories of components" },
  { level: 4, content: "Component pages only" },
];

const principles = [
  { name: "Back to Level 0", rule: "The site logo goes back to the landing page, from every level." },
  {
    name: "Go back",
    rule: "A breadcrumb shows where the page sits in the structure and goes back to any level above it. On every page from Level 2 to Level 4, above the title, from Level 0 (BuildDesignSystem) down to the parent of the page.",
  },
  {
    name: "Depth",
    rule: "Level 3 is the deepest level, except component pages (Level 4). The detail of a Level 3 page (e.g. a ticket from the Backlog) opens in a modal, not in a new page.",
  },
  {
    name: "Inside a page",
    rule: "Anchors on the sections and a timeline on the right (see the page-content skill). Component pages keep their current tabs.",
  },
];


function Node({ node }: { node: NavNode }) {
  return (
    <li>
      <div className="nav-tree-row">
        <Tag>L{node.level}</Tag>
        <span className="nav-tree-label">{node.label}</span>
        {node.note && <span className="nav-tree-note">{node.note}</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <Node key={child.label} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function NavigationPage() {
  return (
    <>
      <Header title="Navigation structure" lead="Navigation levels of the site and how to move between them" />
      <p>
        Structure of the site, approved by the Design System Lead. The site follows it; the modal is the Dialog component. Talk about the
        navigation in levels: Level 0 is the landing page.
      </p>

      <h2>Levels</h2>
      <table className="tokens">
        <thead>
          <tr>
            <th>Level</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {levelRows.map((row) => (
            <tr key={row.level}>
              <td>Level {row.level}</td>
              <td>{row.content}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Flow</h2>
      <ul className="nav-tree">
        <Node node={structure} />
      </ul>

      <h2>Navigation principles</h2>
      <table className="tokens">
        <thead>
          <tr>
            <th>Principle</th>
            <th>Rule</th>
          </tr>
        </thead>
        <tbody>
          {principles.map((principle) => (
            <tr key={principle.name}>
              <td>{principle.name}</td>
              <td>{principle.rule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
