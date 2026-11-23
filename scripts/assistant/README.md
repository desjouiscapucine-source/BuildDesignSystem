# LLM assistant — learning scripts and handoff (B178)

Ticket **B178 — LLM assistant on the site** (priority high, release R5), branch `project/llm-assistant`.

## Goal
An LLM assistant on the documentation site, to create components and prototypes from the site itself. The Design System Lead is not technical and is learning APIs and LLMs while building it: **explain each step simply, in French**, and test each step with her before moving on.

## Where we are (2026-11-23)
- The first steps were done with **Gemini** (Google AI Studio, free tier) to learn the basics. The final agent is planned with **Claude** (Claude Agent SDK, API key from the developer console, separate from the chat account).
- The API key lives in `~/chatbot-test/.env` (`GEMINI_API_KEY=...`), **outside the repository**. Never write a key in the chat, in a file of the project or in a commit. `.env` is in `.gitignore` (the repository is public).
- Scripts, in the order of the lessons. Run them from the project root:

```bash
node --env-file=$HOME/chatbot-test/.env scripts/assistant/<file>
```

| File | Lesson | Status |
| ---- | ------ | ------ |
| `01-first-call.mjs` | First call to an LLM API | Tested |
| `02-list-models.mjs` | List the models the key can use (names change often) | Tested |
| `03-chatbot.mjs` | Chatbot with memory and a system prompt | Tested |
| `04-chatbot-button.mjs` | Answers from the Button spec only | Tested: correct answers, no invention |
| `05-chatbot-all-docs.mjs` | All specs and guidelines in the system prompt (about 250 000 characters) | Not run yet |
| `06-build-index.mjs` | RAG part 1: cut the docs into pieces (about 520) and compute their embeddings, into `index.json` (not committed) | Not run yet |
| `lib.mjs` | Shared helpers: read the docs, retry on 503/429, chat loop with a token counter | — |

- Model names are in one place (`lib.mjs`, `MODEL` and `EMBEDDING_MODEL`). If a call fails with a `404`, the model was retired: run `02-list-models.mjs` and change the name. A `503` only means the service is busy.

## What was learned
- An API call is a request (messages + system prompt) and a response; the key proves who calls and is billed.
- An LLM has no memory: the whole conversation is sent again at every message.
- The system prompt sets the role and the rules. "Answer only from the document" removes invention but can make the model too cautious: language (French questions, English docs) and a lighter model made it refuse answers that were in the spec; a clearer prompt and a stronger model fixed it. Always check the answers against the real files.

## Next steps
1. Run `05` then `06`; compare "send everything" with a RAG on the same questions (answers, tokens sent, time).
2. Write `07-chatbot-rag.mjs`: embed the question, take the closest pieces of `index.json`, send only those to the LLM.
3. Part B: a small local server that keeps the key (never in the browser) and a chat area on the site, built with the design system components. B105 (Chatbot) is the related component ticket.
4. Agent stage: Claude Agent SDK, with tools that write in `components/` and `prototypes/` only, and the Design System Lead's validation at every stage (`never-invent`, approval gates, no commit or push without validation).

## To decide with the Design System Lead
- The **Scope** and **Done when** of B178 (only Goal and Why are written).
- The language of the assistant's answers on the site (French in the tests).
- Where the server runs: local only, or hosted for the public site (the public site cannot hold the key).
