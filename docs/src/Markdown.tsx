import { marked } from "marked";

// Content comes from local files in this repository, so it is trusted.
export function Markdown({ source }: { source: string }) {
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: marked.parse(source, { async: false }) }} />;
}
