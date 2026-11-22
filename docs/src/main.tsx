import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../tokens/fonts.css";
import "../../tokens/tokens.css";
import "../../tokens/icons.css";
import "../../tokens/grid.css";
import "./docs.css";
import { App } from "./App";
import { AuthProvider } from "./auth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
