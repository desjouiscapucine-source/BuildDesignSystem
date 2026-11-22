import type { HTMLAttributes } from "react";
import "./Avatar.css";

export type AvatarSize = "small" | "medium" | "large";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The person's full name. The initials are computed from it; without a name, the person icon is shown. */
  name?: string;
  /** Size: small next to body text and in lists, medium (default), large in a profile or page header. */
  size?: AvatarSize;
  /** Hidden from screen readers (default: true — the name is written next to the avatar). Set to false when the avatar is shown alone (e.g. a marker): it then announces the full name. */
  decorative?: boolean;
}

/** Initials: uppercase, first letter of the first and of the last word; one letter for a one-word name (spec). */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const letters = words.length === 1 ? [words[0]] : [words[0], words[words.length - 1]];
  return letters.map((word) => Array.from(word)[0]).join("").toUpperCase();
}

/** A round mark that stands for a person: their initials, or the person icon when the name is unknown. Not interactive (spec). */
export function Avatar({ name, size = "medium", decorative = true, className, ...rest }: AvatarProps) {
  const initials = name ? getInitials(name) : "";
  const announced = !decorative && initials !== "";
  const classes = ["ds-avatar", `ds-avatar--${size}`, className].filter(Boolean).join(" ");
  return (
    <span
      className={classes}
      {...(announced ? { role: "img", "aria-label": name!.trim() } : { "aria-hidden": true })}
      {...rest}
    >
      {initials ? (
        <span className="ds-avatar-initials" aria-hidden="true">
          {initials}
        </span>
      ) : (
        <span className="ds-icon ds-avatar-icon" aria-hidden="true">
          person
        </span>
      )}
    </span>
  );
}
