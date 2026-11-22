// POST /api/login { password } — the one account of the Design System Lead (B168).
import { checkPassword, createSessionCookie } from "./_lib/session";

export async function handler(event: { httpMethod: string; body?: string | null }) {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  let password: unknown;
  try {
    password = JSON.parse(event.body || "{}").password;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request" }) };
  }

  if (typeof password !== "string" || !password) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing password" }) };
  }

  try {
    if (!checkPassword(password)) return { statusCode: 401, body: JSON.stringify({ error: "Wrong password" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: String(error) }) };
  }

  return { statusCode: 204, headers: { "Set-Cookie": createSessionCookie() }, body: "" };
}
