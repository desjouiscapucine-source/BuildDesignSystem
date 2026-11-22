// Live examples shown on the component's documentation page.
import { useState } from "react";
import type { ReactNode } from "react";
import type { Example } from "../../docs/src/types";
import { Button } from "../Button/Button";
import { StickyNote, type StickyNoteProps } from "./StickyNote";

const text = "Check the spacing between the cards and the timeline on mobile.";
const longText =
  "Check the spacing on mobile, also the title is too long, and the button should be secondary, and ask about the tabs before the next review.";

// The notes sit on the canvas background (Canvas, B142: --color-background-subtle).
function CanvasArea({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-24)",
        padding: "var(--space-24)",
        background: "var(--color-background-subtle)",
      }}
    >
      {children}
    </div>
  );
}

// A note that handles its own selection, editing, text and deletion, like on the canvas.
function LiveNote(props: Omit<StickyNoteProps, "text"> & { initialText: string }) {
  const { initialText, ...rest } = props;
  const [value, setValue] = useState(initialText);
  const [selected, setSelected] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(false);
  if (deleted) {
    return (
      <Button variant="secondary" icon="undo" onClick={() => { setValue(initialText); setDeleted(false); }}>
        Restore the note
      </Button>
    );
  }
  return (
    <StickyNote
      {...rest}
      text={value}
      selected={selected}
      editing={editing}
      onSelectedChange={setSelected}
      onEditingChange={setEditing}
      onTextChange={setValue}
      onDelete={() => { setEditing(false); setDeleted(true); }}
    />
  );
}

export const examples: Example[] = [
  {
    title: "Default",
    description: "Text, author in initials, short date, and the Edit and Delete actions.",
    render: () => (
      <CanvasArea>
        <StickyNote text={text} author="CD" date="19 Nov" />
      </CanvasArea>
    ),
  },
  {
    title: "Interactive",
    description: "Click or Space to select, Edit / double-click / Enter to edit, Escape, a click outside or Tab out of the note to save, Delete to remove. An empty text removes the note.",
    render: () => (
      <CanvasArea>
        <LiveNote initialText={text} author="CD" date="19 Nov" />
        <LiveNote initialText="Add a back button here." author="CD" date="19 Nov" />
      </CanvasArea>
    ),
  },
  {
    title: "States",
    description: "Selected and editing: 2px border, no state layer. Dragging: higher shadow.",
    render: () => (
      <CanvasArea>
        <StickyNote text={text} author="CD" date="19 Nov" selected />
        <StickyNote text={text} author="CD" date="19 Nov" editing />
        <StickyNote text={text} author="CD" date="19 Nov" dragging />
      </CanvasArea>
    ),
  },
  {
    title: "Text length",
    description: "Short, long, and very long text: cut with an ellipsis after 4 lines.",
    render: () => (
      <CanvasArea>
        <StickyNote text="Check the spacing on mobile." author="CD" date="19 Nov" />
        <StickyNote text={text} author="CD" date="19 Nov" />
        <StickyNote text={longText} author="CD" date="19 Nov" />
      </CanvasArea>
    ),
  },
];
