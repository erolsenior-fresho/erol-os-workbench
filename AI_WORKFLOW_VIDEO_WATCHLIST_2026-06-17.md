# AI Workflow Video Watchlist - 2026-06-17

## Source

Attachment:

- `/Users/erolutku/.codex/attachments/162f217a-a4c4-4ccd-9286-4ed0117a95af/pasted-text.txt`

Context:

- The pasted text is a YouTube page around the OpenRouter Fusion video and recommended adjacent videos.

## Primary Video Already Processed

### OpenRouter Fusion

Video:

- `https://www.youtube.com/watch?v=muTKrIRucMc&list=LL`

Title:

- `Sonunda Claude Fable 5’i Bile Geride Birakan Yeni AI Sistem: OpenRouter Fusion`

Channel:

- `Omer Gocmen | Yapay Zeka & Otomasyon`

Status:

- Processed.

Created notes:

- `OPENROUTER_FUSION_EVALUATION_2026-06-17.md`
- `OPENROUTER_FUSION_VIDEO_PROMPTS_AND_WORKFLOW_2026-06-17.md`

Erol OS adoption:

- Add `FUSION_REVIEW` as a high-value decision-review mode.
- Use first for domain/Hertzner/GoDaddy review, tool adoption, architecture review and security second opinions.

### Omnigent Meta-Harness

Video:

- `https://www.youtube.com/watch?v=oGE_Dwz-rMk`

Title:

- `Omnigent: The New Meta-Harness for EVERY Coding Agent - Claude Code, Codex, Pi, More`

Channel:

- `Cole Medin`

Status:

- Processed.

Created notes:

- `OMNIGENT_META_HARNESS_EVALUATION_2026-06-17.md`

Erol OS adoption:

- Treat as a high-interest meta-harness candidate, not an immediate production tool.
- Borrow the `Polly` pattern: planner delegates coding to one agent, another agent reviews the diff, human merges.
- Borrow the `Debby` pattern: multi-model debate for important decisions, comparable to OpenRouter Fusion.
- Pilot later in a toy/sanitized sandbox after GitHub and Hetzner urgent work.

### Mac MLX MTP Local LLM Performance

Video:

- `https://www.youtube.com/watch?v=jU02xG69jXI`

Title:

- `Run MLX LLMs 23% Faster on a Mac with MTP`

Channel:

- `Joe Maddalone`

Status:

- Processed at metadata + source-context level.

Created notes:

- `MAC_MLX_MTP_LOCAL_LLM_EVALUATION_2026-06-17.md`

Erol OS adoption:

- Treat as a local Mac inference performance candidate.
- Do not install before CodeGeeX vs `qwen2.5-coder:7b` comparison.
- Use later only in a separate `mlx-mtp-sandbox`.
- Relevant because this Mac is Apple M4 Pro with 24 GB memory.

## High-Priority Adjacent Videos To Watch

### 1. Token Maxxing ve Token Restricting

Channel:

- Onur Tirpan

Title:

- `Token Maxxing ve Token Restricting: Hangi kafadaki sirketlerden uzak durmali?`

Why it matters:

- Directly relevant to agent cost, context policy, tool vendor trust and "which AI companies are aligned with builders."

Erol OS expected output:

- Token-policy checklist.
- Vendor evaluation rubric.
- Add to `erol-os-scout/tool-evals/`.

### 2. AI Assisted Urun Gelistirme

Channel:

- Kommunity / Zafer Ayan

Title:

- `AI Assisted Urun Gelistirme`

Why it matters:

- Product-development process, not only coding.
- Likely useful for turning Erol OS ideas into small internal products.

Erol OS expected output:

- Product discovery prompt pack.
- Build/pilot/standard workflow.

### 3. OpenClaw vs Hermes Agent

Channel:

- Metics Media

Title:

- `OpenClaw vs Hermes Agent (YANLIS Secim Yapma!)`

Why it matters:

- Directly relevant to our Hermes naming/system boundary and agent selection risk.

Erol OS expected output:

- Hermes naming/conflict note.
- Agent comparison rubric.

### 4. Hermes ve OpenClaw Alternatifi Yeni AI Agent: Odysseus

Channel:

- Omer Gocmen | Yapay Zeka & Otomasyon

Title:

- `Hermes ve OpenClaw Alternatifi Yeni AI Agent: Odysseus Neler Yapabiliyor?`

Why it matters:

- Agent ecosystem radar.
- Could affect our "Hermes" terminology and tool choices.

Erol OS expected output:

- Watch / pilot / reject decision.
- Compare to Codex, Claude Code, Dify, CodeGeeX, Trae, Qoder.

### 5. MiniMax M3 Coding Model

Channel:

- Omer Gocmen | Yapay Zeka & Otomasyon

Title:

- `Yeni MiniMax M3 Modeli Kodlamada Cok Iddiali & Claude Opus’a Rakip Acik Kaynak Model!`

Why it matters:

- Open/source or cheaper coding model candidate.
- Could be compared with CodeGeeX4, Qwen, DeepSeek, local Ollama candidates.

Erol OS expected output:

- Local/model benchmark candidate.
- Add to AI Scout model watchlist.

### 6. AI Yazilim Gelistirme Sureclerimi Nasil Degistirdi

Channel:

- Onur Tirpan

Title:

- `AI yazilim gelistirme sureclerimi nasil degistirdi ve hizlandirdi? Artılar/eksiler neler? 2026`

Why it matters:

- Direct process-level lessons from a practitioner.
- Likely complements the Claude Code/Codex app-build video.

Erol OS expected output:

- Working-principles document.
- Add to `PROJECT_BRAIN.md` template.

### 7. Context7 MCP

Channel:

- Omer Gocmen | Yapay Zeka & Otomasyon

Title:

- `Kodlama Icin En Iyi MCP Server - Context7 - (Cursor + Windsurf)`

Why it matters:

- Context7 already appeared in Onur's setup.
- Could become an approved docs/context tool for coding workflows.

Erol OS expected output:

- MCP approval checklist.
- Context7 pilot rule: official docs only, no secrets.

## Watchlist Decision

Priority order:

1. CodeGeeX local sandbox.
2. CodeGeeX vs `qwen2.5-coder:7b` benchmark.
3. Mac MLX/MTP local inference benchmark.
4. Omnigent meta-harness sandbox.
5. Onur Tirpan - Token Maxxing / Token Restricting.
6. Onur Tirpan - AI software development workflow.
7. Omer Gocmen - Context7 MCP.
8. Metics Media - OpenClaw vs Hermes.
9. Omer Gocmen - Odysseus agent.
10. MiniMax M3 coding model.
11. AI Assisted Urun Gelistirme.

## Erol OS Rule

Each video should produce one of:

- prompt pack
- tool evaluation
- decision protocol
- benchmark candidate
- security/governance checklist

Do not let videos directly authorize installation, account login, credential use, DNS changes, repository pushes, or production automation.
