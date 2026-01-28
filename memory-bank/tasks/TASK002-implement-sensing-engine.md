# [TASK002] - Implement Sensing Engine

**Status:** In Progress
**Added:** 2026-01-27
**Updated:** 2026-01-27

## Original Request
Implement the logic for the "Sensing" phase (`src/sense/`), which scans the target repository and produces a deterministic `RepoSnapshot`.

## Thought Process
The Sensing Engine is the foundation of the agent's decision making. It must be deterministic (FR-1) to ensure idempotence. It needs to traverse the file system, ignoring `.git` relative paths, collect signals like languages and frameworks, and detect existing AI configurations.

## Implementation Plan (GOAL-001 in plan/feature-agentops-core-implementation-2.md)
- [ ] TASK-001: Refine `RepoSnapshot` schema in `src/sense/types.ts` to match spec (languages/frameworks/packages).
- [ ] TASK-002: Finalize deterministic traversal in `src/sense/snapshot.ts` (ignore `.git`, depth limits).
- [ ] TASK-003: Implement signal detection for languages/frameworks/package managers from key files (e.g., `package.json`, `requirements.txt`).
- [ ] TASK-004: Detect existing AI config (instructions, agents, prompts, mcp) per spec.
- [ ] TASK-005: Add Vitest coverage for determinism (double-run equality), depth handling, and hidden file skipping.

## Progress Tracking

**Overall Status:** In Progress - 90%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 2.1 | Refine Types (TASK-001) | Completed | 2026-01-27 | Added riskFlags to RepoSignals |
| 2.2 | Directory Traversal (TASK-002) | Completed | 2026-01-27 | Deterministic ordering; skip only .git |
| 2.3 | Signal Detection (TASK-003) | Completed | 2026-01-27 | Added package manager/build tool/workflows/monorepo flags |
| 2.4 | AI Config Detection (TASK-004) | Completed | 2026-01-27 | Captures .prompt.yml/.yaml, root prompts, skills SKILL.md |
| 2.5 | Unit Tests (TASK-005) | Completed | 2026-01-27 | Determinism, depth limit, AI config prompts |

## Progress Log
### 2026-01-27
- Task file created. Basic skeleton code exists in `src/sense/snapshot.ts`.
### 2026-01-27 (later)
- Refined RepoSignals schema with riskFlags.
- Made traversal deterministic and skip only `.git`.
- Enhanced signal detection for package managers, frameworks, build tools, monorepo hints.
- Expanded AI config detection to include .prompt.yml/.yaml and root-level prompts.
