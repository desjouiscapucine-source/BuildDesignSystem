import { useEffect, useState } from "react";
import { components, levels } from "./registry";
import { AppShell } from "./AppShell";
import { FoundationPage } from "./pages/FoundationPage";
import { ComponentPage } from "./pages/ComponentPage";
import { BacklogPage } from "./pages/BacklogPage";
import { IconsPage } from "./pages/IconsPage";
import { GridPage } from "./pages/GridPage";
import { SkillsPage } from "./pages/SkillsPage";
import { GitWorkflowPage } from "./pages/GitWorkflowPage";
import { ChangelogPage } from "./pages/ChangelogPage";
import { ReleasePlanningPage } from "./pages/ReleasePlanningPage";
import { TicketPage } from "./pages/TicketPage";
import { PrototypePage } from "./pages/PrototypePage";
import { NavigationPage } from "./pages/NavigationPage";
import {
  CategoryPage,
  ComponentsPage,
  OverviewPage,
  PortfolioPage,
  PrototypesPage,
  SectionPage,
} from "./pages/SectionPages";
import { foundations } from "./foundations";
import { prototypes } from "./prototypes";
import { categorySlug } from "./structure";

// Hash routes, by navigation level (navigation skill):
// Level 1  #/ (Documentation, opens on Overview)  ·  #/portfolio
// Level 2  #/governance  ·  #/foundations  ·  #/components  ·  #/prototypes  ·  #/navigation
// Level 3  #/backlog  ·  #/backlog/<id>  ·  #/skills  ·  #/skills/<name>  ·  #/git-workflow  ·  #/changelog  ·  #/releases  ·  #/foundations/<slug>  ·  #/components/<category>  ·  #/prototypes/<name>
// Level 4  #/components/<slug>
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

// Routes of the previous structure, kept so old links still work.
const moved: Record<string, string> = {
  "/tokens": "/foundations",
  "/icons": "/foundations/icons",
  "/grid": "/foundations/layout-grid",
};

export function App() {
  const route = useHashRoute();

  useEffect(() => {
    if (moved[route]) window.location.replace(`#${moved[route]}`);
  }, [route]);

  const component = components.find((c) => route === `/components/${c.slug}`);
  const category = levels.find(({ title }) => route === `/components/${categorySlug(title)}`);
  const foundation = foundations.find((f) => route === `/foundations/${f.slug}`);
  const prototype = route.startsWith("/prototypes/") ? route.slice("/prototypes/".length) : null;

  let page = <OverviewPage />;
  if (route === "/governance" || route === "/foundations") page = <SectionPage key={route} href={`#${route}`} />;
  else if (route === "/backlog") page = <BacklogPage />;
  else if (route.startsWith("/backlog/")) page = <TicketPage key={route} id={route.slice("/backlog/".length)} />;
  else if (route === "/skills") page = <SkillsPage />;
  else if (route.startsWith("/skills/")) page = <SkillsPage key={route} open={route.slice("/skills/".length)} />;
  else if (route === "/git-workflow") page = <GitWorkflowPage />;
  else if (route === "/changelog") page = <ChangelogPage />;
  else if (route === "/releases") page = <ReleasePlanningPage />;
  else if (foundation?.slug === "icons") page = <IconsPage />;
  else if (foundation?.slug === "layout-grid") page = <GridPage />;
  else if (foundation) page = <FoundationPage key={foundation.slug} foundation={foundation} />;
  else if (route === "/components") page = <ComponentsPage />;
  else if (category) page = <CategoryPage key={route} href={`#${route}`} />;
  else if (component) page = <ComponentPage key={component.slug} component={component} />;
  else if (route === "/prototypes") page = <PrototypesPage />;
  else if (prototype && prototypes.includes(prototype)) page = <PrototypePage key={route} name={prototype} />;
  else if (route === "/navigation") page = <NavigationPage />;
  else if (route === "/portfolio") page = <PortfolioPage />;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // A ticket is not in the navigation yet (it will open in a modal): the Backlog stays selected and ends its breadcrumb.
  return (
    <AppShell current={route.startsWith("/backlog/") ? "#/backlog" : route.startsWith("/skills/") ? "#/skills" : `#${route}`} route={`#${route}`}>
      {page}
    </AppShell>
  );
}
