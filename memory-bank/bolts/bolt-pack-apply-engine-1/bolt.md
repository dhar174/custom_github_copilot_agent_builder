---
id: bolt-pack-apply-engine-1
unit: 001-pack-apply-engine
intent: 001-agentops-pack-applier
type: simple-construction-bolt
status: in-progress
stories:
  - 001-baseline-apply-and-dry-run
  - 002-managed-sections-protection
  - 003-idempotent-reapply-and-delta
created: 2026-01-26T00:00:00Z
started: 2026-01-26T00:35:00Z
completed: null
current_stage: plan
stages_completed: []
requires_bolts: []
enables_bolts:
  - bolt-pr-governance-and-reporting-1
requires_units:
  - 002-config-and-packaging
blocks: false
complexity:
  avg_complexity: 2
  avg_uncertainty: 2
  max_dependencies: 2
  testing_scope: 2
---

# Bolt: bolt-pack-apply-engine-1

## Overview
Implement rendering/apply engine with managed sections, dry-run/apply modes, and idempotent reapply.

## Objective
Deliver deterministic apply flow that updates managed blocks only and reports no-change correctly.

## Stories Included

- **001-baseline-apply-and-dry-run** (Must)
- **002-managed-sections-protection** (Must)
- **003-idempotent-reapply-and-delta** (Must)

## Bolt Type

**Type**: simple-construction-bolt
**Definition**: `.specsmd/aidlc/templates/construction/bolt-types/simple-construction-bolt.md`

## Stages

- [ ] **1. plan**: Pending → approach + acceptance mapping
- [ ] **2. implement**: Pending → engine code + managed section handling
- [ ] **3. test**: Pending → coverage for dry-run/apply/idempotence

## Dependencies

### Requires
- 002-config-and-packaging (config defaults and manifest)

### Enables
- bolt-pr-governance-and-reporting-1

## Success Criteria

- [ ] All stories implemented
- [ ] Acceptance criteria satisfied
- [ ] Tests passing
- [ ] No-change rerun emits zero diff

## Notes
Consider hashing managed blocks and using stable serialization to avoid churn.