# [TASK005] - Create GitHub Action Definition

**Status:** Pending
**Added:** 2026-01-27
**Updated:** 2026-01-27

## Original Request
Wrap the build artifacts into a usable GitHub Action definition (`action.yml`) and ensure the distribution build process is working.

## Thought Process
The final deliverable is a `action.yml` file that allows this repo to be used as a composite or node/js action in other workflows. It needs to expose inputs (repo, mode, tokens) and outputs (pr_url). The build process (`tsc`, `ncc` or similar if bundling) needs to produce a reliable distribution.

## Implementation Plan (GOAL-004 in plan/feature-agentops-core-implementation-2.md)
- [ ] TASK-016: Create `action.yml` (inputs: repo, mode, llm_token, apply; outputs: pr_url, pr_number).
- [ ] TASK-017: Ensure build pipeline (`npm run build`) outputs `dist/`; bundle if needed (ncc optional).
- [ ] TASK-018: Add/confirm reusable workflow example in `.github/workflows/apply-pack.yml`.
- [ ] TASK-019: E2E test workflow against sample repo (dry-run safe mode).
- [ ] TASK-020: Documentation touch-ups (README action usage, modes, inputs/outputs table).

## Progress Tracking

**Overall Status:** Pending - 0%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 5.1 | Create action.yml (TASK-016) | Pending | 2026-01-27 | |
| 5.2 | Configure Build/Bundle (TASK-017) | Pending | 2026-01-27 | |
| 5.3 | Reusable Workflow Example (TASK-018) | Pending | 2026-01-27 | |
| 5.4 | E2E Testing (TASK-019) | Pending | 2026-01-27 | |
| 5.5 | Documentation Updates (TASK-020) | Pending | 2026-01-27 | |

## Progress Log
### 2026-01-27
- Task file created.
