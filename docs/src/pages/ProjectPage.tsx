// Level 3 — one project: its deliverables as sections (User journey, User flow, then Prototype later).
import { Card } from "@ds/components";
import type { Project } from "../projects";
import { Header } from "./SectionPages";

export function ProjectPage({ project }: { project: Project }) {
  const { journey, userFlow } = project;
  return (
    <>
      <Header title={project.name} lead={project.lead} />
      <section id="user-journey">
        <h2>User journey</h2>
        {journey ? (
          <>
            <p>User: {journey.user}</p>
            {/* Journey map: one card per phase, in order (4 columns on desktop, 2 on tablet, 1 on mobile): exception to the card skill (B130). */}
            <ol className="journey-map">
              {journey.phases.map((phase) => (
                <li key={phase.title}>
                  <Card title={phase.title} headingLevel={3}>
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
      <section id="user-flow">
        <h2>User flow</h2>
        {userFlow ? (
          // Flow diagram: the steps in order, each with its boxes, and a labelled arrow to the next one.
          <ol className="user-flow">
            {userFlow.steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <ul className={`user-flow-boxes${step.main ? " user-flow-boxes--main" : ""}`}>
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {step.next && (
                  <p className="user-flow-arrow">
                    <span className="ds-icon" aria-hidden="true">
                      arrow_downward
                    </span>
                    {step.next}
                  </p>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <p className="empty">Not written yet.</p>
        )}
      </section>
    </>
  );
}
