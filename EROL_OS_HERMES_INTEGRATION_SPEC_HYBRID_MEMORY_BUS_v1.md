# EROL_OS_HERMES_INTEGRATION_SPEC_HYBRID_MEMORY_BUS_v1

## 1. Purpose and Status

This specification defines how Hermes integrates with Erol OS through the approved Hybrid Memory Bus.

Status:

- Specification only.
- Architecture decision already approved.
- OAuth not authorized for execution by this specification.
- No credentials are created or stored by this specification.
- No Google Cloud, Drive, deployment, or production state is changed by this specification.

Authoritative architecture:

- `https://www.googleapis.com/auth/cloud-platform` -> Vertex AI.
- `https://www.googleapis.com/auth/drive.appdata` -> Hermes internal state, cache, and synchronization metadata.
- `https://www.googleapis.com/auth/drive.file` -> reserved for explicitly approved, visible, Erol-readable artifacts.
- `appDataFolder` is the default destination for automated Hermes memory writes.
- `drive.file` remains dormant until Erol approves a visible-file workflow.
- Full Drive scope is prohibited.
- Service accounts and Workspace domain-wide delegation are prohibited for this stage.
- Any OAuth setup or execution requires explicit Erol approval.

Governance references:

- `EROL_OS_HERMES_HYBRID_MEMORY_BUS_ARCHITECTURE_NOTE_v1.md`
- `EROL_OS_DECISION_LEDGER_v1.md`

## 2. Ownership and System Boundary

Erol is the top-level owner and final decision layer.

Erol OS is the founder operating system through which Erol governs decisions, memory, agents, ventures, and execution layers.

Dikey Elektronik is one commercial execution layer under Erol. Hermes must not infer that an item belongs to Dikey merely because it is operational, commercial, financed by Erol, discussed near Dikey material, or processed by a Dikey-associated workflow.

The following are not automatically Dikey assets:

- Patent material.
- ORBIFI.
- DSNSO.
- Personal intellectual property.
- Future ventures.
- Idea Factory material.
- Any other Erol-level asset not explicitly assigned to Dikey.

The statement "Erol finances Dikey Elektronik" is a `FACT`. It does not transfer ownership of Erol-level assets to Dikey.

## 3. Hermes Role in Erol OS

Hermes is the bounded memory, retrieval, synchronization, and context-distribution layer for Erol OS.

Hermes may:

- Read approved authoritative sources through source-specific adapters.
- Normalize records without changing their meaning.
- Maintain hidden synchronization state in `appDataFolder`.
- Build bounded indexes and caches for retrieval.
- Detect changes, conflicts, stale records, and classification gaps.
- Produce typed update proposals.
- Distribute approved context to registered agents.
- Assemble daily briefing candidates from governed sources.
- Record operational audit events for its own synchronization activity.

Hermes may not:

- Replace Erol as the decision authority.
- Promote an `ASSUMPTION`, `HYPOTHESIS`, or `VISION` to `FACT` or `DECISION`.
- Create a decision on Erol's behalf.
- Reassign ownership between Erol, Dikey, or another venture.
- Treat cached or indexed content as more authoritative than its source.
- Silently alter an authoritative record.
- Expand its own OAuth scopes, source access, or write authority.
- Claim complete memory coverage when a source, file type, or synchronization path is partial or unavailable.

## 4. Read and Write Boundaries

### 4.1 Read Boundary

Hermes may read only:

- Sources explicitly registered in the Hermes source registry.
- Records permitted by the source adapter's policy.
- Fields required for retrieval, synchronization, briefing, and conflict detection.
- Vertex AI responses generated through the separately governed `cloud-platform` access path.

Every read result must preserve:

- Source identifier.
- Source record identifier.
- Source version, revision, hash, or modified time.
- Retrieval time.
- Classification.
- Ownership domain.
- Visibility level.
- Coverage or confidence warning when the source is partial.

Hermes must deny by default when a source, ownership domain, or visibility rule is missing.

### 4.2 Write Boundary

Automated Hermes writes are limited by default to `appDataFolder`.

Hermes may write to an authoritative Erol OS source only through an approved source adapter that enforces:

