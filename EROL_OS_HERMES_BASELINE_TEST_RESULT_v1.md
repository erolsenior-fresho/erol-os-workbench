# EROL_OS_HERMES_BASELINE_TEST_RESULT_v1

## Executive Summary

Baseline status: BASELINE FAILED

This on-device MBP baseline test confirms that the local GUI surface can be served and the local Ollama backend is reachable, but the current Hermes/Jarvis retrieval CLI fails at runtime before returning search results. The existing RAG index file is present and loadable, but the tested retrieval path cannot currently complete representative searches.

Current risk level: HIGH

Hermes should not currently be trusted for "all files" questions. Based on this baseline, it should also not be treated as a reliable live retrieval path for governance, Jarvis, offers, invoices, or technical files until the CLI/runtime failure and coverage visibility gaps are remediated and retested.

## Test Environment

- Device/context: MBP / macOS local environment.
- Date: 2026-06-04.
- Test scope: Existing Hermes/Jarvis GUI, local backend/API availability, CLI retrieval path, and coverage-warning visibility.
- No rebuild, re-index, patch, delete, rename, or move operation was performed.
- Approved prior context:
  - Hermes coverage audit result: PARTIAL COVERAGE / HIGH RISK.
  - Capability leverage review: partial but usable; GUI and parsers work; coverage visibility missing from UI.
  - External Linux-container review: useful context only, not authoritative proof for MBP.

## Hermes Launch Method

Observed GUI launch source:

- `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/jarvis_gui.py`

The script defines a Flask GUI server and, when run directly, opens:

- `http://localhost:5001`

Safe no-browser GUI probe performed:

- Command pattern: `PYTHONDONTWRITEBYTECODE=1 python3 -m flask --app jarvis_gui:app run --host 127.0.0.1 --port 5001`
- HTTP probe: `GET /`
- Result: HTTP 200
- Returned page content: minimal JARVIS page with heading only.

## GUI / Backend Status

GUI status:

- Flask GUI endpoint served successfully on `127.0.0.1:5001`.
- GUI template observed at `JARVIS/templates/index.html`.
- Template content is minimal and does not expose search results, coverage state, skipped-file state, iCloud materialization state, or open-in-Finder controls.

Backend/API status:

- Ollama API reachable at `http://127.0.0.1:11434/api/tags`.
- Models visible included:
  - `llama3.1:8b`
  - `nous-hermes2:latest`
  - `llama3.2:latest`
  - `qwen2.5-coder:7b`
  - `gemma4:31b`

Hermes worker status:

- Heartbeat check: no heartbeat file found at `~/.dikey/jarvis_runtime/hermes/hermes_heartbeat.json`.
- Result: worker not evidenced as running during this baseline.

Hermes CLI status:

- `hermes` command was not found in PATH.
- `hermes coverage --format table` was therefore not run.

RAG CLI status:

- Tested CLI path:
  - `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/RAG/jarvis_ask.py`
- Tested mode:
  - `--no-llm --top-k 3`
- Index loaded:
  - `rag_chunks.jsonl`
- Runtime result:
  - CLI failed during BM25 retrieval with `NameError: name 'chunks' is not defined`.
- Code evidence:
  - `bm25_search()` references `chunks` at line 134.
  - `chunks` is assigned locally inside `main()` at line 269 and is not passed into `bm25_search()`.

## Index / Backend Used

The tested RAG CLI uses:

- `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/RAG/rag_chunks.jsonl`

Observed index-related counts:

- `rag_chunks.jsonl`: 22,863 lines on disk.
- `rag_file_inventory.csv`: 2,113 lines on disk.
- `jarvis_ask.py` loaded 18,638 chunks after filtering 4,225 low-signal chunks.

The tested GUI does not visibly bind to the RAG index in the rendered page. It serves a minimal JARVIS page only.

## Search Test Table

| Query | Result | Source path if found | File type | GUI partial-coverage warning | GUI open/Finder status | Notes |
|---|---:|---|---|---|---|---|
| governance index | Not validated | None | N/A | Not visible | N/A | CLI failed before returning hits. |
| Marvis status board | Not validated | None | N/A | Not visible | N/A | CLI failed before returning hits. |
| kernel hardening result summary | Not validated | None | N/A | Not visible | N/A | CLI failed before returning hits. |
| Anttron | Not validated | None | N/A | Not visible | N/A | CLI failed before returning hits. |
| invoice / fatura | Not validated | None | N/A | Not visible | N/A | CLI failed before returning hits. |
| offer / teklif | Not validated | None | N/A | Not visible | N/A | CLI failed before returning hits. |
| IPTV / headend / SMATV | Not validated | None | N/A | Not visible | N/A | CLI failed before returning hits. |
| Classes Hotel | Not validated | None | N/A | Not visible | N/A | CLI failed before returning hits. |

## Coverage Warning Status

- Partial coverage warning visible in GUI: NO.
- Skipped/missing files visible in GUI: NO.
- iCloud materialization warnings visible in GUI: NO.
- Coverage command available: NO, `hermes` command not found in PATH.

## iCloud Warning Status

No iCloud materialization warning was visible in the tested GUI. No skipped-file or not-downloaded-file warning was visible in the tested CLI output before the runtime failure.

## Open-in-Finder Status

No search result was returned by the tested retrieval CLI, so result opening could not be validated per query. The tested GUI page does not visibly provide open-in-Finder controls.

## Current Trust Decision

- Governance files: NOT TRUSTED for live Hermes/Jarvis retrieval until CLI runtime failure is fixed and retested.
- Jarvis files: NOT TRUSTED for live Hermes/Jarvis retrieval until CLI runtime failure is fixed and retested.
- Offers: NOT TRUSTED.
- Invoices: NOT TRUSTED.
- Technical files: NOT TRUSTED.
- All-files questions: NOT TRUSTED.

## Risk Level

Risk level: HIGH

Reasons:

- Existing coverage audit already found PARTIAL COVERAGE / HIGH RISK.
- GUI does not show coverage, skipped-file, or iCloud warnings.
- Hermes worker heartbeat was absent.
- `hermes` CLI command was not available.
- The tested RAG retrieval CLI fails before returning results for all representative queries.

## Decision

Decision label: BASELINE FAILED

The on-device MBP validation did not prove a usable Hermes retrieval baseline. GUI serving and local model backend availability were confirmed, but representative retrieval failed through the tested CLI path, and coverage visibility remains absent.

## Next Recommended Action

Next recommended file:

- `EROL_OS_HERMES_BASELINE_FAILURE_REMEDIATION_PLAN_v1.md`

This should define a controlled fix plan for the `jarvis_ask.py` retrieval runtime failure, Hermes worker status visibility, and coverage-warning UI/reporting before any re-index or production trust claim.
