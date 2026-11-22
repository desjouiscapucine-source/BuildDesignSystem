// GET /api/session — whether the request's cookie is a valid session (B168).
import { isAuthenticated } from "./_lib/session";

export async function handler(event: { headers?: Record<string, string | undefined> }) {
  const loggedIn = isAuthenticated(event.headers?.cookie);
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ loggedIn }),
  };
}
