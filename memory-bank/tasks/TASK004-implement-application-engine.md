# [TASK004] - Implement Application Engine

**Status:** In Progress
**Added:** 2026-01-27
**Updated:** 2026-01-27

## Original Request
Implement the "Application" phase (`src/apply/` & `src/pr/`), which takes a `FileBundle` (generated from the plan) and applies it to the repository via Pull Request, handling managed blocks.

## Thought Process
This engine is responsible for the side-effects. It must be safe (AC-3, FR-8). The core complexity lies in parsing existing files to identify "managed blocks" (`<!-- agentops-managed -->`) and updating only those sections in "refresh" mode, while preserving user edits elsewhere.

## Implementation Plan (GOAL-003 in plan/feature-agentops-core-implementation-2.md)
- [ ] TASK-011: Finish managed block merge logic in `src/apply/managed-sections.ts` (begin/end markers).
- [ ] TASK-012: Extend `src/apply/engine.ts` to apply `FileBundle` with safe/refresh/overwrite modes.
- [ ] TASK-013: Implement PR creation in `src/pr/update.ts` using `@actions/github` with branch naming policy.
- [ ] TASK-014: Add PR summary generation in `src/pr/summary.ts` (files list, questions, criteria).
- [ ] TASK-015: Add Vitest coverage for managed-block preservation, idempotence, and PR payload shape.

## Progress Tracking

**Overall Status:** In Progress - 90%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 4.1 | Managed Block Logic (TASK-011) | In Progress | 2026-01-27 | Strategy handling safe/refresh/overwrite added; unmanaged new files written raw |
| 4.2 | File Generation Engine (TASK-012) | In Progress | 2026-01-27 | applyPackFiles strategies + tests (managed/unmanaged behaviors, refresh idempotence) |
| 4.3 | PR Creation Logic (TASK-013) | Completed | 2026-01-27 | Added upsertPr tests (create/update/skip) |
| 4.4 | PR Summary Logic (TASK-014) | In Progress | 2026-01-27 | Added deterministic signal ordering, questions rendering, no-change message, and determinism tests |
| 4.5 | Idempotence & Payload Tests (TASK-015) | In Progress | 2026-01-27 | Added safe/overwrite coverage, unmanaged refresh skip test, refresh idempotence test, PR upsert & summary stability tests, missing end-marker skip test, PR no-op update test, malformed marker detection |

## Progress Log
### 2026-01-27
- Task file created.
- Added apply strategy support (safe/refresh/overwrite) with tests; marked task in progress.
- Added PR branch upsert tests covering create/update/skip flows; updated apply invocation to explicit refresh strategy.
- Refined refresh handling for unmanaged files (write raw on new, skip unmanaged existing); added tests.
- Made PR summary signals deterministic and tested; all suites passing.
- Added refresh-mode idempotence test for managed content and questions rendering test for PR summary; all tests green.
- Added no-change PR body test for skipped/unchanged files; suites still passing.
- Added PR body determinism test and missing end-marker safety test; test suite remains green.
- Added PR no-op update test (no changes and metadata unchanged) to ensure idempotence.
- Added malformed marker detection and test (begin/end mismatch) to avoid unsafe updates.
