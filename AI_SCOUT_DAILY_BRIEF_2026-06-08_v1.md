# AI Scout Daily Brief

Date: 2026-06-08

## Scope

Source window: Gmail messages received from 2026-05-25 through 2026-06-07, checked against `AI_SCOUT_AGENT_SPEC_v0.md`.

Filter: only signals that can change Erol OS, Hermes, or Codex workflows now. Vendor claims are treated as L4 when a usable product, command, API, or migration path is present. No independent production benchmark was found in the reviewed email set.

Score order: Novelty / Practicality / Workflow fit / Evidence quality / Testability / Cost awareness.

## Top Signals

### 1. Gemma 4 12B is now a direct local model option for Hermes and Codex App

**Source:** Ollama, "Gemma 4 12B + quantization-aware weights for all sizes," received 2026-06-07; Ollama, "Improved performance and model support with GGUF," received 2026-06-06.

**What happened:** Ollama published a Gemma 4 12B model intended to run on a laptop with 16 GB memory, plus quantization-aware weights. Its documented launch commands explicitly include:

```text
ollama launch codex-app --model gemma4:12b
ollama launch hermes --model gemma4:12b
```

Ollama 0.30 also adds broader GGUF compatibility through llama.cpp and preserves tool calling when the model supports it.

**Why it matters:** This creates a concrete local fallback candidate for Hermes and a local comparison target for Codex work. For Erol OS, the important value is not replacing the current stack; it is testing whether a private, offline model can handle bounded governance retrieval and summarization tasks with acceptable latency and fidelity.

**Constraint:** Hermes remains `BASELINE PARTIAL`. A stronger model does not repair incomplete indexing, missing-file coverage, or the unproven worker heartbeat.

**Evidence level:** L4 - public model, commands, integration path, and installable runtime are available; performance claims are vendor-reported.

**Score:** 5 / 5 / 5 / 4 / 5 / 5 = **29/30**

**Suggested test:** Run the 45-minute benchmark at the end of this brief.

**Verdict:** **Try now**

### 2. OpenAI macOS clients must be updated before June 12

**Source:** OpenAI, "Important security update for OpenAI macOS apps," received 2026-06-06.

**What happened:** OpenAI renewed code-signing material for ChatGPT Desktop, Codex App, Codex CLI, and Atlas on macOS. Outdated versions will stop working after **June 12, 2026** until updated.

**Why it matters:** This is an immediate continuity requirement for the Codex side of Erol OS. A stale Codex App or CLI can create a false workflow failure during Hermes/Codex testing.

**Evidence level:** L4 - direct operational notice from OpenAI with a deadline and supported update paths.

**Score:** 2 / 5 / 5 / 5 / 5 / 5 = **27/30**

**Suggested test:** After updating, launch Codex App and run `codex --version`; record both versions in the next baseline note.

**Verdict:** **Try now - mandatory maintenance, not a new capability**

### 3. OpenRouter now exposes governance controls that map to Erol OS agent boundaries

**Source:** OpenRouter, "What shipped in May: Workspace Guardrails, Speech APIs, Model Fusion, 20 new models," received 2026-06-04.

**What happened:** Workspace Guardrails now offer per-key/member spend limits, model/provider allowlists, zero-data-retention controls, prompt-injection blocking, and PII redaction without application code changes. The same release adds human-in-the-loop tools and management APIs for observability and provider keys.

**Why it matters:** These controls match Erol OS concerns around bounded authority, cost ceilings, provider policy, and explicit human approval. They could become an external policy layer for experimental agents or Hermes-adjacent model routing.

**Risk:** This introduces a new routing dependency and sends traffic through another provider. The email provides product claims, not proof against Erol OS threat cases.

**Evidence level:** L4 - documented, available platform features; no independent validation in the reviewed sources.

**Score:** 4 / 4 / 4 / 4 / 4 / 3 = **23/30**

**Suggested test:** Use a non-sensitive synthetic prompt set to verify one spend limit, one provider allowlist, and one prompt-injection block. Do not route governance documents yet.

**Verdict:** **Try now in a disposable workspace; do not adopt yet**

### 4. Vercel Sandbox can preserve agent environments and run Docker

**Source:** Vercel, "Persistent sandboxes and Docker support, now in Vercel Sandbox," received 2026-06-05.

**What happened:** Sandbox persistence is generally available, with named sandboxes that restore filesystem state between sessions. Docker containers can run inside the sandbox, isolated from the host. Storage and compute are billed separately, and persistence can be disabled.

