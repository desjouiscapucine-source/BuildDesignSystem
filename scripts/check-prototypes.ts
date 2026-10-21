// Checks the prototypes (every folder of prototypes/, templates and shared folders included):
// 1. components are imported only from "@ds/components" (never from components/ directly);
// 2. styles use design tokens only: no raw color or length in CSS files nor in inline `style={{…}}`.
// Fails (exit code 1) with the list of problems.
import { readdirSync, readFileSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const prototypes = resolve(root, "prototypes");
const componentsDir = resolve(root, "components");

// Raw values: hex colors, rgb()/hsl() colors, lengths with a unit (0 alone is allowed).
const rawValue = /#[0-9a-fA-F]{3,8}\b|\b(rgb|rgba|hsl|hsla)\(|(?<![\w-])\d*\.?\d+(px|rem|em|vh|vw|pt)\b/;
// Inline style values that are bare numbers (React turns most into px), except 0 and unitless flex values.
const unitless = new Set(["flex", "flexGrow", "flexShrink", "order"]);

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(dir, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

const problems: string[] = [];
const report = (file: string, line: number, message: string) =>
  problems.push(`${relative(root, file)}:${line}  ${message}`);
const lineOf = (source: string, index: number) => source.slice(0, index).split("\n").length;

// Only the prototype folders: the prototypes list page (prototypes/list.tsx) is site code.
const sources = readdirSync(prototypes, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((entry) => files(resolve(prototypes, entry.name)));

for (const file of sources) {
  const source = readFileSync(file, "utf8");

  if (/\.(tsx?|jsx?)$/.test(file)) {
    for (const match of source.matchAll(/(?:import|export)[^"']*?from\s*["']([^"']+)["']|import\s*["']([^"']+)["']/g)) {
      const specifier = match[1] ?? match[2];
      const fromComponents = specifier.startsWith(".") && (resolve(dirname(file), specifier) + sep).startsWith(componentsDir + sep);
      if (fromComponents || specifier.startsWith("@ds/components/")) {
        report(file, lineOf(source, match.index), `import "${specifier}": import components only from "@ds/components"`);
      }
    }
    for (const match of source.matchAll(/style=\{\{([\s\S]*?)\}\}/g)) {
      for (const property of match[1].matchAll(/(\w+)\s*:\s*([^,]+)/g)) {
        const [, key, value] = property;
        const bareNumber = /^-?\d*\.?\d+$/.test(value.trim()) && value.trim() !== "0" && !unitless.has(key);
        if (rawValue.test(value) || bareNumber) {
          report(file, lineOf(source, match.index), `style ${key}: ${value.trim()}: use a design token (var(--…))`);
        }
      }
    }
  }

  if (file.endsWith(".css")) {
    const css = source.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, " "));
    for (const match of css.matchAll(/([\w-]+)\s*:\s*([^;{}]+);/g)) {
      if (rawValue.test(match[2])) {
        report(file, lineOf(css, match.index), `${match[1]}: ${match[2].trim()}: use a design token (var(--…))`);
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`Prototypes check failed (${problems.length}):\n${problems.map((p) => `  ${p}`).join("\n")}`);
  process.exit(1);
}
console.log(`Prototypes check passed (${sources.length} files).`);
