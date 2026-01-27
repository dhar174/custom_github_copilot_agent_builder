---
id: 003-permissions-and-token-strategy
unit: 002-config-and-packaging
intent: 001-agentops-pack-applier
status: complete
priority: should
created: 2026-01-26T00:00:00.000Z
assigned_bolt: null
implemented: true
---

# Story: 003-permissions-and-token-strategy

## User Story

**As a** platform maintainer
**I want** default least-privilege permissions and clear token strategy
**So that** repos stay secure while running the pack applier.

## Acceptance Criteria

- [ ] **Given** no overrides, **When** I use the workflow, **Then** permissions default to `contents: write`, `pull-requests: write` only when needed.
- [ ] **Given** I need cross-repo access, **When** I supply an override token, **Then** the workflow documents scopes and masks the token in logs.
- [ ] **Given** a PAT/App token is not supplied, **When** the job can use GITHUB_TOKEN, **Then** it does so and documents limitations.

## Technical Notes
- Document required scopes and branch naming guidance.
- Mask secrets and avoid echoing tokens.

## Dependencies

### Requires
- 001-configurable-inputs-and-defaults
- 002-selective-pack-components

### Enables
- 001-pack-apply-engine (permissions in workflow)

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Insufficient scopes | Fail with clear message on needed scopes |
| Self-hosted runner | Note expectations; avoid Docker-in-Docker requirement |
| Missing permissions block | Fail validation before run |

## Out of Scope
- PR content and apply logic