// Lists the models the API key can use (model names change often).
// Run from the project root: node --env-file=<file with GEMINI_API_KEY> scripts/assistant/02-list-models.mjs
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
const models = await ai.models.list();

for await (const model of models) {
  console.log(model.name);
}
