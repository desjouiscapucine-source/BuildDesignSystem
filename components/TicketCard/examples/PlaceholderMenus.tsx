// Placeholder of the menus, for the examples and the playground only: native selects,
// until the Select component (B021) is coded. Not part of TicketCard.
const menus = {
  Status: ["To do", "In progress", "Done", "Rejected"],
  Priority: ["None", "High", "Medium", "Low"],
  Release: ["None", "R1", "R2"],
  Stage: ["design", "guidelines", "code"],
} as const;

export function PlaceholderMenus({ stage = true }: { stage?: boolean }) {
  const names = (Object.keys(menus) as (keyof typeof menus)[]).filter((name) => stage || name !== "Stage");
  return (
    <>
      {names.map((name) => (
        <select key={name} aria-label={name}>
          {menus[name].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ))}
    </>
  );
}
