// Lesson 6 (RAG, part 2): the chatbot searches the index and sends the LLM only the closest pieces.
// Needs index.json: run 06-build-index.mjs first (again whenever the documentation changes).
// Run from the project root: node --env-file=<file with GEMINI_API_KEY> scripts/assistant/07-chatbot-rag.mjs
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import readline from "node:readline/promises";
import { EMBEDDING_MODEL, MODEL, withRetry } from "./lib.mjs";

const PIECES_SENT = 6; // how many pieces of documentation the LLM receives for each question

const index = JSON.parse(fs.readFileSync(new URL("./index.json", import.meta.url), "utf-8"));
console.log(`${index.length} pieces loaded.\n`);

const ai = new GoogleGenAI({});

// How close two embeddings are: 1 = same meaning, close to 0 = unrelated.
function similarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Step 3: the embedding of the question, compared to every piece; the closest ones are kept.
async function findPieces(question) {
  const response = await withRetry(() =>
    ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: question,
      config: { taskType: "RETRIEVAL_QUERY", outputDimensionality: 768 },
    }),
  );
  const questionVector = response.embeddings[0].values;
  return index
    .map((piece) => ({ ...piece, score: similarity(questionVector, piece.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, PIECES_SENT);
}

const RULES =
  "You are the assistant of the design system. Always answer in French, short and simple. " +
  "Answer ONLY from the pieces of documentation below, and name the component concerned. " +
  "The documentation is in English but the questions are in French: look for the equivalent words. " +
  "The pieces are only a selection: if the answer is not in them, say « Ce n'est pas dans les extraits que j'ai trouvés » without inventing.";

const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });

while (true) {
  const question = await terminal.question("You: ");
  if (question === "exit") break;
  try {
    const start = Date.now();
    const pieces = await findPieces(question);

    // Step 4: only these pieces go to the LLM, with the question.
    const response = await withRetry(() =>
      ai.models.generateContent({
        model: MODEL,
        contents: question,
        config: {
          systemInstruction: RULES + "\n\n" + pieces.map((piece) => piece.text).join("\n\n---\n\n"),
        },
      }),
    );
    const seconds = ((Date.now() - start) / 1000).toFixed(1);

    console.log("\nPieces found:");
    for (const piece of pieces) {
      const [source, heading] = piece.text.split("\n");
      console.log(`   ${piece.score.toFixed(2)}  ${source} ${heading}`);
    }
    console.log("\nAI:", response.text);
    console.log(`   [${response.usageMetadata?.promptTokenCount ?? "?"} tokens sent, ${seconds} s]\n`);
  } catch (error) {
    console.log(`AI unavailable (error ${error.status}). Try again in a few minutes.\n`);
  }
}
terminal.close();
