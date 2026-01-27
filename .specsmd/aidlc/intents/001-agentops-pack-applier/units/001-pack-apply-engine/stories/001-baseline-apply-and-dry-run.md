---
id: 001-baseline-apply-and-dry-run
unit: 001-pack-apply-engine
intent: 001-agentops-pack-applier
status: complete
priority: must
created: 2026-01-26T00:00:00.000Z
assigned_bolt: null
implemented: true
---

# Story: 001-baseline-apply-and-dry-run

## User Story

**As a** repo maintainer
**I want** to run the pack applier in dry-run or apply mode
**So that** I can see proposed changes safely and apply them via PR.

## Acceptance Criteria

- [ ] **Given** a target repo and inputs, **When** I run in dry-run, **Then** the job outputs a summary diff without writing files.
- [ ] **Given** a target repo and inputs, **When** I run in apply mode, **Then** managed files are written to a branch for PR creation.
- [ ] **Given** apply succeeds, **When** I rerun on the same commit, **Then** the command reports “no changes” if nothing changed.

## Technical Notes
- Use managed file list from pack manifest; avoid touching non-managed files.
- Keep output deterministic for re-runs.

## Dependencies

### Requires
- None

### Enables
- 002-managed-sections-protection

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Missing required input | Fail with actionable error |
| Repo branch protected | Continue with PR branch only |
| Workspace already has PR branch | Reuse branch, update PR |

## Out of Scope
- PR body formatting (handled in pr-governance-and-reporting)