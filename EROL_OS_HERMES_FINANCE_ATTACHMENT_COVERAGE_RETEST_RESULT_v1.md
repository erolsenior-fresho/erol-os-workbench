# EROL_OS_HERMES_FINANCE_ATTACHMENT_COVERAGE_RETEST_RESULT_v1

## Executive Summary

Coverage retest status: FAILED

On 2026-06-08, the current Hermes indexed retrieval path was tested against three real Dikey finance attachments identified in Gmail:

- `MİKENOPA AVANOS KAPADOKYA PROJESİ.pdf`
- `GÜNLÜK RAPOR 03062026 -.xlsx`
- `GÜNLÜK RAPOR 02062026.xlsx`

Hermes surfaced none of the three attachments. Exact filenames are absent from the active RAG chunks, file inventory, and index status artifacts. Exact-name retrieval queries completed without runtime exceptions but returned unrelated Markdown sources.

Decision: 0/3 PASSED, 3/3 FAILED.

## Validation Scope

Ground-truth source:

- Gmail messages and attachments associated with the June 4, 2026 Dikey finance mail window.
- Gmail attachment metadata and attachment reads were used to confirm the files exist and are readable through the Gmail connector.

Hermes path tested:

- `/Users/erolutku/Library/Mobile Documents/com~apple~CloudDocs/Dikey/00_SYSTEM/JARVIS/RAG/jarvis_ask.py`
- Mode: `--no-llm`
- Retrieval: BM25 over `rag_chunks.jsonl`
- Top-k: 5

This retest evaluates whether the current indexed path can surface the exact files. It does not expose or reproduce financial values from the workbooks.

## Gmail Ground Truth

| Target | Gmail evidence | Attachment evidence |
|---|---|---|
| `MİKENOPA AVANOS KAPADOKYA PROJESİ.pdf` | Message `19e927943a7a00d0`; subject `RE: NAVDT DTbH Avanos Cappadocia - DORAK - IPTV HeadEnd Kurulum`; received 2026-06-04 | PDF, 358,477 bytes, 1 page. Attachment read succeeded, but no embedded text was parseable; the page is image-based. |
| `GÜNLÜK RAPOR 03062026 -.xlsx` | Message `19e916f4e2cea1c5`; subject `GÜNLÜK RAPOR 03.06.2026`; received 2026-06-04 | XLSX, 874,198 bytes. Attachment read succeeded; 18 tabs were parsed, including `DİKEY_KASA_`. |
| `GÜNLÜK RAPOR 02062026.xlsx` | Message `19e8c63733536974`; subject `GÜNLÜK RAPOR 02.06.2026`; received 2026-06-03 and included by the June 4 finance validation set | XLSX, 873,990 bytes. Attachment read succeeded; 18 tabs were parsed, including `DİKEY_KASA_`. |

## Retest Results

| Exact query | Correct target surfaced | Observed top result | Result |
|---|---:|---|---:|
| `MİKENOPA AVANOS KAPADOKYA PROJESİ.pdf` | No | `JARVIS/REPORTS/gmail_anttron_scan_20260509_190457.md` | FAILED |
| `GÜNLÜK RAPOR 03062026 -.xlsx` | No | `JARVIS/REPORTS/JARVIS_FILE_INDEX_REFRESH_AND_CLASSIFICATION_PATCH_2026-05-16.md` | FAILED |
| `GÜNLÜK RAPOR 02062026.xlsx` | No | `JARVIS/REPORTS/JARVIS_FILE_INDEX_REFRESH_AND_CLASSIFICATION_PATCH_2026-05-16.md` | FAILED |

All three commands:

- loaded 18,638 chunks after hard-filtering 4,225 low-signal chunks;
- completed without a Python exception;
- returned five positive-score matches;
- failed file-identity relevance.

The positive BM25 match count must not be interpreted as target discovery. None of the returned source paths identifies the requested attachment.

## Index Evidence

Exact-name searches returned zero matches in:

- `rag_chunks.jsonl`
- `rag_file_inventory.csv`
- `rag_index_status.md`

Artifact timestamps observed:

- `rag_chunks.jsonl`: 2026-06-03 20:13:18 +0300
- `rag_file_inventory.csv`: 2026-05-19 01:48:12 +0300
- `rag_index_status.md`: 2026-05-19 01:48:13 +0300

No matching source files were found under the scanned Dikey filesystem.

## Root Cause

Primary cause: ingestion coverage, not retrieval execution.

The active `rag_indexer.py`:

- recursively scans only `.md` and `.markdown`;
- describes its inventory as one row per Markdown file;
- has no PDF parser, OCR path, XLSX parser, or Gmail attachment ingestion path.

The three validation attachments exist in Gmail but are not represented in the indexed filesystem corpus. Therefore BM25 cannot retrieve their exact filenames or contents and instead ranks unrelated Markdown containing overlapping terms.

The MIKENOPA PDF adds a second constraint: it is image-based and produced no parseable embedded text, so content retrieval will require OCR after attachment ingestion.

## Smallest Next Fix

Implement a bounded Gmail attachment manifest bridge without changing `jarvis_ask.py` or BM25:

1. Stage only explicitly selected finance attachments in a governed local Gmail attachment directory.
2. Generate one Markdown sidecar per attachment containing exact filename, Gmail message ID, subject, received date, MIME type, size, and staged file path.
3. For XLSX files, add bounded extracted text such as sheet names and approved rows. Do not index unrestricted financial values by default.
4. For image-only PDFs, index the manifest immediately and mark `content_text_status: OCR_REQUIRED`; add OCR as a separate controlled step.
5. Rebuild the existing Markdown index and rerun these exact three queries.

Why this is the smallest fix:

- it uses the current Markdown-only indexer;
- it requires no retrieval-ranking change;
- it makes file identity retrievable before broad non-Markdown parsing is introduced;
- it keeps sensitive finance extraction bounded and reviewable.

## Acceptance Criteria For Retest v2

| Check | Required result |
|---|---:|
| All three exact filenames appear in indexed Markdown sidecars | PASS |
| Each exact-name query returns its matching sidecar at rank 1 | PASS |
| Returned metadata identifies the correct Gmail message and staged attachment | PASS |
| XLSX sidecars expose approved sheet-level evidence without unrestricted financial values | PASS |
| PDF sidecar reports `OCR_REQUIRED` until OCR evidence exists | PASS |
| Existing baseline query still completes without exception | PASS |

## Trust Decision

Hermes remains BASELINE PARTIAL.

Hermes can execute indexed Markdown retrieval, but it cannot currently be trusted to surface Gmail-only PDF or XLSX finance attachments. The next coverage action should be the bounded attachment manifest bridge above, followed by `EROL_OS_HERMES_FINANCE_ATTACHMENT_COVERAGE_RETEST_RESULT_v2.md`.
