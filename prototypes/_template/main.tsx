// An interactive mockup. Build screens only with components from "@ds/components".
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "@ds/tokens/fonts.css";
import "@ds/tokens/tokens.css";
import "@ds/tokens/icons.css";
import "@ds/tokens/grid.css";

type Screen = "home" | "details";

function Prototype() {
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      {screen === "home" && (
        <>
          <h1>Home screen</h1>
          <button onClick={() => setScreen("details")}>Go to details</button>
        </>
      )}
      {screen === "details" && (
        <>
          <h1>Details screen</h1>
          <button onClick={() => setScreen("home")}>Back</button>
        </>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Prototype />
  </StrictMode>,
);
