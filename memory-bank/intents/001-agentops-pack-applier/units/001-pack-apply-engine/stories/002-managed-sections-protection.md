---
id: 002-managed-sections-protection
unit: 001-pack-apply-engine
intent: 001-agentops-pack-applier
status: draft
priority: must
created: 2026-01-26T00:00:00Z
assigned_bolt: null
implemented: false
---

# Story: 002-managed-sections-protection

## User Story

**As a** repo maintainer
**I want** managed sections that prevent overwriting custom content
**So that** local edits outside managed blocks stay intact.

## Acceptance Criteria

- [ ] **Given** a file with managed markers, **When** I apply the pack, **Then** only the managed blocks are updated and other content is unchanged.
- [ ] **Given** a file without managed markers, **When** I run in refresh mode, **Then** the file is skipped with a clear log entry.
- [ ] **Given** managed blocks drift, **When** I reapply, **Then** the tool updates blocks deterministically without duplicating markers.

## Technical Notes
- Use stable marker format; consider hashing blocks for drift detection.
- Log managed paths and skipped files for auditability.

## Dependencies

### Requires
- 001-baseline-apply-and-dry-run

### Enables
- 003-idempotent-reapply-and-delta

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Nested managed blocks | Reject with clear error |
| Missing end marker | Fail with guidance to fix manually |
| Mixed line endings | Normalize before compare/apply |

## Out of Scope
- PR messaging (handled by pr-governance-and-reporting)