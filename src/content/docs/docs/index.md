---
title: "Documentation"
description: "Current release: v0.1.2. The engine is Go-only. Caeser produces"
---
> **Caeser** reads a failed CI run, traces the failure through the checked-out
> source, and updates one pull-request comment with the failure, the evidence,
> and the most defensible functions to inspect. This section is the map of the
> project's documentation: what each page covers, which page to read for a given
> goal, the concepts you need to interpret a report, and the boundaries the
> engine will not cross.

**Current release: v0.1.2.** The engine is **Go-only**. Caeser produces
investigation leads, not verified root causes. Read
[Capabilities and limitations](/docs/capabilities/) before relying on a diagnosis.

> **Version note.** Some older pages still contain `v9.x` tag examples. Treat the
> version in the [README](https://github.com/caeser-org/ceaser/blob/main/README.md) and the pinned reference in
> [CI integration](/docs/ci-integration/) as current; workflow code and binary
> version are selected independently.

---

## Choose your starting point

Pick the row that matches what you are trying to do. Each path lists the pages
in the order they are most useful - start at the left and move right only as
needed.

| Goal | Start here | Then read | Only if needed |
| --- | --- | --- | --- |
| **Try Caeser on my machine** | [README: Try it locally](https://github.com/caeser-org/ceaser/blob/main/README.md#try-it-locally) | [Installation](/docs/installation/) | [Adapter coverage](/docs/supported-environments/) for toolchain requirements |
| **Get PR comments on failed CI runs** | [CI integration](/docs/ci-integration/) | [GitHub Action](/docs/github-action/) | [Custom comment author](/docs/ci-integration/#optional-custom-comment-author) |
| **Understand a report or brief** | [Reports and briefs](/docs/reports/) | [Capabilities and limitations](/docs/capabilities/) | [Runtime architecture](/docs/runtime-architecture/#5-render-what-the-evidence-supports) |
| **Understand why a lead is ranked first** | [Core concepts](#core-concepts) below | [Runtime architecture](/docs/runtime-architecture/#3-find-source-leads) | [Capabilities](/docs/capabilities/) for evidence semantics |
| **Run Caeser with Docker / understand isolation** | [Sandbox execution](/docs/sandbox-execution/) | [Runtime architecture: boundaries](/docs/runtime-architecture/#runtime-and-security-boundaries) | [CI integration](/docs/ci-integration/#requirements-and-limits) |
| **Score results or run an evaluation** | [Diagnosis evaluation](/docs/diagnosis-evaluation/) | [Evaluation index](https://github.com/caeser-org/ceaser/blob/main/evaluation/README.md) | [Independent results](https://github.com/caeser-org/ceaser/blob/main/evaluation/final-mission/INDEPENDENT-RESULTS.md) |
| **Decide whether Caeser is accurate enough** | [Independent results](https://github.com/caeser-org/ceaser/blob/main/evaluation/final-mission/INDEPENDENT-RESULTS.md) | [External validation](/docs/external-validation/) | [Fresh batch results](https://github.com/caeser-org/ceaser/blob/main/evaluation/holdout/FRESH10-RESULTS.md) |
| **Contribute code, fixtures or docs** | [CONTRIBUTING.md](https://github.com/caeser-org/ceaser/blob/main/CONTRIBUTING.md) | [Evidence map](https://github.com/caeser-org/ceaser/blob/main/evaluation/final-mission/EVIDENCE-MAP.md) | [Gap analysis](/docs/gap-analysis-staged-investigation/) for historical context |
| **Upgrade or review a release** | [Release notes](/docs/releases/v020/) | [Installation](/docs/installation/) | [Changelog](https://github.com/caeser-org/ceaser/blob/main/CHANGELOG.md) |

### Five-minute orientation

If you only read three things, read these:

1. [What you get](https://github.com/caeser-org/ceaser/blob/main/README.md#what-you-get) - the three surfaces (PR comment, report artifact, assistant brief).
2. [Capabilities and limitations](/docs/capabilities/) - what each output actually means.
3. [Reports and briefs](/docs/reports/) - how to find and read the evidence.

---

## Documentation index

Every page in this section, grouped by purpose. Descriptions say what you will
actually find, not just the title.

### Get started

| Page | What it covers |
| --- | --- |
| [README](https://github.com/caeser-org/ceaser/blob/main/README.md) | Product overview, quickstart, GitHub Actions caller example, configuration reference, architecture summary, adapter roadmap, troubleshooting reference table and documentation index. |
| [Installation](/docs/installation/) | Building from source (Go 1.26, Git, C compiler for SQLite), installing and verifying the v0.1.2 Linux amd64 binary, the setup action, project onboarding with `caeser init`, and setup troubleshooting. |
| [CI integration](/docs/ci-integration/) | Onboarding with `caeser init`, `.caeser.yml` keys, the full `workflow_run` caller, every reusable-workflow input and secret, fork-PR guard, custom GitHub App comment authorship, manual runs and local reproduction. |
| [GitHub Action](/docs/github-action/) | The two entry points (reusable workflow vs. setup action), a custom-job example, the setup action's `version` input and `binary-path` output, checksum verification behavior, and release/Marketplace publishing. |

### Read and interpret results

| Page | What it covers |
| --- | --- |
| [Reports and briefs](/docs/reports/) | Where the comment, `caeser-brief.md` and `caeser-report.json` appear; how to regenerate a missing brief; the observed / inferred / established distinction; the `likely_function` shortlist and what `status: unavailable` means. |
| [Capabilities and limitations](/docs/capabilities/) | The evidence basis for each output, the four supported defect-origin hypotheses (`later_assignment`, `ignored_error`, `missing_guard`, `boundary_guard`), the wording rules, and known analysis limitations. |
| [External validation](/docs/external-validation/) | Live checks: the Caeser smoke PR, the Kubernetes PR #143709 analysis, the controlled 16-case Go run, and the checks still open. Separates "analyzed an external failure" from "adopted by an upstream maintainer". |

### Understand the engine

| Page | What it covers |
| --- | --- |
| [Runtime architecture](/docs/runtime-architecture/) | The `diagnose` → `analyze` → `publish` job split, component-to-source map, six-stage pipeline, evidence types, candidate and `likely_function` ranking, probes and repair, the model harness, gateway (endpoints and SSE), MCP server, persistence and trust boundaries. |
| [Sandbox execution](/docs/sandbox-execution/) | Layer ownership, workspace and execution lifecycle diagram, local vs. Docker backends, the container controls table, command/environment policy, bounded output handling, artifacts, terminal outcomes and cleanup, and the GitHub Actions trust boundary. |
| [Adapter coverage](/docs/supported-environments/) | What each environment detects, its source-analysis depth and whether the reusable workflow sets up its toolchain. Go is the only validated adapter; the others are foundations. |
| [Environment adapters](/docs/environment-adapters/) | How `internal/environment` adapters detect manifests, emit dependency-preparation commands and offer conservative test commands - and what they deliberately do not own. |
| [Gap analysis: staged investigation](/docs/gap-analysis-staged-investigation/) | **Historical planning note.** The gaps found before the staged pipeline was implemented, the reuse-the-program-graph decisions, and the implementation order. Use runtime architecture for current behavior. |

### Validate and measure

| Page | What it covers |
| --- | --- |
| [Diagnosis evaluation](/docs/diagnosis-evaluation/) | Scoring saved Go reports with `cmd/corpus-score`, writing a report index, keeping modes separate, and auditing fixtures with repairs. |
| [Evaluation index](https://github.com/caeser-org/ceaser/blob/main/evaluation/README.md) | Corpus, fixture repairs, results, probe reruns and case schema; the evaluator tools (`eval freeze`, `corpus-score`, `proof-audit`). |
| [Independent results](https://github.com/caeser-org/ceaser/blob/main/evaluation/final-mission/INDEPENDENT-RESULTS.md) | The frozen ten-case result, the exposure notice for the early five cases, the admission fix, remaining gaps, the paired development check and reproduction commands. |
| [Fresh batch results](https://github.com/caeser-org/ceaser/blob/main/evaluation/holdout/FRESH10-RESULTS.md) | Full per-case table for the ten cases that were frozen before their first evaluation. |
| [Causal explanation findings](https://github.com/caeser-org/ceaser/blob/main/evaluation/causal-explanation-findings.md) | Findings behind the causal-trace and defect-origin work. |
| [Go probe preflight](https://github.com/caeser-org/ceaser/blob/main/evaluation/go-probe-preflight.md) | Plain-log and corrective-diff baselines for file localization. |
| [Probe acceptance criteria](https://github.com/caeser-org/ceaser/blob/main/evaluation/go-probe-acceptance.md) | The frozen stage metrics used by the 16-case probe rerun. |
| [Probe rerun results](https://github.com/caeser-org/ceaser/blob/main/evaluation/probe-rerun/README.md) | Per-case stage outcomes and raw artifacts. |
| [MinIO fixture repair](https://github.com/caeser-org/ceaser/blob/main/evaluation/fixture-repairs/minio-2342/README.md) | A worked example of repairing a fixture and recording hashes and baseline/fixed-head checks. |
| [Evaluation mission files](https://github.com/caeser-org/ceaser/tree/main/evaluation/final-mission/) | `PLAN.md`, `PROGRESS.md`, `EVIDENCE-MAP.md`, `RESULTS.md` and `LIMITATIONS.md` - the persistent engineering record for the evaluation mission. |

### Releases and project

| Page | What it covers |
| --- | --- |
| [Release notes index](/docs/releases/v020/) | Notes for v0.1.0, v0.1.1 and v0.1.2, plus earlier v7–v9.2 notes. |
| [v0.1.2](/docs/releases/v012/) | Wires the frozen independent batch into evaluation; engine unchanged; states the 3/10 signal. |
| [Changelog](https://github.com/caeser-org/ceaser/blob/main/CHANGELOG.md) | Chronological user-facing changes. |
| [Contributing](https://github.com/caeser-org/ceaser/blob/main/CONTRIBUTING.md) | Setup, where to make changes, fixture guidelines, and how to write a useful bug report or PR. |

---

## Core concepts

Caeser keeps several kinds of statement apart on purpose. An answer to one
question must not silently become an answer to another.

### Evidence and provenance

**Evidence item** - a bounded, identified record with a kind, source, digest and
provenance. Original CI logs, JUnit reports, artifacts, stack frames and
executed checks all enter the report as evidence with IDs.

**Observed** - the CI output or an executed check recorded the event. A stack
frame identifies a location the runtime reported. Observed locations keep their
original provenance (provider, URI, revision).

**Inferred** - source inspection, a typed call relationship or a ranking rule
points to a lead. It is a place to look, not a claim that the code ran.

**Established** - reserved for a mechanism supported by the stringent runtime,
correlation and dataflow gates. Establishing a mechanism and attributing it to a
pull request are separate findings.

**Evidence-first (artifact-first)** - the original failure is a real
observation. A report built from it records local reproduction as *deferred*
rather than counting the original CI failure as a new reproduction.

**Source identity** - a source line from one revision and a binary offset from
another build are not interchangeable. Evidence keeps revision, artifact digest
and execution identifiers so a frame is only mapped against its matching
source.

### Findings and leads

| Term | Meaning | Is it a cause? |
| --- | --- | --- |
| **Classification** | Behavioral character: regression, pre-existing, flaky and so on, based on reproduction and base/head observations. | No |
| **Likely function** | One primary suspect plus alternates, each with file, function, line when available, reason, provenance kind, confidence and evidence IDs. | No - handoff lead |
| **Causal trace** | A backward walk from the failure through value provenance, local assignments, caller arguments and observed stack frames. | No - relationship evidence |
| **Defect-origin hypothesis** | An inferred `later_assignment`, `ignored_error`, `missing_guard` or `boundary_guard` pattern tied to a failing operand. | No - hypothesis |
| **Verified mechanism** | A narrow stronger claim requiring a runtime probe, invocation correlation, SSA support and a recognized mechanism. | Yes, within that narrow scope |
| **Root-cause assessment** | `established` only when the existing stringent gates pass; otherwise it records missing evidence. | Only when gates pass |

**Confidence vs. rank.** A candidate rank is a search priority, not a calibrated
probability that a function is defective. Likewise, a confidence label on a
lead is not a causal probability.

**Repair is separate.** Patch generation and verification are opt-in paths that
never edit the checkout automatically. A patch that makes a test pass is not by
itself proof of the intended root cause.

---

## The investigation pipeline

The stages below are the ones the engine actually runs. Details and source-file
maps are in [Runtime architecture](/docs/runtime-architecture/).

1. **Identify the execution.** The caller supplies a failed run ID and head
   commit. Caeser checks out that exact revision, downloads failed-job logs and
   available artifacts, and optionally records a base commit. A known base does
   not by itself establish that the PR introduced the failure.

2. **Normalize observed failures.** Parsers turn Go test output, assertions,
   panic stacks, compiler diagnostics, race reports and structured test
   artifacts into failure episodes and evidence items. Bounded raw evidence is
   retained. Coverage, when uploaded by the original CI run, can supply executed
   source ranges; missing coverage is not proof that code was unexecuted.

3. **Find source leads.** Observed file/line locations map to source symbols;
   typed Go call relationships and bounded SSA tracing add relationships. The
   `likely_function` shortlist ranks observed stack locations and exact SSA
   dependency values above generic inferred calls, and remains available when
   probing is off or inconclusive.

4. **Collect additional evidence when requested.** Reproduction, base/head
   comparison, the Go cold path, runtime probes and repair are separate
   opt-in capabilities - installing Caeser does not enable them all. Each
   records its own outcome; a logged value without invocation binding is not a
   verified mechanism.

5. **Render what the evidence supports.** `caeser-report.json` is the structured
   record; `caeser brief` derives a Markdown brief from it without a model call
   or a rerun. The publication job renders a short comment with expandable
   detail and updates its existing comment.

6. **Optional model investigation.** With `agent: true`, a separate job passes a
   bounded evidence package to a configured gateway. With
   `agent_code_retrieval: true`, the model may request bounded Go snippets from
   Git objects at the reported revision. Model output is labeled separately and
   cannot change deterministic classification or verification. A model failure
   leaves the original report intact.

![The investigation pipeline flow diagram](/diagrams/7640a07e6c1d-v2.svg)

---

## Command reference

Installed as `caeser`; run `caeser <command> -h` for a command's flags. The CLI
is the same engine used by the GitHub workflow.

| Command | Purpose |
| --- | --- |
| `caeser init` | Detect the repository and generate `.caeser.yml` plus a caller workflow. Never overwrites without confirmation; `--yes` for scripted runs. |
| `caeser diagnose` | Reproduce, classify, localize and write a replayable bundle. `--json` emits the full structured report. |
| `caeser evidence` | Diagnose previously collected logs/reports without a repository (`--ci-log`, `--junit`). |
| `caeser brief` | Export a readable Markdown brief from `caeser-report.json`; `--prompt` adds instructions for another assistant. |
| `caeser analyze` | Add separately labeled model analysis to an existing deterministic report. Does not execute repository code. |
| `caeser replay` | Re-run the checks recorded in a diagnosis bundle. Needs a compatible toolchain and environment. |
| `caeser repair` | Legacy patch-generating workflow, explicit opt-in. Patches are verified in isolation and never applied to the checkout. |
| `caeser eval freeze` | Record the current corpus manifest revision (only as part of a deliberate corpus update). |
| `caeser version` | Print the version. |

### Common invocations

```sh
# Onboard a repository
caeser init

# Analyze a saved failure with no source checkout
caeser evidence --ci-log failed.log > report.json

# Analyze a saved log against the revision that produced it
caeser diagnose --repo /path/to/checkout \
  --ci-log /path/to/failed-ci.log \
  --artifact-first --json > report.json

# Export two shareable briefs from a report
caeser brief --report report.json > caeser-brief.md
caeser brief --report report.json --prompt > caeser-prompt.md

# Reproduce locally using the checked-in configuration
caeser diagnose --repo . --base origin/main
```

> Review briefs and reports before sharing them: they can contain excerpts of
> private source code and CI logs.

### Frequently used diagnose flags

| Flag | Effect |
| --- | --- |
| `--repo`, `--command` | Target checkout and exact failing command; flags override `.caeser.yml`. |
| `--ci-log`, `--junit`, `--artifact-dir` | Ingest existing evidence files. |
| `--artifact-first` | Start from original evidence rather than reproduction. |
| `--executor`, `--image` | Choose `local` (default) or `docker` (requires an image). |
| `--base`, `--good` | Base revision for comparison; known-good revision enables bisect. |
| `--attempts`, `--timeout`, `--investigation-timeout` | Bound reproduction and overall diagnosis. |
| `--go-cold-path` | Focused Go verification; requires the Docker executor. |
| `--runtime-observation` | Bounded probe capturing values at selected operations. |
| `--agent` | Ask the configured gateway to analyze the evidence. |
| `--skip-adaptive`, `--fast-path` | Publish earlier with less optional work. |
| `--json` | Machine-readable report, including partial reports on timeout. |

See [CI integration](/docs/ci-integration/#inputs) for the workflow-level inputs and
[sandbox execution](/docs/sandbox-execution/#policy-and-output-handling) for the
execution policy.

---

## Configuration reference

### Project file: `.caeser.yml` / `.caeser.yaml`

Read from the repository root; flags always win over these values. Unknown keys
are rejected.

```yaml
command: go test ./...
base: origin/main
attempts: 3
timeout: 10m
executor: local
# image: <docker-image>       # required when executor: docker
# agent: false
# probes:
#   - go test ./pkg/... -run TestFoo
repair:
  max_attempts: 2
```

| Key | Meaning |
| --- | --- |
| `command` | Exact failing command. Required for reproduction unless adapter discovery or CI evidence supplies one. |
| `base` | Known base revision for head-vs-base comparison. |
| `good` | Known-good revision; enables `git bisect`. |
| `attempts` | Reproduction attempts per revision (default 3). |
| `timeout` | Per-attempt timeout as a Go duration (default 10m). |
| `executor` | `local` or `docker`. |
| `image` | Docker image; required with `executor: docker`. |
| `agent` | Ask the configured model gateway to analyze evidence. |
| `probes` | Extra diagnostic commands. They never modify the repository and are never fixes. |
| `repair.max_attempts` | Isolated patch-verification attempts for opt-in repair. |

### Reusable workflow inputs (highlights)

All inputs are optional; installation and publication defaults are defined by
the workflow. The full table, including secrets, is in
[CI integration](/docs/ci-integration/#inputs).

| Input | Default | Purpose |
| --- | --- | --- |
| `run_id`, `head_sha` | none / checked-out commit | Identify the failed run and exact commit. |
| `base_sha`, `base_ref` | none / default branch | Supply or resolve a base revision. |
| `caeser_version` | `v0.1.2` | Checksum-verified release binary. `latest` follows releases; `main` builds development source. |
| `comment` | `true` | Post the diagnosis as a PR comment. |
| `comment_detail` | `short` | Use `detailed` to expand the evidence section by default. |
| `agent`, `agent_code_retrieval` | `false` | Optional model analysis and bounded Git source retrieval. |
| `go_cold_path` | `false` | Focused Go verification; requires a Docker image. |
| `comment_app_client_id` | none | Publish with your own GitHub App instead of `github-actions[bot]`. |

Gateway secrets `CAESER_GATEWAY_ENDPOINT` and `CAESER_GATEWAY_MODEL` are used
only when `agent: true`, and are passed only to the separate analysis job.

---

## Outputs and where to find them

| Surface | Location | Use it for |
| --- | --- | --- |
| Short PR comment | The PR linked to the failed run | See the failure, a supported explanation and where to start. |
| Diagnosis details | Expand the comment section, or set `comment_detail: detailed` | Review evidence behind the leads and the next checks. |
| `caeser-brief.md` | The `caeser-diagnosis-<run-id>` workflow artifact | Read or share a self-contained Markdown brief. |
| `caeser-report.json` | Same artifact | Inspect the structured report, evidence IDs and limitations. |
| `likely_function` | PR comment and JSON report | Choose a function to inspect first, with alternates and evidence IDs. |
| Replay bundle | `<repo>/.caeser/bundles/<timestamp>` by default | Re-run the recorded checks with `caeser replay <bundle-dir>`. |

If the brief is missing but `caeser-report.json` is present, regenerate it
locally with `caeser brief` - no CI rerun and no model call required. See
[Reports and briefs](/docs/reports/#if-the-brief-is-missing).

---

## Trust, execution and safety

Caeser separates analysis from execution and publication. The practical
boundaries, in brief:

- **Jobs.** The reusable workflow uses a read-only `diagnose` job, an optional
  `analyze` job that receives only gateway secrets, and a `publish` job that
  holds comment permissions. Checkout credentials are not persisted.
- **Forks.** The starter caller deliberately excludes fork PRs. Keep that guard
  unless you have independently reviewed your execution and publication setup.
- **Local executor (default).** Runs with the runner's privileges and network. A
  worktree or temporary directory is *not* an OS security boundary.
- **Docker executor.** Disposable container per command, `--network none`,
  read-only root, dropped capabilities, no new privileges, resource limits and
  a writable workspace mount. Still a container boundary sharing the host
  kernel, not VM isolation.
- **Policy.** Commands, directories and environment names are validated; output
  is bounded while pipes keep draining. These constraints do not make arbitrary
  test code safe.
- **Model access.** Off by default. When enabled, source retrieval is bounded
  Git lookups at the failing commit - not an unrestricted shell agent.
- **Data handling.** Logs and briefs can contain private code and sensitive
  output. There is no telemetry by default; enabling a model sends the selected
  evidence to the configured provider.

The full treatment is in [Sandbox execution](/docs/sandbox-execution/) and
[Runtime architecture](/docs/runtime-architecture/#runtime-and-security-boundaries).

---

## Capabilities, limits and measured results

Caeser is intentionally conservative about what it claims.

| Output | Evidence basis | Cause? |
| --- | --- | --- |
| Classification | reproduction + base/head | No - behavioral character |
| Likely function | observed frames, verified call paths, SSA operands | No - investigation lead |
| Causal trace | observed frames + typed calls + argument provenance | No - relationship evidence |
| Defect-origin hypothesis | AST pattern (+ SSA type/path when available) | No - hypothesis |
| Verified mechanism | runtime probe + correlation + SSA + recognized mechanism | Yes, narrowly |
| Root-cause assessment | concurrency contract or runtime mechanism gates | Only when gates pass |

Known analysis limits include no full reaching-definition/dominator/phi
analysis, partial SSA coverage, no modeling of mutation through pointers/slices/
maps/closures/aliases, symbol- or file-level base/head correlation, and
incomplete cross-package indexing. See [Capabilities](/docs/capabilities/) for the
complete list.

**Measured, not assumed** (from
[independent results](https://github.com/caeser-org/ceaser/blob/main/evaluation/final-mission/INDEPENDENT-RESULTS.md)):

| Set | Cases | Exact-function | Status |
| --- | ---: | ---: | --- |
| Paired development cases | 6 | 6/6 with tracing, 5/6 without | Development-exposed |
| Early verified regressions | 5 | 3/5 after tuning | Development-exposed |
| Fresh independent batch | 10 | **3/10 (30%)**, one abstention | Frozen, unexposed |

The 3/10 figure is the honest independent signal. Do not use Caeser to
auto-merge, auto-revert or assign blame, and do not treat a ranked lead as a
verified cause.

---

## Contributing and maintaining these docs

- Code and fixture changes follow [CONTRIBUTING.md](https://github.com/caeser-org/ceaser/blob/main/CONTRIBUTING.md).
- Engine changes preserve the hard invariants: reuse the production engine,
  keep verification gates, keep evidence provenance, and never promote a
  hypothesis to a root cause without proof.
- Keep the persistent evaluation record current:
  [PLAN](https://github.com/caeser-org/ceaser/blob/main/evaluation/final-mission/PLAN.md),
  [PROGRESS](https://github.com/caeser-org/ceaser/blob/main/evaluation/final-mission/PROGRESS.md),
  [EVIDENCE-MAP](https://github.com/caeser-org/ceaser/blob/main/evaluation/final-mission/EVIDENCE-MAP.md),
  [RESULTS](https://github.com/caeser-org/ceaser/blob/main/evaluation/final-mission/RESULTS.md) and
  [LIMITATIONS](https://github.com/caeser-org/ceaser/blob/main/evaluation/final-mission/LIMITATIONS.md).
- The frozen ten-case batch is a validation set, not a tuning target. Any
  engine change should be developed on other cases, then evaluated once on a
  further fresh batch.

### Source of truth

| Topic | Authoritative location |
| --- | --- |
| Product behavior and claims | [README](https://github.com/caeser-org/ceaser/blob/main/README.md) and [Capabilities](/docs/capabilities/) |
| CLI flags and commands | `cmd/caeser/` (this page is a summary) |
| Workflow inputs and permissions | `.github/workflows/ci-diagnose.yml` and [CI integration](/docs/ci-integration/) |
| Engine pipeline and boundaries | `internal/` packages and [Runtime architecture](/docs/runtime-architecture/) |
| Accuracy numbers | [Independent results](https://github.com/caeser-org/ceaser/blob/main/evaluation/final-mission/INDEPENDENT-RESULTS.md) and [release notes](/docs/releases/v020/) |
