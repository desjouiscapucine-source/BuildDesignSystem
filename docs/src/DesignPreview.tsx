// Design preview tab (stage 1): shows the component's design preview in every state and lets the
// Design System Lead test any semantic token on each slot. Changes are saved to design/tokens.json.
import { useState, type CSSProperties } from "react";
import { tokens, tokenById, contrastRatio, textStyles, type Token } from "../../tokens/lib";
import { Select } from "@ds/components";
import type { ComponentDoc, DesignTokens, PreviewState, SlotType } from "./types";
import { readableName, readableToken } from "./readableName";

// Value of the "None" option (clears the token of a slot): not a token id, so an empty slot shows the placeholder.
const NONE = "none";

const states: PreviewState[] = ["default", "hover", "focus", "pressed", "disabled"];

// Tokens offered for each slot type (semantic tier only, except shadows: primitives and semantic shadows).
function optionsFor(type: SlotType): { id: string; label: string }[] {
  if (type === "text-style") return textStyles.map((style) => ({ id: style.name, label: readableName(style.name) }));
  const group = type === "shadow" ? "shadow" : type;
  return tokens
    .filter((token) => token.path[0] === group && (type === "shadow" || token.tier === "semantic"))
    .map((token) => ({ id: token.id, label: readableToken(token) }));
}

function cssVars(design: DesignTokens, values: Record<string, string>): CSSProperties {
  const vars: Record<string, string> = {};
  for (const [slot, { type }] of Object.entries(design.slots)) {
    const value = values[slot];
    if (!value) continue;
    if (type === "text-style") {
      for (const prop of ["family", "size", "weight", "line-height"])
        vars[`--preview-${slot}-${prop}`] = `var(--typography-${value}-${prop})`;
    } else {
      const token = tokenById.get(value);
      if (token) vars[`--preview-${slot}`] = `var(${token.cssVar})`;
    }
  }
  return vars as CSSProperties;
}

export function DesignPreview({ component }: { component: ComponentDoc }) {
  const initial = component.design!.tokens;
  const Preview = component.design!.Preview;
  const [design, setDesign] = useState<DesignTokens>(initial);
  const variantNames = Object.keys(design.variants);
  const [variant, setVariant] = useState(variantNames[0]);
  const [text, setText] = useState(design.text ?? "Label");
  const [status, setStatus] = useState<string | null>(null);

  const values = design.variants[variant] ?? {};
  // Components without interaction states (e.g. a timeline step) show a single, wide canvas.
  const shownStates = design.previewStates ?? states;
  // Default values of the variant, then state overrides, then variant-specific state overrides ("" = no token).
  const valuesFor = (state: PreviewState) => {
    const merged: Record<string, string> = {
      ...values,
      ...(design.states?.[state] ?? {}),
      ...(design.variantStates?.[variant]?.[state] ?? {}),
    };
    for (const key of Object.keys(merged)) if (merged[key] === "") delete merged[key];
    return merged;
  };

  async function save(change: Record<string, unknown>) {
    try {
      const response = await fetch("/api/design-tokens", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: component.folder, ...change }),
      });
      if (!response.ok) throw new Error(await response.text());
      setStatus("Saved to design/tokens.json");
    } catch {
      setStatus("Not saved: changes are saved only when the site runs with `npm run dev`.");
    }
  }

  function setSlot(slot: string, token: string) {
    setDesign({ ...design, variants: { ...design.variants, [variant]: { ...values, [slot]: token } } });
    save({ variant, slot, token });
  }

  const color = (slot: string, state: PreviewState): Token | undefined => tokenById.get(valuesFor(state)[slot]);

  return (
    <div className="design-preview">
      <p className="design-preview-note">
        <span className="ds-icon" aria-hidden="true">
          science
        </span>
        Design proposal — not the final code. Test tokens and content here before approving the spec.
      </p>

      {variantNames.length > 1 && (
        <div className="backlog-filters" role="group" aria-label="Variant">
          {variantNames.map((name) => (
            <button key={name} aria-pressed={variant === name} onClick={() => setVariant(name)}>
              {name}
            </button>
          ))}
        </div>
      )}

      <label className="icon-try">
        Content
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          onBlur={() => text !== design.text && save({ text })}
        />
      </label>

      {/* Each state keeps the width the component needs; the row scrolls horizontally when it does not fit. */}
      <div
        className={`design-preview-states${shownStates.length === 1 ? " single" : ""}`}
        tabIndex={0}
        role="group"
        aria-label="States (scroll horizontally)"
      >
        {shownStates.map((state) => (
          <figure key={state} style={design.previewMinWidth ? { minWidth: design.previewMinWidth } : undefined}>
            <div className="design-preview-canvas" style={cssVars(design, valuesFor(state))}>
              <Preview state={state} text={text} variant={variant} />
            </div>
            <figcaption>{state}</figcaption>
          </figure>
        ))}
      </div>

      {status && <p className="resolved">{status}</p>}

      <h3>Tokens — {variant}</h3>
      <table className="tokens">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Token</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(design.slots).map(([slot, { type, description }]) => {
            const token = tokenById.get(values[slot]);
            return (
              <tr key={slot}>
                <td>
                  <code>{slot}</code>
                  {description && <div className="resolved">{description}</div>}
                </td>
                <td>
                  <Select
                    label={readableName(slot)}
                    placeholder="Choose a token"
                    value={values[slot] ?? ""}
                    options={[
                      { value: NONE, label: "None" },
                      ...optionsFor(type).map((option) => ({ value: option.id, label: option.label })),
                    ]}
                    onChange={(next) => setSlot(slot, next === NONE ? "" : next)}
                  />
                </td>
                <td>
                  {type === "color" && token && <span className="swatch" style={{ background: `var(${token.cssVar})` }} />}{" "}
                  <span className="resolved">{token?.resolved ?? values[slot]}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {design.contrast && design.contrast.length > 0 && (
        <>
          <h3>Contrast (WCAG 2.2 AA)</h3>
          <table className="tokens">
            <thead>
              <tr>
                <th>Pair</th>
                <th>State</th>
                <th>Ratio</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {design.contrast.flatMap(({ foreground, background, min }) =>
                (["default", "disabled"] as PreviewState[]).map((state) => {
                  const fg = color(foreground, state);
                  const bg = color(background, state);
                  if (!fg || !bg) return null;
                  const ratio = contrastRatio(fg.resolved, bg.resolved);
                  const exempt = state === "disabled";
                  return (
                    <tr key={`${foreground}-${background}-${state}`}>
                      <td>
                        <code>{foreground}</code> on <code>{background}</code>
                      </td>
                      <td>{state}</td>
                      <td>
                        {ratio.toFixed(2)}:1 <span className="resolved">min {min}:1</span>
                      </td>
                      <td>{exempt ? "Exempt (disabled)" : ratio >= min ? "✓ Pass" : "✗ Fail"}</td>
                    </tr>
                  );
                }),
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
