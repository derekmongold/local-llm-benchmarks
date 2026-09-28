# Qwen local coding and hybrid-route field report

Observed September 26, 2026 (the final campaign ended September 27 UTC). These are small synthetic qualification studies on a 64 GiB M5 Pro Mac mini. They are **custom task results, not SWE-bench, Terminal-Bench, or a general model ranking**.

The latest matched screen favored medium reasoning for correctness: 4/4 first proposals accepted, versus 3/4 with thinking off. Medium took substantially longer. Earlier complete fixed extraction routes used slightly more hosted tokens with local assistance. No autonomous production route is qualified by these results.

## Latest matched reasoning screen

Runtime: Bionic 1.1.6+3, bundled SDK 1.5.0, lms commit 1017bcb, Codex CLI 0.158.0-alpha.2. Community artifact: `lmstudio-community/Qwen3.8-27B-MLX-8bit`, revision `241ebb5f1d60b122fd653da658836a55feb9e2b0`, affine 8-bit/group 64. Artifact configuration identifies `Qwen3_5ForConditionalGeneration`; the community artifact name alone does not establish a distinct base architecture.

Both arms: temperature 0.7, top-p 0.8, top-k 20, min-p 0, repeat penalty 1, total output cap 4,096, requested reasoning budget 1,024, 480-second coding deadline. Presence penalty was omitted/unverified. The requested reasoning budget was **not established as a hard ceiling**. Reported resident context was 131,072; reported parallel capacity was four, but actual dispatch was serial. Short packets do not qualify full-context use.

The harness rendered off/medium templates per request and checked actual server settings and formatted/inference input-token equality. Two pure JavaScript repair tasks, two repetitions per task/mode, fixed counterbalanced order, identical task packets across modes. No tools or skill bodies were supplied. A controller applied strict one-file SEARCH/REPLACE proposals and ran public and independently withheld acceptance checks. One changed repair was permitted after a failed candidate, using public feedback only.

| Mode | First proposals | First accepted | Eventual accepted | Repairs accepted/attempted | Coding active-call sum | Reported local tokens |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Off | 4 | 3 | 3 | 0/1 | 171.266 s | 5,756 |
| Medium | 4 | 4 | 4 | 0/0 | 723.008 s | 9,679 |

| Task | Off first-pass | Medium first-pass | Off median first-call time | Medium median first-call time |
| --- | ---: | ---: | ---: | ---: |
| Priority/ID stable ordering | 1/2 | 2/2 | 32.400 s | 229.555 s |
| Device labels | 2/2 | 2/2 | 20.148 s | 131.949 s |

All nine coding predictions delivered finals and settled idle. Three additional controls passed: exact JSON once per mode, and an owned medium cancellation with `userStopped` and idle acknowledgement. Across 12 predictions, settings and idle proofs passed; reported local tokens totaled 15,591. System-wide memory monitoring collected 901 samples: minimum free 34%, swap unchanged at 20.38 MiB. These are sampled system measurements, not model RSS or a measured failure boundary.

The failed off sorting candidate omitted the ID tie-break when both priorities were invalid. Its repair invented an unrequested type ordering and still failed. An unchanged repeat later passed. This variability is why valid output formatting and a confident final are insufficient acceptance criteria. Medium needed no repair; an off-to-medium rescue route was not tested.

## Earlier quantization and hosted-route observations

These separate studies are summarized for context; they must not be pooled with the matched screen. Both variants received identical prompt hashes, but reported context ceilings differed (4-bit 208,384; 8-bit 131,072), and there was no counterbalancing. This was an observational same-packet comparison, not an isolated quantization experiment.

| Earlier test | 4-bit | 8-bit |
| --- | --- | --- |
| Original prompt controls | 4/4 exact | 4/4 exact |
| Eight held-out contracts, first attempt | 6/8 | 6/8 |
| Six selected successful cases, three repeats each | 18/18 | 18/18 |
| One normalization repair | Failed | Passed |
| Clarified CommonJS proposal, 16 checks | 11/16 first; 16/16 after repair | 16/16 first |
| Same 14 JSON calls, active-call sum | 95.316 s | 156.581 s |
| Median reported decode rate | 17.267 tokens/s | 10.194 tokens/s |
| Weight files | 14.95 GiB | 27.48 GiB |

The selected repetitions do not imply 24/24 representative reliability. A later, different representative arm remained 22/24 first-pass and 23/24 eventual; the latest two-family screen does not replace it.

Fixed complete extraction replay routes included hosted solver/reviewer instruction envelopes, local proposals, and deterministic acceptance. Cached input is a subset of input, not a subtraction.

| Fixed replay | Direct hosted tokens | Local-assisted hosted tokens | Hosted-token savings |
| --- | ---: | ---: | ---: |
| 4-bit aggregate, two paired replays | 55,624 | 56,426 | -1.442% |
| Fresh 8-bit paired replay | 27,812 | 28,214 | -1.445% |

These fixed operational routes failed a 30% savings target. Experiment design, supervising-chat diagnosis and closeout were uninstrumented; complete-session savings remain unknown. The latest coding screen has no complete direct-versus-assisted hosted accounting, so its hosted savings are also unknown. Faster local tokens and fewer cloud calls are not complete-route savings.

## Reuse the evidence

`results.json` and `trials.csv` retain every latest coding attempt, including the failed first candidate and failed repair. `attempts/` contains exact synthetic task prompts, before-code, final candidate code and patches. `provenance.json` hashes copied evidence. No model reasoning text, account state, private project inputs, or local absolute paths are included.

`replay/` contains the original pure-code acceptance verifiers and synthetic cases. The formerly withheld diagnostic cases are released here for reproducibility; **this corpus must be treated as public from now on**, with fresh withheld cases for subsequent qualification.

With Node.js installed, run:

```bash
node replay-all.cjs
```

This replays recorded candidate acceptance without any inference calls or downloads. It does not reproduce inference performance, the original OS sandbox, or broader project qualification. The VM and source restrictions are supplementary controls, not a security sandbox for arbitrary untrusted programs. Full inference reproduction requires the stated artifact/runtime and a compatible per-request template adapter; that local version-sensitive adapter is not included.

## Practical findings and open improvements

- Choose effort per task: medium is a candidate for further correctness-sensitive code tests; off was much faster for the label helper. Neither finding proves general superiority.
- Verify the actual loaded variant and server settings. In earlier Bionic tests, suffix/path CLI loads could select the wrong catalog variant; explicit SDK variant resolution worked. Reported context sometimes differed from the request.
- Record effective request settings after adapters. The controller's base sampler differed from the sampler actually supplied by the adapter.
- Use changed patches and independent assertions; separate first-pass, repair, delivery, and economic outcomes.
- Keep only final artifacts, compact failure evidence and counters in cloud handoffs. Do not export local reasoning histories.
- Documentation retrieval, compact skills, runtime acceleration and bounded cascades remain improvement candidates. None was measured by the latest matched effort screen.

Relevant primary documentation: [LM Studio SDK](https://lmstudio.ai/docs/typescript), [Context7](https://github.com/upstash/context7), [RouteLLM](https://github.com/lm-sys/RouteLLM). These sources describe capabilities and patterns; they do not validate this local setup or its savings.

The numerical report is observational evidence. Reuse it to narrow experiments, retain failed results, and rerun only the compatibility and acceptance gates relevant to your exact setup.
