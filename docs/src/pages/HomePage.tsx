import { components } from "../registry";
import { StageBadge } from "../StageBadge";

export function HomePage() {
  return (
    <>
      <h1>Documentation</h1>
      <p className="lead">Design tokens, component specs and usage guidelines.</p>

      <h2>Components</h2>
      {components.length === 0 ? (
        <p className="empty">
          No components yet. Copy <code>components/_template/</code> to create the first one.
        </p>
      ) : (
        <ul className="cards">
          {components.map((component) => (
            <li key={component.slug}>
              <a href={`#/components/${component.slug}`}>
                <strong>{component.name}</strong>
                <span>{component.description}</span>
                <StageBadge status={component.status} level={component.level} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
