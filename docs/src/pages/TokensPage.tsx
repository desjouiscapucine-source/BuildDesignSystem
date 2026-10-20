import { tokens, textStyles, contrastResults, type Tier, type Token } from "../../../tokens/lib";

function Preview({ token }: { token: Token }) {
  const group = token.path[0];
  if (token.type === "color") return <span className="swatch" style={{ background: `var(${token.cssVar})` }} />;
  if (group === "space") return <span className="bar" style={{ width: `var(${token.cssVar})` }} />;
  if (group === "radius") return <span className="shape" style={{ borderRadius: `var(${token.cssVar})` }} />;
  if (group === "shadow") return <span className="shape" style={{ boxShadow: `var(${token.cssVar})` }} />;
  return null;
}

const zLayers = tokens
  .filter((token) => token.path[0] === "z-index")
  .sort((a, b) => Number(a.resolved) - Number(b.resolved));

function TokenTable({ list }: { list: Token[] }) {
  return (
    <table className="tokens">
      <thead>
        <tr>
          <th>Preview</th>
          <th>Token</th>
          <th>Value</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {list.map((token) => (
          <tr key={token.id}>
            <td>
              <Preview token={token} />
            </td>
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
  );
}

function TierSection({ tier, title, intro }: { tier: Tier; title: string; intro: string }) {
  const list = tokens.filter((token) => token.tier === tier && token.path[0] !== "typography");
  const groups = [...new Set(list.map((token) => token.path[0]))];
  return (
    <section>
      <h2>{title}</h2>
      <p className="lead">{intro}</p>
      {groups.length === 0 && <p className="empty">No tokens defined yet.</p>}
      {groups.map((group) => (
        <div key={group}>
          <h3>{group}</h3>
          <TokenTable list={list.filter((token) => token.path[0] === group)} />
        </div>
      ))}
    </section>
  );
}

export function TokensPage() {
  return (
    <>
      <h1>Design tokens</h1>
      <p className="lead">Primitive and semantic tokens, compiled to CSS custom properties.</p>
      <p>
        Sources of truth: <code>tokens/primitives.json</code> and <code>tokens/semantic.json</code>, compiled to{" "}
        <code>tokens/tokens.css</code>.
      </p>

      <TierSection
        tier="primitive"
        title="Primitive tokens"
        intro="Raw values. Never used directly by components."
      />
      <TierSection
        tier="semantic"
        title="Semantic tokens"
        intro="What a value is used for. Components use these tokens only."
      />

      <section>
        <h2>Text styles</h2>
        <p className="lead">
          Each style is available as a CSS class (<code>.ds-text-…</code>).
        </p>
        {textStyles.length === 0 && <p className="empty">No text styles defined yet.</p>}
        {textStyles.map((style) => (
          <div key={style.name} className="text-style">
            <p className={style.className}>The quick brown fox jumps over the lazy dog</p>
            <code>
              .{style.className} · {style.size.resolved} / {style.lineHeight.resolved} / {style.weight.resolved}
            </code>
          </div>
        ))}
      </section>

      <section>
        <h2>Contrast (WCAG 2.2 AA)</h2>
        {contrastResults.length === 0 ? (
          <p className="empty">
            No color pairs to check yet. Pairs are listed in <code>tokens/contrast-pairs.json</code>.
          </p>
        ) : (
          <table className="tokens">
            <thead>
              <tr>
                <th>Sample</th>
                <th>Foreground</th>
                <th>Background</th>
                <th>Ratio</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {contrastResults.map((result) => (
                <tr key={`${result.foreground.id}-${result.background.id}`}>
                  <td>
                    <span
                      className="contrast-sample"
                      style={{ color: `var(${result.foreground.cssVar})`, background: `var(${result.background.cssVar})` }}
                    >
                      Aa
                    </span>
                  </td>
                  <td>
                    <code>{result.foreground.cssVar}</code>
                  </td>
                  <td>
                    <code>{result.background.cssVar}</code>
                  </td>
                  <td>
                    {result.ratio.toFixed(2)}:1 <span className="resolved">min {result.min}:1</span>
                  </td>
                  <td>{result.pass ? "✓ Pass" : "✗ Fail"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
