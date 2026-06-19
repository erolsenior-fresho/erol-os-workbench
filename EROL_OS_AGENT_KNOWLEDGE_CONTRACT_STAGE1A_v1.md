# EROL_OS_AGENT_KNOWLEDGE_CONTRACT_STAGE1A_v1

## 1. Purpose

Stage 1A defines the Agent Knowledge Contract for Erol OS.

The contract turns the Agent Awareness Registry from a collection of static agent status files into a governed shared knowledge-awareness model. It specifies how agents describe what they know, where that knowledge came from, what they may share, and how disagreements are handled.

This document is specification only.

- No deployment.
- No automation.
- No runtime activation.
- No OAuth execution.
- No credential creation.
- No Google Cloud modification.
- No agent permissions are changed by this document.

## 2. Governing Principles

1. Erol is the top-level owner and final decision authority.
2. Erol OS is the founder operating system.
3. Dikey Elektronik is one commercial execution layer under Erol.
4. Patent, ORBIFI, DSNSO, personal IP, Future Ventures, and Idea Factory material are not automatically Dikey assets.
5. Erol financing Dikey Elektronik is a `FACT`; it does not imply transfer of Erol-level ownership.
6. Canonical sources remain authoritative over agent memory.
7. Awareness does not grant ownership, write authority, approval authority, or disclosure authority.
8. Agents must preserve classification and provenance.
9. Missing knowledge must be represented as unknown, unavailable, stale, or partial rather than invented.
10. Propagation is deny-by-default and bounded by purpose, ownership, classification, visibility, and agent permissions.

## 3. Scope

Stage 1A covers:

- ChatGPT Supervisor.
- Antigravity Sonnet.
- Claude Cowork.
- Hermes.
- Codex.
- Marvis.
- Scout.

It defines:

- Agent identity and knowledge capabilities.
- Knowledge records and claims.
- Agent awareness state.
- Knowledge ownership and stewardship.
- Synchronization envelopes and acknowledgement.
- Conflict detection and resolution.
- Awareness propagation.
- Stage 1A implementation requirements.

Stage 1A does not authorize:

- Autonomous canonical writes.
- Autonomous decisions.
- Automatic reclassification.
- Unbounded cross-agent context sharing.
- Full-file or full-Drive access.
- Production synchronization.

## 4. Conceptual Model

The Agent Knowledge Contract separates six concepts.

### 4.1 Agent

A registered Erol OS participant with a stable identity, declared purpose, capabilities, permissions, and lifecycle status.

### 4.2 Canonical Record

An authoritative record held in an approved Erol OS source, including the Ledger, Agent Registry, Idea Queue, Opportunity Radar, Daily Brief, or another explicitly registered source.

### 4.3 Knowledge Claim

A bounded statement known or proposed by an agent. A claim is not automatically canonical.

### 4.4 Awareness State

A record of which canonical records or claims an agent has received, acknowledged, rejected, superseded, or not yet seen.

### 4.5 Knowledge Package

A versioned set of references, summaries, claims, warnings, and permissions prepared for one receiving agent.

### 4.6 Knowledge Event

An append-only event describing creation, observation, propagation, acknowledgement, conflict, supersession, revocation, or expiry.

## 5. Data Model

### 5.1 Agent Contract

Each registered agent must have one Agent Contract.

```text
agent_id
display_name
agent_version
purpose
owner
lifecycle_status
capabilities
prohibited_actions
knowledge_domains
source_subscriptions
accepted_classifications
visibility_ceiling
read_permissions
proposal_permissions
canonical_write_permissions
propagation_permissions
approval_gates
freshness_requirements
contract_version
effective_at
superseded_by
```

Rules:

- `agent_id` is stable across sessions.
- `owner` identifies the governing Erol OS authority, not information ownership.
- `canonical_write_permissions` default to none.
- An absent permission is denied.
- Agent capability does not imply permission.
- Contract changes require a new version and an audit event.

### 5.2 Knowledge Record

```text
knowledge_id
record_type
title
statement
classification
canonical_status
source_id
source_record_id
source_version
source_modified_at
observed_at
owner_domain
steward
visibility
confidence
valid_from
review_at
expires_at
supersedes
relationships
content_hash
coverage_state
```

`classification` must be exactly one of:

