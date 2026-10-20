import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "title"> {
  /** Title of the card: same as the title of its step, 60 characters maximum. */
  title: string;
  /** Level of the title heading (h2 by default); the look does not change. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** The text of the card: complete sentences. */
  children: ReactNode;
}

export function Card({ title, headingLevel = 2, children, className, ...rest }: CardProps) {
  const classes = ["ds-card", className].filter(Boolean).join(" ");
  const Heading = `h${headingLevel}` as const;
  return (
    // `id` (in rest) is the anchor a TimelineStep can lead to.
    <section className={classes} {...rest}>
      <Heading className="ds-card-title">{title}</Heading>
      <div className="ds-card-text">{children}</div>
    </section>
  );
}
