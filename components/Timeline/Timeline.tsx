import {
  Children,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type OlHTMLAttributes,
  type ReactElement,
} from "react";
import { IconButton } from "../IconButton/IconButton";
import type { TimelineStepProps } from "../TimelineStep/TimelineStep";
import "./Timeline.css";

export interface TimelineProps extends Omit<OlHTMLAttributes<HTMLOListElement>, "children"> {
  /** Name of the timeline announced to screen readers. Default: "Timeline". */
  label?: string;
  /** The steps, in chronological order: TimelineStep components only, at least 2. */
  children: ReactElement<TimelineStepProps>[];
}

type PanelState = "closed" | "open" | "closing";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Timeline({ label = "Timeline", children, className, ...rest }: TimelineProps) {
  const [panel, setPanel] = useState<PanelState>("closed");
  const openButton = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef(false);

  const list = (
    <ol className={["ds-timeline", className].filter(Boolean).join(" ")} aria-label={label} {...rest}>
      {Children.map(children, (step) => (
        <li className="ds-timeline-entry">{step}</li>
      ))}
    </ol>
  );

  // Close the panel; `focusBack` returns the focus to the open button (closing without choosing a step).
  const close = (focusBack: boolean) => {
    returnFocus.current = focusBack;
    setPanel((state) => (state === "open" ? "closing" : state));
  };

  // When the panel opens, focus goes to the selected step (or the first step).
  useEffect(() => {
    if (panel !== "open" || !panelRef.current) return;
    const selected = panelRef.current.querySelector<HTMLElement>('[aria-current="location"]');
    (selected ?? panelRef.current.querySelector<HTMLElement>(".ds-timeline-step-link"))?.focus();
  }, [panel]);

  // At desktop width (--breakpoint-desktop) the panel is not used: close it if the screen grows.
  useEffect(() => {
    if (panel === "closed") return;
    const desktop = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint-desktop").trim();
    const query = window.matchMedia(`(min-width: ${desktop})`);
    const onChange = () => query.matches && setPanel("closed");
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [panel]);

  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    // Focus stays inside the panel while it is open.
    if (event.key === "Tab" && panelRef.current) {
      const focusables = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  // Choosing a step closes the panel; the link then jumps to its card.
  const onPanelClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(".ds-timeline-step-link")) close(false);
  };

  // End of the closing animation (instant with reduced motion).
  const onAnimationEnd = () => {
    if (panel !== "closing") return;
    setPanel("closed");
    if (returnFocus.current) openButton.current?.querySelector("button")?.focus();
  };

  return (
    <div className="ds-timeline-root">
      {/* Desktop: the timeline next to the content */}
      <div className="ds-timeline-inline">{list}</div>

      {/* Below desktop: open button, then the panel over the page */}
      <div className="ds-timeline-toggle" ref={openButton}>
        <IconButton
          icon="timeline"
          label="Open the timeline"
          variant="primary"
          aria-haspopup="dialog"
          aria-expanded={panel === "open"}
          onClick={() => setPanel("open")}
        />
      </div>

      {panel !== "closed" && (
        <div className={`ds-timeline-layer ds-timeline-layer--${panel}`} onAnimationEnd={onAnimationEnd}>
          <div className="ds-timeline-overlay" aria-hidden="true" onClick={() => close(true)} />
          <div
            ref={panelRef}
            className="ds-timeline-panel"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            onKeyDown={onPanelKeyDown}
            onClick={onPanelClick}
          >
            <div className="ds-timeline-panel-header">
              <IconButton icon="close" label="Close the timeline" variant="tertiary" onClick={() => close(true)} />
            </div>
            {list}
          </div>
        </div>
      )}
    </div>
  );
}
