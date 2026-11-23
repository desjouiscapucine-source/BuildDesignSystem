// Lesson 4: the chatbot receives ALL the specs and guidelines in its system prompt (read only).
// It works while the documentation is small; the token counter shows why a RAG comes next (06 and 07).
// Run from the project root: node --env-file=<file with GEMINI_API_KEY> scripts/assistant/05-chatbot-all-docs.mjs
import { GoogleGenAI } from "@google/genai";
import { MODEL, readComponentDocs, runChat } from "./lib.mjs";

const docs = readComponentDocs();
const knowledge = docs
  .map((doc) => `\n\n=== ${doc.component} / ${doc.file} ===\n${doc.text}`)
  .join("");
console.log(`${docs.length} files loaded, ${knowledge.length} characters (about ${Math.round(knowledge.length / 4)} tokens).\n`);

const ai = new GoogleGenAI({});

const chat = ai.chats.create({
  model: MODEL,
  config: {
    systemInstruction:
      "You are the assistant of the design system. Always answer in French, short and simple. " +
      "Answer ONLY from the documents below, and name the component concerned. " +
      "The documents are in English but the questions are in French: look for the equivalent words. " +
      "If the answer is really not in the documents, say « Ce n'est pas dans la documentation » without inventing." +
      knowledge,
  },
});

await runChat(chat);
