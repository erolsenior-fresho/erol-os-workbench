# EROL_OS_HERMES_BASELINE_FAILURE_PATCH_PLAN_v1

## Executive Summary

Hermes baseline failed because the retrieval execution path is broken, not because the GUI or Ollama are entirely unavailable.

The MBP baseline confirmed:

- GUI Flask endpoint can serve on `127.0.0.1:5001`.
- Ollama backend is reachable and local models are available.
- `jarvis_ask.py` loads the RAG index, then fails before returning representative query results.

This document is a patch plan only. No code patch, index rebuild, re-index, deletion, rename, move, governance update, or production change has been performed.

## Patch Objective

Restore representative query execution through `jarvis_ask.py` or clearly isolate it as deprecated/non-authoritative.

The immediate objective is not full coverage remediation. The immediate objective is to make the current retrieval execution path produce either results or clean not-found responses without Python exceptions.

## Patch Scope

- Inspect `jarvis_ask.py` first.
- Identify where `chunks` should be defined or loaded.
- Determine whether the current loaded-object variable should be `chunks`, `memory_chunks`, `matched_chunks`, `docs`, `index_chunks`, or equivalent.
- Do not touch index artifacts.
- Do not rebuild the RAG index.
- Do not change GUI code until the query path works.
- Do not add coverage warnings yet.

## Pre-Patch Evidence

### Current `jarvis_ask.py` Path

- `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/RAG/jarvis_ask.py`

### Current `jarvis_ask.py` Hash

- SHA256: `9bd467b3dfa8914f2f3e4679703944e6bb3dfb90f5997a5ceaf2cd248e6a2c4b`

### Current RAG Index Path Used By `jarvis_ask.py`

`jarvis_ask.py` defines:

- `RAG_FILE = Path(__file__).parent / "rag_chunks.jsonl"`

Resolved path:

- `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/RAG/rag_chunks.jsonl`

Current RAG index hash:

- SHA256: `36770bdc05b4fe4be3c612a7a3b413a2e919534e107b04ec8d8656d023fb8dd7`

### Exact Failing Line / Stack Trace Source

Observed baseline failure:

- `NameError: name 'chunks' is not defined`

Stack source:

- `jarvis_ask.py`, line 276: `hits = bm25_search(query_terms, tf_cache, dl, avgdl, df, N, k=args.top_k)`
- `jarvis_ask.py`, line 134: `for i, chunk in enumerate(chunks):`

Root source in code:

- `load_chunks()` returns a local variable named `chunks`.
- `main()` assigns that return value at line 269: `chunks = load_chunks(RAG_FILE)`.
- `build_index(chunks)` receives the loaded chunks correctly.
- `bm25_search()` does not receive `chunks` as an argument.
- `bm25_search()` then references `chunks` internally at line 134 as if it were global.

### Variable Containing Loaded Chunks

The variable that actually contains loaded RAG chunks is:

- `chunks`

It is local to `main()` after:

- `chunks = load_chunks(RAG_FILE)`

No separate active variable named `memory_chunks`, `matched_chunks`, `docs`, or `index_chunks` was identified in the inspected `jarvis_ask.py` retrieval path.

### Working Older / Sibling Script Status

Sibling scripts found:

- `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/RAG/rag_search.py`
- `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/jarvis_cli.py`
- `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/jarvis_local_search.py`
- `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/hermes_worker.py`

`rag_search.py` status:

- It uses the same index path pattern: `RAG_FILE = Path(__file__).parent / "rag_chunks.jsonl"`.
- It passes `chunks` explicitly into its scoring function: `bm25_score(query_terms, chunks, tf_cache, dl, avgdl, df, N)`.
- A read-only test query for `governance index` completed successfully.
- It loaded 18,638 chunks after hard-filtering 4,225 low-signal chunks.
- It returned top results without Python exceptions.

This makes `rag_search.py` a useful reference implementation and fallback helper, but it does not replace the need to fix or isolate `jarvis_ask.py` if `jarvis_ask.py` remains the expected RAG+Ollama Q&A path.

## Safe Patch Options

### Option A: Fix Variable Scoping / Name Mismatch Inside `jarvis_ask.py`

