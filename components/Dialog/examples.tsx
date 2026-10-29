// Live examples shown in the Examples tab of the documentation site.
// The dialog opens over the page: each example has a button to open it.
import { useState, type ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { Button } from "../Button/Button";
import { Dialog, type DialogSize } from "./Dialog";

interface DemoProps {
  button: string;
  size?: DialogSize;
  title: string;
  description: string;
  body?: ReactNode;
  actions?: { cancel: string; main: string; danger?: boolean };
}

function Demo({ button, size, title, description, body, actions }: DemoProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {button}
      </Button>
      <Dialog
        size={size}
        open={open}
        onClose={close}
        title={title}
        description={description}
        footer={
          actions && (
            <>
              <Button variant="secondary" onClick={close}>
                {actions.cancel}
              </Button>
              <Button variant={actions.danger ? "danger" : "primary"} onClick={close}>
                {actions.main}
              </Button>
            </>
          )
        }
      >
        {body}
      </Dialog>
    </>
  );
}

const ticketBody = (
  <>
    {[
      "Dialog that opens over the page to show a detail or ask for an action. It uses the highest shadow and dims the page behind it.",
      "It opens the detail of a Level 3 page (e.g. a ticket from the Backlog) instead of a new page, as defined on the Navigation structure page.",
      "The header and the footer stay in place: only this body scrolls when the content is longer than the screen.",
      "It closes with the close button, the Escape key, a click on the overlay or a button of the footer.",
    ].map((paragraph) => (
      <p key={paragraph}>{paragraph}</p>
    ))}
  </>
);

export const examples: Example[] = [
  {
    title: "Small — confirmation",
    description: "Cancel + a danger action, for a destructive action.",
    render: () => (
      <Demo
        button="Open a small dialog"
        size="small"
        title="Delete this ticket?"
        description="B029 · Dialog"
        body="The ticket and its history will be removed from the backlog. This cannot be undone."
        actions={{ cancel: "Cancel", main: "Delete", danger: true }}
      />
    ),
  },
  {
    title: "Medium (default)",
    description: "Cancel + a primary action.",
    render: () => (
      <Demo
        button="Open a medium dialog"
        title="Move the ticket to Done?"
        description="B029 · Dialog"
        body="The ticket leaves the In progress column of the backlog."
        actions={{ cancel: "Cancel", main: "Move" }}
      />
    ),
  },
  {
    title: "Large — detail",
    description: "The detail of an item, no footer.",
    render: () => <Demo button="Open a large dialog" size="large" title="Dialog" description="B029 · Components · In progress" body={ticketBody} />,
  },
  {
    title: "Without body and footer",
    description: "Only the required parts: title, description and close button.",
    render: () => <Demo button="Open a minimal dialog" title="Ticket archived" description="B029 is archived. It stays readable on the Backlog page." />,
  },
  {
    title: "Long content",
    description: "Only the body scrolls; the header and the footer stay in place.",
    render: () => (
      <Demo
        button="Open with long content"
        title="Dialog"
        description="B029 · Components · In progress"
        body={
          <>
            {ticketBody}
            {ticketBody}
            {ticketBody}
          </>
        }
        actions={{ cancel: "Cancel", main: "Save" }}
      />
    ),
  },
  {
    title: "Long title and description",
    description: "The title and the description wrap (no maximum length).",
    render: () => (
      <Demo
        button="Open with a long title"
        size="small"
        title="Delete the ticket and every step, iteration and comment written for it since the beginning of the project?"
        description="B029 · Dialog · Components · Release R1 · Priority high · Created by the Design System Lead on 2026-10-16"
        body="This cannot be undone."
        actions={{ cancel: "Cancel", main: "Delete", danger: true }}
      />
    ),
  },
];
