// Lesson 1: the first call to an LLM API.
// Run from the project root: node --env-file=<file with GEMINI_API_KEY> scripts/assistant/01-first-call.mjs
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({}); // reads GEMINI_API_KEY from the environment

const response = await ai.models.generateContent({
  model: "gemini-3.5-flash-lite",
  contents: "Explain what a design system is in two sentences.",
});

console.log(response.text);
