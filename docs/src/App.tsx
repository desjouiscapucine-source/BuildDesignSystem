import { useEffect, useState } from "react";
import { components, levels } from "./registry";
import { AppShell, type NavSection } from "./AppShell";
import { HomePage } from "./pages/HomePage";
import { TokensPage } from "./pages/TokensPage";
import { ComponentPage } from "./pages/ComponentPage";
import { BacklogPage } from "./pages/BacklogPage";
import { IconsPage } from "./pages/IconsPage";
import { GridPage } from "./pages/GridPage";
import { SkillsPage } from "./pages/SkillsPage";
import { TicketPage } from "./pages/TicketPage";
import { PrototypePage } from "./pages/PrototypePage";
import { prototypeName, prototypes } from "./prototypes";

// Hash routes: #/  ·  #/backlog  ·  #/backlog/<id>  ·  #/skills  ·  #/prototypes/<name>  ·  #/tokens  ·  #/icons  ·  #/grid  ·  #/components/<slug>
function useHashRoute() {
  const read = () => {
    const hash = window.location.hash.replace(/^#/, "");
    return hash.startsWith("/") ? hash : "/";
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    // Hashes that are not routes (e.g. "#card-shipped", anchors used by the examples)
    // only scroll to their element: the page stays the same.
    const onChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && !hash.startsWith("/")) return;
      setRoute(read());
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

const sections: NavSection[] = [
  {
    items: [
      { href: "#/", label: "Overview", icon: "home" },
      { href: "#/backlog", label: "Backlog", icon: "view_kanban" },
      { href: "#/skills", label: "How to use skills", icon: "psychology" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { href: "#/tokens", label: "Design tokens", icon: "token" },
      { href: "#/icons", label: "Icons", icon: "interests" },
      { href: "#/grid", label: "Grid", icon: "grid_view" },
    ],
  },
  // Components, grouped by Atomic Design level (empty levels are hidden).
  ...levels
    .map(({ level, title }) => ({
      title,
      items: components
        .filter((c) => c.level === level)
        .map((c) => ({ href: `#/components/${c.slug}`, label: c.name, icon: "widgets" })),
    }))
    .filter((section) => section.items.length > 0),
  ...(components.length === 0 ? [{ title: "Components", empty: "None yet", items: [] }] : []),
  {
    title: "Prototypes",
    items: [
      ...prototypes.map((name) => ({ href: `#/prototypes/${name}`, label: prototypeName(name), icon: "preview" })),
      { href: "/prototypes/", label: "All prototypes", icon: "devices" },
    ],
  },
];

export function App() {
  const route = useHashRoute();
  const component = components.find((c) => route === `/components/${c.slug}`);

  let page = <HomePage />;
  if (route === "/tokens") page = <TokensPage />;
  else if (route === "/backlog") page = <BacklogPage />;
  else if (route.startsWith("/backlog/")) page = <TicketPage key={route} id={route.slice("/backlog/".length)} />;
  else if (route === "/skills") page = <SkillsPage />;
  else if (route === "/icons") page = <IconsPage />;
  else if (route === "/grid") page = <GridPage />;
  else if (route.startsWith("/prototypes/") && prototypes.includes(route.slice("/prototypes/".length)))
    page = <PrototypePage key={route} name={route.slice("/prototypes/".length)} />;
  else if (component) page = <ComponentPage key={component.slug} component={component} />;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <AppShell sections={sections} current={route.startsWith("/backlog/") ? "#/backlog" : `#${route}`}>
      {page}
    </AppShell>
  );
}
