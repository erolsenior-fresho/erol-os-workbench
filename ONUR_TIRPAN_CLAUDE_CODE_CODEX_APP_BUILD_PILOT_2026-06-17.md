# Onur Tirpan Claude Code / Codex App Build Pilot - 2026-06-17

## Source

Video:

- `https://www.youtube.com/watch?v=EIoPt1ry6ng`

Observed metadata:

- Title: `Claude Code'u nasil kullaniyorum? Sifirdan AI destekli uygulama gelistiriyoruz!`
- Description summary: Claude Code ve Codex kullanarak sifirdan AI destekli bir tool uygulamasi gelistirme; sadece todo app degil, AI destekli ozellikler ve internetten arastirma yapabilen ozellikler; urun tasarim adimlari ve setup kullanimi.

Transcript:

- Public transcript/caption track bu kontrolde gorunmedi.
- Bu not video metadata ve gorunen aciklama uzerinden pilot plan olarak hazirlandi; ayrintili transcript gelirse guncellenmeli.

## Decision

Bu yaklasimi Erol OS'a hemen production standardi olarak degil, pilot uygulama gelistirme standardi olarak sokalim.

Pilot adi:

- Agent-assisted app build pilot

Use case:

- Kucuk, sinirli, gercek bir internal tool'u Claude Code/Codex tarzi agent workflow ile sifirdan tasarla, gelistir, test et ve GitHub'a duzenli repo olarak koy.

## Good Fit For Erol OS

Bu yontem su islere uygun:

1. Domain portfolio / GoDaddy-Hetzner operasyon dashboard'u.
2. Hermes coverage status viewer.
3. AI Scout daily brief generator.
4. GitHub repo portfolio manager.
5. Finance attachment manifest bridge UI.

Bu yontem su islere ilk asamada uygun degil:

1. Credential/OAuth production activation.
2. DNS/nameserver degisikligi yapan otomasyon.
3. Finansal degerleri otomatik indexleyen sistem.
4. Musteri veya e-posta verisini genis kapsamli isleyen app.

## Pilot Candidate

Recommended first pilot:

- `domain-ops-dashboard`

Why:

- Hetzner/GoDaddy operasyonu bugun aktif konu.
- Veri kumesi kucuk.
- Cikti net: domain listesi, expiration, renewal, sale candidate, action status.
- Riskli otomasyon gerekmez; ilk surum read-only/local olabilir.

Repo placement:

- Start inside `erol-os-ops/domains/dashboard/`.
- If it grows into a real product, split later into its own repo.

## Build Workflow

### 1. Product brief

Define:

- User: Erol.
- Job: GoDaddy/Hetzner/domain durumunu tek ekranda gormek.
- Inputs: sanitized domain inventory markdown/json.
- Outputs: priority list, renewal warnings, sale candidate list, action checklist.
- Non-goals: registrar login, DNS changes, payment actions, credential storage.

### 2. Source-backed data

Use only:

- `URGENT_GODADDY_TO_HETZNER_DOMAIN_TRANSFER.md`
- `GODADDY_DOMAIN_SALE_CANDIDATES_2026-06-17.md`
- sanitized manual JSON/CSV created from those docs.

Do not use:

- GoDaddy passwords.
- Raw payment data.
- Unsanitized receipts.
- Gmail raw content.

### 3. Implementation

Start small:

- Static local web app or simple Next/Vite app.
- Table: domain, registrar, expiration, current status, suggested action, sale candidate score.
- Filters: urgent, keep, sell, business-critical, transfer-candidate.
- Export: markdown action list.

### 4. Verification

Before any repo push:

- No secrets in files.
- No personal/payment fields.
- App runs locally.
- Screenshot or browser check passes.
- README explains data limits.

### 5. GitHub

Commit only after review.

No GitHub Actions at first.

No deploy at first.

## Acceptance Criteria

Pilot is successful if:

- A small app/tool is built from a written brief.
- It uses sanitized source-backed data.
- It does not perform external account actions.
- It produces a useful action board for Hetzner/domain operations.
- It fits cleanly under the 4-repo GitHub structure.

## Recommendation

Apply the video idea, but as a controlled Erol OS pilot:

1. Build `domain-ops-dashboard`.
2. Keep it local/read-only.
3. Put it under `erol-os-ops`.
4. Use Codex to implement.
5. Review before GitHub commit.

