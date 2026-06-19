# Onur Tirpan Video Prompts and Tools Inventory - 2026-06-17

## Source

Video:

- `https://www.youtube.com/watch?v=EIoPt1ry6ng`

Repository:

- `https://github.com/onurtirpan/todo-yt`

Observed video title:

- `Claude Code'u nasil kullaniyorum? Sifirdan AI destekli uygulama gelistiriyoruz!`

Observed video description summary:

- Claude Code ve Codex ile sifirdan AI destekli tool app gelistirme.
- App sadece todo degil; AI destekli kategori algilama ve internetten arastirma ozellikleri var.
- Setup, urun tasarim adimlari ve agent workflow'u kesintisiz gosteriliyor.

## Video Chapter Inventory

| Time | Topic | Meaning for Erol OS |
|---:|---|---|
| 00:00 | Stack: Go + React + SQLite, Opus Max Thinking, Caveman mode | Small full-stack local app; token-efficient agent communication. |
| 06:10 | Setup: voice command, dual Claude account, MCPs: Context7, SuperPower, Playwright | Faster operator loop; richer context; browser/UI verification. |
| 09:30 | 3 parallel sub-agents: DB / API / Frontend + orchestrator | Split work by layer; main agent coordinates against shared contract. |
| 33:30 | First UI test; disliked first UI | Early visual test before overbuilding. |
| 38:00 | 5 UI directions: Swiss, Brutalist, Aurora Glass, Editorial, Terminal; Frost selected | Generate alternatives, pick one, delete the rest. |
| 1:00:40 | Intent Detection with GPT-5.4 | User input becomes structured category automatically. |
| 1:10:50 | Debug Event Overlay | Show LLM call timing, cost, prompt/response trace. |
| 1:17:20 | AI Research Pipeline with Firecrawl | Web research -> summary -> user-facing answer. |
| 1:28:30 | GPT-5.4 Mini vs Medium cost comparison | Compare quality vs cost before standardizing model tier. |
| 1:38:10 | Codex second opinion: security / maintainability / bug scan | Use a second agent for code review before finalizing. |

## Tool / Software Short Intros

### Claude Code

Agentic coding tool used as the primary builder. In the video, it coordinates backend, frontend, database, UI design, AI features, and debugging notes.

Erol OS use:

- Good for app build pilots.
- Best when given a contract, repo rules, and staged tasks.

### Codex

Used for second opinion / review. The repo notes describe a read-only review path where Codex inspects a diff or source set for bugs, security issues, maintainability, and severity.

Erol OS use:

- Good for review passes before commit/push.
- Good for comparing Claude/Codex outputs.

### Caveman Mode

A compressed communication style/plugin that makes agent output terse to reduce token use. The public Caveman project describes itself as a Claude Code skill/plugin that also targets Codex, Gemini, Cursor and others.

Useful for:

- Repetitive status updates.
- Clear implementation steps.
- Long agent sessions where output verbosity is wasteful.

Do not use for:

- Strategic reasoning.
- Explaining tradeoffs to humans.
- Debugging unfamiliar failures.
- Final docs or collaborator-facing outputs.

Erol OS rule:

- Use "terse mode" for internal implementation loops only.
- Keep final records normal, readable and evidence-backed.

### MCP

Model Context Protocol. In this workflow, MCPs give the agent controlled access to external capabilities or richer context.

Mentioned MCP/tools:

- Context7
- SuperPower
- Playwright

Erol OS use:

- MCP is useful, but every MCP increases authority surface.
- Add only when a tool has a clear job and safety boundary.

### Context7

Developer documentation/context tool. Usually used to pull current library docs into the coding session.

Erol OS use:

- Use for framework/library docs in app builds.
- Prefer official docs and scoped queries.

### SuperPower

Appears in the video setup as an MCP/tool in Onur's stack. Exact function should be verified from the installed tool or video segment before adoption.

Erol OS use:

- Mark as "investigate before install."

### Playwright

Browser automation and visual verification tool. Used to check UI, screenshots, layout, and possibly browser interactions.

Erol OS use:

- Very good fit for dashboard/app pilots.
- Required for visual QA before calling a UI "done."

### Go

Backend language. Onur's repo uses Go with standard-library `net/http`.

Why it matters:

- Small, fast backend.
- Easy local binary.
- Good for durable internal tools.

### React + TypeScript + Vite

Frontend stack. Fast local dev with typed UI/API contracts.

Erol OS use:

- Good default for dashboards and operator tools.

### Tailwind v4

Styling system used by the frontend. Repo notes specifically use Tailwind v4 via Vite plugin.

Erol OS use:

- Good for fast UI builds.
- Must still follow our restrained operational UI style.

### SQLite

Local database. Onur's repo uses pure-Go SQLite driver `modernc.org/sqlite`, avoiding CGO/compiler friction.

Erol OS use:

- Good for local-first tools, small dashboards, queues and audit trails.

### Azure OpenAI / GPT-5.4 family

Used for classification and research planning/synthesis. Repo notes distinguish mini vs larger/medium effort for cost/quality tradeoffs.

Erol OS use:

- Use small model for classification.
- Use stronger model only where reasoning quality matters.
- Track latency/cost per call.

### Firecrawl

Web search/scrape service used in the research pipeline.

Erol OS use:

- Good for source-backed web research.
- Must be bounded: query limits, scrape limits, source list, no hidden broad crawling.

### Debug Event Overlay

