// Live examples shown in the Examples tab of the documentation site.
import type { Example } from "../../docs/src/types";
import { Timeline } from "../Timeline/Timeline";
import { TimelineStep } from "../TimelineStep/TimelineStep";
import { Card } from "./Card";

export const examples: Example[] = [
  {
    title: "Card",
    render: () => (
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <Card title="Order shipped">The parcel left the warehouse in Lyon and was handed over to the carrier.</Card>
      </div>
    ),
  },
  {
    title: "With a timeline",
    description: "Each step leads to its card (anchor). Same titles, same order, --space-16 between the cards.",
    render: () => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-16)", alignItems: "flex-start", width: "100%" }}>
        <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
          <Card id="card-placed" title="Order placed">
            Payment received. The order was confirmed by email.
          </Card>
          <Card id="card-shipped" title="Order shipped">
            The parcel left the warehouse in Lyon and was handed over to the carrier.
          </Card>
          <Card id="card-delivered" title="Delivered">
            Signed by the customer at the delivery address.
          </Card>
        </div>
        <Timeline label="Order history">
          <TimelineStep title="Order placed" startDate={new Date(2026, 9, 12)} endDate={new Date(2026, 9, 13)} href="#card-placed">
            Payment received.
          </TimelineStep>
          <TimelineStep title="Order shipped" startDate={new Date(2026, 9, 14)} endDate={new Date(2026, 9, 16)} href="#card-shipped" selected>
            The parcel left the warehouse.
          </TimelineStep>
          <TimelineStep title="Delivered" startDate={new Date(2026, 9, 16)} endDate={new Date(2026, 10, 2)} href="#card-delivered">
            Signed by the customer.
          </TimelineStep>
        </Timeline>
      </div>
    ),
  },
  {
    title: "Content",
    description: "A 60-character title and a long text: both wrap, the card grows in height.",
    render: () => (
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <Card title="Parcel handed over to the carrier for the final delivery">
          The parcel left our warehouse in Lyon on Tuesday morning. It was handed over to the carrier, who will deliver it
          to the address given in the order. You will receive an email with the tracking number as soon as the carrier
          scans the parcel. Deliveries take place from Monday to Saturday, between 8 am and 6 pm.
        </Card>
      </div>
    ),
  },
];
