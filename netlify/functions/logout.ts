// POST /api/logout — ends the session (B168).
import { clearSessionCookie } from "./_lib/session";

export async function handler(event: { httpMethod: string }) {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };
  return { statusCode: 204, headers: { "Set-Cookie": clearSessionCookie() }, body: "" };
}
