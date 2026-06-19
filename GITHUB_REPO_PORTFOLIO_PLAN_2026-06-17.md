# GitHub Repo Portfolio Plan - 2026-06-17

## Goal

Onemli projeler GitHub'da private repo yapisina alinacak. Gizli veriler, credential dosyalari, ham fatura/e-posta/veri dosyalari ve musteriye ait hassas icerikler dogrudan GitHub'a konmayacak.

## Recommended Structure

Decision update:

- Use 4 primary private repos, not 6.
- Keep tightly related work together as chunks/folders inside each repo.
- Split into smaller repos later only if code size, access boundary, or deployment lifecycle requires it.

## Recommended 4 Repos

### 1. `erol-os-core`

Purpose:

- Erol OS governance, karar defteri, agent contract, memory bus architecture, router rules and shared operating principles.

Suggested folders:

```text
governance/
agent-contracts/
memory-bus/
router/
google-workspace/
priorities/
```

Initial files:

- `governance/EROL_OS_DECISION_LEDGER_v1.md`
- `agent-contracts/EROL_OS_AGENT_KNOWLEDGE_CONTRACT_STAGE1A_v1.md`
- `memory-bus/EROL_OS_HERMES_INTEGRATION_SPEC_HYBRID_MEMORY_BUS_v1.md`
- `memory-bus/EROL_OS_HERMES_HYBRID_MEMORY_BUS_ARCHITECTURE_NOTE_v1.md`
- `google-workspace/GOOGLE_ECOSYSTEM_INTEGRATION_DIAGNOSIS_2026-06-15.md`
- `priorities/PRIORITY_OPEN_TASKS_2026-06-16.md`
- `router/EROL_OS_AI_ROUTER/erol-os-three-chiefs-infographic.png`

Do not include:

- OAuth client files, tokens, personal Google exports, raw email content.

### 2. `erol-os-hermes`

Purpose:

- Hermes/Jarvis RAG, retrieval, GUI warning, baseline, patch and coverage work.

Initial files:

- `EROL_OS_HERMES_BASELINE_TEST_RESULT_v1.md`
- `EROL_OS_HERMES_BASELINE_FAILURE_REMEDIATION_PLAN_v1.md`
- `EROL_OS_HERMES_BASELINE_FAILURE_PATCH_PLAN_v1.md`
- `EROL_OS_HERMES_BASELINE_FAILURE_PATCH_EXECUTION_REPORT_v1.md`
- `EROL_OS_HERMES_BASELINE_RETEST_RESULT_v1.md`
- `EROL_OS_HERMES_GUI_COVERAGE_WARNING_ACTIVATION_v1.md`
- `EROL_OS_HERMES_GUI_COVERAGE_WARNING_PATCH_PLAN_v1.md`
- `EROL_OS_HERMES_GUI_COVERAGE_WARNING_PATCH_EXECUTION_REPORT_v1.md`
- `EROL_OS_HERMES_GUI_COVERAGE_WARNING_RETEST_RESULT_v1.md`
- `EROL_OS_HERMES_BASELINE_CLOSEOUT_v1.md`
- `EROL_OS_HERMES_FINANCE_ATTACHMENT_COVERAGE_RETEST_RESULT_v1.md`
- `EROL_OS_HERMES_RAG_ACTIVATION_TEST_REPORT_v1.md`
- `MARVIS_STATUS_BOARD_UPDATE_HERMES_BASELINE_v1.md`
- `jarvis_ask.py.patch_work`
- `index.html.hermes_warning_patch_work`

Do not include:

- Actual RAG chunks, private file indexes, Gmail attachments, financial workbook contents unless explicitly sanitized.

### 3. `erol-os-ops`

Purpose:

- Operational runbooks, incidents, setup status, GitHub/Codex/automation state, domain/hosting operations and sale candidates.

Suggested folders:

