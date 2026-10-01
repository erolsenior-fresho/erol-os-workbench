# Shared AI context — Erol OS launcher
The project handoff is [LAUNCHER_HANDOFF.md](LAUNCHER_HANDOFF.md).
This extends the existing [Agent Knowledge Contract](../EROL_OS_AGENT_KNOWLEDGE_CONTRACT_STAGE1A_v1.md);
it does not replace the canonical sources or the Hermes architecture.

## Connection paths
| Environment | Startup reference | Activation boundary |
|---|---|---|
| Codex in this repository | Root AGENTS.md | Updated checkout and a session that loads repository instructions |
| Claude Code in this repository | Root CLAUDE.md | Updated checkout and project instructions actually loaded |
| Gemini CLI in this repository | Root GEMINI.md | Updated checkout and project context actually loaded |
| Cursor in this repository | .cursor/rules/shared-project-context.mdc | Updated checkout and rule actually loaded; verify receipt |
| Antigravity | Explicit handoff file/reference | Persistent project-rule installation on its device remains unverified |
| ChatGPT / Claude / Gemini web or desktop chat | Fetch the canonical URL via an available connector/tool | Repo rules alone do not configure these chat products |
| Ollama | Calling application injects this file in request context | Model/server alone does not read project instruction files |
| Hermes | Project package through existing authorized retrieval | Runtime and read receipt unverified |
| Obsidian | Project Markdown reference or existing authorized vault sync | Vault path, sync and AI plugins unverified |
| Slack | Canonical handoff reference in a selected project channel | Workspace/channel and messaging authorization not established |
| Google AI Studio | Scoped package supplied to session/request context | Project/session configuration and receipt unverified |
| Perplexity | Retrieve project handoff in a scoped workspace/session when supported | Actual retrieval and receipt unverified |
| DeepSeek | Read handoff through caller tools or inject into request context | Web/app/API interface and receipt unverified |
| Qwen / Kimi / Grok / Manus | Same scoped retrieval or caller context-injection path | Actual interfaces and receipts unverified |
| Marvis / Scout / other agents | Existing authorized project-context mechanism | Runtime and receipts unverified |

Canonical project handoff:
https://github.com/erolsenior-fresho/erol-os-workbench/blob/main/shared-ai/LAUNCHER_HANDOFF.md

PR #9 was merged on 2026-10-01; project startup references are now on main.
Repository checkout refresh and actual per-session reading remain necessary.

The open-ended [environment register](ENVIRONMENTS.md) covers current and future tools.
Names in the register are requested targets, not proof of installation or integration.

## Operational use
Use existing Git sync on each device; do not discard local work or force-reset a checkout.
A new session must read the handoff. Running sessions need an explicit refresh.
A raw URL/reference is a retrieval pointer, not proof that an AI read it.
Require the read receipt described in the handoff before treating that environment as aware.
Only project facts needed for this launcher belong here. Full conversation/memory export is outside scope.
