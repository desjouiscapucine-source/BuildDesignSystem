// Playground tab of the documentation site: the dialog live, with a control per prop.
// The dialog opens over the page: a button opens it.
import { useState } from "react";
import { definePlayground, jsx, code } from "../../docs/src/playground";
import { Button } from "../Button/Button";
import { Dialog, type DialogSize } from "./Dialog";

interface DemoProps {
  size: DialogSize;
  title: string;
  description: string;
  body: boolean;
  footer: boolean;
}

function Demo({ size, title, description, body, footer }: DemoProps) {
  const [open, setOpen] = useState(true);
  const close = () => setOpen(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open the dialog
      </Button>
      <Dialog
        size={size}
        open={open}
        onClose={close}
        title={title}
        description={description}
        footer={
          footer && (
            <>
              <Button variant="secondary" onClick={close}>
                Cancel
              </Button>
              <Button variant="danger" onClick={close}>
                Delete
              </Button>
            </>
          )
        }
      >
        {body ? "The ticket and its history will be removed from the backlog. This cannot be undone." : undefined}
      </Dialog>
    </>
  );
}

export const playground = definePlayground({
  controls: {
    size: { type: "select", options: ["small", "medium", "large"], default: "medium", description: "Maximum width of the dialog." },
    title: { type: "text", default: "Delete this ticket?", description: "Title of the dialog. Wraps when long." },
    description: { type: "text", default: "B029 · Dialog", description: "Text under the title. Wraps when long." },
    children: { type: "boolean", default: true, description: "The body (optional): any content. Here: shown or not." },
    footer: { type: "boolean", default: true, description: "The action Buttons of the footer (optional). Here: shown or not." },
  },
  minHeight: 480,
  render: ({ size, title, description, children, footer }) => (
    <Demo size={size as DialogSize} title={title} description={description} body={children} footer={footer} />
  ),
  code: ({ size, title, description, children, footer }) =>
    jsx(
      "Dialog",
      {
        size: size === "medium" ? undefined : size,
        open: code("open"),
        onClose: code("() => setOpen(false)"),
        title,
        description,
        footer: footer ? code("<><Button variant=\"secondary\">Cancel</Button><Button variant=\"danger\">Delete</Button></>") : undefined,
      },
      children ? "The ticket and its history will be removed from the backlog. This cannot be undone." : undefined,
    ),
});
