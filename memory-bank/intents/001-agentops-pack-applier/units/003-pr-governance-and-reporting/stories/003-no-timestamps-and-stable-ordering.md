---
id: 003-no-timestamps-and-stable-ordering
unit: 003-pr-governance-and-reporting
intent: 001-agentops-pack-applier
status: draft
priority: must
created: 2026-01-26T00:00:00Z
assigned_bolt: null
implemented: false
---

# Story: 003-no-timestamps-and-stable-ordering

## User Story

**As a** repo maintainer
**I want** pack outputs and PR content to be stable and noise-free
**So that** re-runs do not create churn from timestamps or ordering changes.

## Acceptance Criteria

- [ ] **Given** the pack is reapplied, **When** no logical changes exist, **Then** no timestamp or ordering differences appear in the diff.
- [ ] **Given** files contain generated sections, **When** they are rendered, **Then** sorting is deterministic and whitespace stable.
- [ ] **Given** metadata is needed, **When** it must change, **Then** it lives in a dedicated block whose changes are minimized and documented.

## Technical Notes
- Avoid embedding run timestamps; pin ordering; normalize whitespace.
- Consider metadata blocks with controlled updates.

## Dependencies

### Requires
- 001-pr-body-summary-and-checklist
- 002-update-existing-pr-and-churn-control

### Enables
- Stable PR diffs and approvals

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Locale/timezone differences | Normalize formats |
| Sorting of unordered maps | Sort keys before emit |
| Line ending differences | Normalize LF |

## Out of Scope
- Core apply logic