import { tokens, tokenById } from "../../../tokens/lib";

const gridTokens = [...tokens.filter((token) => token.path[0] === "grid"), tokenById.get("size.content")!];
const screens = [
  { name: "Mobile", range: "below 768px", columns: "grid.columns.mobile" },
  { name: "Tablet", range: "768px and above", columns: "grid.columns.tablet" },
  { name: "Desktop", range: "1024px and above", columns: "grid.columns.desktop" },
];

export function GridPage() {
  return (
    <>
      <h1>Grid</h1>
      <p className="lead">Columns, gutters and margins for every screen size</p>
      <p>
        Mobile first: 4 columns, 8 from tablet, 12 from desktop. Defined in <code>tokens/semantic.json</code>; classes in{" "}
        <code>tokens/grid.css</code>.
      </p>

      <h2>Columns by screen</h2>
      <table className="tokens">
        <thead>
          <tr>
            <th>Screen</th>
            <th>Width</th>
            <th>Columns</th>
            <th>Gutter</th>
            <th>Side margin</th>
          </tr>
        </thead>
        <tbody>
          {screens.map((screen) => (
            <tr key={screen.name}>
              <td>{screen.name}</td>
              <td>{screen.range}</td>
              <td>{tokenById.get(screen.columns)!.resolved}</td>
              <td>{tokenById.get("grid.gutter")!.resolved}</td>
              <td>{tokenById.get("grid.margin")!.resolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Maximum width: <code>--size-content</code> ({tokenById.get("size.content")!.resolved}, margins included). Beyond
        that, the grid stays centered.
      </p>

      <h2>Usage</h2>
      <pre className="code">{`<div class="ds-grid">
  <div class="ds-grid-span-8">Main content</div>
  <div class="ds-grid-span-4">Side content</div>
</div>`}</pre>
      <p>
        <code>.ds-grid</code> goes on the container; <code>.ds-grid-span-1</code> to <code>.ds-grid-span-12</code> set the
        width of an item, in columns (1 column by default). A span wider than the current number of columns takes the
        full width: <code>.ds-grid-span-6</code> fills the 4 columns on mobile.
      </p>

      <h2>Demo</h2>
      <p>Resize the window to see the columns change.</p>
      <div className="ds-grid grid-demo">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} className="ds-grid-span-1 grid-demo-column">
            {index + 1}
          </span>
        ))}
        <span className="ds-grid-span-6 grid-demo-column">span 6</span>
        <span className="ds-grid-span-6 grid-demo-column">span 6</span>
        <span className="ds-grid-span-4 grid-demo-column">span 4</span>
        <span className="ds-grid-span-8 grid-demo-column">span 8</span>
        <span className="ds-grid-span-12 grid-demo-column">span 12</span>
      </div>

      <h2>Tokens</h2>
      <table className="tokens">
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {gridTokens.map((token) => (
            <tr key={token.id}>
              <td>
                <code>{token.cssVar}</code>
              </td>
              <td>
                <code>{token.value}</code>
                {token.value !== token.resolved && <div className="resolved">{token.resolved}</div>}
              </td>
              <td>{token.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
