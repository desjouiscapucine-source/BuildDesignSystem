// Playground tab of the documentation site: the component live, with a control per prop.
import { useState } from "react";
import { code, definePlayground, jsx } from "../../docs/src/playground";
import logo from "../../assets/logo/avatar-logo.svg";
import { IconButton } from "../IconButton/IconButton";
import { TextInput } from "../TextInput/TextInput";
import { Header } from "./Header";

function Demo({ name, menuOpen, search, info, actions }: { name: string; menuOpen: boolean; search: boolean; info: boolean; actions: boolean }) {
  const [open, setOpen] = useState(menuOpen);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Header
        brand={{ logo, name, href: "#/" }}
        menuOpen={open}
        onMenuClick={() => setOpen(!open)}
        search={search ? <TextInput type="search" placeholder="Search pages" /> : undefined}
        info={info ? <span style={{ whiteSpace: "nowrap" }}>Time spent building 00:00:00</span> : undefined}
        actions={
          actions ? (
            <>
              <IconButton variant="primary" icon="workspaces" label="Open workspace" />
              <IconButton variant="tertiary" icon="login" label="Log in" />
            </>
          ) : undefined
        }
      />
    </div>
  );
}

export const playground = definePlayground({
  controls: {
    brand: { type: "text", default: "BuildDesignSystem", description: "The name of the brand, next to the logo, on one line. Hidden below tablet." },
    menuOpen: { type: "boolean", default: false, description: "State of the burger, shown below desktop: the side navigation is open." },
    search: { type: "boolean", default: true, description: "The search field (a TextInput of type search). Here: shown or not." },
    info: { type: "boolean", default: true, description: "A content of the site next to the search (e.g. a clock). Here: shown or not. Hidden below desktop." },
    actions: { type: "boolean", default: true, description: "The actions: IconButtons, the log in / log out button last. Here: shown or not." },
  },
  render: ({ brand, menuOpen, search, info, actions }) => (
    <Demo key={String(menuOpen)} name={brand} menuOpen={menuOpen} search={search} info={info} actions={actions} />
  ),
  code: ({ brand, menuOpen, search, info, actions }) =>
    jsx("Header", {
      brand: code(`{ logo, name: ${JSON.stringify(brand)}, href: "/" }`),
      menuOpen: code(String(menuOpen)),
      onMenuClick: code("toggleMenu"),
      search: search ? code(`<TextInput type="search" placeholder="Search pages" />`) : "",
      info: info ? code("<Clock />") : "",
      actions: actions ? code("<>…</>") : "",
    }),
});
