# Omnigent Meta-Harness Evaluation - 2026-06-17

## Source

Video:

- `https://www.youtube.com/watch?v=oGE_Dwz-rMk`

Video metadata:

- Title: `Omnigent: The New Meta-Harness for EVERY Coding Agent - Claude Code, Codex, Pi, More`
- Channel: `Cole Medin`
- Length: 14:49

Primary repo:

- `https://github.com/omnigent-ai/omnigent`

Observed repo state on 2026-06-17:

- Public repo under `omnigent-ai/omnigent`
- Apache-2.0 license
- Status badge: `alpha`
- Python 3.12+
- About 2.6k stars, 305 forks, 249 commits at check time

## What It Is

Omnigent is a meta-harness for AI coding agents.

It is not another coding model. It is a control layer for running and coordinating multiple agents such as:

- Claude Code
- Codex
- Cursor
- Pi
- custom YAML-defined agents

The repo positions it as a shared layer for swapping or combining agent harnesses, applying policies/sandboxing, and collaborating on the same live session from terminal, browser or phone.

## Main Ideas From The Video

### 1. One Agent Plans, Another Implements, Another Reviews

The video's strongest pattern is:

1. A lead/orchestrator agent plans the coding task.
2. Implementation is delegated to a coding agent such as Claude Code in its own git worktree.
3. The resulting diff is routed to another agent such as Codex for review.
4. A human decides what to merge.

This is very close to the process we have been designing:

- planner
- implementer
- reviewer
- human approval gate
- GitHub repo discipline
- worktree isolation

### 2. Polly Pattern

Omnigent includes an example called `Polly`.

Polly is described as a tech-lead style orchestrator:

- writes no code herself
- plans the work
- delegates to coding sub-agents
- can run agents in parallel git worktrees
- sends each diff to a reviewer from a different vendor
- leaves the final merge decision to the human

This is directly relevant to the Erol OS coding workflow.

### 3. Debby Pattern

Omnigent includes an example called `Debby`.

Debby is a multi-model debate pattern:

- sends a question to Claude and GPT-style heads
- lays answers side by side
- can run debate rounds
- converges after critique

This overlaps with our OpenRouter Fusion interest, but gives a local/session-level implementation pattern instead of only a hosted model-router product.

### 4. Governance Layer

Omnigent emphasizes policies:

- pause for human approval before risky actions
- cap spend
- limit tool access
- apply controls per server, agent or chat

This matters because our current workflow has high-risk actions:

- domain renewals/transfers
- DNS changes
- GitHub pushes
- payment/account operations
- credential handling

### 5. Multi-Device Sessions

The repo describes sessions that can move between terminal, browser and phone, with messages, terminals, files and sub-agents staying in sync.

This is useful, but it is not the first thing to adopt. The first valuable part is the orchestration pattern.

## Why It Matters For Erol OS

Omnigent is one of the closest matches so far to the Erol OS "agent operating layer" idea.

Potential fit:

- `Codex reviews Claude Code`
- `Claude Code implements while Codex supervises`
- `Fusion/Debby-style debate for major decisions`
- Git worktrees for isolated agent work
- policy gates before irreversible actions
- a single live session that can be resumed from different devices

It could become the future harness for:

- `erol-os-core/agents/`
- `erol-os-scout/tool-evals/omnigent/`
- `erol-os-ops/review-protocols/`

## Relationship To Current Tools

### CodeGeeX

CodeGeeX is a local/offline coding model candidate.

Omnigent is the orchestration layer that could decide when to call Codex, Claude Code, CodeGeeX, Ollama or another tool.

So:

- CodeGeeX = possible worker/model.
- Omnigent = possible manager/harness.

### OpenRouter Fusion

Fusion is a multi-model review/deliberation product.

Omnigent's Debby pattern is similar in spirit, but Omnigent is more about local agent sessions, workflows and harnesses.

So:

- Fusion = external model council/review mode.
- Omnigent = agent work orchestration and governance.

### Dify

Dify is better for app-like LLM workflows, RAG, agents and deployed automation.

Omnigent is better for developer/coding-agent orchestration.

So:

- Dify = product/workflow platform.
- Omnigent = coding-agent command center.

## Risks

Status is alpha.

Do not use Omnigent yet for:

- GoDaddy account operations
- Hetzner domain transfer
- production DNS
- private repos with secrets
- unattended GitHub push/merge
- payment/billing actions

Potential concerns:

- young project
- many moving pieces
- multiple agent credentials in one place
- web/mobile sharing may expand attack surface
- policy system must be tested before trust
- cloud sandbox options need separate review

## Suggested Erol OS Pilot

Pilot name:

- `omnigent-meta-harness-sandbox`

Repo placement:

- `erol-os-scout/tool-evals/omnigent/`

Pilot input:

- one toy/sanitized coding task
- no real credentials
- no domain/account operations
- no proprietary repo

Test workflow:

1. Install only in a sandbox environment after GitHub setup is stable.
2. Run a toy project.
3. Try `Polly`: planner delegates implementation, another agent reviews diff.
4. Try `Debby`: compare debate output against OpenRouter Fusion on one sanitized decision.
5. Inspect generated worktrees and diffs manually.
6. Confirm policies can pause risky operations.

Acceptance criteria:

- agent work is isolated in worktrees
- review output is clearer than single-agent review
- human approval remains obvious
- no private code leaves the intended environment
- cost controls are understandable
- uninstall/stop path is clear

## Decision

Status: HIGH-INTEREST / SANDBOX LATER

Priority:

1. Finish urgent Hetzner/GoDaddy evidence and GitHub setup.
2. Run CodeGeeX local sandbox as the first China/local-model test.
3. Use OpenRouter Fusion manually for high-value second opinions.
4. Then evaluate Omnigent as the meta-harness candidate.

Do now:

- Add Omnigent to the AI workflow watchlist.
- Add it to the `erol-os-scout` repo plan.
- Treat its Polly/Debby patterns as architecture inspiration immediately.

Do not do yet:

- install it into the main working repo
- connect real credentials
- expose private Erol OS code
- use it for domain/DNS/account operations

