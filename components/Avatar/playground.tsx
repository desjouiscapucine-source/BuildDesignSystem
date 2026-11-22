// Playground tab of the documentation site: the avatar live, with a control per prop.
import { code as asCode, definePlayground, jsx } from "../../docs/src/playground";
import { Avatar, type AvatarSize } from "./Avatar";

export const playground = definePlayground({
  controls: {
    name: {
      type: "text",
      default: "Capucine Desjouis",
      description: "The person's full name. The initials are computed from it; without a name, the person icon is shown.",
    },
    size: {
      type: "select",
      options: ["small", "medium", "large"],
      default: "medium",
      description: "Size: small next to body text and in lists, medium (default), large in a profile or page header.",
    },
    decorative: {
      type: "boolean",
      default: true,
      description: "Hidden from screen readers (default: true — the name is written next to the avatar). Set to false when the avatar is shown alone: it then announces the full name.",
    },
  },
  render: ({ name, size, decorative }) => (
    <Avatar name={name || undefined} size={size as AvatarSize} decorative={decorative} />
  ),
  code: ({ name, size, decorative }) =>
    jsx("Avatar", { name, size: size === "medium" ? "" : size, decorative: decorative ? false : asCode("false") }),
});
