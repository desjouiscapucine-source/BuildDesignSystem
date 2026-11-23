// Level 2 — UX playground (B130): the coded components composed on a free canvas, in mobile, tablet and desktop frames.
// Assembled from the coded components Canvas, Frame, Panel, StickyNote (and Select, TextInput, Button for the panel).
// Decided by the Design System Lead (2026-11-22): a component is placed freely in its frame; the frame's 4 / 8 / 12 column grid is a guide.
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type DragEvent, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { Button, Canvas, Comment, Frame, IconButton, Panel, Select, StickyNote, Tabs, Tag, TextInput, type CommentThreadMessage, type FrameSize, type PanelTab } from "@ds/components";
import { tokenById } from "../../../tokens/lib";
import { components } from "../registry";
import type { ComponentDoc } from "../types";
import { tokenRows, tokenVars } from "../PlaygroundTab";
import { readableName, readableToken } from "../readableName";
import { textStyles } from "../../../tokens/lib";
import { playgrounds } from "../playgrounds";
import { defaultArgs, type PlaygroundArgs, type PlaygroundControl } from "../playground";

const px = (id: string) => parseFloat(tokenById.get(id)!.resolved);
// Width of each frame size, from the viewport tokens (same as the Frame component).
const frameWidth: Record<FrameSize, number> = {
  mobile: px("size.viewport-mobile"),
  tablet: px("size.viewport-tablet"),
  desktop: px("size.viewport-desktop"),
};
const frameLabel: Record<FrameSize, string> = { mobile: "Mobile", tablet: "Tablet", desktop: "Desktop" };
const frameSizes = Object.keys(frameWidth) as FrameSize[];
const GAP = px("space.64"); // space between two frames added one after the other
const MOVE_STEP = px("space.8"); // keyboard move of a placed component

// Components of the library: every coded component with a playground, except the ones that make up the playground itself.
const workspace = new Set(["canvas", "frame", "panel", "stickynote", "zoomcontrols"]);
const library = components.filter((c) => playgrounds[c.slug] && !workspace.has(c.slug));

interface FrameItem { id: string; name: string; size: FrameSize; x: number; y: number }
/** frameId null: the component is placed on the canvas itself, outside any frame. */
interface Placed {
  id: string;
  frameId: string | null;
  slug: string;
  args: PlaygroundArgs;
  /** Tokens tried on this component only: token row → approved token id (or text style), or "free:<value>" for a free value. */
  tokens: Record<string, string>;
  x: number;
  y: number;
}
interface Note { id: string; x: number; y: number; text: string; editing: boolean }
/** A free text (B176): written in a frame (frameId) or on the canvas outside any frame (frameId null). */
interface TextItem { id: string; frameId: string | null; x: number; y: number; text: string; style: string }
/** Text style of a new free text: one of the text styles of the design system (changed in Properties). */
const DEFAULT_TEXT_STYLE = "body";
/** A comment attached to a component or a frame: its marker sits on the top right corner of the target. */
interface CommentItem { id: string; targetKind: "placed" | "frame"; targetId: string; messages: CommentThreadMessage[]; resolved: boolean }
// The signed-in user: the site has no accounts yet, comments are written as the Design System Lead.
const ME = "Capucine Desjouis";
type Selection = { kind: "frame" | "placed" | "note" | "text"; id: string } | null;
/** What undo and redo restore: the additions, the moves and the deletions of the composition. */
interface Snapshot { frames: FrameItem[]; placed: Placed[]; notes: Note[]; texts: TextItem[]; comments: CommentItem[] }
const HISTORY_LIMIT = 100;

let counter = 0;
const newId = (prefix: string) => `${prefix}-${++counter}`;

/** One control of a placed component's Properties (text, boolean, select, number, date, icon). */
function Control({ name, control, value, onChange }: { name: string; control: PlaygroundControl; value: unknown; onChange: (value: string | number | boolean) => void }) {
  const label = name.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
  if (control.type === "boolean")
    return (
      <Select
        label={label}
        options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
        value={value ? "yes" : "no"}
        onChange={(next) => onChange(next === "yes")}
      />
    );
  if (control.type === "select")
    return <Select label={label} options={control.options.map((o) => ({ value: o, label: o }))} value={String(value)} onChange={onChange} />;
  if (control.type === "number")
    return <TextInput label={label} type="text" value={String(value)} onChange={(next) => onChange(Math.min(control.max, Math.max(control.min, Number(next) || control.min)))} />;
  return <TextInput label={label} value={String(value ?? "")} onChange={onChange} />;
}

const FREE = "__free";
const freePrefix = "free:";

/** The field of a comment being written: the text is the first message of the thread (Enter sends, Escape cancels). */
function CommentDraft({ onSend, onCancel }: { onSend: (text: string) => void; onCancel: () => void }) {
  const [text, setText] = useState("");
  const send = () => text.trim() && onSend(text.trim());
  return (
    <div className="ux-playground-comment-field" role="group" aria-label="New comment" onKeyDown={(e) => e.key === "Escape" && onCancel()} onPointerDown={(e) => e.stopPropagation()}>
      <TextInput label="Write a comment" value={text} onChange={setText} onKeyDown={(e) => e.key === "Enter" && send()} />
      <IconButton icon="send" label="Send the comment" disabled={!text.trim()} onClick={send} />
      <IconButton variant="tertiary" icon="close" label="Cancel the comment" onClick={onCancel} />
    </div>
  );
}

