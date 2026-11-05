// Level 3 — one project: its deliverables as sections (User journey, then User flow and Prototype later).
import { Card } from "@ds/components";
import type { Project } from "../projects";
import { Header } from "./SectionPages";

export function ProjectPage({ project }: { project: Project }) {
  const { journey } = project;
  return (
    <>
      <Header title={project.name} lead={project.lead} />
      <section id="user-journey">
        <h2>User journey</h2>
        {journey ? (
          <>
            <p>User: {journey.user}</p>
            {/* Journey map: one card per phase, in order (4 columns on desktop, 2 on tablet, 1 on mobile). */}
            <ol className="journey-map">
              {journey.phases.map((phase, index) => (
                <li key={phase.title}>
                  <Card title={`${index}. ${phase.title}`} headingLevel={3}>
                    <p>{phase.actions}</p>
                    <p className="journey-touchpoints">
                      <strong>Touchpoints:</strong> {phase.touchpoints}
                    </p>
                  </Card>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <p className="empty">Not written yet.</p>
        )}
      </section>
    </>
  );
}
