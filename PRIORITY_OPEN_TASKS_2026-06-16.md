# Priority Open Tasks - 2026-06-16

## Executive Summary

Bu klasordeki yarim kalmis isler tarandi. Hermes baseline runtime fix ve GUI warning patch zinciri kapanmis durumda; bunlar tekrar acik task sayilmadi.

Once tamamlanmasi gereken isler:

1. GoDaddy -> Hetzner pilot domain transfer hazirligi ve risk kontrolu.
2. Hermes finance attachment coverage fix: Gmail attachment manifest bridge.
3. Google Workspace read-only route/adapter implementation.
4. Hermes full coverage remediation and worker/CLI operational visibility.
5. Agent Knowledge Contract Stage 1A deliverables and validation.
6. Hybrid Memory Bus Stage 1 local-only implementation plan.
7. AI Scout recommended benchmark / maintenance follow-ups.

## P0 / Time-Sensitive

### 1. GoDaddy -> Hetzner pilot domain transfer

Source: `URGENT_GODADDY_TO_HETZNER_DOMAIN_TRANSFER.md`

Status: ACIL / P1, retention-first. Kullanici `gpsciyiz.biz` domainini tutmak istiyor; transfer ikincil.

Why first:

- `gpsciyiz.biz` GoDaddy ekraninda 2026-06-13 tarihinde suresi dolmus gorunmustu.
- 2026-06-16 RDAP kontrolunde domain `active`, `renew period`, expiration `2028-06-12T23:59:59Z` gorunuyor.
- `tdturkey.com` otomatik yenileme tarihi 2026-06-13 olarak gorunuyor.
- `dikeyelektronik.net` otomatik yenileme tarihi 2026-06-19 olarak gorunuyor.
- `4quadro.net` ve `4quadro.com` icin 2026-07-08 iptal tarihi gorunuyor; kullanici bunlari satis adayi olarak degerlendiriyor.

Immediate next actions:

1. GoDaddy panelinde `gpsciyiz.biz` renewal/expiration ve fatura kanitini dogrula.
2. Auto-renew, payment method, failed payment warning ve domain protection durumunu kontrol et.
3. DNS zone, nameserver, MX/SPF/DKIM/DMARC, forwarding ve SSL bagimliliklarini yedekle.
4. Transferi simdilik baslatma; once domainin GoDaddy'de guvenli sekilde elde tutuldugunu kanitla.
5. Hetzner `.biz` transfer destegi, fiyat ve nameserver koruma imkanini ikinci fazda dogrula.
6. E-posta envanteri cikmadan GoDaddy e-posta urunlerini iptal etme.
7. `4quadro.com` + `4quadro.net` icin satis karari ver: yenileme maliyeti, beklenen satis fiyati, paket listeleme ve devir yolu.

Blocker:

- GoDaddy hesap icindeki renewal/fatura/payment/protection durumu disaridan dogrulanamaz; panelden kontrol veya ekran goruntusu gerekir.

Clarification:

- `Expired` gorunmesi domainin hemen kaybedildigi anlamina gelmez; GoDaddy/registry tarafinda yenileme veya kurtarma penceresi olabilir.
- `gpsciyiz.biz` icin RDAP kaydi 2026-06-16 itibariyla aktif ve 2028 expiration gosterdigi icin domain kaptirilmis gorunmuyor.
- Domain satilacaksa en saglikli durum: hesapta kontrol bizde, renewal/fatura kanitli, domain active, lock/protection durumu biliniyor ve transfer/sahiplik devri icin gerekli EPP/Auth code veya GoDaddy account change yolu hazir.
- Expired/recovery/hold durumunda satis mumkun olsa bile aliciya devretme riski yuksektir; once domaini aktif ve kanitli hale getirmek gerekir.

## P1 / Core System Trust

### 2. Hermes finance attachment coverage fix

Source: `EROL_OS_HERMES_FINANCE_ATTACHMENT_COVERAGE_RETEST_RESULT_v1.md`

Status: FAILED, 0/3 passed.

Problem:

- Hermes, Gmail'de varligi dogrulanmis su finans eklerini bulamadi:
  - `MIKENOPA AVANOS KAPADOKYA PROJESI.pdf`
  - `GUNLUK RAPOR 03062026 -.xlsx`
  - `GUNLUK RAPOR 02062026.xlsx`
- Koken neden retrieval execution degil, ingestion coverage. Mevcut indexer yalnizca Markdown dosyalarini tarayabiliyor.

Immediate next actions:

1. Sadece secilen finance attachment'lari governed local Gmail attachment dizinine stage et.
2. Her ek icin Markdown sidecar olustur: exact filename, Gmail message ID, subject, received date, MIME type, size, staged path.
3. XLSX icin sadece onayli ve sinirli sheet-level evidence ekle; finansal degerleri sinirsiz indexleme.
4. Image-only PDF icin sidecar'i hemen indexle ve `content_text_status: OCR_REQUIRED` olarak isaretle.
5. Markdown index rebuild yap ve ayni 3 exact filename query ile `EROL_OS_HERMES_FINANCE_ATTACHMENT_COVERAGE_RETEST_RESULT_v2.md` uret.

### 3. Google Workspace route and read-only adapter

Source: `GOOGLE_ECOSYSTEM_INTEGRATION_DIAGNOSIS_2026-06-15.md`

Status: Root cause identified; no external state changed.

Problem:

- Google connector'lar calisiyor, ancak local EROL OS icinde `GOOGLE_WORKSPACE` route veya adapter yok.
- Google istekleri `LOCAL` fallback'e dusuyor.

Immediate next actions:

