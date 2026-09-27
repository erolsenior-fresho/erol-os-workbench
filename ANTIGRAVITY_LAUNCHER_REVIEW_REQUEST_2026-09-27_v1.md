# Antigravity review request — Erol OS iPad/iPhone launcher

**Date:** 2026-09-27  
**Requested by:** Mehmet / Cursor Cloud Agent  
**Branch:** `cursor/mac-authentic-app-icons-6877`  
**PR:** https://github.com/erolsenior-fresho/erol-os-workbench/pull/4  
**Repo:** `/Users/apple/GitHub/erol-os-workbench`  
**App path:** `ipad-mac-launcher/`

## Please do

Review this work as Antigravity Sonnet (workspace execution / implementation review). Produce a written review with:

1. What is solid and should ship.
2. Bugs, regressions, or missing edge cases.
3. App Store / trademark / Guideline 4.3 and 5.2 risk for a paid listing.
4. Whether the Capacitor + GitHub Pages + PWA path is enough for Mehmet to try it on an iPhone/iPad this week.
5. Concrete next actions, ordered.

Do not change production/live systems. Do not commit unless Mehmet asks.

## What this work is

A macOS-Finder-style app launcher PWA for iPad and iPhone, plus scaffolding to wrap it as a universal iOS app.

Implemented in this conversation / branch:

- Brand-colored macOS-style tiles (original renditions: `simple-icons` marks + brand colors, not pixel copies of proprietary artwork). Service worker cache is `erol-os-launcher-v8`.
- New **Linux** category (19 common Linux apps: VS Code, Terminal, GIMP, VLC, Docker, Ubuntu, …).
- macOS-style **running Dock**: pinned favorites left; opened apps appear right of a separator with a running dot and a live elapsed-time pill; quit via hover `×` or right-click. Running state is **sessionStorage** (not localStorage).
- Icon `<img>` fails over to the app glyph so tiles do not go blank.
- Capacitor 6 packaging: `capacitor.config.json` (`com.erolos.launcher`), `tools/build-www.mjs`, scripts `build:web` / `ios:add` / `ios:sync` / `ios:open`, and `APP_STORE.md`.
- GitHub Pages workflow at `.github/workflows/pages.yml`. Repo is **private**; free Pages will not publish until the repo is public or the plan allows private Pages.
- Tests: `npm test` (7 Node tests). `npm run build:web` bundles `www/` (gitignored).

Known limitations already disclosed to Mehmet:

- A real `.ipa` / App Store upload requires his Mac + Xcode + Apple Developer Program (99 USD/year). This environment cannot ship that.
- Selling a launcher that lists third-party app names/marks has App Store review risk (4.3 shortcut-collector, 5.2 IP).
- Pre-existing search-clear glitch: a stray `null` tile can appear after clicking the search `×` until a category is reselected. Not fixed in this branch.

## Primary files

- `ipad-mac-launcher/app.js` — launch, favorites, running Dock
- `ipad-mac-launcher/styles.css` — Dock running UI, phone layout
- `ipad-mac-launcher/apps-data.js` — catalog + Linux category
- `ipad-mac-launcher/tools/generate-icons.mjs` — icon generator
- `ipad-mac-launcher/sw.js` — cache-first PWA
- `ipad-mac-launcher/capacitor.config.json`
- `ipad-mac-launcher/APP_STORE.md`
- `.github/workflows/pages.yml`

## Suggested commands

```bash
cd ipad-mac-launcher
npm ci
npm test
npm run build:web
npm run serve
```

Open `http://localhost:4173` and exercise: Favoriler, Linux, open an app, confirm Dock separator + timer + quit.

## Review output format

Write findings as:

- `CONFIRMED` — verified in code or by running it
- `ASSUMPTION` / `HYPOTHESIS` — inferred
- Severity: P0 / P1 / P2
- File + what to change

Save the review next to this file as `ANTIGRAVITY_LAUNCHER_REVIEW_RESULT_2026-09-27_v1.md` if Mehmet wants it kept in the repo.