**Why it matters:** This could give Codex experiments a reproducible environment for long-running test fixtures, dependency-heavy tools, or unsafe package evaluation without touching the Mac host. Persistence reduces repeated setup work.

**Risk:** It is useful infrastructure, but it does not directly improve Hermes retrieval quality. Cost and remote-data boundaries need measurement before Erol OS use.

**Evidence level:** L4 - generally available product with documented behavior.

**Score:** 4 / 4 / 3 / 4 / 4 / 3 = **22/30**

**Suggested test:** Recreate one small Codex test fixture in a persistent sandbox, stop it, resume it, and verify filesystem state plus total billed runtime/storage.

**Verdict:** **Try now only when the next isolated coding task needs it**

### 5. Craft MCP v2 materially reduces connector overhead, but is not yet core

**Source:** Craft, "More Flexible Assistant, Bring Your Own Key, MCP v2," received 2026-06-06.

**What happened:** Craft reports an 85.9% reduction in MCP interface token count, unified search, better document-link handling, BYOK, and local Apple Foundation Model support. Existing connectors require disconnect/reconnect to move to MCP v2.

**Why it matters:** The MCP interface reduction is a useful design signal for Hermes and Erol OS: smaller tool schemas can reduce context overhead and tool-selection friction. Craft itself only changes the workflow if Craft becomes a governed document surface.

**Evidence level:** L4 for feature availability; the token reduction is vendor-measured.

**Score:** 4 / 3 / 2 / 4 / 4 / 4 = **21/30**

**Suggested test:** Do not migrate Erol OS content. First compare connector token overhead and search accuracy on five disposable Craft documents.

**Verdict:** **Watch as an MCP design reference; test only if Craft enters the workflow**

## Tool To Test Today

**Ollama Gemma 4 12B QAT through Hermes and Codex App.**

It is the only reviewed signal that directly touches both named workflows, can run locally, has a bounded test path, and may reduce privacy and recurring inference costs.

## Hype To Ignore

- The expired OpenAI promotion offering up to 10x Codex usage ended on **May 31, 2026**. It is not a current workflow decision.
- Bubble's "biggest capability leap" and workflow-generation language is broad product marketing without a direct Erol OS, Hermes, or Codex bottleneck to test.
- OpenRouter Model Fusion may improve answer quality, but running several models for one answer adds cost and obscures attribution. It should not precede a single-model baseline.

## Strategic Watch Item

**Policy enforcement outside the agent runtime.**

OpenRouter's guardrails, Vercel's isolated persistent sandboxes, and Craft's smaller MCP surface all point in the same direction: agent systems are gaining external controls for authority, environment, cost, and context. Erol OS should watch this pattern, but preserve its own ledger, approval, and evidence rules rather than delegating governance to one vendor.

## Next Benchmark: 45-Minute Local Hermes/Codex Fit Test

**Question:** Can Gemma 4 12B QAT produce useful, evidence-disciplined Erol OS work locally without hiding Hermes coverage limits?

**Setup - 10 minutes**

1. Confirm Ollama 0.30 or newer and pull `gemma4:12b-it-qat`.
2. Confirm the current Hermes indexed-retrieval path still passes its known baseline query.
3. Prepare three fixed prompts using only non-secret material:
   - Summarize the active Hermes baseline status.
   - List what Hermes can and cannot currently be trusted to retrieve.
   - Draft a five-line change note that preserves the `BASELINE PARTIAL` warning.

**Run - 20 minutes**

Run the same three prompts through:

1. The current Hermes/Codex path.
2. `ollama launch hermes --model gemma4:12b`.
3. `ollama launch codex-app --model gemma4:12b` if available in the installed client.

Do not re-index files, change production configuration, or treat model memory as retrieval evidence.

**Score - 10 minutes**

For each path, record 1-5:

- Factual fidelity to the baseline reports.
- Explicit preservation of the indexed-scope warning.
- Unsupported-claim count.
- Time to first useful answer.
- Total completion time.
- Operator correction minutes.

**Decision - 5 minutes**

- **Adopt as test fallback:** local path averages at least 4/5 for fidelity and warning preservation, produces zero unsupported trust claims, and needs no more than five correction minutes.
- **Watch:** quality is usable but latency or corrections are materially worse than the current path.
- **Reject for now:** it claims all-file coverage, invents evidence, cannot use the required context, or fails two of three prompts.

**Required output:** one dated benchmark result with the prompt set, model/runtime versions, raw timings, scores, and a one-line decision. No production workflow change follows automatically.
