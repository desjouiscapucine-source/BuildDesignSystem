// Level 1 — Portfolio (B138): the experience of the Design System Lead, laid out with the `page-content` skill
// (one card per timeline step, timeline on the right) and the `card` skill (cards stacked, 16px apart), with a skills
// panel on the left (approved 2026-11-14).
// Exception approved by the Design System Lead on 2026-11-14: the steps go from the most recent to the oldest,
// the mc2i internal project right below the BNP Paribas mission it runs alongside.
import { useEffect, useRef, useState } from "react";
import { Card, Tag, Timeline, TimelineStep, type ImageViewerImage } from "@ds/components";
import tokywokyProductTesting from "../../../assets/portfolio/tokywoky/desktop-product-testing.png";
import tokywokyHomepage from "../../../assets/portfolio/tokywoky/desktop-homepage.png";
import tokywokyMobileHomepage from "../../../assets/portfolio/tokywoky/mobile-homepage.png";
import tokywokyNotifications from "../../../assets/portfolio/tokywoky/mobile-notifications.png";
import tokywokyEditProfile from "../../../assets/portfolio/tokywoky/mobile-edit-profile.png";
import tokywokyProductTag from "../../../assets/portfolio/tokywoky/mobile-product-tag.png";
import { Header } from "./SectionPages";

type Section = { title?: string; note?: string; text?: string; items: string[] };

type Experience = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  ongoing?: boolean;
  description: string;
  context?: string;
  sections: Section[];
  // Mockups shown as thumbnails under the text (Card clickable-image), opened in the ImageViewer.
  images?: [ImageViewerImage, ...ImageViewerImage[]];
};

// Day precision until TimelineStep shows month-year dates and "Present" (B137): first day of the start month,
// last day of the end month; an ongoing job ends today.
const experiences: Experience[] = [
  {
    id: "bnp-paribas",
    title: "Product Designer · Design System PO — BNP Paribas",
    startDate: new Date(2023, 8, 1),
    endDate: new Date(),
    ongoing: true,
    description: "CIB UX team, My Credit App.",
    context: "Within the BNP Paribas CIB UX team, on My Credit App and the projects connected to it.",
    sections: [
      {
        title: "Product Designer",
        items: [
          "Business user journeys, and user flows for new features.",
          "Mockups and prototypes, estimation and prioritization.",
          "Functional and visual acceptance testing.",
          "Quality of the team's deliverables.",
          "Workshop facilitation.",
        ],
      },
      {
        title: "Design System PO",
        items: [
          "Setting up and maintaining the design system with Storybook.",
          "Design system governance and roadmap.",
          "Specifications, visual and functional guidelines, usage documentation in zeroheight.",
          "Integration tests for consistency and reuse.",
        ],
      },
      {
        title: "AI-powered forms",
        items: [
          "Projects on document import and form filling with AI.",
          "Design system: AI-oriented variants of the form field, to tell a value filled manually from a value filled by AI, and to show the accuracy of the filled data.",
        ],
      },
      {
        title: "AI-assisted design",
        note: "Since summer 2026",
        items: [
          "AI tools: Claude and Qwen.",
          "Git workflow with GitHub and Bitbucket: branches, reviews, releases.",
          "A Bitbucket repository for the prototypes, with a shared commit and push process for the team.",
          "Repository organization: design tokens, components, documentation and prototypes in a single repository.",
          "Main ongoing project: building Claude skills that link the React components to their usage guidelines, to create interactive prototypes.",
          "Eval process with Claude and Qwen to test and improve the design system skills.",
        ],
      },
    ],
  },
  {
    id: "mc2i",
    title: "Lead Design System — mc2i",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 11, 31),
    description: "Internal project, alongside the BNP Paribas mission.",
    sections: [
      {
        items: [
          "Defined and led the design system roadmap.",
          "Prioritized and created components.",
          "Set up the component creation process.",
          "Coached junior designers and helped them grow their skills.",
        ],
      },
    ],
  },
  {
    id: "volunteer-projects",
    title: "UX/UI Designer — Volunteer projects",
    startDate: new Date(2022, 6, 1),
    endDate: new Date(2022, 8, 30),
    description: "Various projects.",
    sections: [
      {
        items: [
          "User journey analysis with data and heatmaps.",
          "Gathering and analyzing user needs.",
          "Zoning and wireframes.",
          "High-fidelity mockups.",
        ],
      },
    ],
  },
  {
    id: "tokywoky",
    title: "Product Designer — Tokywoky",
    startDate: new Date(2021, 5, 1),
    endDate: new Date(2023, 4, 31),
    description: "Product design and design system.",
    // Mockups recreated in Figma from the original screens (B138-3).
    images: [
      { src: tokywokyProductTesting, alt: "Desktop mockup of a product testing campaign page with an Apply to test button" },
      { src: tokywokyHomepage, alt: "Desktop mockup of the community homepage: welcome, tasks to earn points and the feed" },
      { src: tokywokyMobileHomepage, alt: "Mobile mockup of the community homepage" },
      { src: tokywokyNotifications, alt: "Mobile mockup of the notifications screen, with an alert to turn on notifications" },
      { src: tokywokyEditProfile, alt: "Mobile mockup of the edit profile form: picture, username, birth date and city" },
      { src: tokywokyProductTag, alt: "Mobile mockup of a routine product picker showing a grid of foundations" },
    ],
    sections: [
      {
        items: [
          "Workshop facilitation with developers, community managers and product owners.",
          "User research, and audit of the existing product.",
          "Wireframes, high-fidelity mockups and interactive prototypes.",
          "A/B testing on Maze.",
          "Communication strategy.",
          "Specifications in Notion.",
          "Design system redesign (desktop and mobile) and migration to Figma.",
        ],
      },
    ],
  },
];

