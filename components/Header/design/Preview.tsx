// Header design preview (stage 1) — NOT the final component code.
// Parts: brand (the site logo + name) | search (TextInput type search) + the site's time-spent clock | actions (workspace button that will open a Menu of widgets, log in / log out toggle).
// Dividers between the parts are the coded Divider. Height: --size-header. The spaces links are not in the header.
// The clock is site content passed to the Header: it keeps the look of the site (docs.css, .shell-work-time).
import type { PreviewProps } from "../../../docs/src/types";
import logo from "../../../assets/logo/avatar-logo.svg";
import { Divider } from "../../Divider/Divider";
import { IconButton } from "../../IconButton/IconButton";
import { TextInput } from "../../TextInput/TextInput";

export function Preview({ text, state }: PreviewProps) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--preview-gap)",
        height: "var(--size-header)",
        boxSizing: "border-box",
        width: "100%",
        padding: "0 var(--preview-padding-x)",
        background: "var(--preview-background)",
        borderBottom: "var(--preview-border-width) solid var(--preview-border)",
        color: "var(--preview-text)",
      }}
    >
      <a
        href="#/components/header"
        aria-label={`${text}, home`}
        style={{
          color: "inherit",
          textDecoration: "none",
          outline: state === "focus" ? "var(--border-width-2) solid var(--color-border-focus)" : "none",
          outlineOffset: "var(--border-width-2)",
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--space-8)",
          fontFamily: "var(--preview-brand-family)",
          fontSize: "var(--preview-brand-size)",
          fontWeight: "var(--preview-brand-weight)",
          lineHeight: "var(--preview-brand-line-height)",
          whiteSpace: "nowrap",
        }}
      >
        <img src={logo} alt="" style={{ width: "var(--size-logo)", height: "var(--size-logo)" }} />
        {text}
      </a>
      <Divider orientation="vertical" style={{ height: "var(--space-32)", alignSelf: "center" }} />
      <TextInput type="search" placeholder="Search pages" />
      <p className="shell-work-time" style={{ marginRight: "auto" }}>
        <span className="shell-work-time-label">Time spent building</span>
        <span className="shell-work-time-screen">00:00:00</span>
      </p>
      <Divider orientation="vertical" style={{ height: "var(--space-32)", alignSelf: "center" }} />
      <IconButton variant="primary" icon="workspaces" label="Workspace" />
      <IconButton variant="tertiary" icon="login" label="Log in" />
    </header>
  );
}
