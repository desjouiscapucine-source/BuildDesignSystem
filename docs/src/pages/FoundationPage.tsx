import { tokens, textStyles, contrastResults, type Tier, type Token } from "../../../tokens/lib";
import type { Foundation } from "../foundations";

function Preview({ token }: { token: Token }) {
  const group = token.path[0];
  if (token.type === "color") return <span className="swatch" style={{ background: `var(${token.cssVar})` }} />;
  if (group === "space") return <span className="bar" style={{ width: `var(${token.cssVar})` }} />;
  if (group === "radius") return <span className="shape" style={{ borderRadius: `var(${token.cssVar})` }} />;
  if (group === "shadow") return <span className="shape" style={{ boxShadow: `var(${token.cssVar})` }} />;
  return null;
}

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

const tierTitles: Record<Tier, string> = { primitive: "Primitive tokens", semantic: "Semantic tokens" };

// Tokens of one category, primitive then semantic (a tier with no token of this category is not shown).
export function FoundationTokens({ foundation }: { foundation: Foundation }) {
  const list = tokens.filter((token) => foundation.groups.includes(token.path[0]));
  if (list.length === 0) return <p className="empty">No tokens defined yet.</p>;
  return (
    <>
      {(["primitive", "semantic"] as Tier[]).map((tier) => {
        const inTier = list.filter((token) => token.tier === tier);
        if (inTier.length === 0) return null;
        return (
          <section key={tier}>
            <h2>{tierTitles[tier]}</h2>
            {foundation.groups
              .filter((group) => inTier.some((token) => token.path[0] === group))
              .map((group) => (
                <div key={group}>
                  {foundation.groups.length > 1 && <h3>{group}</h3>}
                  <TokenTable list={inTier.filter((token) => token.path[0] === group)} />
                </div>
              ))}
          </section>
        );
      })}
    </>
  );
}

function TextStyles() {
  return (
    <section>
      <h2>Text styles</h2>
      <p>
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
  );
}

function Contrast() {
  return (
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
  );
}

// Level 3 page of Foundations: one category (navigation skill).
export function FoundationPage({ foundation }: { foundation: Foundation }) {
  return (
    <>
      <h1>{foundation.label}</h1>
      <p className="lead" title={foundation.lead}>
        {foundation.lead}
      </p>
      <p>
        Sources of truth: <code>tokens/primitives.json</code> and <code>tokens/semantic.json</code>, compiled to{" "}
        <code>tokens/tokens.css</code>.
      </p>
      <FoundationTokens foundation={foundation} />
      {foundation.slug === "typography" && <TextStyles />}
      {foundation.slug === "color" && <Contrast />}
    </>
  );
}