// Education: steps of the same timeline, after the experience (most recent first), with their cards under the
// "Education" title. Years only in the CV: first day to last day of the years until B137 (month-year dates).
type Training = { id: string; title: string; degree: string; dates: string; startDate: Date; endDate: Date };

const education: Training[] = [
  {
    id: "icademie",
    title: "UX/UI Design — Icademie",
    degree: "Professional training",
    dates: "Feb 2022 – Apr 2023",
    startDate: new Date(2022, 1, 1),
    endDate: new Date(2023, 3, 30),
  },
  {
    id: "euridis",
    title: "IT Business Engineering — Euridis Business School",
    degree: "Master's degree",
    dates: "2019 – 2021",
    startDate: new Date(2019, 0, 1),
    endDate: new Date(2021, 11, 31),
  },
  {
    id: "ipac",
    title: "Marketing & Negotiation — Ipac",
    degree: "Bachelor's degree",
    dates: "2018 – 2019",
    startDate: new Date(2018, 0, 1),
    endDate: new Date(2019, 11, 31),
  },
  {
    id: "ecole-sup-paris",
    title: "Retail Management — École Sup Paris",
    degree: "BTS (two-year degree)",
    dates: "2015 – 2017",
    startDate: new Date(2015, 0, 1),
    endDate: new Date(2017, 11, 31),
  },
];

// Every step of the timeline, in the order of the cards.
const steps = [
  ...experiences.map(({ id, title, startDate, endDate, description }) => ({ id, title, startDate, endDate, description })),
  ...education.map(({ id, title, startDate, endDate, degree }) => ({ id, title, startDate, endDate, description: `${degree}.` })),
];

const skills: { title: string; tags: string[] }[] = [
  {
    title: "Skills",
    tags: [
      "UX research",
      "User journeys",
      "Information architecture",
      "Wireframes & prototyping",
      "High-fidelity mockups",
      "Design system",
      "Specifications",
      "Workshop facilitation",
      "Design thinking",
      "Agile",
    ],
  },
  {
    title: "Tools",
    tags: ["Figma", "Storybook", "zeroheight", "Jira", "Maze", "Notion", "Claude", "Qwen", "GitHub", "Bitbucket"],
  },
  { title: "Expertise", tags: ["Banking", "E-commerce"] },
];

// The step of the card at the top of the reading area (below the sticky header): the last card whose top
// has reached its scroll margin.
function cardAtTop(): string {
  let current = steps[0].id;
  for (const experience of steps) {
    const card = document.getElementById(experience.id);
    if (card && card.getBoundingClientRect().top <= parseFloat(getComputedStyle(card).scrollMarginTop) + 1)
      current = experience.id;
  }
  return current;
}

export function PortfolioPage() {
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

  // Space after the last card, just enough for it to reach the top of the reading area: screen height minus
  // the card's scroll margin (header + page margin), its height and the page margin below it (measured, not a design value).
  const cards = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const column = cards.current;
    const lastCard = column?.lastElementChild as HTMLElement | null;
    const content = column?.closest<HTMLElement>(".shell-content");
    if (!column || !lastCard || !content) return;
    const update = () => {
      const top = parseFloat(getComputedStyle(lastCard).scrollMarginTop);
      const pageMargin = parseFloat(getComputedStyle(content).paddingBottom);
      const space = Math.max(0, window.innerHeight - top - lastCard.offsetHeight - pageMargin);
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
    <>
      <Header title="Designing systems that scale" lead="Product Designer · Design Systems · AI-assisted design" />
      <div className="portfolio-content">
        {/* Focusable: on short screens the panel scrolls on its own, so it must be reachable with the keyboard (WCAG 2.1.1). */}
        <aside className="portfolio-skills" aria-label="Skills, tools and expertise" tabIndex={0}>
          {skills.map((group) => (
            <section key={group.title}>
              <h2>{group.title}</h2>
              <ul className="portfolio-tags">
                {group.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </aside>
        <div className="portfolio-timeline">
          <Timeline label="Experience and education">
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
        <div className="portfolio-cards" ref={cards}>
          {experiences.map((experience) => {
            const content = (
              <>
                {experience.ongoing && (
                  <p>
                    <Tag tone="info">Ongoing</Tag>
                  </p>
                )}
                {experience.context && <p>{experience.context}</p>}
                {experience.sections.map((section, index) => (
                  <div key={section.title ?? index} className="portfolio-section">
                    {section.title && (
                      <h3 className="ds-text-label">
                        {section.title}
                        {section.note && <span className="portfolio-section-note"> · {section.note}</span>}
                      </h3>
                    )}
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            );
            // A card with mockups shows them as thumbnails (clickable-image); the others stay default.
            return experience.images ? (
              <Card
                key={experience.id}
                id={experience.id}
                title={experience.title}
                variant="clickable-image"
                images={experience.images}
              >
                {content}
              </Card>
            ) : (
              <Card key={experience.id} id={experience.id} title={experience.title}>
                {content}
              </Card>
            );
          })}
          <h2 className="portfolio-education-title">Education</h2>
          {education.map((training) => (
            <Card key={training.id} id={training.id} title={training.title} headingLevel={3}>
              <p>
                {training.degree} · {training.dates}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