- Schema validation.
- Classification validation.
- Ownership validation.
- Optimistic concurrency.
- Idempotency.
- Audit logging.
- Rollback or compensating action.
- Approval requirements defined by this specification.

Stage 1 does not authorize direct Hermes mutation of canonical governance records. Hermes produces proposals, synchronization envelopes, and audit records; an approved controlled commit path applies canonical changes.

Hermes must never use hidden `appDataFolder` content as a substitute for a required visible or canonical governance artifact.

## 5. Permitted `appDataFolder` Content

Hermes may store the following machine-managed content in `appDataFolder`:

- OAuth token material only after separately approved OAuth setup, using platform-appropriate encryption and least retention.
- Source registry identifiers and enabled/disabled state.
- Per-source synchronization cursors.
- Last-seen source revisions, modified times, and content hashes.
- Change-detection manifests.
- Normalized cache records derived from approved sources.
- Retrieval indexes, embeddings, and chunk maps derived from approved sources.
- Source-to-cache lineage maps.
- Agent awareness manifests.
- Per-agent synchronization cursors and acknowledgement state.
- Daily briefing assembly state.
- Idempotency keys.
- Pending update proposals and outbox records.
- Conflict records and quarantine state.
- Retry counters and bounded error details.
- Health, coverage, and last-success metadata.
- Audit events for Hermes reads, writes, synchronization, and rollback.
- Schema versions and migration markers.
- Tombstones needed to prevent deleted records from being silently recreated.

All cached records must include a source reference and must be replaceable from the authoritative source.

## 6. Prohibited Storage

Hermes must not store the following in `appDataFolder`:

- The only authoritative copy of a decision, ledger event, idea, opportunity, agent definition, or daily brief.
- Unapproved credentials, client secrets, private keys, service-account keys, or Workspace delegation material.
- OAuth client JSON inside the repository.
- Full Drive mirrors or indiscriminate Drive exports.
- Content collected through full Drive scope.
- Data from unregistered sources.
- Material outside the approved ownership or visibility boundary.
- Secrets not required for Hermes operation.
- Raw passwords, payment credentials, recovery codes, or private authentication factors.
- Unbounded logs, model prompts, model responses, or duplicate source documents.
- Visible Erol-readable deliverables that belong in an approved visible artifact workflow.
- Records that imply Dikey ownership without an explicit ownership assignment.
- A model-generated classification presented as confirmed when no authorized source confirms it.
- Deleted source content beyond the minimum tombstone, hash, and audit metadata required for safe synchronization.

Sensitive cached content must be minimized. When an index can operate with a reference, hash, redacted excerpt, or derived representation, Hermes must prefer the least sensitive form that still satisfies the approved function.

## 7. Use of `drive.file`

`drive.file` is dormant by default.

It may be activated only for a named, documented visible-file workflow approved by Erol. The approval must define:

- The artifact type.
- The business purpose.
- The owning Erol OS domain.
- The destination or creation flow.
- The template and schema.
- Who may trigger creation or update.
- Whether Erol approval is required per artifact or per workflow.
- Retention, naming, and rollback rules.
- Whether the artifact may contain confidential or ownership-sensitive content.

When activated, Hermes may access only files created by or explicitly opened with the approved application under `drive.file`. It must not enumerate or search the user's full Drive.

Potential future uses include approved visible daily briefs, decision exports, or operator-readable status reports. These examples are not authorization.

## 8. Source Read Contracts

Each source adapter must return a normalized envelope:

```text
record_id
record_type
source_id
source_record_id
source_version
source_modified_at
observed_at
owner_domain
classification
visibility
title
content_or_reference
relationships
status
content_hash
coverage_state
```

If a required field is absent, Hermes must mark the record incomplete and must not invent the missing value.

### 8.1 Ledger

The Ledger is the authoritative chronological record for governed `DECISION` and recorded `FACT` entries.

Hermes reads the Ledger:

- Incrementally from the last confirmed ledger cursor.
- In append order.
- With entry identifier, timestamp, actor, classification, status, and source reference preserved.
- Without rewriting historical entries.
- With supersession and reversal represented as later entries, not destructive edits.