/** CSS custom properties of the tokens tried on one component: approved tokens, and free values (not approved). */
function itemVars(rows: ReturnType<typeof tokenRows>, tokens: Record<string, string>): CSSProperties {
  const approved = Object.fromEntries(Object.entries(tokens).filter(([, v]) => !v.startsWith(freePrefix)));
  const vars: Record<string, string> = tokenVars(rows, approved);
  for (const row of rows) {
    const choice = tokens[row.key];
    if (row.kind === "token" && choice?.startsWith(freePrefix) && choice.length > freePrefix.length) vars[row.token.cssVar] = choice.slice(freePrefix.length);
  }
  return vars as CSSProperties;
}

/** The tokens of a placed component's CSS, each replaceable on this component only: by an approved token or a free value. */
function TokenControls({ component, tried, onChange }: { component: ComponentDoc; tried: Record<string, string>; onChange: (next: Record<string, string>) => void }) {
  const rows = useMemo(() => tokenRows(component), [component]);
  if (rows.length === 0) return null;
  const free = Object.values(tried).filter((v) => v.startsWith(freePrefix) && v.length > freePrefix.length).length;
  return (
    <section className="ux-playground-tokens" aria-labelledby="ux-playground-tokens">
      <h3 id="ux-playground-tokens" className="ds-text-heading-5">Tokens</h3>
      <p className="ux-playground-empty">Change a token of this component only. A free value is not approved by the Design System Lead.</p>
      {rows.map((row) => {
        const current = row.kind === "token" ? row.token.id : row.name;
        const choice = tried[row.key];
        const isFree = choice?.startsWith(freePrefix);
        const value = isFree ? FREE : (choice ?? current);
        const set = (next: string | undefined) => {
          const { [row.key]: _, ...rest } = tried;
          onChange(next === undefined ? rest : { ...rest, [row.key]: next });
        };
        const options =
          row.kind === "token"
            ? row.options.map((option) => ({ value: option.id, label: readableToken(option) }))
            : textStyles.map((style) => ({ value: style.name, label: readableName(style.name) }));
        return (
          <div key={row.key} className="ux-playground-token">
            <Select
              label={row.kind === "token" ? readableToken(row.token) : readableName(row.name)}
              value={value}
              options={row.kind === "token" ? [...options, { value: FREE, label: "Free value" }] : options}
              onChange={(next) => set(next === FREE ? freePrefix : next === current ? undefined : next)}
            />
            {isFree && (
              <>
                <TextInput label="Free value" value={choice.slice(freePrefix.length)} onChange={(v) => set(freePrefix + v)} />
                <Tag tone="warning" icon="warning">Not approved</Tag>
              </>
            )}
          </div>
        );
      })}
      <Button variant="tertiary" icon="restart_alt" disabled={Object.keys(tried).length === 0} onClick={() => onChange({})}>
        Reset tokens{free > 0 ? ` (${free} free)` : ""}
      </Button>
    </section>
  );
}

// Token rows of each component, computed once.
const rowCache = new Map<string, ReturnType<typeof tokenRows>>();
const rowsBySlug = (slug: string) => {
  if (!rowCache.has(slug)) rowCache.set(slug, tokenRows(components.find((c) => c.slug === slug)!));
  return rowCache.get(slug)!;
};

