# OpenRouter Fusion Video Prompts and Workflow - 2026-06-17

## Source

Video:

- `https://www.youtube.com/watch?v=muTKrIRucMc&list=LL`

Observed metadata:

- Title: `Sonunda Claude Fable 5’i Bile Geride Birakan Yeni AI Sistem: OpenRouter Fusion`
- Channel: `Omer Gocmen | Yapay Zeka & Otomasyon`
- Length: `584` seconds

Official references:

- `https://openrouter.ai/fusion`
- `https://openrouter.ai/openrouter/fusion`
- `https://openrouter.ai/docs/guides/routing/routers/fusion-router`
- `https://openrouter.ai/docs/guides/features/plugins/fusion`
- `https://openrouter.ai/docs/guides/features/server-tools/fusion`
- `https://openrouter.ai/blog/announcements/fusion-beats-frontier/`

Transcript note:

- YouTube metadata shows Turkish auto-captions, but timedtext returned empty during this check.
- This note is based on video title/description plus official OpenRouter documentation.

## Core Idea

OpenRouter Fusion is not "one more model." It is a multi-model deliberation pattern:

1. Send the same prompt to a panel of models.
2. Let each model answer independently.
3. Use a judge/synthesis model to compare answers.
4. Extract consensus, contradictions, partial coverage, unique insights and blind spots.
5. Produce a final answer from the structured analysis.

This maps directly to Erol OS because we already need:

- second opinions
- cross-model review
- source conflict detection
- expensive-decision protection
- cost/quality routing

## Useful Concepts To Adopt

### 1. Model Council

Use multiple models only when a single model is not enough.

Good cases:

- domain sale/renewal decisions
- registrar/DNS/email changes
- architecture decisions
- tool adoption
- security review
- source-backed research

Bad cases:

- small text edits
- short tactical Q&A
- routine status updates
- anything with sensitive data unless explicitly sanitized

### 2. Judge Output As A First-Class Artifact

Do not just ask for "best answer." Store the judge analysis:

- consensus
- contradictions
- partial coverage
- unique insights
- blind spots
- final recommendation

Erol OS value:

- This can become evidence for decision ledger entries.

### 3. Budget vs Quality Presets

Official docs describe Quality and Budget-style panels.

Erol OS rule:

- Use Budget for exploratory research.
- Use Quality for high-cost/high-risk decisions.
- Always record which mode was used.

### 4. Fusion Is A Review Mode, Not Default Mode

Fusion is expensive and slower than a single model.

Default:

- Use normal Codex/ChatGPT/Ollama for ordinary work.

Escalate to Fusion:

- when being wrong is costly
- when sources conflict
- when a decision affects money, DNS, OAuth, GitHub security, or architecture

## Prompt Patterns

### 1. Fusion Review Prompt

Use for high-value decisions.

```text
You are running a multi-model review for an Erol OS decision.

Question:
<exact decision question>

Context:
<short factual context>

Sources allowed:
<source list>

Constraints:
- Do not assume facts not in sources.
- Separate consensus from uncertainty.
- Identify contradictions.
- Identify blind spots.
- Give a final recommendation with confidence.

Output:
1. Decision recommendation
2. Consensus points
3. Disagreements / contradictions
4. Missing evidence
5. Risks
6. Next action
```

### 2. Fusion Domain-Ops Prompt

Use for GoDaddy/Hetzner decisions.

```text
Review this domain operation plan with multiple-model deliberation.

Question:
Which domains should be renewed, sold, transferred, or left untouched before the next expiration deadlines?

Use only:
- sanitized domain inventory
- RDAP/DNS facts
- official GoDaddy / Hetzner / ICANN docs

Do not use:
- passwords
- payment card data
- raw email contents
- unsanitized invoices

Return:
- domain-by-domain decision
- risks for DNS/email/ownership
- actions before any transfer
- which decisions require human confirmation
```

### 3. Fusion Tool-Adoption Prompt

Use for tools like Dify, CodeGeeX, Trae, Qoder, Coze.

```text
Evaluate whether this AI tool should enter Erol OS.

Tool:
<tool name>

Evidence:
<official docs, GitHub, pricing, community notes>

Evaluate:
- usefulness
- data/privacy risk
- local/self-host option
- production maturity
- integration fit
- cost
- lock-in

Return one of:
- adopt now
- local sandbox
- pilot
- watch
- reject

Also give the smallest safe pilot.
```

### 4. Fusion Architecture Prompt

Use for Hermes / Memory Bus / GitHub repo architecture.

```text
Review this architecture decision as a model council.

Architecture proposal:
<proposal>

Known constraints:
<constraints>

Evaluate:
- correctness
- security
- ownership boundaries
- operational risk
- future maintainability
- what could go wrong

Return:
- strongest argument for
- strongest argument against
- required safeguards
- final recommendation
- whether this should become an Erol OS decision
```

### 5. Fusion Second-Opinion Prompt For Codex Work

Use after a build/review.

```text
Review this Codex-produced plan or diff.

Focus:
- hidden risk
- missing tests
- security issue
- data exposure
- operational side effect
- overengineering

Return:
- critical/high/medium/low findings
- exact evidence
- what should be changed before commit
- whether it is safe to proceed
```

## Erol OS Adoption Rule

Create a new review mode:

```text
FUSION_REVIEW
```

Trigger conditions:

- money involved
- domain/DNS/email changes
- production deployment
- OAuth/credential changes
- GitHub automation/security changes
- core architecture decision
- conflicting sources
- high uncertainty

Non-trigger conditions:

- normal writing
- local file cleanup
- simple code changes
- quick summaries
- internal notes

## First Practical Pilot

Pilot:

- `fusion-domain-ops-review`

Input:

- `URGENT_GODADDY_TO_HETZNER_DOMAIN_TRANSFER.md`
- `GODADDY_DOMAIN_SALE_CANDIDATES_2026-06-17.md`
- official GoDaddy / Hetzner / ICANN docs

Question:

```text
Before the Hetzner operation, which domains require immediate renewal/protection, which are sale candidates, and which should not be touched?
```

Expected value:

- catch hidden DNS/email risks
- challenge single-model assumptions
- improve action order
- document uncertainty before panel operations

## What To Take From The Video

Adopt:

- model council for hard decisions
- judge/synthesis output
- budget vs quality routing
- blind spot checking
- consensus vs contradiction reporting

Pilot:

- Fusion review for domain operations.
- Fusion review for Dify/CodeGeeX/Trae/Qoder tool adoption.

Do not adopt yet:

- automatic Fusion calls on every request
- sending private files automatically
- using Fusion as proof without source review
- letting Fusion make final Erol-level decisions

## Decision

Status:

- MUST BE ON THE TABLE

Erol OS placement:

- `erol-os-scout/tool-evals/openrouter-fusion/`
- Later if successful: `erol-os-core/decision-protocols/FUSION_REVIEW.md`

