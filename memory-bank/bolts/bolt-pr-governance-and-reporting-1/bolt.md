---
id: bolt-pr-governance-and-reporting-1
unit: 003-pr-governance-and-reporting
intent: 001-agentops-pack-applier
type: simple-construction-bolt
status: complete
stories:
  - 001-pr-body-summary-and-checklist
  - 002-update-existing-pr-and-churn-control
  - 003-no-timestamps-and-stable-ordering
created: 2026-01-26T00:00:00Z
started: 2026-01-26T17:30:00Z
completed: 2026-01-26T18:35:00Z
current_stage: 3-test
stages_completed: []
requires_bolts:
  - bolt-pack-apply-engine-1
enables_bolts: []
requires_units:
  - 001-pack-apply-engine
  - 002-config-and-packaging
blocks: false
complexity:
  avg_complexity: 2
  avg_uncertainty: 2
  max_dependencies: 2
  testing_scope: 2
---

# Bolt: bolt-pr-governance-and-reporting-1

## Overview
Create/update PRs with stable, reviewable diffs, summaries, and checklists while avoiding churn and rate-limit issues.

## Objective
Deliver deterministic PR surfaces that reviewers trust, with minimal noise on refresh.

## Stories Included

- **001-pr-body-summary-and-checklist** (Must)
- **002-update-existing-pr-and-churn-control** (Should)
- **003-no-timestamps-and-stable-ordering** (Must)

## Bolt Type

**Type**: simple-construction-bolt
**Definition**: `.specsmd/aidlc/templates/construction/bolt-types/simple-construction-bolt.md`

## Stages

- [ ] **1. plan**: Pending → PR template and churn controls
- [ ] **2. implement**: Pending → PR update logic, stability guards
- [ ] **3. test**: Pending → churn/noise tests, rate-limit handling

## Dependencies

### Requires
- bolt-pack-apply-engine-1

### Enables
- None

## Success Criteria

- [ ] All stories implemented
- [ ] Acceptance criteria satisfied
- [ ] Tests passing
- [ ] No churn on no-op re-run

## Notes
Throttle updates to avoid API rate issues; reuse PR branch when present.