- `FACT`
- `DECISION`
- `ASSUMPTION`
- `HYPOTHESIS`
- `VISION`

`canonical_status` must distinguish:

- `CANONICAL`
- `PROPOSED`
- `DERIVED`
- `DISPUTED`
- `SUPERSEDED`
- `REVOKED`

`coverage_state` must distinguish:

- `COMPLETE_FOR_REGISTERED_SOURCE`
- `PARTIAL`
- `STALE`
- `UNAVAILABLE`
- `UNKNOWN`

### 5.3 Knowledge Claim

An agent-created statement uses the Knowledge Claim model.

```text
claim_id
claiming_agent_id
claiming_agent_version
statement
classification
claim_status
owner_domain
source_references
evidence
confidence
reason
created_at
review_at
expires_at
proposed_canonical_target
related_knowledge_ids
content_hash
```

`claim_status` must distinguish:

- `OBSERVED`
- `PROPOSED`
- `NEEDS_EVIDENCE`
- `CONFLICTED`
- `ACCEPTED`
- `REJECTED`
- `EXPIRED`
- `SUPERSEDED`

An agent claim remains non-canonical until accepted through an authorized Erol OS process.

### 5.4 Agent Awareness State

```text
agent_id
contract_version
awareness_version
knowledge_id
knowledge_version
awareness_status
received_at
acknowledged_at
last_used_at
fresh_until
delivery_source
summary_hash
permission_snapshot
warning_codes
```

`awareness_status` must distinguish:

- `NOT_SEEN`
- `DELIVERED`
- `ACKNOWLEDGED`
- `STALE`
- `REVOKED`
- `REJECTED`
- `CONFLICTED`

Awareness state records receipt and currency. It does not duplicate canonical content.

### 5.5 Knowledge Event

```text
event_id
event_type
occurred_at
actor_id
knowledge_id
claim_id
source_version
target_agent_id
package_id
previous_state
new_state
reason
correlation_id
```

Events are append-only. Corrections are represented through later events.

### 5.6 Knowledge Package

```text
package_id
target_agent_id
target_contract_version
created_at
created_by
purpose
source_cursor
knowledge_references
claim_references
summaries
classifications
owner_domains
visibility
coverage_warnings
conflict_warnings
expires_at
package_hash
```

A package must be specific to one target agent and one declared purpose.

## 6. Agent Role Contracts

### 6.1 ChatGPT Supervisor

Primary role:

- Cross-domain supervision, prioritization, synthesis, and escalation.

Knowledge posture:

- May receive broad Erol OS awareness within its approved visibility ceiling.
- May create summaries, proposed priorities, and escalation claims.
- May not convert a recommendation into an Erol-level `DECISION`.
- Must expose source conflicts and partial coverage.

### 6.2 Antigravity Sonnet

Primary role:

- Workspace execution and artifact production within assigned projects.

Knowledge posture:

- Receives project scope, approved decisions, constraints, current priorities, and relevant dependencies.
- May report implementation observations and completion evidence.
- Must not infer ownership from project location or commercial context.
- Must not propagate project-local material beyond authorized domains.

### 6.3 Claude Cowork

Primary role:

- Collaborative analysis, document work, and bounded workspace research.

Knowledge posture:

- Receives task-specific context and approved shared references.
- May propose interpretations and document changes.
- Must label inferred statements as `ASSUMPTION` or `HYPOTHESIS`.
- Must not treat conversational context as canonical without a source record.

### 6.4 Hermes

Primary role:

- Bounded retrieval, synchronization, context distribution, and awareness-state management.

Knowledge posture:

- May prepare and route knowledge packages according to Agent Contracts.
- May maintain synchronization metadata and awareness state.
- May detect conflicts, staleness, missing acknowledgement, and permission changes.
- May not become the canonical owner of propagated knowledge.
- May not broaden access or resolve semantic conflicts autonomously.

### 6.5 Codex

Primary role:

- Codebase analysis, implementation, testing, and technical documentation.

Knowledge posture:

- Receives repository scope, technical decisions, contracts, constraints, and relevant incident knowledge.
- May generate technical observations and implementation proposals.
- Runtime behavior verified by tests may be proposed as `FACT` with evidence.
- Design choices remain proposals unless accepted as decisions.
- Source-code access does not grant access to unrelated Erol OS domains.

