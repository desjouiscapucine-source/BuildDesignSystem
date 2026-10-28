import { useEffect, useRef, useState, type ReactNode } from "react";
import { Breadcrumb, type BreadcrumbLevel } from "@ds/components";
import logo from "../../assets/logo/avatar-logo.svg";
import { allPages, pathTo, spaces, type NavNode } from "./structure";

interface AppShellProps {
  current: string; // current page in the navigation, e.g. "#/backlog"
  route?: string; // displayed route when it is not in the navigation (a ticket, "#/backlog/B083"): its parent is `current`
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

// Side navigation of one space: its Level 2 sections; the pages below a section open under it
// while the current page is inside that section (navigation skill).
function NavList({ nodes, path, current }: { nodes: NavNode[]; path: NavNode[]; current: string }) {
  return (
    <ul>
      {nodes.map((node) => {
        const open = path.includes(node);
        const children = node.children ?? [];
        return (
          <li key={node.href + node.label}>
            <a className="shell-nav-link" href={node.href} aria-current={node.href === current ? "page" : undefined}>
              <span className="ds-icon" aria-hidden="true">
                {node.icon}
              </span>
              {node.label}
            </a>
            {open && children.length > 0 && <NavList nodes={children} path={path} current={current} />}
            {open && children.length === 0 && node.empty && <p className="shell-nav-empty">{node.empty}</p>}
          </li>
        );
      })}
    </ul>
  );
}

// Layout of the documentation site: header (logo → landing page, spaces, search, clock) + side navigation of the current space + content.
// Breadcrumb (Breadcrumb guidelines): pages from Level 2 to Level 4, from Level 0 (the landing page) down to the parent.
// Level 1 pages have none: Portfolio is its own only page (same label as its space).
function breadcrumbLevels(path: NavNode[], inNavigation: boolean): BreadcrumbLevel[] {
  if (path.length < 2 || path[1].label === path[0].label) return [];
  const above = inNavigation ? path.slice(0, -1) : path;
  return [{ label: "BuildDesignSystem", href: "/" }, ...above.map((node) => ({ label: node.label, href: node.href }))];
}

export function AppShell({ current, route = current, children }: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    setNavOpen(false);
  }, [current]);

  const path = pathTo(current);
  const space = path[0] ?? spaces[0];
  const levels = breadcrumbLevels(path, route === current);

  const spaceLinks = (className: string) => (
    <ul className={className}>
      {spaces.map((item) => (
        <li key={item.href}>
          <a href={item.href} aria-current={item === space ? "true" : undefined}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

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
        {/* Level 0: the logo goes back to the landing page from every level. */}
        <a className="shell-brand" href="/" aria-label="BuildDesignSystem, home">
          <img className="shell-brand-logo" src={logo} alt="" />
          <span className="shell-brand-name">BuildDesignSystem</span>
        </a>
        <nav className="shell-spaces" aria-label="Spaces">
          {spaceLinks("shell-spaces-list")}
        </nav>
        <Search />
        <WorkTime />
      </header>

      <div className="shell-body">
        <nav id="shell-nav" className={`shell-nav${navOpen ? " open" : ""}`} aria-label={space.label}>
          {/* Below desktop the header has no room for the spaces: they open at the top of the menu. */}
          <div className="shell-nav-spaces">
            <p className="shell-nav-title">Spaces</p>
            {spaceLinks("shell-nav-spaces-list")}
          </div>
          <p className="shell-nav-title">{space.label}</p>
          <NavList nodes={space.children ?? []} path={path} current={current} />
        </nav>
        <main id="main" className="shell-content" tabIndex={-1}>
          {levels.length > 0 && <Breadcrumb items={levels} />}
          {children}
        </main>
      </div>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const all = allPages();
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
              key={item.href + item.label}
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
              <span className="shell-search-section">{item.space}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
