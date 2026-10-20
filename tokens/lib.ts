// Shared token logic, used by the build script (Node) and the documentation site (browser).
import primitives from "./primitives.json" with { type: "json" };
import semantic from "./semantic.json" with { type: "json" };
import contrast from "./contrast-pairs.json" with { type: "json" };

export type Tier = "primitive" | "semantic";

export interface Token {
  path: string[]; // ["color", "text", "primary"]
  id: string; // "color.text.primary"
  cssVar: string; // "--color-text-primary"
  value: string; // as written, may contain {references}
  resolved: string; // final raw value
  type?: string;
  description?: string;
  tier: Tier;
}

type Node = { [key: string]: unknown };

const REF = /\{([^}]+)\}/g;
export const toCssVar = (path: string[]) => `--${path.join("-")}`;

function collect(node: Node, tier: Tier, path: string[] = [], type?: string): Omit<Token, "resolved">[] {
  const currentType = (node.$type as string | undefined) ?? type;
  // A node can have its own $value AND child tokens (e.g. "brand" and "brand.hover").
  const own: Omit<Token, "resolved">[] = [];
  if ("$value" in node) {
    own.push(
      {
        path,
        id: path.join("."),
        cssVar: toCssVar(path),
        value: String(node.$value),
        type: currentType,
        description: node.$description as string | undefined,
        tier,
      },
    );
  }
  return [
    ...own,
    ...Object.entries(node)
      .filter(([key]) => !key.startsWith("$"))
      .flatMap(([key, child]) => collect(child as Node, tier, [...path, key], currentType)),
  ];
}

const raw = [...collect(primitives as Node, "primitive"), ...collect(semantic as Node, "semantic")];
const byId = new Map(raw.map((token) => [token.id, token]));

function resolveValue(value: string, seen: string[] = []): string {
  return value.replace(REF, (_, id: string) => {
    const target = byId.get(id);
    if (!target) throw new Error(`Unknown token reference {${id}}`);
    if (seen.includes(id)) throw new Error(`Circular reference: ${[...seen, id].join(" → ")}`);
    return resolveValue(target.value, [...seen, id]);
  });
}

export const tokens: Token[] = raw.map((token) => ({ ...token, resolved: resolveValue(token.value) }));
export const tokenById = new Map(tokens.map((token) => [token.id, token]));

/** CSS value of a token: references become var(--…) so themes can override primitives later. */
export const toCssValue = (value: string) => value.replace(REF, (_, id: string) => `var(${toCssVar(id.split("."))})`);

// ---------- Typography styles ----------

export interface TextStyle {
  name: string; // "heading-1"
  className: string; // "ds-text-heading-1"
  family: Token;
  size: Token;
  lineHeight: Token;
  weight: Token;
}

export const textStyles: TextStyle[] = Object.keys(((semantic as Node).typography ?? {}) as Node)
  .filter((key) => !key.startsWith("$"))
  .map((name) => {
    const get = (prop: string) => tokenById.get(`typography.${name}.${prop}`)!;
    return {
      name,
      className: `ds-text-${name}`,
      family: get("family"),
      size: get("size"),
      lineHeight: get("line-height"),
      weight: get("weight"),
    };
  });

// ---------- WCAG contrast ----------

function luminance(hex: string): number {
  const channels = hex
    .replace("#", "")
    .match(/../g)!
    .map((c) => parseInt(c, 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function contrastRatio(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

export interface ContrastResult {
  foreground: Token;
  background: Token;
  min: number;
  ratio: number;
  pass: boolean;
}

export const contrastResults: ContrastResult[] = contrast.pairs.map(({ foreground, background, min }) => {
  const fg = tokenById.get(foreground);
  const bg = tokenById.get(background);
  if (!fg || !bg) throw new Error(`Unknown token in contrast-pairs.json: ${!fg ? foreground : background}`);
  const ratio = contrastRatio(fg.resolved, bg.resolved);
  return { foreground: fg, background: bg, min, ratio, pass: ratio >= min };
});
