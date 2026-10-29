// Playground tab of the documentation site: the timeline live, with a control per prop.
// Below desktop, the timeline is replaced by an open button: try the Tablet and Mobile sizes.
import { code, definePlayground, jsx } from "../../docs/src/playground";
import { TimelineStep } from "../TimelineStep/TimelineStep";
import { Timeline } from "./Timeline";

const steps = [
  { title: "Order placed", start: [2026, 9, 12], end: [2026, 9, 13], href: "#placed", text: "Payment received." },
  { title: "Order shipped", start: [2026, 9, 14], end: [2026, 9, 16], href: "#shipped", text: "The parcel left the warehouse." },
  { title: "Delivered", start: [2026, 9, 16], end: [2026, 10, 2], href: "#delivered", text: "Signed by the customer." },
] as const;

const date = ([year, month, day]: readonly [number, number, number]) => new Date(year, month, day);

export const playground = definePlayground({
  controls: {
    label: { type: "text", default: "Order history", description: "Name of the timeline announced to screen readers. Default: Timeline." },
    selected: {
      type: "select",
      options: ["None", ...steps.map((step) => step.title)],
      default: "Order shipped",
      description: "The TimelineStep of the section currently shown (selected prop of the step).",
    },
  },
  // Room for the panel that opens below desktop.
  minHeight: 480,
  render: ({ label, selected }) => (
    <Timeline label={label}>
      {steps.map((step) => (
        <TimelineStep
          key={step.title}
          title={step.title}
          startDate={date(step.start)}
          endDate={date(step.end)}
          href={step.href}
          selected={step.title === selected}
        >
          {step.text}
        </TimelineStep>
      ))}
    </Timeline>
  ),
  code: ({ label, selected }) =>
    jsx(
      "Timeline",
      { label },
      steps.map((step) =>
        jsx(
          "TimelineStep",
          {
            title: step.title,
            startDate: code(`new Date(${step.start.join(", ")})`),
            endDate: code(`new Date(${step.end.join(", ")})`),
            href: step.href,
            selected: step.title === selected,
          },
          step.text,
        ),
      ),
    ),
});
