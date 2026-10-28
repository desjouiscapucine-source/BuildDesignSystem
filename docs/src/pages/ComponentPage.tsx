import { useState } from "react";
import type { ComponentDoc } from "../types";
import { Markdown } from "../Markdown";
import { StageBadge } from "../StageBadge";
import { DesignPreview } from "../DesignPreview";


type Tab = "preview" | "spec" | "guidelines" | "examples" | "code" | "changelog";

const tabs: { id: Tab; label: string }[] = [
  { id: "preview", label: "Design preview" },
  { id: "spec", label: "Design spec" },
  { id: "guidelines", label: "Guidelines" },
  { id: "examples", label: "Examples" },
  { id: "code", label: "Code" },
  { id: "changelog", label: "Changelog" },
];

export function ComponentPage({ component }: { component: ComponentDoc }) {
  const [tab, setTab] = useState<Tab>(component.design ? "preview" : "spec");
  const hasGuidelines = component.level !== "template" && component.level !== "page";

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
      <p className="level-tag">{component.level}</p>
      <StageBadge status={component.status} level={component.level} />

      <div className="tabs" role="tablist">
        {tabs.filter(({ id }) => (hasGuidelines || id !== "guidelines") && (component.design || id !== "preview")).map(({ id, label }) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
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
        <pre className="code">{usage}</pre>
        <button className="code-copy" onClick={() => copy("import", usage)}>
          <span className="ds-icon" aria-hidden="true">{copied === "import" ? "check" : "content_copy"}</span>
          {copied === "import" ? "Copied" : "Copy"}
        </button>
      </div>
      {files.map(([name, content]) => (
        <section key={name}>
          <h3>
            <code>{name}</code>
          </h3>
          <div className="code-file">
            <pre className="code">{content}</pre>
            <button className="code-copy" onClick={() => copy(name, content)}>
              <span className="ds-icon" aria-hidden="true">{copied === name ? "check" : "content_copy"}</span>
              {copied === name ? "Copied" : "Copy"}
            </button>
          </div>
        </section>
      ))}
    </>
  );
}
