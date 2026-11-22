import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes, KeyboardEvent, PointerEvent, ReactNode } from "react";
import { IconButton } from "../IconButton/IconButton";
import { Tabs } from "../Tabs/Tabs";
import "./Panel.css";

// The three fixed tabs of the playground (spec.md, Anatomy): label and icon of the collapsed strip.
export type PanelTab = "library" | "properties" | "compositions";

const panelTabs: { id: PanelTab; label: string; icon: string }[] = [
  { id: "library", label: "Library", icon: "widgets" },
  { id: "properties", label: "Properties", icon: "tune" },
  { id: "compositions", label: "Compositions", icon: "dashboard" },
];

export interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, "onSelect"> {
  /** Content of the Library tab, given by the playground. An empty tab shows one short sentence (guidelines). */
  library?: ReactNode;
  /** Content of the Properties tab, given by the playground. */
  properties?: ReactNode;
  /** Content of the Compositions tab, given by the playground. */
  compositions?: ReactNode;
  /** The panel is folded into the strip of tab icons (controlled). Default: false; below desktop, always true when the page opens. */
  collapsed?: boolean;
  /** Called when the user collapses or expands the panel. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** The selected tab (controlled). Default: the last tab used, else "library". */
  selected?: PanelTab;
  /** Called with the tab the user selects. */
  onSelect?: (tab: PanelTab) => void;
}

// Browser preference (guidelines, Behavior): last tab, width and collapsed state.
const storageKey = "ds-panel";
interface Saved {
  tab?: PanelTab;
  width?: number;
  collapsed?: boolean;
}
function readSaved(): Saved {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? "{}") as Saved;
  } catch {
    return {};
  }
}
function save(change: Saved) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify({ ...readSaved(), ...change }));
  } catch {
    // Storage unavailable (private window): the panel still works, without memory.
  }
}

/** Value in px of a size token (e.g. --size-panel), read from the page. */
function tokenPx(element: Element, name: string) {
  return parseFloat((element.ownerDocument.defaultView ?? window).getComputedStyle(element).getPropertyValue(name)) || 0;
}

// --breakpoint-desktop (1024px)
const desktopQuery = "(min-width: 1024px)";
/** The window the panel is shown in (it can be an iframe, e.g. the Playground canvas). */
const viewOf = (element: Element | null) => element?.ownerDocument.defaultView ?? (typeof window === "undefined" ? null : window);
const isDesktopIn = (element: Element | null) => !!viewOf(element)?.matchMedia(desktopQuery).matches;

