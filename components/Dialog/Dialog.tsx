import { useEffect, useId, useRef, useState, type HTMLAttributes, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { IconButton } from "../IconButton/IconButton";
import "./Dialog.css";

// Variant properties: names and values exactly as approved in spec.md.
export type DialogSize = "small" | "medium" | "large";

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  /** Maximum width of the dialog. Default: "medium". */
  size?: DialogSize;
  /** Whether the dialog is shown. */
  open: boolean;
  /** Called by the close button, the Escape key and a click on the overlay. */
  onClose: () => void;
  /** Title of the dialog. Wraps when long. */
  title: string;
  /** Text under the title. Wraps when long. */
  description: string;
  /** The body (optional): any content. Only the body scrolls when the content is long. */
  children?: ReactNode;
  /** The action Buttons of the footer (optional): 2 at most, `Cancel` then the main action. */
  footer?: ReactNode;
}

type DialogState = "closed" | "open" | "closing";

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Dialog({ size = "medium", open, onClose, title, description, children, footer, className, ...rest }: DialogProps) {
  const [state, setState] = useState<DialogState>(open ? "open" : "closed");
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  // Open / close: remember what had the focus, and keep the dialog on screen during the fade out.
  useEffect(() => {
    if (open) {
      opener.current = document.activeElement as HTMLElement | null;
      setState("open");
    } else {
      setState((previous) => (previous === "open" ? "closing" : previous));
    }
  }, [open]);

  // On opening, the focus goes to the close button.
  useEffect(() => {
    if (state === "open") dialog.current?.querySelector<HTMLElement>(".ds-dialog-close")?.focus();
  }, [state]);

  // The page behind cannot scroll while the dialog is shown.
  useEffect(() => {
    if (state === "closed") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [state]);

  const finishClosing = () => {
    if (state !== "closing") return;
    setState("closed");
    opener.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "Tab" && dialog.current) {
      // The focus stays inside the dialog.
      const focusables = [...dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
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

  // A click on the overlay (outside the dialog) closes it.
  const onOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  if (state === "closed") return null;

  const classes = ["ds-dialog", `ds-dialog--${size}`, `ds-dialog--${state}`].join(" ");

  return (
    <div className={classes} onMouseDown={onOverlayClick} onKeyDown={onKeyDown} onAnimationEnd={finishClosing}>
      <div
        ref={dialog}
        className={["ds-dialog-container", className].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        {...rest}
      >
        <div className="ds-dialog-header">
          <div className="ds-dialog-heading">
            <h2 id={titleId} className="ds-dialog-title">
              {title}
            </h2>
            <p id={descriptionId} className="ds-dialog-description">
              {description}
            </p>
          </div>
          <IconButton className="ds-dialog-close" variant="tertiary" icon="close" label="Close" onClick={onClose} />
        </div>
        {children != null && children !== false && <div className="ds-dialog-body">{children}</div>}
        {footer != null && footer !== false && <div className="ds-dialog-footer">{footer}</div>}
      </div>
    </div>
  );
}
