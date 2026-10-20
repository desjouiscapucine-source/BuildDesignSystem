// Compiles tokens/primitives.json + tokens/semantic.json into tokens/tokens.css,
// then checks every pair in tokens/contrast-pairs.json against WCAG 2.2 AA.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { tokens, textStyles, contrastResults, toCssValue } from "../tokens/lib.ts";

const output = resolve(import.meta.dirname, "../tokens/tokens.css");

const declarations = (tier: string) =>
  tokens
    .filter((token) => token.tier === tier)
    .map((token) => `  ${token.cssVar}: ${toCssValue(token.value)};`)
    .join("\n");

const classes = textStyles
  .map(
    (style) =>
      `.${style.className} {\n` +
      `  font-family: var(${style.family.cssVar});\n` +
      `  font-size: var(${style.size.cssVar});\n` +
      `  line-height: var(${style.lineHeight.cssVar});\n` +
      `  font-weight: var(${style.weight.cssVar});\n` +
      `}`,
  )
  .join("\n\n");

const reducedMotion = tokens
  .filter((token) => token.path[0] === "duration")
  .map((token) => `    ${token.cssVar}: 0.01ms;`)
  .join("\n");

writeFileSync(
  output,
  `/* Generated from tokens/*.json — do not edit by hand. Run \`npm run tokens\`. */\n\n` +
    `/* Primitive tokens */\n:root {\n${declarations("primitive")}\n}\n\n` +
    `/* Semantic tokens */\n:root {\n${declarations("semantic")}\n}\n\n` +
    `/* Text styles */\n${classes}\n\n` +
    `/* Reduced motion (WCAG 2.3.3): animations become near-instant */\n` +
    `@media (prefers-reduced-motion: reduce) {\n  :root {\n${reducedMotion}\n  }\n}\n`,
);
console.log(`tokens: ${tokens.length} tokens and ${textStyles.length} text styles written to tokens/tokens.css`);

const failures = contrastResults.filter((result) => !result.pass);
for (const result of failures) {
  console.error(
    `  ✗ ${result.foreground.id} on ${result.background.id}: ${result.ratio.toFixed(2)}:1 (needs ${result.min}:1)`,
  );
}
console.log(`contrast: ${contrastResults.length - failures.length}/${contrastResults.length} pairs pass WCAG 2.2 AA`);
if (failures.length > 0) process.exit(1);

// Breakpoints: CSS cannot use custom properties in media queries, so the values are written
// in @media rules. The only values allowed are those of the breakpoint tokens.
const allowedWidths = new Set(tokens.filter((token) => token.path[0] === "breakpoint").map((token) => token.resolved));
const cssFiles = [
  ...readdirSync(resolve(import.meta.dirname, "../components"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const dir = resolve(import.meta.dirname, "../components", entry.name);
      return readdirSync(dir).filter((file) => file.endsWith(".css")).map((file) => resolve(dir, file));
    }),
  resolve(import.meta.dirname, "../docs/src/docs.css"),
  resolve(import.meta.dirname, "../tokens/grid.css"),
];
const badWidths: string[] = [];
for (const file of cssFiles) {
  for (const media of readFileSync(file, "utf8").match(/@media[^{]*/g) ?? []) {
    for (const width of media.match(/\d+(\.\d+)?px/g) ?? []) {
      if (!allowedWidths.has(width)) badWidths.push(`${file.split("/").slice(-2).join("/")}: ${media.trim()}`);
    }
  }
}
for (const bad of badWidths) console.error(`  ✗ media query not using a breakpoint token value — ${bad}`);
console.log(`breakpoints: ${badWidths.length === 0 ? "all media queries use breakpoint values" : `${badWidths.length} media queries to fix`}`);
if (badWidths.length > 0) process.exit(1);