1. Local router'a deterministic `GOOGLE_WORKSPACE` route ekle.
2. Drive, Gmail ve Calendar icin read-only adapter tasarla/uygula.
3. Dedicated desktop OAuth client ve least-privilege Workspace scopes icin onay kapisi koy.
4. Identity, scopes, Drive, Gmail ve Calendar read-only health checks ekle.
5. Marvis/Jarvis routing ile end-to-end read-only dogrulama yap.

Approval boundary:

- OAuth flow, credential creation, API enablement, cloud modification veya Workspace write islemi onaysiz yapilmamali.

### 4. Hermes full coverage remediation and operational visibility

Sources:

- `EROL_OS_HERMES_BASELINE_CLOSEOUT_v1.md`
- `MARVIS_STATUS_BOARD_UPDATE_HERMES_BASELINE_v1.md`

Status: Baseline recovery closed, coverage remediation open.

Current trust:

- Hermes indexed script retrieval icin kullanilabilir.
- GUI partial coverage uyarisi aktif.
- Hermes all-files memory olarak guvenilir degil.

Open gaps:

- Full Dikey / Erol OS file coverage kanitlanmadi.
- Offer, invoice, technical, non-Markdown coverage kanitlanmadi.
- Hermes worker heartbeat evidenced degil.
- Global `hermes` CLI unavailable.
- GUI warning static; dynamic coverage computation yok.

Immediate next actions:

1. Coverage remediation kapsamini finance attachment bridge ile baslat.
2. Worker'in gerekli mi opsiyonel mi oldugunu netlestir; heartbeat/status evidence ekle.
3. Global `hermes` CLI gereksinimini ayir: gerekli degilse risk kaydi, gerekliyse ayri kurulum/onay plani.
4. Dynamic coverage/skipped/missing/iCloud status icin sonraki GUI/reporting planini ac.

## P2 / Governance Foundation

### 5. Agent Knowledge Contract Stage 1A

Source: `EROL_OS_AGENT_KNOWLEDGE_CONTRACT_STAGE1A_v1.md`

Status: Specification exists; non-automated and non-deployed.

Open deliverables:

- Versioned schemas for Agent Contract, Knowledge Record, Knowledge Claim, Awareness State, Event, and Package.
- Owner-domain registry.
- Source registry specification.
- Classification and visibility policy matrix.
- Seven initial Agent Contracts.
- Conflict taxonomy and manual resolution procedure.
- Awareness propagation matrix.
- Manual synchronization test fixtures.
- Stage 1A validation report template.

Immediate next actions:

1. Produce the seven draft Agent Contracts.
2. Create fixture set for the 12 manual validation scenarios.
3. Run paper/fixture validation before any automation.

### 6. Hybrid Memory Bus Stage 1 implementation

Sources:

- `EROL_OS_HERMES_INTEGRATION_SPEC_HYBRID_MEMORY_BUS_v1.md`
- `EROL_OS_HERMES_HYBRID_MEMORY_BUS_ARCHITECTURE_NOTE_v1.md`
- `EROL_OS_DECISION_LEDGER_v1.md`

Status: Architecture approved; OAuth and production activation unexecuted.

Open implementation work:

- Source envelopes, update envelopes, conflicts, cursors, awareness manifests and briefing state schemas.
- Source registry with deny-by-default ownership and visibility policies.
- Read-only adapters for Ledger, Agent Registry, Idea Queue, Opportunity Radar, and Daily Brief.
- Local fixtures and deterministic contract tests without OAuth.
- Local test adapter for `appDataFolder` interface; no live Drive connection.
- Proposal/outbox flow with canonical writes disabled.
- Stage 1 validation report.

Approval boundary:

- OAuth setup, credential creation, Google Cloud changes, Drive writes, production activation, background workers and canonical writes all require explicit approval.

## P3 / Experiments and Maintenance

### 7. AI Scout follow-ups

Source: `AI_SCOUT_DAILY_BRIEF_2026-06-08_v1.md`

Open items:

1. Run the 45-minute local Hermes/Codex Gemma 4 12B fit benchmark if still relevant.
2. Verify OpenAI macOS clients were updated after the June 12, 2026 deadline.
3. OpenRouter guardrails: disposable workspace test only; do not route governance docs.
4. Vercel Sandbox: test only when an isolated coding task needs persistent sandboxing.

## Closed / Do Not Reopen Unless Regression Appears

These were plan or failure documents that have later execution/retest/closeout evidence:

- `EROL_OS_HERMES_BASELINE_FAILURE_REMEDIATION_PLAN_v1.md`
- `EROL_OS_HERMES_BASELINE_FAILURE_PATCH_PLAN_v1.md`
- `EROL_OS_HERMES_BASELINE_FAILURE_PATCH_EXECUTION_REPORT_v1.md`
- `EROL_OS_HERMES_BASELINE_RETEST_RESULT_v1.md`
- `EROL_OS_HERMES_GUI_COVERAGE_WARNING_ACTIVATION_v1.md`
- `EROL_OS_HERMES_GUI_COVERAGE_WARNING_PATCH_PLAN_v1.md`
- `EROL_OS_HERMES_GUI_COVERAGE_WARNING_PATCH_EXECUTION_REPORT_v1.md`
- `EROL_OS_HERMES_GUI_COVERAGE_WARNING_RETEST_RESULT_v1.md`
- `EROL_OS_HERMES_BASELINE_CLOSEOUT_v1.md`

Closed decision:

- Baseline runtime failure fixed.
- GUI warning banner active and retested.
- Remaining Hermes task is coverage remediation, not baseline recovery.
