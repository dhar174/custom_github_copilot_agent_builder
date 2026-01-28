# [TASK003] - Implement Planning Engine

**Status:** Pending
**Added:** 2026-01-27
**Updated:** 2026-01-27

## Original Request
Implement the "Planning" phase (`src/plan/`), which accepts a `RepoSnapshot` and produces a `PlanManifest`.

## Thought Process
The Planning Engine is the "brain" of the operation. Depending on the complexity and configuration, it may use an LLM (FR-2) to analyze the snapshot or fallback to heuristic logic. It needs to output a structured plan of what files to create, update, or ignore.

## Implementation Plan (GOAL-002 in plan/feature-agentops-core-implementation-2.md)
- [ ] TASK-006: Finalize `PlanManifest` schema in `src/plan/types.ts` (files, managedPolicy, criteria).
- [ ] TASK-007: Implement `Planner` in `src/plan/planner.ts` to call Planner LLM prompt and produce manifest.
- [ ] TASK-008: Add deterministic fallback path (no LLM) using heuristics from `RepoSnapshot`.
- [ ] TASK-009: Validate manifest against schema and surface errors.
- [ ] TASK-010: Add Vitest coverage for schema validation, fallback path, and snapshot→manifest stability.

## Progress Tracking

**Overall Status:** Pending - 0%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 3.1 | Define Manifest Schema (TASK-006) | Pending | 2026-01-27 | |
| 3.2 | Planner Class Skeleton (TASK-007) | Pending | 2026-01-27 | |
| 3.3 | LLM Integration (TASK-007) | Pending | 2026-01-27 | |
| 3.4 | Fallback Logic (TASK-008) | Pending | 2026-01-27 | |
| 3.5 | Validation & Tests (TASK-009/010) | Pending | 2026-01-27 | |

## Progress Log
### 2026-01-27
- Task file created.
