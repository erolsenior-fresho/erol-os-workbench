# Hetzner Operation Runbook - 2026-06-17

## Goal

Bugun saat 09:00 civarinda yapilacak Hetzner operasyonunun amaci, GoDaddy/Hostinger/HostGator envanterini kontrol edip domain kaybi, DNS kesintisi ve e-posta kaybi olmadan hangi domainlerin Hetzner'a alinabilecegini belirlemektir.

Bu runbook transfer baslatmayi otomatik yetkilendirmez. Her transfer veya DNS/nameserver degisikligi icin ekranda son onay gerekir.

## Primary Decisions

1. `gpsciyiz.biz` tutulacak; once GoDaddy'de renewal/fatura/payment kaniti alinacak.
2. `4quadro.com` + `4quadro.net` satis adayi; dusmeye birakilmayacak.
3. Dikey/Debag gibi is kimligi tasiyan domainler satis adayi degil; operasyonel koruma oncelikli.
4. Hostinger tarafina dokunulmayacak.
5. E-posta envanteri cikmadan posta hizmeti, MX, DNS, hosting veya domain iptali yapilmayacak.

## Official Hetzner Notes

Sources:

- Hetzner "Change your provider to Hetzner": transfer basladiktan sonra bircok TLD icin transfer 5 is gunune kadar surebilir; bazi domainlerde ilk kayit/son transferden sonra 60 gun kuralina takilabilir; transfer sirasinda eski registrar'da odenmis olsa bile Hetzner tekrar ucretlendirebilir.
- Hetzner konsoleH Domain FAQ: mevcut hesaba domain transferi icin konsoleH uzerinden yetkili support request ile auth code, domain owner ve admin-C bilgisi verilir.
- Hetzner DNS docs: Hetzner DNS zone kullanmak icin domain sahibi olmak yeterlidir; DNS zone ucretsizdir; zone ve record'lar transferden once hazirlanabilir.
- Hetzner DNS delegation docs: harici domainleri Hetzner nameserver'larina yonlendirmeden once ilgili zone Hetzner Console'da olusturulmalidir.

## Do Not Touch Without Explicit Approval

- Hostinger web sites, domains, DNS, nameservers, hosting services.
- Any live MX/SPF/DKIM/DMARC record.
- Any active business domain cancellation.
- Any nameserver switch.
- Any EPP/Auth code submission.
- Any GoDaddy product cancellation.
- Any bulk transfer.
- Any domain marked as sale candidate before renewal/delegation risk is resolved.

## Domains To Check First

| Priority | Domain | Current reason | Required action |
|---:|---|---|---|
| 1 | `gpsciyiz.biz` | User wants to keep; RDAP active, exp. 2028-06-12 | Confirm GoDaddy invoice, auto-renew, payment, DNS, protection. |
| 2 | `dikeyelektronik.net` | Exp. 2026-06-19 | Confirm renewal/auto-renew immediately. Do not transfer before protection. |
| 3 | `dikeysatis.com` / `dikeysatis.net` | Exp. 2026-06-30 | Confirm whether needed, renewal status, DNS/email dependencies. |
| 4 | `4quadro.com` / `4quadro.net` | Exp. 2026-07-08; sale candidates | Prevent loss; decide renew/list-for-sale path. |
| 5 | `otelip.com` | Exp. 2026-07-08; possible sale candidate | Check dependencies, decide renew/list-for-sale path. |
| 6 | `tdturkey.com` | Renewed to 2027; possible low-priority sale candidate | Check business relevance before listing. |

## Pre-Click Checklist

For each domain before any transfer/DNS/change:

1. Screenshot registrar, expiration, auto-renew, lock/protection and contact email.
2. Export or screenshot DNS zone.
3. Record NS, A/AAAA, CNAME, MX, TXT, SPF, DKIM, DMARC.
4. Confirm whether web traffic, email, subdomains, SSL or forwarding are active.
5. Confirm invoice/order receipt and next renewal price.
6. Confirm domain owner/contact email can receive approval mail.
7. Decide: keep at current registrar, renew only, list for sale, move DNS only, or transfer registrar.

## Suggested Operation Order

### Phase 1 - Evidence Only

1. GoDaddy: export full domain list.
2. GoDaddy: export/download last 24 months invoices/order details if available.
3. For priority domains, capture expiration, auto-renew and payment status.
4. For priority domains, capture DNS zone and email records.
5. Hetzner: confirm account, billing and konsoleH/Robot access.

Stop condition:

- If evidence cannot be captured, do not transfer.

### Phase 2 - Risk Closure

1. Renew or protect domains expiring before 2026-07-08 if they will be kept or sold.
2. Remove accidental cancellation only after confirming cost.
3. Mark business-critical domains as "do not sell."
4. Mark sale candidates separately: `4quadro.com`, `4quadro.net`, `dijitaltv.net`, `otelip.com`, `qamsistem.net`.

Stop condition:

- If payment method, owner email, or DNS dependencies are uncertain, do not transfer.

### Phase 3 - Hetzner Dry Run

1. In Hetzner DNS Console, create test zone only for a non-critical domain or duplicate planned zone without changing NS.
2. Copy current DNS records into the zone.
3. Verify record completeness.
4. Do not change nameservers yet.

Stop condition:

- If MX/SPF/DKIM/DMARC are incomplete, do not switch nameservers.

### Phase 4 - Transfer Decision

For each candidate domain:

1. Confirm Hetzner supports the TLD and transfer.
2. Confirm transfer price and whether another year is charged.
3. Confirm registrar lock status and EPP/Auth code path.
4. Confirm whether transfer preserves current nameservers.
5. Start transfer only for the approved pilot domain.

Default pilot:

- No default transfer unless user explicitly says "start transfer for <domain>".

## Sale Candidate Handling

Do not transfer sale candidates just to transfer them. For sale candidates:

1. Keep/renew them safely.
2. List on Afternic / GoDaddy List for Sale first.
3. Add Sedo only if availability and pricing can be kept consistent.
4. Use package strategy for `4quadro.com` + `4quadro.net`.

## Exit Criteria

The operation is successful if:

- No domain is lost.
- No DNS or email service is broken.
- Full GoDaddy domain/invoice/DNS evidence is captured.
- Expiring valuable domains are protected.
- Hetzner account readiness is confirmed.
- At most one explicitly approved pilot transfer is started, or none if transfer risk is not ready.
