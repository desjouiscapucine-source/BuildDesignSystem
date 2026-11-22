// GET / PATCH /api/backlog — the live backlog, logged in only (B168). Logged out, the public site stays on the
// last release (B152): the frontend does not even call this; a direct call still gets 401, so `develop` (which can
// hold unreleased tickets) is never exposed to a logged-out visitor.
import { isAuthenticated } from "./_lib/session";
import { readBacklog, writeBacklogChange } from "./_lib/github";

export async function handler(event: { httpMethod: string; headers?: Record<string, string | undefined>; body?: string | null }) {
  if (!isAuthenticated(event.headers?.cookie)) {
    return { statusCode: 401, body: JSON.stringify({ error: "Log in to use the live backlog." }) };
  }

  if (event.httpMethod === "GET") {
    try {
      const { data } = await readBacklog();
      return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: data.items }) };
    } catch (error) {
      return { statusCode: 502, body: JSON.stringify({ error: String(error) }) };
    }
  }

  if (event.httpMethod !== "PATCH") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { id, change } = JSON.parse(event.body || "{}");
    if (typeof id !== "string" || !id) return { statusCode: 400, body: JSON.stringify({ error: "Missing id" }) };
    const { items, error } = await writeBacklogChange(id, change ?? {});
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items, mainError: error }) };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ error: String(error) }) };
  }
}
