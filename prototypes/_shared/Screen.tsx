// One screen of a prototype, laid out like the pages of the documentation site:
// page header (title + subtitle) first, then the content blocks, 16px apart, inside a 24px page margin.
import type { ReactNode } from "react";

export interface ScreenProps {
  /** Title of the screen: 30 characters maximum, one line. */
  title: string;
  /** Subtitle under the title: 80 characters maximum, one line. */
  subtitle?: string;
  /** The content blocks of the screen, built with components from "@ds/components". */
  children: ReactNode;
}

export function Screen({ title, subtitle, children }: ScreenProps) {
  return (
    <main className="prototype-screen">
      <h1 className="ds-text-heading-1 prototype-title" title={title}>
        {title}
      </h1>
      {subtitle && (
        <p className="ds-text-lead prototype-subtitle" title={subtitle}>
          {subtitle}
        </p>
      )}
      {children}
    </main>
  );
}