Patch `bm25_search()` so it receives the loaded `chunks` list explicitly, matching the working sibling pattern in `rag_search.py`.

Expected minimal shape:

- Add `chunks: list[dict]` parameter to `bm25_search()`.
- Change the call in `main()` to pass `chunks`.
- Leave `rag_chunks.jsonl` untouched.
- Leave scoring behavior otherwise unchanged unless validation exposes a separate issue.

### Option B: Replace Broken Query Path With Call To Known-Working `rag_search.py`

Route retrieval through `rag_search.py` if `jarvis_ask.py` is intended only as a wrapper around a working search helper.

Tradeoff:

- Lower code change in retrieval logic.
- But `jarvis_ask.py` also contains prompt construction and Ollama answer generation, so replacing its path with `rag_search.py` may require more behavior mapping.

### Option C: Mark `jarvis_ask.py` Deprecated For Baseline And Route Baseline Through Working Hermes Search Script

Use `rag_search.py` as the baseline retrieval command and document `jarvis_ask.py` as deprecated or non-authoritative.

Tradeoff:

- Fastest operational isolation.
- But it does not restore the RAG+Ollama Q&A path that `jarvis_ask.py` appears designed to provide.

### Option D: Create Blocker / Failure Analysis Instead Of Editing

Use this only if pre-patch review reveals hidden coupling, index format mismatch, or ownership risk that makes even the scoped `chunks` parameter fix unsafe.

## Recommended Patch Option

Recommended option: Option A.

Reason:

- The suspected cause is localized and clear.
- `jarvis_ask.py` already loads the correct index into a local `chunks` variable.
- The failing function only needs access to that already-loaded list.
- `rag_search.py` demonstrates the same safe pattern by passing `chunks` explicitly into the scoring function.
- This option avoids index changes, avoids GUI changes, avoids worker changes, and avoids global CLI installation.

Fallback option:

- If Option A reveals additional runtime breakage after the `NameError` is resolved, use Option B or C only after documenting the next failure.

## Validation After Patch

Representative queries must run without Python exceptions:

- governance index
- Marvis status board
- kernel hardening result summary
- Anttron
- invoice / fatura
- offer / teklif
- IPTV / headend / SMATV
- Classes Hotel

Each query should produce either:

- retrieved source results, or
- a clean not-found / low-confidence response.

## Success Criteria

- No `NameError`.
- Query returns results or clean not-found response.
- RAG index hashes unchanged.
- No re-index.
- No governance file modifications.
- No production file modifications.
- Baseline can be rerun.

## Worker / CLI Decision

Hermes worker decision:

- The worker is not required for the immediate `jarvis_ask.py --no-llm` retrieval baseline.
- It is relevant to async Hermes/Jarvis runtime behavior.
- Documentation and code indicate it is a background worker launched through `python3 hermes_worker.py`, with heartbeat at `~/.dikey/jarvis_runtime/hermes/hermes_heartbeat.json`.
- Current baseline did not evidence a heartbeat, so worker status remains a separate operational issue.
- Existing supervisor/user-acceptance evidence indicates the worker should not be auto-started casually because duplicate processes are a safety concern.

Hermes CLI decision:

- No global `hermes` command was found during baseline.
- Current operation appears script-based:
  - `jarvis_ask.py` for RAG+Ollama Q&A.
  - `rag_search.py` for local BM25 retrieval.
  - `hermes_worker.py` for worker status/queue behavior.
- Do not install a global `hermes` CLI without explicit approval.

## What Must Not Be Done

- Do not rebuild indexes.
- Do not materialize all iCloud files.
- Do not activate a heavy coverage pipeline.
- Do not modify GUI before retrieval works.
- Do not update the governance index.
- Do not install a global CLI.
- Do not claim Hermes is usable for all-files search until baseline and coverage retests pass.

## Next Execution File

If this patch plan is accepted, create:

- `EROL_OS_HERMES_BASELINE_FAILURE_PATCH_EXECUTION_REPORT_v1.md`

## Failure Path

If safe patch execution is not possible, create:

- `EROL_OS_HERMES_BASELINE_FAILURE_PATCH_BLOCKER_REPORT_v1.md`
