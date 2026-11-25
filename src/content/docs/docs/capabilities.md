---
title: "Ceaser capabilities and limitations"
description: "This matrix states what the deterministic engine can establish today, with the"
---
This matrix states what the deterministic engine can establish today, with the
evidence semantics it uses. It is deliberately conservative.

## What each output means

| Output | Evidence basis | Does it mean the cause? |
|---|---|---|
| Classification (regression / pre-existing / flaky / …) | reproduction + base/head | no, behavioral character |
| Likely function (primary + alternates) | observed frames, verified call paths, SSA operands | no, investigation lead |
| Causal trace (`CausalTrace`) | observed frames + typed calls + argument provenance | no, relationship evidence (`inferred`/`static`) |
| Defect-origin hypothesis (`DefectOrigin`) | AST pattern (+ SSA type/path when available) | no, hypothesis, `source_pattern` or `static_data_dependency` |
| Root-cause assessment (`RootCauseAssessment`) | concurrency contract or runtime mechanism gates | `established` only when the gates pass |
| Verified mechanism | runtime probe + correlation + SSA + recognized mechanism | yes (narrow) |

## Supported defect-origin mechanisms

| Mechanism | Status | Notes |
|---|---|---|
| `later_assignment` | supported (hypothesis) | operand reassigned before the failure; branch-dependent defs kept as alternatives |
| `ignored_error` | supported (hypothesis) | producing call's error discarded (`_`) |
| `missing_guard` | supported, type-aware when SSA provides the type | non-nilable typed deref suppressed; non-dominating guards do not suppress |
| `boundary_guard` | supported (hypothesis) | prior `<=`/`>= len(...)` guard on the failing index |

All are hypotheses. They are **not** admitted as candidates and **not** promoted
to a root cause. Defect-origin hypotheses appear in the investigation brief and
the causal explanation, never as verified causes.

## Known limitations

- No full reaching-definition/dominator/phi analysis; feasibility is AST-level
  plus an SSA value/type/path check. Unproven reachability stays a hypothesis.
- SSA coverage is partial; type-awareness frequently falls back to
  `source_pattern`.
- Mutation through pointers, slices, maps, closures, and aliases is not modeled.
- Base/head delta correlation is symbol/file-level; a change is never causation.
- Cross-package indexing and assertion-anchor expansion are not complete.
- Independent new-repository evaluation is not yet run; current paired numbers
  come from six development-exposed cases.

## Wording rules

- A hypothesis is never labelled a confirmed root cause.
- `root cause established` is emitted only by `assessRootCause` gates.
- The PR comment and brief keep observed failures, leads, hypotheses, and verified
  mechanisms distinct.
