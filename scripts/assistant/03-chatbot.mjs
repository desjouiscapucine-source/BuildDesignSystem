// Lesson 2: a chatbot with memory and a system prompt (its role and rules).
// Run from the project root: node --env-file=<file with GEMINI_API_KEY> scripts/assistant/03-chatbot.mjs
import { GoogleGenAI } from "@google/genai";
import readline from "node:readline/promises";

const ai = new GoogleGenAI({});

// `chat` keeps the conversation and sends it again with every message: that is the memory.
const chat = ai.chats.create({
  model: "gemini-3.5-flash-lite",
  config: {
    systemInstruction:
      "You are the assistant of a design system. Always answer in French, short and simple. " +
      "If you do not know, say so instead of inventing.",
  },
});

const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });

while (true) {
  const question = await terminal.question("You: ");
  if (question === "exit") break;
  const response = await chat.sendMessage({ message: question });
  console.log("AI:", response.text, "\n");
}
terminal.close();
