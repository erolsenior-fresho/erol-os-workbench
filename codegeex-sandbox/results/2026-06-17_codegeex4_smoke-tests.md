# CodeGeeX4 Smoke Tests - 2026-06-17

## Environment

Model:

- `codegeex4`

Runtime:

- Ollama local API
- `http://localhost:11434`

Model details from `ollama show codegeex4`:

- architecture: `chatglm`
- parameters: `9.4B`
- context length: `131072`
- quantization: `Q4_0`
- capability: `completion`

## Test 1 - Turkish Safety Explanation

Prompt:

```text
Turkce cevap ver. Yerel calisan bir coding modelini cloud IDE extension'a gore hangi durumlarda daha guvenli bulursun? 3 maddede acikla.
```

Result summary:

- Model answered in Turkish.
- Local runtime worked.
- The answer was understandable but repetitive.
- It did not clearly articulate the strongest local-model security point: private code can remain off third-party servers.
- Quality: usable, but not strong.

Scores:

- correctness: 3
- explanation: 2
- Turkish/English: 3
- hallucination control: 3
- latency: 4

Decision:

- pass as runtime smoke test
- weak as security reasoning test

## Test 2 - TypeScript Explanation

Prompt:

```text
Explain this TypeScript function in English. Then list two edge cases.
```

Input:

- `codegeex-sandbox/toy-project/src/domainScore.ts`

Result summary:

- Correctly identified that `scoreDomain` starts at 50 and clamps result between 0 and 100.
- Correctly explained `.com`, length, hyphen and search-intent logic.
- Missed the `.net` bonus in its explanation.
- Edge cases were generic but relevant: invalid/missing input and long domain length.

Scores:

- correctness: 4
- explanation: 3
- code quality: 3
- hallucination control: 4
- latency: 4

Decision:

- pass as a basic code-explanation test
- needs comparison against `qwen2.5-coder:7b`

## Initial Read

CodeGeeX4 is now usable locally, but we should treat it as a secondary/local coding assistant until it beats the existing baseline on toy tasks.

Next tests:

1. Refactor `domainScore.ts`.
2. Generate tests for `domainScore.ts`.
3. Find bugs in `normalize_invoice_rows.py`.
4. Run the same prompts with `qwen2.5-coder:7b`.

