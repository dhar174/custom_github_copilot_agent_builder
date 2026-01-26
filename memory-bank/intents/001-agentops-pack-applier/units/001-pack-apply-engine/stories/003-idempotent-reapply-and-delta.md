---
id: 003-idempotent-reapply-and-delta
unit: 001-pack-apply-engine
intent: 001-agentops-pack-applier
status: draft
priority: must
created: 2026-01-26T00:00:00Z
assigned_bolt: null
implemented: false
---

# Story: 003-idempotent-reapply-and-delta

## User Story

**As a** platform maintainer
**I want** re-runs to be idempotent and only change what differs
**So that** we avoid PR churn and can trust repeated applies.

## Acceptance Criteria

- [ ] **Given** no source/inputs change, **When** I re-run, **Then** the diff is empty and the job reports “no changes”.
- [ ] **Given** only one template changes, **When** I re-run, **Then** only that file shows in the diff/PR.
- [ ] **Given** ordering-sensitive content, **When** I re-run, **Then** ordering is stable and unaffected by run time.

## Technical Notes
- Use deterministic sorting and serialization.
- Consider checksums per managed block to short-circuit writes.

## Dependencies

### Requires
- 001-baseline-apply-and-dry-run
- 002-managed-sections-protection

### Enables
- 001-pr-body-summary-and-checklist (stable inputs)

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Time-dependent fields | Strip/normalize to prevent churn |
| Non-deterministic template rendering | Enforce sort/serialization |
| Partial apply failure | Retry safe; leave repo unchanged or clearly marked |

## Out of Scope
- PR construction specifics (handled in pr-governance-and-reporting)