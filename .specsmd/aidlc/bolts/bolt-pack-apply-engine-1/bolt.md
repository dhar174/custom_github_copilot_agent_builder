---
id: bolt-pack-apply-engine-1
unit: 001-pack-apply-engine
intent: 001-agentops-pack-applier
type: simple-construction-bolt
status: complete
stories:
  - 001-baseline-apply-and-dry-run
  - 002-managed-sections-protection
  - 003-idempotent-reapply-and-delta
created: 2026-01-26T00:00:00.000Z
started: 2026-01-26T00:35:00.000Z
completed: "2026-01-27T01:13:12Z"
current_stage: null
stages_completed:
  - name: plan
    completed: 2026-01-26T00:40:00.000Z
    artifact: implementation-plan.md
  - name: implement
    completed: 2026-01-26T00:55:00.000Z
    artifact: implementation-walkthrough.md
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

- ✅ **1. plan**: Completed
- ✅ **2. implement**: Completed
- ⏳ **3. test**: In progress → coverage for dry-run/apply/idempotence

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