```text
runbooks/
incidents/
automation/
domains/godaddy-hetzner/
domains/sales/
domains/dashboard/
domain-cost-audit/
```

Initial files:

- `automation/AUTOMATION_GITHUB_DESKTOP_STATUS_2026-06-17.md`
- `incidents/ANTIGRAVITY_MCP_PROJECT_ID_INCIDENT_CLOSURE_2026-06-10_v1.md`
- `runbooks/HETZNER_OPERATION_RUNBOOK_2026-06-17.md`
- `domains/godaddy-hetzner/URGENT_GODADDY_TO_HETZNER_DOMAIN_TRANSFER.md`
- `domains/sales/GODADDY_DOMAIN_SALE_CANDIDATES_2026-06-17.md`
- `domains/dashboard/ONUR_TIRPAN_CLAUDE_CODE_CODEX_APP_BUILD_PILOT_2026-06-17.md`
- `domain-cost-audit/build_godaddy_cost_audit.mjs`
- `UNIFIED_STATE_MARKET_DISCOVERY.md`

Optional after review:

- `domain-cost-audit/GoDaddy_Maliyet_Envanteri_2026-06-13.xlsx`
- `domain-cost-audit/receipts_sanitized.json`
- `domain-cost-audit/*.png`

Do not include:

- Passwords, screenshots containing account numbers, private keys, billing exports, unsanitized invoices, personal addresses, phone numbers, payment data, registrar credentials, full DNS exports if they expose private infra.

### 4. `erol-os-scout`

Purpose:

- AI Scout agent spec, daily briefs, model/tool evaluation notes.

Suggested folders:

```text
briefs/
tool-evals/
china-ai/
prompts/
```

Initial files:

- `AI_SCOUT_AGENT_SPEC_v0.md`
- `briefs/AI_SCOUT_DAILY_BRIEF_2026-06-08_v1.md`
- `briefs/AI_WORKFLOW_VIDEO_WATCHLIST_2026-06-17.md`
- `china-ai/CHINA_AI_CODEGEEX_EVALUATION_2026-06-17.md`
- `tool-evals/ONUR_TIRPAN_VIDEO_PROMPTS_AND_TOOLS_INVENTORY_2026-06-17.md`
- `tool-evals/ONUR_TIRPAN_CLAUDE_CODE_CODEX_APP_BUILD_PILOT_2026-06-17.md`
- `tool-evals/OPENROUTER_FUSION_EVALUATION_2026-06-17.md`
- `tool-evals/OPENROUTER_FUSION_VIDEO_PROMPTS_AND_WORKFLOW_2026-06-17.md`
- `tool-evals/OPENROUTER_FUSION_FREE_CODING_SETUP_VIDEO_2026-06-17.md`
- `tool-evals/OMNIGENT_META_HARNESS_EVALUATION_2026-06-17.md`

Do not include:

- Raw Gmail exports or vendor emails unless summarized and sanitized.

## Existing Local Repos

Observed local git repos:

- `/Users/erolutku/Documents/New project/.git`
- `/Users/erolutku/Documents/02_PROJELER/New project/.git`
- `/Users/erolutku/Documents/middleware/.git`

Decision needed:

- `/Users/erolutku/Documents/New project` is the active working folder and now initialized as a local repo.
- `/Users/erolutku/Documents/02_PROJELER/New project` appears to contain only `.git` metadata and no working files; do not use as canonical without inspection.
- `/Users/erolutku/Documents/middleware` should be inspected separately before assignment.

## Execution Order

1. GitHub login:
   - GitHub Desktop sign in.
   - `gh auth login`.
2. Create 4 repos as private.
3. Split files into repo folders or push selectively from clean working copies.
4. Commit sanitized docs first.
5. Add large/sensitive artifacts only after review.
6. Add README and `.gitignore` per repo.
7. Only then enable any automation, Actions, or sync.

## Safety Rule

No automatic push of the current mixed folder. First split into the 4 repo chunks, then review each repo's file list before first commit.
