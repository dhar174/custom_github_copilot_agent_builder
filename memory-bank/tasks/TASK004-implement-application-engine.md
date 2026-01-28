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

**Overall Status:** In Progress - 40%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 4.1 | Managed Block Logic (TASK-011) | In Progress | 2026-01-27 | Strategy handling safe/refresh/overwrite added |
| 4.2 | File Generation Engine (TASK-012) | In Progress | 2026-01-27 | applyPackFiles strategies + tests |
| 4.3 | PR Creation Logic (TASK-013) | Pending | 2026-01-27 | |
| 4.4 | PR Summary Logic (TASK-014) | Pending | 2026-01-27 | |
| 4.5 | Idempotence & Payload Tests (TASK-015) | In Progress | 2026-01-27 | Added safe/overwrite coverage |

## Progress Log
### 2026-01-27
- Task file created.
- Added apply strategy support (safe/refresh/overwrite) with tests; marked task in progress.
