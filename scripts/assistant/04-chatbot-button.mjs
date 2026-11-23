// Lesson 3: the chatbot answers from one document, the Button spec (read only).
// Run from the project root: node --env-file=<file with GEMINI_API_KEY> scripts/assistant/04-chatbot-button.mjs
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";
import { MODEL, ROOT, runChat } from "./lib.mjs";

const spec = fs.readFileSync(path.join(ROOT, "components/Button/spec.md"), "utf-8");

const ai = new GoogleGenAI({});

const chat = ai.chats.create({
  model: MODEL,
  config: {
    systemInstruction:
      "You are the assistant of the design system. Always answer in French, short and simple. " +
      "Answer ONLY from the document below. " +
      "The document is in English but the questions are in French: look for the equivalent words " +
      "(tailles = Sizes, états = States, variantes = Variants). " +
      "If the answer is really not in the document, say « Ce n'est pas dans la spec du Button » without inventing.\n\n" +
      "=== BUTTON SPEC ===\n" + spec,
  },
});

await runChat(chat);
