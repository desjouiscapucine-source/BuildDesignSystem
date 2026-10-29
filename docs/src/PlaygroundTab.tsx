// Playground tab (B111): the coded component live, like Storybook. Shown from the Code stage; replaces the
// Design preview tab once the component is complete.
// The canvas is an iframe (docs/playground.html) at the chosen screen width; the controls, the tokens and the JSX code are here.
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Chip } from "@ds/components";
import { tokens, textStyles, type Token } from "../../tokens/lib";
import { IconSelect } from "./IconSelect";
import type { ComponentDoc } from "./types";
import {
  defaultArgs,
  type Playground as PlaygroundDef,
  type PlaygroundArgs,
  type PlaygroundControl,
  type PlaygroundMessage,
} from "./playground";

// Screen widths of the canvas: mobile, --breakpoint-tablet, --breakpoint-desktop.
const viewports = [
  { id: "mobile", label: "Mobile", width: 375 },
  { id: "tablet", label: "Tablet", width: 768 },
  { id: "desktop", label: "Desktop", width: 1024 },
] as const;
type Viewport = (typeof viewports)[number]["id"];

const MIN_HEIGHT = 120;

// ---------- Tokens section: the tokens used in the component's CSS, each replaceable by another of its family ----------

const TEXT_STYLE_PROPS = ["family", "size", "weight", "line-height"] as const;
const tokenByVar = new Map(tokens.map((token) => [token.cssVar, token]));
const familyOf = (token: Token) => token.path.slice(0, -1).join(".");

type TokenRow =
  /** A token used in the CSS; options: the semantic tokens of its family (shadows: every shadow, no semantic ones yet). */
  | { key: string; kind: "token"; token: Token; options: Token[] }
  /** A text style used in the CSS (its four properties); options: every text style. */
  | { key: string; kind: "text-style"; name: string };

function tokenRows(component: ComponentDoc): TokenRow[] {
  const css = Object.entries(component.code)
    .filter(([name]) => name.endsWith(".css"))
    .map(([, content]) => content)
    .join("\n");
  const used = [...new Set([...css.matchAll(/var\((--[a-z0-9-]+)/g)].map((match) => match[1]))];
  const rows: TokenRow[] = [];
  for (const style of textStyles) {
    if (TEXT_STYLE_PROPS.some((prop) => used.includes(`--typography-${style.name}-${prop}`)))
      rows.push({ key: `text-style:${style.name}`, kind: "text-style", name: style.name });
  }
  for (const name of used) {
    const token = tokenByVar.get(name);
    if (!token || token.path[0] === "typography") continue;
    const options = tokens.filter(
      (option) => familyOf(option) === familyOf(token) && (option.tier === "semantic" || token.path[0] === "shadow"),
    );
    rows.push({ key: token.cssVar, kind: "token", token, options });
  }
  return rows.sort((a, b) => a.key.localeCompare(b.key));
}

/** CSS custom properties to set in the canvas for the tokens tried (row key → chosen token id or text style name). */
function tokenVars(rows: TokenRow[], tried: Record<string, string>): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const row of rows) {
    const choice = tried[row.key];
    if (!choice) continue;
    if (row.kind === "text-style") {
      for (const prop of TEXT_STYLE_PROPS) vars[`--typography-${row.name}-${prop}`] = `var(--typography-${choice}-${prop})`;
    } else {
      const option = row.options.find((entry) => entry.id === choice);
      if (option) vars[row.token.cssVar] = `var(${option.cssVar})`;
    }
  }
  return vars;
}

export function PlaygroundTab({ component, playground }: { component: ComponentDoc; playground?: PlaygroundDef }) {
  if (!playground) return <p className="empty">No playground yet: add components/{component.folder}/playground.tsx.</p>;
  return <PlaygroundView component={component} playground={playground} />;
}

