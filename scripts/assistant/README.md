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
| `05-chatbot-all-docs.mjs` | All specs and guidelines in the system prompt (about 250 000 characters) | Tested: about 69 000 tokens and 40 s per question |
| `06-build-index.mjs` | RAG part 1: cut the docs into pieces (about 520) and compute their embeddings, into `index.json` (not committed) | Tested. Also indexes the design tokens (readable lines with their final values). Only new or changed pieces are sent to the API, the progress is saved after every batch |
| `07-chatbot-rag.mjs` | RAG part 2: search the index, send only the 6 closest pieces; shows the pieces found, their score, the tokens and the time | Tested: 700 to 2 000 tokens and 2.5 to 10 s per question |
| `lib.mjs` | Shared helpers: read the docs, retry on 503/429, chat loop with a token counter | — |

- Model names are in one place (`lib.mjs`, `MODEL` and `EMBEDDING_MODEL`). If a call fails with a `404`, the model was retired: run `02-list-models.mjs` and change the name. A `503` only means the service is busy.

## What was learned
- An API call is a request (messages + system prompt) and a response; the key proves who calls and is billed.
- An LLM has no memory: the whole conversation is sent again at every message.
- The system prompt sets the role and the rules. "Answer only from the document" removes invention but can make the model too cautious: language (French questions, English docs) and a lighter model made it refuse answers that were in the spec; a clearer prompt and a stronger model fixed it. Always check the answers against the real files.

- Sending all the documentation works but is slow and costly (about 69 000 tokens, 40 s per question) and grows with the design system. A RAG sends 30 to 100 times less and answers 4 to 15 times faster.
- A RAG is good at precise questions (a size, a state, a token of one component) and bad at broad ones ("list", "how many"): it only sees 6 pieces. When the answer is there, the right piece clearly comes first (score about 0.76); when it is not, or the question is too broad, the scores are flat (about 0.61 to 0.67). An assistant only knows what is indexed: it said nothing about the palettes, which were not in the index.
- The free tier of the embeddings allows **1000 texts a day** (each text counts, not each batch of 50). Two full indexings (520 then 553 pieces) went over it (error `429`, "per day"). Hence the incremental index: it keeps the numbers of the pieces already indexed and computes only the new or changed ones. The questions of `07` use the same quota (one text per question).

## Next steps
1. **Run `06` again once the free daily quota is back** (about 17 hours after the last try, from 2026-11-23): it only computes the 33 missing token pieces. Then run `07` and ask about the colors (`#795b55` and `#f5f3bb` expected), the font of the headings, the spacing, the tablet breakpoint.
2. Ideas to test: a "catalog" piece (every component and its description, from the `meta.json` files) for "list" and "how many" questions; a score threshold ("nothing precise found") before calling the LLM; a memory for follow-up questions.
3. Part B: a small local server that keeps the key (never in the browser) and a chat area on the site, built with the design system components. B105 (Chatbot) is the related component ticket.
4. Agent stage: Claude Agent SDK, with tools that write in `components/` and `prototypes/` only, and the Design System Lead's validation at every stage (`never-invent`, approval gates, no commit or push without validation).

## Decided by the Design System Lead (2026-11-23, written in the Scope of B178)
- First stage: a read-only assistant (answers questions, writes nothing); creating components and prototypes comes in later tickets.
- Runs locally only (`npm run dev`); the public site does not get it (it cannot hold the key).
- A first simple chat area with the existing components; the Chatbot component (B105) comes later.
- Answers in the language of the question.

## Still to decide (listed in the Scope of B178)
- The provider (Gemini free tier or Claude API) and the budget.
- The other documents to index (project rules, skills, backlog).
- Where the chat area sits on the site.
- The limits (questions per minute, length of an answer).

## Resume on another account or another Mac
Everything (code, ticket B178, this file) is on the `project/llm-assistant` branch of GitHub. The **API key is not**: it is a secret and stays out of git.

1. Get the project (Node 24 and git needed) and the branch:

```bash
git clone https://github.com/desjouiscapucine-source/BuildDesignSystem.git
cd BuildDesignSystem && git checkout project/llm-assistant && npm install
```

2. Get the key: from the password manager, or from Google AI Studio (aistudio.google.com) with the same Google account (copy it, or create a new free one).
3. Create a `.env` file at the **root of the project** with one line, `GEMINI_API_KEY=<the key>`. It is ignored by git. Never paste the key in a chat, a commit or a file that is committed.
4. Run a script with it:

```bash
node --env-file=.env scripts/assistant/04-chatbot-button.mjs
```

On the original Mac the key is in `~/chatbot-test/.env`; use `--env-file=$HOME/chatbot-test/.env` there, as in the table above.

To start a new Claude conversation on this work, say: "Resume ticket B178 (LLM assistant on the site): read `scripts/assistant/README.md` and the backlog, then continue with me. I am not technical: explain each step simply, in French."
