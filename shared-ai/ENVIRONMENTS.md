# Open-ended environment register
Scope: Erol OS launcher project only.
Canonical package: [LAUNCHER_HANDOFF.md](LAUNCHER_HANDOFF.md).
User requested Hermes, Obsidian, Perplexity, DeepSeek and “etc etc” after initial rollout.
This register extends consumer coverage without changing ownership or importing all memories.

## Requested targets
| Target | Role in this sharing setup | Prepared entry point | Actual connection / read status |
|---|---|---|---|
| Codex | Project execution | AGENTS.md | Main reference present; other sessions UNKNOWN |
| Claude Code | Project execution | CLAUDE.md | Main reference present; other sessions UNKNOWN |
| Gemini CLI | Project execution | GEMINI.md | Main reference present; other sessions UNKNOWN |
| Cursor | Project execution | .cursor/rules/shared-project-context.mdc | Main reference present; other sessions UNKNOWN |
| ChatGPT / Claude / Gemini chat | Task-specific consumer | Canonical handoff URL | Other sessions UNKNOWN |
| Antigravity | Project execution | Canonical handoff file/reference | Local project configuration UNKNOWN |
| Hermes | Bounded retrieval and context distribution | Canonical package plus existing knowledge contract | Runtime connection UNKNOWN |
| Obsidian | Markdown workspace/source surface | Canonical package reference | Vault location, sync and plugin access UNKNOWN |
| Perplexity | Task-specific consumer | Canonical package URL or supported scoped file retrieval | Read receipt UNKNOWN |
| DeepSeek | Task-specific consumer | Canonical package through tool retrieval or caller injection | Interface and read receipt UNKNOWN |
| Ollama | Model backend | Caller injects package content | Caller configuration and read receipt UNKNOWN |
| Qwen / Kimi / Grok / Manus | Task-specific consumers | Same canonical package | Interfaces and read receipts UNKNOWN |
| Marvis / Scout | Bounded project consumers | Existing authorized retrieval | Runtime connection UNKNOWN |
| Future tool | Add named instance using procedure below | Same canonical package | UNKNOWN until verified |

## Universal consumer procedure
1. Identify the actual tool instance and interface (repository agent, chat, API caller,
   retrieval agent or Markdown workspace). A product name alone does not identify a session.
2. Retrieve the package using an existing authorized connector/tool. If that interface cannot
   retrieve it, its caller may supply the scoped package content in the request.
   Do not assume that supplying a URL supplies its contents.
3. Preserve package ID, source reference, observation time and coverage warnings.
4. Verify the consumer can report the package ID and the launcher limitation:
   closing tracked entries does not terminate iPadOS app processes.
5. Record the actual read receipt in the existing private awareness workspace/registry.
   A copied file or HTTP fetch is delivery evidence, not proof of model comprehension.
6. Refresh at session start and before acting on a changed source. Session memory alone
   does not establish freshness. When package content changes, older receipts become stale.
7. Updates from consumers remain source-backed observations or proposals until accepted
   through the existing authorized project process. No last-writer-wins canonical overwrite.

## Obsidian boundary
Use the actual vault only after its location and access are established.
Prefer the existing Git/vault sync or a reference note to the canonical source.
If a Markdown snapshot is required, label it with package ID, source ref and copy time;
preserve user edits and do not treat the snapshot as a second authority.
An AI plugin must explicitly read the note: merely storing it in a vault is not awareness.
No vault, plugin, sync account or local filesystem was accessed in this rollout.

## Hermes boundary
Use existing knowledge-package, permission and receipt semantics from
EROL_OS_AGENT_KNOWLEDGE_CONTRACT_STAGE1A_v1.md.
No replacement of the existing Hermes workflow, no new Drive/OAuth activation,
no background worker or broad conversation ingestion is part of this register.

## Adding another environment
Add its name/instance, purpose, authorized retrieval path and actual connection status.
Default connection and receipt to UNKNOWN.
A name in this table is not a deployed integration. Do not mark it ACKNOWLEDGED without
the actual environment's receipt. Keep private session IDs, vault paths, tokens and device
identifiers outside this public repository.
