# EROL_OS_HERMES_GUI_COVERAGE_WARNING_PATCH_PLAN_v1

## Executive Summary

Hermes GUI coverage warning activation failed because no supported config flags exist. A minimal GUI patch plan is required.

Current state:

- Baseline retest status: BASELINE PARTIAL.
- `jarvis_ask.py --no-llm` retrieval works.
- Hermes can be trusted for script-based indexed retrieval tests.
- Hermes still cannot be trusted for all-files questions.
- GUI coverage warning activation status: NOT SUPPORTED.
- Active GUI is a minimal Flask page.
- No coverage, skipped-file, missing-file, or iCloud materialization warning is visible.

This is a plan-only document. No GUI code, retrieval code, RAG index, governance file, master architecture file, kernel hardening proof, Marvis file, production file, or global CLI was modified.

## Patch Objective

Define the minimal safe GUI patch needed to make Hermes visibly warn Erol that search results are partial and limited to indexed scope.

Required warning text:

> Warning: Hermes currently searches indexed scope only. Full Dikey / Erol OS all-file coverage is not yet proven. Offers, invoices, technical files, non-Markdown files, skipped files, missing files, and iCloud-evicted files may be missing.

The warning must make clear that search results must not be interpreted as exhaustive.

## Patch Scope

The future patch should:

- Inspect active Flask GUI file(s).
- Identify the template or route serving the search page.
- Add a static visible warning banner.
- Do not change retrieval logic.
- Do not change the RAG index.
- Do not add a file coverage pipeline.
- Do not claim full coverage.

The patch should be intentionally small and limited to GUI visibility.

## Required Pre-Patch Evidence

### Active GUI Entrypoint Path

- `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/jarvis_gui.py`

Current SHA256:

- `fa40963478b387ded2ccfabe134912f460aabf4192e2863f249d412c03bebcc7`

### Active GUI Template Path

- `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/templates/index.html`

Current SHA256:

- `0adaf6bf603f04f65d986013f85ff6a539a2c20212f8a05c829d2c896afb696e`

### Route / Template Serving `127.0.0.1:5001`

Observed route:

- `@app.route("/")`
- `index()` returns `render_template("index.html")`

Observed direct launch behavior:

- `jarvis_gui.py` opens `http://localhost:5001`.
- Flask runs on `127.0.0.1:5001`.

### Current HTML / Search Page Behavior

Current `index.html` content:

- A minimal page containing only a `JARVIS` heading.

Current limitations:

- No search UI was observed in the active template.
- No coverage warning banner exists.
- No skipped-file display exists.
- No missing-file display exists.
- No iCloud materialization warning exists.
- No search-time coverage overlay exists.

### Retrieval Works Before GUI Patch

Pre-patch retrieval check:

- Command mode: `jarvis_ask.py --no-llm --top-k 1 "Classes Hotel"`
- Result: PASSED
- RAG index loaded successfully.
- Retrieval returned 1 match.
- No Python exception occurred.

## Safe Patch Options

### Option A: Add A Static Warning Banner Directly To The Flask Template / Page

Patch `templates/index.html` to display the required warning text prominently on the page served by `/`.

Expected properties:

- Minimal code change.
- No route change required.
- No retrieval code change.
- No index change.
- No coverage pipeline.
- No dependency on nonexistent config flags.

### Option B: Add A Small Status Block Reading From A Static Coverage Status Constant / File

Add a small status block to the GUI that reads from a static status value or file.

Expected properties:

- More flexible than Option A.
- Requires slightly more code and possibly a new status constant/file.
- Should only be selected if the GUI already has a clean status-block mechanism or if the execution plan explicitly approves a new static status file.

### Option C: If GUI Structure Is Unclear, Do Not Patch; Create Blocker Report

Use this if active GUI routing or template ownership becomes unclear during execution.

Expected output:

- `EROL_OS_HERMES_GUI_COVERAGE_WARNING_PATCH_BLOCKER_REPORT_v1.md`

## Recommended Option

Recommended option: Option A.

Reason:

- The active GUI is minimal and clearly routes `/` to `templates/index.html`.
- There is no existing supported config flag or status-block mechanism.
- A static banner is the smallest patch that directly satisfies the user safety requirement.
- It avoids changing retrieval behavior, indexes, CLI behavior, worker behavior, or coverage pipeline scope.

## Validation After Patch

After a future patch, validate:

- GUI endpoint still serves HTTP 200.
- Warning banner is visible on the served page.
- Required warning text is present.
- `jarvis_ask.py --no-llm` still works.
- RAG index hash unchanged.
- No re-index.
- Governance index unchanged.
- Master architecture files unchanged.
- Kernel hardening files unchanged.
- Marvis files unchanged.
- Production files unchanged.

## Success Criteria

- Erol sees a clear warning before relying on search results.
- Hermes remains BASELINE PARTIAL, not all-files trusted.
- No retrieval regression.
- No index mutation.
- No governance or production mutation.

## What Must Not Be Done

- Do not rebuild or re-index.
- Do not materialize iCloud files.
- Do not add a heavy coverage pipeline.
- Do not install a global CLI.
- Do not update the governance index.
- Do not modify Marvis status board yet.
- Do not claim full coverage.
- Do not change retrieval logic for this GUI warning patch.

## Next Execution File

If this patch plan is accepted, create:

- `EROL_OS_HERMES_GUI_COVERAGE_WARNING_PATCH_EXECUTION_REPORT_v1.md`

## Failure Path

If GUI patch execution is unsafe or unclear, create:

- `EROL_OS_HERMES_GUI_COVERAGE_WARNING_PATCH_BLOCKER_REPORT_v1.md`
