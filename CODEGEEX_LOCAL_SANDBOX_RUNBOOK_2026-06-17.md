# CodeGeeX Local Sandbox Runbook - 2026-06-17

## Goal

Prepare and run CodeGeeX as a local-only coding model candidate.

## Current Machine Status

Checked:

- Ollama installed.
- Git installed.
- Python installed.
- Node/npm installed.
- Ollama local API responds on `http://localhost:11434`.

Existing useful local coding baseline:

- `qwen2.5-coder:7b`

## Local Model

Target model:

- `codegeex4`

Installed status:

- Installed locally through Ollama on 2026-06-17.
- Verified with `ollama show codegeex4`.
- Turkish smoke test and TypeScript explanation test completed.
- First result note: `codegeex-sandbox/results/2026-06-17_codegeex4_smoke-tests.md`

Pull command:

```bash
ollama pull codegeex4
```

Run command:

```bash
ollama run codegeex4
```

Clean API command:

```bash
curl -s http://localhost:11434/api/generate \
  -d '{"model":"codegeex4","stream":false,"prompt":"Explain this code briefly."}'
```

Prefer the local API for saved test results because CLI output may include terminal spinner/control characters.

## Sandbox Location

```text
/Users/erolutku/Documents/New project/codegeex-sandbox/
```

Contents:

- `README.md`
- `prompts/codegeex-test-prompts.md`
- `toy-project/src/domainScore.ts`
- `toy-project/src/normalize_invoice_rows.py`
- `results/README.md`

## Security Boundary

Allowed:

- toy code
- public snippets
- synthetic domain examples
- short architecture prompts without secrets

Forbidden:

- private Erol OS repo code
- credentials
- GoDaddy/Hetzner screenshots
- invoices and payment records
- Gmail exports
- full DNS exports
- production automation instructions

## First Test Sequence

1. Confirm model exists:

```bash
ollama show codegeex4
```

2. Turkish smoke test:

```bash
ollama run codegeex4 "Turkce cevap ver. Yerel calisan bir coding modelini cloud IDE extension'a gore hangi durumlarda daha guvenli bulursun? 5 maddede acikla."
```

3. TypeScript explanation:

Use `codegeex-sandbox/prompts/codegeex-test-prompts.md` Test 2.

4. Python bug hunt:

Use Test 5.

5. Compare against baseline:

```bash
ollama run qwen2.5-coder:7b
ollama run codegeex4
```

Use Test 6.

## Pass Criteria

CodeGeeX can move to the next evaluation stage if:

- local run is stable
- answers are useful on toy code
- Turkish prompts are understandable
- TypeScript/Python suggestions are sane
- it does not claim to know files it has not seen
- it is meaningfully better than or complementary to `qwen2.5-coder:7b`

## Stop Criteria

Stop and keep as watchlist only if:

- local model fails to run
- output is very slow or incoherent
- it repeatedly invents repo facts
- it asks for cloud login
- it needs private-code exposure to become useful