### 6.6 Marvis

Primary role:

- Operational status aggregation and decision-support visibility.

Knowledge posture:

- Receives approved health, milestone, blocker, risk, and status information.
- May synthesize dashboards and status summaries.
- Must preserve the difference between reported status and verified status.
- Must not suppress stale, partial, or disputed indicators.

### 6.7 Scout

Primary role:

- Opportunity, technology, market, and external-signal research.

Knowledge posture:

- Receives approved strategic context and research questions.
- External claims default to `ASSUMPTION` or `HYPOTHESIS` until verified.
- May propose opportunity records and tests.
- May not create commitments, purchases, adoption decisions, or Dikey ownership assignments.

## 7. Sync Model

Stage 1A defines synchronization behavior but does not activate it.

### 7.1 Synchronization Direction

```text
Canonical Sources
    -> Knowledge Normalization
    -> Permission and Relevance Filter
    -> Agent-Specific Knowledge Package
    -> Agent Acknowledgement
    -> Awareness State
    -> Claims and Observations
    -> Review Queue
    -> Authorized Canonical Process
```

### 7.2 Source-to-Agent Flow

1. Read the registered source version.
2. Normalize the record without changing classification or meaning.
3. Validate ownership, visibility, lifecycle, and freshness.
4. Match the record against the receiving Agent Contract.
5. Remove fields outside the agent's permission or purpose.
6. Add lineage, classification, coverage, and conflict warnings.
7. Create an immutable package version.
8. Deliver the package through an approved interface.
9. Record delivery without assuming comprehension.
10. Record explicit acknowledgement or timeout.

### 7.3 Agent-to-System Flow

1. The agent produces a Knowledge Claim.
2. Validate the agent's proposal permission and target domain.
3. Validate classification, evidence, and source references.
4. Check for duplicate, superseded, or conflicting claims.
5. Store the claim as non-canonical.
6. Route it to the appropriate steward or approval queue.
7. Record acceptance, rejection, conflict, or expiry.
8. Propagate the result to affected agents.

### 7.4 Synchronization Modes

Stage 1A recognizes:

- `FULL_SNAPSHOT`: initial bounded awareness package.
- `DELTA`: changes since an acknowledged cursor.
- `CORRECTION`: corrected or superseding knowledge.
- `REVOCATION`: removal of access or invalidation of knowledge.
- `REFRESH`: same knowledge with renewed source validation.

No last-write-wins mode is permitted for canonical knowledge.

### 7.5 Freshness

Each knowledge type must define:

- Maximum acceptable age.
- Refresh trigger.
- Expiry behavior.
- Whether stale knowledge may still be displayed.
- Whether stale knowledge may be used for action.

Expired or stale knowledge must remain visibly marked. It must not silently disappear when its absence could mislead an agent.

## 8. Knowledge Ownership Model

### 8.1 Ownership Layers

The model separates:

- `OWNER`: Erol or the explicitly assigned Erol OS domain that owns the underlying subject or asset.
- `CANONICAL_AUTHORITY`: the approved source that controls the record.
- `STEWARD`: the role responsible for maintaining record quality.
- `CONTRIBUTOR`: an agent or person that submits a claim or evidence.
- `CONSUMER`: an agent authorized to receive awareness.
- `TRANSPORT`: Hermes or another approved mechanism that routes knowledge.

Transport, contribution, stewardship, and consumption do not create ownership.

### 8.2 Owner Domains

At minimum, records must distinguish:

- `EROL_TOP_LEVEL`
- `EROL_OS_GOVERNANCE`
- `DIKEY_ELEKTRONIK`
- `PATENT`
- `ORBIFI`
- `DSNSO`
- `PERSONAL_IP`
- `FUTURE_VENTURES`
- `IDEA_FACTORY`
- `PROJECT_SPECIFIC`
- `EXTERNAL`
- `UNASSIGNED`

`UNASSIGNED` records may be reviewed but must not be propagated as if ownership were known.

### 8.3 Ownership Assignment

- Ownership must come from an authoritative source or explicit Erol decision.
- Agents may propose ownership but may not assign it.
- File location, funding, discussion context, agent involvement, or operational use is not sufficient evidence of ownership.
- Cross-domain records require explicit relationship metadata.
- Dikey execution of work does not automatically make the underlying IP a Dikey asset.

