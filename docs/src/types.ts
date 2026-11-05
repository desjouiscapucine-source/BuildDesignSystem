import type { ComponentType, ReactNode } from "react";

export type Stage = "design" | "guidelines" | "code";

/** meta.json status: the current stage, or "complete" once the code stage is approved. */
export type Status = Stage | "complete";

export type Level = "atom" | "molecule" | "organism" | "template" | "page";

export interface Example {
  title: string;
  description?: string;
  render: () => ReactNode;
}

export type PreviewState = "default" | "hover" | "focus" | "pressed" | "disabled" | "visited";

export interface PreviewProps {
  state: PreviewState;
  text: string;
  /** The variant selected in the Design preview tab (name from design/tokens.json). */
  variant?: string;
}

export type SlotType = "color" | "space" | "radius" | "border-width" | "icon-size" | "shadow" | "text-style";

export interface DesignTokens {
  text?: string;
  slots: Record<string, { type: SlotType; description?: string }>;
  variants: Record<string, Record<string, string>>;
  states?: Partial<Record<PreviewState, Record<string, string>>>;
  /** States shown in the Design preview tab (default: all). */
  previewStates?: PreviewState[];
  /** Minimum width of each state canvas (CSS value, e.g. "440px"); the row scrolls horizontally. */
  previewMinWidth?: string;
  variantStates?: Record<string, Partial<Record<PreviewState, Record<string, string>>>>;
  contrast?: { foreground: string; background: string; min: number }[];
}

/** One entry of a component changelog (meta.json), newest first. */
export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string;
}

export interface ComponentDoc {
  slug: string;
  folder: string;
  name: string;
  description: string;
  level: Level;
  status: Status;
  /** Version X.Y: 0.0 while in progress, 1.0 once complete. */
  version: string;
  changelog: ChangelogEntry[];
  spec?: string;
  guidelines?: string;
  examples: Example[];
  /** Source files of the coded component (file name → content). */
  code: Record<string, string>;
  design?: { tokens: DesignTokens; Preview: ComponentType<PreviewProps> };
}