Hermes must distinguish an approved decision from a proposal, plan, or implementation status.

### 8.2 Agent Registry

The Agent Registry is the authoritative source for agent identity, purpose, owner, permissions, source subscriptions, output permissions, and lifecycle status.

Hermes reads only active or explicitly auditable agent records. It must not grant an agent access merely because the agent exists.

For each agent, Hermes derives an awareness manifest containing:

- Agent identifier and version.
- Allowed source types.
- Allowed owner domains.
- Allowed classifications.
- Visibility ceiling.
- Read/write capability.
- Required approval gates.
- Last synchronized source cursor.

### 8.3 Idea Queue

The Idea Queue contains ideas that have not automatically become decisions, commitments, ventures, or Dikey assets.

Hermes reads:

- Idea identifier.
- Originator.
- Creation and update time.
- Ownership domain.
- Classification.
- Stage.
- Related entities.
- Evidence and assumptions.
- Next review state.

Unless an authoritative record says otherwise, an idea remains an `HYPOTHESIS` or `VISION`, not a `DECISION`.

### 8.4 Opportunity Radar

The Opportunity Radar contains external or internal opportunity signals and evaluations.

Hermes reads:

- Signal source and date.
- Evidence references.
- Relevance.
- Owner domain.
- Opportunity stage.
- Confidence.
- Risks and constraints.
- Recommended test.
- Expiry or review date.

Radar content is not a commitment. External claims remain `ASSUMPTION` or `HYPOTHESIS` until verified.

### 8.5 Daily Brief

The Daily Brief is a dated synthesis, not a replacement for its source records.

Hermes reads:

- Brief date and version.
- Included source record references.
- Open decisions.
- Confirmed facts.
- Assumptions and hypotheses.
- Agent status.
- Conflicts, stale sources, and coverage warnings.
- Actions requiring Erol attention.

Every brief item must retain classification and source lineage. A summary must not increase the authority of the source material.

## 9. Safe Update Protocol

Hermes uses the following update sequence:

1. Read the authoritative record and capture its version or content hash.
2. Validate the proposed update against schema, ownership, classification, and permission rules.
3. Create a unique idempotency key.
4. Write a pending update envelope to the `appDataFolder` outbox.
5. Re-read or conditionally check the authoritative source version.
6. If approval is required, stop in `PENDING_APPROVAL`.
7. Apply through the approved source adapter only when the expected version still matches.
8. Confirm the committed source version.
9. Record the result and source lineage in the Hermes audit log.
10. Advance the synchronization cursor only after confirmation.

An update envelope must include:

```text
update_id
idempotency_key
target_source
target_record
expected_version
proposed_patch
classification
owner_domain
requested_by
approval_state
created_at
expires_at
reason
source_references
```

Hermes must not silently retry a rejected approval, schema violation, ownership conflict, or version conflict.

## 10. Conflict Prevention

Hermes must implement:

- One canonical source per record type and identifier.
- Stable record identifiers across cache rebuilds.
- Optimistic concurrency using source version, ETag, revision, or content hash.
- Idempotency keys for all write attempts.
- Per-source ordered cursors.
- Append-only handling for ledger history.
- Tombstones for observed deletions.
- Quarantine for malformed, ambiguously owned, or classification-conflicting records.
- No automatic last-write-wins behavior for canonical data.
- No automatic merge of free text when both source and proposal changed.
- Bounded retries only for transient technical failures.

Conflict resolution order:

1. Preserve the authoritative source unchanged.
2. Freeze the conflicting proposal.
3. Record both versions and their lineage.
4. Identify the conflicting fields.
5. Route ownership, classification, decision, and destructive conflicts to Erol.
6. Apply a resolution only through a new controlled update.

## 11. Classification Rules

Every governed memory record must have exactly one primary classification.

### `FACT`

A verifiable statement supported by an authoritative internal record, direct observation, or sufficiently reliable evidence.

Rules:

- Must include a source or observation reference.
- May be corrected by a later fact record.
- Does not become a decision merely because it affects action.
- Example: Erol finances Dikey Elektronik.

### `DECISION`

An authorized choice that establishes direction, permission, prohibition, priority, or commitment.

