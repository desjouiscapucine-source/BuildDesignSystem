// Shared by login.ts, logout.ts, session.ts and backlog.ts.
// A session is one signed cookie, no database: HttpOnly, holds an expiry and an HMAC of it (SESSION_SECRET env var).
// There is only one account (the Design System Lead); the password is ADMIN_PASSWORD (env var), never stored here.
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "bds_session";
const SESSION_HOURS = 24 * 30; // 30 days

function sessionSecret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not set");
  return value;
}

function sign(expiry: number): string {
  return createHmac("sha256", sessionSecret()).update(String(expiry)).digest("hex");
}

export function createSessionCookie(): string {
  const expiry = Date.now() + SESSION_HOURS * 3600 * 1000;
  return `${COOKIE_NAME}=${expiry}.${sign(expiry)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

function readCookie(header: string | undefined, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    if (part.slice(0, separator).trim() === name) return part.slice(separator + 1).trim();
  }
  return null;
}

/** Whether the request's cookie holds a valid, non-expired session. */
export function isAuthenticated(cookieHeader: string | undefined): boolean {
  const value = readCookie(cookieHeader, COOKIE_NAME);
  if (!value) return false;
  const [expiryText, signature] = value.split(".");
  const expiry = Number(expiryText);
  if (!expiry || Date.now() > expiry || !signature) return false;
  const expected = Buffer.from(sign(expiry), "hex");
  const given = Buffer.from(signature, "hex");
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** Constant-time check against ADMIN_PASSWORD, so a wrong length or content takes the same time either way. */
export function checkPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD is not set");
  const a = createHash("sha256").update(submitted).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
