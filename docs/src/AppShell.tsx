import { useEffect, useState, type FormEvent, type ReactElement, type ReactNode } from "react";
import {
  Breadcrumb,
  Button,
  Dialog,
  IconButton,
  NavigationItem,
  SideNavigation,
  TextInput,
  type BreadcrumbLevel,
  type NavigationItemProps,
} from "@ds/components";
import logo from "../../assets/logo/avatar-logo.svg";
import { useAuth } from "./auth";
import { allPages, pathTo, spaces, type NavNode } from "./structure";
import saved from "./work-time.json";

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
        .then((response) => (response.ok ? response.json() : Promise.reject()))
        .then(setData)
        // Online (public site, no dev server API): the total saved on release day, frozen (B152).
        .catch(() => setData({ seconds: saved.seconds, lastActivity: null, pauseMs: 0 }));
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

// Side navigation of one space (SideNavigation + NavigationItem): its Level 2 sections; a section with
// pages below it is a parent (opens and closes only; open when the current page is inside), the others are links.
// Children have no leading icon (NavigationItem ignores it).
function navItems(nodes: NavNode[], current: string): ReactElement<NavigationItemProps>[] {
  return nodes.map((node) => {
    const children = node.children ?? [];
    // A parent needs 2 children minimum (NavigationItem guidelines).
    return children.length >= 2 ? (
      <NavigationItem key={node.href + node.label} icon={node.icon} label={node.label}>
        {navItems(children, current)}
      </NavigationItem>
    ) : (
      <NavigationItem key={node.href + node.label} icon={node.icon} href={node.href} selected={node.href === current}>
        {node.label}
      </NavigationItem>
    );
  });
}

// Layout of the documentation site: header (logo → landing page, spaces, search, clock) + side navigation of the current space + content.
// Breadcrumb (Breadcrumb guidelines): pages from Level 2 to Level 4, from Level 0 (the landing page) down to the parent.
// Level 1 pages have none: Portfolio is its own only page (same label as its space).
function breadcrumbLevels(path: NavNode[], inNavigation: boolean): BreadcrumbLevel[] {
  if (path.length < 2 || path[1].label === path[0].label) return [];
  // A section reached through its own "All …" item (e.g. Projects → All projects) is the page itself, not a level above it.
  const page = path[path.length - 1];
  const above = inNavigation ? path.slice(0, -1).filter((node, index) => index === 0 || node.href !== page.href) : path;
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
  // A space that is its own only page (Portfolio) has no side navigation on desktop; below desktop the burger
  // still opens it, for the "Spaces" item only.
  const singlePage = (space.children ?? []).every((node) => node.href === space.href);

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
    <div className={singlePage ? "shell shell--single-page" : "shell"}>
      <a className="shell-skip" href="#main">
        Skip to content
      </a>
      <header className="shell-header">
        <IconButton
          className="shell-menu-button"
          variant="primary"
          icon={navOpen ? "close" : "menu"}
          label={navOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={navOpen}
          aria-controls="shell-nav"
          onClick={() => setNavOpen(!navOpen)}
        />
        {/* Level 0: the logo goes back to the landing page from every level. */}
        <a className="shell-brand" href="/" aria-label="BuildDesignSystem, home">
          <img className="shell-brand-logo" src={logo} alt="" />
          <span className="shell-brand-name">BuildDesignSystem</span>
        </a>
        <nav className="shell-spaces" aria-label="Spaces">
          {spaceLinks("shell-spaces-list")}
        </nav>
        {/* UX playground (B130): entry point next to the search field. */}
        <IconButton
          className="shell-playground-button"
          variant="tertiary"
          icon="design_services"
          label="UX playground"
          onClick={() => {
            window.location.hash = "#/ux-playground";
          }}
        />
        <Search />
        <WorkTime />
        <Login />
      </header>

      <div className="shell-body">
        <SideNavigation id="shell-nav" className="shell-nav" label={space.label} open={navOpen}>
          {[
            // Below desktop the header has no room for the spaces: a "Spaces" parent at the top of the navigation.
            // Only the page displayed is selected (one selected item): the current space is not.
            <NavigationItem key="spaces" className="shell-nav-spaces" icon="workspaces" label="Spaces">
              {spaces.map((item) => (
                <NavigationItem key={item.href} href={item.href}>
                  {item.label}
                </NavigationItem>
              ))}
            </NavigationItem>,
            ...(singlePage ? [] : navItems(space.children ?? [], current)),
          ]}
        </SideNavigation>
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

  const all = allPages();
  const q = query.trim().toLowerCase();
  const results = q ? all.filter((item) => item.label.toLowerCase().includes(q)) : [];

  const go = (href: string) => {
    window.location.href = href;
    setQuery("");
    (document.activeElement as HTMLElement | null)?.blur();
  };

  return (
    <div className="shell-search" role="search">
      <TextInput
        type="search"
        placeholder="Search pages"
        role="combobox"
        aria-expanded={results.length > 0}
        aria-controls="shell-search-results"
        aria-activedescendant={results.length > 0 ? `search-result-${active}` : undefined}
        value={query}
        onChange={(next) => {
          setQuery(next);
          setActive(0);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") setActive((index) => Math.min(index + 1, results.length - 1));
          else if (event.key === "ArrowUp") setActive((index) => Math.max(index - 1, 0));
          else if (event.key === "Enter" && results[active]) go(results[active].href);
          else return;
          event.preventDefault();
        }}
      />
      {q && results.length > 0 && (
        <ul id="shell-search-results" className="shell-search-results" role="listbox">
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
      {/* Polite live region, always rendered so that "No page found" is announced (outside the listbox). */}
      <div className="shell-search-status" role="status">
        {q && results.length === 0 && (
          <div className="shell-search-results">
            <p className="shell-search-empty">No page found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Session of the Design System Lead (B168): logged out, an IconButton opens a password Dialog; logged in, the
// same spot logs out. One account: no username field. A plain password field, like the Search input above
// (TextInput has no password type) — not a design system component.
function Login() {
  const { loggedIn, login, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!password || pending) return;
    setPending(true);
    const ok = await login(password);
    setPending(false);
    if (ok) {
      setOpen(false);
      setPassword("");
      setError(null);
    } else {
      setError("Wrong password.");
    }
  }

  function close() {
    setOpen(false);
    setPassword("");
    setError(null);
  }

  if (loggedIn === null) return null; // The session is still being checked.

  if (loggedIn) {
    return <IconButton className="shell-login" variant="tertiary" icon="logout" label="Log out" onClick={() => logout()} />;
  }

  return (
    <>
      <IconButton
        className="shell-login"
        variant="tertiary"
        icon="login"
        label="Log in to edit the backlog live"
        onClick={() => setOpen(true)}
      />
      <Dialog
        open={open}
        onClose={close}
        title="Log in"
        description="Edit the backlog live from this site."
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" form="shell-login-form" disabled={pending || !password}>
              Log in
            </Button>
          </>
        }
      >
        <form id="shell-login-form" className="shell-login-form" onSubmit={submit}>
          <label className="shell-login-label" htmlFor="shell-login-password">
            Password
          </label>
          <input
            id="shell-login-password"
            className="shell-login-field"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && (
            <p className="shell-login-error" role="alert">
              {error}
            </p>
          )}
        </form>
      </Dialog>
    </>
  );
}
