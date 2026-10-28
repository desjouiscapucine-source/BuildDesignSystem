import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import "./NavigationItem.css";

/** Nesting level: 0 = top level, 1 = child of a parent, 2 = child of a child parent… */
const LevelContext = createContext(0);

interface NavigationItemLinkBaseProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> {
  /** Icon before the label: a Material Symbols name (e.g. "dashboard"). Required at the top level, decorative. A child has no leading icon: ignored inside a parent. */
  icon?: string;
  /** The page the item leads to. */
  href: string;
  /** The label: a noun, same as the page title, 20 characters maximum. */
  children: ReactNode;
  label?: never;
}

/** Link: leads to a page. `selected` and `disabled` cannot be combined: the page displayed is always available. */
export type NavigationItemLinkProps = NavigationItemLinkBaseProps &
  (
    | { /** The item of the page currently displayed. */ selected?: boolean; disabled?: false }
    | { selected?: false; /** The page is not available (to avoid: prefer hiding the item). */ disabled: true }
  );

/** Parent: only opens and closes its children (never a page, never disabled). */
export interface NavigationItemParentProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled" | "type"> {
  /** Icon before the label: a Material Symbols name. Required at the top level, decorative. A child parent has no leading icon: ignored inside a parent. */
  icon?: string;
  /** The label: names the group of its children, 20 characters maximum. */
  label: string;
  /** The children: NavigationItem components (links or parents), 2 minimum. */
  children: ReactElement<NavigationItemProps> | ReactElement<NavigationItemProps>[];
  href?: never;
  selected?: never;
  disabled?: never;
}

export type NavigationItemProps = NavigationItemLinkProps | NavigationItemParentProps;

/** True when one of the items (at any level) is the page displayed. */
function containsSelected(children: ReactNode): boolean {
  return Children.toArray(children).some(
    (child) =>
      isValidElement<NavigationItemProps>(child) &&
      (child.props.selected === true || ("label" in child.props && containsSelected(child.props.children))),
  );
}

function ItemIcon({ icon }: { icon?: string }) {
  if (!icon) return null;
  return (
    <span className="ds-icon ds-navigation-item-icon" aria-hidden="true">
      {icon}
    </span>
  );
}

function NavigationItemLink({ icon, href, selected = false, disabled = false, children, className, ...rest }: NavigationItemLinkProps) {
  const level = useContext(LevelContext);
  const classes = ["ds-navigation-item", "ds-navigation-item--link", className].filter(Boolean).join(" ");
  return (
    <a
      className={classes}
      // A disabled item has no href: it cannot be reached with Tab nor activated.
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      // Selected item = page displayed: announced as the current page to screen readers.
      aria-current={selected ? "page" : undefined}
      {...rest}
    >
      {/* A child has no leading icon */}
      {level === 0 && <ItemIcon icon={icon} />}
      <span className="ds-navigation-item-label">{children}</span>
    </a>
  );
}

function NavigationItemParent({ icon, label, children, className, onClick, ...rest }: NavigationItemParentProps) {
  const level = useContext(LevelContext);
  const childSelected = containsSelected(children);
  // Closed by default; open when the page displayed is one of its children.
  const [open, setOpen] = useState(childSelected);
  useEffect(() => {
    if (childSelected) setOpen(true);
  }, [childSelected]);
  const listId = useId();
  const classes = [
    "ds-navigation-item",
    "ds-navigation-item--parent",
    // Closed with a selected child: the selected look keeps the current place visible.
    !open && childSelected && "ds-navigation-item--child-selected",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="ds-navigation-item-group">
      <button
        type="button"
        className={classes}
        aria-expanded={open}
        aria-controls={listId}
        onClick={(event) => {
          setOpen((value) => !value);
          onClick?.(event);
        }}
        {...rest}
      >
        {level === 0 && <ItemIcon icon={icon} />}
        <span className="ds-navigation-item-label">{label}</span>
        <span className="ds-icon ds-navigation-item-arrow" aria-hidden="true">
          expand_more
        </span>
      </button>
      {/* Children of a closed parent are hidden: not reachable with Tab */}
      <ul id={listId} className="ds-navigation-item-children" hidden={!open}>
        <LevelContext.Provider value={level + 1}>
          {Children.map(children, (child) => (
            <li className="ds-navigation-item-child">{child}</li>
          ))}
        </LevelContext.Provider>
      </ul>
    </div>
  );
}

/** A link in a navigation (`href`), or a parent (`label` + children) that opens and closes its children. */
export function NavigationItem(props: NavigationItemProps) {
  return "label" in props && props.label !== undefined ? (
    <NavigationItemParent {...(props as NavigationItemParentProps)} />
  ) : (
    <NavigationItemLink {...(props as NavigationItemLinkProps)} />
  );
}
