# EROL_OS_HERMES_HYBRID_MEMORY_BUS_ARCHITECTURE_NOTE_v1

## Purpose

Document the approved Google Workspace Memory Bus architecture boundary for Erol OS Hermes without executing OAuth setup, creating credentials, or modifying Google Cloud state.

## Decision

Erol OS Google Workspace Memory Bus will use a hybrid Drive architecture:

- `https://www.googleapis.com/auth/cloud-platform` for Vertex AI access.
- `https://www.googleapis.com/auth/drive.appdata` for Hermes internal state and cache.
- `https://www.googleapis.com/auth/drive.file` reserved for visible Erol-readable artifacts.

## Rules

1. `appDataFolder` is the default location for automated Hermes memory writes.
2. `drive.file` remains dormant until an explicit visible-file workflow is approved by Erol.
3. OAuth client JSON must stay outside the repository.
4. Full Drive scope is not permitted.
5. Workspace delegation is not approved at this stage.
6. Service account architecture is not approved at this stage.
7. Any OAuth setup requires explicit Erol approval before execution.

## Architecture Boundary

### Vertex AI Boundary

- Vertex AI continues to use Google Cloud project `assistan-proje`.
- The Google Cloud access path remains separate from Drive Memory Bus storage policy.

### Hermes Internal Memory Boundary

- Hermes internal state, cache, cursors, and machine-managed memory records belong in `appDataFolder`.
- This boundary is intended to keep automated writes out of normal user-visible Drive space by default.

### Visible Artifact Boundary

- `drive.file` is reserved for future Erol-readable artifacts that are intentionally made visible.
- Visible-file workflows are out of scope until separately approved.

## Security and Governance Constraints

- Custom OAuth client ID is the approved future setup path.
- Desktop app OAuth client is the approved local operator pattern.
- OAuth client JSON must be stored in a private local path outside this repository.
- No credential files are to be committed into source control.
- No OAuth execution is authorized by this note alone.

## Non-Approved Paths

- No `https://www.googleapis.com/auth/drive` full Drive scope.
- No Workspace domain-wide delegation.
- No service account or service account impersonation path for this phase.

## Operational Implications

- Hermes may use Drive-backed storage in a bounded way once OAuth is explicitly approved and configured.
- Until then, this note is architectural only and grants no runtime authorization.
- Future expansion from `drive.appdata` to visible-file workflows must be recorded as a new governance decision.

## Current Trust Decision

The Hybrid Memory Bus direction is approved as an architecture decision only.

OAuth setup, credential creation, and Google Cloud changes remain pending explicit Erol approval.
