import { useEffect, useRef, useState, type ReactNode } from "react";
import logo from "../../assets/logo/avatar-logo.svg";

export interface NavItem {
  href: string; // "#/tokens" or "/prototypes/"
  label: string;
  icon: string; // Material Symbols name
}

export interface NavSection {
  title?: string;
  items: NavItem[];
  empty?: string;
}

interface AppShellProps {
  sections: NavSection[];
  current: string; // current hash route, e.g. "#/tokens"
  children: ReactNode;
}

interface WorkTimeData {
  seconds: number;
  lastActivity: number | null;
  pauseMs: number;
}

const pad = (value: number) => String(value).padStart(2, "0");

// Digital clock: time spent building the site (from /api/work-time). Keeps ticking while a session is active.
function WorkTime() {
  const [data, setData] = useState<WorkTimeData | null>(null);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const load = () =>
      fetch("/api/work-time")
        .then((response) => (response.ok ? response.json() : null))
        .then(setData)
        .catch(() => setData(null));
    load();
    const refresh = setInterval(load, 60_000);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearInterval(refresh);
      clearInterval(tick);
    };
  }, []);
  if (!data) return null;
  const sinceLast = data.lastActivity === null ? Infinity : now - data.lastActivity;
  const total = data.seconds + (sinceLast <= data.pauseMs ? Math.floor(sinceLast / 1000) : 0);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return (
    <p className="shell-work-time">
      <span className="shell-work-time-label">Time spent building</span>
      <time className="shell-work-time-screen" dateTime={`PT${h}H${m}M${s}S`}>
        {pad(h)}:{pad(m)}:{pad(s)}
      </time>
    </p>
  );
}

// Layout of the documentation site: header (brand, search, actions) + side navigation + content.
export function AppShell({ sections, current, children }: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    setNavOpen(false);
  }, [current]);

  return (
    <div className="shell">
      <a className="shell-skip" href="#main">
        Skip to content
      </a>
      <header className="shell-header">
        <button
          className="shell-icon-button shell-menu-button"
          aria-label={navOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={navOpen}
          aria-controls="shell-nav"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span className="ds-icon" aria-hidden="true">
            {navOpen ? "close" : "menu"}
          </span>
        </button>
        <a className="shell-brand" href="#/">
          <img className="shell-brand-logo" src={logo} alt="" />
          BuildDesignSystem
        </a>
        <Search sections={sections} />
        <WorkTime />
      </header>

      <div className="shell-body">
        <nav id="shell-nav" className={`shell-nav${navOpen ? " open" : ""}`} aria-label="Main navigation">
          {sections.map((section, index) => (
            <div key={section.title ?? index} className="shell-nav-section">
              {section.title && <p className="shell-nav-title">{section.title}</p>}
              {section.items.length === 0 && section.empty && <p className="shell-nav-empty">{section.empty}</p>}
              <ul>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <a
                      className="shell-nav-link"
                      href={item.href}
                      aria-current={item.href === current ? "page" : undefined}
                    >
                      <span className="ds-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <main id="main" className="shell-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}

function Search({ sections }: { sections: NavSection[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const all = sections.flatMap((section) => section.items.map((item) => ({ ...item, section: section.title })));
  const q = query.trim().toLowerCase();
  const results = q ? all.filter((item) => item.label.toLowerCase().includes(q)) : [];

  // "/" focuses the search field.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        event.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    window.location.href = href;
    setQuery("");
    input.current?.blur();
  };

  return (
    <div className="shell-search" role="search">
      <span className="ds-icon" aria-hidden="true">
        search
      </span>
      <input
        ref={input}
        type="search"
        placeholder="Search pages"
        aria-label="Search pages"
        role="combobox"
        aria-expanded={results.length > 0}
        aria-controls="shell-search-results"
        aria-activedescendant={results.length > 0 ? `search-result-${active}` : undefined}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActive(0);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") setActive((index) => Math.min(index + 1, results.length - 1));
          else if (event.key === "ArrowUp") setActive((index) => Math.max(index - 1, 0));
          else if (event.key === "Enter" && results[active]) go(results[active].href);
          else if (event.key === "Escape") setQuery("");
          else return;
          event.preventDefault();
        }}
      />
      <kbd className="shell-search-key" aria-hidden="true">
        /
      </kbd>
      {q && (
        <ul id="shell-search-results" className="shell-search-results" role="listbox">
          {results.length === 0 && <li className="shell-search-empty">No page found</li>}
          {results.map((item, index) => (
            <li
              key={item.href}
              id={`search-result-${index}`}
              role="option"
              aria-selected={index === active}
              onMouseDown={(event) => {
                event.preventDefault();
                go(item.href);
              }}
            >
              <span className="ds-icon" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
              {item.section && <span className="shell-search-section">{item.section}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