function PlaygroundView({ component, playground }: { component: ComponentDoc; playground: PlaygroundDef }) {
  const slug = component.slug;
  const [args, setArgs] = useState<PlaygroundArgs>(() => defaultArgs(playground.controls));
  const rows = useMemo(() => tokenRows(component), [component]);
  const [tried, setTried] = useState<Record<string, string>>({});
  const vars = useMemo(() => tokenVars(rows, tried), [rows, tried]);
  const varsRef = useRef(vars);
  varsRef.current = vars;
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [height, setHeight] = useState(MIN_HEIGHT);
  const [available, setAvailable] = useState(0);
  const [copied, setCopied] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const argsRef = useRef(args);
  argsRef.current = args;

  const post = (message: PlaygroundMessage) => frame.current?.contentWindow?.postMessage(message, location.origin);
  const send = (values: PlaygroundArgs) => post({ type: "playground-args", args: values });

  // Messages from the canvas: ready (send the values and the tokens), height (resize the iframe).
  useEffect(() => {
    const onMessage = (event: MessageEvent<PlaygroundMessage>) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data.type === "playground-ready") {
        send(argsRef.current);
        post({ type: "playground-tokens", vars: varsRef.current });
      }
      if (event.data.type === "playground-height") setHeight(event.data.height);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => send(args), [args]);
  useEffect(() => post({ type: "playground-tokens", vars }), [vars]);

  // Width available for the canvas: a wider screen is shown scaled down, like a browser's responsive mode.
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setAvailable(entry.contentRect.width));
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);

  const width = viewports.find((entry) => entry.id === viewport)!.width;
  const scale = available > 0 ? Math.min(1, available / width) : 1;
  const frameHeight = Math.max(height, playground.minHeight ?? MIN_HEIGHT);
  const source = playground.code(args);

  const set = (name: string, value: PlaygroundArgs[string]) => setArgs({ ...args, [name]: value });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="playground">
      <div className="playground-toolbar">
        <div className="playground-viewports" role="group" aria-label="Screen size">
          {viewports.map((entry) => (
            <Chip key={entry.id} selected={viewport === entry.id} onClick={() => setViewport(entry.id)}>
              {entry.label}
            </Chip>
          ))}
        </div>
        <p className="playground-size">
          {width}px{scale < 1 && ` · shown at ${Math.round(scale * 100)}%`}
        </p>
        <Button
          variant="tertiary"
          icon="restart_alt"
          onClick={() => {
            setArgs(defaultArgs(playground.controls));
            setTried({});
          }}
        >
          Reset
        </Button>
      </div>

      <div className="playground-stage" ref={stage} style={{ height: frameHeight * scale }}>
        <iframe
          ref={frame}
          className="playground-canvas"
          title="Playground canvas"
          src={`${import.meta.env.BASE_URL}docs/playground.html?component=${slug}`}
          style={{ width, height: frameHeight, transform: `scale(${scale})` }}
        />
      </div>

      <h3>Controls</h3>
      <table className="tokens playground-controls">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Description</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(playground.controls).map(([name, control]) => (
            <tr key={name}>
              <td>
                <code>{name}</code>
              </td>
              <td>{control.description}</td>
              <td>
                <ControlInput name={name} control={control} value={args[name]} onChange={(value) => set(name, value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > 0 && (
        <>
          <h3>Tokens</h3>
          <p className="playground-note">
            The tokens of the component's CSS. Try another one in the canvas: nothing is saved — to change the component, ask in the chat.
          </p>
          <table className="tokens playground-controls">
            <thead>
              <tr>
                <th>Token in the code</th>
                <th>Try another</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const current = row.kind === "token" ? row.token.id : row.name;
                const value = tried[row.key] ?? current;
                return (
                  <tr key={row.key} className={value !== current ? "playground-changed" : undefined}>
                    <td>
                      <code>{row.kind === "token" ? row.token.cssVar : `text style ${row.name}`}</code>
                    </td>
                    <td>
                      <select
                        className="playground-input"
                        aria-label={`Token tried for ${row.kind === "token" ? row.token.cssVar : `text style ${row.name}`}`}
                        value={value}
                        onChange={(event) => {
                          const { [row.key]: _, ...rest } = tried;
                          setTried(event.target.value === current ? rest : { ...rest, [row.key]: event.target.value });
                        }}
                      >
                        {row.kind === "token"
                          ? row.options.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.cssVar}
                              </option>
                            ))
                          : textStyles.map((style) => (
                              <option key={style.name} value={style.name}>
                                {style.name}
                              </option>
                            ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Button variant="tertiary" icon="restart_alt" onClick={() => setTried({})} disabled={Object.keys(tried).length === 0}>
            Reset tokens
          </Button>
        </>
      )}

      <h3>Code</h3>
      <div className="code-file">
        <pre className="code">{source}</pre>
        <button className="code-copy" onClick={copy}>
          <span className="ds-icon" aria-hidden="true">{copied ? "check" : "content_copy"}</span>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

    </div>
  );
}

function ControlInput({
  name,
  control,
  value,
  onChange,
}: {
  name: string;
  control: PlaygroundControl;
  value: PlaygroundArgs[string];
  onChange: (value: PlaygroundArgs[string]) => void;
}) {
  const label = `Value of ${name}`;
  switch (control.type) {
    case "boolean":
      return (
        <input type="checkbox" className="playground-checkbox" aria-label={label} checked={value as boolean} onChange={(event) => onChange(event.target.checked)} />
      );
    case "select":
      return (
        <select className="playground-input" aria-label={label} value={value as string} onChange={(event) => onChange(event.target.value)}>
          {control.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      );
    case "icon":
      return <IconSelect label={label} value={value as string} optional={control.optional} onChange={onChange} />;
    case "number":
      return (
        <input
          type="number"
          className="playground-input"
          aria-label={label}
          min={control.min}
          max={control.max}
          value={value as number}
          onChange={(event) => onChange(Math.min(control.max, Math.max(control.min, Number(event.target.value))))}
        />
      );
    default:
      return (
        <input
          type={control.type === "date" ? "date" : "text"}
          className="playground-input"
          aria-label={label}
          value={value as string}
          onChange={(event) => onChange(event.target.value)}
        />
      );
  }
}
