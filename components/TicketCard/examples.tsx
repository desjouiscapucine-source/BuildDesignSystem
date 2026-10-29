// Live examples shown on the component's documentation page.
// The menus are native selects (placeholder) until the Select component (B021) is coded.
import { useState } from "react";
import type { Example } from "../../docs/src/types";
import { PlaceholderMenus } from "./examples/PlaceholderMenus";
import { TicketCard } from "./TicketCard";

function OpenDemo() {
  const [opened, setOpened] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", maxWidth: "360px" }}>
      <TicketCard
        ticketId="B115"
        title="TicketCard"
        description="A design system component for the card of a backlog ticket."
        category="Components"
        decided
        menus={<PlaceholderMenus />}
        onOpen={() => setOpened("B115")}
      />
      <p style={{ margin: 0 }} aria-live="polite">
        {opened ? `Opened: ${opened}` : "Click the card or press Enter on it."}
      </p>
    </div>
  );
}

export const examples: Example[] = [
  {
    title: "Component ticket, decided",
    description: "Category and Decided tags, and the Stage menu (component ticket).",
    render: () => (
      <div style={{ maxWidth: "360px" }}>
        <TicketCard
          ticketId="B115"
          title="TicketCard"
          description="A design system component for the card of a backlog ticket."
          category="Components"
          decided
          menus={<PlaceholderMenus />}
        />
      </div>
    ),
  },
  {
    title: "Other ticket, proposal",
    description: "No Decided tag (origin proposal), no Stage menu (not a component ticket).",
    render: () => (
      <div style={{ maxWidth: "360px" }}>
        <TicketCard
          ticketId="B114"
          title="Ticket description template"
          description="A template for the description of every backlog ticket."
          category="Governance"
          menus={<PlaceholderMenus stage={false} />}
        />
      </div>
    ),
  },
  {
    title: "No description",
    description: "The description row is not shown.",
    render: () => (
      <div style={{ maxWidth: "360px" }}>
        <TicketCard ticketId="B059" title="Tag" category="Components" decided menus={<PlaceholderMenus />} />
      </div>
    ),
  },
  {
    title: "Long text",
    description: "Title and description in full, wrapping; the tags and menus rows wrap too.",
    render: () => (
      <div style={{ maxWidth: "280px" }}>
        <TicketCard
          ticketId="B107"
          title="Git workflow: develop branch, release review and release notes"
          description="A develop branch that receives the approved work of every piece of work, a review of what develop adds to main on release day, then a release note and a tag for each release."
          category="Governance"
          decided
          menus={<PlaceholderMenus stage={false} />}
        />
      </div>
    ),
  },
  {
    title: "Click and keyboard",
    description: "A click on the card (except on the menus) or Enter on the focused card opens the ticket.",
    render: () => <OpenDemo />,
  },
  {
    title: "Board column",
    description: "Cards stacked 16px apart, full width of their column, ordered by priority.",
    render: () => (
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-16)", maxWidth: "360px" }}>
        <li>
          <TicketCard ticketId="B021" title="Select" description="Choice in a list." category="Components" decided menus={<PlaceholderMenus />} />
        </li>
        <li>
          <TicketCard ticketId="B115" title="TicketCard" description="A design system component for the card of a backlog ticket." category="Components" decided menus={<PlaceholderMenus />} />
        </li>
        <li>
          <TicketCard ticketId="B059" title="Tag" category="Components" decided menus={<PlaceholderMenus />} />
        </li>
      </ul>
    ),
  },
];
