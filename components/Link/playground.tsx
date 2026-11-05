// Playground tab of the documentation site: the link live, inside a sentence, with a control per prop.
// The click is kept on the page, so hover, press and focus can be tried.
import { definePlayground, jsx } from "../../docs/src/playground";
import { Link } from "./Link";

export const playground = definePlayground({
  controls: {
    href: { type: "text", default: "#/governance", description: "Destination: another page, an anchor of the same page, or another site. Opens in the same tab." },
    children: { type: "text", default: "git workflow skill", description: "The label: says where the link goes, a few words, no final punctuation." },
  },
  render: ({ href, children }) => (
    <p className="ds-text-body" style={{ margin: 0, color: "var(--color-text-primary)" }}>
      Read the <Link href={href} onClick={(event) => event.preventDefault()}>{children}</Link> before you start.
    </p>
  ),
  code: ({ href, children }) => jsx("Link", { href }, children),
});
