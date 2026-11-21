import { useEffect, useId, useRef, useState } from "react";
import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { Tab } from "../Tab/Tab";
import "./Tabs.css";

export interface TabsItem {
  /** Unique id of the tab. */
  id: string;
  /** The label: names the content of the panel, one to three words, sentence case (Tab rules). */
  label: ReactNode;
  /** The content of the panel is not available yet. Keep at least two enabled tabs. */
  disabled?: boolean;
  /** The content of the panel, given by the page. */
  content: ReactNode;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onSelect"> {
  /** Required name of the tab list, read by screen readers: names the content (e.g. "Component documentation"). */
  label: string;
  /** Two to seven tabs. */
  tabs: TabsItem[];
  /** Id of the selected tab (controlled). */
  selected?: string;
  /** Id of the tab selected at first (uncontrolled). Default: the first enabled tab. */
  defaultSelected?: string;
  /** Called with the id of the tab the user selects. */
  onSelect?: (id: string) => void;
}

/** Keeps a tab visible inside the scrolling row, without scrolling the page. */
function scrollTabIntoView(list: HTMLElement | null, tab: HTMLElement | null | undefined) {
  if (!list || !tab) return;
  const left = tab.offsetLeft - list.offsetLeft;
  const right = left + tab.offsetWidth;
  if (left < list.scrollLeft) list.scrollLeft = left;
  else if (right > list.scrollLeft + list.clientWidth) list.scrollLeft = right - list.clientWidth;
}

/** A row of tabs that shows one panel of the page at a time. WAI-ARIA tabs pattern, automatic activation. */
export function Tabs({ label, tabs, selected, defaultSelected, onSelect, className, ...rest }: TabsProps) {
  const baseId = useId();
  const enabled = tabs.filter((tab) => !tab.disabled);
  const [internal, setInternal] = useState(defaultSelected ?? enabled[0]?.id);
  // A disabled tab is never the selected one (Tab: forbidden combination): fall back to the first enabled tab.
  const requested = tabs.find((tab) => tab.id === (selected ?? internal));
  const current = requested && !requested.disabled ? requested : enabled[0];

  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = (id: string) => `${baseId}-panel-${id}`;

  useEffect(() => {
    if (current) scrollTabIntoView(listRef.current, tabRefs.current[current.id]);
  }, [current?.id]);

  const select = (id: string) => {
    if (selected === undefined) setInternal(id);
    onSelect?.(id);
  };

  // Left / Right move to the previous / next enabled tab and select it (wrapping); Home / End go to the first / last.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!current || enabled.length === 0) return;
    const index = enabled.findIndex((tab) => tab.id === current.id);
    const last = enabled.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : undefined;
    if (next === undefined) return;
    event.preventDefault();
    const id = enabled[next].id;
    select(id);
    tabRefs.current[id]?.focus();
  };

  return (
    <div className={["ds-tabs", className].filter(Boolean).join(" ")} {...rest}>
      <div ref={listRef} className="ds-tabs-list" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {tabs.map((tab) => {
          const common = {
            ref: (element: HTMLButtonElement | null) => {
              tabRefs.current[tab.id] = element;
            },
            id: tabId(tab.id),
            // Only the selected panel is in the page: only the selected tab points to it.
            "aria-controls": tab.id === current?.id ? panelId(tab.id) : undefined,
            onClick: () => select(tab.id),
          };
          return tab.id === current?.id ? (
            <Tab key={tab.id} selected {...common}>
              {tab.label}
            </Tab>
          ) : (
            <Tab key={tab.id} disabled={tab.disabled} {...common}>
              {tab.label}
            </Tab>
          );
        })}
      </div>
      {current && (
        // Always focusable: Tab goes from the selected tab to the panel.
        <div className="ds-tabs-panel" role="tabpanel" id={panelId(current.id)} aria-labelledby={tabId(current.id)} tabIndex={0}>
          {current.content}
        </div>
      )}
    </div>
  );
}