/** The right panel of the UX playground: Library, Properties and Compositions tabs, collapsible and resizable. */
export function Panel({
  library,
  properties,
  compositions,
  collapsed,
  onCollapsedChange,
  selected,
  onSelect,
  className,
  style,
  onKeyDown,
  ...rest
}: PanelProps) {
  const bodyId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const saved = useRef(typeof window === "undefined" ? {} : readSaved()).current;

  const [desktop, setDesktop] = useState(() => isDesktopIn(null));
  // Below desktop, the panel always opens collapsed, whatever was saved.
  const [internalCollapsed, setInternalCollapsed] = useState(() => (isDesktopIn(null) ? saved.collapsed ?? false : true));
  const [internalTab, setInternalTab] = useState<PanelTab>(saved.tab ?? "library");
  const [width, setWidth] = useState<number | undefined>(saved.width);
  const [resizing, setResizing] = useState(false);
  // Width bounds of the size tokens, read once the panel is in the page.
  const [limits, setLimits] = useState({ min: 0, max: 0, initial: 0, step: 0 });

  const isCollapsed = collapsed ?? internalCollapsed;
  const tab = selected ?? internalTab;

  // Once in the page, read the width of the window the panel is really shown in, before it is painted.
  useLayoutEffect(() => {
    const view = viewOf(panelRef.current);
    if (!view) return;
    const query = view.matchMedia(desktopQuery);
    setDesktop(query.matches);
    if (!query.matches) setInternalCollapsed(true);
    const change = () => setDesktop(query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);

  const setCollapsed = useCallback(
    (value: boolean) => {
      if (collapsed === undefined) setInternalCollapsed(value);
      // Only the desktop state is remembered: below desktop the panel always opens collapsed.
      if (isDesktopIn(panelRef.current)) save({ collapsed: value });
      onCollapsedChange?.(value);
    },
    [collapsed, onCollapsedChange],
  );

  const selectTab = (id: PanelTab) => {
    if (selected === undefined) setInternalTab(id);
    save({ tab: id });
    onSelect?.(id);
  };

  // The focus follows the panel (guidelines, Focus).
  const focusStripIcon = (id: PanelTab) =>
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>(`[data-panel-tab="${id}"]`)?.focus());
  const focusSelectedTab = () =>
    requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>(`[id="${CSS.escape(bodyId)}"] [role="tab"][aria-selected="true"]`)?.focus(),
    );

  const collapseWithFocus = () => {
    setCollapsed(true);
    focusStripIcon(tab);
  };

  const expandOn = (id: PanelTab) => {
    selectTab(id);
    setCollapsed(false);
    focusSelectedTab();
  };

  // Below desktop: the expanded panel collapses as soon as a click or the focus leaves it for the canvas;
  // the focus stays where the user sent it, so the focused element is never hidden.
  useEffect(() => {
    if (desktop || isCollapsed) return;
    const panel = panelRef.current;
    const outside = (target: EventTarget | null) => !!target && !!panel && "nodeType" in target && !panel.contains(target as Node);
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (outside(event.target)) setCollapsed(true);
    };
    const onFocusIn = (event: FocusEvent) => {
      if (outside(event.target)) setCollapsed(true);
    };
    const page = panel?.ownerDocument ?? document;
    page.addEventListener("pointerdown", onPointerDown);
    page.addEventListener("focusin", onFocusIn);
    return () => {
      page.removeEventListener("pointerdown", onPointerDown);
      page.removeEventListener("focusin", onFocusIn);
    };
  }, [desktop, isCollapsed, setCollapsed]);

  // --- Resize (desktop only) ---
  useEffect(() => {
    const element = panelRef.current;
    if (!element) return;
    setLimits({
      min: tokenPx(element, "--size-panel-min"),
      max: tokenPx(element, "--size-panel-max"),
      initial: tokenPx(element, "--size-panel"),
      step: tokenPx(element, "--space-8"),
    });
  }, []);
  const bounds = () => limits;
  const clamp = (value: number) => {
    const { min, max } = bounds();
    return Math.min(max, Math.max(min, Math.round(value)));
  };
  const applyWidth = (value: number) => {
    const next = clamp(value);
    setWidth(next);
    save({ width: next });
  };
  const currentWidth = () => width ?? bounds().initial;

  const onHandlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setResizing(true);
  };
  const onHandlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!resizing || !panelRef.current) return;
    // The panel is on the right: its width is the distance from the pointer to its right edge.
    applyWidth(panelRef.current.getBoundingClientRect().right - event.clientX);
  };
  const onHandlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setResizing(false);
  };
  const onHandleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { step } = bounds();
    // Left makes the panel wider (its left edge moves left), Right makes it narrower.
    if (event.key === "ArrowLeft") applyWidth(currentWidth() + step);
    else if (event.key === "ArrowRight") applyWidth(currentWidth() - step);
    else return;
    event.preventDefault();
  };

  const onPanelKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    // Escape collapses the expanded panel below desktop only.
    if (event.key === "Escape" && !desktop && !isCollapsed) {
      event.preventDefault();
      collapseWithFocus();
    }
  };

  const content: Record<PanelTab, ReactNode> = { library, properties, compositions };
  const resizable = desktop && !isCollapsed;
  const panelStyle =
    resizable && width !== undefined ? ({ ...style, "--ds-panel-width": `${width}px` } as CSSProperties) : style;

  const classes = [
    "ds-panel",
    isCollapsed ? "ds-panel--collapsed" : "ds-panel--expanded",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside
      ref={panelRef}
      aria-label="Playground panel"
      className={classes}
      style={panelStyle}
      data-resizing={resizing || undefined}
      onKeyDown={onPanelKeyDown}
      {...rest}
    >
      {resizable && (
        <div
          className="ds-panel-handle"
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize the panel"
          aria-valuenow={Math.round(currentWidth())}
          aria-valuemin={limits.min}
          aria-valuemax={limits.max}
          tabIndex={0}
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          onPointerCancel={onHandlePointerUp}
          onDoubleClick={() => applyWidth(bounds().initial)}
          onKeyDown={onHandleKeyDown}
        >
          <span className="ds-icon ds-panel-handle-icon" aria-hidden="true">
            drag_indicator
          </span>
        </div>
      )}

      {/* The content stays in the page while collapsed, so aria-controls always points to an element. */}
      <div id={bodyId} className="ds-panel-body" hidden={isCollapsed}>
        {/* Before the tabs in the focus order (guidelines): handle → collapse button → tabs → content. */}
        <IconButton
          className="ds-panel-collapse"
          variant="tertiary"
          icon="right_panel_close"
          label="Collapse the panel"
          aria-expanded={true}
          aria-controls={bodyId}
          onClick={collapseWithFocus}
        />
        <Tabs
          label="Playground tools"
          selected={tab}
          onSelect={(id) => selectTab(id as PanelTab)}
          tabs={panelTabs.map(({ id, label }) => ({ id, label, content: content[id] }))}
        />
      </div>

      {isCollapsed && (
        <div className="ds-panel-strip">
          {panelTabs.map(({ id, label, icon }) => (
            <IconButton
              key={id}
              data-panel-tab={id}
              variant="tertiary"
              icon={icon}
              label={`Open ${label}`}
              aria-expanded={false}
              aria-controls={bodyId}
              onClick={() => expandOn(id)}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
