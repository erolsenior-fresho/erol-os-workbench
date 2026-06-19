# Google Ecosystem Integration Diagnosis

Date: 2026-06-15
Status: Root cause identified; no external state changed

## Finding

The Google account and Codex Google connectors are operational, but EROL OS has no implemented Google Workspace execution path.

## Verified Working

- Active Google Cloud account: `erolsenior@gmail.com`
- Active Google Cloud project: `assistan-proje`
- Application Default Credentials exist with quota project `assistan-proje`
- Codex connector can list My Drive
- Codex connector can search Gmail
- Codex Calendar connector authenticates and returns a valid empty result for the tested window
- Drive, Docs, Gmail, Vertex AI, and BigQuery APIs are enabled in `assistan-proje`
- Google Python client libraries are installed locally

## Root Causes

1. `erolos_router.py` has no `GOOGLE_WORKSPACE` route or Google keyword triggers.
2. A Google request therefore falls through to `LOCAL`; this was reproduced with:
   `Find my latest Google Drive document and check tomorrow calendar`
3. No Google Workspace adapter or executor exists under `~/Documents/Erol_OS`.
4. The approved Hermes Hybrid Memory Bus remained architecture-only. Its specification explicitly left OAuth and live `drive.appdata` activation unexecuted.
5. Google Cloud ADC is a Cloud identity path. It must not be assumed to provide the Workspace scopes needed by Drive, Gmail, Calendar, Sheets, or Slides.
6. Calendar, Sheets, and Slides APIs are not currently enabled in `assistan-proje`. This does not break the separate Codex connectors, but it blocks a local EROL OS client that uses that project.
7. Ollama was offline during the routing test, exposing the missing deterministic Google route immediately.

## Recovery Path

1. Add a deterministic `GOOGLE_WORKSPACE` route before the local fallback.
2. Implement a read-only Google Workspace adapter for Drive, Gmail, and Calendar.
3. Use a dedicated desktop OAuth client and least-privilege Workspace scopes; keep its client JSON and tokens outside repositories.
4. Enable only the additional APIs required by the approved adapter.
5. Store tokens in the macOS Keychain or another approved encrypted local store.
6. Add read-only health checks for account identity, scopes, Drive, Gmail, and Calendar.
7. Connect the adapter to Marvis/Jarvis and verify end-to-end routing before allowing writes.

## Approval Boundary

The diagnosis used read-only checks. No OAuth flow, credential creation, API enablement, cloud modification, or Google Workspace write was performed.

