---
goal: AgentOps Framework Generator implementation plan
version: 1.0
date_created: 2026-01-27
last_updated: 2026-01-27
owner: Core Engineering
status: Planned
tags: [feature, agentops, automation]
post_title: "AgentOps Framework Generator Plan"
author1: "GitHub Copilot"
post_slug: "agentops-framework-generator-plan"
microsoft_alias: "copilot"
featured_image: "https://example.com/featured-image.png"
categories:
  - internal
tags: 
  - plan
  - agentops
  - automation
ai_note: "AI assisted"
summary: "Plan to complete the AgentOps Framework Generator per architecture spec."
post_date: "2026-01-27"
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This plan operationalizes the AgentOps Framework Generator spec, covering sensing, planning, packing, application, and PR governance to deliver repo-tailored agent.md and instructions.md artifacts with managed-section safety and deterministic PRs.

## 1. Requirements & Constraints

- **REQ-001**: Implement end-to-end sense → plan → pack → apply → PR per spec-architecture-agent-builder.
- **REQ-002**: Use RepoSnapshot to drive PlanManifest; no hallucinated paths.
- **REQ-003**: Generate customized repo-profile/agents/instructions using plan output; avoid static defaults when signals differ.
- **REQ-004**: Preserve unmanaged content via managed sections; support refresh-only mode.
- **REQ-005**: Deliver changes via PR branch `agentops/pack-{version}` with stable ordering and no timestamps.
- **CON-001**: GitHub-hosted runners only; minimal perms (`contents: write`, `pull-requests: write`).
- **CON-002**: No unmanaged overwrites; skip files without markers in refresh mode.

## 2. Implementation Steps

### Implementation Phase 1

- GOAL-001: Complete sensing fidelity and snapshot coverage

| Task     | Description                                                                 | Completed | Date       |
| -------- | --------------------------------------------------------------------------- | --------- | ---------- |
| TASK-001 | Extend signal detection for pkg managers/frameworks in src/sense/snapshot.ts|           |            |
| TASK-002 | Add unit tests for RepoSnapshot creation (sense/types, snapshot)             |           |            |
| TASK-003 | Surface aiConfig/conventions in snapshot output for planner consumption      |           |            |

### Implementation Phase 2

- GOAL-002: Stabilize planner and PlanManifest generation

| Task     | Description                                                                 | Completed | Date |
| -------- | --------------------------------------------------------------------------- | --------- | ---- |
| TASK-004 | Enforce PlanManifest schema + validation before use (src/plan/planner.ts)   |           |      |
| TASK-005 | Add fallback static plan when LLM unavailable; log reason (src/index.ts)    |           |      |
| TASK-006 | Unit tests for planner JSON parsing and failure handling (src/plan/*.test.ts)|           |      |

### Implementation Phase 3

- GOAL-003: Apply plan-driven packing and managed content emission

| Task     | Description                                                                 | Completed | Date |
| -------- | --------------------------------------------------------------------------- | --------- | ---- |
| TASK-007 | Map PlanManifest.files to pack source generation (src/pack/source.ts)       |           |      |
| TASK-008 | Inject plan-derived repo-profile/agents/instructions content (src/index.ts) |           |      |
| TASK-009 | Ensure managed sections markup used for generated files (apply/managed-sections.ts)|           |      |

### Implementation Phase 4

- GOAL-004: PR governance and idempotent apply

| Task     | Description                                                                 | Completed | Date |
| -------- | --------------------------------------------------------------------------- | --------- | ---- |
| TASK-010 | Wire apply summary + plan metadata into PR body (src/pr/summary.ts)         |           |      |
| TASK-011 | Reuse/update PR by branch with churn control (src/pr/update.ts)             |           |      |
| TASK-012 | Emit deterministic change summaries, no timestamps (src/apply/engine.ts)    |           |      |

### Implementation Phase 5

- GOAL-005: Validation, tests, and workflow wiring

| Task     | Description                                                                 | Completed | Date |
| -------- | --------------------------------------------------------------------------- | --------- | ---- |
| TASK-013 | Add/extend Vitest suites for sense/plan/pack/apply/pr modules               |           |      |
| TASK-014 | Add dry-run integration test fixture to confirm no-changes path            |           |      |
| TASK-015 | Document usage and modes in README and workflow examples                   |           |      |

## 3. Alternatives

- **ALT-001**: Static template-only generation without planner — simpler but fails REQ-CONTENT-001 (customization) and spec mandates.
- **ALT-002**: Direct file writes without managed sections — higher speed but violates CON-HARM-001 and idempotence goals.

## 4. Dependencies

- **DEP-001**: OpenAI/GitHub Models token available to planner (env GH_PAT/GITHUB_TOKEN or llm_token input).
- **DEP-002**: GitHub API permissions `contents: write`, `pull-requests: write` for upsertPr.
- **DEP-003**: Node 18+ with pnpm; Vitest for test execution.

## 5. Files

- **FILE-001**: src/sense/snapshot.ts, sense/types.ts — signal and snapshot construction.
- **FILE-002**: src/plan/planner.ts, plan/types.ts — PlanManifest generation and parsing.
- **FILE-003**: src/pack/manifest.ts, src/pack/source.ts — component selection and source loading.
- **FILE-004**: src/apply/managed-sections.ts, src/apply/engine.ts — managed apply logic.
- **FILE-005**: src/pr/summary.ts, src/pr/update.ts — PR body and upsert logic.
- **FILE-006**: src/index.ts — orchestration of sense → plan → pack → apply → PR.
- **FILE-007**: docs/specs/spec-architecture-agent-builder.md — architectural contract reference.

## 6. Testing

- **TEST-001**: Vitest unit tests for snapshot signal detection and aiConfig/conventions exposure.
- **TEST-002**: Vitest unit tests for planner JSON parsing, schema validation, and fallback path.
- **TEST-003**: Vitest unit tests for pack/source mapping from PlanManifest and managed section application.
- **TEST-004**: Vitest unit tests for PR summary stability (sorted lists, no timestamps) and upsert churn guard.
- **TEST-005**: Integration dry-run test asserting no-changes path and deterministic summaries on rerun.

## 7. Risks & Assumptions

- **RISK-001**: LLM hallucination of paths → mitigate with schema validation and fallback static plan.
- **RISK-002**: Missing managed markers causing skips → log warnings and document marker requirements.
- **RISK-003**: Token scope insufficient for PR updates → validate and fail fast with guidance.
- **ASSUMPTION-001**: Target repos permit branch creation and PR writes on `agentops/pack-*`.

## 8. Related Specifications / Further Reading

- docs/specs/spec-architecture-agent-builder.md
- memory-bank/bolts/bolt-pack-apply-engine-1/implementation-walkthrough.md
- memory-bank/bolts/bolt-config-and-packaging-1/implementation-walkthrough.md
- memory-bank/bolts/bolt-pr-governance-and-reporting-1/implementation-walkthrough.md
