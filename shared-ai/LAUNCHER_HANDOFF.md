# Erol OS launcher — shared project handoff
Package: EROL_OS_LAUNCHER_20261001_v1
Observed: 2026-10-01T04:25:19Z
Owner domain: PROJECT_SPECIFIC (Erol OS launcher)
Visibility: PUBLIC_REPOSITORY
Coverage: PARTIAL — repository evidence only; device installations and other AI sessions are unverified.

## Purpose and authorization
Erol requested on 2026-10-01: “Paylaşmayı organize et”.
This authorizes organizing this project's shared handoff and startup references.
It does not authorize importing unrelated conversations, personal data, patent/IP material,
credentials, changing OAuth scopes, or activating Hermes/Drive background synchronization.
Apply the existing EROL_OS_AGENT_KNOWLEDGE_CONTRACT_STAGE1A_v1.md.
This is a bounded project handoff implementation, not activation of the full Stage 1A specification.

## Verified facts
- PR #5 (Add iOS-friendly close-all control) is merged into main.
  Merge commit: 0fdf03d5a5c4d27e4ea9346b9b12e6a913c9a0de.
  Source: https://github.com/erolsenior-fresho/erol-os-workbench/pull/5
- The linked comparison 8adc6a4..d40d8fd changes only .github/workflows/pages.yml:
  timeout-minutes: 10 is added to build and deploy jobs.
  Source: https://github.com/erolsenior-fresho/erol-os-workbench/commit/d40d8fd1d89f9f07389455f6f9d858cf2fc80dbd
- GitHub Pages run #5 completed successfully on 2026-09-27.
  Source: https://github.com/erolsenior-fresho/erol-os-workbench/actions/runs/36332404835
  Live-page behavior and installation on Erol's devices were not tested in this session.
- The launcher opens configured links. It does not share AI conversations, model memory,
  project state, or API sessions between services.
- Tümünü Kapat clears the launcher's sessionStorage tracking, not real iPadOS processes.
  Source: ipad-mac-launcher/README.md and ipad-mac-launcher/app.js.
- Favorites/custom links are stored locally; running-app tracking is session-scoped.

## Pending changes — not current shipped behavior
At observation time these PRs are open; recheck before acting:
- #6 Improve app links and iPad Chrome installation.
- #7 Remove the Tümünü Kapat control.
Do not describe their proposed behavior as shipped. Do not merge as part of handoff work.

## Startup procedure for any AI environment
1. Read this package and the relevant repository instructions.
2. Recheck current main commit, relevant source files, PR state and deployment evidence
   before a new implementation or a claim that the launcher is currently deployed.
3. In the session report the package ID, source commit/ref actually read, environment and
   remaining coverage gaps. Receipt/read acknowledgement does not mean agreement or task completion.
4. If the package cannot be read, say UNAVAILABLE. If source state has changed, say STALE,
   inspect the changes and submit a correction instead of silently using old status.
5. Keep project lanes separate. Preserve existing workflows and require non-regression
   evidence proportional to implementation changes.
6. At handoff record scope, source commit, changed files, verification, blockers and next action.
   Propose updates through a small commit/PR; do not overwrite unrelated handoffs.
   Bump package ID when facts change. Refreshing a timestamp alone is not verification.

## Awareness at creation
- This ChatGPT/Codex session: repository sources were read to prepare this package.
- Cursor PR author: participated in PR #5; receipt of this new package is UNKNOWN.
- Other ChatGPT/Codex, Claude, Gemini, Antigravity, Ollama, Hermes and Marvis sessions:
  receipt is UNKNOWN. No live session or local device was contacted.
- Instruction files configure a startup path in updated repository checkouts.
  They do not prove loading by any running session or retroactively update its context.

## Minimal read receipt
An environment that actually reads the package may emit:
package_id: EROL_OS_LAUNCHER_20261001_v1
environment: <actual tool and device/workspace>
session_id: <actual identifier or UNKNOWN>
source_ref_read: <commit SHA or URL/ref actually fetched>
read_at: <actual UTC timestamp>
coverage: <what was actually read and what remains unavailable>
Do not fabricate receipts for other environments. Device identifiers and private receipts
belong in the existing private workspace/registry, not this public repository.
