// Foundations categories (navigation skill): one page per category, in the order of the skill.
// `groups` are the first segment of the token paths shown on the page (primitive and semantic).
export interface Foundation {
  slug: string;
  label: string;
  icon: string;
  lead: string; // page subtitle: 80 characters max (page-header skill)
  groups: string[];
}

export const foundations: Foundation[] = [
  { slug: "color", label: "Color", icon: "palette", lead: "Palettes, color roles, state layers and contrast", groups: ["color", "state-layer"] },
  {
    slug: "typography",
    label: "Typography",
    icon: "text_fields",
    lead: "Font families, weights, sizes, line heights and text styles",
    groups: ["font-family", "font-weight", "font-size", "line-height"],
  },
  { slug: "spacing", label: "Spacing", icon: "space_bar", lead: "Spacing scale on an 8px grid", groups: ["space"] },
  { slug: "radius", label: "Radius", icon: "rounded_corner", lead: "Corner radius values", groups: ["radius"] },
  { slug: "border-width", label: "Border width", icon: "line_weight", lead: "Border width values", groups: ["border-width"] },
  { slug: "shadows", label: "Shadows", icon: "gradient", lead: "Elevation shadows, raw and by usage", groups: ["shadow"] },
  { slug: "motion", label: "Motion", icon: "animation", lead: "Durations and easings", groups: ["duration", "easing"] },
  { slug: "opacity", label: "Opacity", icon: "opacity", lead: "Opacity values", groups: ["opacity"] },
  { slug: "size", label: "Size", icon: "straighten", lead: "Fixed sizes, named by usage", groups: ["size"] },
  { slug: "breakpoints", label: "Breakpoints", icon: "devices", lead: "Screen widths where the layout changes", groups: ["breakpoint"] },
  { slug: "layout-grid", label: "Layout grid", icon: "grid_view", lead: "Columns, gutters and margins for every screen size", groups: ["grid"] },
  { slug: "z-index", label: "Z-index", icon: "layers", lead: "Stacking order, by usage", groups: ["z-index"] },
  { slug: "icons", label: "Icons", icon: "interests", lead: "Material Symbols Outlined, weight 400, always unfilled.", groups: ["icon-size"] },
];
