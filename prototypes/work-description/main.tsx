// An interactive mockup (user journey). Build the screens only with components from "@ds/components",
// inside the shared Screen layout; never with raw HTML controls or raw style values.
// Screen content follows the `page-content` skill: one card per timeline step, timeline on the right.
import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "../_shared/setup";
import { Card, Timeline, TimelineStep } from "@ds/components";
import { Screen } from "../_shared/Screen";
import "./main.css";

// Neutral placeholders: replace them with the real content of the journey.
const placeholderText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const steps = [1, 2, 3, 4].map((n) => ({
  id: `step-${n}`,
  title: `Step ${n}`,
  // One month per step, in chronological order (2026).
  startDate: new Date(2026, n - 1, 1),
  endDate: new Date(2026, n, 0),
  description: `Short description of step ${n}.`,
}));

// The step of the card at the top of the screen: the last card whose top has reached the top of the window.
function cardAtTop(): string {
  let current = steps[0].id;
  for (const step of steps) {
    const card = document.getElementById(step.id);
    if (card && card.getBoundingClientRect().top <= 1) current = step.id;
  }
  return current;
}

function Prototype() {
  const [selected, setSelected] = useState(steps[0].id);
  // A clicked step stays selected until the reader scrolls again (even if the jump leaves its card just below the top).
  const clicked = useRef<{ id: string; scrollY: number | null } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const click = clicked.current;
      if (click && (click.scrollY === null || click.scrollY === window.scrollY)) return;
      clicked.current = null;
      setSelected(cardAtTop());
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Space after the last card, just enough for it to reach the top of the screen:
  // screen height minus the height of the last card and the page margin below it (measured, not a design value).
  const cards = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const column = cards.current;
    const lastCard = column?.lastElementChild as HTMLElement | null;
    const screen = column?.closest<HTMLElement>(".prototype-screen");
    if (!column || !lastCard || !screen) return;
    const update = () => {
      const pageMargin = parseFloat(getComputedStyle(screen).paddingBottom);
      const space = Math.max(0, window.innerHeight - lastCard.offsetHeight - pageMargin);
      column.style.paddingBottom = `${space}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(lastCard);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const onStepClick = (id: string) => {
    clicked.current = { id, scrollY: null };
    setSelected(id);
    // After the jump to the card (the link's default action), remember where the page stopped.
    setTimeout(() => {
      if (clicked.current?.id === id) clicked.current.scrollY = window.scrollY;
    });
  };

  return (
    <Screen title="WorkDescription" subtitle="Placeholder content: four steps, each with its own card">
      <div className="work-description-content">
        <div className="work-description-timeline">
          <Timeline label="Steps">
            {steps.map((step) => (
              <TimelineStep
                key={step.id}
                title={step.title}
                startDate={step.startDate}
                endDate={step.endDate}
                href={`#${step.id}`}
                selected={step.id === selected}
                onClick={() => onStepClick(step.id)}
              >
                {step.description}
              </TimelineStep>
            ))}
          </Timeline>
        </div>
        <div className="work-description-cards" ref={cards}>
          {steps.map((step) => (
            <Card key={step.id} id={step.id} title={step.title}>
              <p>{placeholderText}</p>
              <p>{placeholderText}</p>
              <p>{placeholderText}</p>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Prototype />
  </StrictMode>,
);