Rules:

- Must identify the decision authority.
- Erol is the final authority for Erol-level decisions.
- Must include date, scope, status, and source record.
- Proposals and recommendations are not decisions.
- Hermes may record or relay a decision but may not originate Erol's authorization.

### `ASSUMPTION`

A provisional statement accepted temporarily for planning despite incomplete verification.

Rules:

- Must identify what is unverified.
- Must include an owner and review or expiry condition where practical.
- Must not be presented as fact.
- Must be confirmed, revised, or retired when evidence arrives.

### `HYPOTHESIS`

A testable explanation, opportunity claim, or prediction.

Rules:

- Must include a test, evidence need, or falsification condition where practical.
- Does not authorize execution or ownership transfer.
- Remains a hypothesis until evidence supports reclassification.

### `VISION`

A desired future state, strategic aspiration, or long-range direction.

Rules:

- Does not claim present reality.
- Does not itself authorize spending, deployment, ownership transfer, or operational change.
- Requires separate decisions and plans for execution.

### Classification Changes

- Hermes may suggest a reclassification but must preserve the original classification and source.
- Promotion to `DECISION` requires an authorized decision record.
- Promotion to `FACT` requires supporting evidence.
- Conflicting classifications must be quarantined for review.
- Summaries, embeddings, and model outputs inherit the lowest authority needed to avoid overstating their sources.

## 12. Agent Awareness Synchronization Flow

1. Hermes reads the active Agent Registry version.
2. Hermes validates each agent's owner, status, permissions, subscriptions, and visibility ceiling.
3. Hermes reads only source deltas permitted for that agent.
4. Hermes filters records by owner domain, classification, visibility, and approval state.
5. Hermes creates a versioned awareness package containing references, summaries, classifications, and coverage warnings.
6. Hermes stores the package manifest and delivery cursor in `appDataFolder`.
7. Hermes delivers or exposes the package through the approved agent interface.
8. The agent acknowledges the package version.
9. Hermes records acknowledgement, failure, or staleness.
10. Permission reduction, agent suspension, or ownership ambiguity stops future delivery immediately.

Agent awareness is contextual access, not ownership. Receiving a record does not grant the agent authority to modify, approve, disclose, or reclassify it.

## 13. Daily Briefing Synchronization Flow

1. Start from the last successful briefing cursor and the target briefing date.
2. Read deltas from the Ledger, Agent Registry, Idea Queue, Opportunity Radar, and approved operational sources.
3. Validate source freshness, lineage, classification, ownership, and coverage.
4. Deduplicate by canonical record identifier and content hash.
5. Separate content into `FACT`, `DECISION`, `ASSUMPTION`, `HYPOTHESIS`, and `VISION`.
6. Identify conflicts, expired assumptions, stale agent state, unresolved proposals, and items requiring Erol approval.
7. Produce a draft briefing model with source references.
8. Store draft assembly state in `appDataFolder`.
9. Present the briefing through the approved local or application surface.
10. Do not create a visible Drive artifact unless the `drive.file` workflow has been separately approved.
11. Advance the daily briefing cursor only after successful generation and audit recording.

The brief must explicitly state partial coverage. Missing source access must appear as a warning, not as an empty or complete result.

## 14. Security and Rollback

### Security

- Use least-privilege scopes only.
- Keep Vertex AI access and Drive storage permissions logically separate.
- Do not request full Drive scope.
- Do not use service accounts or Workspace delegation.
- Store OAuth client JSON outside the repository.
- Never commit credentials, tokens, or secrets.
- Encrypt sensitive local and `appDataFolder` state using approved platform controls.
- Minimize cached content and retention.
- Redact secrets from logs and model context.
- Maintain an audit trail for source reads, update proposals, approvals, commits, conflicts, and rollbacks.
- Deny access when identity, owner domain, classification, or visibility cannot be validated.
- Surface partial coverage and stale synchronization state to users and agents.

### Rollback