export function PlaygroundPage() {
  const [zoom, setZoom] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [frames, setFrames] = useState<FrameItem[]>([]);
  const [placed, setPlaced] = useState<Placed[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [texts, setTexts] = useState<TextItem[]>([]);
  // The free text being written directly on the canvas or in its frame.
  const [editingText, setEditingText] = useState<string | null>(null);
  // A comment being written (action bar): its field sits at the corner of its target until it is sent or cancelled.
  const [draftComment, setDraftComment] = useState<{ targetKind: "placed" | "frame"; targetId: string } | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [openComment, setOpenComment] = useState<string | null>(null); // one comment open at a time
  const [markers, setMarkers] = useState<Record<string, { x: number; y: number }>>({});
  const [selection, setSelection] = useState<Selection>(null);
  const [tab, setTab] = useState<PanelTab>("library");
  // Section of a selected component: its tokens first (what the Design System Lead asked for), the last one used is kept.
  const [section, setSection] = useState("tokens");
  // The panel opens on its own when something is selected, so its Properties are never hidden (below desktop it starts collapsed).
  const [panelCollapsed, setPanelCollapsed] = useState<boolean | undefined>(undefined);
  const [history, setHistory] = useState<{ past: Snapshot[]; future: Snapshot[] }>({ past: [], future: [] });
  const canvasRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  // The canvas stops where the Panel starts (the Panel is resizable and collapsible), so its zoom controls stay visible.
  // The action bar sits under the canvas: the canvas stops where the bar starts.
  const [panelWidth, setPanelWidth] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const panel = workspaceRef.current?.querySelector<HTMLElement>(".ds-panel");
    const bar = barRef.current;
    if (!panel || !bar) return;
    const observer = new ResizeObserver(() => {
      setPanelWidth(panel.offsetWidth);
      setBarHeight(bar.offsetHeight);
    });
    observer.observe(panel);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);
  const drag = useRef<{ kind: "frame" | "placed" | "note" | "text"; id: string; startX: number; startY: number; x: number; y: number; grabX: number; grabY: number } | null>(null);
  const scale = zoom / 100;
  // Latest view, read by the window listeners of a drag and by the wheel listener.
  const view = useRef({ zoom, pan, scale });
  view.current = { zoom, pan, scale };

  // Wheel and trackpad (Canvas spec, Behavior): the wheel pans (Shift + wheel pans sideways), Ctrl / Cmd + wheel (pinch) zooms.
  // The Canvas component does not handle the wheel itself yet, so the page does.
  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;
    // Zoom around a point of the canvas, in steps of 10% (Canvas spec).
    const zoomAt = (next: number, clientX: number, clientY: number) => {
      const { zoom: z, pan: p } = view.current;
      next = Math.min(400, Math.max(10, next));
      if (next === z) return;
      const rect = element.getBoundingClientRect();
      const sx = clientX - rect.left;
      const sy = clientY - rect.top;
      const cx = (sx - p.x) / (z / 100);
      const cy = (sy - p.y) / (z / 100);
      view.current = { zoom: next, pan: { x: sx - cx * (next / 100), y: sy - cy * (next / 100) }, scale: next / 100 };
      setZoom(next);
      setPan(view.current.pan);
    };
    // A pinch sends many small deltas: they add up until they make a step.
    let pending = 0;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.ctrlKey || event.metaKey) {
        pending -= event.deltaY * (event.deltaMode === 1 ? 20 : 1);
        const steps = Math.trunc(pending / 10);
        if (steps !== 0) {
          pending -= steps * 10;
          zoomAt(view.current.zoom + steps * 10, event.clientX, event.clientY);
        }
        return;
      }
      const { pan: p } = view.current;
      const sideways = event.shiftKey && event.deltaX === 0;
      setPan({ x: p.x - (sideways ? event.deltaY : event.deltaX), y: p.y - (sideways ? 0 : event.deltaY) });
    };
    // Safari sends gesture events for the pinch instead of ctrl + wheel.
    type GestureEvent = Event & { scale: number; clientX: number; clientY: number };
    let gestureStart = 100;
    const onGestureStart = (event: Event) => {
      event.preventDefault();
      gestureStart = view.current.zoom;
    };
    const onGestureChange = (event: Event) => {
      event.preventDefault();
      const g = event as GestureEvent;
      zoomAt(Math.round((gestureStart * g.scale) / 10) * 10, g.clientX, g.clientY);
    };
    element.addEventListener("gesturestart", onGestureStart);
    element.addEventListener("gesturechange", onGestureChange);
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", onWheel);
      element.removeEventListener("gesturestart", onGestureStart);
      element.removeEventListener("gesturechange", onGestureChange);
    };
  }, []);

  // Marker of each comment: the top right corner of its target, measured in the content space of the canvas, so it follows the target.
  useLayoutEffect(() => {
    const workspace = workspaceRef.current;
    const content = workspace?.querySelector<HTMLElement>(".ds-canvas-content");
    if (!workspace || !content) return;
    const origin = content.getBoundingClientRect();
    const next: Record<string, { x: number; y: number }> = {};
    const targets = [...comments.map((c) => ({ key: c.id, ...c })), ...(draftComment ? [{ key: "draft", ...draftComment }] : [])];
    for (const c of targets) {
      const target =
        c.targetKind === "frame"
          ? workspace.querySelector<HTMLElement>(`[data-frame="${c.targetId}"] .ds-frame-container`)
          : workspace.querySelector<HTMLElement>(`[data-placed="${c.targetId}"]`);
      if (!target) continue;
      const rect = target.getBoundingClientRect();
      next[c.key] = { x: Math.round((rect.right - origin.left) / scale), y: Math.round((rect.top - origin.top) / scale) };
    }
    const same = Object.keys(next).length === Object.keys(markers).length && Object.entries(next).every(([id, m]) => markers[id]?.x === m.x && markers[id]?.y === m.y);
    if (!same) setMarkers(next);
  });

  // Undo / redo (B177): a snapshot is kept before each addition, move and deletion; the latest state is read from a ref.
  const latest = useRef<Snapshot>({ frames, placed, notes, texts, comments });
  latest.current = { frames, placed, notes, texts, comments };
  const record = () => setHistory((h) => ({ past: [...h.past, latest.current].slice(-HISTORY_LIMIT), future: [] }));
  const restore = (snapshot: Snapshot) => {
    setFrames(snapshot.frames);
    setPlaced(snapshot.placed);
    setNotes(snapshot.notes.map((n) => ({ ...n, editing: false })));
    setTexts(snapshot.texts);
    setEditingText(null);
    setDraftComment(null);
    setComments(snapshot.comments);
    const exists = (kind: "frame" | "placed" | "note" | "text", id: string) => (kind === "frame" ? snapshot.frames : kind === "placed" ? snapshot.placed : kind === "text" ? snapshot.texts : snapshot.notes).some((item) => item.id === id);
    setSelection((sel) => (sel && exists(sel.kind, sel.id) ? sel : null));
    setOpenComment((id) => (id && snapshot.comments.some((c) => c.id === id) ? id : null));
  };
  const undo = () => {
    const previous = history.past[history.past.length - 1];
    if (!previous) return;
    setHistory({ past: history.past.slice(0, -1), future: [latest.current, ...history.future] });
    restore(previous);
  };
  const redo = () => {
    const next = history.future[0];
    if (!next) return;
    setHistory({ past: [...history.past, latest.current], future: history.future.slice(1) });
    restore(next);
  };
  // Ctrl / Cmd + Z undoes, Ctrl / Cmd + Shift + Z (or Ctrl + Y) redoes, except while typing: the text field keeps its own undo.
  const shortcuts = useRef({ undo, redo });
  shortcuts.current = { undo, redo };
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      const key = event.key.toLowerCase();
      if (key === "z" || key === "y") {
        event.preventDefault();
        if (key === "y" || event.shiftKey) shortcuts.current.redo();
        else shortcuts.current.undo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Library action: opens the Library tab of the panel, unfolding the panel if needed.
  const openLibrary = () => {
    setTab("library");
    setPanelCollapsed(false);
  };
  // Comment action: starts a comment on the selected component or frame; its field takes the focus.
  const commentOnSelection = () => {
    if (selection?.kind !== "frame" && selection?.kind !== "placed") return;
    setOpenComment(null);
    setDraftComment({ targetKind: selection.kind, targetId: selection.id });
    window.setTimeout(() => workspaceRef.current?.querySelector<HTMLInputElement>(".ux-playground-comment-draft input")?.focus(), 0);
  };

  const addComment = (targetKind: "placed" | "frame", targetId: string, text: string) => {
    const comment = { id: newId("comment"), targetKind, targetId, messages: [{ name: ME, author: "me" as const, date: new Date(), text }], resolved: false };
    record();
    setComments((all) => [...all, comment]);
    setOpenComment(comment.id);
  };

  const select = (next: Selection) => {
    setSelection(next);
    if (next && next.kind !== "note") {
      setTab("properties");
      setPanelCollapsed(false);
    }
  };

  // Without a drop point, a frame goes right of the last one.
  const addFrame = (size: FrameSize, at?: { x: number; y: number }) => {
    const right = frames.reduce((max, f) => Math.max(max, f.x + frameWidth[f.size]), -GAP);
    const frame = { id: newId("frame"), name: `Screen ${frames.length + 1}`, size, x: at?.x ?? right + GAP, y: at?.y ?? GAP + GAP / 2 };
    record();
    setFrames([...frames, frame]);
    select({ kind: "frame", id: frame.id });
  };

  const addNote = (at?: { x: number; y: number }) => {
    // Without a drop point: above the first frame, or at the top left of the view on an empty canvas.
    const note = { id: newId("note"), x: at?.x ?? frames[0]?.x ?? -pan.x / scale + GAP, y: at?.y ?? (frames[0]?.y ?? GAP) - GAP, text: "", editing: true };
    record();
    setNotes([...notes, note]);
    setSelection({ kind: "note", id: note.id });
  };

  // A free text goes in the selected frame, or on the canvas; it is written right away, its style is changed in Properties.
  const addText = (frameId: string | null, at?: { x: number; y: number }) => {
    const x = at?.x ?? (frameId ? GAP / 4 : Math.round(-pan.x / scale + GAP));
    const y = at?.y ?? (frameId ? GAP / 4 : Math.round(-pan.y / scale + GAP * 2));
    const item = { id: newId("text"), frameId, x, y, text: "", style: DEFAULT_TEXT_STYLE };
    record();
    setTexts((all) => [...all, item]);
    select({ kind: "text", id: item.id });
    setEditingText(item.id);
  };

  // The frame that receives a component added without a drop: the selected one, or the first.
  const targetFrame = () => {
    const selectedFrame = selection?.kind === "frame" ? selection.id : selection?.kind === "placed" ? placed.find((p) => p.id === selection.id)?.frameId : selection?.kind === "text" ? texts.find((t) => t.id === selection.id)?.frameId : undefined;
    // No frame selected: the component goes on the canvas itself.
    return selectedFrame ?? null;
  };

  const place = (slug: string, frameId: string | null, x?: number, y?: number) => {
    // On the canvas: at the top left of the current view; in a frame: at its top left.
    x ??= frameId ? GAP / 4 : Math.round(-pan.x / scale + GAP);
    y ??= frameId ? GAP / 4 : Math.round(-pan.y / scale + GAP * 2);
    const item = { id: newId("component"), frameId, slug, args: defaultArgs(playgrounds[slug].controls), tokens: {}, x, y };
    record();
    setPlaced((all) => [...all, item]);
    select({ kind: "placed", id: item.id });
  };

  const remove = (selected: NonNullable<Selection>) => {
    // The comments of a removed frame or component are removed with it.
    record();
    setDraftComment(null);
    const gone = new Set(selected.kind === "frame" ? [selected.id, ...placed.filter((p) => p.frameId === selected.id).map((p) => p.id)] : [selected.id]);
    setComments((all) => all.filter((c) => !gone.has(c.targetId)));
    if (selected.kind === "frame") {
      setFrames((all) => all.filter((f) => f.id !== selected.id));
      setPlaced((all) => all.filter((p) => p.frameId !== selected.id));
      setTexts((all) => all.filter((t) => t.frameId !== selected.id));
    } else if (selected.kind === "placed") setPlaced((all) => all.filter((p) => p.id !== selected.id));
    else if (selected.kind === "text") setTexts((all) => all.filter((t) => t.id !== selected.id));
    else setNotes((all) => all.filter((n) => n.id !== selected.id));
    setSelection(null);
  };

  // Drag of a frame, a placed component or a note: the move is divided by the zoom. The listeners are on the window
  // (no pointer capture), so the click on a frame name still works. A component dropped over another container
  // (a frame, or the canvas) moves into it.
  const startDrag = (event: PointerEvent<HTMLElement>, kind: "frame" | "placed" | "note" | "text", id: string, x: number, y: number) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    const box = event.currentTarget.getBoundingClientRect();
    let recorded = false;
    drag.current = { kind, id, startX: event.clientX, startY: event.clientY, x, y, grabX: (event.clientX - box.left) / view.current.scale, grabY: (event.clientY - box.top) / view.current.scale };
    select({ kind, id });
    const onMove = (e: globalThis.PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      if (!recorded) {
        recorded = true;
        record();
      }
      const nx = Math.round(d.x + (e.clientX - d.startX) / view.current.scale);
      const ny = Math.round(d.y + (e.clientY - d.startY) / view.current.scale);
      if (d.kind === "frame") setFrames((all) => all.map((f) => (f.id === d.id ? { ...f, x: nx, y: ny } : f)));
      else if (d.kind === "placed") setPlaced((all) => all.map((p) => (p.id === d.id ? { ...p, x: p.frameId ? Math.max(0, nx) : nx, y: p.frameId ? Math.max(0, ny) : ny } : p)));
      else if (d.kind === "text") setTexts((all) => all.map((t) => (t.id === d.id ? { ...t, x: t.frameId ? Math.max(0, nx) : nx, y: t.frameId ? Math.max(0, ny) : ny } : t)));
      else setNotes((all) => all.map((n) => (n.id === d.id ? { ...n, x: nx, y: ny } : n)));
    };
    const onUp = (e: globalThis.PointerEvent) => {
      const d = drag.current;
      drag.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (!d || d.kind !== "placed") return;
      // Container under the pointer: a frame layer, or else the canvas.
      // An empty frame has no layer (the Frame shows its empty message): its screen is the container.
      const screen = document.elementsFromPoint(e.clientX, e.clientY).find((el) => el.classList.contains("ds-frame-screen")) as HTMLElement | undefined;
      const layer = screen?.querySelector<HTMLElement>(".ux-playground-layer") ?? screen;
      const target = screen?.closest<HTMLElement>("[data-frame]")?.dataset.frame ?? null;
      const canvas = canvasRef.current?.getBoundingClientRect();
      const { scale: sc, pan: pn } = view.current;
      setPlaced((all) =>
        all.map((p) => {
          if (p.id !== d.id || p.frameId === target) return p;
          if (layer) {
            const rect = layer.getBoundingClientRect();
            return { ...p, frameId: target, x: Math.max(0, Math.round((e.clientX - rect.left) / sc - d.grabX)), y: Math.max(0, Math.round((e.clientY - rect.top) / sc - d.grabY)) };
          }
          return { ...p, frameId: null, x: Math.round((e.clientX - (canvas?.left ?? 0) - pn.x) / sc - d.grabX), y: Math.round((e.clientY - (canvas?.top ?? 0) - pn.y) / sc - d.grabY) };
        }),
      );
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onPlacedKey = (event: KeyboardEvent<HTMLElement>, item: Placed) => {
    const moves: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      remove({ kind: "placed", id: item.id });
    } else if (moves[event.key]) {
      event.preventDefault();
      const [dx, dy] = moves[event.key];
      record();
      setPlaced((all) => all.map((p) => (p.id === item.id ? { ...p, x: p.x + dx * MOVE_STEP, y: p.y + dy * MOVE_STEP } : p)));
    }
  };

  // Leaving the text field: an empty text is removed.
  const stopEditingText = (item: TextItem) => {
    setEditingText(null);
    if (!item.text.trim()) setTexts((all) => all.filter((t) => t.id !== item.id));
  };

  const onTextKey = (event: KeyboardEvent<HTMLElement>, item: TextItem) => {
    if (editingText === item.id) return; // the text field handles its own keys
    if (event.key === "Enter") {
      event.preventDefault();
      setEditingText(item.id);
      return;
    }
    const moves: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      remove({ kind: "text", id: item.id });
    } else if (moves[event.key]) {
      event.preventDefault();
      const [dx, dy] = moves[event.key];
      record();
      setTexts((all) => all.map((t) => (t.id === item.id ? { ...t, x: t.x + dx * MOVE_STEP, y: t.y + dy * MOVE_STEP } : t)));
    }
  };

  // A component dragged from the library: dropped on a frame (in it) or on the canvas (outside any frame).
  // A frame size dragged from the library can only be dropped on the canvas.
  const onDrop = (event: DragEvent<HTMLElement>, frameId: string | null) => {
    // A free text dropped on a frame (in it) or on the canvas.
    if (event.dataTransfer.getData("text/x-ds-text") && (frameId || canvasRef.current)) {
      event.preventDefault();
      event.stopPropagation();
      if (frameId) {
        const screen = event.currentTarget.querySelector<HTMLElement>(".ds-frame-screen");
        const rect = (screen?.querySelector<HTMLElement>(".ux-playground-layer") ?? screen ?? event.currentTarget).getBoundingClientRect();
        addText(frameId, { x: Math.max(0, Math.round((event.clientX - rect.left) / scale)), y: Math.max(0, Math.round((event.clientY - rect.top) / scale)) });
      } else {
        const rect = canvasRef.current!.getBoundingClientRect();
        addText(null, { x: Math.round((event.clientX - rect.left - pan.x) / scale), y: Math.round((event.clientY - rect.top - pan.y) / scale) });
      }
      return;
    }
    const slug = event.dataTransfer.getData("text/x-ds-component");
    if (!slug || !playgrounds[slug]) {
      if (frameId || !canvasRef.current) return;
      const size = event.dataTransfer.getData("text/x-ds-frame") as FrameSize;
      if (!frameWidth[size]) return;
      event.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const at = { x: Math.round((event.clientX - rect.left - pan.x) / scale), y: Math.round((event.clientY - rect.top - pan.y) / scale) };
      addFrame(size, at);
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (frameId) {
      const screen = event.currentTarget.querySelector<HTMLElement>(".ds-frame-screen");
      const rect = (screen?.querySelector<HTMLElement>(".ux-playground-layer") ?? screen ?? event.currentTarget).getBoundingClientRect();
      place(slug, frameId, Math.max(0, Math.round((event.clientX - rect.left) / scale)), Math.max(0, Math.round((event.clientY - rect.top) / scale)));
    } else {
      const rect = canvasRef.current!.getBoundingClientRect();
      place(slug, null, Math.round((event.clientX - rect.left - pan.x) / scale), Math.round((event.clientY - rect.top - pan.y) / scale));
    }
  };

  // A placed component, in a frame or on the canvas: moved with the pointer or the arrow keys.
  const placedComponent = (item: Placed) => (
    <div
      key={item.id}
      data-placed={item.id}
      className={item.frameId ? "ux-playground-component" : "ux-playground-component ux-playground-component--canvas"}
      role="button"
      tabIndex={0}
      aria-pressed={selection?.kind === "placed" && selection.id === item.id}
      aria-label={`${components.find((c) => c.slug === item.slug)?.name}, placed component`}
      style={item.frameId ? { left: item.x, top: item.y } : undefined}
      onPointerDown={(e) => startDrag(e, "placed", item.id, item.x, item.y)}
      // The click must not reach the frame (it would select itself again, now that the component took the selection).
      onClick={(e) => e.stopPropagation()}
      onFocus={() => select({ kind: "placed", id: item.id })}
      onKeyDown={(e) => onPlacedKey(e, item)}
    >
      <div className="ux-playground-component-content" style={itemVars(rowsBySlug(item.slug), item.tokens)}>{playgrounds[item.slug].render(item.args)}</div>
    </div>
  );

  // A free text, in a frame or on the canvas: moved with the pointer or the arrow keys, like a placed component.
  const textElement = (item: TextItem) => (
    <div
      key={item.id}
      className={item.frameId ? "ux-playground-component" : "ux-playground-component ux-playground-component--canvas"}
      role="button"
      tabIndex={0}
      aria-pressed={selection?.kind === "text" && selection.id === item.id}
      aria-label={`${item.text}, free text`}
      style={item.frameId ? { left: item.x, top: item.y } : undefined}
      onPointerDown={(e) => editingText !== item.id && startDrag(e, "text", item.id, item.x, item.y)}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={() => setEditingText(item.id)}
      onFocus={() => select({ kind: "text", id: item.id })}
      onKeyDown={(e) => onTextKey(e, item)}
    >
      {editingText === item.id ? (
        <span className={`ds-text-${item.style} ux-playground-text-edit`} data-value={item.text}>
          <textarea
            className="ux-playground-text"
            aria-label="Free text"
            rows={1}
            autoFocus
            value={item.text}
            onChange={(e) => setTexts((all) => all.map((t) => (t.id === item.id ? { ...t, text: e.target.value } : t)))}
            onBlur={() => stopEditingText(item)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                e.currentTarget.blur();
              }
            }}
          />
        </span>
      ) : (
        <span className={`ds-text-${item.style} ux-playground-text`}>{item.text}</span>
      )}
    </div>
  );

  const selectedText = selection?.kind === "text" ? texts.find((t) => t.id === selection.id) : undefined;
  const selectedPlaced = selection?.kind === "placed" ? placed.find((p) => p.id === selection.id) : undefined;
  const selectedFrame = selection?.kind === "frame" ? frames.find((f) => f.id === selection.id) : undefined;

  const libraryTab: ReactNode = (
    <div className="ux-playground-library">
      <section aria-labelledby="library-frames">
        <h2 id="library-frames" className="ds-text-heading-5">Frames</h2>
        <ul>
          {frameSizes.map((size) => (
            <li key={size} className="ux-playground-library-item" draggable onDragStart={(e) => e.dataTransfer.setData("text/x-ds-frame", size)}>
              <span className="ux-playground-library-name">{frameLabel[size]}</span>
              <Button variant="tertiary" icon="add" aria-label={`Add a ${frameLabel[size].toLowerCase()} frame`} onClick={() => addFrame(size)}>
                Add
              </Button>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="library-annotations">
        <h2 id="library-annotations" className="ds-text-heading-5">Annotations</h2>
        <ul>
          <li className="ux-playground-library-item" draggable onDragStart={(e) => e.dataTransfer.setData("text/x-ds-text", "1")}>
            <span className="ux-playground-library-name">Free text</span>
            <Button variant="tertiary" icon="add" aria-label="Add a free text" onClick={() => addText(targetFrame())}>
              Add
            </Button>
          </li>
        </ul>
      </section>
      <section aria-labelledby="library-components">
        <h2 id="library-components" className="ds-text-heading-5">Components</h2>
        <ul>
          {library.map((c) => (
            <li key={c.slug} className="ux-playground-library-item" draggable onDragStart={(e) => e.dataTransfer.setData("text/x-ds-component", c.slug)}>
              <span className="ux-playground-library-name">{c.name}</span>
              <Button variant="tertiary" icon="add" aria-label={`Add ${c.name}`} onClick={() => place(c.slug, targetFrame())}>
                Add
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );

  let propertiesTab: ReactNode = <p className="ux-playground-empty">Select a component, a text or a frame to change it.</p>;
  if (selectedPlaced) {
    const { controls } = playgrounds[selectedPlaced.slug];
    propertiesTab = (
      <div className="ux-playground-properties">
        <h2 className="ds-text-heading-4">{components.find((c) => c.slug === selectedPlaced.slug)?.name}</h2>
        <Tabs
          label="Selected component"
          selected={section}
          onSelect={setSection}
          tabs={[
            {
              id: "tokens",
              label: "Tokens",
              content: (
                <TokenControls
                  key={selectedPlaced.id}
                  component={components.find((c) => c.slug === selectedPlaced.slug)!}
                  tried={selectedPlaced.tokens}
                  onChange={(tokens) => setPlaced((all) => all.map((p) => (p.id === selectedPlaced.id ? { ...p, tokens } : p)))}
                />
              ),
            },
            {
              id: "settings",
              label: "Settings",
              content: (
                <div className="ux-playground-properties">
                  {Object.entries(controls).map(([name, control]) => (
                    <Control
                      key={name}
                      name={name}
                      control={control}
                      value={selectedPlaced.args[name]}
                      onChange={(value) => setPlaced((all) => all.map((p) => (p.id === selectedPlaced.id ? { ...p, args: { ...p.args, [name]: value } } : p)))}
                    />
                  ))}
                </div>
              ),
            },
          ]}
        />
        <Button variant="danger" icon="delete" onClick={() => remove({ kind: "placed", id: selectedPlaced.id })}>
          Delete component
        </Button>
      </div>
    );
  } else if (selectedText) {
    propertiesTab = (
      <div className="ux-playground-properties">
        <h2 className="ds-text-heading-4">Free text</h2>
        <p className="ux-playground-empty">Write the text directly on the canvas: double-click it, or press Enter.</p>
        <Select
          label="Text style"
          options={textStyles.map((style) => ({ value: style.name, label: readableName(style.name) }))}
          value={selectedText.style}
          onChange={(style) => setTexts((all) => all.map((t) => (t.id === selectedText.id ? { ...t, style } : t)))}
        />
        <Button variant="danger" icon="delete" onClick={() => remove({ kind: "text", id: selectedText.id })}>
          Delete text
        </Button>
      </div>
    );
  } else if (selectedFrame) {
    propertiesTab = (
      <div className="ux-playground-properties">
        <h2 className="ds-text-heading-4">Frame</h2>
        <TextInput label="Name" value={selectedFrame.name} onChange={(name) => setFrames((all) => all.map((f) => (f.id === selectedFrame.id ? { ...f, name } : f)))} />
        <Select
          label="Size"
          options={frameSizes.map((s) => ({ value: s, label: frameLabel[s] }))}
          value={selectedFrame.size}
          onChange={(size) => setFrames((all) => all.map((f) => (f.id === selectedFrame.id ? { ...f, size: size as FrameSize } : f)))}
        />
        <Button variant="danger" icon="delete" onClick={() => remove({ kind: "frame", id: selectedFrame.id })}>
          Delete frame
        </Button>
      </div>
    );
  }

  return (
    <>
      <h1>UX playground</h1>
      <p className="lead">Compose the coded components in frames before a prototype</p>
      <div className="ux-playground" ref={workspaceRef}>
        <div className="ux-playground-canvas" style={{ right: panelWidth, bottom: barHeight }} ref={canvasRef} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, null)}>
          <Canvas
            zoom={zoom}
            onZoomChange={setZoom}
            panX={pan.x}
            panY={pan.y}
            onPanChange={(x, y) => setPan({ x, y })}
            onSelectionRectangle={() => setSelection(null)}
          >
            {frames.map((frame) => {
              const items = placed.filter((p) => p.frameId === frame.id);
              return (
                <div
                  key={frame.id}
                  className="ux-playground-placed"
                  data-frame={frame.id}
                  style={{ left: frame.x, top: frame.y }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDrop(e, frame.id)}
                  onPointerDown={(e) => {
                    // A frame moves from its label row (name and size), never from its content.
                    if ((e.target as HTMLElement).closest(".ds-frame-labels")) startDrag(e, "frame", frame.id, frame.x, frame.y);
                  }}
                >
                  <Frame
                    name={frame.name}
                    size={frame.size}
                    empty={items.length === 0 && !texts.some((t) => t.frameId === frame.id)}
                    selected={selection?.kind === "frame" && selection.id === frame.id}
                    onSelectedChange={(on) => select(on ? { kind: "frame", id: frame.id } : null)}
                  >
                    <div className="ux-playground-layer">
                      {items.map(placedComponent)}
                      {texts.filter((t) => t.frameId === frame.id).map(textElement)}
                    </div>
                  </Frame>
                </div>
              );
            })}
            {placed.filter((p) => p.frameId === null).map((item) => (
              <div key={item.id} className="ux-playground-placed" style={{ left: item.x, top: item.y }}>
                {placedComponent(item)}
              </div>
            ))}
            {texts.filter((t) => t.frameId === null).map((item) => (
              <div key={item.id} className="ux-playground-placed" style={{ left: item.x, top: item.y }}>
                {textElement(item)}
              </div>
            ))}
            {notes.map((note) => (
              <div
                key={note.id}
                className="ux-playground-placed"
                style={{ left: note.x, top: note.y }}
                onPointerDown={(e) => {
                  // A note moves even while it is empty (editing): from anywhere but its text box and its buttons.
                  // The focus stays in the text box (preventDefault), so the move does not end the editing, which would remove an empty note.
                  if ((e.target as HTMLElement).closest("button, textarea")) return;
                  if (note.editing) e.preventDefault();
                  startDrag(e, "note", note.id, note.x, note.y);
                }}
              >
                <StickyNote
                  text={note.text}
                  author="CD"
                  date={new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  selected={selection?.kind === "note" && selection.id === note.id}
                  editing={note.editing}
                  onSelectedChange={(on) => setSelection(on ? { kind: "note", id: note.id } : null)}
                  onEditingChange={(editing) => setNotes((all) => all.map((n) => (n.id === note.id ? { ...n, editing } : n)))}
                  onTextChange={(text) => setNotes((all) => all.map((n) => (n.id === note.id ? { ...n, text } : n)))}
                  onDelete={() => remove({ kind: "note", id: note.id })}
                  onMove={(direction) => {
                    record();
                    setNotes((all) =>
                      all.map((n) =>
                        n.id === note.id
                          ? { ...n, x: n.x + (direction === "left" ? -MOVE_STEP : direction === "right" ? MOVE_STEP : 0), y: n.y + (direction === "up" ? -MOVE_STEP : direction === "down" ? MOVE_STEP : 0) }
                          : n,
                      ),
                    );
                  }}
                />
              </div>
            ))}
            {draftComment && markers.draft && (
              <div className="ux-playground-placed ux-playground-comment ux-playground-comment-draft" style={{ left: markers.draft.x, top: markers.draft.y }}>
                <CommentDraft
                  onSend={(text) => {
                    addComment(draftComment.targetKind, draftComment.targetId, text);
                    setDraftComment(null);
                  }}
                  onCancel={() => setDraftComment(null)}
                />
              </div>
            )}
            {comments.map((c) =>
              markers[c.id] ? (
                <div
                  key={c.id}
                  className={openComment === c.id ? "ux-playground-placed ux-playground-comment ux-playground-comment--open" : "ux-playground-placed ux-playground-comment"}
                  style={{ left: markers[c.id].x, top: markers[c.id].y }}
                >
                  <Comment
                    messages={c.messages}
                    open={openComment === c.id}
                    onOpenChange={(open) => setOpenComment(open ? c.id : openComment === c.id ? null : openComment)}
                    selected={openComment === c.id}
                    resolved={c.resolved}
                    onResolvedChange={(resolved) => setComments((all) => all.map((x) => (x.id === c.id ? { ...x, resolved } : x)))}
                    onReply={(text) =>
                      setComments((all) => all.map((x) => (x.id === c.id ? { ...x, messages: [...x.messages, { name: ME, author: "me", date: new Date(), text }] } : x)))
                    }
                  />
                </div>
              ) : null,
            )}
          </Canvas>
        </div>
        <div className="ux-playground-actions" style={{ right: panelWidth }} ref={barRef} role="toolbar" aria-label="Playground actions">
          <IconButton variant="tertiary" icon="widgets" label="Open the Library" title="Library" onClick={openLibrary} />
          <IconButton variant="tertiary" icon="text_fields" label="Add a free text" title="Free text" onClick={() => addText(targetFrame())} />
          <IconButton variant="tertiary" icon="sticky_note_2" label="Add a sticky note" title="Sticky note" onClick={() => addNote()} />
          <IconButton
            variant="tertiary"
            icon="add_comment"
            label="Comment the selection"
            title={selection?.kind === "frame" || selection?.kind === "placed" ? "Comment" : "Comment (select a component or a frame)"}
            disabled={selection?.kind !== "frame" && selection?.kind !== "placed"}
            onClick={commentOnSelection}
          />
          <span className="ux-playground-actions-separator" aria-hidden="true" />
          <IconButton variant="tertiary" icon="undo" label="Undo" title="Undo (Ctrl or Cmd + Z)" disabled={history.past.length === 0} onClick={undo} />
          <IconButton variant="tertiary" icon="redo" label="Redo" title="Redo (Ctrl or Cmd + Shift + Z)" disabled={history.future.length === 0} onClick={redo} />
        </div>
        <Panel
          library={libraryTab}
          properties={propertiesTab}
          compositions={<p className="ux-playground-empty">No saved composition yet.</p>}
          selected={tab}
          onSelect={setTab}
          collapsed={panelCollapsed}
          onCollapsedChange={setPanelCollapsed}
        />
      </div>
    </>
  );
}
