// Playground tab of the documentation site: the TextInput live, with a control per prop.
// Forbidden combinations are left out: a label wins over a placeholder; icon for `text` only;
// no help text for `search`; error and required ignored when disabled.
import { useEffect, useState } from "react";
import { definePlayground, jsx } from "../../docs/src/playground";
import { TextInput, type TextInputProps, type TextInputType } from "./TextInput";

/** Keeps the typed value, and starts again from the control when it changes. */
function Live({ initial, ...props }: Omit<TextInputProps, "value" | "onChange"> & { initial: string }) {
  const [value, setValue] = useState(initial);
  useEffect(() => setValue(initial), [initial]);
  return <TextInput {...(props as TextInputProps)} value={value} onChange={setValue} />;
}

export const playground = definePlayground({
  controls: {
    type: { type: "select", options: ["text", "search", "number"], default: "text", description: "Type of the field." },
    label: { type: "text", default: "", description: "Names the field: a noun, 25 characters maximum. Either a label or a placeholder." },
    placeholder: { type: "text", default: "Enter a name", description: "A verb and a noun. Ignored when a label is set." },
    icon: { type: "icon", default: "", optional: true, description: "Icon before the text (text type only): recalls the field. Decorative." },
    helpText: { type: "text", default: "Shown on the component page", description: "Help text under the field (not for search)." },
    error: { type: "text", default: "", description: "Error message: names the field and says how to fix it. Ignored when disabled." },
    required: { type: "boolean", default: false, description: "The field must be filled. No visual mark. Ignored when disabled." },
    disabled: { type: "boolean", default: false, description: "The field cannot be used." },
    value: { type: "text", default: "", description: "The value." },
  },
  render: ({ type, label, placeholder, icon, helpText, error, required, disabled, value }) => {
    const t = type as TextInputType;
    const props = {
      type: t,
      ...(label ? { label } : { placeholder: placeholder || "Enter a name" }),
      icon: t === "text" && icon ? icon : undefined,
      helpText: t !== "search" && helpText ? helpText : undefined,
      ...(disabled ? { disabled: true } : { error: error || undefined, required }),
    } as Omit<TextInputProps, "value" | "onChange">;
    return (
      <div style={{ width: "320px", maxWidth: "100%" }}>
        <Live key={`${t}-${disabled}`} initial={value} {...props} />
      </div>
    );
  },
  code: ({ type, label, placeholder, icon, helpText, error, required, disabled, value }) =>
    jsx("TextInput", {
      type: type === "text" ? "" : type,
      label,
      placeholder: label ? "" : placeholder,
      icon: type === "text" ? icon : "",
      helpText: type === "search" ? "" : helpText,
      error: disabled ? "" : error,
      required: disabled ? false : required,
      disabled,
      value,
    }),
});
