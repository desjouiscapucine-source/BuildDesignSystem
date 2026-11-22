// Playground tab of the documentation site: the sticky note live, with a control per prop.
import { useEffect, useState } from "react";
import { definePlayground, jsx } from "../../docs/src/playground";
import { StickyNote } from "./StickyNote";

// Selection, editing and text follow the controls, and the note can also change them.
function LiveNote({ text, author, date, selected, editing, dragging }: {
  text: string; author: string; date: string; selected: boolean; editing: boolean; dragging: boolean;
}) {
  const [value, setValue] = useState(text);
  const [isSelected, setSelected] = useState(selected);
  const [isEditing, setEditing] = useState(editing);
  useEffect(() => setValue(text), [text]);
  useEffect(() => setSelected(selected), [selected]);
  useEffect(() => setEditing(editing), [editing]);
  return (
    <div style={{ padding: "var(--space-24)", background: "var(--color-background-subtle)", width: "max-content" }}>
      <StickyNote
        text={value}
        author={author}
        date={date}
        selected={isSelected}
        editing={isEditing}
        dragging={dragging}
        onSelectedChange={setSelected}
        onEditingChange={setEditing}
        onTextChange={setValue}
        onDelete={() => { setEditing(false); setValue(text); }}
      />
    </div>
  );
}

export const playground = definePlayground({
  controls: {
    text: {
      type: "text",
      default: "Check the spacing between the cards and the timeline on mobile.",
      description: "The body of the note: one idea, short sentences. Cut with an ellipsis after 4 lines.",
    },
    author: { type: "text", default: "CD", description: "Initials of the author: two capital letters (e.g. \"CD\")." },
    date: { type: "text", default: "19 Nov", description: "Short date: day and short month in English, no year." },
    selected: { type: "boolean", default: false, description: "The note is selected on the canvas. Default: false." },
    editing: { type: "boolean", default: false, description: "The text is being edited. Default: false." },
    dragging: { type: "boolean", default: false, description: "The note is being dragged on the canvas (set by the Canvas). Default: false." },
  },
  // The note (10rem, 160px at the default text size) and the canvas padding around it.
  minHeight: 240,
  render: (args) => <LiveNote {...args} />,
  code: ({ text, author, date, selected, editing, dragging }) =>
    jsx("StickyNote", { text, author, date, selected, editing, dragging }),
});
