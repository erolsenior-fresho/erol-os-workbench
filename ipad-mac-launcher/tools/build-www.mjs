import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = resolve(ROOT, "www");

// Files and folders that make up the shippable web app. Everything else
// (node_modules, tooling, Capacitor config, docs) stays out of the bundle
// that Capacitor copies into the native iOS app.
const ASSETS = [
  "index.html",
  "styles.css",
  "app.js",
  "apps-data.js",
  "sw.js",
  "manifest.webmanifest",
  "icons"
];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const asset of ASSETS) {
  await cp(resolve(ROOT, asset), resolve(OUT, asset), { recursive: true });
}

console.log(`Bundled ${ASSETS.length} web assets into www/ for Capacitor.`);
