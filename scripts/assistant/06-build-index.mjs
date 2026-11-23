// Lesson 5 (RAG, part 1): cut the documentation into pieces and turn each piece into numbers (an embedding).
// Done once; run it again whenever the documentation changes. Writes scripts/assistant/index.json (not committed).
// Run from the project root: node --env-file=<file with GEMINI_API_KEY> scripts/assistant/06-build-index.mjs
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import { EMBEDDING_MODEL, readComponentDocs, withRetry } from "./lib.mjs";

// Step 1: one piece per "## " heading of every spec and guidelines file.
const pieces = [];
for (const doc of readComponentDocs()) {
  for (const part of doc.text.split(/\n(?=## )/)) {
    if (part.trim().length < 40) continue;
    pieces.push({
      source: `${doc.component} / ${doc.file}`,
      // The source is repeated inside the text: it helps the search and the citations.
      text: `[${doc.component} / ${doc.file}]\n${part.trim()}`,
    });
  }
}
console.log(`${pieces.length} pieces cut.`);

// Step 2: the embedding of every piece, 50 at a time.
const ai = new GoogleGenAI({});

for (let i = 0; i < pieces.length; i += 50) {
  const batch = pieces.slice(i, i + 50);
  const response = await withRetry(
    () =>
      ai.models.embedContent({
        model: EMBEDDING_MODEL,
        contents: batch.map((piece) => piece.text),
        config: { taskType: "RETRIEVAL_DOCUMENT", outputDimensionality: 768 },
      }),
    { tries: 5, waitMs: 15000 },
  );
  batch.forEach((piece, j) => (piece.vector = response.embeddings[j].values));
  console.log(`${Math.min(i + 50, pieces.length)} / ${pieces.length} indexed`);
}

fs.writeFileSync(new URL("./index.json", import.meta.url), JSON.stringify(pieces));
console.log("Index saved in scripts/assistant/index.json");
