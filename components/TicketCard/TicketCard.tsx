import type { HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode } from "react";
import { Tag } from "../Tag/Tag";
import "./TicketCard.css";

export interface TicketCardProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "title"> {
  /** ID of the ticket (e.g. B115), on the right of the tags row. */
  ticketId: string;
  /** Title of the ticket: a short noun phrase, sentence case, no period. Shown in full. */
  title: string;
  /** Goal of the ticket: one sentence ending with a period. Shown in full; no row when empty. */
  description?: string;
  /** Category of the ticket (e.g. Components): a neutral Tag. */
  category: string;
  /** True when the ticket's origin is `decided`: shows the "Decided" Tag. */
  decided?: boolean;
  /** The menus of the ticket (Status, Priority, Release, and Stage for a component ticket), given by the page. */
  menus: ReactNode;
  /** Opens the ticket: a click on the card (except on the menus) or Enter on the focused card. */
  onOpen?: () => void;
  /** Level of the title heading (h3 by default: under the h2 of a board column); the look does not change. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/** The card of a backlog ticket: the whole card is clickable and focusable, except its menus (spec). */
export function TicketCard({
  ticketId,
  title,
  description,
  category,
  decided = false,
  menus,
  onOpen,
  headingLevel = 3,
  className,
  onClick,
  onKeyDown,
  ...rest
}: TicketCardProps) {
  const classes = ["ds-ticket-card", className].filter(Boolean).join(" ");
  const Heading = `h${headingLevel}` as const;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onClick?.(event);
    // A click on the menus keeps the menu's own behavior.
    if ((event.target as HTMLElement).closest(".ds-ticket-card-menus")) return;
    onOpen?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    // Enter on the card itself only (not on a menu inside it).
    if (event.key === "Enter" && event.target === event.currentTarget) {
      event.preventDefault();
      onOpen?.();
    }
  };

  return (
    <article
      className={classes}
      tabIndex={0}
      aria-label={`${ticketId}, ${title}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div className="ds-ticket-card-tags">
        <Tag>{category}</Tag>
        {decided && (
          <Tag tone="success" icon="check_circle">
            Decided
          </Tag>
        )}
        <span className="ds-ticket-card-id">{ticketId}</span>
      </div>
      <Heading className="ds-ticket-card-title">{title}</Heading>
      {description && <p className="ds-ticket-card-description">{description}</p>}
      <div className="ds-ticket-card-menus">{menus}</div>
    </article>
  );
}
