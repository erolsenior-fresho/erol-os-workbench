# China AI / CodeGeeX Evaluation - 2026-06-17

## Source

Primary pages:

- `https://codegeex.cn/en-US`
- `https://codegeex.cn/en-US/downloadGuide`
- `https://github.com/zai-org/CodeGeeX4`
- `https://github.com/zai-org/CodeGeeX4/blob/main/local_mode/README.md`

## What It Is

CodeGeeX is an AI coding assistant from the Zhipu/THUDM ecosystem.

The public site positions it as a powerful AI assistant for developers with:

- code generation and completion
- comment generation
- code translation
- Ask CodeGeeX chat
- VS Code, JetBrains, HBuilderX and Visual Studio extensions

The CodeGeeX4 GitHub repo describes `CodeGeeX4-ALL-9B` as an open multilingual code generation model for:

- code completion
- code interpreter
- web search
- function calling
- repository-level code Q&A

## Important Technical Notes

Model:

- `CodeGeeX4-ALL-9B`
- 9B parameter class
- 128K context according to repo model table
- Based on / continually trained from `GLM-4-9B`
- Available through Hugging Face, ModelScope and WiseModel
- Available through Ollama:

```bash
ollama run codegeex4
```

Local mode:

- CodeGeeX plugin supports offline mode.
- Local server example from repo:

```bash
python main.py --model_name_or_path THUDM/codegeex4-all-9b --device cuda --bf16 true
```

Then extension can connect to local API address.

## Why It Matters For Erol OS

This is relevant because it overlaps with our current direction:

- local/offline coding model fallback
- repo-level Q&A
- code completion
- repository task workflow
- Chinese AI ecosystem tracking
- alternatives to Claude Code / Codex / Cursor

Most valuable angle:

- Not the cloud extension.
- The local/Ollama model and the repo-task guides.

## Risk View

Do not immediately install/login/use with private Erol OS code in cloud mode.

Reasons:

- The product is connected to a Chinese AI provider ecosystem.
- Extension/cloud behavior must be reviewed before proprietary code exposure.
- Model weights have a separate model license; repo says academic research is open, commercial use requires registration.

Lower-risk path:

1. Use public docs and GitHub repo for learning.
2. Test `ollama run codegeex4` locally if hardware allows.
3. Use only toy/public code at first.
4. Do not connect private Erol OS repos to CodeGeeX cloud extension.
5. If local mode works, compare it against Codex/Ollama baseline on non-secret tasks.

## Suggested Erol OS Pilot

Pilot name:

- `codegeex-local-coding-eval`

Repo placement:

- `erol-os-scout/china-ai/codegeex/`

Test tasks:

1. Explain a small public Go/React repo.
2. Generate a simple parser function.
3. Refactor a toy TypeScript component.
4. Ask repo-level Q&A on a sanitized sample project.
5. Compare output against Codex and existing Ollama candidate.

Acceptance criteria:

- Runs locally without sending code to cloud.
- Produces useful code explanations.
- Does not invent repo facts.
- Handles Turkish/English prompts acceptably.
- Has acceptable latency on this Mac.

Prepared local sandbox:

- `CODEGEEX_LOCAL_SANDBOX_RUNBOOK_2026-06-17.md`
- `codegeex-sandbox/README.md`
- `codegeex-sandbox/prompts/codegeex-test-prompts.md`
- `codegeex-sandbox/toy-project/src/domainScore.ts`
- `codegeex-sandbox/toy-project/src/normalize_invoice_rows.py`

## Decision

Status: TRACK + LOCAL SANDBOX ONLY

Do now:

- Add CodeGeeX to China AI watchlist.
- Read CodeGeeX4 guides.
- Consider local Ollama test after Hetzner/GitHub urgent work.

Do not do yet:

- Install extension into a private repo workflow.
- Login with Erol accounts.
- Send proprietary code to CodeGeeX cloud.
- Use for production decisions.
