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

// Retries when the API is busy (503) or the rate limit is hit (429), then gives up.
export async function withRetry(call, { tries = 4, waitMs = 5000 } = {}) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      return await call();
    } catch (error) {
      if (![429, 503].includes(error.status) || attempt === tries) throw error;
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
