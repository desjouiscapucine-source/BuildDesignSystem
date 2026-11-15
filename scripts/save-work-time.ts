// Saves the time spent building the site for the public site (B152): docs/src/work-time.json, shown frozen online.
// Run on release day (git-workflow, section 8): `npm run work-time`.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { workTime } from "./work-time.ts";

const root = resolve(import.meta.dirname, "..");
const { seconds } = workTime(root);
writeFileSync(resolve(root, "docs/src/work-time.json"), JSON.stringify({ seconds }, null, 2) + "\n");
console.log(`Saved docs/src/work-time.json: ${seconds} s`);
