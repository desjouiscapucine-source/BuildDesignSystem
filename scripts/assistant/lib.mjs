// Shared helpers for the assistant experiments (B178).
// Read-only access to the design system documentation: nothing here writes outside scripts/assistant/.
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { fileURLToPath } from "node:url";

// Project root (two folders above this file), so the scripts work from any folder.
export const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const COMPONENTS_DIR = path.join(ROOT, "components");

// Google renames and retires models often: change the name here only.
export const MODEL = "gemini-3.5-flash";
export const EMBEDDING_MODEL = "gemini-embedding-001";

// Every spec.md and guidelines.md of every component (templates starting with `_` are skipped).
export function readComponentDocs() {
  const docs = [];
  for (const entry of fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
    for (const file of ["spec.md", "guidelines.md"]) {
      const filePath = path.join(COMPONENTS_DIR, entry.name, file);
      if (fs.existsSync(filePath)) {
        docs.push({ component: entry.name, file, text: fs.readFileSync(filePath, "utf-8") });
      }
    }
  }
  return docs;
}

// The design tokens (primitives and semantic), as readable lines grouped into pieces:
//   --color-background-brand: {color.primary.600} = #795b55 — description
// A reference like {color.primary.600} is followed to its final value, so the answer can name it.
export function readTokenPieces() {
  const trees = ["primitives.json", "semantic.json"].map((file) => ({
    file,
    tree: JSON.parse(fs.readFileSync(path.join(ROOT, "tokens", file), "utf-8")),
  }));

  const lookup = (tokenPath) => {
    for (const { tree } of trees) {
      let node = tree;
      for (const key of tokenPath.split(".")) node = node?.[key];
      if (node?.$value !== undefined) return node;
    }
  };
  const resolve = (value) => {
    for (let hops = 0; hops < 5 && typeof value === "string" && /^\{.+\}$/.test(value); hops++) {
      const node = lookup(value.slice(1, -1));
      if (!node) break;
      value = node.$value;
    }
    return value;
  };
  const show = (value) => (typeof value === "object" ? JSON.stringify(value) : String(value));

  const entries = [];
  const walk = (node, trail, file) => {
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith("$") || !child || typeof child !== "object") continue;
      const next = [...trail, key];
      if (child.$value === undefined) {
        walk(child, next, file);
        continue;
      }
      let value = show(child.$value);
      const resolved = show(resolve(child.$value));
      if (resolved !== value) value += ` = ${resolved}`;
      entries.push({
        file,
        group: next[0] === "color" ? next.slice(0, 2).join(".") : next[0], // e.g. color.primary, space
        line: `--${next.join("-")}: ${value}${child.$description ? ` — ${child.$description}` : ""}`,
      });
    }
  };
  for (const { file, tree } of trees) walk(tree, [], file);

  const groups = new Map();
  for (const entry of entries) {
    const key = `${entry.file}|${entry.group}`;
    groups.set(key, [...(groups.get(key) ?? []), entry]);
  }
  const pieces = [];
  const PER_PIECE = 40;
  for (const [key, items] of groups) {
    const [file, group] = key.split("|");
    for (let i = 0; i < items.length; i += PER_PIECE) {
      const heading = items.length > PER_PIECE ? `${group} (${i / PER_PIECE + 1})` : group;
      pieces.push({
        source: `tokens / ${file}`,
        text:
          `[tokens / ${file}]\n## ${heading}\n` +
          "Design tokens (CSS custom properties), name: value, with the final value after =\n" +
          items.slice(i, i + PER_PIECE).map((item) => item.line).join("\n"),
      });
    }
  }
  return pieces;
}

// Retries when the API is busy (503) or the rate limit is hit (429), then gives up.
export async function withRetry(call, { tries = 4, waitMs = 5000 } = {}) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      return await call();
    } catch (error) {
      if (![429, 503].includes(error.status) || attempt === tries) throw error;
      // A daily quota will not come back in a few seconds: do not wait, stop at once.
      if (error.status === 429 && /per day/i.test(error.message)) throw error;
      console.log(`(API busy, retry ${attempt}/${tries - 1} in ${waitMs / 1000}s...)`);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }
}

// Terminal conversation: type a question, read the answer, type `exit` to stop.
export async function runChat(chat) {
  const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });
  while (true) {
    const question = await terminal.question("You: ");
    if (question === "exit") break;
    try {
      const start = Date.now();
      const response = await withRetry(() => chat.sendMessage({ message: question }));
      const seconds = ((Date.now() - start) / 1000).toFixed(1);
      console.log("AI:", response.text);
      console.log(`   [${response.usageMetadata?.promptTokenCount ?? "?"} tokens sent, ${seconds} s]\n`);
    } catch (error) {
      console.log(`AI unavailable (error ${error.status}). Try again in a few minutes.\n`);
    }
  }
  terminal.close();
}
