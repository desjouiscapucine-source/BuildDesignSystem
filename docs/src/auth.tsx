// Session of the Design System Lead on the public site (B168): one account, a password, a signed cookie.
// Logged out: the showcase, read-only, last release (B152). Logged in: the Backlog page is live (useBacklog).
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthState {
  /** `null` while the session is still being checked, just after the page loads. */
  loggedIn: boolean | null;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  loggedIn: false,
  login: async () => false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/session")
      .then((response) => (response.ok ? response.json() : { loggedIn: false }))
      .then((data) => setLoggedIn(Boolean(data.loggedIn)))
      .catch(() => setLoggedIn(false));
  }, []);

  async function login(password: string) {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (response.ok) setLoggedIn(true);
    return response.ok;
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" }).catch(() => {});
    setLoggedIn(false);
  }

  return <AuthContext.Provider value={{ loggedIn, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
