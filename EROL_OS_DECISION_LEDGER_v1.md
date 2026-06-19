# EROL_OS_DECISION_LEDGER_v1

## Purpose

Capture additive architecture and governance decisions for Erol OS within this workspace when no prior ledger artifact is present.

## Decision Entries

### 2026-06-10 - DECISION - Hermes Hybrid Google Workspace Memory Bus

Decision:

Erol OS Google Workspace Memory Bus will use a hybrid Drive architecture:

- `https://www.googleapis.com/auth/cloud-platform` for Vertex AI.
- `https://www.googleapis.com/auth/drive.appdata` for Hermes internal state and cache.
- `https://www.googleapis.com/auth/drive.file` reserved for visible Erol-readable artifacts.

Rules:

1. `appDataFolder` is the default location for automated Hermes memory writes.
2. `drive.file` remains dormant until an explicit visible-file workflow is approved by Erol.
3. OAuth client JSON must stay outside the repository.
4. Full Drive scope is not permitted.
5. Workspace delegation is not approved at this stage.
6. Service account architecture is not approved at this stage.
7. Any OAuth setup requires explicit Erol approval before execution.

Status:

- Approved as an architectural direction.
- Not executed.
- No credentials created.
- No Google Cloud changes made by this ledger entry.

Reference:

- `EROL_OS_HERMES_HYBRID_MEMORY_BUS_ARCHITECTURE_NOTE_v1.md`
