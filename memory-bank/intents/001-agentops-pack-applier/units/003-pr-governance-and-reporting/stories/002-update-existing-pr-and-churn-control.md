---
id: 002-update-existing-pr-and-churn-control
unit: 003-pr-governance-and-reporting
intent: 001-agentops-pack-applier
status: draft
priority: should
created: 2026-01-26T00:00:00Z
assigned_bolt: null
implemented: false
---

# Story: 002-update-existing-pr-and-churn-control

## User Story

**As a** platform maintainer
**I want** refreshes to update an existing PR without spam and with minimal churn
**So that** reviewers are not flooded and diffs stay meaningful.

## Acceptance Criteria

- [ ] **Given** a PR already exists, **When** I re-run, **Then** the workflow updates the same PR/branch instead of opening new ones.
- [ ] **Given** no content changes, **When** I re-run, **Then** the PR shows no new commits/diffs and the job reports “no changes”.
- [ ] **Given** rate limits could be hit, **When** multiple updates occur, **Then** operations are batched with backoff and limited API calls.

## Technical Notes
- Use consistent branch naming; avoid force-push unless explicitly enabled.
- Consider conditional checks to skip PR update when diff empty.

## Dependencies

### Requires
- 001-pr-body-summary-and-checklist

### Enables
- 003-no-timestamps-and-stable-ordering

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| PR closed or merged | Open a new PR with clear note |
| Branch protection prevents push | Fail with guidance on required perms |
| Frequent scheduled runs | Throttle to avoid PR noise |

## Out of Scope
- Apply rendering