## 9. Conflict Rules

### 9.1 Conflict Types

- `SOURCE_VERSION_CONFLICT`: two versions claim to be current.
- `CLASSIFICATION_CONFLICT`: the same statement carries incompatible classifications.
- `OWNERSHIP_CONFLICT`: records assign different owner domains.
- `SEMANTIC_CONFLICT`: statements cannot both be true in the same scope and time.
- `AUTHORITY_CONFLICT`: a lower-authority source contradicts a canonical source.
- `PERMISSION_CONFLICT`: propagation exceeds the receiving Agent Contract.
- `FRESHNESS_CONFLICT`: an older record conflicts with a newer observation.
- `DUPLICATE_CONFLICT`: equivalent claims have different identifiers or metadata.

### 9.2 Authority Order

Conflict evaluation follows:

1. Explicit Erol decision or statement recorded in a canonical source.
2. Active canonical Erol OS record.
3. Verified direct evidence with provenance.
4. Approved agent observation.
5. Agent proposal or derived summary.
6. External report.
7. Unsupported model inference.

Higher authority does not erase lower-authority records. It determines operational precedence while the conflict remains auditable.

### 9.3 Conflict Handling

1. Preserve all source records.
2. Mark affected knowledge as `DISPUTED` or `CONFLICTED`.
3. Stop propagation as settled knowledge.
4. Propagate a conflict warning where awareness of the dispute is necessary.
5. Identify source, field, classification, owner domain, and time scope.
6. Route to the canonical steward.
7. Escalate ownership, Erol-level decision, destructive, or unresolved authority conflicts to Erol.
8. Resolve through a new canonical record or superseding event.
9. Propagate the resolution and revoke obsolete package versions.

Agents must not resolve conflicts by majority vote, recency alone, model confidence, or silent merging.

## 10. Awareness Propagation Rules

### 10.1 Eligibility

Knowledge may be propagated only when:

- The source is registered.
- The record has a known owner domain.
- The classification is valid.
- The receiving agent is active.
- The Agent Contract allows the source, domain, classification, and visibility.
- The package has a declared purpose.
- The record is relevant to that purpose.
- Required approvals are present.

### 10.2 Minimum Necessary Awareness

Agents receive the least information required for their function.

Preference order:

1. Record reference and status.
2. Bounded summary.
3. Relevant fields.
4. Full record only when required and permitted.

### 10.3 Classification Preservation

- `FACT` remains `FACT` only with its evidence and source lineage.
- `DECISION` must include decision authority, date, scope, and status.
- `ASSUMPTION` must remain visibly provisional.
- `HYPOTHESIS` must include its evidence need or test where available.
- `VISION` must not be presented as current state or authorization.
- Summaries may reduce detail but must not increase authority.

### 10.4 Correction and Revocation

When knowledge changes:

- A correction package must identify the superseded knowledge.
- A revocation must identify whether content, access, or authority was revoked.
- Agents must mark prior awareness stale or revoked.
- Derived summaries and downstream claims must be re-evaluated.
- Revoked knowledge must not be used for new action.

### 10.5 Propagation Restrictions

Agents must not:

- Forward a package to another agent unless explicitly permitted.
- Remove provenance or warnings.
- Propagate private reasoning as canonical knowledge.
- Spread secrets through summaries.
- Treat acknowledgement as agreement.
- Treat non-acknowledgement as rejection.
- Infer that all agents share the same knowledge.

### 10.6 Awareness Levels

Each agent-record relationship may be:

- `NONE`: no awareness authorized.
- `REFERENCE`: identifier, title, classification, and status only.
- `SUMMARY`: bounded summary with provenance.
- `DETAIL`: approved record fields.
- `FULL`: full record content within visibility limits.

The default is `NONE`.

## 11. Stage 1A Implementation Specification

Stage 1A remains non-automated and non-deployed. Implementation means creating and validating the contracts, schemas, and manual operating procedures needed for a later controlled activation.

### 11.1 Deliverables

