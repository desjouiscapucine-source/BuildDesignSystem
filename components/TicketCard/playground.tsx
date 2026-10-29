// Playground tab of the documentation site: the component live, with a control per prop.
// The menus are native selects (placeholder) until the Select component (B021) is coded.
import { code, definePlayground, jsx } from "../../docs/src/playground";
import { PlaceholderMenus } from "./examples/PlaceholderMenus";
import { TicketCard } from "./TicketCard";

export const playground = definePlayground({
  controls: {
    ticketId: { type: "text", default: "B115", description: "ID of the ticket (e.g. B115), on the right of the tags row." },
    title: { type: "text", default: "TicketCard", description: "Title of the ticket: a short noun phrase, sentence case, no period. Shown in full." },
    description: {
      type: "text",
      default: "A design system component for the card of a backlog ticket.",
      description: "Goal of the ticket: one sentence ending with a period. Shown in full; no row when empty.",
    },
    category: { type: "text", default: "Components", description: "Category of the ticket (e.g. Components): a neutral Tag." },
    decided: { type: "boolean", default: true, description: "True when the ticket's origin is decided: shows the \"Decided\" Tag." },
    headingLevel: {
      type: "select",
      options: ["2", "3", "4", "5", "6"],
      default: "3",
      description: "Level of the title heading (h3 by default: under the h2 of a board column); the look does not change.",
    },
  },
  render: ({ ticketId, title, description, category, decided, headingLevel }) => (
    <div style={{ maxWidth: "360px" }}>
      <TicketCard
        ticketId={ticketId}
        title={title}
        description={description}
        category={category}
        decided={decided}
        headingLevel={Number(headingLevel) as 3}
        menus={<PlaceholderMenus stage={category === "Components"} />}
      />
    </div>
  ),
  code: ({ ticketId, title, description, category, decided, headingLevel }) =>
    jsx("TicketCard", {
      ticketId,
      title,
      description,
      category,
      decided,
      headingLevel: headingLevel === "3" ? "" : code(headingLevel),
      menus: code("menus"),
    }),
});
