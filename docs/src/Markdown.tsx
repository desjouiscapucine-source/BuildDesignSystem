import { marked } from "marked";

const withLinkClass = (html: string) => html.replace(/<a /g, '<a class="ds-link" ');

// Content comes from local files in this repository, so it is trusted.
// Links get the Link component styles (.ds-link, Link guidelines).
export function Markdown({ source }: { source: string }) {
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: withLinkClass(marked.parse(source, { async: false })) }} />;
}
