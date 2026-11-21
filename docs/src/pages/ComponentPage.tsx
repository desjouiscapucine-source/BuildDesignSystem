import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Button, Tag } from "@ds/components";
import type { ComponentDoc } from "../types";
import { Markdown } from "../Markdown";
import { StageBadge } from "../StageBadge";
import { DesignPreview } from "../DesignPreview";
import { PlaygroundTab } from "../PlaygroundTab";
import { playgrounds } from "../playgrounds";

type Tab = "playground" | "preview" | "spec" | "guidelines" | "examples" | "code" | "changelog";

const tabs: { id: Tab; label: string }[] = [
  { id: "playground", label: "Playground" },
  { id: "preview", label: "Design preview" },
  { id: "spec", label: "Design spec" },
  { id: "guidelines", label: "Guidelines" },
  { id: "examples", label: "Examples" },
  { id: "code", label: "Code" },
  { id: "changelog", label: "Changelog" },
];

export function ComponentPage({ component }: { component: ComponentDoc }) {
  // Once coded, the Playground (the React component live) is shown; it replaces the Design preview once the
  // component is complete. During the Code stage, both are shown, to check the code against the design (B111).
  const coded = component.status === "code" || component.status === "complete";
  const hasPreview = component.status !== "complete" && Boolean(component.design);
  const [tab, setTab] = useState<Tab>(coded ? "playground" : hasPreview ? "preview" : "spec");
  const hasGuidelines = component.level !== "template" && component.level !== "page";
  const shown = (id: Tab) =>
    (hasGuidelines || id !== "guidelines") && (hasPreview || id !== "preview") && (coded || id !== "playground");
  const visibleTabs = tabs.filter(({ id }) => shown(id));

  // WAI-ARIA tabs pattern (B125), until the Tabs component replaces it (B093): roving tabindex,
  // Left / Right move and select (wrapping), Home / End go to the first / last tab.
  const baseId = useId();
  const tabId = (id: Tab) => `${baseId}-tab-${id}`;
  const panelId = `${baseId}-panel`;
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
  // The tab row scrolls sideways on small screens (B163): the selected tab is scrolled into view (instant, no animation).
  const select = (id: Tab) => {
    setTab(id);
    tabRefs.current[id]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };
  const onTabKeyDown = (event: KeyboardEvent) => {
    const index = Math.max(0, visibleTabs.findIndex(({ id }) => id === tab));
    const last = visibleTabs.length - 1;
    const target: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in target)) return;
    event.preventDefault();
    const next = visibleTabs[target[event.key]].id;
    tabRefs.current[next]?.focus();
    select(next);
  };

  return (
    <>
      <div className="component-title">
        <h1 title={component.name}>{component.name}</h1>
        <span className="version-badge" aria-label={`Version ${component.version}`}>
          {component.version}
        </span>
      </div>
      <p className="lead" title={component.description}>
        {component.description}
      </p>
      {/* Atomic Design level: brand Tag (highlighted category), sentence case (Tag has no text-transform) */}
      <p className="component-level">
        <Tag tone="brand">{component.level.charAt(0).toUpperCase() + component.level.slice(1)}</Tag>
      </p>
      <StageBadge status={component.status} level={component.level} />

      <div className="tabs" role="tablist" aria-label="Component documentation" onKeyDown={onTabKeyDown}>
        {visibleTabs.map(({ id, label }) => (
          <button
            key={id}
            ref={(element) => {
              tabRefs.current[id] = element;
            }}
            id={tabId(id)}
            role="tab"
            aria-selected={tab === id}
            aria-controls={panelId}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => select(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={tabId(tab)}>
        {tab === "playground" && <PlaygroundTab component={component} playground={playgrounds[component.slug]} />}
        {tab === "preview" && component.design && <DesignPreview component={component} />}
        {tab === "spec" &&
          (component.spec ? <Markdown source={component.spec} /> : <p className="empty">No design spec yet.</p>)}
        {tab === "guidelines" &&
          (component.guidelines ? (
            <Markdown source={component.guidelines} />
          ) : (
            <p className="empty">No guidelines yet.</p>
          ))}
        {tab === "code" && <CodeTab component={component} />}
        {tab === "changelog" &&
          (component.changelog.length === 0 ? (
            <p className="empty">No version yet.</p>
          ) : (
            <table className="tokens">
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Date</th>
                  <th>Changes</th>
                </tr>
              </thead>
              <tbody>
                {component.changelog.map((entry) => (
                  <tr key={entry.version}>
                    <td>{entry.version}</td>
                    <td>{entry.date}</td>
                    <td>{entry.changes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        {tab === "examples" &&
          (component.examples.length === 0 ? (
            <p className="empty">No coded examples yet.</p>
          ) : (
            component.examples.map((example) => (
              <section key={example.title} className="example">
                <h3>{example.title}</h3>
                {example.description && <p>{example.description}</p>}
                <div className="example-canvas">{example.render()}</div>
              </section>
            ))
          ))}
      </div>
    </>
  );
}

function CodeTab({ component }: { component: ComponentDoc }) {
  const files = Object.entries(component.code);
  const [copied, setCopied] = useState<string | null>(null);
  if (files.length === 0) return <p className="empty">Not coded yet.</p>;

  const copy = async (name: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(name);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  const usage = `import { ${component.folder} } from "@ds/components";`;
  return (
    <>
      <h3>Import</h3>
      <div className="code-file">
        <Button variant="tertiary" className="code-copy" icon={copied === "import" ? "check" : "content_copy"} onClick={() => copy("import", usage)}>
          {copied === "import" ? "Copied" : "Copy"}
        </Button>
        <pre className="code">{usage}</pre>
      </div>
      {files.map(([name, content]) => (
        <section key={name}>
          <h3>
            <code>{name}</code>
          </h3>
          <div className="code-file">
            <Button variant="tertiary" className="code-copy" icon={copied === name ? "check" : "content_copy"} onClick={() => copy(name, content)}>
              {copied === name ? "Copied" : "Copy"}
            </Button>
            <pre className="code">{content}</pre>
          </div>
        </section>
      ))}
    </>
  );
}