1. Versioned Agent Contract schema.
2. Versioned Knowledge Record schema.
3. Versioned Knowledge Claim schema.
4. Versioned Agent Awareness State schema.
5. Versioned Knowledge Event schema.
6. Versioned Knowledge Package schema.
7. Owner-domain registry.
8. Source registry specification.
9. Classification and visibility policy matrix.
10. Seven initial Agent Contracts.
11. Conflict taxonomy and manual resolution procedure.
12. Awareness propagation matrix.
13. Manual synchronization test fixtures.
14. Stage 1A validation report template.

### 11.2 Registry Transition

The existing Agent Registry must evolve conceptually from:

```text
agent identity + capability + current status
```

to:

```text
agent identity
+ authority and prohibitions
+ knowledge domains
+ source subscriptions
+ visibility ceiling
+ proposal permissions
+ propagation permissions
+ freshness requirements
+ awareness cursor
```

Existing status files remain source material during Stage 1A. They must not be destructively overwritten by this specification.

### 11.3 Initial Propagation Matrix

| Agent | Primary awareness | Default exclusions |
|---|---|---|
| ChatGPT Supervisor | Cross-domain decisions, priorities, conflicts, agent and project status | Secrets and raw records not required for supervision |
| Antigravity Sonnet | Assigned project scope, decisions, constraints, dependencies | Unrelated ventures and personal IP |
| Claude Cowork | Task-specific documents, approved context, relevant decisions | Unrelated confidential domains |
| Hermes | Source metadata, permitted content, routing policy, awareness state | Ownership authority and autonomous conflict resolution |
| Codex | Repository scope, technical contracts, incidents, implementation decisions | Unrelated business, personal, and venture records |
| Marvis | Approved status, milestones, blockers, risks, coverage warnings | Raw secrets and unapproved claims |
| Scout | Strategic questions, opportunity context, research constraints | Confidential implementation detail unless required |

The matrix is an initial design constraint, not runtime authorization.

### 11.4 Manual Validation Scenarios

Stage 1A must define fixtures for:

1. A new Erol-level decision relevant to all agents.
2. A Dikey project fact that must not transfer ownership.
3. A Patent record visible to Supervisor but not project agents.
4. A Scout hypothesis requiring evidence.
5. A Codex technical fact supported by a test result.
6. Two agents reporting conflicting project status.
7. A stale Daily Brief item.
8. A revoked agent permission.
9. A superseded decision.
10. A Hermes package with partial source coverage.
11. An unassigned ownership record.
12. An agent attempting unauthorized onward propagation.

### 11.5 Acceptance Criteria

Stage 1A is complete when:

- All seven agents have versioned draft Agent Contracts.
- Every knowledge object carries provenance, classification, owner domain, and canonical status.
- Awareness can be represented without copying canonical ownership.
- Claims remain distinguishable from canonical records.
- Missing, stale, partial, conflicted, and revoked knowledge are explicit.
- The propagation matrix enforces least necessary awareness.
- Ownership separation tests pass on paper and through fixture review.
- No agent can create an Erol-level decision through the contract.
- No static agent status file is treated as complete shared knowledge.
- No deployment or automation has occurred.

## 12. Approval Gates

Explicit Erol approval is required before:

- Activating automated knowledge synchronization.
- Changing canonical Agent Registry structures.
- Granting canonical write authority to an agent.
- Expanding any agent's source, domain, classification, or visibility access.
- Activating Hermes propagation.
- Connecting Stage 1A to Drive, OAuth, Google Cloud, or external systems.
- Assigning or changing knowledge ownership.
- Resolving an Erol-level decision or ownership conflict.
- Deploying background workers, schedules, daemons, or event triggers.
- Moving from manual fixtures to live data.

## 13. Non-Goals

- No shared global prompt containing all Erol OS knowledge.
- No unrestricted agent-to-agent messaging.
- No central agent that becomes owner of all knowledge.
- No replacement of canonical source records with summaries or embeddings.
- No autonomous promotion of claims.
- No automatic ownership inference.
- No production event bus.
- No OAuth, cloud, or Drive activation.
- No code implementation.

## 14. Stage 1A Decision Boundary

The Agent Knowledge Contract defines how shared awareness must work before automation is considered.

It does not authorize runtime synchronization. It establishes the data, ownership, conflict, and propagation rules needed to prevent agent awareness from becoming uncontrolled duplication, false consensus, or accidental authority.