- Cache and index changes must be reversible by restoring the previous manifest or rebuilding from authoritative sources.
- Cursor advancement must occur only after confirmed success.
- Failed batches must leave the prior confirmed cursor intact.
- Canonical updates must retain the prior version or support a compensating record.
- Ledger corrections must be additive and must not erase history.
- Deletions require a tombstone and audit event.
- A rollback must never restore content that the authoritative source currently marks deleted, revoked, or inaccessible without review.
- Credential revocation or scope reduction must stop synchronization and place pending writes on hold.

## 15. Stage 1 Implementation Plan

Stage 1 is a bounded, non-production implementation phase.

1. Define versioned schemas for source envelopes, update envelopes, conflicts, cursors, agent awareness manifests, and briefing state.
2. Create a source registry with deny-by-default ownership, classification, and visibility policies.
3. Implement read-only adapters for the Ledger, Agent Registry, Idea Queue, Opportunity Radar, and Daily Brief.
4. Implement local test fixtures and deterministic contract tests without OAuth.
5. Implement an `appDataFolder` storage interface behind a local test adapter; do not connect it to Google Drive until OAuth execution is separately approved.
6. Implement hashes, cursors, idempotency, tombstones, quarantine, and audit events.
7. Implement the proposal/outbox flow with canonical writes disabled.
8. Implement agent awareness package generation and permission filtering.
9. Implement daily briefing draft generation with classification and coverage warnings.
10. Test ownership isolation so Erol-level, Dikey, personal IP, ORBIFI, DSNSO, Patent, Future Ventures, and Idea Factory records are not conflated.
11. Test conflict, stale-version, duplicate-write, revoked-access, partial-source, and rollback scenarios.
12. Produce a Stage 1 validation report for Erol review.

Stage 1 exit criteria:

- All five source adapters pass read-contract tests.
- No automated visible Drive writes occur.
- No full Drive scope is requested.
- No service account or Workspace delegation path exists.
- Classification and ownership tests pass.
- Duplicate writes are prevented.
- Conflicts are quarantined rather than overwritten.
- Cache can be rebuilt from authoritative sources.
- Partial coverage is visible.
- OAuth and production activation remain unexecuted.

## 16. Actions Requiring Explicit Erol Approval

The following require explicit Erol approval before execution:

- Creating, configuring, downloading, or using an OAuth client.
- Starting an OAuth consent flow.
- Storing or refreshing OAuth tokens.
- Enabling the live `drive.appdata` integration.
- Activating any `drive.file` workflow.
- Defining or changing a visible artifact workflow.
- Creating or updating a visible Drive file through Hermes.
- Any Google Cloud project, API, IAM, billing, quota, consent-screen, or credential change.
- Any deployment, production activation, scheduled execution, or background worker activation.
- Any canonical write capability for the Ledger, Agent Registry, Idea Queue, Opportunity Radar, or Daily Brief.
- Any change to Hermes source access, agent permissions, ownership mappings, visibility rules, or classification authority.
- Any expansion of OAuth scopes.
- Any service account or Workspace delegation proposal.
- Any destructive migration, bulk deletion, or rollback affecting canonical records.
- Any ownership assignment or transfer involving Dikey, Patent, ORBIFI, DSNSO, personal IP, Future Ventures, Idea Factory, or another Erol-level domain.
- Any promotion of a proposal to an Erol-level `DECISION`.
- Any exception to this specification.

Approval must be specific to the named action. Approval of the Hybrid Memory Bus architecture does not authorize OAuth execution, credential creation, cloud modification, deployment, visible-file writes, or production use.

## 17. Non-Goals

- No OAuth execution.
- No credential creation.
- No Google Cloud modification.
- No deployment.
- No full Drive access.
- No service account.
- No Workspace delegation.
- No automatic Dikey ownership assumption.
- No automatic visible Drive artifacts.
- No autonomous decision-making by Hermes.
- No claim that Hermes has complete Erol OS memory coverage.

## 18. Acceptance Rule

Hermes conforms to this specification only when it can synchronize bounded Erol OS memory while preserving:

- Erol's final authority.
- Source-of-truth lineage.
- Ownership separation.
- Classification integrity.
- Least-privilege access.
- Hidden-by-default automated memory writes.
- Explicit approval for visible artifacts and operational activation.

Any implementation that weakens those properties is non-conforming even if it is technically functional.
