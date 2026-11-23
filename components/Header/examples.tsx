// Live examples shown on the component's documentation page.
import { useState, type CSSProperties } from "react";
import type { Example } from "../../docs/src/types";
import logo from "../../assets/logo/avatar-logo.svg";
import { IconButton } from "../IconButton/IconButton";
import { TextInput } from "../TextInput/TextInput";
import { Header } from "./Header";

const brand = { logo, name: "BuildDesignSystem", href: "#/" };
// The Header is fixed at the top of its container: here the container is the Header itself, so it does not follow the page.
const frame: CSSProperties = { position: "relative", width: "100%" };

function Bar({ children }: { children: (open: boolean, toggle: () => void) => React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div style={frame}>{children(open, () => setOpen(!open))}</div>;
}

const info = <span style={{ whiteSpace: "nowrap" }}>Time spent building 00:00:00</span>;
const actions = (
  <>
    <IconButton variant="primary" icon="workspaces" label="Open workspace" />
    <IconButton variant="tertiary" icon="login" label="Log in" />
  </>
);

export const examples: Example[] = [
  {
    title: "All parts",
    description: "Brand, search, information and actions. Below desktop the burger shows and the information is hidden.",
    render: () => (
      <Bar>
        {(open, toggle) => (
          <Header
            brand={brand}
            menuOpen={open}
            onMenuClick={toggle}
            search={<TextInput type="search" placeholder="Search pages" />}
            info={info}
            actions={actions}
          />
        )}
      </Bar>
    ),
  },
  {
    title: "Brand only",
    description: "The optional parts are absent; the burger is still there below desktop.",
    render: () => (
      <Bar>{(open, toggle) => <Header brand={brand} menuOpen={open} onMenuClick={toggle} />}</Bar>
    ),
  },
  {
    title: "Search and actions",
    description: "Without the information.",
    render: () => (
      <Bar>
        {(open, toggle) => (
          <Header
            brand={brand}
            menuOpen={open}
            onMenuClick={toggle}
            search={<TextInput type="search" placeholder="Search pages" />}
            actions={actions}
          />
        )}
      </Bar>
    ),
  },
  {
    title: "Logged in",
    description: "The log in / log out button is last, and its icon changes with the state.",
    render: () => (
      <Bar>
        {(open, toggle) => (
          <Header
            brand={brand}
            menuOpen={open}
            onMenuClick={toggle}
            actions={
              <>
                <IconButton variant="primary" icon="workspaces" label="Open workspace" />
                <IconButton variant="tertiary" icon="logout" label="Log out" />
              </>
            }
          />
        )}
      </Bar>
    ),
  },
];
