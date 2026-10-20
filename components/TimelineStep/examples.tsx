// Live examples shown in the Examples tab of the documentation site.
// A step is always used in a Timeline: here the steps are shown in a list at the timeline width.
import type { ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { TimelineStep } from "./TimelineStep";

function List({ children }: { children: ReactNode }) {
  return <div style={{ width: "100%", maxWidth: "var(--size-timeline)" }}>{children}</div>;
}

export const examples: Example[] = [
  {
    title: "Steps",
    description: "Three steps; the second one is selected. The last step has no line.",
    render: () => (
      <List>
        <TimelineStep title="Order placed" startDate={new Date(2026, 9, 12)} endDate={new Date(2026, 9, 13)} href="#placed">
          Payment received.
        </TimelineStep>
        <TimelineStep title="Order shipped" startDate={new Date(2026, 9, 14)} endDate={new Date(2026, 9, 16)} href="#shipped" selected>
          The parcel left the warehouse.
        </TimelineStep>
        <TimelineStep title="Delivered" startDate={new Date(2026, 9, 16)} endDate={new Date(2026, 10, 2)} href="#delivered">
          Signed by the customer.
        </TimelineStep>
      </List>
    ),
  },
  {
    title: "Content",
    description: "A 60-character title (wraps, the date range stays on the right) and a 150-character description.",
    render: () => (
      <List>
        <TimelineStep
          title="Parcel handed over to the carrier for the final delivery"
          startDate={new Date(2026, 9, 14)}
          endDate={new Date(2026, 9, 16)}
          href="#carrier"
        >
          The parcel left our warehouse in Lyon and was handed over to the carrier, who will deliver it to the address given
          in the order.
        </TimelineStep>
      </List>
    ),
  },
];
