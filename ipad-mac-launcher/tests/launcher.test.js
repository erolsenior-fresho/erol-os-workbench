import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { APPS, CATEGORIES } from "../apps-data.js";
import { detectInstallContext, getInstallGuide } from "../install-guide.js";

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

test("bundled destinations do not disguise missing links as App Store search", () => {
  for (const app of APPS) {
    if (app.url) assert.match(app.url, /^[a-z][a-z0-9+.-]*:/i, `${app.name} needs a valid URL`);
    assert.doesNotMatch(app.url, /^itms-apps:\/\/search\.itunes\.apple\.com/i);
  }
});

test("Waze uses its documented mobile deep link with a web fallback", () => {
  assert.equal(APPS.find((app) => app.id === "waze")?.url, "https://waze.com/ul");
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
  assert.equal(manifest.id, "./");
  assert.equal(manifest.display, "standalone");
  assert.deepEqual(manifest.icons.map((icon) => icon.sizes), ["192x192", "512x512"]);

  for (const icon of manifest.icons) {
    const bytes = await readFile(new URL(`..${icon.src.slice(1)}`, import.meta.url));
    assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  }
});

test("service worker caches the complete app shell", async () => {
  const worker = await readFile(new URL("../sw.js", import.meta.url), "utf8");
  for (const file of [
    "index.html",
    "styles.css",
    "app.js",
    "apps-data.js",
    "install-guide.js",
    "manifest.webmanifest"
  ]) {
    assert.ok(worker.includes(file), `${file} is missing from the app shell`);
  }
  assert.match(worker, /new Request\(url, \{ cache: "reload" \}\)/);
  assert.doesNotMatch(worker, /skipWaiting\(\)|clients\.claim\(\)/);
});

test("service worker stages a fresh shell before removing the previous cache", async () => {
  const script = await readFile(new URL("../sw.js", import.meta.url), "utf8");
  const handlers = new Map();
  const stored = new Map([["erol-os-launcher-v9", ["old shell"]]]);
  const cacheApi = {
    open: async (name) => ({
      addAll: async (requests) => stored.set(name, [
        ...(stored.get(name) ?? []),
        ...requests.map((request) => request.url)
      ])
    }),
    keys: async () => [...stored.keys()],
    delete: async (name) => stored.delete(name)
  };
  runInNewContext(script, {
    self: { addEventListener: (name, handler) => handlers.set(name, handler) },
    caches: cacheApi,
    Request: class {
      constructor(url, options) {
        assert.equal(options.cache, "reload");
        this.url = url;
      }
    },
    fetch: async (_url, options) => {
      assert.equal(options.cache, "reload");
      return { json: async () => ["./icons/apps/waze.svg"] };
    }
  });
  let pending;
  handlers.get("install")({ waitUntil: (promise) => { pending = promise; } });
  await pending;
  assert.ok(stored.has("erol-os-launcher-v9"));
  assert.ok(stored.get("erol-os-launcher-v12").includes("./install-guide.js"));
  assert.ok(stored.get("erol-os-launcher-v12").includes("./icons/apps/waze.svg"));
  handlers.get("activate")({ waitUntil: (promise) => { pending = promise; } });
  await pending;
  assert.ok(!stored.has("erol-os-launcher-v9"));
});

test("iPad Chrome receives Chrome-specific installation steps", () => {
  const context = detectInstallContext({
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 CriOS/123.0.0.0 Mobile/15E148 Safari/604.1",
    platform: "iPad",
    maxTouchPoints: 5
  });
  const guide = getInstallGuide(context);

  assert.equal(context.isiPadOS, true);
  assert.equal(context.isChrome, true);
  assert.equal(context.isSafari, false);
  assert.equal(guide.eyebrow, "IPAD CHROME KURULUMU");
  assert.match(guide.steps.join(" "), /Ana Ekrana Ekle/);
});

test("desktop-class iPad detection uses touch capability", () => {
  const context = detectInstallContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) CriOS/123.0.0.0",
    platform: "MacIntel",
    maxTouchPoints: 5
  });

  assert.equal(context.isiPadOS, true);
  assert.equal(context.isChrome, true);
});

test("standalone installation state hides the install card", () => {
  const guide = getInstallGuide(detectInstallContext({ standalone: true }));
  assert.equal(guide.hideButton, true);
  assert.equal(guide.eyebrow, "KURULUM TAMAM");
});

test("running apps can be closed together from the iOS-friendly control", async () => {
  const [markup, script] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../app.js", import.meta.url), "utf8")
  ]);

  assert.match(markup, /id="closeAllButton"/);
  assert.match(script, /runningApps\.clear\(\)/);
  assert.match(script, /closeAllButton\.addEventListener\("click", stopAllApps\)/);
  assert.match(script, /Listeyi Temizle/);
  assert.match(script, /if \(!app\.url\)/);
  assert.doesNotMatch(script, /App Store’da aranıyor/);
});
