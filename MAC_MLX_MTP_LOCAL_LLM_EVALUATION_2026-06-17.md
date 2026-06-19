# Mac MLX MTP Local LLM Evaluation - 2026-06-17

## Source

Video:

- `https://www.youtube.com/watch?v=jU02xG69jXI`

Video metadata from YouTube oEmbed:

- Title: `Run MLX LLMs 23% Faster on a Mac with MTP`
- Channel: `Joe Maddalone`
- Channel URL: `https://www.youtube.com/@JoeMaddalone`

Search result snippet:

- The video compares `oMLX` against `MTPLX`, described as an MLX inference engine with Multi-Token Prediction.
- Claimed theme: making MLX LLMs faster on Mac with MTP.

Related source context:

- `https://github.com/ml-explore/mlx-lm`
- `https://github.com/ml-explore/mlx-lm/issues/872`
- `https://github.com/ml-explore/mlx-lm/issues/1292`
- `https://blog.google/innovation-and-ai/technology/developers-tools/multi-token-prediction-gemma-4/`

## Local Machine Fit

Checked machine class:

- MacBook Pro
- Apple M4 Pro
- 12 CPU cores
- 24 GB memory

This is relevant because MLX is Apple Silicon focused and MTP/speculative decoding is specifically interesting for local Mac inference.

## What It Is

MTP means Multi-Token Prediction.

In practical terms, MTP/speculative decoding tries to generate or draft multiple future tokens per step, then verify them, instead of producing only one token at a time.

The expected benefit:

- faster local generation
- better tokens-per-second
- more responsive local AI agents
- potentially better battery/performance behavior on Apple Silicon

This is not a new coding assistant like CodeGeeX.

It is a performance technique/runtime path for running local models faster.

## Why It Matters For Erol OS

Current local-AI stack:

- Ollama is installed and working.
- `codegeex4` is installed locally.
- `qwen2.5-coder:7b` is available as a local coding baseline.
- Machine has Apple M4 Pro with 24 GB RAM.

MTP/MLX matters because it could improve the local-agent layer:

- faster local coding model responses
- lower waiting time during agent loops
- better local privacy workflow
- possible future replacement or companion for some Ollama tasks

Best fit:

- `erol-os-scout/local-ai/mac-mlx-mtp/`
- local model performance benchmark
- not domain/DNS/account operations

## Relationship To CodeGeeX

CodeGeeX4 currently runs through Ollama as `codegeex4`.

This video is about MLX/MTP, not CodeGeeX specifically.

So the useful question is:

- Can an MLX/MTP model on this Mac outperform `codegeex4` or `qwen2.5-coder:7b` for local coding tasks?

Do not mix the two yet:

- CodeGeeX sandbox measures model usefulness.
- MLX/MTP sandbox measures local runtime speed and stability.

## Risks And Caveats

Do not install tonight.

Reasons:

- MTP support in MLX ecosystem appears active but still moving.
- Some GitHub issues mention truncation or compatibility problems with MTP variants.
- It may require new model formats and additional local storage.
- Disk is already down to about 25 GB free after CodeGeeX install.
- 24 GB RAM is workable, but not generous for large models.

Potential risk areas:

- downloading another large model
- running unstable engine forks
- confusing Ollama baseline results with MLX/MTP results
- spending time on speed before measuring answer quality

## Suggested Sandbox

Pilot name:

- `mac-mlx-mtp-local-benchmark`

Repo placement:

- `erol-os-scout/tool-evals/mac-mlx-mtp/`

Sandbox location:

- `/Users/erolutku/Documents/New project/mlx-mtp-sandbox/`

Do not create or install until after:

1. CodeGeeX vs `qwen2.5-coder:7b` comparison is complete.
2. Disk space is reviewed.
3. Exact tool/repo from the video is identified.

Possible benchmark shape:

1. Pick one small MLX-compatible model.
2. Run plain MLX baseline.
3. Run MTP path.
4. Use the same prompt set as `codegeex-sandbox`.
5. Record:
   - tokens/sec
   - time to first token
   - total runtime
   - output quality
   - stability

## Decision

Status: HIGH-INTEREST / PERFORMANCE SANDBOX LATER

Do now:

- Add to AI workflow watchlist.
- Treat as Mac local-AI performance candidate.
- Do not install tonight.

Do next:

1. Finish CodeGeeX vs `qwen2.5-coder:7b` toy benchmark.
2. Reclaim or review disk space.
3. Identify the exact `oMLX` / `MTPLX` repos or commands from the video.
4. Create `mlx-mtp-sandbox` only if the toolchain looks clean.

Do not do yet:

- download large MLX models
- replace Ollama workflow
- use private code
- run domain/GitHub/account tasks through a new MTP stack

