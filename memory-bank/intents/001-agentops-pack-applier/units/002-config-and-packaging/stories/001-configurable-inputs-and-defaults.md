---
id: 001-configurable-inputs-and-defaults
unit: 002-config-and-packaging
intent: 001-agentops-pack-applier
status: complete
priority: must
created: 2026-01-26T00:00:00.000Z
assigned_bolt: null
implemented: true
---

# Story: 001-configurable-inputs-and-defaults

## User Story

**As a** repo maintainer
**I want** clear inputs with sensible defaults and validation
**So that** I can apply the pack without bespoke scripts.

## Acceptance Criteria

- [ ] **Given** required inputs are missing, **When** I run the action, **Then** it fails with actionable error messages.
- [ ] **Given** optional inputs are omitted, **When** I run, **Then** defaults are applied and logged.
- [ ] **Given** inputs are provided, **When** I run, **Then** a merged config is produced and surfaced in logs (non-secret fields only).

## Technical Notes
- Schema-driven validation; redact secrets in logs.
- Support config file plus workflow inputs, with clear precedence.

## Dependencies

### Requires
- None

### Enables
- 002-selective-pack-components

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Unknown fields in config | Warn or fail with guidance |
| Mixed casing in inputs | Normalize to expected keys |
| Secrets passed mistakenly | Mask in logs |

## Out of Scope
- Apply logic and managed sections