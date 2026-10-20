// Lists every prototype folder (folders starting with "_" are ignored).
import { createRoot } from "react-dom/client";
import "../tokens/fonts.css";
import "../tokens/tokens.css";
import "../docs/src/docs.css";

const pages = Object.keys(import.meta.glob(["./*/index.html", "!./_*/**"])).map((path) => path.split("/")[1]);

function PrototypeList() {
  return (
    <main className="home">
      <p>
        <a href="/">← BuildDesignSystem</a>
      </p>
      <h1>Prototypes</h1>
      <p className="lead">Interactive mockups built with the coded components.</p>
      {pages.length === 0 ? (
        <p className="empty">
          No prototypes yet. Copy <code>prototypes/_template/</code> to create the first one.
        </p>
      ) : (
        <nav className="home-links">
          {pages.map((name) => (
            <a key={name} href={`/prototypes/${name}/`}>
              <strong>{name}</strong>
            </a>
          ))}
        </nav>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<PrototypeList />);
