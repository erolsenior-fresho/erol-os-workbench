# Claude Cowork review request — Erol OS iPad/iPhone launcher

**Date:** 2026-09-28  
**Requested by:** Mehmet / Cursor  
**Repo:** `/Users/apple/GitHub/erol-os-workbench`  
**Live site:** https://erolsenior-fresho.github.io/erol-os-workbench/  
**PR (icons/dock/Capacitor/Pages):** https://github.com/erolsenior-fresho/erol-os-workbench/pull/4  
**PR #5 (exclude):** “Tümünü Kapat” close-all — Mehmet asked to ship **without** this.

## Your role (Erol OS contract)

You are Claude Cowork: collaborative analysis and bounded workspace research.

- Label inferred statements as `ASSUMPTION` or `HYPOTHESIS`.
- Do not treat chat context as canonical without a source record.
- Do not change production systems. Do not commit unless Mehmet asks.

## Please do

Read the launcher and produce `CLAUDE_LAUNCHER_REVIEW_RESULT_2026-09-28_v1.md` with:

1. What is solid and should stay.
2. Bugs / edge cases (especially Dock, search `null` tile, PWA cache, iOS install).
3. App Store Guideline 4.3 / 5.2 and trademark risk for a **paid** listing.
4. Whether GitHub Pages + “Ana Ekrana Ekle” is enough for Mehmet to try on iPhone/iPad this week.
5. Concrete next actions, ordered. P0 / P1 / P2.

## What shipped

macOS-Finder-style launcher PWA (`ipad-mac-launcher/`):

- Brand-colored tiles (original renditions: `simple-icons` + brand colors, not pixel copies).
- Linux category (19 apps).
- Running Dock: pinned left, opened apps right of a separator, dot + live timer, quit via hover `×` / right-click. Running state is `sessionStorage`.
- Capacitor 6 packaging + `APP_STORE.md`.
- GitHub Pages at the URL above. Repo is **public**.
- Working tree currently removes PR #5 close-all (`Tümünü Kapat`) on branch `cursor/remove-close-all-6877` — treat that as intended.

Known issue already disclosed: after clearing search with `×`, a stray `null` tile can appear until a category is reselected.

## Primary files

- `ipad-mac-launcher/app.js`
- `ipad-mac-launcher/styles.css`
- `ipad-mac-launcher/apps-data.js`
- `ipad-mac-launcher/tools/generate-icons.mjs`
- `ipad-mac-launcher/sw.js`
- `ipad-mac-launcher/APP_STORE.md`
- `.github/workflows/pages.yml`
- `ANTIGRAVITY_LAUNCHER_REVIEW_REQUEST_2026-09-27_v1.md` (parallel review already requested)

## Suggested commands (read-only)

```bash
cd ipad-mac-launcher
npm test
```
