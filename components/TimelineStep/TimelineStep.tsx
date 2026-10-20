import type { AnchorHTMLAttributes, ReactNode } from "react";
import "./TimelineStep.css";

export interface TimelineStepProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href" | "title"> {
  /** Name of the event or stage: a noun or an event, sentence case, 60 characters maximum. */
  title: string;
  /** Start of the date range (always a range). */
  startDate: Date;
  /** End of the date range. */
  endDate: Date;
  /** Anchor of the section of the same page the step leads to (e.g. "#shipping"). */
  href: string;
  /** The step of the section currently shown. Only one per timeline. */
  selected?: boolean;
  /** The description: one or two sentences, 150 characters maximum. */
  children: ReactNode;
}

// "12 Oct 2026": day, abbreviated month, year.
const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
const isoDate = (date: Date) => date.toISOString().slice(0, 10);

export function TimelineStep({ title, startDate, endDate, href, selected = false, children, className, ...rest }: TimelineStepProps) {
  const classes = ["ds-timeline-step", className].filter(Boolean).join(" ");
  return (
    <div className={classes}>
      <span className="ds-timeline-step-track" aria-hidden="true">
        <span className="ds-timeline-step-marker" />
        <span className="ds-timeline-step-line" />
      </span>
      <div className="ds-timeline-step-body">
        <a
          className="ds-timeline-step-link"
          href={href}
          // Selected step = position currently shown in the page.
          aria-current={selected ? "location" : undefined}
          {...rest}
        >
          <span className="ds-timeline-step-header">
            <span className="ds-timeline-step-title">{title}</span>
            <span className="ds-timeline-step-dates">
              <time dateTime={isoDate(startDate)}>{dateFormat.format(startDate)}</time>
              {" – "}
              <time dateTime={isoDate(endDate)}>{dateFormat.format(endDate)}</time>
            </span>
          </span>
          <span className="ds-timeline-step-description">{children}</span>
        </a>
      </div>
    </div>
  );
}
