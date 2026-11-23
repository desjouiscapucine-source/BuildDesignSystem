// Lesson 5 (RAG, part 1): cut the documentation into pieces and turn each piece into numbers (an embedding).
// Run it again whenever the documentation or the tokens change: only the NEW or CHANGED pieces are sent to the API
// (the free tier allows 1000 texts a day), and the progress is saved after every batch.
// Writes scripts/assistant/index.json (not committed).
// Run from the project root: node --env-file=<file with GEMINI_API_KEY> scripts/assistant/06-build-index.mjs
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import { EMBEDDING_MODEL, readComponentDocs, readTokenPieces, withRetry } from "./lib.mjs";

const INDEX_FILE = new URL("./index.json", import.meta.url);

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
console.log(`${pieces.length} pieces cut from the components.`);

// The design tokens too (colors, typography, spacing...): the palettes are not in the component docs.
const tokenPieces = readTokenPieces();
pieces.push(...tokenPieces);
console.log(`${tokenPieces.length} pieces added from the tokens, ${pieces.length} in total.`);

// A piece already in the index (same text, same embedding model) keeps its numbers: no request needed.
let previous = [];
try {
  previous = JSON.parse(fs.readFileSync(INDEX_FILE, "utf-8"));
} catch {
  // no index yet
}
const known = new Map(
  previous
    .filter((piece) => (piece.model ?? "gemini-embedding-001") === EMBEDDING_MODEL)
    .map((piece) => [piece.text, piece.vector]),
);
for (const piece of pieces) {
  piece.model = EMBEDDING_MODEL;
  piece.vector = known.get(piece.text);
}
const missing = pieces.filter((piece) => !piece.vector);
console.log(`${pieces.length - missing.length} already indexed, ${missing.length} to compute.\n`);

// The index file only holds pieces that have their numbers, so it is always valid.
const save = () => fs.writeFileSync(INDEX_FILE, JSON.stringify(pieces.filter((piece) => piece.vector)));

// Step 2: the embedding of every missing piece, 50 at a time.
const ai = new GoogleGenAI({});

try {
  for (let i = 0; i < missing.length; i += 50) {
    const batch = missing.slice(i, i + 50);
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
    save();
    console.log(`${Math.min(i + 50, missing.length)} / ${missing.length} computed`);
  }
  save();
  console.log(`Index saved in scripts/assistant/index.json (${pieces.length} pieces).`);
} catch (error) {
  save();
  const done = pieces.filter((piece) => piece.vector).length;
  console.log(`\nStopped (error ${error.status}). Progress saved: ${done} / ${pieces.length} pieces indexed.`);
  console.log("Run this script again later: only the missing pieces will be computed.");
  process.exitCode = 1;
}
