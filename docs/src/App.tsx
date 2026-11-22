import { useEffect, useState } from "react";
import { components, levels } from "./registry";
import { AppShell } from "./AppShell";
import { FoundationPage } from "./pages/FoundationPage";
import { ComponentPage } from "./pages/ComponentPage";
import { BacklogPage } from "./pages/BacklogPage";
import { IconsPage } from "./pages/IconsPage";
import { GridPage } from "./pages/GridPage";
import { SkillsPage } from "./pages/SkillsPage";
import { AgentsPage } from "./pages/AgentsPage";
import { GitWorkflowPage } from "./pages/GitWorkflowPage";
import { BranchesPage } from "./pages/BranchesPage";
import { ChangelogPage } from "./pages/ChangelogPage";
import { ReleasePlanningPage } from "./pages/ReleasePlanningPage";
import { PrototypePage } from "./pages/PrototypePage";
import { NavigationPage } from "./pages/NavigationPage";
import { ProjectPage } from "./pages/ProjectPage";
import { projects } from "./projects";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import {
  CategoryPage,
  ComponentsPage,
  OverviewPage,
  PrototypesPage,
  SectionPage,
} from "./pages/SectionPages";
import { foundations } from "./foundations";
import { prototypes } from "./prototypes";
import { categorySlug } from "./structure";

// Hash routes, by navigation level (navigation skill):
// Level 1  #/ (Design system, opens on Overview)  ·  #/portfolio
// Level 2  #/governance  ·  #/foundations  ·  #/components  ·  #/prototypes  ·  #/projects  ·  #/ux-playground
// Level 3  #/backlog  ·  #/backlog/<id> (ticket in a modal over the Backlog)  ·  #/skills  ·  #/skills/<name>  ·  #/agents  ·  #/git-workflow  ·  #/branches  ·  #/changelog  ·  #/navigation  ·  #/releases  ·  #/foundations/<slug>  ·  #/components/<category>  ·  #/prototypes/<name>  ·  #/projects/<name>
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
  const project = projects.find((p) => route === `/projects/${p.slug}`);
  const prototype = route.startsWith("/prototypes/") ? route.slice("/prototypes/".length) : null;

  let page = <OverviewPage />;
  if (route === "/governance" || route === "/foundations") page = <SectionPage key={route} href={`#${route}`} />;
  // A ticket opens in a modal over the Backlog page (same page: no remount, no scroll to the top).
  else if (route === "/backlog" || route.startsWith("/backlog/"))
    page = <BacklogPage key="backlog" open={route.startsWith("/backlog/") ? route.slice("/backlog/".length) : undefined} />;
  else if (route === "/skills") page = <SkillsPage />;
  else if (route === "/agents") page = <AgentsPage />;
  else if (route.startsWith("/skills/")) page = <SkillsPage key={route} open={route.slice("/skills/".length)} />;
  else if (route === "/git-workflow") page = <GitWorkflowPage />;
  else if (route === "/branches") page = <BranchesPage />;
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
  else if (route === "/projects") page = <SectionPage key={route} href="#/projects" />;
  else if (project) page = <ProjectPage key={route} project={project} />;
  else if (route === "/navigation") page = <NavigationPage />;
  else if (route === "/ux-playground") page = <PlaygroundPage />;
  else if (route === "/portfolio") page = <PortfolioPage />;

  // Back to the top on a new page; opening or closing a ticket (a modal over the Backlog) keeps the scroll.
  const pageRoute = route.startsWith("/backlog/") ? "/backlog" : route;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageRoute]);

  // A ticket opens in a modal over the Backlog page: the Backlog stays the page shown (navigation, breadcrumb).
  return (
    <AppShell current={pageRoute.startsWith("/skills/") ? "#/skills" : `#${pageRoute}`} route={`#${pageRoute}`}>
      {page}
    </AppShell>
  );
}
