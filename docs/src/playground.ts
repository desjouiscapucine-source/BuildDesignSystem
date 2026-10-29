// Playground tab (B111): the coded component shown live, like Storybook — a canvas, controls and the JSX code.
// Each component declares its playground in components/<Name>/playground.tsx with definePlayground().
import type { ReactNode } from "react";

interface ControlBase {
  /** What the prop does, shown in the controls table. */
  description: string;
}

export type PlaygroundControl = ControlBase &
  (
    | { type: "text"; default: string }
    | { type: "boolean"; default: boolean }
    | { type: "select"; options: readonly string[]; default: string }
    | { type: "number"; min: number; max: number; default: number }
    /** A date, as an ISO string (YYYY-MM-DD). */
    | { type: "date"; default: string }
  );

type Controls = Record<string, PlaygroundControl>;

type ValueOf<C extends PlaygroundControl> = C extends { type: "boolean" }
  ? boolean
  : C extends { type: "number" }
    ? number
    : C extends { type: "select"; options: readonly (infer O)[] }
      ? O
      : string;

/** The values of the controls, by prop name. */
export type PlaygroundArgs<C extends Controls = Controls> = { [K in keyof C]: ValueOf<C[K]> };

export interface Playground<C extends Controls = Controls> {
  /** One control per prop, in the order of the table. Keys are the prop names. */
  controls: C;
  /** The component with the values of the controls. */
  render: (args: PlaygroundArgs<C>) => ReactNode;
  /** The JSX code of the component with the values of the controls (use `jsx()`). */
  code: (args: PlaygroundArgs<C>) => string;
  /** Minimum height of the canvas in px, e.g. for a component that opens over the page. */
  minHeight?: number;
}

/** Messages between the component page and the canvas (docs/playground.html). */
export type PlaygroundMessage =
  | { type: "playground-ready" }
  | { type: "playground-height"; height: number }
  | { type: "playground-args"; args: PlaygroundArgs }
  /** Tokens tried in the canvas: CSS custom property → new value (e.g. "var(--radius-16)"). */
  | { type: "playground-tokens"; vars: Record<string, string> };

/** Declares a playground: typed args from the controls. */
export function definePlayground<const C extends Controls>(playground: Playground<C>): Playground {
  return playground as unknown as Playground;
}

export const defaultArgs = (controls: Controls): PlaygroundArgs =>
  Object.fromEntries(Object.entries(controls).map(([name, control]) => [name, control.default]));

/** A prop value written as code, e.g. `code("images")` → `images={images}`. */
export const code = (source: string) => ({ code: source });

type PropValue = string | number | boolean | undefined | null | { code: string };

const MAX_LINE = 80;

function attribute(name: string, value: PropValue): string | null {
  if (value === undefined || value === null || value === false || value === "") return null;
  if (value === true) return name;
  if (typeof value === "string") return `${name}=${JSON.stringify(value)}`;
  if (typeof value === "number") return `${name}={${value}}`;
  return `${name}={${value.code}}`;
}

const indent = (text: string) =>
  text
    .split("\n")
    .map((line) => (line ? `  ${line}` : line))
    .join("\n");

/**
 * JSX code of an element: empty, `false` and `undefined` props are left out, `true` is written alone.
 * `children`: a text, or the code of child elements (one per line).
 */
export function jsx(name: string, props: Record<string, PropValue>, children?: string | string[]): string {
  const attributes = Object.entries(props)
    .map(([key, value]) => attribute(key, value))
    .filter((entry): entry is string => entry !== null);
  const inlineProps = attributes.map((entry) => ` ${entry}`).join("");
  const multiline = `<${name}${inlineProps}>`.length > MAX_LINE || attributes.some((entry) => entry.includes("\n"));
  const propsCode = multiline ? `\n${attributes.map(indent).join("\n")}\n` : inlineProps;

  const kids = Array.isArray(children) ? children : children ? [children] : [];
  if (kids.length === 0) return `<${name}${propsCode}${multiline ? "" : " "}/>`;
  const open = `<${name}${propsCode}>`;
  const close = `</${name}>`;
  const single = Array.isArray(children) ? null : children!;
  if (single !== null && !multiline && !single.includes("\n") && (open + single + close).length <= MAX_LINE)
    return open + single + close;
  return `${open}\n${kids.map(indent).join("\n")}\n${close}`;
}
