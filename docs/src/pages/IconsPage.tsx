import { useState } from "react";
import { tokens } from "../../../tokens/lib";
import { Header } from "./SectionPages";
import { Link, TextInput } from "@ds/components";

const sizes = tokens.filter((token) => token.path[0] === "icon-size");
const samples = [
  "home", "search", "menu", "close", "arrow_back", "arrow_forward", "expand_more", "chevron_right",
  "add", "remove", "edit", "delete", "check", "check_circle", "info", "warning",
  "error", "help", "person", "settings", "notifications", "favorite", "shopping_cart", "calendar_today",
  "mail", "lock", "visibility", "download", "upload", "share", "filter_list", "more_vert",
];

export function IconsPage() {
  const [name, setName] = useState("favorite");

  return (
    <>
      <Header title="Icons" lead="Material Symbols Outlined, weight 400, always unfilled." />
      <p>
        Loaded from Google Fonts. Browse every icon name in the{" "}
        <Link href="https://fonts.google.com/icons?icon.style=Outlined">Google Fonts icon library</Link>
        .
      </p>

      <h2>Usage</h2>
      <pre className="code">{`<span class="ds-icon" aria-hidden="true">home</span>`}</pre>
      <p>
        The icon takes the text color. Default size: <code>--icon-size-24</code>. Decorative icons get{" "}
        <code>aria-hidden="true"</code>; an icon used alone as a button needs an accessible label.
      </p>

      <h2>Sizes</h2>
      <table className="tokens">
        <thead>
          <tr>
            <th>Preview</th>
            <th>Token</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((token) => (
            <tr key={token.id}>
              <td>
                <span className="ds-icon" style={{ fontSize: `var(${token.cssVar})` }} aria-hidden="true">
                  favorite
                </span>
              </td>
              <td>
                <code>{token.cssVar}</code>
              </td>
              <td>
                <code>{token.value}</code>
                {token.description && <div className="resolved">{token.description}</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Try an icon</h2>
      <TextInput
        className="icon-try"
        label="Icon name"
        value={name}
        onChange={(entry) => setName(entry.trim().toLowerCase().replace(/\s+/g, "_"))}
      />
      <div className="icon-try-preview">
        {sizes.map((token) => (
          <span key={token.id} className="ds-icon" style={{ fontSize: `var(${token.cssVar})` }} aria-hidden="true">
            {name || "help"}
          </span>
        ))}
      </div>

      <h2>Examples</h2>
      <ul className="icon-grid">
        {samples.map((sample) => (
          <li key={sample}>
            <span className="ds-icon" aria-hidden="true">
              {sample}
            </span>
            <code>{sample}</code>
          </li>
        ))}
      </ul>
    </>
  );
}
