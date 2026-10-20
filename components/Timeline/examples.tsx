// Live examples shown in the Examples tab of the documentation site.
import type { Example } from "../../docs/src/types";
import { TimelineStep } from "../TimelineStep/TimelineStep";
import { Timeline } from "./Timeline";

export const examples: Example[] = [
  {
    title: "Order history",
    description: "Steps in chronological order, the second one selected. Named \"Order history\" for screen readers.",
    render: () => (
      <Timeline label="Order history">
        <TimelineStep title="Order placed" startDate={new Date(2026, 9, 12)} endDate={new Date(2026, 9, 13)} href="#placed">
          Payment received.
        </TimelineStep>
        <TimelineStep title="Order shipped" startDate={new Date(2026, 9, 14)} endDate={new Date(2026, 9, 16)} href="#shipped" selected>
          The parcel left the warehouse.
        </TimelineStep>
        <TimelineStep title="Delivered" startDate={new Date(2026, 9, 16)} endDate={new Date(2026, 10, 2)} href="#delivered">
          Signed by the customer.
        </TimelineStep>
      </Timeline>
    ),
  },
  {
    title: "Minimum",
    description: "Two steps: the minimum for a timeline.",
    render: () => (
      <Timeline>
        <TimelineStep title="Project kick-off" startDate={new Date(2026, 0, 5)} endDate={new Date(2026, 0, 9)} href="#kickoff" selected>
          Team and scope defined.
        </TimelineStep>
        <TimelineStep title="First release" startDate={new Date(2026, 2, 2)} endDate={new Date(2026, 2, 6)} href="#release">
          Version 1.0 delivered to the customers.
        </TimelineStep>
      </Timeline>
    ),
  },
];
