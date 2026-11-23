// Playground tab of the documentation site: the component live, with a control per prop.
import { definePlayground, jsx } from "../../docs/src/playground";
import { Divider } from "./Divider";

export const playground = definePlayground({
  controls: {
    orientation: {
      type: "select",
      options: ["horizontal", "vertical"],
      default: "horizontal",
      description: "Direction of the line: horizontal separates stacked parts, vertical separates parts side by side.",
    },
  },
  render: ({ orientation }) =>
    orientation === "vertical" ? (
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-16)", height: "var(--space-32)" }}>
        <span>Brand</span>
        <Divider orientation="vertical" />
        <span>Search</span>
      </div>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)", width: "var(--size-dialog-small)", maxWidth: "100%" }}>
        <span>Account</span>
        <Divider />
        <span>Notifications</span>
      </div>
    ),
  code: ({ orientation }) => jsx("Divider", { orientation: orientation === "horizontal" ? "" : orientation }),
});