UI drawer that shows AI actions, latency, approximate cost and details.

Erol OS use:

- Excellent pattern. Add to dashboards/tools where LLM calls happen.
- Must hide secrets and avoid exposing raw sensitive data.

## Prompt Patterns Found

### 1. Project Brain Prompt

Source:

- `CLAUDE.md`

Purpose:

- Keeps project goal, stack, architecture decisions, repo layout, user preferences, known issues, run commands and commit style in one high-signal file.

Erol OS adaptation:

```text
Create PROJECT_BRAIN.md for this repo.
Include goal, non-goals, stack, data boundaries, run commands, verification, known risks, commit rules and "do not do" rules.
Keep it short, factual and source-backed.
```

### 2. Shared Contract Prompt

Source:

- `CONTRACT.md`

Purpose:

- Lets backend, frontend and database work in parallel without drifting. Defines schema, API endpoints and JSON shapes.

Erol OS adaptation:

```text
Before coding, write CONTRACT.md.
Define data schema, API routes, JSON shapes, allowed states, error format and acceptance tests.
All agents must build against this contract.
```

### 3. Parallel Sub-Agent Prompt

Source:

- Video chapter 09:30 and `CLAUDE.md` decision log.

Purpose:

- Start one agent for DB, one for API, one for frontend; main agent orchestrates.

Erol OS adaptation:

```text
Use parallel agents by layer:
DB agent builds schema/store/tests.
API agent builds handlers against CONTRACT.md.
Frontend agent builds UI against CONTRACT.md.
Main agent merges, verifies, and resolves conflicts.
No agent changes the contract without approval.
```

### 4. Intent Classification Prompt

Source:

- `backend/intent/intent.go`

Purpose:

- Classify a task into exactly one category. Output only structured category/confidence behavior.

Categories in repo:

- purchase
- research
- software
- communication
- errand
- admin
- general

Erol OS adaptation:

```text
Classify this operation item into one exact category:
keep, renew, sell, transfer, verify, block, ignore.
Return JSON only with category, confidence and one short reason.
```

### 5. Research Planner Prompt

Source:

- `backend/research/research.go`

Purpose:

- Infer the user's underlying research goal and produce exactly five diverse web search queries.

Erol OS adaptation:

```text
Given this domain/hosting question, infer the research goal.
Return exactly five concise search queries covering registrar policy, pricing, DNS/email risk, market value and official docs.
JSON only.
```

### 6. Research Synthesizer Prompt

Source:

- `backend/research/research.go`

Purpose:

- Use only provided search results and scraped excerpts. Produce a short sourced answer, key points and source URLs.

Erol OS adaptation:

```text
Using only these provided sources, summarize the operational answer.
Lead with the decision.
List 2-4 key points.
Mention uncertainty.
Return source URLs used.
Do not invent missing facts.
```

### 7. UI Alternative Prompt

Source:

- Video chapter 38:00.

Purpose:

- Generate multiple design directions, pick one, then delete the unused variants.

Erol OS adaptation:

```text
Create 5 UI directions for this internal operator dashboard:
Swiss, utilitarian dense, frost glass, terminal, editorial.
Each must show the same data.
After selection, keep only the chosen design and remove the switcher.
```

### 8. Debug Overlay Prompt

Source:

- Video chapter 1:10:50 and repo README/CLAUDE notes.

Purpose:

- Make LLM calls visible: latency, cost estimate, prompt/response detail.

Erol OS adaptation:

```text
Add an events overlay.
For every AI or research step record type, timestamp, model/tool, duration, approximate cost, status and sanitized detail.
Never show secrets.
```

### 9. Cost/Quality Comparison Prompt

Source:

- Video chapter 1:28:30.

Purpose:

- Compare mini vs stronger/medium model for the same task and decide whether quality gain is worth cost.

Erol OS adaptation:

```text
Run the same prompt through cheap and strong model tiers.
Compare answer quality, source accuracy, latency and estimated cost.
Recommend default tier and escalation rule.
```

### 10. Codex Second Opinion Prompt

Source:

- Video chapter 1:38:10 and `CLAUDE.md` workflow/playbook.

Purpose:

- Read-only review by a second agent for security, maintainability, bugs and severity.

Erol OS adaptation:

```text
Codex, read this diff/source read-only.
Do not edit, commit or push.
Find security, correctness, data-loss, maintainability and deployment risks.
Rank findings as critical/high/medium/low.
Verify high findings against source lines.
```

## Recommended Erol OS Adoption

Adopt now:

1. PROJECT_BRAIN.md per repo.
2. CONTRACT.md before app work.
3. Read-only Codex second opinion before commit.
4. Events/debug overlay for AI tools.
5. Cost/latency tracking for LLM calls.
6. Playwright visual verification for dashboards.

Pilot:

1. Parallel sub-agents for `domain-ops-dashboard`.
2. Firecrawl-style research pipeline with strict bounds.
3. Caveman/terse mode for internal agent loops only.

Hold:

1. SuperPower until exact capability and security boundary are verified.
2. Any live DNS/registrar automation.
3. Any broad web crawling or unsanitized finance/email ingestion.

## First Erol OS Implementation Target

`domain-ops-dashboard`

Placement:

- `erol-os-ops/domains/dashboard/`

Prompt pack:

- product brief prompt
- contract prompt
- build prompt
- data safety prompt
- UI alternatives prompt
- events overlay prompt
- Codex second-opinion prompt

