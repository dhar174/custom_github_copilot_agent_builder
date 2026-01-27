---
id: 002-selective-pack-components
unit: 002-config-and-packaging
intent: 001-agentops-pack-applier
status: complete
priority: should
created: 2026-01-26T00:00:00.000Z
assigned_bolt: null
implemented: true
---

# Story: 002-selective-pack-components

## User Story

**As a** platform maintainer
**I want** to select subsets of the pack (e.g., instructions-only vs full pack)
**So that** repos can opt into only the components they need.

## Acceptance Criteria

- [ ] **Given** a pack subset selection, **When** I run, **Then** only selected components are rendered/applied.
- [ ] **Given** dependencies between components, **When** I choose a subset, **Then** required dependencies are included or flagged.
- [ ] **Given** a subset is empty, **When** I run, **Then** the job exits gracefully with a message.

## Technical Notes
- Represent pack manifest with components and dependencies.
- Surface selected components in logs/PR summary.

## Dependencies

### Requires
- 001-configurable-inputs-and-defaults

### Enables
- 003-permissions-and-token-strategy

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Invalid subset name | Fail with list of valid names |
| Circular dependencies | Detect and fail with guidance |
| Empty selection | Exit with informational message |

## Out of Scope
- Apply logic and PR formatting