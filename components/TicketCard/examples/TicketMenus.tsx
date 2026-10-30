// The menus of a ticket, for the examples and the playground: one Select each (B021).
// On the Backlog page, the page gives its own Selects (saved at once).
import { useState } from "react";
import { Select } from "../../Select/Select";

const menus = {
  Status: ["To do", "In progress", "Done", "Rejected"],
  Priority: ["None", "High", "Medium", "Low"],
  Release: ["None", "R1", "R2"],
  Stage: ["Design", "Guidelines", "Code"],
} as const;

type Menu = keyof typeof menus;

export function TicketMenus({ stage = true }: { stage?: boolean }) {
  const [values, setValues] = useState<Record<Menu, string>>({ Status: "To do", Priority: "None", Release: "None", Stage: "Design" });
  const names = (Object.keys(menus) as Menu[]).filter((name) => stage || name !== "Stage");
  return (
    <>
      {names.map((name) => (
        <Select
          key={name}
          label={name}
          options={menus[name].map((option) => ({ value: option, label: option }))}
          value={values[name]}
          onChange={(value) => setValues((current) => ({ ...current, [name]: value }))}
        />
      ))}
    </>
  );
}
