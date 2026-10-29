// Canvas of the Playground tab: a page of its own, shown in an iframe at the chosen screen width,
// so media queries and window sizes are the real ones (like Storybook).
// The component page sends the values of the controls; the canvas sends back its height.
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../../tokens/fonts.css";
import "../../tokens/tokens.css";
import "../../tokens/icons.css";
import "../../tokens/grid.css";
import "./docs.css";
import { playgrounds } from "./playgrounds";
import type { PlaygroundArgs, PlaygroundMessage } from "./playground";

const slug = new URLSearchParams(location.search).get("component") ?? "";
const playground = playgrounds[slug];
const post = (message: PlaygroundMessage) => parent.postMessage(message, location.origin);

// Tokens tried in the Tokens section: set on the root of the canvas only, never saved.
let tried: string[] = [];
function applyTokens(vars: Record<string, string>) {
  const root = document.documentElement.style;
  for (const name of tried) root.removeProperty(name);
  for (const [name, value] of Object.entries(vars)) root.setProperty(name, value);
  tried = Object.keys(vars);
}

function Canvas() {
  const [args, setArgs] = useState<PlaygroundArgs | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent<PlaygroundMessage>) => {
      if (event.origin !== location.origin || event.source !== parent) return;
      if (event.data.type === "playground-args") setArgs(event.data.args);
      if (event.data.type === "playground-tokens") applyTokens(event.data.vars);
    };
    window.addEventListener("message", onMessage);
    post({ type: "playground-ready" });
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => post({ type: "playground-height", height: document.body.scrollHeight }));
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  if (!playground) return <p className="empty">No playground for “{slug}”.</p>;
  return args ? <>{playground.render(args)}</> : null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Canvas />
  </StrictMode>,
);
