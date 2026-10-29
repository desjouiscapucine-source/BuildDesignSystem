// Playground tab of the documentation site: the timeline step live, with a control per prop.
// A step is always used in a Timeline: here it is shown alone, at the timeline width.
import { code, definePlayground, jsx } from "../../docs/src/playground";
import { TimelineStep } from "./TimelineStep";

const date = (iso: string) => new Date(`${iso}T00:00:00`);
const dateCode = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return code(`new Date(${year}, ${month - 1}, ${day})`);
};

export const playground = definePlayground({
  controls: {
    title: { type: "text", default: "Order shipped", description: "Name of the event or stage: sentence case, 60 characters maximum." },
    children: {
      type: "text",
      default: "The parcel left the warehouse.",
      description: "The description: one or two sentences, 150 characters maximum.",
    },
    startDate: { type: "date", default: "2026-10-14", description: "Start of the date range (always a range)." },
    endDate: { type: "date", default: "2026-10-16", description: "End of the date range." },
    href: { type: "text", default: "#shipped", description: "Anchor of the section of the same page the step leads to." },
    selected: { type: "boolean", default: false, description: "The step of the section currently shown. Only one per timeline." },
  },
  render: ({ title, children, startDate, endDate, href, selected }) => (
    <div style={{ maxWidth: "var(--size-timeline)" }}>
      <TimelineStep title={title} startDate={date(startDate)} endDate={date(endDate)} href={href} selected={selected}>
        {children}
      </TimelineStep>
    </div>
  ),
  code: ({ title, children, startDate, endDate, href, selected }) =>
    jsx("TimelineStep", { title, startDate: dateCode(startDate), endDate: dateCode(endDate), href, selected }, children),
});
