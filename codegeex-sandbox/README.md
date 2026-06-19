# CodeGeeX Local Sandbox

Purpose:

- Test `codegeex4` locally through Ollama.
- Avoid private Erol OS code, credentials, domains, customer data and billing data.
- Compare CodeGeeX against existing local models on small coding tasks.

## Safety Rule

Only use files inside this folder for the first tests.

Do not paste:

- private repo code
- `.env` files
- API keys
- GoDaddy/Hetzner screenshots
- invoices
- email exports
- DNS zone exports from real accounts

## Setup Check

```bash
ollama list
ollama show codegeex4
```

If `codegeex4` is missing:

```bash
ollama pull codegeex4
```

## Smoke Test

```bash
ollama run codegeex4 "Reply in Turkish. In one paragraph, explain what makes a local coding model safer than a cloud coding extension."
```

Expected:

- It answers in Turkish.
- It does not ask for login.
- It runs locally through Ollama.

## Coding Tests

Run each prompt from `prompts/codegeex-test-prompts.md`.

Save notable outputs in:

```text
results/
```

## Evaluation Criteria

Score each test from 1 to 5:

- correctness
- useful explanation
- Turkish/English handling
- code quality
- hallucination control
- latency

## Initial Decision Gate

CodeGeeX may advance only if:

- local run works reliably
- toy-code answers are useful
- no cloud extension or login is needed
- it does not invent repo facts during code explanation

If it performs poorly, keep it as watchlist only and use `qwen2.5-coder:7b` or another local model as the baseline.

