---
intent: 001-agentops-pack-applier
phase: inception
status: units-decomposed
updated: 2026-01-26T00:00:00Z
---

# AgentOps Pack Applier - Unit Decomposition

## Units Overview

This intent decomposes into 3 units of work:

### Unit 1: 001-pack-apply-engine

**Description**: Core apply engine that renders pack files, uses managed sections, supports dry-run, and guarantees idempotent reapply.

**Stories**:
- 001-baseline-apply-and-dry-run
- 002-managed-sections-protection
- 003-idempotent-reapply-and-delta

**Deliverables**:
- Rendering + file apply logic with managed markers
- Dry-run and apply modes with diff summary
- Idempotence checks and “no changes” reporting

**Dependencies**:
- Depends on: 002-config-and-packaging (inputs and pack metadata)
- Depended by: 003-pr-governance-and-reporting

**Estimated Complexity**: M

### Unit 2: 002-config-and-packaging

**Description**: Configuration, pack selection, and reusable action/workflow packaging with least-privilege permissions.

**Stories**:
- 001-configurable-inputs-and-defaults
- 002-selective-pack-components
- 003-permissions-and-token-strategy

**Deliverables**:
- Config schema and defaults; pack subset selection
- Reusable action + composite workflow with documented inputs/outputs
- Permissions block templates and token selection rules

**Dependencies**:
- Depends on: None
- Depended by: 001-pack-apply-engine, 003-pr-governance-and-reporting

**Estimated Complexity**: M

### Unit 3: 003-pr-governance-and-reporting

**Description**: PR creation/update, churn control, stable diff ordering, and reviewer checklist/reporting.

**Stories**:
- 001-pr-body-summary-and-checklist
- 002-update-existing-pr-and-churn-control
- 003-no-timestamps-and-stable-ordering

**Deliverables**:
- PR body templates with pack version, files touched, warnings
- Update/refresh behavior without spam; rate-limit-friendly operations
- Stable ordering and no volatile fields in managed files

**Dependencies**:
- Depends on: 001-pack-apply-engine (diff outputs), 002-config-and-packaging (version info)
- Depended by: None

**Estimated Complexity**: M

## Unit Dependency Graph

```text
[002-config-and-packaging] --> [001-pack-apply-engine] --> [003-pr-governance-and-reporting]
```

## Execution Order
1. Day 1-2: 002-config-and-packaging (foundation: inputs, permissions, packaging)
2. Day 2-4: 001-pack-apply-engine (core apply, managed sections, idempotence)
3. Day 4-5: 003-pr-governance-and-reporting (PR body, churn/noise controls)