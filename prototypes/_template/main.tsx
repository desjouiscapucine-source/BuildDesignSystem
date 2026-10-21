// An interactive mockup (user journey). Build the screens only with components from "@ds/components",
// inside the shared Screen layout; never with raw HTML controls or raw style values.
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "../_shared/setup";
import { Button } from "@ds/components";
import { Screen } from "../_shared/Screen";
import { sample } from "../_data/sample";

type ScreenName = "home" | "details";

function Prototype() {
  const [screen, setScreen] = useState<ScreenName>("home");

  if (screen === "details") {
    return (
      <Screen title="Details screen" subtitle="Second screen of the journey">
        <p>{sample.items[0].description}</p>
        <div>
          <Button variant="secondary" onClick={() => setScreen("home")}>
            Go back
          </Button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen title="Home screen" subtitle="First screen of the journey">
      <ul>
        {sample.items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <div>
        <Button onClick={() => setScreen("details")}>Go to details</Button>
      </div>
    </Screen>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Prototype />
  </StrictMode>,
);
