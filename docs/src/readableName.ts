// Readable labels for code names shown in the site's Selects (B123): slots, props, prop values, text styles, tokens.
// Rule (Design System Lead): no "--" prefix, no token category (kept when the rest is only a number), dashes, dots (and camelCase) become spaces,
// sentence case (capital letter at the start only). Only the label changes: option values stay the real ids.
import type { Token } from "../../tokens/lib";

/** `container.background` → "Container background", `headingLevel` → "Heading level", `primary` → "Primary". */
export function readableName(name: string): string {
  const words = name
    .replace(/^--/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[-.\s]+/)
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** A token without its category (top-level group): `--color-background-brand-subtle` → "Background brand subtle".
 *  When the rest is only a number, the category stays: `--space-16` → "Space 16", `--border-width-2` → "Border width 2". */
export const readableToken = (token: Token): string => {
  const rest = token.path.slice(1);
  return readableName((rest.every((part) => /^\d+$/.test(part)) ? token.path : rest).join("."));
};
