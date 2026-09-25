import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { APPS, CATEGORIES } from "../apps-data.js";

test("app identifiers are unique", () => {
  const ids = APPS.map((app) => app.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("every app belongs to a visible category", () => {
  const categories = new Set(CATEGORIES.map((category) => category.id));
  for (const app of APPS) {
    assert.ok(categories.has(app.category), `${app.name} has unknown category ${app.category}`);
  }
});

test("app records contain renderable icon data", () => {
  for (const app of APPS) {
    assert.ok(app.name.length > 0, `${app.id} needs a name`);
    assert.ok(app.symbol.length > 0, `${app.id} needs a symbol`);
    assert.equal(app.colors.length, 2, `${app.id} needs a two-color gradient`);
    assert.match(app.colors[0], /^#[0-9a-f]{6}$/i);
    assert.match(app.colors[1], /^#[0-9a-f]{6}$/i);
  }
});

test("default Dock fits the twelve-item launcher limit", () => {
  const dockApps = APPS.filter((app) => app.favorite);
  assert.ok(dockApps.length > 0);
  assert.ok(dockApps.length <= 12, `Dock has ${dockApps.length} default apps`);
});

test("every bundled app has macOS-style SVG artwork", async () => {
  const manifest = JSON.parse(
    await readFile(new URL("../icons/apps/manifest.json", import.meta.url), "utf8")
  );
  assert.equal(manifest.length, APPS.length);

  for (const app of APPS) {
    const expectedPath = `./icons/apps/${app.id}.svg`;
    assert.ok(manifest.includes(expectedPath), `${app.name} is missing from the icon manifest`);
    const artwork = await readFile(new URL(`../icons/apps/${app.id}.svg`, import.meta.url), "utf8");
    assert.match(artwork, /^<svg /);
    assert.match(artwork, /linearGradient/);
  }
});

test("manifest references generated install icons", async () => {
  const manifest = JSON.parse(await readFile(new URL("../manifest.webmanifest", import.meta.url), "utf8"));
  assert.equal(manifest.display, "standalone");
  assert.deepEqual(manifest.icons.map((icon) => icon.sizes), ["192x192", "512x512"]);

  for (const icon of manifest.icons) {
    const bytes = await readFile(new URL(`..${icon.src.slice(1)}`, import.meta.url));
    assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  }
});

test("service worker caches the complete app shell", async () => {
  const worker = await readFile(new URL("../sw.js", import.meta.url), "utf8");
  for (const file of ["index.html", "styles.css", "app.js", "apps-data.js", "manifest.webmanifest"]) {
    assert.ok(worker.includes(file), `${file} is missing from the app shell`);
  }
});

test("running apps can be closed together from the iOS-friendly control", async () => {
  const [markup, script] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../app.js", import.meta.url), "utf8")
  ]);

  assert.match(markup, /id="closeAllButton"/);
  assert.match(script, /runningApps\.clear\(\)/);
  assert.match(script, /closeAllButton\.addEventListener\("click", stopAllApps\)/);
});
