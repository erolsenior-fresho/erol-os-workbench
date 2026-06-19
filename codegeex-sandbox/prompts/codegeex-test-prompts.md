# CodeGeeX Test Prompts

## Test 1 - Turkish Explanation

```text
Turkce cevap ver. Yerel calisan bir coding modelini cloud IDE extension'a gore hangi durumlarda daha guvenli bulursun? 5 maddede acikla.
```

## Test 2 - Explain TypeScript

```text
Read this TypeScript code and explain what it does. Then list two edge cases.

<paste codegeex-sandbox/toy-project/src/domainScore.ts here>
```

## Test 3 - Refactor TypeScript

```text
Refactor the TypeScript function below to make it easier to test. Keep behavior the same. Return only the new code and a short explanation.

<paste codegeex-sandbox/toy-project/src/domainScore.ts here>
```

## Test 4 - Generate Tests

```text
Create a small test plan for this function. Include at least 6 cases with input and expected output. Do not use any real domain names.

<paste codegeex-sandbox/toy-project/src/domainScore.ts here>
```

## Test 5 - Python Bug Hunt

```text
Find bugs or edge cases in this Python code. Then provide a corrected version.

<paste codegeex-sandbox/toy-project/src/normalize_invoice_rows.py here>
```

## Test 6 - Compare With Baseline

Run the same prompt with:

```bash
ollama run qwen2.5-coder:7b
ollama run codegeex4
```

Question:

```text
Given a CSV with columns vendor,date,amount,currency, write a small Python function that returns monthly totals by currency. Keep it dependency-free.
```

Compare:

- correctness
- readability
- error handling
- unnecessary complexity

