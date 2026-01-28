---
goal: Complete core engines (Sense, Plan, Apply) and Action packaging
version: 1.0
date_created: 2026-01-27
last_updated: 2026-01-27
owner: AgentOps Maintainers
status: 'Planned'
tags: [feature, implementation, core, action]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This plan delivers the remaining core functionality: Sensing Engine, Planning Engine, Application Engine (managed blocks + PR), and the GitHub Action wrapper, including tests and build outputs.

## 1. Requirements & Constraints

- **REQ-001**: Sense phase must generate deterministic `RepoSnapshot` per FR-1 (idempotent, no randomness).
- **REQ-002**: Plan phase must output `PlanManifest` per schema with LLM + deterministic fallback (FR-2).
- **REQ-003**: Apply phase must update only managed sections in refresh mode; preserve human edits (FR-8, AC-3).
- **REQ-004**: PR creation must always use a branch and open a PR; never push to default (FR-10.1).
- **REQ-005**: GitHub Action must expose inputs/outputs and run end-to-end (FR-7, FR-10).
- **REQ-006**: Tests must cover determinism/idempotence and managed-block safety (AC-1, AC-3).
- **CON-001**: No secrets in outputs; token scopes minimal (NFR-1).
- **CON-002**: Execution time target <10 minutes end-to-end (NFR-4).
- **GUD-001**: Use managed markers `<!-- agentops-managed: true -->` and block markers `<!-- agentops:begin {id} -->`.
- **GUD-002**: TypeScript strict mode; Vitest for tests.

## 2. Implementation Steps

### Implementation Phase 1

- GOAL-001: Finalize Sensing Engine determinism and signal extraction.

| Task     | Description                                                                                  | Completed | Date |
| -------- | -------------------------------------------------------------------------------------------- | --------- | ---- |
| TASK-001 | Refine `RepoSnapshot` schema in `src/sense/types.ts` to match spec (languages, frameworks).   |           |      |
| TASK-002 | Complete `src/sense/snapshot.ts`: deterministic traversal, ignore `.git`, depth limits.      |           |      |
| TASK-003 | Implement signal detection (languages/frameworks/package managers) from key files.           |           |      |
| TASK-004 | Detect existing AI config (instructions, agents, prompts, mcp) per spec.                     |           |      |
| TASK-005 | Add Vitest coverage: determinism (double-run equality), tree depth, hidden files skipped.    |           |      |

### Implementation Phase 2

- GOAL-002: Deliver Planning Engine with LLM + fallback.

| Task     | Description                                                                                  | Completed | Date |
| -------- | -------------------------------------------------------------------------------------------- | --------- | ---- |
| TASK-006 | Finalize `PlanManifest` schema in `src/plan/types.ts` (files, managedPolicy, criteria).      |           |      |
| TASK-007 | Implement `Planner` in `src/plan/planner.ts` to call LLM prompt and produce manifest.        |           |      |
| TASK-008 | Add deterministic fallback path (no LLM) using heuristics from `RepoSnapshot`.               |           |      |
| TASK-009 | Validate manifest against schema; surface errors.                                            |           |      |
| TASK-010 | Vitest: schema validation, fallback path, fixture snapshot → manifest stability.             |           |      |

### Implementation Phase 3

- GOAL-003: Complete Application Engine (managed blocks + PR).

| Task     | Description                                                                                  | Completed | Date |
| -------- | -------------------------------------------------------------------------------------------- | --------- | ---- |
| TASK-011 | Finish managed block merge logic in `src/apply/managed-sections.ts` (begin/end markers).     |           |      |
| TASK-012 | Extend `src/apply/engine.ts` to apply `FileBundle` with modes: safe/refresh/overwrite.       |           |      |
| TASK-013 | Implement PR creation in `src/pr/update.ts` using `@actions/github`; branch naming policy.   |           |      |
| TASK-014 | Add PR summary generation in `src/pr/summary.ts` (files list, questions, criteria).          |           |      |
| TASK-015 | Vitest: managed-block preservation, idempotence (double apply), PR payload shape.            |           |      |

### Implementation Phase 4

- GOAL-004: Package GitHub Action and E2E workflow.

| Task     | Description                                                                                  | Completed | Date |
| -------- | -------------------------------------------------------------------------------------------- | --------- | ---- |
| TASK-016 | Create `action.yml` (inputs: repo, mode, llm_token, apply; outputs: pr_url, pr_number).      |           |      |
| TASK-017 | Ensure build pipeline (`npm run build`) outputs `dist/`; bundle if needed (ncc optional).    |           |      |
| TASK-018 | Add reusable workflow example in `.github/workflows/apply-pack.yml` (or confirm existing).   |           |      |
| TASK-019 | E2E test workflow against sample repo (dry-run safe mode).                                   |           |      |
| TASK-020 | Documentation touch-ups: README action usage, mode docs, inputs/outputs table.               |           |      |

## 3. Alternatives

- **ALT-001**: Pure deterministic planning without LLM. Rejected: loses repo-specific nuance.
- **ALT-002**: Direct push to default branch. Rejected: violates governance/safety (FR-10.1).

## 4. Dependencies

- **DEP-001**: `openai` (LLM for planning) or equivalent; must handle absence via fallback.
- **DEP-002**: `@actions/github`, `@actions/core` for PR and action IO.
- **DEP-003**: Vitest for tests; Node 18+ runtime on GitHub runners.

## 5. Files

- **FILE-001**: `src/sense/types.ts`, `src/sense/snapshot.ts`
- **FILE-002**: `src/plan/types.ts`, `src/plan/planner.ts`
- **FILE-003**: `src/apply/managed-sections.ts`, `src/apply/engine.ts`
- **FILE-004**: `src/pr/update.ts`, `src/pr/summary.ts`
- **FILE-005**: `action.yml`, `.github/workflows/apply-pack.yml` (example), `dist/*`
- **FILE-006**: Tests under `src/**/**.test.ts`

## 6. Testing

- **TEST-001**: Sensing determinism: same repo twice → identical `RepoSnapshot`.
- **TEST-002**: Planning fallback: produces valid `PlanManifest` when LLM disabled.
- **TEST-003**: Managed blocks: human text preserved, managed sections replaced.
- **TEST-004**: Idempotence: apply twice in refresh mode → no diff.
- **TEST-005**: PR creation: payload contains branch, base, title, body; does not push to default.
- **TEST-006**: Action E2E dry-run against fixture repo (safe mode).

## 7. Risks & Assumptions

- **RISK-001**: LLM latency or failure; mitigated by deterministic fallback.
- **RISK-002**: Managed-marker parsing errors; mitigated via tests for malformed markers.
- **ASSUMPTION-001**: GitHub token has `contents: write` and `pull-requests: write`.
- **ASSUMPTION-002**: Runners have Node 18+ and npm.

## 8. Related Specifications / Further Reading

- [docs/specs/agent_builder_first_intent.md](docs/specs/agent_builder_first_intent.md)
- [docs/specs/spec-architecture-agent-builder.md](docs/specs/spec-architecture-agent-builder.md)
- [AGENTS.md](AGENTS.md)
